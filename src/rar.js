// RAR archives. RAR5 (13000): PBKDF2-SHA256 then fold the 32-byte key into an
// 8-byte password-verify value.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToHex = u._bytesToHex, _bytesToWA = u._bytesToWA, _hexToBytes = u._hexToBytes;

// ----- RAR3-hp (12500): 0x40000-round SHA1 of (utf16le(pass).salt.counter), with
// an IV byte lifted every 0x4000 rounds; AES-128-CBC encrypt a fixed plaintext. --
var RAR3_FIXED = _hexToBytes('c43d7b00400700000000000000000000');
function rar3Key(password, saltBytes) {
    var unit = _waToBytes(CryptoJS.enc.Utf16LE.parse(String(password))).concat(saltBytes);
    var ctx = CryptoJS.algo.SHA1.create(), iv = [], seg = [], i, b;
    for (i = 0; i < 0x40000; i++) {
        for (b = 0; b < unit.length; b++) seg.push(unit[b]);
        seg.push(i & 0xff, (i >> 8) & 0xff, (i >> 16) & 0xff);
        if ((i & 0x3fff) === 0) {
            ctx.update(_bytesToWA(seg)); seg = [];
            iv.push(_waToBytes(ctx.clone().finalize())[19]);
        }
    }
    if (seg.length) ctx.update(_bytesToWA(seg));
    var k = _waToBytes(ctx.finalize()), key = [], w;
    for (w = 0; w < 4; w++) key.push(k[w * 4 + 3], k[w * 4 + 2], k[w * 4 + 1], k[w * 4]); // byte-swap each word
    return { key: key, iv: iv };
}
function verifyRar3hp(password, hash) {
    var m = /^\$RAR3\$\*0\*([0-9a-fA-F]{16})\*([0-9a-fA-F]{32})$/.exec(String(hash));
    if (!m) return false;
    var kd = rar3Key(password, _hexToBytes(m[1]));
    var enc = CryptoJS.AES.encrypt(_bytesToWA(RAR3_FIXED), _bytesToWA(kd.key),
        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(kd.iv) }).ciphertext;
    return enc.toString(CryptoJS.enc.Hex).substr(0, 32) === m[2].toLowerCase();
}

// ----- RAR3-p uncompressed (23700): AES-CBC decrypt, then CRC32 the plaintext --
var _CRC_T = (function () {
    var t = [], c, n, k;
    for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
    return t;
})();
function crc32(bytes) {
    var crc = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ _CRC_T[(crc ^ bytes[i]) & 0xff];
    return (crc ^ 0xffffffff) >>> 0;
}
function verifyRar3p(password, hash) {
    var m = /^\$RAR3\$\*1\*([0-9a-fA-F]{16})\*([0-9a-fA-F]{8})\*\d+\*(\d+)\*1\*([0-9a-fA-F]+)\*30$/.exec(String(hash));
    if (!m) return false;
    var kd = rar3Key(password, _hexToBytes(m[1]));
    var dec = _waToBytes(CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: _bytesToWA(_hexToBytes(m[4])) }),
        _bytesToWA(kd.key), { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(kd.iv) }));
    var crc = crc32(dec.slice(0, parseInt(m[3], 10)));
    var swap = (((crc & 0xff) << 24) | ((crc & 0xff00) << 8) | ((crc >>> 8) & 0xff00) | ((crc >>> 24) & 0xff)) >>> 0;
    return ('0000000' + swap.toString(16)).slice(-8) === m[2].toLowerCase();
}

function verifyRar5(password, hash) {
    var m = /^\$rar5\$16\$([0-9a-fA-F]+)\$(\d+)\$[0-9a-fA-F]+\$8\$([0-9a-fA-F]{16})$/.exec(String(hash));
    if (!m) return false;
    var iter = (1 << parseInt(m[2], 10)) + 32;
    var dk = _waToBytes(CryptoJS.PBKDF2(String(password), CryptoJS.enc.Hex.parse(m[1]), { keySize: 8, iterations: iter, hasher: CryptoJS.algo.SHA256 }));
    var out = [];
    for (var i = 0; i < 8; i++) out[i] = dk[i] ^ dk[8 + i] ^ dk[16 + i] ^ dk[24 + i];
    return _bytesToHex(out) === m[3].toLowerCase();
}

module.exports = { verifyRar5: verifyRar5, verifyRar3hp: verifyRar3hp, verifyRar3p: verifyRar3p, crc32: crc32 };
