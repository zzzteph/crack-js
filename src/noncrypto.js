// Non-cryptographic hashes: Java String.hashCode, MurmurHash2 (32-bit),
// MurmurHash3 x86_32, MurmurHash64A. Operate on byte arrays.
function _bytes(s) { var b = []; for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xff); return b; }

// Java String.hashCode() over UTF-16 code units -> unsigned 32-bit.
function javaHashCode(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (Math.imul(h, 31) + str.charCodeAt(i)) | 0;
    return h >>> 0;
}

// hashcat's "MurmurHash" (mode 25700): custom variant, M=0x7fd652ad, add
// 0xdeadbeef, tail word from remaining bytes (LE, zero-padded).
function murmur2(bytes, seed) {
    var M = 0x7fd652ad, R = 16, len = bytes.length, blocks = Math.floor(len / 4), off = 0, i, j;
    var hash = (seed + 0xdeadbeef) >>> 0;
    for (i = 0; i < blocks; i++) {
        var w = (bytes[off] | (bytes[off + 1] << 8) | (bytes[off + 2] << 16) | (bytes[off + 3] << 24)) >>> 0;
        var tmp = Math.imul((hash + w) >>> 0, M) >>> 0;
        hash = (tmp ^ (tmp >>> R)) >>> 0;
        off += 4;
    }
    var wt = 0, rem = len & 3;
    for (j = 0; j < rem; j++) wt = (wt | ((bytes[off + j] & 0xff) << (8 * j))) >>> 0;
    var tmp2 = Math.imul((hash + wt) >>> 0, M) >>> 0;
    if (rem) hash = (tmp2 ^ (tmp2 >>> R)) >>> 0;
    hash = Math.imul(hash, M) >>> 0; hash = (hash ^ (hash >>> 10)) >>> 0;
    hash = Math.imul(hash, M) >>> 0; hash = (hash ^ (hash >>> 17)) >>> 0;
    return hash >>> 0;
}

// MurmurHash3 x86_32.
function murmur3(bytes, seed) {
    var c1 = 0xcc9e2d51, c2 = 0x1b873593, len = bytes.length, h = seed >>> 0, nb = len >> 2, i = 0, b;
    for (b = 0; b < nb; b++) {
        var k = (bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24)) >>> 0;
        k = Math.imul(k, c1) >>> 0; k = ((k << 15) | (k >>> 17)) >>> 0; k = Math.imul(k, c2) >>> 0;
        h = (h ^ k) >>> 0; h = ((h << 13) | (h >>> 19)) >>> 0; h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
        i += 4;
    }
    var k1 = 0, tail = len & 3;
    if (tail >= 3) k1 = (k1 ^ (bytes[i + 2] << 16)) >>> 0;
    if (tail >= 2) k1 = (k1 ^ (bytes[i + 1] << 8)) >>> 0;
    if (tail >= 1) { k1 = (k1 ^ bytes[i]) >>> 0; k1 = Math.imul(k1, c1) >>> 0; k1 = ((k1 << 15) | (k1 >>> 17)) >>> 0; k1 = Math.imul(k1, c2) >>> 0; h = (h ^ k1) >>> 0; }
    h = (h ^ len) >>> 0; h = (h ^ (h >>> 16)) >>> 0; h = Math.imul(h, 0x85ebca6b) >>> 0; h = (h ^ (h >>> 13)) >>> 0; h = Math.imul(h, 0xc2b2ae35) >>> 0; h = (h ^ (h >>> 16)) >>> 0;
    return h >>> 0;
}

// MurmurHash64A (64-bit) via BigInt. seed is a BigInt.
var _M64 = 0xFFFFFFFFFFFFFFFFn, _MC = 0xc6a4a7935bd1e995n, _MR = 47n;
function murmur64a(bytes, seed) {
    var len = bytes.length, h = (seed ^ (BigInt(len) * _MC)) & _M64, nb = len >> 3, i = 0, b, j;
    for (b = 0; b < nb; b++) {
        var k = 0n; for (j = 0; j < 8; j++) k |= BigInt(bytes[i + j] & 0xff) << BigInt(8 * j);
        k = (k * _MC) & _M64; k ^= k >> _MR; k = (k * _MC) & _M64;
        h ^= k; h = (h * _MC) & _M64;
        i += 8;
    }
    var tail = len & 7;
    if (tail) { for (j = tail - 1; j >= 0; j--) h ^= BigInt(bytes[i + j] & 0xff) << BigInt(8 * j); h = (h * _MC) & _M64; }
    h ^= h >> _MR; h = (h * _MC) & _M64; h ^= h >> _MR;
    return h & _M64;
}
function _hex64(v) { return v.toString(16).padStart(16, '0'); }

