// scrypt (RFC 7914), hand-written: Salsa20/8 + BlockMix + ROMix, with crypto-js
// PBKDF2-HMAC-SHA256 as the outer/inner PBKDF2. hashcat mode 8900.
var u = require('./util');
var CryptoJS = u.CryptoJS;

function _salsaR(a, c) { a = a >>> 0; return ((a << c) | (a >>> (32 - c))) >>> 0; }
function _salsa20_8(B) {
    var x = new Uint32Array(B), i;
    for (i = 0; i < 8; i += 2) {
        x[4] ^= _salsaR(x[0] + x[12], 7); x[8] ^= _salsaR(x[4] + x[0], 9); x[12] ^= _salsaR(x[8] + x[4], 13); x[0] ^= _salsaR(x[12] + x[8], 18);
        x[9] ^= _salsaR(x[5] + x[1], 7); x[13] ^= _salsaR(x[9] + x[5], 9); x[1] ^= _salsaR(x[13] + x[9], 13); x[5] ^= _salsaR(x[1] + x[13], 18);
        x[14] ^= _salsaR(x[10] + x[6], 7); x[2] ^= _salsaR(x[14] + x[10], 9); x[6] ^= _salsaR(x[2] + x[14], 13); x[10] ^= _salsaR(x[6] + x[2], 18);
        x[3] ^= _salsaR(x[15] + x[11], 7); x[7] ^= _salsaR(x[3] + x[15], 9); x[11] ^= _salsaR(x[7] + x[3], 13); x[15] ^= _salsaR(x[11] + x[7], 18);
        x[1] ^= _salsaR(x[0] + x[3], 7); x[2] ^= _salsaR(x[1] + x[0], 9); x[3] ^= _salsaR(x[2] + x[1], 13); x[0] ^= _salsaR(x[3] + x[2], 18);
        x[6] ^= _salsaR(x[5] + x[4], 7); x[7] ^= _salsaR(x[6] + x[5], 9); x[4] ^= _salsaR(x[7] + x[6], 13); x[5] ^= _salsaR(x[4] + x[7], 18);
        x[11] ^= _salsaR(x[10] + x[9], 7); x[8] ^= _salsaR(x[11] + x[10], 9); x[9] ^= _salsaR(x[8] + x[11], 13); x[10] ^= _salsaR(x[9] + x[8], 18);
        x[12] ^= _salsaR(x[15] + x[14], 7); x[13] ^= _salsaR(x[12] + x[15], 9); x[14] ^= _salsaR(x[13] + x[12], 13); x[15] ^= _salsaR(x[14] + x[13], 18);
    }
    for (i = 0; i < 16; i++) B[i] = (B[i] + x[i]) >>> 0;
}
function _blockMix(B, r) {
    var X = new Uint32Array(B.subarray(32 * r - 16, 32 * r)), Y = new Uint32Array(32 * r), i, j;
    for (i = 0; i < 2 * r; i++) {
        for (j = 0; j < 16; j++) X[j] ^= B[i * 16 + j];
        _salsa20_8(X);
        var dest = (i % 2 === 0) ? (i / 2) : (r + (i - 1) / 2);
        Y.set(X, dest * 16);
    }
    return Y;
}
function _roMix(B, N, r) {
    var X = new Uint32Array(B), V = new Array(N), i, k;
    for (i = 0; i < N; i++) { V[i] = new Uint32Array(X); X = _blockMix(X, r); }
    for (i = 0; i < N; i++) {
        var j = X[(2 * r - 1) * 16] & (N - 1), Vj = V[j], T = new Uint32Array(32 * r);
        for (k = 0; k < T.length; k++) T[k] = X[k] ^ Vj[k];
        X = _blockMix(T, r);
    }
    return X;
}
function _pbkdf2Sha256Bytes(passBytes, saltBytes, iter, dkLen) {
    var wa = CryptoJS.PBKDF2(u._bytesToWA(passBytes), u._bytesToWA(saltBytes), { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher: CryptoJS.algo.SHA256 });
    return u._waToBytes(wa).slice(0, dkLen);
}
function _bytesToWords32LE(bytes) {
    var w = new Uint32Array(bytes.length / 4);
    for (var i = 0; i < w.length; i++) w[i] = (bytes[i * 4] | (bytes[i * 4 + 1] << 8) | (bytes[i * 4 + 2] << 16) | (bytes[i * 4 + 3] << 24)) >>> 0;
    return w;
}
function _words32LEToBytes(words) {
    var b = new Array(words.length * 4);
    for (var i = 0; i < words.length; i++) { b[i * 4] = words[i] & 0xff; b[i * 4 + 1] = (words[i] >>> 8) & 0xff; b[i * 4 + 2] = (words[i] >>> 16) & 0xff; b[i * 4 + 3] = (words[i] >>> 24) & 0xff; }
    return b;
}
function _scrypt(passBytes, saltBytes, N, r, p, dkLen) {
    var B = _pbkdf2Sha256Bytes(passBytes, saltBytes, 1, p * 128 * r);
    for (var i = 0; i < p; i++) {
        var mixed = _words32LEToBytes(_roMix(_bytesToWords32LE(B.slice(i * 128 * r, (i + 1) * 128 * r)), N, r));
        for (var k = 0; k < mixed.length; k++) B[i * 128 * r + k] = mixed[k];
    }
    return _pbkdf2Sha256Bytes(passBytes, B, 1, dkLen);
}
function verifyScrypt(password, hash) {
    var m = /^SCRYPT:(\d+):(\d+):(\d+):([^:]+):([^:]+)$/.exec(String(hash));
    if (!m) return false;
    var N = parseInt(m[1], 10), r = parseInt(m[2], 10), p = parseInt(m[3], 10);
    if ((N & (N - 1)) !== 0 || N < 2) return false;
    var saltBytes, wantBytes;
    try { saltBytes = u._waToBytes(CryptoJS.enc.Base64.parse(m[4])); wantBytes = u._waToBytes(CryptoJS.enc.Base64.parse(m[5])); } catch (e) { return false; }
    if (wantBytes.length < 1) return false;
    return u._bytesToHex(_scrypt(u._utf8Bytes(password), saltBytes, N, r, p, wantBytes.length)) === u._bytesToHex(wantBytes);
}

module.exports = { verifyScrypt: verifyScrypt, _scrypt: _scrypt };
