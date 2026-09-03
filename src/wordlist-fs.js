// Streaming helpers for HUGE wordlists (multi-GB) that cannot fit in memory.
//
// NODE ONLY. This file is never imported by index.js, so it is NOT in the browser
// bundle — it uses `fs` and stays out of dist/crack.js. Combine it with crack.verifyHash
// to build a distributed dictionary attack that never loads the file:
//
//   const fs = require('fs');
//   const crack = require('crack-js');
//   const { byteShards, streamShardLines } = require('crack-js/src/wordlist-fs');
//
//   const size = fs.statSync('rockyou-2gb.txt').size;
//   const shards = byteShards(size, NODES);          // one byte range per node
//   // …ship shards[i] to node i, then on that node:
//   for await (const word of streamShardLines('rockyou-2gb.txt', shards[i].start, shards[i].end))
//     if (crack.verifyHash(word, hash, mode)) return word;   // constant memory, whatever the file size
//
// Sharding is by BYTE range (Hadoop-style): a line is owned by the shard containing its
// FIRST byte. A shard finishes a line that straddles its end, and skips a line that
// straddles its start — so the union of all shards is every line EXACTLY ONCE. No line
// index, no counting pass, O(1) seek per node, constant memory. Ideal for 2 GB+.

var fs = require('fs');
var attack = require('./attack');
var NL = 0x0a;
var CR = 0x0d;
var DEFAULT_STRIDE = 65536;              // sparse line index: one byte offset per this many WORDS
var _indexCache = Object.create(null);   // key `path|size|mtime|stride` -> { offsets, totalWords, stride }

// Split a file of `size` bytes into `n` contiguous byte ranges [{index, start, end}].
function byteShards(size, n) {
    size = Number(size); n = n | 0;
    if (n < 1) throw new Error('byteShards: n must be >= 1');
    var out = [], each = Math.floor(size / n), extra = size % n, start = 0;
    for (var i = 0; i < n; i++) { var len = each + (i < extra ? 1 : 0); out.push({ index: i, start: start, end: start + len }); start += len; }
    return out;
}

async function _byteAt(fd, off) { var b = Buffer.allocUnsafe(1); var r = await fd.read(b, 0, 1, off); return r.bytesRead ? b[0] : -1; }

// Smallest line-start offset >= `start`. A line starts at 0 or right after a '\n'.
async function _firstLineStart(fd, start, size, chunkSize) {
    if (start <= 0) return 0;
    if (start > size) return size;
    if ((await _byteAt(fd, start - 1)) === NL) return start;   // `start` sits exactly on a line boundary
    var buf = Buffer.allocUnsafe(chunkSize), pos = start;
    while (pos < size) {
        var r = await fd.read(buf, 0, Math.min(chunkSize, size - pos), pos);
        if (!r.bytesRead) break;
        for (var i = 0; i < r.bytesRead; i++) if (buf[i] === NL) return pos + i + 1;
        pos += r.bytesRead;
    }
    return size;   // no newline ahead -> no line starts in this shard
}

function _decode(parts) { var s = Buffer.concat(parts).toString('utf8'); return s.charCodeAt(s.length - 1) === 13 ? s.slice(0, -1) : s; }  // strip a trailing \r (CRLF)

// Async generator of the lines OWNED by byte range [start, end): every line whose first
// byte is in [start, end). A line straddling `end` is finished here; a line straddling
// `start` is skipped (owned by the previous shard). Omit start/end to stream the whole file.
async function* streamShardLines(path, start, end, opts) {
    opts = opts || {};
    var chunkSize = opts.chunkSize || (1 << 20);   // 1 MiB
    var fd = await fs.promises.open(path, 'r');
    try {
        var size = (await fd.stat()).size;
        if (start == null || start < 0) start = 0;
        if (end == null || end > size) end = size;
        var lineStart = await _firstLineStart(fd, start, size, chunkSize);
        if (lineStart >= end) return;

        var buf = Buffer.allocUnsafe(chunkSize), absPos = lineStart, lineStartOffset = lineStart, pending = [], done = false;
        while (!done) {
            var r = await fd.read(buf, 0, chunkSize, absPos);
            if (!r.bytesRead) { if (pending.length && lineStartOffset < end) yield _decode(pending); break; }
            var base = absPos; absPos += r.bytesRead;
            var segStart = 0;
            for (var i = 0; i < r.bytesRead; i++) {
                if (buf[i] !== NL) continue;
                pending.push(Buffer.from(buf.subarray(segStart, i)));       // complete a line (copy; buf is reused)
                if (lineStartOffset < end) yield _decode(pending);
                pending = []; segStart = i + 1; lineStartOffset = base + i + 1;
                if (lineStartOffset >= end) { done = true; break; }         // no further line starts before `end`
            }
            if (!done && segStart < r.bytesRead) pending.push(Buffer.from(buf.subarray(segStart, r.bytesRead)));
        }
    } finally { await fd.close(); }
}

