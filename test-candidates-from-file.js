// Extensive tests for file-backed keyspace enumeration (src/wordlist-fs candidatesFromFile).
// Core property: candidatesFromFile(path, spec, {skip,limit}) === in-memory candidates({...spec, words})
// for EVERY window, where words = read.split(/\r?\n/).filter(w => w.length > 0). Plus edge cases,
// small-stride seeking, rules (word-major, incl. mid-word slices), mask/bruteforce delegation, and a
// large-file CONSTANT-MEMORY check (never load the file).

const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');
const wl = require('./src/wordlist-fs');
const attack = require('./src/attack');

let PASS = 0, FAIL = 0;
function ok(name, cond, extra) { if (cond) { PASS++; } else { FAIL++; console.log('  FAIL', name, extra != null ? '-- ' + extra : ''); } }

async function collect(gen) { const out = []; for await (const x of gen) out.push(x); return out; }
const memWords = (content) => content.split(/\r?\n/).filter((w) => w.length > 0);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cjf-'));
const files = [];
function writeFile(name, content) { const p = path.join(TMP, name); fs.writeFileSync(p, content); files.push(p); return p; }

function windowsFor(N, stride) {
  const w = [
    {}, { skip: 0, limit: 0 }, { skip: 0, limit: 1 }, { skip: 0, limit: N }, { skip: 0, limit: N + 10 },
    { skip: 1 }, { skip: 1, limit: 1 }, { skip: Math.max(0, N - 1), limit: 1 }, { skip: N }, { skip: N + 5 },
    { skip: Math.floor(N / 2), limit: 3 }, { skip: 2, limit: 3 },
  ];
  for (const b of [stride - 1, stride, stride + 1, 2 * stride - 1, 2 * stride, 2 * stride + 1]) {
    if (b >= 0 && b <= N + 2) w.push({ skip: b, limit: 5 });
  }
  return w;
}

async function checkWordlist(name, content, stride) {
  const p = writeFile(name, content);
  const words = memWords(content);
  const N = words.length;
  let allGood = true;
  for (const opts of windowsFor(N, stride)) {
    const o = Object.assign({}, opts, { stride });
    const got = await collect(wl.candidatesFromFile(p, { type: 'wordlist' }, o));
    const want = await collect(attack.candidates({ type: 'wordlist', words }, opts));
    if (!eq(got, want)) { allGood = false; console.log('   window', JSON.stringify(opts), 'got', JSON.stringify(got).slice(0, 120), 'want', JSON.stringify(want).slice(0, 120)); break; }
  }
  ok('wordlist ' + name + ' (N=' + N + ', stride=' + stride + ')', allGood);
  // countWords must equal the in-memory word count
  ok('countWords ' + name, (await wl.countWords(p, { stride })) === N, 'got ' + (await wl.countWords(p, { stride })) + ' want ' + N);
}

async function checkRules(name, content, rules, stride, withApply) {
  const p = writeFile(name, content);
  const words = memWords(content);
  const R = rules.length;
  const N = words.length * R;
  const apply = withApply ? (w, r) => w + '|' + r : undefined;
  const spec = { type: 'rules', rules };
  const memSpec = { type: 'rules', words, rules };
  if (withApply) { spec.apply = apply; memSpec.apply = apply; }
  const opts = [
    {}, { skip: 0, limit: 1 }, { skip: 1, limit: 1 }, { skip: R - 1, limit: 2 }, { skip: R, limit: R },
    { skip: 2 * R + 1, limit: 3 }, { skip: Math.max(0, N - 1), limit: 1 }, { skip: 0, limit: N }, { skip: 3, limit: 7 },
    { skip: stride * R - 1, limit: 4 }, { skip: stride * R, limit: 5 },
  ];
  let allGood = true;
  for (const o of opts) {
    if (o.skip != null && o.skip > N + 5) continue;
    const got = await collect(wl.candidatesFromFile(p, spec, Object.assign({}, o, { stride })));
    const want = await collect(attack.candidates(memSpec, o));
    if (!eq(got, want)) { allGood = false; console.log('   rwindow', JSON.stringify(o), 'got', JSON.stringify(got).slice(0, 140), 'want', JSON.stringify(want).slice(0, 140)); break; }
  }
  ok('rules ' + name + ' (words=' + words.length + ' R=' + R + ' apply=' + !!withApply + ' stride=' + stride + ')', allGood);
}

