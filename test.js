// crack-js test harness
// ----------------------
// Verifies every registered hash type against hashcat's OWN example vector.
// This is the single source of truth for "is a mode implemented correctly":
//   * positive  - verifyHash(examplePassword, exampleHash, type) === true
//   * negative  - a deliberately wrong password === false
//   * lookup    - the type resolves by BOTH its name and its hashcat mode number
//
// Exit code is 0 only when every check passes, so it can gate an automated
// implement->build->test loop.  Run with:  npm test   (builds, then runs this)

const hashcat = require('./dist/crack.js');

let passed = 0;
let failed = 0;
const failures = [];

function fail(type, msg) {
    failed++;
    failures.push(`  FAIL  ${type}: ${msg}`);
    console.log(`FAIL  ${type} - ${msg}`);
}

function ok(type, detail) {
    passed++;
    console.log(`ok    ${type}${detail ? '  (' + detail + ')' : ''}`);
}

console.log(`Testing ${hashcat.availableHashTypes.length} hash types\n`);

for (const type of hashcat.availableHashTypes) {
    const ex = hashcat.getExample(type);

    if (!ex || !ex.hash) {
        fail(type, 'no example vector registered');
        continue;
    }

    // 1) positive: the real password must verify
    let positive;
    try {
        positive = hashcat.verifyHash(ex.password, ex.hash, type);
    } catch (e) {
        fail(type, `verifyHash threw: ${e.message}`);
        continue;
    }
    if (positive !== true) {
        fail(type, `example password "${ex.password}" did NOT verify against ${ex.hash}`);
        continue;
    }

    // 2) negative: a wrong password must be rejected
    let negative;
    try {
        negative = hashcat.verifyHash('crack-js-wrong-' + type, ex.hash, type);
    } catch (e) {
        fail(type, `verifyHash(wrong) threw: ${e.message}`);
        continue;
    }
    if (negative !== false) {
        fail(type, `a wrong password was accepted (got ${negative})`);
        continue;
    }

    // 3) shape check: the example hash must be recognised by isValidHash
    //    (skip types whose canonical form isn't the plain example string)
    try {
        if (hashcat.isValidHash(ex.hash, type) !== true) {
            fail(type, `isValidHash rejected its own example hash`);
            continue;
        }
    } catch (e) {
        fail(type, `isValidHash threw: ${e.message}`);
        continue;
    }

    ok(type);
}

// 4) mode-number resolution: a handful of hashcat -m numbers must resolve to
//    the same verification as the descriptive name.
const modeChecks = [
    [0, 'md5'], [100, 'sha1'], [1400, 'sha256'], [1700, 'sha512'],
    [10, 'md5-pass-salt'], [20, 'md5-salt-pass'],
    [1410, 'sha256-pass-salt'], [1740, 'sha512-salt-utf16le-pass'],
];
for (const [mode, name] of modeChecks) {
    const ex = hashcat.getExample(name);
    if (!ex) { fail(`mode ${mode}`, `name "${name}" has no example`); continue; }
    let byMode, byName;
    try {
        byMode = hashcat.verifyHash(ex.password, ex.hash, mode);
        byName = hashcat.verifyHash(ex.password, ex.hash, name);
    } catch (e) {
        fail(`mode ${mode}`, `lookup threw: ${e.message}`);
        continue;
    }
    if (byMode === true && byMode === byName) {
        ok(`mode ${mode} == ${name}`);
    } else {
        fail(`mode ${mode}`, `mode-number lookup disagreed with name (mode=${byMode}, name=${byName})`);
    }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
    console.log('\nFAILURES:\n' + failures.join('\n'));
    process.exit(1);
}
console.log('All hash types verified against their hashcat example vectors.');
