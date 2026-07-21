// WPA/WPA2 family: PMKID (16800/16801, 22000/22001 WPA*01) and EAPOL-MIC
// (2500/2501 hccapx, 22000/22001 WPA*02). PMK is either derived via
// PBKDF2-SHA1(pass, essid, 4096, 32) or supplied directly (PMK modes).
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _hexToBytes = u._hexToBytes, _bytesToHex = u._bytesToHex, _bytesToWA = u._bytesToWA, _waToBytes = u._waToBytes;

function _hmac(hasher, keyBytes, msgBytes) {
    return _waToBytes(hasher(_bytesToWA(msgBytes), _bytesToWA(keyBytes)));
}
function _pmkFromPassword(password, essidBytes) {
    return _waToBytes(CryptoJS.PBKDF2(String(password), _bytesToWA(essidBytes), { keySize: 8, iterations: 4096, hasher: CryptoJS.algo.SHA1 }));
}
function _pmkFromHex(pmkHex) {
    return /^[0-9a-fA-F]{64}$/.test(String(pmkHex)) ? _hexToBytes(String(pmkHex)) : null;
}

// PMKID = HMAC-SHA1(PMK, "PMK Name" || mac_ap || mac_sta)[0:16].
function _pmkidOk(pmkBytes, macApHex, macStaHex, pmkidHex) {
    var msg = u._utf8Bytes('PMK Name').concat(_hexToBytes(macApHex)).concat(_hexToBytes(macStaHex));
    return _bytesToHex(_hmac(CryptoJS.HmacSHA1, pmkBytes, msg).slice(0, 16)) === String(pmkidHex).toLowerCase();
}

// PRF-512 (IEEE 802.11i): PTK = first 64 bytes of concatenated HMAC-SHA1 blocks.
function _prf512(pmkBytes, dataBytes) {
    var label = u._utf8Bytes('Pairwise key expansion'), out = [];
    for (var i = 0; i < 4; i++)
        out = out.concat(_hmac(CryptoJS.HmacSHA1, pmkBytes, label.concat([0]).concat(dataBytes).concat([i])));
    return out.slice(0, 64);
}
function _cmpBytes(a, b) { for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1; } return 0; }

