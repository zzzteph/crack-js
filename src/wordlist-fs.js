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
var NL = 0x0a;

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

module.exports = { byteShards: byteShards, streamShardLines: streamShardLines, countLines: countLines };
