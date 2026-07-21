// RIPEMD-320 (two 160-bit lines, 320-bit digest). Input/output byte arrays.
var _RL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
var _RR = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
var _SL = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
var _SR = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
var _KL = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
var _KR = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];
function _rol(x, n) { return ((x << n) | (x >>> (32 - n))) >>> 0; }
function _f(j, x, y, z) {
    if (j < 16) return (x ^ y ^ z) >>> 0;
    if (j < 32) return ((x & y) | (~x & z)) >>> 0;
    if (j < 48) return ((x | ~y) ^ z) >>> 0;
    if (j < 64) return ((x & z) | (y & ~z)) >>> 0;
    return (x ^ (y | ~z)) >>> 0;
}
function ripemd320(bytes) {
    var h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0, 0x76543210, 0xfedcba98, 0x89abcdef, 0x01234567, 0x3c2d1e0f];
    var msg = bytes.slice(), ml = msg.length; msg.push(0x80);
    while (msg.length % 64 !== 56) msg.push(0);
    var bl = ml * 8; for (var s = 0; s < 8; s++) msg.push((Math.floor(bl / Math.pow(2, 8 * s))) & 0xff);
    for (var off = 0; off < msg.length; off += 64) {
        var X = new Array(16), i;
        for (i = 0; i < 16; i++) X[i] = (msg[off + i * 4] | (msg[off + i * 4 + 1] << 8) | (msg[off + i * 4 + 2] << 16) | (msg[off + i * 4 + 3] << 24)) >>> 0;
        var al = h[0], bl2 = h[1], cl = h[2], dl = h[3], el = h[4], ar = h[5], br = h[6], cr = h[7], dr = h[8], er = h[9], t;
        for (var j = 0; j < 80; j++) {
            var rnd = j >> 4;
            t = (_rol((al + _f(j, bl2, cl, dl) + X[_RL[j]] + _KL[rnd]) >>> 0, _SL[j]) + el) >>> 0;
            al = el; el = dl; dl = _rol(cl, 10); cl = bl2; bl2 = t;
            t = (_rol((ar + _f(79 - j, br, cr, dr) + X[_RR[j]] + _KR[rnd]) >>> 0, _SR[j]) + er) >>> 0;
            ar = er; er = dr; dr = _rol(cr, 10); cr = br; br = t;
            if (j === 15) { t = bl2; bl2 = br; br = t; }
            else if (j === 31) { t = dl; dl = dr; dr = t; }
            else if (j === 47) { t = al; al = ar; ar = t; }
            else if (j === 63) { t = cl; cl = cr; cr = t; }
            else if (j === 79) { t = el; el = er; er = t; }
        }
        h[0] = (h[0] + al) >>> 0; h[1] = (h[1] + bl2) >>> 0; h[2] = (h[2] + cl) >>> 0; h[3] = (h[3] + dl) >>> 0; h[4] = (h[4] + el) >>> 0;
        h[5] = (h[5] + ar) >>> 0; h[6] = (h[6] + br) >>> 0; h[7] = (h[7] + cr) >>> 0; h[8] = (h[8] + dr) >>> 0; h[9] = (h[9] + er) >>> 0;
    }
    var out = [];
    for (var k = 0; k < 10; k++) { out.push(h[k] & 0xff, (h[k] >>> 8) & 0xff, (h[k] >>> 16) & 0xff, (h[k] >>> 24) & 0xff); }
    return out;
}
function hmacRipemd320(keyBytes, msgBytes) {
    var key = keyBytes.slice();
    if (key.length > 64) key = ripemd320(key);
    while (key.length < 64) key.push(0);
    var ip = [], op = [], i;
    for (i = 0; i < 64; i++) { ip.push(key[i] ^ 0x36); op.push(key[i] ^ 0x5c); }
    return ripemd320(op.concat(ripemd320(ip.concat(msgBytes))));
}
module.exports = { ripemd320: ripemd320, hmacRipemd320: hmacRipemd320 };
