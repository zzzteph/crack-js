// Crypto-wallet verifiers: MetaMask (26600), Blockchain My Wallet 2nd-password
// (18800) / v1 (12700) / v2 (15200), and Bitcoin/Litecoin wallet.dat (11300).
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToWA = u._bytesToWA, _bytesToHex = u._bytesToHex;
var _gcmMod = require('./gcm'), _gcmTagOk = _gcmMod._gcmTagOk, _gcmDecrypt = _gcmMod._gcmDecrypt;

function verifyMetamask(password, hash) {
    var m = /^\$metamask\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
    if (!m) return false;
    var salt, iv, ctTag;
    try {
        salt = _waToBytes(CryptoJS.enc.Base64.parse(m[1]));
        iv = _waToBytes(CryptoJS.enc.Base64.parse(m[2]));
        ctTag = _waToBytes(CryptoJS.enc.Base64.parse(m[3]));
    } catch (e) { return false; }
    if (ctTag.length < 16) return false;
    var keyWA = CryptoJS.PBKDF2(String(password), _bytesToWA(salt), { keySize: 8, iterations: 10000, hasher: CryptoJS.algo.SHA256 });
    return _gcmTagOk(_waToBytes(keyWA), iv, ctTag);
}
// MetaMask "short" (26610): same KDF as 26600 but the stored ct has no GCM tag;
// a correct password decrypts to all-printable-ASCII (the wallet JSON).
function verifyMetamaskShort(password, hash) {
    var m = /^\$metamask-short\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
    if (!m) return false;
    var salt, iv, ct;
    try {
        salt = _waToBytes(CryptoJS.enc.Base64.parse(m[1]));
        iv = _waToBytes(CryptoJS.enc.Base64.parse(m[2]));
        ct = _waToBytes(CryptoJS.enc.Base64.parse(m[3]));
    } catch (e) { return false; }
    if (ct.length < 16) return false;
    var keyWA = CryptoJS.PBKDF2(String(password), _bytesToWA(salt), { keySize: 8, iterations: 10000, hasher: CryptoJS.algo.SHA256 });
    var pt = _gcmDecrypt(_waToBytes(keyWA), iv, ct);
    for (var i = 0; i < pt.length; i++) if (pt[i] < 0x20 || pt[i] > 0x7e) return false;
    return pt.length > 0;
}
function verifyBlockchain2ndPass(password, hash) {
    var raw;
    try { raw = _waToBytes(CryptoJS.enc.Base64.parse(String(hash))); } catch (e) { return false; }
    if (raw.length < 59 || raw[0] !== 0x62 || raw[1] !== 0x73 || raw[2] !== 0x3a) return false; // "bs:"
    var digestStored = raw.slice(3, 35), salt = raw.slice(35, 51);
    var iter = raw[51] | (raw[52] << 8) | (raw[53] << 16) | (raw[54] << 24);
    if (iter < 1 || iter > 1000000) return false;
    var hx = _bytesToHex(salt);
    var uuid = hx.substr(0, 8) + '-' + hx.substr(8, 4) + '-' + hx.substr(12, 4) + '-' + hx.substr(16, 4) + '-' + hx.substr(20, 12);
    var digest = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(uuid + String(password)));
    for (var i = 0; i < iter - 1; i++) digest = CryptoJS.SHA256(digest);
    return digest.toString(CryptoJS.enc.Hex) === _bytesToHex(digestStored);
}
function verifyWalletDat(password, hash) {
    var parts = String(hash).split('$');
    if (parts[1] !== 'bitcoin' || parts.length < 7) return false;
    var cmaster = parts[3], saltHex = parts[5], iter = parseInt(parts[6], 10);
    if (!iter || !/^[0-9a-fA-F]+$/.test(cmaster) || !/^[0-9a-fA-F]+$/.test(saltHex)) return false;
    var digest = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(String(password)).concat(CryptoJS.enc.Hex.parse(saltHex)));
    for (var i = 1; i < iter; i++) digest = CryptoJS.SHA512(digest);
    var keyWA = CryptoJS.lib.WordArray.create(digest.words.slice(0, 8), 32);
    var ivWA = CryptoJS.lib.WordArray.create(digest.words.slice(8, 12), 16);
    var dec = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(cmaster) }),
        keyWA, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: ivWA });
    var b = _waToBytes(dec), n = b.length, ok16 = n >= 16, ok8 = n >= 8, j;
    for (j = 1; j <= 16; j++) if (b[n - j] !== 0x10) { ok16 = false; break; }
    for (j = 1; j <= 8; j++) if (b[n - j] !== 0x08) { ok8 = false; break; }
    return ok16 || ok8;
}
function _blockchainCheck(password, saltHex, encHex, iter) {
    var saltWA = CryptoJS.enc.Hex.parse(saltHex);
    var key = CryptoJS.PBKDF2(String(password), saltWA, { keySize: 8, iterations: iter, hasher: CryptoJS.algo.SHA1 });
    var dec = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(encHex) }),
        key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: saltWA });
    var s = dec.toString(CryptoJS.enc.Latin1);
    return s.charAt(0) === '{' && s.indexOf('"guid"') >= 0;
}
function verifyBlockchainV1(password, hash) {
    var m = /^\$blockchain\$\d+\$([0-9a-fA-F]{32})([0-9a-fA-F]+)$/.exec(String(hash));
    return m ? _blockchainCheck(password, m[1], m[2], 10) : false;
}
function verifyBlockchainV2(password, hash) {
    var m = /^\$blockchain\$v2\$(\d+)\$\d+\$([0-9a-fA-F]{32})([0-9a-fA-F]+)$/.exec(String(hash));
    return m ? _blockchainCheck(password, m[2], m[3], parseInt(m[1], 10)) : false;
}

module.exports = {
    verifyMetamask: verifyMetamask, verifyMetamaskShort: verifyMetamaskShort, verifyBlockchain2ndPass: verifyBlockchain2ndPass,
    verifyWalletDat: verifyWalletDat, verifyBlockchainV1: verifyBlockchainV1, verifyBlockchainV2: verifyBlockchainV2
};
