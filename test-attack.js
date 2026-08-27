// Extensive correctness tests for the attack / distributed-keyspace API in src/attack.js
// (exposed on the built bundle as keyspace, candidateAt, attackCandidates, partition,
// crackMask, crackBruteforce, crackWordlist). Run: `node test-attack.js`.
//
// The security-critical invariant for distributed cracking is COVERAGE: the union of all
// partition slices must equal the full enumeration EXACTLY ONCE — a gap silently skips the
// real password on some node; an overlap wastes work. We verify that directly, plus BigInt
// exactness for spaces far beyond 2^53, bucket-boundary correctness, and huge/"unlimited"
// masks like ?a repeated (95^9, 95^20) and ?b^130.

var crack = require('./dist/crack.js');

var pass = 0, fail = 0, failures = [];
function ok(cond, msg) { if (cond) pass++; else { fail++; failures.push(msg); } }
function eqArr(a, b, msg) {
    if (a.length !== b.length) { ok(false, msg + ' [len ' + a.length + ' != ' + b.length + ']'); return; }
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) { ok(false, msg + ' [#' + i + ': ' + JSON.stringify(a[i]) + ' != ' + JSON.stringify(b[i]) + ']'); return; }
    ok(true, msg);
}
function throws(fn, msg) { try { fn(); ok(false, msg + ' [did not throw]'); } catch (e) { ok(true, msg); } }
function full(spec) { return Array.from(crack.attackCandidates(spec)); }

// synthetic specs (with a deterministic rule apply so rules yield comparable strings)
var WORDS = []; for (var i = 0; i < 20; i++) WORDS.push('w' + i);
var RULES = [':', 'c', '$1', 'r'];
var applyRule = function (w, r) { return w + '#' + r; };   // stand-in for hashcatRules.applyRule
var SPECS = [
    { type: 'wordlist', words: WORDS },
    { type: 'rules', words: WORDS.slice(0, 6), rules: RULES, apply: applyRule },
    { type: 'mask', mask: '?l?d' },
    { type: 'mask', mask: '?d?d?d' },
    { type: 'mask', mask: 'ab?d?d' },            // literal prefix
    { type: 'mask', mask: 'x?u?d' },
    { type: 'mask', mask: '?1?1', customs: { 1: 'ab12' } },
    { type: 'mask', mask: 'k???d' },             // ?? literal + ?d
    { type: 'bruteforce', charset: 'ab', min: 1, max: 3 },
    { type: 'bruteforce', charset: 'abc', min: 2, max: 3 },
    { type: 'bruteforce', charset: '01', min: 1, max: 4 }
];

// ---- 1. keyspace exactness (BigInt) ----
ok(crack.keyspace({ type: 'wordlist', words: WORDS }) === 20n, 'ks wordlist = 20');
ok(crack.keyspace({ type: 'wordlist', words: [] }) === 0n, 'ks empty wordlist = 0');
ok(crack.keyspace({ type: 'rules', words: WORDS.slice(0, 6), rules: RULES }) === 24n, 'ks rules = 6*4 = 24');
ok(crack.keyspace({ type: 'mask', mask: '?d?d?d' }) === 1000n, 'ks ?d?d?d = 1000');
ok(crack.keyspace({ type: 'mask', mask: 'company?d?d?d?d' }) === 10000n, 'ks literal+?d*4 = 10000');
ok(crack.keyspace({ type: 'mask', mask: 'secret' }) === 1n, 'ks all-literal = 1');
ok(crack.keyspace({ type: 'mask', mask: '' }) === 0n, 'ks empty mask = 0');
ok(crack.keyspace({ type: 'bruteforce', charset: 'ab', min: 1, max: 3 }) === 14n, 'ks brute ab 1-3 = 2+4+8 = 14');
(function () { var n = 6n, s = 0n, p = 1n; for (var L = 1; L <= 6; L++) { p *= n; if (L >= 1) s += p; } ok(crack.keyspace({ type: 'bruteforce', charset: 'abcdef', min: 1, max: 6 }) === s, 'ks brute abcdef 1-6 = ' + s); })();

