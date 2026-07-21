// Argon2 (RFC 9106) argon2d/i/id, hand-written. 1024-byte blocks as Uint32Array
// (uint64 k -> words 2k lo, 2k+1 hi); 64-bit BlaMka ops inlined over 32-bit words
// to keep the 64 MiB fill affordable without BigInt. hashcat mode 34000.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _blake2b = require('./blake2b')._blake2b;

var _ARG_ROW = [], _ARG_COL = [];
(function () {
    for (var i = 0; i < 8; i++) {
        var row = [], col = [];
        for (var j = 0; j < 16; j++) row.push(i * 16 + j);
        for (j = 0; j < 8; j++) { col.push(16 * j + 2 * i); col.push(16 * j + 2 * i + 1); }
        _ARG_ROW.push(row); _ARG_COL.push(col);
    }
})();
function _blamka(Z, ai, bi) {
    var alo = Z[2 * ai], ahi = Z[2 * ai + 1], blo = Z[2 * bi], bhi = Z[2 * bi + 1];
    var aL = alo & 0xffff, aH = alo >>> 16, bL = blo & 0xffff, bH = blo >>> 16;
    var ll = aL * bL, lh = aL * bH, hl = aH * bL, hh = aH * bH;
    var cross = (ll >>> 16) + (lh & 0xffff) + (hl & 0xffff);
    var mlo = (((cross & 0xffff) << 16) | (ll & 0xffff)) >>> 0;
    var mhi = (hh + (lh >>> 16) + (hl >>> 16) + (cross >>> 16)) >>> 0;
    var p2lo = (mlo << 1) >>> 0, p2hi = ((mhi << 1) | (mlo >>> 31)) >>> 0;
    var s = alo + blo, rlo = s >>> 0, rhi = (ahi + bhi + (s >= 4294967296 ? 1 : 0)) >>> 0;
    s = rlo + p2lo;
    Z[2 * ai] = s >>> 0;
    Z[2 * ai + 1] = (rhi + p2hi + (s >= 4294967296 ? 1 : 0)) >>> 0;
}
function _xorRotr(Z, di, ai, n) {
    var xlo = (Z[2 * di] ^ Z[2 * ai]) >>> 0, xhi = (Z[2 * di + 1] ^ Z[2 * ai + 1]) >>> 0, nlo, nhi, s;
    if (n === 32) { nlo = xhi; nhi = xlo; }
    else if (n < 32) { nlo = ((xlo >>> n) | (xhi << (32 - n))) >>> 0; nhi = ((xhi >>> n) | (xlo << (32 - n))) >>> 0; }
    else { s = n - 32; nlo = ((xhi >>> s) | (xlo << (32 - s))) >>> 0; nhi = ((xlo >>> s) | (xhi << (32 - s))) >>> 0; }
    Z[2 * di] = nlo; Z[2 * di + 1] = nhi;
}
function _argon2Permute(Z, idx) {
    function GB(a, b, c, d) {
        _blamka(Z, idx[a], idx[b]); _xorRotr(Z, idx[d], idx[a], 32);
        _blamka(Z, idx[c], idx[d]); _xorRotr(Z, idx[b], idx[c], 24);
        _blamka(Z, idx[a], idx[b]); _xorRotr(Z, idx[d], idx[a], 16);
        _blamka(Z, idx[c], idx[d]); _xorRotr(Z, idx[b], idx[c], 63);
    }
    GB(0, 4, 8, 12); GB(1, 5, 9, 13); GB(2, 6, 10, 14); GB(3, 7, 11, 15);
    GB(0, 5, 10, 15); GB(1, 6, 11, 12); GB(2, 7, 8, 13); GB(3, 4, 9, 14);
}
var _ARG_R = new Uint32Array(256), _ARG_Z = new Uint32Array(256);
function _argon2Compress(X, Y) {
    var i;
    for (i = 0; i < 256; i++) { _ARG_R[i] = X[i] ^ Y[i]; _ARG_Z[i] = _ARG_R[i]; }
    for (i = 0; i < 8; i++) _argon2Permute(_ARG_Z, _ARG_ROW[i]);
    for (i = 0; i < 8; i++) _argon2Permute(_ARG_Z, _ARG_COL[i]);
    for (i = 0; i < 256; i++) _ARG_Z[i] = (_ARG_Z[i] ^ _ARG_R[i]) >>> 0;
    return _ARG_Z;
}
function _le32(n) { return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]; }
function _blake2bLong(outLen, input) {
    if (outLen <= 64) return _blake2b(_le32(outLen).concat(input), outLen);
    var out = [], V = _blake2b(_le32(outLen).concat(input), 64);
    out = out.concat(V.slice(0, 32));
    while (outLen - out.length > 64) { V = _blake2b(V, 64); out = out.concat(V.slice(0, 32)); }
    return out.concat(_blake2b(V, outLen - out.length));
}
function _blockToBytes(block) { var b = new Array(1024); for (var i = 0; i < 256; i++) { b[i * 4] = block[i] & 0xff; b[i * 4 + 1] = (block[i] >>> 8) & 0xff; b[i * 4 + 2] = (block[i] >>> 16) & 0xff; b[i * 4 + 3] = (block[i] >>> 24) & 0xff; } return b; }
function _storeBlockBytes(mem, blk, bytes) { var base = blk * 256; for (var i = 0; i < 256; i++) mem[base + i] = (bytes[i * 4] | (bytes[i * 4 + 1] << 8) | (bytes[i * 4 + 2] << 16) | (bytes[i * 4 + 3] << 24)) >>> 0; }
function _argon2(passBytes, saltBytes, type, version, m, t, p, tagLen) {
    var mp = Math.floor(m / (4 * p)) * 4 * p, lanes = p, laneLen = mp / p, segLen = laneLen / 4;
    var mem = new Uint32Array(mp * 256), i, j, k;
    var h0 = _blake2b(_le32(p).concat(_le32(tagLen)).concat(_le32(m)).concat(_le32(t)).concat(_le32(version)).concat(_le32(type))
        .concat(_le32(passBytes.length)).concat(passBytes).concat(_le32(saltBytes.length)).concat(saltBytes)
        .concat(_le32(0)).concat(_le32(0)), 64);
    for (i = 0; i < lanes; i++) {
        _storeBlockBytes(mem, i * laneLen, _blake2bLong(1024, h0.concat(_le32(0)).concat(_le32(i))));
        _storeBlockBytes(mem, i * laneLen + 1, _blake2bLong(1024, h0.concat(_le32(1)).concat(_le32(i))));
    }
    var zero = new Uint32Array(256), inputBlk = new Uint32Array(256), addr = new Uint32Array(256);
    for (var pass = 0; pass < t; pass++) {
        for (var slice = 0; slice < 4; slice++) {
            for (var lane = 0; lane < lanes; lane++) {
                var dataIndep = (type === 1) || (type === 2 && pass === 0 && slice < 2);
                var addrCounter = 0;
                if (dataIndep) {
                    for (k = 0; k < 256; k++) inputBlk[k] = 0;
                    inputBlk[0] = pass; inputBlk[2] = lane; inputBlk[4] = slice; inputBlk[6] = mp; inputBlk[8] = t; inputBlk[10] = type;
                }
                var startIdx = (pass === 0 && slice === 0) ? 2 : 0;
                for (i = startIdx; i < segLen; i++) {
                    if (dataIndep && (i % 128 === 0 || i === startIdx)) {
                        addrCounter++; inputBlk[12] = addrCounter;
                        var t1 = Uint32Array.from(_argon2Compress(zero, inputBlk));
                        addr.set(_argon2Compress(zero, t1));
                    }
                    var col = slice * segLen + i;
                    var prevCol = col === 0 ? laneLen - 1 : col - 1;
                    var prevIdx = lane * laneLen + prevCol, J1, J2;
                    if (dataIndep) { var c = i % 128; J1 = addr[2 * c] >>> 0; J2 = addr[2 * c + 1] >>> 0; }
                    else { J1 = mem[prevIdx * 256] >>> 0; J2 = mem[prevIdx * 256 + 1] >>> 0; }
                    var refLane = (pass === 0 && slice === 0) ? lane : (J2 % lanes);
                    var refArea;
                    if (pass === 0) {
                        if (slice === 0) refArea = i - 1;
                        else refArea = (refLane === lane) ? (slice * segLen + i - 1) : (slice * segLen - (i === 0 ? 1 : 0));
                    } else refArea = (refLane === lane) ? (laneLen - segLen + i - 1) : (laneLen - segLen - (i === 0 ? 1 : 0));
                    var pll = (J1 & 0xffff) * (J1 & 0xffff), plh = (J1 & 0xffff) * (J1 >>> 16), phh = (J1 >>> 16) * (J1 >>> 16);
                    var pcross = (pll >>> 16) + (plh & 0xffff) + (plh & 0xffff);
                    var relHi = (phh + (plh >>> 16) + (plh >>> 16) + (pcross >>> 16)) >>> 0;
                    var qll = (refArea & 0xffff) * (relHi & 0xffff), qlh = (refArea & 0xffff) * (relHi >>> 16), qhl = (refArea >>> 16) * (relHi & 0xffff), qhh = (refArea >>> 16) * (relHi >>> 16);
                    var qcross = (qll >>> 16) + (qlh & 0xffff) + (qhl & 0xffff);
                    var prod = (qhh + (qlh >>> 16) + (qhl >>> 16) + (qcross >>> 16)) >>> 0;
                    var relPos = refArea - 1 - prod;
                    var startPos = (pass !== 0 && slice !== 3) ? (slice + 1) * segLen : 0;
                    var refIndex = (startPos + relPos) % laneLen;
                    var refBlk = refLane * laneLen + refIndex, cur = lane * laneLen + col;
                    var nb = _argon2Compress(mem.subarray(prevIdx * 256, prevIdx * 256 + 256), mem.subarray(refBlk * 256, refBlk * 256 + 256));
                    if (pass === 0) mem.set(nb, cur * 256);
                    else for (k = 0; k < 256; k++) mem[cur * 256 + k] ^= nb[k];
                }
            }
        }
    }
    var C = new Uint32Array(mem.subarray((laneLen - 1) * 256, (laneLen - 1) * 256 + 256));
    for (i = 1; i < lanes; i++) { var off = (i * laneLen + laneLen - 1) * 256; for (k = 0; k < 256; k++) C[k] ^= mem[off + k]; }
    return _blake2bLong(tagLen, _blockToBytes(C));
}
function _b64decode(str) { var s = str; while (s.length % 4 !== 0) s += '='; return u._waToBytes(CryptoJS.enc.Base64.parse(s)); }
function verifyArgon2(password, hash) {
    var m = /^\$(argon2d|argon2i|argon2id)\$v=(\d+)\$m=(\d+),t=(\d+),p=(\d+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/.exec(String(hash));
    if (!m) return false;
    var type = m[1] === 'argon2d' ? 0 : (m[1] === 'argon2i' ? 1 : 2);
    var salt, want;
    try { salt = _b64decode(m[6]); want = _b64decode(m[7]); } catch (e) { return false; }
    if (want.length < 4) return false;
    var dk = _argon2(u._utf8Bytes(password), salt, type, parseInt(m[2], 10), parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10), want.length);
    return u._bytesToHex(dk) === u._bytesToHex(want);
}

module.exports = { verifyArgon2: verifyArgon2 };