async function main() {
  // ---- 1) wordlist correctness across line endings + edge content ----
  const bodyLF = Array.from({ length: 37 }, (_, i) => 'w' + String(i).padStart(3, '0')).join('\n');
  await checkWordlist('lf.txt', bodyLF, 8);
  await checkWordlist('lf-trailing.txt', bodyLF + '\n', 8);
  await checkWordlist('crlf.txt', bodyLF.replace(/\n/g, '\r\n') + '\r\n', 8);
  await checkWordlist('mixed.txt', 'a\nb\r\nc\nd\r\ne', 4);
  await checkWordlist('empty-lines.txt', 'a\n\n\nb\n\nc\n\n\n\nd\n', 4); // interspersed empty lines must be DROPPED
  await checkWordlist('lone-cr.txt', 'ab\rcd\nef\rgh\nx', 4); // lone \r is part of the word, not a break
  await checkWordlist('utf8.txt', 'café\nдвор\n日本語\nemoji\u{1F600}\nz', 3);
  await checkWordlist('single.txt', 'only', 4);
  await checkWordlist('single-nl.txt', 'only\n', 4);

  // ---- 2) rules correctness (word-major; with + without apply) ----
  await checkRules('rules-apply.txt', bodyLF, ['', '!', '123', '$x'], 8, true);
  await checkRules('rules-noapply.txt', bodyLF, ['', 'r1', 'r2'], 8, false);
  await checkRules('rules-crlf.txt', bodyLF.replace(/\n/g, '\r\n'), ['a', 'bb'], 4, true);

  // ---- 3) small-stride deep seeking (forces many index entries) ----
  await checkWordlist('stride2.txt', Array.from({ length: 100 }, (_, i) => 'k' + i).join('\n'), 2);

  // ---- 4) mask / bruteforce delegate to in-memory candidates (path ignored) ----
  const maskA = await collect(wl.candidatesFromFile('/nonexistent', { type: 'mask', mask: '?d?d' }, { skip: 5, limit: 23 }));
  const maskB = await collect(attack.candidates({ type: 'mask', mask: '?d?d' }, { skip: 5, limit: 23 }));
  ok('mask delegation', eq(maskA, maskB));
  const bfA = await collect(wl.candidatesFromFile('/nonexistent', { type: 'bruteforce', charset: 'abc', min: 1, max: 3 }, { skip: 7, limit: 11 }));
  const bfB = await collect(attack.candidates({ type: 'bruteforce', charset: 'abc', min: 1, max: 3 }, { skip: 7, limit: 11 }));
  ok('bruteforce delegation', eq(bfA, bfB));

  // ---- 5) edge cases ----
  ok('empty file -> 0 words', (await wl.countWords(writeFile('empty.txt', ''), { stride: 4 })) === 0);
  ok('empty file -> no candidates', (await collect(wl.candidatesFromFile(path.join(TMP, 'empty.txt'), { type: 'wordlist' }, { stride: 4 }))).length === 0);
  ok('only-empty-lines -> 0 words', (await wl.countWords(writeFile('blank.txt', '\n\n\n\n'), { stride: 4 })) === 0);
  ok('rules R=0 -> nothing', (await collect(wl.candidatesFromFile(writeFile('r0.txt', bodyLF), { type: 'rules', rules: [] }, { stride: 8 }))).length === 0);

  // ---- 6) LARGE FILE — constant memory + deep correctness ----
  const BIG = path.join(TMP, 'big.txt'); files.push(BIG);
  const M = 2_000_000, STRIDE = 4096;
  const ws = fs.createWriteStream(BIG);
  await new Promise((res, rej) => {
    let i = 0;
    (function pump() {
      let okToWrite = true;
      while (i < M && okToWrite) { okToWrite = ws.write('w' + String(i).padStart(7, '0') + '\n'); i++; }
      if (i < M) ws.once('drain', pump); else ws.end(res);
    })();
    ws.on('error', rej);
  });
  const fileBytes = fs.statSync(BIG).size;
  const idx = await wl.buildLineIndex(BIG, STRIDE);
  ok('big countWords == M', idx.totalWords === M, idx.totalWords);
  ok('big index is sparse', idx.offsets.length === Math.ceil(M / STRIDE), idx.offsets.length + ' vs ' + Math.ceil(M / STRIDE));
  // deep window correctness
  const deep = await collect(wl.candidatesFromFile(BIG, { type: 'wordlist' }, { skip: 1_950_003, limit: 4, stride: STRIDE }));
  ok('big deep window correct', eq(deep, ['w1950003', 'w1950004', 'w1950005', 'w1950006']), JSON.stringify(deep));
  // full enumeration count == M, sampling peak heap to prove CONSTANT memory (never buffers the file)
  const base = process.memoryUsage().heapUsed; let peak = 0, n = 0;
  for await (const _c of wl.candidatesFromFile(BIG, { type: 'wordlist' }, { stride: STRIDE })) { n++; if ((n & 0x3ffff) === 0) { const h = process.memoryUsage().heapUsed - base; if (h > peak) peak = h; } }
  ok('big full enumeration count == M', n === M, n);
  const peakMB = Math.round(peak / 1048576), fileMB = Math.round(fileBytes / 1048576);
  ok('big constant memory (peak heap < 60MB while streaming ' + fileMB + 'MB file / ' + M + ' words)', peak < 60 * 1048576, 'peak ' + peakMB + 'MB');
  console.log('   [mem] file=' + fileMB + 'MB, M=' + M + ', index=' + idx.offsets.length + ' offsets, peak heap delta≈' + peakMB + 'MB');

  console.log('\n==== candidatesFromFile: ' + PASS + ' passed, ' + FAIL + ' failed ====');
}

main()
  .catch((e) => { console.error('CRASH', e); FAIL++; })
  .finally(() => { for (const f of files) { try { fs.unlinkSync(f); } catch {} } try { fs.rmdirSync(TMP); } catch {} process.exit(FAIL ? 1 : 0); });
