// SM3 hash (GB/T 32905-2016) + sm3crypt (hashcat 35100). sm3crypt is the
// sha256crypt structure with SM3, encoded with the same crypt to64 permutation.
var _IV = [0x7380166f, 0x4914b2b9, 0x172442d7, 0xda8a0600, 0xa96f30bc, 0x163138aa, 0xe38dee4d, 0xb0fb0e4e];
function _rotl(x, n) { n &= 31; return ((x << n) | (x >>> (32 - n))) >>> 0; }
function _p0(x) { return (x ^ _rotl(x, 9) ^ _rotl(x, 17)) >>> 0; }
function _p1(x) { return (x ^ _rotl(x, 15) ^ _rotl(x, 23)) >>> 0; }

function sm3Bytes(msg) {
    var len = msg.length, bitLen = len * 8;
    // pad: 0x80, zeros, 64-bit big-endian bit length
    var padded = msg.slice();
    padded.push(0x80);
    while (padded.length % 64 !== 56) padded.push(0);
    for (var s = 56; s >= 0; s -= 8) padded.push((Math.floor(bitLen / Math.pow(2, s))) & 0xff);
    var V = _IV.slice();
    var W = new Array(68), W1 = new Array(64), j, i;
    for (var blk = 0; blk < padded.length; blk += 64) {
        for (j = 0; j < 16; j++)
            W[j] = ((padded[blk + j * 4] << 24) | (padded[blk + j * 4 + 1] << 16) | (padded[blk + j * 4 + 2] << 8) | padded[blk + j * 4 + 3]) >>> 0;
        for (j = 16; j < 68; j++)
            W[j] = (_p1((W[j - 16] ^ W[j - 9] ^ _rotl(W[j - 3], 15)) >>> 0) ^ _rotl(W[j - 13], 7) ^ W[j - 6]) >>> 0;
        for (j = 0; j < 64; j++) W1[j] = (W[j] ^ W[j + 4]) >>> 0;
        var A = V[0], B = V[1], C = V[2], D = V[3], E = V[4], F = V[5], G = V[6], H = V[7];
        for (j = 0; j < 64; j++) {
            var Tj = j < 16 ? 0x79cc4519 : 0x7a879d8a;
            var SS1 = _rotl((_rotl(A, 12) + E + _rotl(Tj, j)) >>> 0, 7);
            var SS2 = (SS1 ^ _rotl(A, 12)) >>> 0;
            var FF = j < 16 ? (A ^ B ^ C) : ((A & B) | (A & C) | (B & C));
            var GG = j < 16 ? (E ^ F ^ G) : ((E & F) | ((~E) & G));
            var TT1 = ((FF >>> 0) + D + SS2 + W1[j]) >>> 0;
            var TT2 = ((GG >>> 0) + H + SS1 + W[j]) >>> 0;
            D = C; C = _rotl(B, 9); B = A; A = TT1;
            H = G; G = _rotl(F, 19); F = E; E = _p0(TT2);
        }
        V[0] = (V[0] ^ A) >>> 0; V[1] = (V[1] ^ B) >>> 0; V[2] = (V[2] ^ C) >>> 0; V[3] = (V[3] ^ D) >>> 0;
        V[4] = (V[4] ^ E) >>> 0; V[5] = (V[5] ^ F) >>> 0; V[6] = (V[6] ^ G) >>> 0; V[7] = (V[7] ^ H) >>> 0;
    }
    var out = [];
    for (i = 0; i < 8; i++) { out.push((V[i] >>> 24) & 0xff, (V[i] >>> 16) & 0xff, (V[i] >>> 8) & 0xff, V[i] & 0xff); }
    return out;
}

// Generic sha2crypt structure (glibc) over an arbitrary byte hash H of length bs.
function _shaCryptRaw(H, bs, key, salt, rounds) {
    var i, b = H(key.concat(salt).concat(key));
    var tmp = key.concat(salt);
    for (i = key.length; i > 0; i -= bs) tmp = tmp.concat(i > bs ? b : b.slice(0, i));
    for (i = key.length; i > 0; i >>= 1) tmp = tmp.concat((i & 1) ? b : key);
    var A = H(tmp);
    var dpin = []; for (i = 0; i < key.length; i++) dpin = dpin.concat(key);
    var dp = H(dpin), P = [];
    for (i = key.length; i > 0; i -= bs) P = P.concat(i > bs ? dp : dp.slice(0, i));
    var dsin = [], cnt = 16 + A[0];
    for (i = 0; i < cnt; i++) dsin = dsin.concat(salt);
    var ds = H(dsin), S = [];
    for (i = salt.length; i > 0; i -= bs) S = S.concat(i > bs ? ds : ds.slice(0, i));
    var digest = A;
    for (i = 0; i < rounds; i++) {
        var c = (i & 1) ? P.slice() : digest.slice();
        if (i % 3) c = c.concat(S);
        if (i % 7) c = c.concat(P);
        c = c.concat((i & 1) ? digest : P);
        digest = H(c);
    }
    return digest;
}

var ITOA64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function _to64(v, n) { var s = ''; while (--n >= 0) { s += ITOA64[v & 0x3f]; v >>= 6; } return s; }
function _to64crypt256(c) {
    function t(a, b, d) { return _to64((c[a] << 16) | (c[b] << 8) | c[d], 4); }
    return t(0, 10, 20) + t(21, 1, 11) + t(12, 22, 2) + t(3, 13, 23) + t(24, 4, 14) + t(15, 25, 5) +
        t(6, 16, 26) + t(27, 7, 17) + t(18, 28, 8) + t(9, 19, 29) + _to64((c[31] << 8) | c[30], 3);
}
function _strBytes(s) { var b = []; for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xff); return b; }

// sm3crypt (35100): $sm3$[rounds=N$]<salt>$<to64 digest>
function verifySm3crypt(password, hash) {
    var m = /^\$sm3\$(?:rounds=(\d+)\$)?([^$]+)\$([.\/0-9A-Za-z]{43})$/.exec(String(hash));
    if (!m) return false;
    var rounds = m[1] ? parseInt(m[1], 10) : 5000;
    var dig = _shaCryptRaw(sm3Bytes, 32, _strBytes(String(password)), _strBytes(m[2]), rounds);
    return _to64crypt256(dig) === m[3];
}

function genSm3crypt(password, salt, rounds) {
    rounds = rounds || 5000;
    var dig = _shaCryptRaw(sm3Bytes, 32, _strBytes(String(password)), _strBytes(salt), rounds);
    return '$sm3$' + salt + '$' + _to64crypt256(dig);
}

module.exports = { sm3Bytes: sm3Bytes, verifySm3crypt: verifySm3crypt, genSm3crypt: genSm3crypt };
