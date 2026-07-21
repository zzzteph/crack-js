// MD4 for crypto-js (it ships without it). Side-effect module: requiring it adds
// CryptoJS.MD4 / CryptoJS.HmacMD4 to the shared crypto-js instance. Needed by
// NTLM, NetNTLMv1/v2 and Kerberos etype-23.
var CryptoJS = require('crypto-js');

(function (Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    var S = [[3, 7, 11, 19], [3, 5, 9, 13], [3, 9, 11, 15]];
    var FF = 0x00000000;
    var GG = 0x5a827999;
    var HH = 0x6ed9eba1;

    var MD4 = C_algo.MD4 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },
        _doProcessBlock: function (M, offset) {
            for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (
                    (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
                );
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0], M_offset_1 = M[offset + 1], M_offset_2 = M[offset + 2], M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4], M_offset_5 = M[offset + 5], M_offset_6 = M[offset + 6], M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8], M_offset_9 = M[offset + 9], M_offset_10 = M[offset + 10], M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12], M_offset_13 = M[offset + 13], M_offset_14 = M[offset + 14], M_offset_15 = M[offset + 15];
            var a = H[0], b = H[1], c = H[2], d = H[3];
            a = CC(FFF, FF, a, b, c, d, M_offset_0, S[0][0]); d = CC(FFF, FF, d, a, b, c, M_offset_1, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_2, S[0][2]); b = CC(FFF, FF, b, c, d, a, M_offset_3, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_4, S[0][0]); d = CC(FFF, FF, d, a, b, c, M_offset_5, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_6, S[0][2]); b = CC(FFF, FF, b, c, d, a, M_offset_7, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_8, S[0][0]); d = CC(FFF, FF, d, a, b, c, M_offset_9, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_10, S[0][2]); b = CC(FFF, FF, b, c, d, a, M_offset_11, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_12, S[0][0]); d = CC(FFF, FF, d, a, b, c, M_offset_13, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_14, S[0][2]); b = CC(FFF, FF, b, c, d, a, M_offset_15, S[0][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_0, S[1][0]); d = CC(GGG, GG, d, a, b, c, M_offset_4, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_8, S[1][2]); b = CC(GGG, GG, b, c, d, a, M_offset_12, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_1, S[1][0]); d = CC(GGG, GG, d, a, b, c, M_offset_5, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_9, S[1][2]); b = CC(GGG, GG, b, c, d, a, M_offset_13, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_2, S[1][0]); d = CC(GGG, GG, d, a, b, c, M_offset_6, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_10, S[1][2]); b = CC(GGG, GG, b, c, d, a, M_offset_14, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_3, S[1][0]); d = CC(GGG, GG, d, a, b, c, M_offset_7, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_11, S[1][2]); b = CC(GGG, GG, b, c, d, a, M_offset_15, S[1][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_0, S[2][0]); d = CC(HHH, HH, d, a, b, c, M_offset_8, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_4, S[2][2]); b = CC(HHH, HH, b, c, d, a, M_offset_12, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_2, S[2][0]); d = CC(HHH, HH, d, a, b, c, M_offset_10, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_6, S[2][2]); b = CC(HHH, HH, b, c, d, a, M_offset_14, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_1, S[2][0]); d = CC(HHH, HH, d, a, b, c, M_offset_9, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_5, S[2][2]); b = CC(HHH, HH, b, c, d, a, M_offset_13, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_3, S[2][0]); d = CC(HHH, HH, d, a, b, c, M_offset_11, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_7, S[2][2]); b = CC(HHH, HH, b, c, d, a, M_offset_15, S[2][3]);
            H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
        },
        _doFinalize: function () {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
            var nBitsTotalL = nBitsTotal;
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
                (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
            }
            return hash;
        },
        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });

    function ROTL(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
    function CC(f, k, a, b, c, d, x, s) { return ROTL((a + f(b, c, d) + x + k), s); }
    function FFF(x, y, z) { return ((x & y) | ((~x) & z)); }
    function GGG(x, y, z) { return ((x & y) | (x & z) | (y & z)); }
    function HHH(x, y, z) { return (x ^ y ^ z); }

    C.MD4 = Hasher._createHelper(MD4);
    C.HmacMD4 = Hasher._createHmacHelper(MD4);
})(Math);

module.exports = CryptoJS;
