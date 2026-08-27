// Attack candidate generators — the primitives behind the mask (hashcat -a 3) and
// bruteforce (-a 3, single charset + length) attacks. Pure JS, no deps.
//
//   parseMask(mask[, customs])          -> array of per-position charset strings
//   maskKeyspace(mask[, customs])       -> Number of candidates a mask expands to
//   maskCandidates(mask[, customs])     -> generator yielding every candidate
//   bruteforceKeyspace(charset,min,max) -> Number of candidates
//   bruteforceCandidates(charset,min,max) -> generator yielding every candidate
//
// A mask mixes literals you already know with placeholders that vary:
//   ?l a-z   ?u A-Z   ?d 0-9   ?s symbols   ?a ?l?u?d?s   ?h 0-9a-f   ?H 0-9A-F
//   ?b 00-ff   ?1..?4 custom charsets   ??  a literal '?'
// e.g. parseMask('secret?d?d') -> ['s','e','c','r','e','t','0123456789','0123456789'].
//
// The library's crackMask()/crackBruteforce() wrappers (in index.js) feed these
// candidates straight into verifyHash(). Generators are lazy, so a billion-candidate
// keyspace costs no memory — iteration stops the moment a match is found.

var MASK_TOKENS = 'luadshHb';
function _range(a, b) { var s = ''; for (var c = a; c <= b; c++) s += String.fromCharCode(c); return s; }
var MASK_CS = {
    l: _range(97, 122),                 // a-z
    u: _range(65, 90),                  // A-Z
    d: _range(48, 57),                  // 0-9
    h: '0123456789abcdef',              // lower hex
    H: '0123456789ABCDEF',              // upper hex
    s: _range(32, 47) + _range(58, 64) + _range(91, 96) + _range(123, 126),  // hashcat ?s (incl. space)
    b: _range(0, 255)                   // every byte
};
MASK_CS.a = MASK_CS.l + MASK_CS.u + MASK_CS.d + MASK_CS.s;   // hashcat ?a = ?l?u?d?s

function _dedup(str) { var seen = Object.create(null), out = ''; for (var i = 0; i < str.length; i++) { if (seen[str[i]] === undefined) { seen[str[i]] = 1; out += str[i]; } } return out; }

// Accept custom charsets as {1:'?l?d', 2:...} OR ['?l?d', ...] (index 0 => ?1).
function _normCustoms(c) {
    var out = {};
    if (!c) return out;
    if (Object.prototype.toString.call(c) === '[object Array]') { for (var i = 0; i < c.length && i < 4; i++) out[i + 1] = c[i]; return out; }
    for (var k = 1; k <= 4; k++) if (c[k] != null) out[k] = c[k];
    return out;
}

// Parse a hashcat mask into an array of per-position charset strings.
// A literal character becomes a one-character charset. Throws Error on a bad token.
function parseMask(mask, customs) {
    mask = String(mask == null ? '' : mask);
    customs = _normCustoms(customs);
    function base(t) { return (t && MASK_TOKENS.indexOf(t) >= 0) ? MASK_CS[t] : null; }
    var resolved = {};
    function resolveCustom(n, stack) {                       // expand ?l/?d/… and ?1-?4 refs inside a -N custom set
        if (resolved[n] !== undefined) return resolved[n];
        var def = customs[n];
        if (def == null || def === '') throw new Error('mask: custom charset ?' + n + ' is empty or undefined');
        stack = stack || {};
        if (stack[n]) throw new Error('mask: custom charset ?' + n + ' references itself');
        stack[n] = 1;
        var out = '', i = 0;
        while (i < def.length) {
            var ch = def.charAt(i);
            if (ch === '?') {
                var nx = def.charAt(i + 1);
                if (nx === '?') { out += '?'; i += 2; continue; }
                if (nx >= '1' && nx <= '4') { out += resolveCustom(+nx, stack); i += 2; continue; }
                var bb = base(nx); if (bb == null) throw new Error('mask: unknown token "?' + nx + '" in custom charset ?' + n);
                out += bb; i += 2; continue;
            }
            out += ch; i++;
        }
        out = _dedup(out); resolved[n] = out; return out;
    }
    var positions = [], i = 0;
    while (i < mask.length) {
        var ch = mask.charAt(i);
        if (ch === '?') {
            var nx = mask.charAt(i + 1);
            if (nx === '') throw new Error('mask: ends with a lone "?" (use "??" for a literal ?)');
            if (nx === '?') { positions.push('?'); i += 2; continue; }
            if (nx >= '1' && nx <= '4') { positions.push(resolveCustom(+nx)); i += 2; continue; }
            var b2 = base(nx); if (b2 == null) throw new Error('mask: unknown token "?' + nx + '" (use ?l ?u ?d ?s ?a ?h ?H ?b or ?1-?4)');
            positions.push(b2); i += 2; continue;
        }
        positions.push(ch); i++;
    }
    return positions;
}

