// BLAKE2b (RFC 7693), hand-written with BigInt lanes. Used by hashcat mode 600
// and as the core of Argon2.
var u = require('./util');
var _MASK64 = u._MASK64;

var _B2B_IV = ['6a09e667f3bcc908', 'bb67ae8584caa73b', '3c6ef372fe94f82b', 'a54ff53a5f1d36f1',
    '510e527fade682d1', '9b05688c2b3e6c1f', '1f83d9abfb41bd6b', '5be0cd19137e2179'].map(function (h) { return BigInt('0x' + h); });
var _B2B_SIGMA = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
    [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
    [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
    [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11], [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
    [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5], [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]];
function _rotr64(x, n) { var b = BigInt(n); return ((x >> b) | (x << (64n - b))) & _MASK64; }
function _blake2b(msgBytes, outLen) {
    var h = _B2B_IV.slice();
    h[0] ^= BigInt(0x01010000 ^ outLen);
    function compress(blk, t, last) {
        var v = h.concat(_B2B_IV), m = [], i, j;
        v[12] ^= BigInt(t) & _MASK64;
        if (last) v[14] ^= _MASK64;
        for (i = 0; i < 16; i++) { var w = 0n; for (j = 7; j >= 0; j--) w = (w << 8n) | BigInt(blk[i * 8 + j] & 0xff); m[i] = w; }
        function G(a, b, c, d, x, y) {
            v[a] = (v[a] + v[b] + x) & _MASK64; v[d] = _rotr64(v[d] ^ v[a], 32);
            v[c] = (v[c] + v[d]) & _MASK64; v[b] = _rotr64(v[b] ^ v[c], 24);
            v[a] = (v[a] + v[b] + y) & _MASK64; v[d] = _rotr64(v[d] ^ v[a], 16);
            v[c] = (v[c] + v[d]) & _MASK64; v[b] = _rotr64(v[b] ^ v[c], 63);
        }
        for (var r = 0; r < 12; r++) {
            var g = _B2B_SIGMA[r];
            G(0, 4, 8, 12, m[g[0]], m[g[1]]); G(1, 5, 9, 13, m[g[2]], m[g[3]]);
            G(2, 6, 10, 14, m[g[4]], m[g[5]]); G(3, 7, 11, 15, m[g[6]], m[g[7]]);
            G(0, 5, 10, 15, m[g[8]], m[g[9]]); G(1, 6, 11, 12, m[g[10]], m[g[11]]);
            G(2, 7, 8, 13, m[g[12]], m[g[13]]); G(3, 4, 9, 14, m[g[14]], m[g[15]]);
        }
        for (i = 0; i < 8; i++) h[i] ^= v[i] ^ v[i + 8];
    }
    var msg = msgBytes.slice(), counter = 0, i = 0;
    if (msg.length === 0) { compress(new Array(128).fill(0), 0, true); }
    else {
        while (msg.length - i > 128) { counter += 128; compress(msg.slice(i, i + 128), counter, false); i += 128; }
        var lastBlk = msg.slice(i);
        counter += lastBlk.length;
        while (lastBlk.length < 128) lastBlk.push(0);
        compress(lastBlk, counter, true);
    }
    var out = [];
    for (var k = 0; k < outLen; k++) out.push(Number((h[k >> 3] >> BigInt(8 * (k & 7))) & 0xffn));
    return out;
}
function verifyBlake2b512(password, hash) {
    var m = /^\$BLAKE2\$([a-fA-F0-9]{128})$/.exec(String(hash));
    if (!m) return false;
    return u._bytesToHex(_blake2b(u._utf8Bytes(password), 64)) === m[1].toLowerCase();
}

// $BLAKE2$<hex>[:<salt>] with variable output length and salt order.
// order: null = blake2b(pass) ; 'ps' = blake2b(pass.salt) ; 'sp' = blake2b(salt.pass)
function makeBlake2bVerifier(outLen, order) {
    return function (password, hash) {
        var m = /^\$BLAKE2\$([a-fA-F0-9]+)(?::(.+))?$/.exec(String(hash));
        if (!m) return false;
        if (m[1].length !== outLen * 2) return false;
        var salt = m[2] || '', msg = order === 'sp' ? salt + String(password) : String(password) + salt;
        return u._bytesToHex(_blake2b(u._utf8Bytes(msg), outLen)) === m[1].toLowerCase();
    };
}

module.exports = { _blake2b: _blake2b, verifyBlake2b512: verifyBlake2b512, makeBlake2bVerifier: makeBlake2bVerifier };
