// NetNTLMv1 / +ESS (5500 / 27000) and NetNTLMv2 (NT) (27100). NetNTLMv1 uses
// DES-ECB (crypto-js) with the classic MS 7->8-byte key bit-spread.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes;

function ntlmDesKeyWA(k0, k1, k2, k3, k4, k5, k6) {
    var s = String.fromCharCode(
        k0 & 0xff,
        ((k0 << 7) | (k1 >> 1)) & 0xff,
        ((k1 << 6) | (k2 >> 2)) & 0xff,
        ((k2 << 5) | (k3 >> 3)) & 0xff,
        ((k3 << 4) | (k4 >> 4)) & 0xff,
        ((k4 << 3) | (k5 >> 5)) & 0xff,
        ((k5 << 2) | (k6 >> 6)) & 0xff,
        (k6 << 1) & 0xff);
    return CryptoJS.enc.Latin1.parse(s);
}
function desEcbBlockHex(keyWA, dataWA) {
    return CryptoJS.DES.encrypt(dataWA.clone(), keyWA, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString(CryptoJS.enc.Hex);
}
function netntlmv1Response(nt16bytes, challenge8WA) {
    var b = nt16bytes.concat([0, 0, 0, 0, 0]), out = '';
    for (var g = 0; g < 3; g++) {
        var o = g * 7;
        out += desEcbBlockHex(ntlmDesKeyWA(b[o], b[o + 1], b[o + 2], b[o + 3], b[o + 4], b[o + 5], b[o + 6]), challenge8WA);
    }
    return out;
}
function netntlmv1VerifyCore(nt16bytes, hash) {
    var parts = String(hash).split(':');
    if (parts.length < 6) return false;
    var cchallHex = parts[3], ntresp = parts[4].toLowerCase(), schallHex = parts[5];
    if (!/^[0-9a-fA-F]{48}$/.test(cchallHex) || !/^[0-9a-fA-F]{16}$/.test(schallHex) || !/^[0-9a-fA-F]{48}$/.test(ntresp)) return false;
    var cchall = CryptoJS.enc.Hex.parse(cchallHex.substr(0, 16));
    var schall = CryptoJS.enc.Hex.parse(schallHex);
    var md5wa = CryptoJS.MD5(schall.clone().concat(cchall.clone()));
    var ess = CryptoJS.lib.WordArray.create(md5wa.words.slice(0, 2), 8);
    return netntlmv1Response(nt16bytes, ess) === ntresp || netntlmv1Response(nt16bytes, schall) === ntresp;
}
function verifyNetntlmv1(password, hash) {
    return netntlmv1VerifyCore(_waToBytes(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(password)))), hash);
}
function verifyNetntlmv1NT(password, hash) {
    var p = String(password);
    if (!/^[0-9a-fA-F]{32}$/.test(p)) return false;
    return netntlmv1VerifyCore(_waToBytes(CryptoJS.enc.Hex.parse(p)), hash);
}
function verifyNetntlmv2NT(password, hash) {
    var p = String(password);
    if (!/^[0-9a-fA-F]{32}$/.test(p)) return false;
    var parts = String(hash).split(':');
    if (parts.length < 6) return false;
    var user = parts[0], domain = parts[2], srv = parts[3], digest = parts[4].toLowerCase(), cli = parts[5];
    var ntlmv2hash = CryptoJS.HmacMD5(CryptoJS.enc.Utf16LE.parse(user.toUpperCase() + domain), CryptoJS.enc.Hex.parse(p));
    var result = CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(srv + cli), ntlmv2hash);
    return result.toString(CryptoJS.enc.Hex) === digest;
}

module.exports = { verifyNetntlmv1: verifyNetntlmv1, verifyNetntlmv1NT: verifyNetntlmv1NT, verifyNetntlmv2NT: verifyNetntlmv2NT, netntlmv1Response: netntlmv1Response };
