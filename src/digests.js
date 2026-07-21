// Fast unkeyed digests + salted/combinator factories + MySQL323.
var CryptoJS = require('crypto-js');
var bcrypt = require('./bcryptjs-own');
require('./md4');

function mysql323Hash(password) {
    let nr = 1345345333;
    let nr2 = 305419889;
    let add = 7;

    for (let i = 0; i < password.length; i++) {
        let ch = password.charCodeAt(i);
        nr ^= ((nr & 63) + add) * ch + (nr << 8);
        nr2 += (nr2 << 8) ^ nr;
        add += ch;
    }


    // MySQL masks each half with 0x7fffffff (clears the high bit) and prints each
    // as its own zero-padded 8-hex field ("%08lx%08lx").
    var h1 = ((nr & 0x7fffffff) >>> 0).toString(16);
    var h2 = ((nr2 & 0x7fffffff) >>> 0).toString(16);
    while (h1.length < 8) h1 = '0' + h1;
    while (h2.length < 8) h2 = '0' + h2;
    return h1 + h2;
}

function verifyNTLM(password, hash) {
    const hashToVerify =CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(password)).toString().toUpperCase();
    return hashToVerify === hash.toString().toUpperCase();
}

function verifyMD5(password, hash) {
    const hashToVerify = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}

function verifySHA1(password, hash) {
    const hashToVerify = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}

function verifySHA256(password, hash) {
    const hashToVerify = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}


function verifySHA512(password, hash) {
    const hashToVerify = CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}


function verifyBcrypt(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function verify_mysql323(password,hash) {
    let calculatedHash = mysql323Hash(password);
    return calculatedHash.toLowerCase() === hash.toLowerCase();


}

// Factory for the "raw" salted fast modes, e.g. md5($pass.$salt).
//   hasher  - a CryptoJS hash fn (CryptoJS.MD5 / SHA1 / SHA256 / SHA512)
//   order   - 'ps' => hash(pass . salt), 'sp' => hash(salt . pass)
//   utf16le - encode the password as UTF-16LE (hashcat modes 30/40/130/140/…)
// Hash line is hashcat's "<hex-digest>:<salt>" format; salt is taken verbatim.
function makeSaltedVerifier(hasher, order, utf16le) {
    return function (password, hash) {
        password = String(password);
        var line = String(hash);
        var idx = line.indexOf(':');
        if (idx < 0 || idx === line.length - 1) return false; // require a non-empty salt
        var digest = line.slice(0, idx).toLowerCase();
        var salt = line.slice(idx + 1);
        var passWA = utf16le
            ? CryptoJS.enc.Utf16LE.parse(password)
            : CryptoJS.enc.Latin1.parse(password);
        var saltWA = CryptoJS.enc.Latin1.parse(salt);
        var message = order === 'ps'
            ? passWA.clone().concat(saltWA)
            : saltWA.clone().concat(passWA);
        return hasher(message).toString(CryptoJS.enc.Hex) === digest;
    };
}

// Factory for the "raw" unsalted fast digests, e.g. md4($pass), sha224($pass).
//   hasher - a CryptoJS hash fn (CryptoJS.MD4 / SHA224 / SHA384 / RIPEMD160)
// Hash line is the plain lowercase hex digest; password is hashed as-is.
function makeRawHexVerifier(hasher) {
    return function (password, hash) {
        return hasher(String(password)).toString(CryptoJS.enc.Hex) === String(hash).toLowerCase();
    };
}

// Half MD5 (hashcat mode 5100): first 16 hex chars (8 bytes) of md5($pass).
function verifyHalfMD5(password, hash) {
    return CryptoJS.MD5(String(password)).toString(CryptoJS.enc.Hex).substring(0, 16) === String(hash).toLowerCase();
}

// Nested hex-digest combinators. md5hex/sha1hex return the lowercase hex string
// (which is then re-hashed as ASCII), matching hashcat's md5(md5($pass)) family.
function _md5hex(x) { return CryptoJS.MD5(x).toString(); }
function _sha1hex(x) { return CryptoJS.SHA1(x).toString(); }

// Byte-accurate string digests (hash the Latin1 bytes of a JS string → hex).
function _md5s(s) { return CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha1s(s) { return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(s)).toString(); }

// Byte-accurate string digests (hash the Latin1 bytes of a string -> hex).
function _sha224s(s) { return CryptoJS.SHA224(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha256s(s) { return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha512s(s) { return CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(s)).toString(); }

// Raw (binary) digests returned as a Latin1 byte-string, for "_bin" combinators
// where the inner hash is re-hashed as raw bytes rather than as its hex string.
function _md5raw(s) { return CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1); }
function _sha1raw(s) { return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1); }
function _sha256raw(s) { return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1); }
function _sha512raw(s) { return CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1); }

// Raw digest of the UTF-16LE-encoded password (modes 70/170/1470/1770/10870).
function makeUtf16leRawVerifier(hasher) {
    return function (password, hash) {
        return hasher(CryptoJS.enc.Utf16LE.parse(String(password))).toString() === String(hash).toLowerCase();
    };
}

module.exports = { verifyNTLM: verifyNTLM, verifyMD5: verifyMD5, verifySHA1: verifySHA1, verifySHA256: verifySHA256, verifySHA512: verifySHA512, verifyBcrypt: verifyBcrypt, verify_mysql323: verify_mysql323, mysql323Hash: mysql323Hash, makeSaltedVerifier: makeSaltedVerifier, makeRawHexVerifier: makeRawHexVerifier, makeUtf16leRawVerifier: makeUtf16leRawVerifier, verifyHalfMD5: verifyHalfMD5, _md5hex: _md5hex, _sha1hex: _sha1hex, _md5s: _md5s, _sha1s: _sha1s, _sha224s: _sha224s, _sha256s: _sha256s, _sha512s: _sha512s, _md5raw: _md5raw, _sha1raw: _sha1raw, _sha256raw: _sha256raw, _sha512raw: _sha512raw };
