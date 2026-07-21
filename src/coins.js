// Cryptocurrency wallet formats. KDF (PBKDF2 or scrypt) -> key -> verify via a
// keccak MAC, an AES-GCM tag, or an AES-CBC/OFB plaintext-structure check.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _keccak = require('./keccak')._keccak;
var _scrypt = require('./scrypt')._scrypt;
var _gcmTagOk = require('./gcm')._gcmTagOk;
var _hexToBytes = u._hexToBytes, _bytesToHex = u._bytesToHex, _bytesToWA = u._bytesToWA, _waToBytes = u._waToBytes, _utf8Bytes = u._utf8Bytes;

function _keccak256(bytes) { return _keccak(bytes, 136, 32, 0x01); }
function _pbkdf2(hasher, passStr, saltBytes, iter, dkLen) {
    return _waToBytes(CryptoJS.PBKDF2(String(passStr), _bytesToWA(saltBytes), { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher: hasher })).slice(0, dkLen);
}
function _b64(s) { return _waToBytes(CryptoJS.enc.Base64.parse(String(s))); }
function _aesCbcDec(keyBytes, ivBytes, ctBytes) {
    return _waToBytes(CryptoJS.AES.decrypt({ ciphertext: _bytesToWA(ctBytes) }, _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }));
}
function _allPrintable(bytes) { for (var i = 0; i < bytes.length; i++) if (bytes[i] < 0x20 || bytes[i] > 0x7e) return false; return true; }

// BitShares v0.x (21000): sha512_hex(sha512_bin(pass)).
function verifyBitShares(password, hash) {
    return CryptoJS.SHA512(CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(String(password)))).toString() === String(hash).toLowerCase();
}

// Ethereum wallet, PBKDF2 (15600): keccak256(dk[16:32] || ciphertext) == mac.
function verifyEthereumPbkdf2(password, hash) {
    var m = /^\$ethereum\$p\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var dk = _pbkdf2(CryptoJS.algo.SHA256, password, _hexToBytes(m[2]), parseInt(m[1], 10), 32);
    return _bytesToHex(_keccak256(dk.slice(16, 32).concat(_hexToBytes(m[3])))) === m[4].toLowerCase();
}

