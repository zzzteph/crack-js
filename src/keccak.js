// Keccak / SHA-3. crypto-js's SHA3 is original Keccak (pad 0x01); NIST SHA3
// (pad 0x06) is done with the self-contained Keccak-f[1600] sponge below.
var u = require('./util');
var CryptoJS = u.CryptoJS;

// Keccak (hashcat 17700-18000): crypto-js SHA3 == original Keccak.
function makeKeccakVerifier(bits) {
    return function (password, hash) {
        return CryptoJS.SHA3(CryptoJS.enc.Latin1.parse(String(password)), { outputLength: bits }).toString() === String(hash).toLowerCase();
    };
}

var _KECCAK_RC = ['1', '8082', '800000000000808a', '8000000080008000', '808b', '80000001',
    '8000000080008081', '8000000000008009', '8a', '88', '80008009', '8000000a', '8000808b',
    '800000000000008b', '8000000000008089', '8000000000008003', '8000000000008002', '8000000000000080',
    '800a', '800000008000000a', '8000000080008081', '8000000000008080', '80000001', '8000000080008008'].map(function (h) { return BigInt('0x' + h); });
var _KECCAK_R = [0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14];
var _MASK64 = u._MASK64;
function _keccakF(s) {
    function rotl(x, n) { var b = BigInt(n); return ((x << b) | (x >> (64n - b))) & _MASK64; }
    for (var round = 0; round < 24; round++) {
        var C = [], x, y;
        for (x = 0; x < 5; x++) C[x] = s[x] ^ s[x + 5] ^ s[x + 10] ^ s[x + 15] ^ s[x + 20];
        var D = [];
        for (x = 0; x < 5; x++) D[x] = C[(x + 4) % 5] ^ rotl(C[(x + 1) % 5], 1);
        for (x = 0; x < 5; x++) for (y = 0; y < 25; y += 5) s[x + y] ^= D[x];
        var B = new Array(25);
        for (x = 0; x < 5; x++) for (y = 0; y < 5; y++) B[y + 5 * ((2 * x + 3 * y) % 5)] = rotl(s[x + 5 * y], _KECCAK_R[x + 5 * y]);
        for (y = 0; y < 25; y += 5) for (x = 0; x < 5; x++) s[x + y] = B[x + y] ^ ((~B[(x + 1) % 5 + y]) & B[(x + 2) % 5 + y]) & _MASK64;
        s[0] ^= _KECCAK_RC[round];
    }
}
function _keccak(msgBytes, rateBytes, outBytes, padByte) {
    var s = new Array(25).fill(0n);
    var rem = msgBytes.length % rateBytes;
    var pad = new Array(rateBytes - rem).fill(0);
    pad[0] = padByte;
    pad[pad.length - 1] |= 0x80;
    var data = msgBytes.concat(pad), off, i, j;
    for (off = 0; off < data.length; off += rateBytes) {
        for (i = 0; i < rateBytes; i += 8) {
            var lane = 0n;
            for (j = 7; j >= 0; j--) lane = (lane << 8n) | BigInt(data[off + i + j] & 0xff);
            s[i / 8] ^= lane;
        }
        _keccakF(s);
    }
    var out = [];
    while (out.length < outBytes) {
        for (i = 0; i < rateBytes && out.length < outBytes; i += 8)
            for (j = 0; j < 8 && out.length < outBytes; j++) out.push(Number((s[i / 8] >> BigInt(8 * j)) & 0xffn));
        if (out.length < outBytes) _keccakF(s);
    }
    return out;
}
// NIST SHA3 (hashcat 17300-17600).
function makeSha3Verifier(bits) {
    return function (password, hash) {
        return u._bytesToHex(_keccak(u._utf8Bytes(password), 200 - bits / 4, bits / 8, 0x06)) === String(hash).toLowerCase();
    };
}

module.exports = { makeKeccakVerifier: makeKeccakVerifier, makeSha3Verifier: makeSha3Verifier, _keccak: _keccak };
