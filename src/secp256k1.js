// secp256k1 public-key derivation, hand-written affine EC over BigInt. Returns
// the (un)compressed public key bytes for a private key. Used by Bitcoin modes.
var _P = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
var _N = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
var _G = [BigInt('0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798'),
    BigInt('0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8')];
function _pmod(a) { var r = a % _P; return r >= 0n ? r : r + _P; }
function _modInv(a) {
    var lm = 1n, hm = 0n, low = _pmod(a), high = _P;
    while (low > 1n) { var r = high / low, nm = hm - lm * r, nw = high - low * r; hm = lm; lm = nm; high = low; low = nw; }
    return _pmod(lm);
}
function _ecAdd(P, Q) {
    if (P === null) return Q;
    if (Q === null) return P;
    var x1 = P[0], y1 = P[1], x2 = Q[0], y2 = Q[1], s;
    if (x1 === x2) {
        if (_pmod(y1 + y2) === 0n) return null;
        s = _pmod(3n * x1 * x1 % _P * _modInv(2n * y1));
    } else {
        s = _pmod((y2 - y1) * _modInv(x2 - x1));
    }
    var x3 = _pmod(s * s - x1 - x2);
    return [x3, _pmod(s * (x1 - x3) - y1)];
}
function _ecMul(k) {
    var R = null, Q = _G;
    while (k > 0n) { if (k & 1n) R = _ecAdd(R, Q); Q = _ecAdd(Q, Q); k >>= 1n; }
    return R;
}
function _bigTo32(n) { var o = new Array(32); for (var i = 31; i >= 0; i--) { o[i] = Number(n & 0xffn); n >>= 8n; } return o; }
function _secpPubKey(privBytes, compressed) {
    var k = 0n;
    for (var i = 0; i < privBytes.length; i++) k = (k << 8n) | BigInt(privBytes[i] & 0xff);
    if (k <= 0n || k >= _N) throw new Error('priv range');
    var Pt = _ecMul(k);
    if (Pt === null) throw new Error('inf');
    var xb = _bigTo32(Pt[0]);
    return compressed ? [(Pt[1] & 1n) === 0n ? 0x02 : 0x03].concat(xb) : [0x04].concat(xb).concat(_bigTo32(Pt[1]));
}

// ECDH-style: scalar (from all of scalarBytes, big-endian) times the point
// decompressed from a 33-byte compressed pubkey; returns the compressed result.
function _powmod(b, e) { var r = 1n; b = _pmod(b); while (e > 0n) { if (e & 1n) r = r * b % _P; b = b * b % _P; e >>= 1n; } return r; }
function _ecMulPoint(k, P) { var R = null, Q = P; while (k > 0n) { if (k & 1n) R = _ecAdd(R, Q); Q = _ecAdd(Q, Q); k >>= 1n; } return R; }
function _decompress(prefix, x) {
    var y = _powmod((x * x % _P * x + 7n), (_P + 1n) / 4n); // p % 4 == 3 => sqrt = a^((p+1)/4)
    if ((y & 1n) !== BigInt(prefix & 1)) y = _P - y;
    return [x, y];
}
function _secpSharedCompressed(scalarBytes, ephemeralBytes) {
    var m = 0n, i;
    for (i = 0; i < scalarBytes.length; i++) m = (m << 8n) | BigInt(scalarBytes[i] & 0xff);
    var x = 0n;
    for (i = 1; i < ephemeralBytes.length; i++) x = (x << 8n) | BigInt(ephemeralBytes[i] & 0xff);
    var R = _ecMulPoint(m, _decompress(ephemeralBytes[0], x));
    if (R === null) return null;
    return [(R[1] & 1n) === 0n ? 0x02 : 0x03].concat(_bigTo32(R[0]));
}

module.exports = { _secpPubKey: _secpPubKey, _secpSharedCompressed: _secpSharedCompressed };