// One streaming pass: number of lines (a final line with no trailing newline counts).
async function countLines(path, opts) {
    opts = opts || {};
    var chunkSize = opts.chunkSize || (1 << 20);
    var fd = await fs.promises.open(path, 'r');
    try {
        var buf = Buffer.allocUnsafe(chunkSize), pos = 0, n = 0, last = -1, any = false;
        while (true) {
            var r = await fd.read(buf, 0, chunkSize, pos);
            if (!r.bytesRead) break;
            any = true; pos += r.bytesRead; last = buf[r.bytesRead - 1];
            for (var i = 0; i < r.bytesRead; i++) if (buf[i] === NL) n++;
        }
        return any && last !== NL ? n + 1 : n;
    } finally { await fd.close(); }
}

// ===========================================================================
// File-backed, KEYSPACE-ALIGNED candidate enumeration — crack-js owns keyspace AND the
// offset-into-file. Unlike the byte-shard helpers above, this splits by WORD/LINE INDEX, so a
// keyspace part [skip, skip+limit) maps 1:1 onto a wordlist/rules attack and matches keyspace(spec)
// (wordlist -> #words, rules -> #words*#rules).
//
// A "word" = a NON-EMPTY line, split on /\r?\n/ (a CRLF's trailing \r stripped; empty lines skipped) —
// identical to `words = read.split(/\r?\n/).filter(w => w.length > 0)`. So
// candidatesFromFile(path, spec, {skip,limit}) yields BYTE-FOR-BYTE the same candidates as the in-memory
// candidates({ ...spec, words }, {skip,limit}) — but never loads the file.
//
// A sparse word->byte index (one offset per DEFAULT_STRIDE words) is built ONCE per file in a single
// streaming pass and cached (keyed by path+size+mtime). It is tiny (~10s of KB even for 1e9 words), and
// every read streams, so memory is CONSTANT regardless of file size (a 20 GB list runs in a few MB).
// ===========================================================================

// Async generator over the NON-EMPTY lines of `path` from byte `startByte` (which MUST be a line start).
// Yields { offset, bytes }: `offset` = the line's start byte, `bytes` = the line (one trailing \r stripped).
async function* _scanWords(path, startByte, chunkSize) {
    chunkSize = chunkSize || (1 << 20);
    var fd = await fs.promises.open(path, 'r');
    try {
        var buf = Buffer.allocUnsafe(chunkSize);
        var absPos = startByte || 0, segStart = startByte || 0, carry = [];
        while (true) {
            var r = await fd.read(buf, 0, chunkSize, absPos);
            if (!r.bytesRead) break;
            var from = 0;
            for (var i = 0; i < r.bytesRead; i++) {
                if (buf[i] !== NL) continue;
                var line;
                if (carry.length) { carry.push(Buffer.from(buf.subarray(from, i))); line = Buffer.concat(carry); }
                else { line = Buffer.from(buf.subarray(from, i)); }
                if (line.length && line[line.length - 1] === CR) line = line.subarray(0, line.length - 1);
                if (line.length) yield { offset: segStart, bytes: line };
                carry = []; from = i + 1; segStart = absPos + from;
            }
            if (from < r.bytesRead) carry.push(Buffer.from(buf.subarray(from, r.bytesRead)));
            absPos += r.bytesRead;
        }
        if (carry.length) {                                       // final line with no trailing \n
            var last = Buffer.concat(carry);
            if (last.length && last[last.length - 1] === CR) last = last.subarray(0, last.length - 1);
            if (last.length) yield { offset: segStart, bytes: last };
        }
    } finally { await fd.close(); }
}

