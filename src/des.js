// Traditional DES-based crypt(3): descrypt (1500) and BSDi extended crypt (12400).
// Hand-written salted DES (FreeSec semantics): the crypt "salt" permutes the E
// expansion; the zero block is encrypted `count` times. Bit arrays are MSB-first.
var ITOA64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];
var FP = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];
var E = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1];
var P = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
var SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
var SBOX = [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
];

function _permute(bits, table) {
    var out = new Array(table.length);
    for (var i = 0; i < table.length; i++) out[i] = bits[table[i] - 1];
    return out;
}
function _keySchedule(keyBits) {
    var cd = _permute(keyBits, PC1), c = cd.slice(0, 28), d = cd.slice(28, 56), sub = [];
    for (var r = 0; r < 16; r++) {
        var s = SHIFTS[r];
        c = c.slice(s).concat(c.slice(0, s));
        d = d.slice(s).concat(d.slice(0, s));
        sub.push(_permute(c.concat(d), PC2));
    }
    return sub;
}
// Run `count` DES encryptions of `block` (64 bits) under `sub`, salt-permuted E.
function _desCrypt(block, sub, salt, count) {
    var b = _permute(block, IP), L = b.slice(0, 32), R = b.slice(32, 64), i, r, k;
    for (var c = 0; c < count; c++) {
        for (r = 0; r < 16; r++) {
            var er = _permute(R, E);
            for (i = 0; i < 24; i++) if ((salt >> i) & 1) { var t = er[i]; er[i] = er[i + 24]; er[i + 24] = t; }
            for (k = 0; k < 48; k++) er[k] ^= sub[r][k];
            var out32 = [];
            for (var sb = 0; sb < 8; sb++) {
                var six = er.slice(sb * 6, sb * 6 + 6);
                var row = (six[0] << 1) | six[5], col = (six[1] << 3) | (six[2] << 2) | (six[3] << 1) | six[4];
                var v = SBOX[sb][row * 16 + col];
                out32.push((v >> 3) & 1, (v >> 2) & 1, (v >> 1) & 1, v & 1);
            }
            var f = _permute(out32, P), nR = new Array(32);
            for (k = 0; k < 32; k++) nR[k] = L[k] ^ f[k];
            L = R; R = nR;
        }
        // swap for next iteration / final output: DES leaves (R16,L16)
        var tmp = L; L = R; R = tmp;
    }
    return _permute(L.concat(R), FP);
}
function _bytesToKeyBits(kb) {
    var bits = new Array(64);
    for (var j = 0; j < 8; j++) for (var k = 0; k < 8; k++) bits[j * 8 + k] = (kb[j] >> (7 - k)) & 1;
    return bits;
}
function _blockToB64(bits) {
    // 66-bit padded encoding (11 chars) of the 64-bit block, crypt style.
    var v = bits.slice(); v.push(0, 0);
    var out = '';
    for (var i = 0; i < 11; i++) {
        var idx = 0;
        for (var b = 0; b < 6; b++) idx = (idx << 1) | v[i * 6 + b];
        out += ITOA64[idx];
    }
    return out;
}
function _a64(ch) { return ITOA64.indexOf(ch); }

// descrypt (1500): crypt($word, $salt). salt = 2 chars (12-bit).
function verifyDescrypt(password, hash) {
    var h = String(hash);
    if (!/^[.\/0-9A-Za-z]{13}$/.test(h)) return false;
    var s0 = _a64(h[0]), s1 = _a64(h[1]);
    if (s0 < 0 || s1 < 0) return false;
    var salt = s0 | (s1 << 6);
    var kb = new Array(8), p = String(password);
    for (var j = 0; j < 8; j++) kb[j] = (j < p.length ? (p.charCodeAt(j) & 0x7f) << 1 : 0) & 0xff;
    var sub = _keySchedule(_bytesToKeyBits(kb));
    var res = _desCrypt(new Array(64).fill(0), sub, salt, 25);
    return h.substring(0, 2) + _blockToB64(res) === h;
}

