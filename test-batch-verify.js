// Tests for batch verification: prepareTargets / matchCandidate.
// Ground truth is the per-target verifyHash(); matchCandidate() must return EXACTLY the same set for every
// candidate — for both the unsalted fast path (hash-once + map) and the salted per-target fallback.
const crack = require('./dist/crack.js');
const assert = require('assert');

let PASS = 0, FAIL = 0;
function ok(name, cond, extra) { if (cond) PASS++; else { FAIL++; console.log('  FAIL', name, extra != null ? '-- ' + extra : ''); } }
const sorted = (a) => a.slice().sort();
const bruteMatch = (cand, targets, type) => targets.filter((t) => crack.verifyHash(cand, t, type));

function crossCheck(name, type, targets, candidates) {
  const prep = crack.prepareTargets(targets, type);
  let good = true;
  for (const c of candidates) {
    const got = sorted(crack.matchCandidate(c, prep));
    const want = sorted(bruteMatch(c, targets, type));
    if (JSON.stringify(got) !== JSON.stringify(want)) { good = false; console.log('   cand', JSON.stringify(c), 'got', JSON.stringify(got).slice(0, 120), 'want', JSON.stringify(want).slice(0, 120)); break; }
  }
  ok(name + ' matches verifyHash for all candidates', good);
  return prep;
}

function main() {
  // ---- 1) classification + example round-trip + cross-check ----
  const TYPES = [
    ['md5', false], ['sha1', false], ['sha256', false], ['sha512', false], ['ntlm', false], ['mysql323', false],
    ['md5crypt', true], ['sha512crypt', true], ['sha256crypt', true], ['bcrypt', true], ['md5-pass-salt', true], ['hmac-md5', true],
  ];
  for (const [type, expectSalted] of TYPES) {
    const ex = crack.getExample(type);
    if (!ex) { ok(type + ' has example', false); continue; }
    const prep = crack.prepareTargets([ex.hash], type);
    ok(type + ' salted=' + expectSalted, prep.salted === expectSalted, 'got salted=' + prep.salted);
    ok(type + ' cracks its example', JSON.stringify(crack.matchCandidate(ex.password, prep)) === JSON.stringify([ex.hash]), JSON.stringify(crack.matchCandidate(ex.password, prep)));
    ok(type + ' rejects wrong pw', crack.matchCandidate('definitely-not-the-pw-xyz', prep).length === 0);
    crossCheck(type + ' (example)', type, [ex.hash], [ex.password, 'wrong-a', 'wrong-b']);
  }

  // ---- 2) UNSALTED fast path with MANY targets + duplicates ----
  const N = 500;
  const words = Array.from({ length: N }, (_, i) => 'w' + i);
  const md5Targets = words.map((w) => crack.generateHash('md5', w));
  ok('md5 generateHash works', md5Targets.every((h) => typeof h === 'string' && h.length === 32));
  // add a duplicate of w250's hash -> matchCandidate must return BOTH
  const dupHash = crack.generateHash('md5', 'w250');
  const targetsWithDup = md5Targets.concat([dupHash]);
  const prepFast = crack.prepareTargets(targetsWithDup, 'md5');
  ok('md5 many-targets uses fast path', prepFast.salted === false);
  ok('md5 duplicate target returns both', crack.matchCandidate('w250', prepFast).length === 2);
  ok('md5 miss returns []', crack.matchCandidate('not-in-the-list', prepFast).length === 0);
  ok('md5 uppercase target still matches (normalized)', (function () {
    const p = crack.prepareTargets([crack.generateHash('md5', 'ZeBRA').toUpperCase()], 'md5');
    return JSON.stringify(crack.matchCandidate('ZeBRA', p)).toLowerCase().includes(crack.generateHash('md5', 'ZeBRA'));
  })());
  // full cross-check vs brute verifyHash on a sample of hits + misses
  crossCheck('md5 many-targets', 'md5', md5Targets, ['w0', 'w1', 'w249', 'w250', 'w499', 'nope', 'w500', '']);

  // ---- 3) SALTED path: same password, DIFFERENT salts -> all returned ----
  const saltType = 'md5-pass-salt';
  const g = crack.generateHash(saltType, 'alpha', { salt: 's1' });
  if (typeof g === 'string') {
    const salted = [
      crack.generateHash(saltType, 'alpha', { salt: 's1' }),
      crack.generateHash(saltType, 'beta', { salt: 's2' }),
      crack.generateHash(saltType, 'alpha', { salt: 's3' }), // same pw, different salt
    ];
    const prepS = crack.prepareTargets(salted, saltType);
    ok(saltType + ' uses salted path', prepS.salted === true);
    ok(saltType + ' same-pw-different-salt returns both', sortedEq(crack.matchCandidate('alpha', prepS), [salted[0], salted[2]]), JSON.stringify(crack.matchCandidate('alpha', prepS)));
    ok(saltType + ' beta returns its target', sortedEq(crack.matchCandidate('beta', prepS), [salted[1]]));
    ok(saltType + ' wrong pw -> []', crack.matchCandidate('gamma', prepS).length === 0);
    crossCheck(saltType + ' multi-salt', saltType, salted, ['alpha', 'beta', 'gamma', 'delta']);
  } else {
    console.log('   [skip] md5-pass-salt not generatable — salted multi-salt sub-test skipped');
  }

  // ---- 4) edge cases ----
  ok('empty prepared -> []', crack.matchCandidate('x', null).length === 0);
  ok('prepareTargets([]) -> no match', crack.matchCandidate('x', crack.prepareTargets([], 'md5')).length === 0);
  ok('prepareTargets(single string)', crack.matchCandidate('w7', crack.prepareTargets(crack.generateHash('md5', 'w7'), 'md5')).length === 1);
  ok('unknown type -> no throw + empty (warns)', crack.matchCandidate('x', crack.prepareTargets(['h'], 'no-such-type-zzz')).length === 0);

  console.log('\n==== batch-verify: ' + PASS + ' passed, ' + FAIL + ' failed ====');
  process.exit(FAIL ? 1 : 0);
}
function sortedEq(a, b) { return JSON.stringify(sorted(a)) === JSON.stringify(sorted(b)); }

main();
