// Raw DEFLATE decompression (RFC 1951), hand-written. Input/output are plain
// byte arrays. Used to CRC-check PKZIP-compressed archive entries.
var _LEN_BASE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
var _LEN_EXTRA = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
var _DIST_BASE = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
var _DIST_EXTRA = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
var _CLC_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

function _buildHuffman(lengths) {
    var maxLen = 0, i;
    for (i = 0; i < lengths.length; i++) if (lengths[i] > maxLen) maxLen = lengths[i];
    var blCount = new Array(maxLen + 1).fill(0);
    for (i = 0; i < lengths.length; i++) blCount[lengths[i]]++;
    blCount[0] = 0;
    var nextCode = new Array(maxLen + 1).fill(0), code = 0;
    for (var bits = 1; bits <= maxLen; bits++) { code = (code + blCount[bits - 1]) << 1; nextCode[bits] = code; }
    var map = {};
    for (i = 0; i < lengths.length; i++) if (lengths[i]) map[(lengths[i] << 16) | nextCode[lengths[i]]++] = i;
    return { map: map, maxLen: maxLen };
}

var _FIXED_LIT = (function () {
    var l = [];
    for (var i = 0; i < 144; i++) l[i] = 8;
    for (; i < 256; i++) l[i] = 9;
    for (; i < 280; i++) l[i] = 7;
    for (; i < 288; i++) l[i] = 8;
    return _buildHuffman(l);
})();
var _FIXED_DIST = _buildHuffman(new Array(30).fill(5));

function inflateRaw(input) {
    var out = [], pos = 0, bitBuf = 0, bitCnt = 0;
    function getBit() { if (bitCnt === 0) { bitBuf = input[pos++] | 0; bitCnt = 8; } var b = bitBuf & 1; bitBuf >>= 1; bitCnt--; return b; }
    function getBits(n) { var v = 0; for (var i = 0; i < n; i++) v |= getBit() << i; return v; }
    function decode(h) {
        var code = 0, len = 0;
        while (len <= h.maxLen) { code = (code << 1) | getBit(); len++; var s = h.map[(len << 16) | code]; if (s !== undefined) return s; }
        throw new Error('inflate: bad code');
    }
    var bfinal, i, k;
    do {
        bfinal = getBit();
        var btype = getBits(2);
        if (btype === 0) {
            bitCnt = 0; // skip to byte boundary
            var blen = input[pos] | (input[pos + 1] << 8); pos += 4; // len + ~len
            for (k = 0; k < blen; k++) out.push(input[pos++] & 0xff);
        } else if (btype === 1 || btype === 2) {
            var litH, distH;
            if (btype === 1) { litH = _FIXED_LIT; distH = _FIXED_DIST; }
            else {
                var hlit = getBits(5) + 257, hdist = getBits(5) + 1, hclen = getBits(4) + 4;
                var clcLen = new Array(19).fill(0);
                for (i = 0; i < hclen; i++) clcLen[_CLC_ORDER[i]] = getBits(3);
                var clcH = _buildHuffman(clcLen);
                var all = [], n = hlit + hdist;
                while (all.length < n) {
                    var sym = decode(clcH);
                    if (sym < 16) all.push(sym);
                    else if (sym === 16) { var r = getBits(2) + 3, p = all[all.length - 1]; while (r-- > 0) all.push(p); }
                    else if (sym === 17) { var r2 = getBits(3) + 3; while (r2-- > 0) all.push(0); }
                    else { var r3 = getBits(7) + 11; while (r3-- > 0) all.push(0); }
                }
                litH = _buildHuffman(all.slice(0, hlit));
                distH = _buildHuffman(all.slice(hlit));
            }
            while (true) {
                var s = decode(litH);
                if (s < 256) out.push(s);
                else if (s === 256) break;
                else {
                    s -= 257;
                    var length = _LEN_BASE[s] + getBits(_LEN_EXTRA[s]);
                    var ds = decode(distH);
                    var dist = _DIST_BASE[ds] + getBits(_DIST_EXTRA[ds]);
                    var start = out.length - dist;
                    for (k = 0; k < length; k++) out.push(out[start + k]);
                }
            }
        } else throw new Error('inflate: bad btype');
    } while (!bfinal);
    return out;
}

module.exports = { inflateRaw: inflateRaw };
