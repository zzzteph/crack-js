// Base58Check and Bech32 (segwit), hand-written. Used to build/parse Bitcoin
// addresses and WIF private keys.
var u = require('./util');
var CryptoJS = u.CryptoJS;

var _B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function _base58encode(bytes) {
    var digits = [0], i, j;
    for (i = 0; i < bytes.length; i++) {
        var carry = bytes[i] & 0xff;
        for (j = 0; j < digits.length; j++) { carry += digits[j] << 8; digits[j] = carry % 58; carry = (carry / 58) | 0; }
        while (carry > 0) { digits.push(carry % 58); carry = (carry / 58) | 0; }
    }
    var str = '';
    for (i = 0; i < bytes.length && bytes[i] === 0; i++) str += '1';
    for (j = digits.length - 1; j >= 0; j--) str += _B58[digits[j]];
    return str;
}
function _base58decode(str) {
    var bytes = [0], i, j;
    for (i = 0; i < str.length; i++) {
        var val = _B58.indexOf(str[i]);
        if (val < 0) throw new Error('base58');
        var carry = val;
        for (j = 0; j < bytes.length; j++) { carry += bytes[j] * 58; bytes[j] = carry & 0xff; carry >>= 8; }
        while (carry > 0) { bytes.push(carry & 0xff); carry >>= 8; }
    }
    for (i = 0; i < str.length && str[i] === '1'; i++) bytes.push(0);
    return bytes.reverse();
}
function _sha256d(bytes) { return u._waToBytes(CryptoJS.SHA256(CryptoJS.SHA256(u._bytesToWA(bytes)))); }
function _base58check(payload) { return _base58encode(payload.concat(_sha256d(payload).slice(0, 4))); }
function _base58checkDecode(str) {
    var full = _base58decode(str);
    if (full.length < 5) throw new Error('short');
    var payload = full.slice(0, full.length - 4), chk = _sha256d(payload).slice(0, 4);
    for (var i = 0; i < 4; i++) if (chk[i] !== full[full.length - 4 + i]) throw new Error('checksum');
    return payload;
}
var _BECH32 = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
function _bech32Polymod(values) {
    var GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3], chk = 1;
    for (var p = 0; p < values.length; p++) {
        var top = chk >>> 25;
        chk = ((chk & 0x1ffffff) << 5) ^ values[p];
        for (var i = 0; i < 5; i++) if ((top >>> i) & 1) chk ^= GEN[i];
    }
    return chk >>> 0;
}
function _convertBits(data, from, to, pad) {
    var acc = 0, bits = 0, ret = [], maxv = (1 << to) - 1;
    for (var i = 0; i < data.length; i++) {
        acc = ((acc << from) | (data[i] & 0xff)) >>> 0; bits += from;
        while (bits >= to) { bits -= to; ret.push((acc >>> bits) & maxv); }
    }
    if (pad && bits > 0) ret.push((acc << (to - bits)) & maxv);
    return ret;
}
function _bech32Segwit(hrp, witver, program) {
    var data = [witver].concat(_convertBits(program, 8, 5, true)), i;
    var values = [];
    for (i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) >> 5);
    values.push(0);
    for (i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) & 31);
    values = values.concat(data).concat([0, 0, 0, 0, 0, 0]);
    var polymod = _bech32Polymod(values) ^ 1, chk = [];
    for (i = 0; i < 6; i++) chk.push((polymod >>> (5 * (5 - i))) & 31);
    var combined = data.concat(chk), str = hrp + '1';
    for (i = 0; i < combined.length; i++) str += _BECH32[combined[i]];
    return str;
}

module.exports = { _base58check: _base58check, _base58checkDecode: _base58checkDecode, _bech32Segwit: _bech32Segwit };
