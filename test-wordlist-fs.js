// Correctness tests for the streaming huge-wordlist helper (src/wordlist-fs.js).
// The security-critical invariant is the same as for keyspace partitioning: the union of
// all BYTE shards must reproduce every line EXACTLY ONCE — no line dropped (a distributed
// node would silently miss the password), none duplicated. We verify that across many
// shard counts, chunk sizes, and awkward file shapes (no trailing newline, CRLF, blank
// lines, multibyte UTF-8 split across tiny chunk boundaries). Run: `node test-wordlist-fs.js`.

var fs = require('fs');
var os = require('os');
var path = require('path');
var wl = require('./src/wordlist-fs');

var pass = 0, fail = 0, failures = [];
function ok(c, m) { if (c) pass++; else { fail++; failures.push(m); } }
function eqArr(a, b, msg) {
    if (a.length !== b.length) { ok(false, msg + ' [len ' + a.length + ' != ' + b.length + ']'); return; }
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) { ok(false, msg + ' [#' + i + ': ' + JSON.stringify(a[i]) + ' != ' + JSON.stringify(b[i]) + ']'); return; }
    ok(true, msg);
}
// the line semantics streamShardLines implements: split on \n, a trailing newline adds no
// empty line, a trailing \r (CRLF) is stripped.
function truthLines(content) {
    if (content === '') return [];
    var parts = content.split('\n');
    if (parts[parts.length - 1] === '' && content.slice(-1) === '\n') parts.pop();
    return parts.map(function (s) { return s.slice(-1) === '\r' ? s.slice(0, -1) : s; });
}

async function collectSharded(file, K, chunkSize) {
    var size = fs.statSync(file).size, shards = wl.byteShards(size, K), acc = 0, out = [];
    for (var i = 0; i < shards.length; i++) { if (shards[i].start !== acc) ok(false, 'shard contiguous @' + i); acc += (shards[i].end - shards[i].start); }
    ok(acc === size, 'shards cover file exactly (K=' + K + ', size=' + size + ')');
    for (var j = 0; j < shards.length; j++) for await (var line of wl.streamShardLines(file, shards[j].start, shards[j].end, { chunkSize: chunkSize })) out.push(line);
    return out;
}

async function testFile(name, content, chunkSizes, Ks) {
    var file = path.join(os.tmpdir(), 'cjwl-' + name + '-' + process.pid + '.txt');
    fs.writeFileSync(file, content);
    try {
        var truth = truthLines(content), size = fs.statSync(file).size;
        ok((await wl.countLines(file)) === truth.length, 'countLines ' + name + ' == ' + truth.length);
        var fullOut = []; for await (var l of wl.streamShardLines(file, 0, size)) fullOut.push(l);
        eqArr(fullOut, truth, 'full stream == truth :: ' + name);
        for (var c = 0; c < chunkSizes.length; c++) for (var k = 0; k < Ks.length; k++) {
            var K = Ks[k]; if (K < 1) continue;
            eqArr(await collectSharded(file, K, chunkSizes[c]), truth, 'byte-shard coverage == truth :: ' + name + ' K=' + K + ' chunk=' + chunkSizes[c]);
        }
    } finally { fs.unlinkSync(file); }
}

async function main() {
    var tiny = [3, 16, 1 << 20];
    var smallKs = function (n, size) { return [1, 2, 3, 5, 7, n + 2, size]; };   // includes 1-byte-per-shard extreme

    await testFile('empty', '', tiny, [1, 2, 5]);
    await testFile('solo-nonl', 'solo', tiny, smallKs(1, 4));
    await testFile('solo-nl', 'solo\n', tiny, smallKs(1, 5));
    await testFile('three-nonl', 'a\nbb\nccc', tiny, smallKs(3, 8));
    await testFile('three-nl', 'a\nbb\nccc\n', tiny, smallKs(3, 9));
    await testFile('blanks', 'a\n\nb\n\n\nc\n', tiny, smallKs(4, 10));
    await testFile('crlf', 'a\r\nbb\r\nccc\r\n', tiny, smallKs(3, 12));
    await testFile('multibyte', 'café\nnaïve\n密码\nÜber', tiny, smallKs(4, 20));   // é/ï 2 bytes, 密码 3 bytes each
    await testFile('leading-blank', '\n\nabc\n', tiny, smallKs(3, 6));

    // a bigger file: exercise real chunking + many shards
    var big = []; for (var i = 0; i < 5000; i++) big.push('word' + i + (i % 7 === 0 ? '!' : ''));
    await testFile('big5000-nl', big.join('\n') + '\n', [1 << 12, 1 << 16], [1, 2, 3, 8, 64, 5002]);
    await testFile('big5000-nonl', big.join('\n'), [1 << 12, 1 << 16], [1, 4, 17, 250]);

    // end-to-end: a distributed node cracks its byte shard against crack.verifyHash
    var crack = require('./dist/crack.js');
    var listFile = path.join(os.tmpdir(), 'cjwl-e2e-' + process.pid + '.txt');
    var words = []; for (var w = 0; w < 3000; w++) words.push('pw_' + w); var secret = 'pw_2718';
    fs.writeFileSync(listFile, words.join('\n') + '\n');
    try {
        var hash = crack.generateHash(0, secret), size = fs.statSync(listFile).size, hits = 0, tested = 0;
        for (var s of wl.byteShards(size, 8)) {          // 8 nodes
            for await (var word of wl.streamShardLines(listFile, s.start, s.end)) { tested++; if (crack.verifyHash(word, hash, 0)) hits++; }
        }
        ok(tested === words.length, 'e2e streamed every word once (' + tested + ')');
        ok(hits === 1, 'e2e distributed wordlist crack: exactly one shard finds "' + secret + '"');
    } finally { fs.unlinkSync(listFile); }

    // byteShards edge cases
    eqArr(wl.byteShards(0, 3).map(function (s) { return s.end - s.start; }), [0, 0, 0], 'byteShards(0,3) -> three empty ranges');
    ok(wl.byteShards(10, 3).map(function (s) { return s.end - s.start; }).join(',') === '4,3,3', 'byteShards(10,3) balanced 4,3,3');
    try { wl.byteShards(10, 0); ok(false, 'byteShards n=0 throws'); } catch (e) { ok(true, 'byteShards n=0 throws'); }

    console.log('\n' + pass + ' passed, ' + fail + ' failed');
    if (fail) { console.log('\nFAILURES:'); failures.forEach(function (f) { console.log('  - ' + f); }); process.exit(1); }
    console.log('Streaming byte-shard coverage is exactly-once across all file shapes, chunk sizes, and shard counts.');
}
main().catch(function (e) { console.error(e); process.exit(1); });