// ---- 2. candidateAt matches full enumeration (exhaustive, small specs) + input forms ----
SPECS.forEach(function (spec) {
    var F = full(spec), N = crack.keyspace(spec);
    ok(BigInt(F.length) === N, 'enum length == keyspace :: ' + JSON.stringify(spec.mask || spec.charset || spec.type));
    var okAll = true;
    for (var i = 0; i < F.length; i++) if (crack.candidateAt(spec, i) !== F[i]) { okAll = false; break; }
    ok(okAll, 'candidateAt(i) == enum[i] :: ' + JSON.stringify(spec.mask || spec.charset || spec.type));
});
ok(crack.candidateAt({ type: 'mask', mask: '?l?d' }, 0) === crack.candidateAt({ type: 'mask', mask: '?l?d' }, 0n), 'candidateAt number == BigInt');
ok(crack.candidateAt({ type: 'mask', mask: '?l?d' }, 5) === crack.candidateAt({ type: 'mask', mask: '?l?d' }, '5'), 'candidateAt number == string');
throws(function () { crack.candidateAt({ type: 'mask', mask: '?l' }, -1); }, 'candidateAt(-1) throws');
throws(function () { crack.candidateAt({ type: 'mask', mask: '?l' }, 26); }, 'candidateAt(N) throws (out of range)');

// ---- 3. partition invariants: contiguous, sum == N, balanced ----
function checkPartition(spec, k) {
    var N = crack.keyspace(spec), parts = crack.partition(spec, k);
    ok(parts.length === k, 'partition returns k parts (k=' + k + ')');
    var acc = 0n, minL = null, maxL = null;
    for (var i = 0; i < parts.length; i++) {
        ok(parts[i].skip === acc, 'part ' + i + ' skip contiguous (k=' + k + ')');
        ok(parts[i].limit >= 0n, 'part ' + i + ' limit >= 0');
        acc += parts[i].limit;
        if (minL === null || parts[i].limit < minL) minL = parts[i].limit;
        if (maxL === null || parts[i].limit > maxL) maxL = parts[i].limit;
    }
    ok(acc === N, 'sum(limits) == keyspace (k=' + k + ', N=' + N + ')');
    if (parts.length) ok(maxL - minL <= 1n, 'partition balanced within 1 (k=' + k + ')');
}
[1, 2, 3, 5, 7, 20, 23, 100].forEach(function (k) { checkPartition({ type: 'mask', mask: '?d?d?d' }, k); });
checkPartition({ type: 'bruteforce', charset: 'ab', min: 1, max: 3 }, 5);   // k < N with buckets
checkPartition({ type: 'wordlist', words: WORDS }, 7);
checkPartition({ type: 'mask', mask: '?d' }, 25);                            // k > N -> zero-limit tail ranges
throws(function () { crack.partition(100, 0); }, 'partition parts=0 throws');

// ---- 4. slice == candidateAt window (independent code paths; validates huge spaces too) ----
function checkWindow(spec, skip, limit) {
    var got = Array.from(crack.attackCandidates(spec, { skip: skip, limit: limit }));
    var exp = [], N = crack.keyspace(spec);
    var end = BigInt(skip) + BigInt(limit); if (end > N) end = N;
    for (var i = BigInt(skip); i < end; i++) exp.push(crack.candidateAt(spec, i));
    eqArr(got, exp, 'slice==candidateAt window :: ' + (spec.mask || spec.charset || spec.type) + ' skip=' + skip + ' limit=' + limit);
}
checkWindow({ type: 'bruteforce', charset: 'ab', min: 1, max: 3 }, 1, 4);    // straddles len1->len2 boundary
checkWindow({ type: 'bruteforce', charset: 'ab', min: 1, max: 3 }, 5, 6);    // straddles len2->len3 boundary
checkWindow({ type: 'bruteforce', charset: '01', min: 1, max: 4 }, 0, 30);
checkWindow({ type: 'mask', mask: '?d?d?d' }, 337, 50);
checkWindow({ type: 'wordlist', words: WORDS }, 13, 4);
checkWindow({ type: 'rules', words: WORDS.slice(0, 6), rules: RULES, apply: applyRule }, 7, 10);

