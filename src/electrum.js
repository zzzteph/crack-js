// Electrum wallet. Salt-Type 1 (mode 16600): key = sha256(sha256(pass)),
// AES-256-CBC decrypt; a correct guess yields all-lowercase-hex plaintext.
// Salt-Type 4/5 (21700/21800): ECIES — key = sha512( compressed( m * Q ) ) where
// m = PBKDF2-SHA512("", pass, 1024, 64) and Q = the ephemeral pubkey point.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _hexToBytes = u._hexToBytes, _bytesToWA = u._bytesToWA, _waToBytes = u._waToBytes;
var _secpSharedCompressed = require('./secp256k1')._secpSharedCompressed;

function electrumKey(password, ephemeralBytes) {
    var priv = _waToBytes(CryptoJS.PBKDF2(String(password), CryptoJS.enc.Latin1.parse(''), { keySize: 16, iterations: 1024, hasher: CryptoJS.algo.SHA512 }));
    var comp;
    try { comp = _secpSharedCompressed(priv, ephemeralBytes); } catch (e) { return null; }
    if (!comp) return null;
    return _waToBytes(CryptoJS.SHA512(_bytesToWA(comp)));
}
function verifyElectrum21700(password, hash) {
    var m = /^\$electrum\$4\*([0-9a-fA-F]{66})\*([0-9a-fA-F]+)\*([0-9a-fA-F]{64})$/.exec(String(hash));
    if (!m) return false;
    var key = electrumKey(password, _hexToBytes(m[1]));
    if (!key) return false;
    return CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(m[2]), _bytesToWA(key.slice(32, 64))).toString() === m[3].toLowerCase();
}
function verifyElectrum21800(password, hash) {
    // ST5 authenticates by AES-128-CBC decrypting and checking the zlib/DEFLATE
    // header (0x78 0x9c, FLEVEL bits == 5) — same fast check hashcat's kernel uses.
    var m = /^\$electrum\$5\*([0-9a-fA-F]{66})\*([0-9a-fA-F]+)\*[0-9a-fA-F]{64}$/.exec(String(hash));
    if (!m) return false;
    var key = electrumKey(password, _hexToBytes(m[1]));
    if (!key) return false;
    var dec = _waToBytes(CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(m[2]) }),
        _bytesToWA(key.slice(16, 32)), { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(key.slice(0, 16)) }));
    return dec.length >= 3 && dec[0] === 0x78 && dec[1] === 0x9c && (dec[2] & 0x07) === 0x05;
}

function verifyElectrum16600(password, hash) {
    var m = /^\$electrum\$[123]\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})$/.exec(String(hash));
    if (!m) return false;
    var key = CryptoJS.SHA256(CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(String(password))));
    var dec = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(m[2]) }),
        key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: CryptoJS.enc.Hex.parse(m[1]) });
    var s = dec.toString(CryptoJS.enc.Latin1);
    return s.length === 16 && /^[0-9a-f]+$/.test(s);
}

module.exports = { verifyElectrum16600: verifyElectrum16600, verifyElectrum21700: verifyElectrum21700, verifyElectrum21800: verifyElectrum21800 };
