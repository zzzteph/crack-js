// bcrypt(<digest>($pass)) family (25600/25800/30600/28400) and passlib
// bcrypt(HMAC-SHA256($pass)) (30601).
var CryptoJS = require('crypto-js');
var bcrypt = require('./bcryptjs-own');

// ----- bcrypt(<digest>($pass)) family (25600/25800/30600/28400) ------------
// hashcat pre-hashes the password to a hex string, then runs standard bcrypt
// over that hex string. bcryptjs handles $2a$/$2b$ and the 72-byte truncation.
function makeBcryptPrehashVerifier(hasher) {
    return function (password, hash) {
        return bcrypt.compareSync(hasher(String(password)).toString(CryptoJS.enc.Hex), String(hash));
    };
}

// ----- bcrypt(HMAC-SHA256($pass)) (hashcat mode 30601, passlib bcrypt_sha256)
// "$bcrypt-sha256$v=2,t=2b,r=<cost>$<en_b64 salt>$<en_b64 hash>". The bcrypt
// password is standard-base64( HMAC-SHA256(key=en_b64(salt), msg=pass) ).
function verifyBcryptHmacSha256(password, hash) {
    var m = /^\$bcrypt-sha256\$v=2,t=2b,r=(\d{2})\$([./A-Za-z0-9]{22})\$([./A-Za-z0-9]{31})$/.exec(String(hash));
    if (!m) return false;
    var cost = m[1], encodedSalt = m[2], hashPart = m[3];
    var mac = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(String(password)), CryptoJS.enc.Latin1.parse(encodedSalt));
    var b64pw = mac.toString(CryptoJS.enc.Base64);
    return bcrypt.compareSync(b64pw, '$2b$' + cost + '$' + encodedSalt + hashPart);
}

module.exports = { makeBcryptPrehashVerifier: makeBcryptPrehashVerifier, verifyBcryptHmacSha256: verifyBcryptHmacSha256 };
