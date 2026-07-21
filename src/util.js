// Shared low-level helpers used across the hand-written primitives and the mode
// verifiers. Only crypto-js is required here (bcryptjs is required where needed).
var CryptoJS = require('crypto-js');
require('./md4'); // adds CryptoJS.MD4 / HmacMD4 (side effect) for NTLM/Kerberos

var _MASK64 = (1n << 64n) - 1n;

// WordArray (big-endian words) <-> plain byte arrays.
function _waToBytes(wa) {
    var bytes = [];
    for (var i = 0; i < wa.sigBytes; i++) bytes.push((wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
    return bytes;
}
function _bytesToWA(bytes) {
    var words = [];
    for (var i = 0; i < bytes.length; i++) words[i >>> 2] |= (bytes[i] & 0xff) << (24 - (i % 4) * 8);
    return CryptoJS.lib.WordArray.create(words, bytes.length);
}
function _u8ToWA(u8) {
    var words = [];
    for (var i = 0; i < u8.length; i++) words[i >>> 2] |= u8[i] << (24 - (i % 4) * 8);
    return CryptoJS.lib.WordArray.create(words, u8.length);
}
function _hexToBytes(hex) {
    var b = [];
    for (var i = 0; i + 1 < hex.length; i += 2) b.push(parseInt(hex.substr(i, 2), 16));
    return b;
}
function _bytesToHex(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) { var h = (bytes[i] & 0xff).toString(16); s += h.length < 2 ? '0' + h : h; }
    return s;
}
function _utf8Bytes(str) {
    var s = unescape(encodeURIComponent(String(str))), out = [];
    for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
    return out;
}
function _le32(n) { return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]; }

// Raw single-block AES (key given as a WordArray so no passphrase-KDF kicks in).
function aesEncBlockWA(keyWA, dataWA) {
    return CryptoJS.AES.encrypt(dataWA.clone(), keyWA, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext;
}
function aesDecBlockWA(keyWA, dataWA) {
    return CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: dataWA.clone() }), keyWA, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });
}

module.exports = {
    CryptoJS: CryptoJS, _MASK64: _MASK64,
    _waToBytes: _waToBytes, _bytesToWA: _bytesToWA, _u8ToWA: _u8ToWA,
    _hexToBytes: _hexToBytes, _bytesToHex: _bytesToHex, _utf8Bytes: _utf8Bytes, _le32: _le32,
    aesEncBlockWA: aesEncBlockWA, aesDecBlockWA: aesDecBlockWA
};