function maskKeyspace(mask, customs) { var P = parseMask(mask, customs), t = 1; for (var i = 0; i < P.length; i++) t *= P[i].length; return P.length ? t : 0; }

// Shared odometer: enumerate every combination of an array of per-position charsets,
// last position varying fastest (matches hashcat's ordering).
function* _walk(positions) {
    var L = positions.length; if (!L) return;
    var idx = new Array(L); for (var q = 0; q < L; q++) idx[q] = 0;
    while (true) {
        var s = ''; for (var p = 0; p < L; p++) s += positions[p].charAt(idx[p]);
        yield s;
        var pos = L - 1;
        while (pos >= 0) { idx[pos]++; if (idx[pos] < positions[pos].length) break; idx[pos] = 0; pos--; }
        if (pos < 0) break;
    }
}

function maskCandidates(mask, customs) { return _walk(parseMask(mask, customs)); }

// ---- bruteforce: one charset, every length in [min,max] ----
function bruteforceKeyspace(charset, min, max) {
    var n = String(charset || '').length, t = 0;
    min = min | 0 || 1; max = max | 0 || min; if (max < min) max = min;
    for (var L = min; L <= max; L++) t += Math.pow(n, L);
    return t;
}
function* bruteforceCandidates(charset, min, max) {
    var cs = String(charset || ''); if (!cs.length) return;
    min = min | 0 || 1; max = max | 0 || min; if (max < min) max = min;
    for (var L = min; L <= max; L++) {
        var positions = new Array(L); for (var q = 0; q < L; q++) positions[q] = cs;
        yield* _walk(positions);
    }
}

// ===========================================================================
// Distributed cracking: exact keyspace, random access, and seekable slicing.
//
// An attack "spec" is one of:
//   { type:'wordlist',   words:[...] }
//   { type:'rules',      words:[...], rules:[...], apply?:(word,rule)=>string }
//   { type:'mask',       mask:'?l?l?d', customs?:{...} }
//   { type:'bruteforce', charset:'abc…', min:1, max:8 }
//
// keyspace(spec) is the total candidate count N (BigInt — spaces routinely exceed
// 2^53). partition(N, nodes) cuts [0,N) into contiguous [skip,limit) ranges, and
// candidates(spec, {skip, limit}) yields exactly one node's slice — seeking to skip
// in O(length) via mixed-radix, never by walking the skipped candidates. This is the
// hashcat --keyspace / -s <skip> -l <limit> model, in pure JS.
//
// Candidate ordering is identical to maskCandidates()/bruteforceCandidates() (last
// position varies fastest; bruteforce runs shorter lengths first), so an index means
// the same candidate on every node and across resumes.
//
// Rules are keyspace-only in core (count = words × rules): the rule engine
// (zzzteph/hashcat-rules-js) is a UI-only lib, not a crack-js dependency. Pass its
// applyRule as spec.apply to have candidates()/candidateAt() emit mangled strings;
// otherwise they emit {word, rule} pairs for the caller to apply.
// ===========================================================================

function _toBig(x) { return typeof x === 'bigint' ? x : BigInt(x); }

// Total number of candidates an attack produces, as a BigInt.
function keyspace(spec) {
    if (!spec || !spec.type) throw new Error('keyspace: spec.type required');
    if (spec.type === 'wordlist') return BigInt((spec.words || []).length);
    if (spec.type === 'rules') return BigInt((spec.words || []).length) * BigInt((spec.rules || []).length);
    if (spec.type === 'mask') {
        var P = parseMask(spec.mask, spec.customs);
        if (!P.length) return 0n;
        var t = 1n; for (var i = 0; i < P.length; i++) t *= BigInt(P[i].length); return t;
    }
    if (spec.type === 'bruteforce') {
        var cs = String(spec.charset || ''); if (!cs.length) return 0n;
        var n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn; if (mx < mn) mx = mn;
        var s = 0n, p = 1n; for (var L = 1; L <= mx; L++) { p *= n; if (L >= mn) s += p; } return s;
    }
    throw new Error('keyspace: unknown type "' + spec.type + '"');
}

// Decode a mixed-radix index into a string over `positions` (last position least
// significant — matches the odometer in _walk).
function _decode(positions, idx) {
    var L = positions.length, chars = new Array(L);
    for (var pos = L - 1; pos >= 0; pos--) { var sz = BigInt(positions[pos].length); chars[pos] = positions[pos].charAt(Number(idx % sz)); idx = idx / sz; }
    return chars.join('');
}