function _aesCmac(keyBytes, msgBytes) {
    var key = _bytesToWA(keyBytes);
    function enc(block16) { return _waToBytes(CryptoJS.AES.encrypt(_bytesToWA(block16), key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext); }
    function shl1(x) { var o = new Array(16), carry = 0; for (var i = 15; i >= 0; i--) { o[i] = ((x[i] << 1) | carry) & 0xff; carry = (x[i] >> 7) & 1; } return { v: o, carry: carry }; }
    var L = enc(new Array(16).fill(0));
    var s1 = shl1(L), K1 = s1.v; if (s1.carry) K1[15] ^= 0x87;
    var s2 = shl1(K1), K2 = s2.v; if (s2.carry) K2[15] ^= 0x87;
    var n = Math.ceil(msgBytes.length / 16) || 1, i, last;
    if (msgBytes.length > 0 && msgBytes.length % 16 === 0) {
        last = msgBytes.slice((n - 1) * 16); for (i = 0; i < 16; i++) last[i] ^= K1[i];
    } else {
        last = msgBytes.slice((n - 1) * 16); last.push(0x80); while (last.length < 16) last.push(0);
        for (i = 0; i < 16; i++) last[i] ^= K2[i];
    }
    var x = new Array(16).fill(0);
    for (var b = 0; b < n - 1; b++) { for (i = 0; i < 16; i++) x[i] ^= msgBytes[b * 16 + i]; x = enc(x); }
    for (i = 0; i < 16; i++) x[i] ^= last[i];
    return enc(x);
}

// EAPOL MIC check given all fields as byte arrays; keyver 1=MD5,2=SHA1,3=CMAC.
function _eapolMicOk(pmkBytes, macAp, macSta, anonce, snonce, eapol, keyver, wantMicHex) {
    var data = (_cmpBytes(macAp, macSta) < 0 ? macAp.concat(macSta) : macSta.concat(macAp));
    data = data.concat(_cmpBytes(anonce, snonce) < 0 ? anonce.concat(snonce) : snonce.concat(anonce));
    var kck = _prf512(pmkBytes, data).slice(0, 16), mic;
    if (keyver === 1) mic = _hmac(CryptoJS.HmacMD5, kck, eapol).slice(0, 16);
    else if (keyver === 2) mic = _hmac(CryptoJS.HmacSHA1, kck, eapol).slice(0, 16);
    else mic = _aesCmac(kck, eapol).slice(0, 16);
    return _bytesToHex(mic) === String(wantMicHex).toLowerCase();
}

// hccapx (2500/2501): parse the binary struct and verify the EAPOL MIC.
function _verifyHccapx(getPmk, hash) {
    var h = String(hash);
    if (!/^[0-9a-fA-F]+$/.test(h) || h.length < 786) return false;
    var b = _hexToBytes(h);
    if (b[0] !== 0x48 || b[1] !== 0x43 || b[2] !== 0x50 || b[3] !== 0x58) return false; // "HCPX"
    var essidLen = b[9], essid = b.slice(10, 10 + essidLen);
    var keyver = b[42], keymic = b.slice(43, 59);
    var macAp = b.slice(59, 65), nonceAp = b.slice(65, 97);
    var macSta = b.slice(97, 103), nonceSta = b.slice(103, 135);
    var eapolLen = b[135] | (b[136] << 8), eapol = b.slice(137, 137 + eapolLen);
    var pmk = getPmk(essid); if (!pmk) return false;
    return _eapolMicOk(pmk, macAp, macSta, nonceAp, nonceSta, eapol, keyver, _bytesToHex(keymic));
}

// WPA*01*<pmkid>*<macap>*<macsta>*<essid>*... and WPA*02*<mic>*...*<anonce>*<eapol>*<mp>
function _verifyWpaCombined(getPmk, hash) {
    var p = String(hash).split('*');
    if (p[0] !== 'WPA') return false;
    if (p[1] === '01') {
        var pmk1 = getPmk(_hexToBytes(p[5] || '')); if (!pmk1) return false;
        return _pmkidOk(pmk1, p[3], p[4], p[2]);
    }
    if (p[1] === '02') {
        var essid = _hexToBytes(p[5] || ''), anonce = _hexToBytes(p[6] || ''), eapol = _hexToBytes(p[7] || '');
        var mp = parseInt(p[8], 16) || 0, keyver = (mp & 0x07) || 2;
        // SNONCE lives in the station's EAPOL frame at the WPA Key Nonce offset (0x51).
        var snonce = eapol.slice(0x51, 0x51 + 32);
        var pmk2 = getPmk(essid); if (!pmk2) return false;
        return _eapolMicOk(pmk2, _hexToBytes(p[3]), _hexToBytes(p[4]), anonce, snonce, eapol, keyver, p[2]);
    }
    return false;
}

// Public verifiers (password-based unless the name says PMK).
function verifyWpa(password, hash) { return _verifyWpaCombined(function (e) { return _pmkFromPassword(password, e); }, hash); }              // 22000
function verifyWpaPmk(password, hash) { return _verifyWpaCombined(function () { return _pmkFromHex(password); }, hash); }                     // 22001
function verify16800(password, hash) {
    var p = String(hash).split(':'); if (p.length < 4) return false;
    return _pmkidOk(_pmkFromPassword(password, _hexToBytes(p[3])), p[1], p[2], p[0]);
}
function verify16801(password, hash) {
    var p = String(hash).split(':'); if (p.length < 3) return false;
    var pmk = _pmkFromHex(password); return pmk ? _pmkidOk(pmk, p[1], p[2], p[0]) : false;
}
function verify2500(password, hash) { return _verifyHccapx(function (e) { return _pmkFromPassword(password, e); }, hash); }
function verify2501(password, hash) { return _verifyHccapx(function () { return _pmkFromHex(password); }, hash); }

// Forward generator helper: PMKID = HMAC-SHA1(PMK, "PMK Name"||ap||sta)[0:16].
function genPmkid(pmkBytes, macApHex, macStaHex) {
    var msg = u._utf8Bytes('PMK Name').concat(_hexToBytes(macApHex)).concat(_hexToBytes(macStaHex));
    return _bytesToHex(_hmac(CryptoJS.HmacSHA1, pmkBytes, msg).slice(0, 16));
}

module.exports = {
    verifyWpa: verifyWpa, verifyWpaPmk: verifyWpaPmk, verify16800: verify16800, verify16801: verify16801,
    verify2500: verify2500, verify2501: verify2501, genPmkid: genPmkid, pmkFromPassword: _pmkFromPassword
};
