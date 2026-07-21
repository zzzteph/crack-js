// PBKDF2/PBKDF1 password formats (Django, web2py, PBKDF1-SHA1, passlib
// pbkdf2-sha1/256/512). All crypto-js PBKDF2; just different string wrappers.
var u = require('./util');
var CryptoJS = u.CryptoJS;
require('./md4');
var _scrypt = require('./scrypt')._scrypt;
var _waToBytes = u._waToBytes, _bytesToWA = u._bytesToWA, _bytesToHex = u._bytesToHex, _hexToBytes = u._hexToBytes, _utf8Bytes = u._utf8Bytes;

// Cisco Type 8/9 base64: standard alphabet remapped to "./0-9A-Za-z".
var _STD_B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var _CISCO_B64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function _toCiscoB64(bytes) {
    var std = CryptoJS.enc.Base64.stringify(_bytesToWA(bytes)); // 44 chars incl '=' for 32 bytes
    var out = '';
    for (var i = 0; i < 43; i++) { var j = _STD_B64.indexOf(std[i]); out += (j < 0 ? std[i] : _CISCO_B64[j]); }
    return out;
}

function _b64ToBytes(s, ab64) {
    if (ab64) s = s.replace(/\./g, '+');
    while (s.length % 4 !== 0) s += '=';
    return _waToBytes(CryptoJS.enc.Base64.parse(s));
}
function _pbkdf2(hasher, password, saltWA, iter, dkLen) {
    return _waToBytes(CryptoJS.PBKDF2(String(password), saltWA, { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher: hasher })).slice(0, dkLen);
}

// Django (10000): pbkdf2_sha256$<iter>$<salt>$<base64 dk>
function verifyDjango(password, hash) {
    var m = /^pbkdf2_sha256\$(\d+)\$([^$]+)\$([A-Za-z0-9+/]+=*)$/.exec(String(hash));
    if (!m) return false;
    var want = _b64ToBytes(m[3], false);
    var dk = _pbkdf2(CryptoJS.algo.SHA256, password, CryptoJS.enc.Latin1.parse(m[2]), parseInt(m[1], 10), want.length);
    return _bytesToHex(dk) === _bytesToHex(want);
}

// web2py (21600): pbkdf2(<iter>,<keylen>,sha512)$<salt>$<dk hex>
function verifyWeb2py(password, hash) {
    var m = /^pbkdf2\((\d+),(\d+),sha512\)\$([^$]+)\$([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var dk = _pbkdf2(CryptoJS.algo.SHA512, password, CryptoJS.enc.Latin1.parse(m[3]), parseInt(m[1], 10), parseInt(m[2], 10));
    return _bytesToHex(dk) === m[4].toLowerCase();
}

// PBKDF1-SHA1 (32900): PBKDF1:sha1:<iter>:<base64 salt>:<base64 dk>
function verifyPbkdf1Sha1(password, hash) {
    var m = /^PBKDF1:sha1:(\d+):([A-Za-z0-9+/]+=*):([A-Za-z0-9+/]+=*)$/.exec(String(hash));
    if (!m) return false;
    var iter = parseInt(m[1], 10), salt = _b64ToBytes(m[2], false), want = _b64ToBytes(m[3], false);
    var t = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(String(password)).concat(_bytesToWA(salt)));
    for (var i = 1; i < iter; i++) t = CryptoJS.SHA1(t);
    return _waToBytes(t).slice(0, want.length).join(',') === want.join(',');
}

// passlib pbkdf2 (20200/20300/20400): $pbkdf2[-sha256/-sha512]$<iter>$<ab64 salt>$<ab64 dk>
function makePasslibVerifier(hasher, tag) {
    var re = new RegExp('^\\$' + tag + '\\$(\\d+)\\$([A-Za-z0-9./]+)\\$([A-Za-z0-9./]+)$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m) return false;
        var salt = _b64ToBytes(m[2], true), want = _b64ToBytes(m[3], true);
        var dk = _pbkdf2(hasher, password, _bytesToWA(salt), parseInt(m[1], 10), want.length);
        return _bytesToHex(dk) === _bytesToHex(want);
    };
}

// Cisco-IOS type 4 (5700): sha256(pass) -> cisco base64 (no salt).
function verifyCiscoIos4(password, hash) {
    return _toCiscoB64(_waToBytes(CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(String(password))))) === String(hash);
}

// Cisco IOS $8$ (9200): PBKDF2-SHA256(word, salt, 20000, 32) -> cisco base64.
function verifyCisco8(password, hash) {
    var m = /^\$8\$([^$]+)\$(.{43})$/.exec(String(hash));
    if (!m) return false;
    var dk = _pbkdf2(CryptoJS.algo.SHA256, password, CryptoJS.enc.Latin1.parse(m[1]), 20000, 32);
    return _toCiscoB64(dk) === m[2];
}

// Cisco IOS $9$ (9300): scrypt(word, salt, N=16384, r=1, p=1, 32) -> cisco base64.
function verifyCisco9(password, hash) {
    var m = /^\$9\$([^$]+)\$(.{43})$/.exec(String(hash));
    if (!m) return false;
    var dk = _scrypt(_utf8Bytes(String(password)), _utf8Bytes(m[1]), 16384, 1, 1, 32);
    return _toCiscoB64(dk) === m[2];
}