// SipHash-2-4. key = 16 bytes, msg = bytes. Returns 64-bit BigInt.
function _le64(b, o) { var v = 0n; for (var i = 0; i < 8; i++) v |= BigInt(b[o + i] & 0xff) << BigInt(8 * i); return v; }
function _rotl(x, r) { return ((x << r) | (x >> (64n - r))) & _M64; }
function siphash24(msg, key) {
    var k0 = _le64(key, 0), k1 = _le64(key, 8);
    var v0 = 0x736f6d6570736575n ^ k0, v1 = 0x646f72616e646f6dn ^ k1, v2 = 0x6c7967656e657261n ^ k0, v3 = 0x7465646279746573n ^ k1;
    function round() {
        v0 = (v0 + v1) & _M64; v1 = _rotl(v1, 13n); v1 ^= v0; v0 = _rotl(v0, 32n);
        v2 = (v2 + v3) & _M64; v3 = _rotl(v3, 16n); v3 ^= v2;
        v0 = (v0 + v3) & _M64; v3 = _rotl(v3, 21n); v3 ^= v0;
        v2 = (v2 + v1) & _M64; v1 = _rotl(v1, 17n); v1 ^= v2; v2 = _rotl(v2, 32n);
    }
    var len = msg.length, end = len - (len % 8), i, m;
    for (i = 0; i < end; i += 8) { m = _le64(msg, i); v3 ^= m; round(); round(); v0 ^= m; }
    var b = BigInt(len & 0xff) << 56n;
    for (i = end; i < len; i++) b |= BigInt(msg[i] & 0xff) << BigInt(8 * (i - end));
    v3 ^= b; round(); round(); v0 ^= b;
    v2 ^= 0xffn; round(); round(); round(); round();
    return (v0 ^ v1 ^ v2 ^ v3) & _M64;
}

// CRC-32C (Castagnoli, reflected) with a custom init and 0xffffffff xorout.
var _CRC32C_T = (function () { var t = new Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0x82f63b78 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } return t; })();
function crc32c(bytes, init) {
    var crc = (init ^ 0xffffffff) >>> 0;
    for (var i = 0; i < bytes.length; i++) crc = ((crc >>> 8) ^ _CRC32C_T[(crc ^ bytes[i]) & 0xff]) >>> 0;
    return (crc ^ 0xffffffff) >>> 0;
}

// CRC-64 (Jones, reflected poly 0xad93d23594c935a9). init = 64-bit BigInt.
var _CRC64_T = (function () { var poly = 0x95ac9329ac4bc9b5n, t = new Array(256); for (var n = 0; n < 256; n++) { var c = BigInt(n); for (var k = 0; k < 8; k++) c = (c & 1n) ? (poly ^ (c >> 1n)) : (c >> 1n); t[n] = c & _M64; } return t; })();
function crc64jones(bytes, init) {
    var h = init & _M64;
    for (var i = 0; i < bytes.length; i++) h = _CRC64_T[Number(h & 0xffn) ^ (bytes[i] & 0xff)] ^ (h >> 8n);
    return h & _M64;
}

// RC4 with an initial keystream drop, then XOR over data.
function rc4drop(keyBytes, drop, dataBytes) {
    var s = new Array(256), i, j = 0, t;
    for (i = 0; i < 256; i++) s[i] = i;
    for (i = 0; i < 256; i++) { j = (j + s[i] + keyBytes[i % keyBytes.length]) & 0xff; t = s[i]; s[i] = s[j]; s[j] = t; }
    var x = 0, y = 0, out = [];
    for (i = 0; i < drop; i++) { x = (x + 1) & 0xff; y = (y + s[x]) & 0xff; t = s[x]; s[x] = s[y]; s[y] = t; }
    for (i = 0; i < dataBytes.length; i++) { x = (x + 1) & 0xff; y = (y + s[x]) & 0xff; t = s[x]; s[x] = s[y]; s[y] = t; out.push(dataBytes[i] ^ s[(s[x] + s[y]) & 0xff]); }
    return out;
}