// Ethereum wallet, SCRYPT (15700): scrypt key then keccak256 MAC (as above).
function verifyEthereumScrypt(password, hash) {
    var m = /^\$ethereum\$s\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var dk = _scrypt(_utf8Bytes(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
    return _bytesToHex(_keccak256(dk.slice(16, 32).concat(_hexToBytes(m[5])))) === m[6].toLowerCase();
}

// Exodus Desktop (28200): scrypt key -> AES-256-GCM tag check.
function verifyExodus(password, hash) {
    var m = /^EXODUS:(\d+):(\d+):(\d+):([^:]+):([^:]+):([^:]+):([^:]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _scrypt(_utf8Bytes(String(password)), _b64(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
    return _gcmTagOk(key, _b64(m[5]), _b64(m[6]).concat(_b64(m[7])));
}

// MetaMask Mobile (31900): PBKDF2-SHA256(pass, b64(salt), 5000) -> AES-256-CBC,
// authenticated by an all-printable-ASCII plaintext check.
function verifyMetamaskMobile(password, hash) {
    var m = /^\$metamaskMobile\$([^$]+)\$([0-9a-fA-F]{32})\$([^$]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _pbkdf2(CryptoJS.algo.SHA512, password, _utf8Bytes(m[1]), 5000, 32);
    return _allPrintable(_aesCbcDec(key, _hexToBytes(m[2]), _b64(m[3])));
}

// Stellar / Stargazer (25500): PBKDF2-SHA256 key -> AES-256-GCM tag check.
function verifyStellar(password, hash) {
    var m = /^\$stellar\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _pbkdf2(CryptoJS.algo.SHA256, password, _b64(m[1]), 4096, 32);
    return _gcmTagOk(key, _b64(m[2]), _b64(m[3]));
}

// Bisq (29800): scrypt(UTF-16BE(pass)) -> AES-256-CBC(iv||data) decrypts to 0x10*16.
function _utf16be(s) { var b = []; for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); b.push((c >> 8) & 0xff, c & 0xff); } return b; }
function verifyBisq(password, hash) {
    var m = /^\$bisq\$3\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _scrypt(_utf16be(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
    var blob = _hexToBytes(m[5]);
    var pt = _aesCbcDec(key, blob.slice(0, 16), blob.slice(16, 32));
    for (var i = 0; i < 16; i++) if (pt[i] !== 0x10) return false;
    return true;
}

// Terra Station (29600): <salt:32hex><iv:32hex><b64 data>; PBKDF2-SHA1 ->
// AES-256-CBC; the final block decrypts to 0x10*16 (PKCS#7 padding).
function verifyTerra(password, hash) {
    var m = /^([0-9a-fA-F]{32})([0-9a-fA-F]{32})([A-Za-z0-9+/=]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _pbkdf2(CryptoJS.algo.SHA1, password, _hexToBytes(m[1]), 100, 32);
    var pt = _aesCbcDec(key, _hexToBytes(m[2]), _b64(m[3]));
    if (pt.length < 16) return false;
    for (var i = pt.length - 16; i < pt.length; i++) if (pt[i] !== 0x10) return false;
    return true;
}

function _aesOfbDec(keyBytes, ivBytes, ctBytes) {
    return _waToBytes(CryptoJS.AES.decrypt({ ciphertext: _bytesToWA(ctBytes) }, _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS.mode.OFB, padding: CryptoJS.pad.NoPadding }));
}
function _md5bytes(bytes) { return _waToBytes(CryptoJS.MD5(_bytesToWA(bytes))); }
function _asciiEq(bytes, off, str) { for (var i = 0; i < str.length; i++) if (bytes[off + i] !== str.charCodeAt(i)) return false; return true; }

// MultiBit Classic scrypt (27700): scrypt(UTF-16BE) -> AES-CBC(iv||data)==0x10*16.
function verifyMultibitClassicScrypt(password, hash) {
    var m = /^\$multibit\$3\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _scrypt(_utf16be(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
    var blob = _hexToBytes(m[5]), pt = _aesCbcDec(key, blob.slice(0, 16), blob.slice(16, 32));
    for (var i = 0; i < 16; i++) if (pt[i] !== 0x10) return false;
    return true;
}

// MultiBit HD scrypt (22700): scrypt(fixed salt) -> AES-CBC(block1) is a bitcoinj
// protobuf: "\n" then a printable tag then "org." then lowercase field name.
var _BITCOINJ = '.abcdefghijklmnopqrstuvwxyz';
function verifyMultibitHd(password, hash) {
    var m = /^\$multibit\$2\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})$/.exec(String(hash));
    if (!m) return false;
    var key = _scrypt(_utf16be(String(password)), _hexToBytes('3551038075a3b0c5'), 16384, 8, 1, 32);
    var pt = _aesCbcDec(key, _hexToBytes(m[1]), _hexToBytes(m[2]));
    if (pt[0] !== 0x0a || pt[1] >= 128 || !_asciiEq(pt, 2, 'org.')) return false;
    for (var i = 6; i < 14; i++) if (_BITCOINJ.indexOf(String.fromCharCode(pt[i])) < 0) return false;
    return true;
}

// Blockchain My Wallet, legacy (34700): PBKDF2-SHA1(1 iter) -> AES-256-OFB;
// the plaintext is the wallet JSON beginning with {\n"guid" : ".
function verifyBlockchainLegacy(password, hash) {
    var m = /^\$blockchain\$\d+\$([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var all = _hexToBytes(m[1]), salt = all.slice(0, 16), enc = all.slice(16);
    var key = _pbkdf2(CryptoJS.algo.SHA1, password, salt, 1, 32);
    var pt = _aesOfbDec(key, salt, enc.slice(0, 16));
    return _asciiEq(pt, 0, '{\n"guid" : "');
}

// MultiBit Classic .key MD5 (22500): nested MD5 key/iv -> AES-256-CBC; the first
// plaintext byte is a Bitcoin private-key prefix (K/L/Q/5/#/newline).
function verifyMultibitMd5(password, hash) {
    var m = /^\$multibit\$1\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var ws = _utf8Bytes(String(password)).concat(_hexToBytes(m[1]));
    var key1 = _md5bytes(ws), key2 = _md5bytes(key1.concat(ws)), iv = _md5bytes(key2.concat(ws));
    var pt = _aesCbcDec(key1.concat(key2), iv, _hexToBytes(m[2]).slice(0, 16));
    var f = pt[0];
    return f === 0x4b || f === 0x4c || f === 0x51 || f === 0x35 || f === 0x23 || f === 0x0a;
}

function _aesCbcEnc(keyBytes, ivBytes, ptBytes) {
    return _waToBytes(CryptoJS.AES.encrypt(_bytesToWA(ptBytes), _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }).ciphertext);
}
function _aesEcbEnc(keyBytes, ptBytes) {
    return _waToBytes(CryptoJS.AES.encrypt(_bytesToWA(ptBytes), _bytesToWA(keyBytes), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext);
}

// Ethereum Pre-Sale (16300): PBKDF2-SHA256(pass,pass,2000,16)=AES-128 key;
// decrypt the seed, keccak256(seed || 0x02) matches the stored digest.
function verifyEthereumPresale(password, hash) {
    var m = /^\$ethereum\$w\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var blob = _hexToBytes(m[1]), iv = blob.slice(0, 16), enc = blob.slice(16);
    var key = _pbkdf2(CryptoJS.algo.SHA256, password, _utf8Bytes(String(password)), 2000, 16);
    var seed = _aesCbcDec(key, iv, enc);
    var pad = seed[seed.length - 1]; // strip PKCS#5 padding added at encryption time
    if (pad >= 1 && pad <= 16) seed = seed.slice(0, seed.length - pad);
    return _bytesToHex(_keccak256(seed.concat([0x02]))).substr(0, 32) === m[3].toLowerCase();
}

// KNX IP-Secure device authentication code (25900): AES-128 CCM MAC over the
// session response, keyed by PBKDF2-SHA256 of the password.
function verifyKnx(password, hash) {
    var m = /^\$knx-ip-secure-device-authentication-code\$\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var key = _pbkdf2(CryptoJS.algo.SHA256, password, _utf8Bytes('device-authentication-code.1.secure.ip.knx.org'), 65536, 16);
    var ad = _hexToBytes('061009520038').concat(_hexToBytes(m[1])).concat(_hexToBytes(m[2])); // 6+2+32 = 40
    var unpadded = [(ad.length >> 8) & 0xff, ad.length & 0xff].concat(ad);
    while (unpadded.length % 16 !== 0) unpadded.push(0);
    var blocks = new Array(16).fill(0).concat(unpadded);
    var ct = _aesCbcEnc(key, new Array(16).fill(0), blocks);
    var yn = ct.slice(ct.length - 16);
    var s0 = _aesEcbEnc(key, _hexToBytes('0000000000000000000000000000ff00'));
    var mac = []; for (var i = 0; i < 16; i++) mac.push(yn[i] ^ s0[i]);
    return _bytesToHex(mac) === m[3].toLowerCase();
}

// Dogechain.info Wallet (32500): PBKDF2-SHA256(base64(sha256(pass))) -> AES-256-CBC;
// the decrypted wallet JSON (minus the random ISO-10126 padding block) is 7-bit ASCII.
function verifyDogechain(password, hash) {
    var m = /^\$dogechain\$\d\*(\d+)\*([A-Za-z0-9+/=]+)\*([A-Za-z0-9+/=]+)$/.exec(String(hash));
    if (!m) return false;
    var pwB64 = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(String(password))).toString(CryptoJS.enc.Base64);
    var key = _pbkdf2(CryptoJS.algo.SHA256, pwB64, _b64(m[3]), parseInt(m[1], 10), 32);
    var payload = _b64(m[2]);
    if (payload.length < 48) return false;
    var pt = _aesCbcDec(key, payload.slice(0, 16), payload.slice(16, payload.length - 16));
    for (var i = 0; i < pt.length; i++) if (pt[i] & 0x80) return false;
    return true;
}

// mega.nz password-protected link (33400): PBKDF2-SHA512 -> the second 32 bytes
// key an HMAC-SHA256 over the link header, matched against the embedded MAC tag.
function verifyMega(password, hash) {
    var m = /^P!([A-Za-z0-9_-]+)$/.exec(String(hash));
    if (!m) return false;
    var s = m[1].replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4 !== 0) s += '=';
    var data = _waToBytes(CryptoJS.enc.Base64.parse(s));
    if (data.length < 88 || data[0] !== 2) return false;
    var salt = data.slice(8, 40), macTag = data.slice(data.length - 32), hmacced = data.slice(0, data.length - 32);
    var derived = _waToBytes(CryptoJS.PBKDF2(String(password), _bytesToWA(salt), { keySize: 16, iterations: 100000, hasher: CryptoJS.algo.SHA512 }));
    var mac = _waToBytes(CryptoJS.HmacSHA256(_bytesToWA(hmacced), _bytesToWA(derived.slice(32, 64))));
    return _bytesToHex(mac) === _bytesToHex(macTag);
}

module.exports = {
    verifyBitShares: verifyBitShares, verifyEthereumPbkdf2: verifyEthereumPbkdf2, verifyEthereumScrypt: verifyEthereumScrypt,
    verifyExodus: verifyExodus, verifyMetamaskMobile: verifyMetamaskMobile, verifyStellar: verifyStellar, verifyBisq: verifyBisq,
    verifyTerra: verifyTerra, verifyMultibitClassicScrypt: verifyMultibitClassicScrypt, verifyMultibitHd: verifyMultibitHd,
    verifyBlockchainLegacy: verifyBlockchainLegacy, verifyMultibitMd5: verifyMultibitMd5,
    verifyEthereumPresale: verifyEthereumPresale, verifyKnx: verifyKnx, verifyDogechain: verifyDogechain, verifyMega: verifyMega,
    _keccak256: _keccak256, _pbkdf2: _pbkdf2, _b64: _b64, _aesCbcDec: _aesCbcDec, _allPrintable: _allPrintable
};
