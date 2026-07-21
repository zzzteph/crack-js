// Bitcoin private-key -> address verifiers (28501-28506 WIF, 30901-30906 raw).
// The "password" is the private key; the "hash" is the target address.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _hexToBytes = u._hexToBytes, _u8ToWA = u._u8ToWA;
var _secpPubKey = require('./secp256k1')._secpPubKey;
var b58 = require('./base58'), _base58check = b58._base58check, _base58checkDecode = b58._base58checkDecode, _bech32Segwit = b58._bech32Segwit;

function _hash160(bytes) { return _waToBytes(CryptoJS.RIPEMD160(CryptoJS.SHA256(_u8ToWA(bytes)))); }
function _btcP2pkh(pub) { return _base58check([0x00].concat(_hash160(pub))); }
function _btcP2wpkh(pub) { return _bech32Segwit('bc', 0, _hash160(pub)); }
function _btcP2shP2wpkh(pub) { return _base58check([0x05].concat(_hash160([0x00, 0x14].concat(_hash160(pub))))); }
function _btcPrivWif(word) { var d = _base58checkDecode(word); return d.length >= 33 ? d.slice(1, 33) : null; }
function _btcPrivHex(word) { return /^[0-9a-fA-F]{64}$/.test(word) ? _hexToBytes(word) : null; }
function makeBtcVerifier(keyFn, compressed, addrFn) {
    return function (password, hash) {
        var priv, pub;
        try { priv = keyFn(String(password)); } catch (e) { return false; }
        if (!priv) return false;
        try { pub = _secpPubKey(priv, compressed); } catch (e) { return false; }
        try { return addrFn(pub) === String(hash); } catch (e) { return false; }
    };
}

module.exports = {
    makeBtcVerifier: makeBtcVerifier, _btcP2pkh: _btcP2pkh, _btcP2wpkh: _btcP2wpkh, _btcP2shP2wpkh: _btcP2shP2wpkh,
    _btcPrivWif: _btcPrivWif, _btcPrivHex: _btcPrivHex
};
