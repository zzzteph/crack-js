// SAP CODVN B (BCODE, mode 7700) and CODVN F/G (PASSCODE, mode 7800).
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToWA = u._bytesToWA;

// ----- CODVN F/G (7800): sha1 with a password-derived slice of a magic array --
var SAP_MAGIC =
    "\x91\xac\x51\x14\x9f\x67\x54\x43\x24\xe7\x3b\xe0\x28\x74\x7b\xc2" +
    "\x86\x33\x13\xeb\x5a\x4f\xcb\x5c\x08\x0a\x73\x37\x0e\x5d\x1c\x2f" +
    "\x33\x8f\xe6\xe5\xf8\x9b\xae\xdd\x16\xf2\x4b\x8d\x2c\xe1\xd4\xdc" +
    "\xb0\xcb\xdf\x9d\xd4\x70\x6d\x17\xf9\x4d\x42\x3f\x9b\x1b\x11\x94" +
    "\x9f\x5b\xc1\x9b\x06\x05\x9d\x03\x9d\x5e\x13\x8a\x1e\x9a\x6a\xe8" +
    "\xd9\x7c\x14\x17\x58\xc7\x2a\xf6\xa1\x99\x63\x0a\xd7\xfd\x70\xc3" +
    "\xf6\x5e\x74\x13\x03\xc9\x0b\x04\x26\x98\xf7\x26\x8a\x92\x93\x25" +
    "\xb0\xa2\x0d\x23\xed\x63\x79\x6d\x13\x32\xfa\x3c\x35\x02\x9a\xa3" +
    "\xb3\xdd\x8e\x0a\x24\xbf\x51\xc3\x7c\xcd\x55\x9f\x37\xaf\x94\x4c" +
    "\x29\x08\x52\x82\xb2\x3b\x4e\x37\x9f\x17\x07\x91\x11\x3b\xfd\xcd";
function verifySapG(password, hash) {
    var m = /^([^$]+)\$([0-9A-Fa-f]{40})$/.exec(String(hash));
    if (!m) return false;
    var salt = m[1].toUpperCase(), want = m[2].toUpperCase(), word = String(password);
    var d = _waToBytes(CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(word + salt)));
    var lenMA = 0x20, offMA = 0, i;
    for (i = 0; i < 10; i++) lenMA += d[i] % 6;
    for (i = 10; i < 20; i++) offMA += d[i] % 8;
    var magic = SAP_MAGIC.substr(offMA, lenMA);
    return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(word + magic + salt)).toString().toUpperCase() === want;
}

// ----- CODVN B (7700): md5 + SAP "walldorf" mixing ---------------------------
var SAPB_TRANS = (function () {
    var t = [], i;
    for (i = 0; i < 256; i++) t[i] = 0xff;
    var mid = [0x3f, 0x40, 0x41, 0x50, 0x43, 0x44, 0x45, 0x4b, 0x47, 0x48, 0x4d, 0x4e, 0x54, 0x51, 0x53, 0x46,
        0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x56, 0x55, 0x5c, 0x49, 0x5d, 0x4a,
        0x42, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
        0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x58, 0x5b, 0x59, 0xff, 0x52,
        0x4c, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
        0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x57, 0x5e, 0x5a, 0x4f, 0xff];
    for (i = 0; i < mid.length; i++) t[32 + i] = mid[i];
    return t;
})();
var SAPB_BCODE = [0x14, 0x77, 0xf3, 0xd4, 0xbb, 0x71, 0x23, 0xd0, 0x03, 0xff, 0x47, 0x93, 0x55, 0xaa, 0x66, 0x91,
    0xf2, 0x88, 0x6b, 0x99, 0xbf, 0xcb, 0x32, 0x1a, 0x19, 0xd9, 0xa7, 0x82, 0x22, 0x49, 0xa2, 0x51,
    0xe2, 0xb7, 0x33, 0x71, 0x8b, 0x9f, 0x5d, 0x01, 0x44, 0x70, 0xae, 0x11, 0xef, 0x28, 0xf0, 0x0d];
function sapbTranscode(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) out.push(SAPB_TRANS[str.charCodeAt(i) & 0xff]);
    return out;
}
function sapbWaldorf(abcd, w, s) {
    var wlen = w.length, slen = s.length;
    var sum20 = (abcd[0] & 3) + (abcd[1] & 3) + (abcd[2] & 3) + (abcd[3] & 3) + (abcd[5] & 3);
    sum20 |= 0x20;
    var out = [], k;
    for (k = 0; k < sum20; k++) out[k] = 0;
    var i1 = 0, i2 = 0, i3 = 0;
    for (; i2 < sum20; i2 += 2) {
        if (i1 < wlen) {
            if (abcd[15 - i1] & 1) { out[i2] = SAPB_BCODE[48 - 1 - i1]; i2++; }
            out[i2] = w[i1]; i1++; i2++;
        }
        if (i3 < slen) { out[i2] = s[i3]; i2++; i3++; }
        out[i2] = SAPB_BCODE[i2 - i1 - i3];
    }
    var res = [];
    for (k = 0; k < sum20; k++) res[k] = out[k] || 0;
    return res;
}
function verifySapB(password, hash) {
    var m = /^([^$]+)\$([0-9A-Fa-f]{16})$/.exec(String(hash));
    if (!m) return false;
    var salt = m[1].toUpperCase(), want = m[2].toUpperCase(), word = String(password).toUpperCase();
    var wt = sapbTranscode(word), st = sapbTranscode(salt);
    var d1 = _waToBytes(CryptoJS.MD5(_bytesToWA(wt.concat(st))));
    var d2 = _waToBytes(CryptoJS.MD5(_bytesToWA(sapbWaldorf(d1, wt, st))));
    var a = (((d2[0] << 24) | (d2[1] << 16) | (d2[2] << 8) | d2[3]) ^ ((d2[8] << 24) | (d2[9] << 16) | (d2[10] << 8) | d2[11])) >>> 0;
    var b = (((d2[4] << 24) | (d2[5] << 16) | (d2[6] << 8) | d2[7]) ^ ((d2[12] << 24) | (d2[13] << 16) | (d2[14] << 8) | d2[15])) >>> 0;
    var out = (('0000000' + a.toString(16)).slice(-8) + ('0000000' + b.toString(16)).slice(-8)).toUpperCase();
    return out === want;
}

module.exports = { verifySapB: verifySapB, verifySapG: verifySapG };
