// BLAKE2s (RFC 7693), 32-bit lanes. hashcat modes 31000 (BLAKE2s-256) + 33300 (HMAC).
var _IV = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
var _SIGMA = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
    [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
    [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
    [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11], [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
    [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5], [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]];
function _rotr32(x, n) { return ((x >>> n) | (x << (32 - n))) >>> 0; }

function blake2s(msgBytes, outLen) {
    var h = _IV.slice();
    h[0] = (h[0] ^ 0x01010000 ^ outLen) >>> 0;
    function compress(blk, t, last) {
        var v = h.concat(_IV), m = new Array(16), i;
        v[12] = (v[12] ^ (t >>> 0)) >>> 0; v[13] = (v[13] ^ Math.floor(t / 0x100000000)) >>> 0;
        if (last) v[14] = (v[14] ^ 0xffffffff) >>> 0;
        for (i = 0; i < 16; i++) m[i] = (blk[i * 4] | (blk[i * 4 + 1] << 8) | (blk[i * 4 + 2] << 16) | (blk[i * 4 + 3] << 24)) >>> 0;
        function G(a, b, c, d, x, y) {
            v[a] = (v[a] + v[b] + x) >>> 0; v[d] = _rotr32(v[d] ^ v[a], 16);
            v[c] = (v[c] + v[d]) >>> 0; v[b] = _rotr32(v[b] ^ v[c], 12);
            v[a] = (v[a] + v[b] + y) >>> 0; v[d] = _rotr32(v[d] ^ v[a], 8);
            v[c] = (v[c] + v[d]) >>> 0; v[b] = _rotr32(v[b] ^ v[c], 7);
        }
        for (var r = 0; r < 10; r++) {
            var g = _SIGMA[r];
            G(0, 4, 8, 12, m[g[0]], m[g[1]]); G(1, 5, 9, 13, m[g[2]], m[g[3]]);
            G(2, 6, 10, 14, m[g[4]], m[g[5]]); G(3, 7, 11, 15, m[g[6]], m[g[7]]);
            G(0, 5, 10, 15, m[g[8]], m[g[9]]); G(1, 6, 11, 12, m[g[10]], m[g[11]]);
            G(2, 7, 8, 13, m[g[12]], m[g[13]]); G(3, 4, 9, 14, m[g[14]], m[g[15]]);
        }
        for (i = 0; i < 8; i++) h[i] = (h[i] ^ v[i] ^ v[i + 8]) >>> 0;
    }
    var msg = msgBytes.slice(), counter = 0, i = 0;
    if (msg.length === 0) { compress(new Array(64).fill(0), 0, true); }
    else {
        while (msg.length - i > 64) { counter += 64; compress(msg.slice(i, i + 64), counter, false); i += 64; }
        var last = msg.slice(i); counter += last.length; while (last.length < 64) last.push(0);
        compress(last, counter, true);
    }
    var out = []; for (var k = 0; k < outLen; k++) out.push((h[k >> 2] >>> (8 * (k & 3))) & 0xff);
    return out;
}
// HMAC-BLAKE2s (block size 64).
function hmacBlake2s(keyBytes, msgBytes) {
    var key = keyBytes.slice();
    if (key.length > 64) key = blake2s(key, 32);
    while (key.length < 64) key.push(0);
    var ipad = [], opad = [], i;
    for (i = 0; i < 64; i++) { ipad.push(key[i] ^ 0x36); opad.push(key[i] ^ 0x5c); }
    var inner = blake2s(ipad.concat(msgBytes), 32);
    return blake2s(opad.concat(inner), 32);
}
module.exports = { blake2s: blake2s, hmacBlake2s: hmacBlake2s };