// SAP CODVN H iSSHA-1 (10300) / isSHA512 (35000): {x-issha, N}base64(digest||salt).
function makeSapCodvnH(hasher, tag, dgstLen) {
    var re = new RegExp('^\\{' + tag + ', (\\d+)\\}(.+)$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m) return false;
        var iter = parseInt(m[1], 10), blob = _waToBytes(CryptoJS.enc.Base64.parse(m[2]));
        if (blob.length < dgstLen) return false;
        var salt = blob.slice(dgstLen);
        var buf = _bytesToWA(salt);
        var pw = CryptoJS.enc.Latin1.parse(String(password));
        for (var i = 0; i < iter; i++) buf = hasher(pw.clone().concat(buf));
        return _waToBytes(buf).join(',') === blob.slice(0, dgstLen).join(',');
    };
}

// MS-AzureSync PBKDF2-HMAC-SHA256 (12800): v1;PPH1_MD4,<salt hex>,<iter>,<dk hex>
function verifyAzureSync(password, hash) {
    var m = /^v1;PPH1_MD4,([0-9a-fA-F]+),(\d+),([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var nt = CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(password))).toString().toUpperCase();
    var pwWA = CryptoJS.enc.Utf16LE.parse(nt);
    var dk = _waToBytes(CryptoJS.PBKDF2(pwWA, _bytesToWA(_hexToBytes(m[1])), { keySize: 8, iterations: parseInt(m[2], 10), hasher: CryptoJS.algo.SHA256 })).slice(0, 32);
    return _bytesToHex(dk) === m[3].toLowerCase();
}

// NetIQ SSPR PBKDF2-HMAC-SHA1 (32050): $pbkdf2-hmac-sha1$<iter>$<salt hex>$<key hex>
function verifyNetIqSha1(password, hash) {
    var m = /^\$pbkdf2-hmac-sha1\$(\d+)\$([0-9a-fA-F]+)\$([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var dk = _pbkdf2(CryptoJS.algo.SHA1, password, _bytesToWA(_hexToBytes(m[2])), parseInt(m[1], 10), m[3].length / 2);
    return _bytesToHex(dk) === m[3].toLowerCase();
}
// NetIQ SSPR PBKDF2-HMAC-SHA512 (32070): $pbkdf2-hmac-sha512$<iter>.<salt hex>.<key hex>
function verifyNetIqSha512(password, hash) {
    var m = /^\$pbkdf2-hmac-sha512\$(\d+)\.([0-9a-fA-F]+)\.([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var dk = _pbkdf2(CryptoJS.algo.SHA512, password, _bytesToWA(_hexToBytes(m[2])), parseInt(m[1], 10), m[3].length / 2);
    return _bytesToHex(dk) === m[3].toLowerCase();
}
// Juniper IVE (501): base64( 12-byte IV || AES-128-CBC( "$1$danastre$<hash>" ) )
// with a fixed embedded key; recovers a standard md5crypt over the salt "danastre".
var _verifyMD5CRYPT = require('./crypt').verifyMD5CRYPT;
function verifyJuniper(password, hash) {
    var blob;
    try { blob = _waToBytes(CryptoJS.enc.Base64.parse(String(hash))); } catch (e) { return false; }
    if (blob.length < 76) return false;
    var iv = _bytesToWA(blob.slice(0, 12).concat([0, 0, 0, 0]));
    var ct = _bytesToWA(blob.slice(12, 76));
    var key = CryptoJS.enc.Hex.parse('a6707a7e8df91059dea70ae52f9c2442');
    var pt = _waToBytes(CryptoJS.AES.decrypt({ ciphertext: ct }, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }));
    var s = '';
    for (var i = 0; i < 34 && i < pt.length; i++) s += String.fromCharCode(pt[i]);
    return /^\$1\$danastre\$/.test(s) && _verifyMD5CRYPT(String(password), s);
}

// RedHat 389-DS (10901): {PBKDF2_SHA256}base64( iter(4 BE) || salt || dk(256 bytes) )
function verifyRedHat389(password, hash) {
    var m = /^\{PBKDF2_SHA256\}(.+)$/.exec(String(hash));
    if (!m) return false;
    var blob = _waToBytes(CryptoJS.enc.Base64.parse(m[1]));
    if (blob.length <= 4 + 256) return false;
    var iter = ((blob[0] << 24) | (blob[1] << 16) | (blob[2] << 8) | blob[3]) >>> 0;
    var want = blob.slice(blob.length - 256), salt = blob.slice(4, blob.length - 256);
    var dk = _pbkdf2(CryptoJS.algo.SHA256, password, _bytesToWA(salt), iter, 256);
    return _bytesToHex(dk) === _bytesToHex(want);
}

module.exports = {
    _toCiscoB64: _toCiscoB64, verifyCiscoIos4: verifyCiscoIos4,
    verifyDjango: verifyDjango, verifyWeb2py: verifyWeb2py, verifyPbkdf1Sha1: verifyPbkdf1Sha1,
    verifyCisco8: verifyCisco8, verifyCisco9: verifyCisco9, verifyAzureSync: verifyAzureSync,
    verifyNetIqSha1: verifyNetIqSha1, verifyNetIqSha512: verifyNetIqSha512, verifyRedHat389: verifyRedHat389, verifyJuniper: verifyJuniper,
    verifySapCodvnH1: makeSapCodvnH(CryptoJS.SHA1, 'x-issha', 20),
    verifySapCodvnH512: makeSapCodvnH(CryptoJS.SHA512, 'x-isSHA512', 64),
    verifyPasslibSha1: makePasslibVerifier(CryptoJS.algo.SHA1, 'pbkdf2'),
    verifyPasslibSha256: makePasslibVerifier(CryptoJS.algo.SHA256, 'pbkdf2-sha256'),
    verifyPasslibSha512: makePasslibVerifier(CryptoJS.algo.SHA512, 'pbkdf2-sha512')
};
