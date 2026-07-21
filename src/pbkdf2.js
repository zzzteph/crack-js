// PBKDF2-HMAC-* family (11900/12000/10900/12100) via crypto-js PBKDF2.
var CryptoJS = require('crypto-js');

// Factory for the PBKDF2-HMAC-* family (hashcat 11900/12000/10900/12100).
//   hasher - a CryptoJS hasher algo (CryptoJS.algo.MD5 / SHA1 / SHA256 / SHA512)
//   prefix - the algo label at the start of the hash line
// Hash line = "<prefix>:<iterations>:<base64(salt)>:<base64(derived_key)>".
// The derived-key length is taken from the decoded key, matching hashcat's
// per-mode out_len (md5=32, sha1=16, sha256=24, sha512=16 by default).
function makePbkdf2Verifier(hasher, prefix) {
    return function (password, hash) {
        var parts = String(hash).split(':');
        if (parts.length !== 4 || parts[0] !== prefix) return false;
        var iter = parseInt(parts[1], 10);
        if (!iter || iter < 1) return false;
        var saltWA, wantWA;
        try {
            saltWA = CryptoJS.enc.Base64.parse(parts[2]);
            wantWA = CryptoJS.enc.Base64.parse(parts[3]);
        } catch (e) { return false; }
        var dkLen = wantWA.sigBytes;
        if (dkLen < 1) return false;
        var dk = CryptoJS.PBKDF2(String(password), saltWA, { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher: hasher });
        return dk.toString(CryptoJS.enc.Hex).substring(0, dkLen * 2) === wantWA.toString(CryptoJS.enc.Hex);
    };
}

module.exports = { makePbkdf2Verifier: makePbkdf2Verifier };