// ---- 5. COVERAGE: concat of all partition slices == full enumeration, exactly once ----
SPECS.forEach(function (spec) {
    var F = full(spec);
    [1, 2, 3, 4, 7, 13].forEach(function (k) {
        var out = [];
        crack.partition(spec, k).forEach(function (p) {
            for (var c of crack.attackCandidates(spec, { skip: p.skip, limit: p.limit })) out.push(c);
        });
        eqArr(out, F, 'coverage: ' + k + ' slices reassemble full enum :: ' + JSON.stringify(spec.mask || spec.charset || spec.type));
    });
});

// ---- 6. end-to-end distributed crack: partition -> run each slice -> exactly ONE hit == pw ----
function distributed(mode, pw, spec, k, runSlice) {
    var hits = [];
    crack.partition(spec, k).forEach(function (p) {
        var r = runSlice(crack.generateHash(mode, pw), { skip: p.skip, limit: p.limit });
        if (r !== null) hits.push(r);
    });
    ok(hits.length === 1 && hits[0] === pw, 'distributed find (k=' + k + ') exactly-one-hit == "' + pw + '" :: got ' + JSON.stringify(hits));
}
distributed(1000, 'pass777', { type: 'mask', mask: 'pass?d?d?d' }, 8, function (h, o) { return crack.crackMask(h, 1000, 'pass?d?d?d', undefined, o); });
distributed(0, 'cab', { type: 'bruteforce', charset: 'abc', min: 1, max: 3 }, 5, function (h, o) { return crack.crackBruteforce(h, 0, 'abc', 1, 3, o); });
distributed(100, 'w13', { type: 'wordlist', words: WORDS }, 6, function (h, o) { return crack.crackWordlist(h, 100, WORDS, o); });
distributed(0, 'ab5', { type: 'mask', mask: 'ab?a' }, 4, function (h, o) { return crack.crackMask(h, 0, 'ab?a', undefined, o); });  // literal + ?a

// ---- 7. huge / "unlimited" keyspace: ?a^9, ?a^20, ?b^130 — exact BigInt, no enumeration ----
var big9 = { type: 'mask', mask: '?a'.repeat(9) };
ok(crack.keyspace(big9) === 95n ** 9n, 'ks ?a^9 == 95^9 (exact BigInt, > 2^53)');
ok(crack.keyspace(big9) > 9007199254740992n, '?a^9 exceeds 2^53 (needs BigInt)');
ok(crack.keyspace({ type: 'mask', mask: '?a'.repeat(20) }) === 95n ** 20n, 'ks ?a^20 == 95^20');
ok(crack.keyspace({ type: 'mask', mask: '?b'.repeat(130) }) === 256n ** 130n, 'ks ?b^130 == 256^130 (BigInt exact where Number overflows)');
ok(crack.maskKeyspace('?b'.repeat(130)) === Infinity, 'maskKeyspace Number overflows to Infinity (why keyspace() is BigInt)');
// partition a giant space: still sums exactly, contiguous
(function () { var parts = crack.partition(big9, 1000), acc = 0n; for (var i = 0; i < parts.length; i++) { if (parts[i].skip !== acc) { ok(false, 'giant partition contiguous'); return; } acc += parts[i].limit; } ok(acc === 95n ** 9n, 'giant partition sums to 95^9'); })();
// carve a tiny window out of the middle of the giant space WITHOUT enumerating it
(function () {
    var mid = 95n ** 9n / 2n, win = Array.from(crack.attackCandidates(big9, { skip: mid, limit: 40 }));
    ok(win.length === 40, 'giant-space window yields exactly 40');
    var okAll = true; for (var i = 0; i < 40; i++) if (win[i] !== crack.candidateAt(big9, mid + BigInt(i))) { okAll = false; break; }
    ok(okAll, 'giant-space window matches candidateAt (no full enumeration)');
    ok(crack.candidateAt(big9, 95n ** 9n - 1n).length === 9, 'candidateAt(last) of giant space works');
})();
// a distributed node cracks a pw sitting deep in a huge space, given only its slice
(function () {
    var spec = { type: 'mask', mask: 'pass?a?a' }, pw = 'passZ9', h = crack.generateHash(1000, pw);   // 95^2 = 9025 space
    var idx = null, F = full(spec); for (var i = 0; i < F.length; i++) if (F[i] === pw) { idx = i; break; }
    ok(idx !== null, 'pass?a?a contains "passZ9"');
    var parts = crack.partition(spec, 10), hits = 0;
    parts.forEach(function (p) { if (crack.crackMask(h, 1000, 'pass?a?a', undefined, { skip: p.skip, limit: p.limit }) === pw) hits++; });
    ok(hits === 1, 'pass?a?a distributed (k=10): exactly one node finds "passZ9"');
})();