// Skip32 (32-bit Skipjack variant). key = 10 bytes, buf = 4 bytes.
var _SKIP32_F = [
    0xa3, 0xd7, 0x09, 0x83, 0xf8, 0x48, 0xf6, 0xf4, 0xb3, 0x21, 0x15, 0x78, 0x99, 0xb1, 0xaf, 0xf9,
    0xe7, 0x2d, 0x4d, 0x8a, 0xce, 0x4c, 0xca, 0x2e, 0x52, 0x95, 0xd9, 0x1e, 0x4e, 0x38, 0x44, 0x28,
    0x0a, 0xdf, 0x02, 0xa0, 0x17, 0xf1, 0x60, 0x68, 0x12, 0xb7, 0x7a, 0xc3, 0xe9, 0xfa, 0x3d, 0x53,
    0x96, 0x84, 0x6b, 0xba, 0xf2, 0x63, 0x9a, 0x19, 0x7c, 0xae, 0xe5, 0xf5, 0xf7, 0x16, 0x6a, 0xa2,
    0x39, 0xb6, 0x7b, 0x0f, 0xc1, 0x93, 0x81, 0x1b, 0xee, 0xb4, 0x1a, 0xea, 0xd0, 0x91, 0x2f, 0xb8,
    0x55, 0xb9, 0xda, 0x85, 0x3f, 0x41, 0xbf, 0xe0, 0x5a, 0x58, 0x80, 0x5f, 0x66, 0x0b, 0xd8, 0x90,
    0x35, 0xd5, 0xc0, 0xa7, 0x33, 0x06, 0x65, 0x69, 0x45, 0x00, 0x94, 0x56, 0x6d, 0x98, 0x9b, 0x76,
    0x97, 0xfc, 0xb2, 0xc2, 0xb0, 0xfe, 0xdb, 0x20, 0xe1, 0xeb, 0xd6, 0xe4, 0xdd, 0x47, 0x4a, 0x1d,
    0x42, 0xed, 0x9e, 0x6e, 0x49, 0x3c, 0xcd, 0x43, 0x27, 0xd2, 0x07, 0xd4, 0xde, 0xc7, 0x67, 0x18,
    0x89, 0xcb, 0x30, 0x1f, 0x8d, 0xc6, 0x8f, 0xaa, 0xc8, 0x74, 0xdc, 0xc9, 0x5d, 0x5c, 0x31, 0xa4,
    0x70, 0x88, 0x61, 0x2c, 0x9f, 0x0d, 0x2b, 0x87, 0x50, 0x82, 0x54, 0x64, 0x26, 0x7d, 0x03, 0x40,
    0x34, 0x4b, 0x1c, 0x73, 0xd1, 0xc4, 0xfd, 0x3b, 0xcc, 0xfb, 0x7f, 0xab, 0xe6, 0x3e, 0x5b, 0xa5,
    0xad, 0x04, 0x23, 0x9c, 0x14, 0x51, 0x22, 0xf0, 0x29, 0x79, 0x71, 0x7e, 0xff, 0x8c, 0x0e, 0xe2,
    0x0c, 0xef, 0xbc, 0x72, 0x75, 0x6f, 0x37, 0xa1, 0xec, 0xd3, 0x8e, 0x62, 0x8b, 0x86, 0x10, 0xe8,
    0x08, 0x77, 0x11, 0xbe, 0x92, 0x4f, 0x24, 0xc5, 0x32, 0x36, 0x9d, 0xcf, 0xf3, 0xa6, 0xbb, 0xac,
    0x5e, 0x6c, 0xa9, 0x13, 0x57, 0x25, 0xb5, 0xe3, 0xbd, 0xa8, 0x3a, 0x01, 0x05, 0x59, 0x2a, 0x46];
