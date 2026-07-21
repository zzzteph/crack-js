// Kerberos 5 verifiers. etype 23 = RC4-HMAC-MD5 (7500/13100/18200); etype 17/18
// = AES128/256-CTS-HMAC-SHA1 (19600/19700/19800/19900/28800/28900/32100/32200).
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToWA = u._bytesToWA, _hexToBytes = u._hexToBytes,
    _bytesToHex = u._bytesToHex, aesEncBlockWA = u.aesEncBlockWA, aesDecBlockWA = u.aesDecBlockWA;

// ----- etype 23 (RC4-HMAC-MD5) ---------------------------------------------
function _hmacMd5Bytes(dataBytes, keyBytes) {
    return _waToBytes(CryptoJS.HmacMD5(_bytesToWA(dataBytes), _bytesToWA(keyBytes)));
}
function _rc4(keyBytes, dataBytes) {
    var s = [];
    for (var i = 0; i < 256; i++) s[i] = i;
    var j = 0;
    for (i = 0; i < 256; i++) { j = (j + s[i] + keyBytes[i % keyBytes.length]) & 0xff; var t = s[i]; s[i] = s[j]; s[j] = t; }
    var out = [], x = 0; j = 0;
    for (var k = 0; k < dataBytes.length; k++) {
        x = (x + 1) & 0xff; j = (j + s[x]) & 0xff; var t2 = s[x]; s[x] = s[j]; s[j] = t2;
        out.push(dataBytes[k] ^ s[(s[x] + s[j]) & 0xff]);
    }
    return out;
}
function _krb23Decrypt(password, msgType, checksumHex, edataHex) {
    var k = _waToBytes(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(password))));
    var k1 = _hmacMd5Bytes([msgType, 0, 0, 0], k);
    var k3 = _hmacMd5Bytes(_hexToBytes(checksumHex), k1);
    return _rc4(k3, _hexToBytes(edataHex));
}
// Forward generator: encrypt a known plaintext under the password's RC4 key,
// returning {edataHex, checksumHex}. Inverse of _krb23Decrypt.
function krb23Encrypt(password, msgType, plaintextBytes) {
    var k = _waToBytes(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(password))));
    var k1 = _hmacMd5Bytes([msgType, 0, 0, 0], k);
    var checksum = _hmacMd5Bytes(plaintextBytes, k1);
    var k3 = _hmacMd5Bytes(checksum, k1);
    return { edataHex: _bytesToHex(_rc4(k3, plaintextBytes)), checksumHex: _bytesToHex(checksum) };
}
function verifyKrb5pa23(password, hash) {
    var m = /^\$krb5pa\$23\$[^$]*\$[^$]*\$[^$]*\$([0-9a-fA-F]{104,})$/.exec(String(hash));
    if (!m) return false;
    var field = m[1];
    var edataHex = field.substr(0, field.length - 32), checksumHex = field.substr(field.length - 32);
    if (edataHex.length % 2 !== 0) return false;
    var clear = _krb23Decrypt(password, 1, checksumHex, edataHex);
    for (var i = 14; i < 28; i++) { if (clear[i] < 0x30 || clear[i] > 0x39) return false; }
    return true;
}
function verifyKrb5tgs23(password, hash) {
    var m = /^\$krb5tgs\$23\$\*.+\*\$([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash)) ||
            /^\$krb5tgs\$23\$([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash));
    if (!m) return false;
    var td = _bytesToHex(_krb23Decrypt(password, 2, m[1], m[2]));
    return (((td.substr(16, 4) === '6381' && td.substr(22, 2) === '30') || td.substr(16, 4) === '6382') &&
            (td.substr(32, 6) === '030500' || td.substr(32, 8) === '050307a0'));
}
function verifyKrb5asrep23(password, hash) {
    var m = /^\$krb5asrep\$23\$.+[:$]([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash));
    if (!m) return false;
    var td = _bytesToHex(_krb23Decrypt(password, 8, m[1], m[2]));
    return ((td.substr(16, 4) === '7981' && td.substr(22, 2) === '30') ||
            (td.substr(16, 2) === '79' && td.substr(20, 2) === '30') ||
            (td.substr(16, 4) === '7982' && td.substr(24, 2) === '30'));
}