// ---- 8. literal + ?a shapes (pass?a etc.) ----
ok(crack.keyspace({ type: 'mask', mask: 'pass?a' }) === 95n, 'ks pass?a == 95');
ok(crack.parseMask('pass?a').length === 5, 'parseMask pass?a -> 5 positions');
ok(crack.parseMask('pass?a')[4].length === 95, 'pass?a last position = 95-char ?a set');
ok(crack.crackMask(crack.generateHash(0, 'pass!'), 0, 'pass?a') === 'pass!', 'crackMask pass?a finds "pass!"');
ok(crack.crackMask(crack.generateHash(1000, 'word7x'), 1000, 'word?d?a') === 'word7x', 'crackMask word?d?a finds "word7x"');

// ---- 9. robustness / errors ----
ok(full({ type: 'mask', mask: 'only' }).join(',') === 'only', 'all-literal mask -> single candidate');
ok(Array.from(crack.attackCandidates({ type: 'wordlist', words: [] })).length === 0, 'empty wordlist -> no candidates');
ok(Array.from(crack.attackCandidates({ type: 'mask', mask: '?d' }, { skip: 10, limit: 5 })).length === 0, 'skip==N -> empty slice');
ok(Array.from(crack.attackCandidates({ type: 'mask', mask: '?d' }, { skip: 99, limit: 5 })).length === 0, 'skip>N -> empty slice (clamped)');
ok(Array.from(crack.attackCandidates({ type: 'mask', mask: '?d' }, { skip: 0, limit: 0 })).length === 0, 'limit 0 -> empty slice');
eqArr(Array.from(crack.attackCandidates({ type: 'mask', mask: '?d' }, { skip: 8, limit: 999 })), ['8', '9'], 'limit > remaining -> clamped to end');
throws(function () { crack.keyspace({ type: 'nope' }); }, 'unknown attack type throws');
throws(function () { crack.keyspace({}); }, 'missing type throws');
throws(function () { crack.parseMask('?z'); }, 'bad mask token throws');
throws(function () { crack.parseMask('?'); }, 'lone ? throws');
throws(function () { crack.parseMask('?1', { 1: '?1' }); }, 'self-referential custom throws');

// ---- 10. determinism ----
ok(crack.candidateAt(big9, 123456789n) === crack.candidateAt(big9, 123456789n), 'candidateAt deterministic');

// ---- 11. crackRules (wordlist + rules) parity with crackWordlist ----
(function () {
    var words = ['alpha', 'bravo', 'charlie'], rules = [':', 'c', '$1', 'r'];
    var apply = function (w, r) { return w + '|' + r; };          // deterministic stand-in for a rule engine
    var rspec = { type: 'rules', words: words, rules: rules, apply: apply };
    ok(crack.keyspace(rspec) === 12n, 'rules keyspace = 3*4 = 12');
    var pw = apply(words[2], rules[3]);                          // 'charlie|r'
    var h = crack.generateHash(0, pw);
    ok(crack.crackRules(h, 0, words, rules, apply) === pw, 'crackRules finds "' + pw + '"');
    ok(crack.crackRules(crack.generateHash(0, 'nope|nope'), 0, words, rules, apply) === null, 'crackRules miss -> null');
    var hits = 0; crack.partition(rspec, 5).forEach(function (p) { if (crack.crackRules(h, 0, words, rules, apply, { skip: p.skip, limit: p.limit }) === pw) hits++; });
    ok(hits === 1, 'crackRules distributed (k=5): exactly one node hits');
    throws(function () { crack.crackRules(h, 0, words, rules); }, 'crackRules without apply throws');
})();

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log('\nFAILURES:'); failures.forEach(function (f) { console.log('  - ' + f); }); process.exit(1); }
console.log('All attack/keyspace invariants hold (coverage exactly-once, BigInt exactness, huge-space seeking).');