function _skip32g(key, k, w) {
    var g1 = (w >> 8) & 0xff, g2 = w & 0xff;
    var g3 = _SKIP32_F[g2 ^ key[(4 * k) % 10]] ^ g1;
    var g4 = _SKIP32_F[g3 ^ key[(4 * k + 1) % 10]] ^ g2;
    var g5 = _SKIP32_F[g4 ^ key[(4 * k + 2) % 10]] ^ g3;
    var g6 = _SKIP32_F[g5 ^ key[(4 * k + 3) % 10]] ^ g4;
    return ((g5 << 8) | g6) & 0xffff;
}
function skip32(key, buf, encrypt) {
    var k = encrypt ? 0 : 23, kstep = encrypt ? 1 : -1, i;
    var wl = ((buf[0] << 8) | buf[1]) & 0xffff, wr = ((buf[2] << 8) | buf[3]) & 0xffff;
    for (i = 0; i < 12; i++) {
        wr = (wr ^ _skip32g(key, k, wl) ^ k) & 0xffff; k += kstep;
        wl = (wl ^ _skip32g(key, k, wr) ^ k) & 0xffff; k += kstep;
    }
    return [(wr >> 8) & 0xff, wr & 0xff, (wl >> 8) & 0xff, wl & 0xff];
}

// ChaCha20 keystream (DJB variant: 64-bit counter + 64-bit nonce). Returns nbytes.
function _cc_rotl(x, n) { return ((x << n) | (x >>> (32 - n))) >>> 0; }
function _cc_block(state) {
    var x = state.slice(), i;
    function QR(a, b, c, d) {
        x[a] = (x[a] + x[b]) >>> 0; x[d] = _cc_rotl(x[d] ^ x[a], 16);
        x[c] = (x[c] + x[d]) >>> 0; x[b] = _cc_rotl(x[b] ^ x[c], 12);
        x[a] = (x[a] + x[b]) >>> 0; x[d] = _cc_rotl(x[d] ^ x[a], 8);
        x[c] = (x[c] + x[d]) >>> 0; x[b] = _cc_rotl(x[b] ^ x[c], 7);
    }
    for (i = 0; i < 10; i++) {
        QR(0, 4, 8, 12); QR(1, 5, 9, 13); QR(2, 6, 10, 14); QR(3, 7, 11, 15);
        QR(0, 5, 10, 15); QR(1, 6, 11, 12); QR(2, 7, 8, 13); QR(3, 4, 9, 14);
    }
    var out = []; for (i = 0; i < 16; i++) { var v = (x[i] + state[i]) >>> 0; out.push(v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff); }
    return out;
}
function _le32(b, o) { return (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0; }
function chacha20ks(key, iv, counter, nbytes) {
    var st = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574], i;
    for (i = 0; i < 8; i++) st.push(_le32(key, i * 4));
    st.push(_le32(counter, 0), _le32(counter, 4), _le32(iv, 0), _le32(iv, 4));
    var out = [];
    while (out.length < nbytes) { var blk = _cc_block(st); for (var j = 0; j < 64; j++) out.push(blk[j]); st[12] = (st[12] + 1) >>> 0; if (st[12] === 0) st[13] = (st[13] + 1) >>> 0; }
    return out;
}

// DNS wire format of a name: each label -> [len][bytes], terminated by 0.
function dnsWire(name) {
    var labels = String(name).split('.').filter(function (l) { return l.length > 0; }), b = [];
    for (var i = 0; i < labels.length; i++) { b.push(labels[i].length & 0xff); for (var j = 0; j < labels[i].length; j++) b.push(labels[i].charCodeAt(j) & 0xff); }
    b.push(0); return b;
}
// base32hex (RFC 4648 extended-hex alphabet), no padding.
function base32hex(bytes) {
    var a = '0123456789abcdefghijklmnopqrstuv', bits = 0, val = 0, out = '';
    for (var i = 0; i < bytes.length; i++) {
        val = (val << 8) | (bytes[i] & 0xff); bits += 8;
        while (bits >= 5) { bits -= 5; out += a[(val >>> bits) & 0x1f]; }
        val &= (bits > 0 ? ((1 << bits) - 1) : 0);
    }
    if (bits > 0) out += a[(val << (5 - bits)) & 0x1f];
    return out;
}

module.exports = { _bytes: _bytes, javaHashCode: javaHashCode, murmur2: murmur2, murmur3: murmur3, murmur64a: murmur64a, _hex64: _hex64, siphash24: siphash24, crc32c: crc32c, crc64jones: crc64jones, rc4drop: rc4drop, skip32: skip32, dnsWire: dnsWire, base32hex: base32hex, chacha20ks: chacha20ks };