// ----- etype 17/18 (AES-CTS-HMAC-SHA1, RFC 3962) ---------------------------
var KRB_NFOLD_KERBEROS = '6b65726265726f737b9b5b2b93132b93';
function krbDK(keyWA, nfoldWA, keysize) {
    var out = null, prev = nfoldWA;
    for (var i = 0; i < keysize / 16; i++) { prev = aesEncBlockWA(keyWA, prev); out = out ? out.concat(prev.clone()) : prev.clone(); }
    return out;
}
function krbBaseKey(password, realm, user, keysize) {
    var seedWA = CryptoJS.PBKDF2(String(password), CryptoJS.enc.Utf8.parse(String(realm).toUpperCase() + String(user)),
        { keySize: keysize / 4, iterations: 4096, hasher: CryptoJS.algo.SHA1 });
    return krbDK(seedWA, CryptoJS.enc.Hex.parse(KRB_NFOLD_KERBEROS), keysize);
}
function krbKe(password, realm, user, keysize, nfold2Hex) {
    return krbDK(krbBaseKey(password, realm, user, keysize), CryptoJS.enc.Hex.parse(nfold2Hex), keysize);
}
function krbBlock1Hex(keWA, edata2Hex) {
    var ct = CryptoJS.enc.Hex.parse(edata2Hex.substr(0, 64));
    var c0 = CryptoJS.lib.WordArray.create(ct.words.slice(0, 4), 16);
    var c1 = CryptoJS.lib.WordArray.create(ct.words.slice(4, 8), 16);
    var d = aesDecBlockWA(keWA, c1), p1 = [];
    for (var i = 0; i < 4; i++) p1[i] = d.words[i] ^ c0.words[i];
    return CryptoJS.lib.WordArray.create(p1, 16).toString(CryptoJS.enc.Hex);
}
var KRB_NFOLD2_TGS = 'b5b0582c14b6500aad56ab55aa80556a';
var KRB_NFOLD2_ASREP = 'be349a4d24be500eaf57abd5ea80757a';
var KRB_NFOLD1_PA = '5b582c160a5aa80556ab55aad5402ab5';
var KRB_NFOLD2_PA = 'ae2c160b04ad5006ab55aad56a80355a';
function makeKrb5dbVerifier(keysize) {
    var et = keysize === 16 ? '17' : '18';
    var re = new RegExp('^\\$krb5db\\$' + et + '\\$([^$]*)\\$([^$]*)\\$([0-9a-fA-F]{' + (keysize * 2) + '})$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m) return false;
        return krbBaseKey(password, m[2], m[1], keysize).toString(CryptoJS.enc.Hex) === m[3].toLowerCase();
    };
}
function krbTgsCheck(p1) {
    return ((p1.substr(0, 4) === '6381' && p1.substr(6, 2) === '30') || p1.substr(0, 4) === '6382') &&
           (p1.substr(16, 6) === '030500' || p1.substr(16, 8) === '050307a0');
}
function krbAsrepCheck(p1) {
    return (p1.substr(0, 4) === '7981' || p1.substr(0, 4) === '7a81' ||
            p1.substr(0, 4) === '7982' || p1.substr(0, 4) === '7a82') && p1.substr(6, 2) === '30';
}
function makeKrb5ticketVerifier(keysize, sig, nfold2, checkFn) {
    var et = keysize === 16 ? '17' : '18';
    var re = new RegExp('^\\$' + sig + '\\$' + et + '\\$([^$]*)\\$([^$]*)\\$[0-9a-fA-F]{24}\\$([0-9a-fA-F]{64,})$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m) return false;
        return checkFn(krbBlock1Hex(krbKe(password, m[2], m[1], keysize, nfold2), m[3]));
    };
}
function aesCbcDecryptBytes(keyWA, dataBytes) {
    var dec = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: _bytesToWA(dataBytes) }), keyWA,
        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') });
    return _waToBytes(dec);
}
function krbCtsDecrypt(keWA, enc) {
    var L = enc.length;
    if (L === 16) return _waToBytes(aesDecBlockWA(keWA, _bytesToWA(enc)));
    var lastLen = L % 16;
    if (lastLen === 0) {
        var cbc0 = enc.slice(0, L - 32).concat(enc.slice(L - 16, L)).concat(enc.slice(L - 32, L - 16));
        return aesCbcDecryptBytes(keWA, cbc0);
    }
    var nMinus1 = enc.slice(L - lastLen - 16, L - lastLen);
    var nMinus1Dec = _waToBytes(aesDecBlockWA(keWA, _bytesToWA(nMinus1)));
    var padded = enc.concat(nMinus1Dec.slice(lastLen, 16)), PL = padded.length;
    var cbc = padded.slice(0, PL - 32).concat(padded.slice(PL - 16, PL)).concat(padded.slice(PL - 32, PL - 16));
    return aesCbcDecryptBytes(keWA, cbc).slice(0, L);
}
function makeKrb5paAesVerifier(keysize, nfold1, nfold2) {
    var et = keysize === 16 ? '17' : '18';
    var re = new RegExp('^\\$krb5pa\\$' + et + '\\$([^$]*)\\$([^$]*)\\$([0-9a-fA-F]+)$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m || m[3].length <= 24 || (m[3].length - 24) % 2 !== 0) return false;
        var encHex = m[3].substr(0, m[3].length - 24), checksumHex = m[3].substr(m[3].length - 24).toLowerCase();
        var base = krbBaseKey(password, m[2], m[1], keysize);
        var clear = krbCtsDecrypt(krbDK(base, CryptoJS.enc.Hex.parse(nfold2), keysize), _hexToBytes(encHex));
        var mac = CryptoJS.HmacSHA1(_bytesToWA(clear), krbDK(base, CryptoJS.enc.Hex.parse(nfold1), keysize));
        return mac.toString(CryptoJS.enc.Hex).substr(0, 24) === checksumHex;
    };
}

module.exports = {
    verifyKrb5pa23: verifyKrb5pa23, verifyKrb5tgs23: verifyKrb5tgs23, verifyKrb5asrep23: verifyKrb5asrep23,
    _krb23Decrypt: _krb23Decrypt, krb23Encrypt: krb23Encrypt, krbBaseKey: krbBaseKey,
    makeKrb5dbVerifier: makeKrb5dbVerifier, makeKrb5ticketVerifier: makeKrb5ticketVerifier,
    makeKrb5paAesVerifier: makeKrb5paAesVerifier, krbTgsCheck: krbTgsCheck, krbAsrepCheck: krbAsrepCheck,
    KRB_NFOLD2_TGS: KRB_NFOLD2_TGS, KRB_NFOLD2_ASREP: KRB_NFOLD2_ASREP, KRB_NFOLD1_PA: KRB_NFOLD1_PA, KRB_NFOLD2_PA: KRB_NFOLD2_PA
};