// The index-th candidate (0-based). `index` may be a BigInt, number, or numeric string.
function candidateAt(spec, index) {
    var idx = _toBig(index);
    if (idx < 0n) throw new Error('candidateAt: negative index');
    var N = keyspace(spec);
    if (idx >= N) throw new Error('candidateAt: index ' + idx + ' >= keyspace ' + N);
    if (spec.type === 'wordlist') return spec.words[Number(idx)];
    if (spec.type === 'rules') {
        var R = BigInt(spec.rules.length), w = Number(idx / R), r = Number(idx % R);
        return spec.apply ? spec.apply(spec.words[w], spec.rules[r]) : { word: spec.words[w], rule: spec.rules[r] };
    }
    if (spec.type === 'mask') return _decode(parseMask(spec.mask, spec.customs), idx);
    if (spec.type === 'bruteforce') {
        var cs = String(spec.charset), n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn; if (mx < mn) mx = mn;
        var rem = idx, p = 1n;
        for (var L = 1; L <= mx; L++) { p *= n; if (L < mn) continue; if (rem < p) { var P = new Array(L); for (var k = 0; k < L; k++) P[k] = cs; return _decode(P, rem); } rem -= p; }
        throw new Error('candidateAt: bruteforce index out of range');
    }
    throw new Error('candidateAt: unknown type "' + spec.type + '"');
}

// Seek an odometer to `startIdx` within one fixed-length block, then yield `count` strings.
function* _walkSlice(positions, startIdx, count) {
    var L = positions.length; if (!L) return;
    var idx = new Array(L), rem = startIdx;
    for (var pos = L - 1; pos >= 0; pos--) { var sz = BigInt(positions[pos].length); idx[pos] = Number(rem % sz); rem = rem / sz; }
    var left = count;
    while (left > 0n) {
        var s = ''; for (var p = 0; p < L; p++) s += positions[p].charAt(idx[p]);
        yield s; left -= 1n;
        var q = L - 1; while (q >= 0) { idx[q]++; if (idx[q] < positions[q].length) break; idx[q] = 0; q--; } if (q < 0) break;
    }
}

// Lazy generator over the candidate range [skip, skip+limit) (both optional; default =
// the whole keyspace). This is one node's share of a distributed job.
function* candidates(spec, opts) {
    opts = opts || {};
    var N = keyspace(spec);
    var skip = opts.skip != null ? _toBig(opts.skip) : 0n; if (skip < 0n) skip = 0n; if (skip > N) skip = N;
    var end = opts.limit != null ? skip + _toBig(opts.limit) : N; if (end > N) end = N;
    var count = end - skip; if (count <= 0n) return;

    if (spec.type === 'wordlist') { for (var i = Number(skip), e = Number(end); i < e; i++) yield spec.words[i]; return; }
    if (spec.type === 'rules') {
        var R = BigInt(spec.rules.length), ap = spec.apply, j = skip;
        while (j < end) { var wi = Number(j / R), ri = Number(j % R); yield ap ? ap(spec.words[wi], spec.rules[ri]) : { word: spec.words[wi], rule: spec.rules[ri] }; j += 1n; }
        return;
    }
    if (spec.type === 'mask') { yield* _walkSlice(parseMask(spec.mask, spec.customs), skip, count); return; }
    if (spec.type === 'bruteforce') {
        var cs = String(spec.charset), n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn; if (mx < mn) mx = mn;
        var base = 0n, p = 1n;
        for (var L = 1; L <= mx; L++) {
            p *= n; if (L < mn) continue;
            var lo = base, hi = base + p;               // this length-L block spans global [lo,hi)
            var from = skip > lo ? skip : lo, to = end < hi ? end : hi;
            if (from < to) { var P = new Array(L); for (var k = 0; k < L; k++) P[k] = cs; yield* _walkSlice(P, from - lo, to - from); }
            base = hi; if (base >= end) break;
        }
        return;
    }
    throw new Error('candidates: unknown type "' + spec.type + '"');
}

// Cut a keyspace into `parts` contiguous [skip,limit) ranges. Accepts a spec or a
// precomputed total. Remainder is spread one-per over the leading ranges so the union
// is exactly [0,N) with no gaps or overlaps. Returns [{index, skip, limit}] (BigInts).
function partition(totalOrSpec, parts) {
    var N = (totalOrSpec && typeof totalOrSpec === 'object' && totalOrSpec.type) ? keyspace(totalOrSpec) : _toBig(totalOrSpec);
    var k = BigInt(parts); if (k <= 0n) throw new Error('partition: parts must be >= 1');
    var each = N / k, extra = N % k, out = [], skip = 0n;
    for (var i = 0n; i < k; i++) { var lim = each + (i < extra ? 1n : 0n); out.push({ index: Number(i), skip: skip, limit: lim }); skip += lim; }
    return out;
}

module.exports = {
    parseMask: parseMask,
    maskKeyspace: maskKeyspace,
    maskCandidates: maskCandidates,
    bruteforceKeyspace: bruteforceKeyspace,
    bruteforceCandidates: bruteforceCandidates,
    MASK_CS: MASK_CS,
    // distributed primitives
    keyspace: keyspace,
    candidateAt: candidateAt,
    candidates: candidates,
    partition: partition
};