// BSDi extended crypt (12400): _<iter:4><salt:4><hash:11>, fold long passwords.
function verifyBsdi(password, hash) {
    var h = String(hash);
    var m = /^_([.\/0-9A-Za-z]{4})([.\/0-9A-Za-z]{4})([.\/0-9A-Za-z]{11})$/.exec(h);
    if (!m) return false;
    var iter = 0, salt = 0, i;
    for (i = 0; i < 4; i++) iter |= _a64(m[1][i]) << (6 * i);
    for (i = 0; i < 4; i++) salt |= _a64(m[2][i]) << (6 * i);
    var p = String(password), idx = 0, kb = new Array(8), j;
    for (j = 0; j < 8; j++) kb[j] = (idx < p.length ? (p.charCodeAt(idx++) & 0x7f) << 1 : 0) & 0xff;
    var sub = _keySchedule(_bytesToKeyBits(kb));
    while (idx < p.length) {
        // encrypt current key block under itself (salt 0, 1 round), then fold next chars.
        var enc = _desCrypt(_bytesToKeyBits(kb), sub, 0, 1);
        for (j = 0; j < 8; j++) { var byte = 0; for (var b = 0; b < 8; b++) byte = (byte << 1) | enc[j * 8 + b]; kb[j] = byte; }
        for (j = 0; j < 8 && idx < p.length; j++) kb[j] ^= (p.charCodeAt(idx++) & 0x7f) << 1;
        sub = _keySchedule(_bytesToKeyBits(kb));
    }
    var res = _desCrypt(new Array(64).fill(0), sub, salt, iter);
    return '_' + m[1] + m[2] + _blockToB64(res) === h;
}

// Standard DES-ECB block encrypt/decrypt (no crypt salt). key/pt are 8-byte arrays.
function _desBlock(sub, ptBytes) {
    var bits = new Array(64), i, k;
    for (i = 0; i < 8; i++) for (k = 0; k < 8; k++) bits[i * 8 + k] = (ptBytes[i] >> (7 - k)) & 1;
    var out = _desCrypt(bits, sub, 0, 1), bytes = new Array(8);
    for (i = 0; i < 8; i++) { var b = 0; for (k = 0; k < 8; k++) b = (b << 1) | out[i * 8 + k]; bytes[i] = b; }
    return bytes;
}
function desEncryptBlock(keyBytes, ptBytes) { return _desBlock(_keySchedule(_bytesToKeyBits(keyBytes)), ptBytes); }
function desDecryptBlock(keyBytes, ptBytes) { return _desBlock(_keySchedule(_bytesToKeyBits(keyBytes)).slice().reverse(), ptBytes); }
// LM: 7-byte block -> 8-byte DES key (7 bits per byte, shifted to the high bits).
function _lmKey(s) {
    var key = [s[0] >> 1, ((s[0] & 0x01) << 6) | (s[1] >> 2), ((s[1] & 0x03) << 5) | (s[2] >> 3), ((s[2] & 0x07) << 4) | (s[3] >> 4),
    ((s[3] & 0x0f) << 3) | (s[4] >> 5), ((s[4] & 0x1f) << 2) | (s[5] >> 6), ((s[5] & 0x3f) << 1) | (s[6] >> 7), s[6] & 0x7f];
    for (var i = 0; i < 8; i++) key[i] = (key[i] << 1) & 0xff;
    return key;
}
function lmHashHalf(pw7) {
    var s = pw7.slice(0, 7); while (s.length < 7) s.push(0);
    return desEncryptBlock(_lmKey(s), [0x4b, 0x47, 0x53, 0x21, 0x40, 0x23, 0x24, 0x25]); // "KGS!@#$%"
}
// descrypt over a password + 2 salt chars, returning the full 13-char crypt string.
function descryptCompute(password, salt2) {
    var salt = (_a64(salt2[0]) < 0 ? 0 : _a64(salt2[0])) | ((_a64(salt2[1]) < 0 ? 0 : _a64(salt2[1])) << 6);
    var kb = new Array(8), p = String(password);
    for (var j = 0; j < 8; j++) kb[j] = (j < p.length ? (p.charCodeAt(j) & 0x7f) << 1 : 0) & 0xff;
    var sub = _keySchedule(_bytesToKeyBits(kb));
    return salt2 + _blockToB64(_desCrypt(new Array(64).fill(0), sub, salt, 25));
}

module.exports = { verifyDescrypt: verifyDescrypt, verifyBsdi: verifyBsdi, desEncryptBlock: desEncryptBlock, desDecryptBlock: desDecryptBlock, lmHashHalf: lmHashHalf, descryptCompute: descryptCompute };