// Build (streaming) the sparse word->byte index: offsets[k] = byte offset of word (k*stride).
async function buildLineIndex(path, stride) {
    stride = stride || DEFAULT_STRIDE;
    var offsets = [], n = 0;
    for await (var ln of _scanWords(path)) { if (n % stride === 0) offsets.push(ln.offset); n++; }
    return { offsets: offsets, totalWords: n, stride: stride };
}

async function _getIndex(path, stride) {
    stride = stride || DEFAULT_STRIDE;
    var st = await fs.promises.stat(path);
    var key = path + '|' + st.size + '|' + st.mtimeMs + '|' + stride;
    if (_indexCache[key]) return _indexCache[key];
    var idx = await buildLineIndex(path, stride);
    _indexCache[key] = idx;
    return idx;
}

// Number of WORDS (non-empty lines) — the wordlist keyspace. One streamed pass (indexed + cached).
async function countWords(path, opts) { opts = opts || {}; return (await _getIndex(path, opts.stride)).totalWords; }

// Async generator yielding the words at line indices [first, first+count), seeking near `first` via the index.
async function* _streamWordWindow(path, first, count, stride) {
    if (count <= 0) return;
    var idx = await _getIndex(path, stride);
    if (first >= idx.totalWords) return;
    var end = Math.min(first + count, idx.totalWords);
    var k = Math.floor(first / idx.stride);
    var startByte = idx.offsets[k] || 0;
    var lineNo = k * idx.stride;
    for await (var ln of _scanWords(path, startByte)) {
        if (lineNo >= end) break;
        if (lineNo >= first) yield ln.bytes.toString('utf8');
        lineNo++;
    }
}

// Lazy generator over the keyspace slice [skip, skip+limit) of a FILE-backed attack — the file equivalent
// of attack.candidates(spec, {skip,limit}). wordlist/rules read words from `path` by index; mask/bruteforce
// need no file and delegate to the in-memory (already seekable) candidates().
//   spec: { type:'wordlist' } | { type:'rules', rules:[...], apply?:(w,r)=>string } | mask | bruteforce
async function* candidatesFromFile(path, spec, opts) {
    opts = opts || {};
    if (!spec || !spec.type) throw new Error('candidatesFromFile: spec.type required');
    var stride = opts.stride;

    if (spec.type === 'mask' || spec.type === 'bruteforce') { yield* attack.candidates(spec, opts); return; }

    var skip = opts.skip != null ? BigInt(opts.skip) : 0n; if (skip < 0n) skip = 0n;

    if (spec.type === 'wordlist') {
        var N = BigInt((await _getIndex(path, stride)).totalWords);
        if (skip > N) skip = N;
        var end = opts.limit != null ? skip + BigInt(opts.limit) : N; if (end > N) end = N;
        if (end - skip <= 0n) return;
        yield* _streamWordWindow(path, Number(skip), Number(end - skip), stride);
        return;
    }

    if (spec.type === 'rules') {
        var rules = spec.rules || [], R = rules.length; if (R === 0) return;
        var Rb = BigInt(R), apply = spec.apply;
        var Nw = BigInt((await _getIndex(path, stride)).totalWords), N2 = Nw * Rb;
        if (skip > N2) skip = N2;
        var end2 = opts.limit != null ? skip + BigInt(opts.limit) : N2; if (end2 > N2) end2 = N2;
        if (end2 - skip <= 0n) return;
        var firstWord = skip / Rb, lastWord = (end2 - 1n) / Rb;         // word-major: rule varies fastest
        var wCount = Number(lastWord - firstWord + 1n), wi = firstWord;
        for await (var w of _streamWordWindow(path, Number(firstWord), wCount, stride)) {
            var giBase = wi * Rb;
            for (var r = 0; r < R; r++) { var gi = giBase + BigInt(r); if (gi >= skip && gi < end2) yield apply ? apply(w, rules[r]) : { word: w, rule: rules[r] }; }
            wi += 1n;
        }
        return;
    }
    throw new Error('candidatesFromFile: unknown type "' + spec.type + '"');
}

module.exports = {
    byteShards: byteShards, streamShardLines: streamShardLines, countLines: countLines,
    buildLineIndex: buildLineIndex, countWords: countWords, candidatesFromFile: candidatesFromFile
};
