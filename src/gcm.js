// AES-GCM tag verification, hand-written GHASH over crypto-js AES-ECB. Verifies
// only the authentication tag (which is the correctness signal). Used by MetaMask.
var u = require('./util');

function _aesEnc(keyWA, blockBytes) { return u._waToBytes(u.aesEncBlockWA(keyWA, u._bytesToWA(blockBytes))); }
function _gfMul(X, Y) {
    var Z = new Array(16).fill(0), V = Y.slice(), i, j;
    for (i = 0; i < 128; i++) {
        if ((X[i >> 3] >> (7 - (i & 7))) & 1) for (j = 0; j < 16; j++) Z[j] ^= V[j];
        var lsb = V[15] & 1;
        for (j = 15; j > 0; j--) V[j] = ((V[j] >> 1) | ((V[j - 1] & 1) << 7)) & 0xff;
        V[0] = (V[0] >> 1) & 0xff;
        if (lsb) V[0] ^= 0xe1;
    }
    return Z;
}
function _ghash(H, data) {
    var Y = new Array(16).fill(0);
    for (var off = 0; off < data.length; off += 16) {
        for (var i = 0; i < 16; i++) Y[i] ^= data[off + i];
        Y = _gfMul(Y, H);
    }
    return Y;
}
function _len64(nBits) { var b = new Array(8).fill(0); for (var i = 0; i < 8; i++) b[7 - i] = Math.floor(nBits / Math.pow(2, 8 * i)) & 0xff; return b; }
function _gcmTagOk(keyBytes, ivBytes, ctWithTag) {
    var keyWA = u._bytesToWA(keyBytes);
    var H = _aesEnc(keyWA, new Array(16).fill(0)), J0, i;
    if (ivBytes.length === 12) { J0 = ivBytes.concat([0, 0, 0, 1]); }
    else {
        var ivPad = ivBytes.slice();
        while (ivPad.length % 16 !== 0) ivPad.push(0);
        J0 = _ghash(H, ivPad.concat(new Array(8).fill(0)).concat(_len64(ivBytes.length * 8)));
    }
    var ct = ctWithTag.slice(0, ctWithTag.length - 16), tag = ctWithTag.slice(ctWithTag.length - 16);
    var ctPad = ct.slice();
    while (ctPad.length % 16 !== 0) ctPad.push(0);
    var S = _ghash(H, ctPad.concat(_len64(0)).concat(_len64(ct.length * 8)));
    var EJ0 = _aesEnc(keyWA, J0);
    for (i = 0; i < 16; i++) if ((S[i] ^ EJ0[i]) !== tag[i]) return false;
    return true;
}

// GCM decryption (CTR keystream from inc32(J0)) WITHOUT tag verification —
// used by MetaMask-short (26610), which authenticates via a printability check.
function _gcmInc32(block) {
    for (var i = 15; i >= 12; i--) { block[i] = (block[i] + 1) & 0xff; if (block[i] !== 0) break; }
}
function _gcmJ0(H, ivBytes) {
    if (ivBytes.length === 12) return ivBytes.concat([0, 0, 0, 1]);
    var ivPad = ivBytes.slice();
    while (ivPad.length % 16 !== 0) ivPad.push(0);
    return _ghash(H, ivPad.concat(new Array(8).fill(0)).concat(_len64(ivBytes.length * 8)));
}
function _gcmDecrypt(keyBytes, ivBytes, ct) {
    var keyWA = u._bytesToWA(keyBytes);
    var H = _aesEnc(keyWA, new Array(16).fill(0));
    var ctr = _gcmJ0(H, ivBytes).slice(), out = [];
    for (var off = 0; off < ct.length; off += 16) {
        _gcmInc32(ctr);
        var ks = _aesEnc(keyWA, ctr);
        for (var j = 0; j < 16 && off + j < ct.length; j++) out.push(ct[off + j] ^ ks[j]);
    }
    return out;
}

// Forward generator: AES-GCM encrypt -> {ct, tag}. CTR keystream is symmetric with
// _gcmDecrypt; the tag mirrors _gcmTagOk exactly.
function _gcmEncrypt(keyBytes, ivBytes, plaintext) {
    var keyWA = u._bytesToWA(keyBytes);
    var H = _aesEnc(keyWA, new Array(16).fill(0));
    var J0 = _gcmJ0(H, ivBytes), ctr = J0.slice(), ct = [], off, j, i;
    for (off = 0; off < plaintext.length; off += 16) {
        _gcmInc32(ctr);
        var ks = _aesEnc(keyWA, ctr);
        for (j = 0; j < 16 && off + j < plaintext.length; j++) ct.push(plaintext[off + j] ^ ks[j]);
    }
    var ctPad = ct.slice();
    while (ctPad.length % 16 !== 0) ctPad.push(0);
    var S = _ghash(H, ctPad.concat(_len64(0)).concat(_len64(ct.length * 8))), EJ0 = _aesEnc(keyWA, J0), tag = [];
    for (i = 0; i < 16; i++) tag.push(S[i] ^ EJ0[i]);
    return { ct: ct, tag: tag };
}

module.exports = { _gcmTagOk: _gcmTagOk, _gcmDecrypt: _gcmDecrypt, _gcmEncrypt: _gcmEncrypt };
