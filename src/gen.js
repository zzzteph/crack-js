// Hash GENERATORS: produce a hashcat-format hash from a password (+ optional
// salt/params, defaulted if absent). Inverse of the verify functions; used by the
// round-trip validation harness (generate -> crack with hashcat AND with crack-js).
// Keyed by hashcat mode number. Each generator: (password, params) -> hashString.
var CryptoJS = require('crypto-js');
require('./md4');
var _dig = require('./digests');
var _md5s = _dig._md5s, _sha1s = _dig._sha1s, _sha224s = _dig._sha224s, _sha256s = _dig._sha256s, _sha512s = _dig._sha512s;
var _md5raw = _dig._md5raw, _sha1raw = _dig._sha1raw, _sha256raw = _dig._sha256raw, _sha512raw = _dig._sha512raw;

function _md5(s) { return CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha1(s) { return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha224(s) { return CryptoJS.SHA224(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha256(s) { return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha384(s) { return CryptoJS.SHA384(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _sha512(s) { return CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _md4u(s) { return CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(s)).toString(); }
function _ripemd160(s) { return CryptoJS.RIPEMD160(CryptoJS.enc.Latin1.parse(s)).toString(); }
function _u16le(s) { return CryptoJS.enc.Utf16LE.parse(s); }
function _hmac(hasher, msg, key) { return hasher(CryptoJS.enc.Latin1.parse(msg), CryptoJS.enc.Latin1.parse(key)).toString(); }
function _p(params, k, d) { return (params && params[k] != null) ? String(params[k]) : d; }

var G = {};

// ---- raw digests ----
G[0] = (p) => _md5(p);
G[100] = (p) => _sha1(p);
G[1300] = (p) => _sha224(p);
G[1400] = (p) => _sha256(p);
G[1700] = (p) => _sha512(p);
G[10800] = (p) => _sha384(p);
G[900] = (p) => CryptoJS.MD4(CryptoJS.enc.Latin1.parse(p)).toString();
G[1000] = (p) => _md4u(p).toUpperCase();
G[6000] = (p) => _ripemd160(p);
G[70] = (p) => CryptoJS.MD5(_u16le(p)).toString();
G[170] = (p) => CryptoJS.SHA1(_u16le(p)).toString();
G[1470] = (p) => CryptoJS.SHA256(_u16le(p)).toString();
G[1770] = (p) => CryptoJS.SHA512(_u16le(p)).toString();
G[10870] = (p) => CryptoJS.SHA384(_u16le(p)).toString();
G[5100] = (p) => _md5(p).substring(0, 16);

// ---- salted "digest:salt" (ps = pass.salt, sp = salt.pass) ----
function saltedPS(hfn) { return (p, params) => { var s = _p(params, 'salt', ' ha$'); return hfn(p + s) + ':' + s; }; }
function saltedSP(hfn) { return (p, params) => { var s = _p(params, 'salt', ' ha$'); return hfn(s + p) + ':' + s; }; }
G[10] = saltedPS(_md5); G[20] = saltedSP(_md5);
G[110] = saltedPS(_sha1); G[120] = saltedSP(_sha1);
G[1410] = saltedPS(_sha256); G[1420] = saltedSP(_sha256);
G[1710] = saltedPS(_sha512); G[1720] = saltedSP(_sha512);
G[1310] = saltedPS(_sha224); G[1320] = saltedSP(_sha224);

// ---- HMAC (key=pass -> ...50/150/1450/1750 ; key=salt -> 60/160/1460/1760) ----
function hmacKeyPass(hasher) { return (p, params) => { var s = _p(params, 'salt', 'salty'); return _hmac(hasher, s, p) + ':' + s; }; }
function hmacKeySalt(hasher) { return (p, params) => { var s = _p(params, 'salt', 'salty'); return _hmac(hasher, p, s) + ':' + s; }; }
G[50] = hmacKeyPass(CryptoJS.HmacMD5); G[60] = hmacKeySalt(CryptoJS.HmacMD5);
G[150] = hmacKeyPass(CryptoJS.HmacSHA1); G[160] = hmacKeySalt(CryptoJS.HmacSHA1);
G[1450] = hmacKeyPass(CryptoJS.HmacSHA256); G[1460] = hmacKeySalt(CryptoJS.HmacSHA256);
G[1750] = hmacKeyPass(CryptoJS.HmacSHA512); G[1760] = hmacKeySalt(CryptoJS.HmacSHA512);

// ---- nested / combinator digests (unsalted) ----
G[2600] = (p) => _md5(_md5(p));                                   // md5(md5)
G[3500] = (p) => _md5(_md5(_md5(p)));                             // md5(md5(md5))
G[4400] = (p) => _md5(_sha1(p));
G[4500] = (p) => _sha1(_sha1(p));
G[4700] = (p) => _sha1(_md5(p));
G[18500] = (p) => _sha1(_md5(_md5(p)));
G[20800] = (p) => _sha256(_md5(p));
G[32800] = (p) => _md5(_sha1(_md5(p)));
G[34400] = (p) => _sha224(_sha224(p));
G[34500] = (p) => _sha224(_sha1(p));
G[20900] = (p) => _md5(_sha1(p) + _md5(p) + _sha1(p));
G[21400] = (p) => _sha256(_sha256raw(p));

// ---- combinators with salt(s) ----
G[2630] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_md5(p + s)) + ':' + s; };
G[3610] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_md5(_md5(p)) + s) + ':' + s; };
G[3910] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_md5(p) + _md5(s)) + ':' + s; };
G[4410] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_sha1(p) + s) + ':' + s; };
G[4420] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_sha1(p + s)) + ':' + s; };
G[4430] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_sha1(s + p)) + ':' + s; };
G[4510] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(_sha1(p) + s) + ':' + s; };
G[4710] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(_md5(p) + s) + ':' + s; };
G[4711] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 8); return _sha1(_md5(p) + s) + ':' + s; }; // Huawei: 8-char salt
G[4900] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(s + p + s) + ':' + s; };
G[5000] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(_sha1(s + p + s)) + ':' + s; };
G[21100] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(_md5(p + s)) + ':' + s; };
G[22300] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(s + p + s) + ':' + s; };
G[20710] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(_sha256(p) + s) + ':' + s; };
G[20720] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(s + _sha256(p)) + ':' + s; };
G[20730] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(_sha256(p + s)) + ':' + s; };
G[21200] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_sha1(s) + _md5(p)) + ':' + s; };
G[21300] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(s + _sha1(s + p)) + ':' + s; };
G[22800] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(s + p + _md5(p)) + ':' + s; };
G[24300] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha1(s + _sha1(p + s)) + ':' + s; };
G[30500] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(_md5(s) + _md5(_md5(p))) + ':' + s; };
G[33100] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _md5(s + _md5(p) + s) + ':' + s; };
G[32410] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha512(_sha512(p) + s) + ':' + s; };
G[32420] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha512(_sha512raw(p) + s) + ':' + s; };
G[21420] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(s + _sha256raw(p)) + ':' + s; };
G[33000] = (p, params) => { var a = _p(params, 'salt1', 'aa'), b = _p(params, 'salt2', 'bb'); return _md5(a + p + b) + ':' + a + ':' + b; };
G[19300] = (p, params) => { var a = _p(params, 'salt1', 'aa'), b = _p(params, 'salt2', 'bb'); return _sha1(a + p + b) + ':' + a + ':' + b; };
G[21310] = (p, params) => { var a = _p(params, 'salt1', 'aa'), b = _p(params, 'salt2', 'bb'); return _md5(a + _sha1(b + p)) + ':' + a + ':' + b; };
G[31700] = (p, params) => { var a = _p(params, 'salt1', 'aa'), b = _p(params, 'salt2', 'bb'); return _md5(_md5(_md5(p) + a) + b) + ':' + a + ':' + b; };
G[21900] = (p, params) => { var a = _p(params, 'salt1', 'aa'), b = _p(params, 'salt2', 'bb'); return _md5(_md5(_md5(p + a)) + b) + ':' + a + ':' + b; };
// AuthMe salt must be 16-20 chars (hashcat token constraint) -> derive 16 hex from the hint.
G[20711] = (p, params) => { var s = _md5(_p(params, 'salt', 'ab12')).substring(0, 16); return '$SHA$' + s + '$' + _sha256(_sha256(p) + s); };

// ---- simple app hashes ----
function _hexOf(s) { return CryptoJS.enc.Latin1.parse(s).toString(CryptoJS.enc.Hex); }
function _mssqlSalt(hint) { return _md5(hint).substring(0, 8); }
G[2612] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return '$PHPS$' + _hexOf(s) + '$' + _md5(_md5(p) + s); };
G[124] = (p, params) => { var s = _p(params, 'salt', 'fe76b'); return 'sha1$' + s + '$' + _sha1(s + p); };
G[131] = (p, params) => { var s = _mssqlSalt(_p(params, 'salt', 'x')); return '0x0100' + s + '0'.repeat(40) + CryptoJS.SHA1(_u16le(String(p).toUpperCase()).concat(CryptoJS.enc.Hex.parse(s))).toString(); };
G[132] = (p, params) => { var s = _mssqlSalt(_p(params, 'salt', 'x')); return '0x0100' + s + CryptoJS.SHA1(_u16le(String(p)).concat(CryptoJS.enc.Hex.parse(s))).toString(); };
G[1731] = (p, params) => { var s = _mssqlSalt(_p(params, 'salt', 'x')); return '0x0200' + s + CryptoJS.SHA512(_u16le(String(p)).concat(CryptoJS.enc.Hex.parse(s))).toString(); };
G[133] = (p) => CryptoJS.SHA1(_u16le(String(p))).toString(CryptoJS.enc.Base64);
G[4521] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')); return _sha1(s + _sha1(p)) + ':' + s; };       // Redmine: 32-char salt
G[4522] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 12); return _sha1(s + _sha1(p)) + ':' + s; }; // PunBB: 12-char salt
G[8100] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 8); return '1' + s + _sha1(s + p + '\0'); };
G[22200] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 8); return '2' + s + _sha512(s + p + '\0'); };
G[9900] = (p) => { var s = String(p); while (s.length < 100) s += '\0'; return _md5(s.substring(0, 100)); };
// PrestaShop cookie-key salt is exactly 56 chars (hashcat SALT_MIN=MAX=56).
G[11000] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) + _md5('p' + _p(params, 'salt', 'x')) + _md5('q')).substring(0, 56); return _md5(s + p) + ':' + s; };
G[3711] = (p, params) => { var s = _p(params, 'salt', '2152187716'); return '$B$' + s + '$' + _md5(s + '-' + _md5(p)); };
G[20712] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return _sha256(_sha256(p).toUpperCase() + s).toUpperCase() + ':' + CryptoJS.enc.Latin1.parse(s).toString(CryptoJS.enc.Base64); };
G[30000] = (p, params) => { var s = _p(params, 'salt', '84143'); return 'md5$' + s + '$' + _hmac(CryptoJS.HmacMD5, p, s); };
G[30120] = (p, params) => { var s = _p(params, 'salt', '70108387805'); return 'sha256$' + s + '$' + _hmac(CryptoJS.HmacSHA256, p, s); };

// ---- misc app hashes needing hex/cisco-b64 helpers ----
var _toCiscoB64 = require('./kdf')._toCiscoB64;
function _bytesOf(latin1) { var b = []; for (var i = 0; i < latin1.length; i++) b.push(latin1.charCodeAt(i) & 0xff); return b; }
function _hx(hex) { return CryptoJS.enc.Hex.parse(hex).toString(CryptoJS.enc.Latin1); }
G[5700] = (p) => _toCiscoB64(_bytesOf(_sha256raw(p)));
G[24800] = (p) => CryptoJS.HmacSHA1(_u16le(String(p)), _u16le(String(p))).toString(CryptoJS.enc.Base64);
G[8400] = (p, params) => { var s = _sha1(_p(params, 'salt', 'x')); return _sha1(s + _sha1(s + _sha1(p))) + ':' + s; }; // WBB3: 40-char salt
// OpenCart salt is exactly 9 chars.
G[13900] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 9); return _sha1(s + _sha1(s + _sha1(p))) + ':' + s; };
G[27200] = (p, params) => { var s = _sha1(_p(params, 'salt', 'x')); return _sha1('--' + s + '--' + p + '--') + ':' + s; }; // Rails: 40-hex salt
G[19500] = (p, params) => { var s = _p(params, 'salt', '12345'), k = _p(params, 'sitekey', '9876543210'); var d = _sha1(k + '--' + s + '--' + p + '--' + k); for (var i = 0; i < 9; i++) d = _sha1(d + '--' + s + '--' + p + '--' + k); return d + ':' + s + ':' + k; };
G[112] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 20); return _sha1(p + _hx(s)) + ':' + s; };
G[5720] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 64); var d = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(s).concat(CryptoJS.enc.Latin1.parse(String(p)))); for (var i = 0; i < 128; i++) d = CryptoJS.SHA256(d); return d.toString() + s; }; // Cisco ISE: 32-byte (64-hex) salt
G[4800] = (p, params) => { var chal = _md5(_p(params, 'salt', 'x')), id = _md5(_p(params, 'salt', 'y')).substring(0, 2); return _md5(_hx(id) + String(p) + _hx(chal)) + ':' + chal + ':' + id; };

// ---- FortiGate / Sybase / FileZilla / NetIQ SSPR ----
var _MAGIC_FG = CryptoJS.enc.Hex.parse('a388ba2e424cb04a537930c13107cc3fa1329029a9815b70').toString(CryptoJS.enc.Latin1);
G[7000] = (p, params) => { var salt = _hx(_md5(_p(params, 'salt', 'x')).substring(0, 24)); var dig = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(salt + String(p) + _MAGIC_FG)).toString(CryptoJS.enc.Latin1); return 'AK1' + CryptoJS.enc.Latin1.parse(salt + dig).toString(CryptoJS.enc.Base64); };
G[26300] = (p, params) => { var salt = _hx(_md5(_p(params, 'salt', 'x')).substring(0, 24)); var dig = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(salt + String(p) + _MAGIC_FG)).toString(CryptoJS.enc.Latin1); return 'SH2' + CryptoJS.enc.Latin1.parse(salt + dig).toString(CryptoJS.enc.Base64); };
G[8000] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 16); var pw = CryptoJS.enc.Utf16.parse(String(p)); var pad = CryptoJS.enc.Latin1.parse('\0'.repeat(510 - String(p).length * 2)); return '0xc007' + salt + CryptoJS.SHA256(pw.concat(pad).concat(CryptoJS.enc.Hex.parse(salt))).toString(); };
G[15000] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 64); return _sha512(String(p) + s) + ':' + s; };
function _ssprIter(hasher, seedStr, it) { var d = hasher(CryptoJS.enc.Latin1.parse(seedStr)); for (var i = 1; i < it; i++) d = hasher(d); return d.toString(); }
G[32000] = (p) => '$sspr$0$100000$NONE$' + _ssprIter(CryptoJS.MD5, String(p), 100000);
G[32010] = (p) => '$sspr$1$100000$NONE$' + _ssprIter(CryptoJS.SHA1, String(p), 100000);
function _ssprSalt(params) { return CryptoJS.enc.Hex.parse(_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x')).substring(0, 16)).toString(CryptoJS.enc.Base64); } // 24 bytes -> 32 b64 chars
G[32020] = (p, params) => { var bs = _ssprSalt(params); return '$sspr$2$100000$' + bs + '$' + _ssprIter(CryptoJS.SHA1, bs + String(p), 100000); };   // NetIQ: iter baked into signature
G[32030] = (p, params) => { var bs = _ssprSalt(params); return '$sspr$3$100000$' + bs + '$' + _ssprIter(CryptoJS.SHA256, bs + String(p), 100000); };

// ---- BLAKE2b + AIX smd5 ----
var _u = require('./util');
var _blake2b = require('./blake2b')._blake2b;
var _md5crypt = require('./crypt').md5crypt;
function _b2(msg, n) { return _u._bytesToHex(_blake2b(_u._utf8Bytes(msg), n)); }
G[610] = (p, params) => { var s = _p(params, 'salt', '1033'); return '$BLAKE2$' + _b2(String(p) + s, 64) + ':' + s; };
G[620] = (p, params) => { var s = _p(params, 'salt', '3301'); return '$BLAKE2$' + _b2(s + String(p), 64) + ':' + s; };
G[34800] = (p) => '$BLAKE2$' + _b2(String(p), 32);
G[34810] = (p, params) => { var s = _p(params, 'salt', '2353288289'); return '$BLAKE2$' + _b2(String(p) + s, 32) + ':' + s; };
G[34820] = (p, params) => { var s = _p(params, 'salt', '3601'); return '$BLAKE2$' + _b2(s + String(p), 32) + ':' + s; };
G[6300] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 8); return '{smd5}' + _md5crypt(String(p), s, ''); };

// ---- more SSPR (type 3 sha256 raw-salt, type 4 sha512) + Cisco PIX/ASA ----
G[32031] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); return '$sspr$3$1000$' + s + '$' + _ssprIter(CryptoJS.SHA256, s + String(p), 1000); };
G[32040] = (p, params) => { var bs = _ssprSalt(params); return '$sspr$4$100000$' + bs + '$' + _ssprIter(CryptoJS.SHA512, bs + String(p), 100000); };
G[32041] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); return '$sspr$4$1000$' + s + '$' + _ssprIter(CryptoJS.SHA512, s + String(p), 1000); };
function _pixB64g(m) { var a = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', o = ''; for (var i = 0; i < 4; i++) { var v = ((m.charCodeAt(i * 4) & 0xff) | ((m.charCodeAt(i * 4 + 1) & 0xff) << 8) | ((m.charCodeAt(i * 4 + 2) & 0xff) << 16) | ((m.charCodeAt(i * 4 + 3) & 0xff) << 24)) >>> 0; for (var j = 0; j < 4; j++) { o += a.charAt(v & 0x3f); v = Math.floor(v / 64); } } return o; }
function _md5pad(s) { var pad = Math.ceil(s.length / 16) * 16 || 16; while (s.length < pad) s += '\0'; return CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1); }
G[2400] = (p) => _pixB64g(_md5pad(String(p)));
G[2410] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 4); return _pixB64g(_md5pad(String(p) + s)) + ':' + s; };

// ---- non-cryptographic hashes ----
var _nc = require('./noncrypto');
function _h8(x) { return (x >>> 0).toString(16).padStart(8, '0'); }
G[18700] = (p) => _h8(_nc.javaHashCode(String(p)));
G[25700] = (p, params) => { var seed = parseInt(_md5(_p(params, 'salt', 'x')).substring(0, 8), 16) >>> 0; return _h8(_nc.murmur2(_nc._bytes(String(p)), seed)) + ':' + _h8(seed); };
G[27800] = (p, params) => { var seed = parseInt(_md5(_p(params, 'salt', 'x')).substring(0, 8), 16) >>> 0; return _h8(_nc.murmur3(_nc._bytes(String(p)), seed)) + ':' + _h8(seed); };
G[34200] = (p, params) => { var seed = BigInt('0x' + _md5(_p(params, 'salt', 'x')).substring(0, 16)); return _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), seed)) + ':' + seed.toString(16).padStart(16, '0'); };
G[34201] = (p) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n));
G[34211] = (p) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n)).substring(0, 8);

// ---- DES / AES-ECB / HMAC-RIPEMD160 / iterated-digest apps ----
var _des = require('./des');
function _sbG(s) { var b = []; for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xff); return b; }
function _bhG(b) { var s = ''; for (var i = 0; i < b.length; i++) { var c = (b[i] & 0xff).toString(16); s += c.length < 2 ? '0' + c : c; } return s; }
G[14000] = (p, params) => { if (String(p).length !== 8) return null; var salt = _md5(_p(params, 'salt', 'x')).substring(0, 16); return _bhG(_des.desEncryptBlock(_sbG(String(p)), _hx2(salt))) + ':' + salt; };
G[3000] = (p) => { if (String(p).length > 7 || String(p).length === 0) return null; return _bhG(_des.lmHashHalf(_sbG(String(p).toUpperCase()))); };
G[16000] = (p) => { var w = String(p); var salt = w.length < 2 ? 'aa' : (w + '..').substr(1, 2); salt = salt.replace(/[^.-z]/g, '.'); var from = ':;<=>?@[\\]^_`', to = 'ABCDEFGabcdef', o = ''; for (var i = 0; i < salt.length; i++) { var j = from.indexOf(salt[i]); o += j < 0 ? salt[i] : to[j]; } return _des.descryptCompute(w, o).slice(-10); };
function _hx2(hex) { var b = []; for (var i = 0; i < hex.length; i += 2) b.push(parseInt(hex.substr(i, 2), 16)); return b; }
function _aesEcbNokdf(p, klen, salt) { var k = String(p); while (k.length < klen) k += '\0'; return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(salt), CryptoJS.enc.Latin1.parse(k.substring(0, klen)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString(); }
G[26401] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) ).substring(0, 32); return _aesEcbNokdf(p, 16, s) + ':' + s; };
G[26402] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) ).substring(0, 32); return _aesEcbNokdf(p, 24, s) + ':' + s; };
G[26403] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) ).substring(0, 32); return _aesEcbNokdf(p, 32, s) + ':' + s; };
G[6050] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(s), CryptoJS.enc.Latin1.parse(String(p))).toString() + ':' + s; };
G[6060] = (p, params) => { var s = _p(params, 'salt', 'ab12'); return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(s)).toString() + ':' + s; };
G[19000] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); return '@m@' + _md5(s + String(p).repeat(1001)) + '@' + s; };
G[19100] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); return '@s@' + _sha256(s + String(p).repeat(1001)) + '@' + s; };
G[19200] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); return '@S@' + _sha512(s + String(p).repeat(1001)) + '@' + s; };
// ColdFusion salt is a fixed 64-char string.
G[12600] = (p, params) => { var s = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 64); return _sha256(s + _sha1(String(p)).toUpperCase()) + ':' + s; };
G[22301] = (p, params) => { var s = _md5(_p(params, 'salt', 'x')).substring(0, 32); var sb = _hx(s); return '$telegram$0*' + _sha256(sb + String(p) + sb) + '*' + s; };

// ---- CRAM / Shiro / Oracle-T / DANE ----
G[30420] = (p) => _sha256(String(p)).substring(0, 56);
G[11100] = (p, params) => { var user = _p(params, 'user', 'postgres'); var salt = _md5(_p(params, 'salt', 'x')).substring(0, 8); return '$postgres$' + user + '*' + salt + '*' + _md5(_md5(String(p) + user) + _hx(salt)); };
G[11200] = (p, params) => { var chal = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 40); var sp = _sha1raw(String(p)), x = _sha1raw(_hx(chal) + _sha1raw(sp)), out = ''; for (var i = 0; i < 20; i++) { var b = (sp.charCodeAt(i) ^ x.charCodeAt(i)) & 0xff, c = b.toString(16); out += c.length < 2 ? '0' + c : c; } return '$mysqlna$' + chal + '*' + out; };
G[10200] = (p, params) => { var chal = _p(params, 'salt', 'challenge12'), user = _p(params, 'user', 'user'); var hmac = CryptoJS.HmacMD5(CryptoJS.enc.Latin1.parse(chal), CryptoJS.enc.Latin1.parse(String(p))).toString(); return '$cram_md5$' + CryptoJS.enc.Latin1.parse(chal).toString(CryptoJS.enc.Base64) + '$' + CryptoJS.enc.Latin1.parse(user + ' ' + hmac).toString(CryptoJS.enc.Base64); };
G[12150] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 16); var d = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(salt).concat(CryptoJS.enc.Latin1.parse(String(p)))); for (var i = 1; i < 1024; i++) d = CryptoJS.SHA512(d); return '$shiro1$SHA-512$1024$' + CryptoJS.enc.Latin1.parse(salt).toString(CryptoJS.enc.Base64) + '$' + d.toString(CryptoJS.enc.Base64); };
G[12300] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 32); var saltbin = CryptoJS.enc.Hex.parse(salt); var key = CryptoJS.PBKDF2(String(p), saltbin.clone().concat(CryptoJS.enc.Latin1.parse('AUTH_PBKDF2_SPEEDY_KEY')), { keySize: 16, iterations: 4096, hasher: CryptoJS.algo.SHA512 }); return CryptoJS.SHA512(key.clone().concat(saltbin)).toString().toUpperCase() + salt.toUpperCase(); };
G[10100] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')); var r = _nc.siphash24(_nc._bytes(String(p)), _hx2(salt)); var hi = Number((r >> 32n) & 0xffffffffn) >>> 0, lo = Number(r & 0xffffffffn) >>> 0; var sw = (x) => (((x & 0xff) << 24) | ((x & 0xff00) << 8) | ((x >>> 8) & 0xff00) | ((x >>> 24) & 0xff)) >>> 0; return sw(lo).toString(16).padStart(8, '0') + sw(hi).toString(16).padStart(8, '0') + ':2:4:' + salt; };
G[27900] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 8); return _nc.crc32c(_nc._bytes(String(p)), parseInt(salt, 16) >>> 0).toString(16).padStart(8, '0') + ':' + salt; };
G[28000] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 16); return _nc._hex64(_nc.crc64jones(_nc._bytes(String(p)), BigInt('0x' + salt))) + ':' + salt; };

// ---- BLAKE2s / RIPEMD-320 ----
var _b2s = require('./blake2s'), _rmd320 = require('./ripemd320');
G[31000] = (p) => '$BLAKE2$' + _bhG(_b2s.blake2s(_sbG(String(p)), 32));
G[33300] = (p, params) => { var s = _p(params, 'salt', '1234'); return _bhG(_b2s.hmacBlake2s(_sbG(String(p)), _sbG(s))) + ':' + s; };
G[33600] = (p) => _bhG(_rmd320.ripemd320(_sbG(String(p))));
G[33650] = (p, params) => { var s = _p(params, 'salt', '1234'); return _bhG(_rmd320.hmacRipemd320(_sbG(String(p)), _sbG(s))) + ':' + s; };
G[33660] = (p, params) => { var s = _p(params, 'salt', '1234'); return _bhG(_rmd320.hmacRipemd320(_sbG(s), _sbG(String(p)))) + ':' + s; };

// ---- DCC / DCC2 / macOS / GRUB2 ----
G[1100] = (p, params) => { var s = _p(params, 'salt', 'domainuser'); var inner = CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))); return CryptoJS.MD4(inner.clone().concat(CryptoJS.enc.Utf16LE.parse(s.toLowerCase()))).toString() + ':' + s; };
G[2100] = (p, params) => { var user = _p(params, 'salt', 'admin'); var saltbin = CryptoJS.enc.Utf16LE.parse(user.toLowerCase()); var dcc = CryptoJS.MD4(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).clone().concat(saltbin)); return '$DCC2$1024#' + user + '#' + CryptoJS.PBKDF2(dcc, saltbin, { keySize: 4, iterations: 1024, hasher: CryptoJS.algo.SHA1 }).toString(); };
G[7100] = (p, params) => { var salt = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 64); return '$ml$1024$' + salt + '$' + CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(salt), { keySize: 16, iterations: 1024, hasher: CryptoJS.algo.SHA512 }).toString(); };
G[7200] = (p, params) => { var b = _p(params, 'salt', 'x'); var salt = (_md5(b) + _md5('a' + b) + _md5('b' + b) + _md5('c' + b)).substring(0, 128); return 'grub.pbkdf2.sha512.1024.' + salt + '.' + CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(salt), { keySize: 16, iterations: 1024, hasher: CryptoJS.algo.SHA512 }).toString(); };
G[7300] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x')); return salt + ':' + CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(salt), CryptoJS.enc.Latin1.parse(String(p))).toString(); };
G[7350] = (p, params) => { var b = _p(params, 'salt', 'x'); var salt = _md5(b) + _md5('a' + b) + _md5('b' + b) + _md5('c' + b); return CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(salt), CryptoJS.enc.Latin1.parse(String(p))).toString() + ':' + salt; }; // RAKP-MD5 salt must be 116-148 hex
G[5300] = (p, params) => { var b = _p(params, 'salt', 'x'); var f = []; for (var i = 0; i < 6; i++) f.push(_md5(i + b) + _md5('a' + i + b)); var f6 = (_md5('n1' + b) + _md5('n2' + b)).substring(0, 40), f7 = (_md5('n3' + b) + _md5('n4' + b)).substring(0, 40); var d1 = CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(f6 + f7), CryptoJS.enc.Latin1.parse(String(p))); var d2 = CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(f.join('')), d1).toString(); return f.join(':') + ':' + f6 + ':' + f7 + ':' + d2; };
G[5400] = (p, params) => { var b = _p(params, 'salt', 'x'); var f = []; for (var i = 0; i < 6; i++) f.push(_md5(i + b) + _md5('a' + i + b)); var f6 = (_md5('n1' + b) + _md5('n2' + b)).substring(0, 40), f7 = (_md5('n3' + b) + _md5('n4' + b)).substring(0, 40); var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(f6 + f7), CryptoJS.enc.Latin1.parse(String(p))); var d2 = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(f.join('')), d1).toString(); return f.join(':') + ':' + f6 + ':' + f7 + ':' + d2; };
G[14100] = (p, params) => { var w = String(p); if (w.length !== 24) return null; var s = _md5(_p(params, 'salt', 'x')).substring(0, 16); var ct = _des.desEncryptBlock(_sbG(w.slice(0, 8)), _hx2(s)); ct = _des.desDecryptBlock(_sbG(w.slice(8, 16)), ct); ct = _des.desEncryptBlock(_sbG(w.slice(16, 24)), ct); return _bhG(ct) + ':' + s; };
function _rc4gen(p, keybits) { return '$rc4$' + keybits + '$0$' + _bhG(_nc.rc4drop(_sbG(String(p)), 0, _hx2('48656c6c6f'))) + '$0$48656c6c6f'; }
G[33500] = (p) => String(p).length === 5 ? _rc4gen(p, 40) : null;
G[33501] = (p) => String(p).length === 9 ? _rc4gen(p, 72) : null;
G[33502] = (p) => String(p).length === 13 ? _rc4gen(p, 104) : null;
// Unique >=8-char username so the derived 8-char custom_salt never collides.
G[21500] = (p, params) => { var u = _md5(_p(params, 'salt', 'x')).substring(0, 10); var cs = u.substring(0, 8); var key = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Latin1.parse(cs), { keySize: 256, iterations: 1000, hasher: CryptoJS.algo.SHA1 }); return '$solarwinds$0$' + u + '$' + CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64); };
G[21501] = (p, params) => { var salt = CryptoJS.enc.Hex.parse(_md5(_p(params, 'salt', 'x'))); var key = CryptoJS.PBKDF2(String(p), salt, { keySize: 256, iterations: 1000, hasher: CryptoJS.algo.SHA1 }); return '$solarwinds$1$' + salt.toString(CryptoJS.enc.Base64) + '$' + CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64); };
G[22400] = (p, params) => { var b = _p(params, 'salt', 'x'); var salt = _md5(b), iv = _md5('iv' + b), ka = _md5('k1' + b) + _md5('k2' + b); var key = CryptoJS.enc.Hex.parse(salt).concat(CryptoJS.enc.Latin1.parse('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0')); var w = CryptoJS.enc.Utf16LE.parse(String(p)); for (var i = 0; i < 8192; i++) key = CryptoJS.SHA256(key.clone().concat(w)); return '$aescrypt$1*' + salt + '*' + iv + '*' + ka + '*' + CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(iv).concat(CryptoJS.enc.Hex.parse(ka)), key).toString(); };
G[23400] = (p, params) => { var email = CryptoJS.enc.Latin1.parse(_p(params, 'salt', 'noreply@hashcat.net')); var d1 = CryptoJS.PBKDF2(String(p), email, { keySize: 8, iterations: 1000, hasher: CryptoJS.algo.SHA256 }); var d2 = CryptoJS.PBKDF2(d1, CryptoJS.enc.Latin1.parse(String(p)), { keySize: 8, iterations: 2, hasher: CryptoJS.algo.SHA256 }); return '$bitwarden$2*1000*2*' + email.toString(CryptoJS.enc.Base64) + '*' + d2.toString(CryptoJS.enc.Base64); };
G[31300] = (p, params) => { var b = _p(params, 'salt', 'x'); var salt = (_md5(b) + _md5('a' + b) + _md5('c' + b)).substring(0, 96); return '$sntp-ms$' + CryptoJS.MD5(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).concat(CryptoJS.enc.Hex.parse(salt))).toString() + '$' + salt; };
G[13500] = (p, params) => { var b = _p(params, 'salt', 'x'); var salt = (_md5(b) + _md5('a' + b) + _md5('c' + b)).substring(0, 80); return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(salt).concat(CryptoJS.enc.Utf16LE.parse(String(p)))).toString() + ':' + salt; };
G[29100] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')) + '.' + _md5('a' + _p(params, 'salt', 'x')).substring(0, 6); var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse('cookie-session'), CryptoJS.enc.Latin1.parse(String(p))); var d2 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(salt), d1); return salt + '.' + d2.toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
G[28700] = (p, params) => { var longdate = '20220221T000000Z', region = 'us-east-1', service = 's3', canonical = (_md5(_p(params, 'salt', 'x')) + _md5('a' + _p(params, 'salt', 'x'))).substring(0, 64); var date = longdate.substring(0, 8), L = CryptoJS.enc.Latin1; var kDate = CryptoJS.HmacSHA256(L.parse(date), L.parse('AWS4' + String(p))); var kRegion = CryptoJS.HmacSHA256(L.parse(region), kDate); var kService = CryptoJS.HmacSHA256(L.parse(service), kRegion); var kSigning = CryptoJS.HmacSHA256(L.parse('aws4_request'), kService); var sts = 'AWS4-HMAC-SHA256\n' + longdate + '\n' + date + '/' + region + '/' + service + '/aws4_request\n' + canonical; return '$AWS-Sig-v4$0$' + longdate + '$' + region + '$' + service + '$' + canonical + '$' + CryptoJS.HmacSHA256(L.parse(sts), kSigning).toString(); };
G[5800] = (p, params) => { var salt = _md5(_p(params, 'salt', 'x')).substring(0, 16), L = CryptoJS.enc.Latin1; var d = CryptoJS.SHA1(L.parse('0' + String(p) + salt)); for (var k = 1; k < 1024; k++) d = CryptoJS.SHA1(L.parse(d.toString(L) + (k + String(p) + salt))); return d.toString() + ':' + salt; };
G[14900] = (p, params) => { if (String(p).length !== 10) return null; var salt = _md5(_p(params, 'salt', 'x')).substring(0, 8); return _bhG(_nc.skip32(_sbG(String(p)), _hx2(salt), true)) + ':' + salt; };
G[15400] = (p) => { var w = String(p); if (w.length !== 32) return null; var counter = '0400000000000003', iv = '0200000000000001', offset = 16; var PT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0a2b4c6d8e', seg = [], i; for (i = 0; i < 8; i++) seg.push(PT.charCodeAt(offset + i) & 0xff); var ks = _nc.chacha20ks(_sbG(w), _hx2(iv), _hx2(counter), offset + 8), ct = []; for (i = 0; i < 8; i++) ct.push(ks[offset + i] ^ seg[i]); return '$chacha20$*' + counter + '*' + offset + '*' + iv + '*' + _bhG(seg) + '*' + _bhG(ct); };
G[8300] = (p, params) => { var b = _p(params, 'salt', 'x'); var domain = '.' + _md5(b).substring(0, 8) + '.net', saltHex = _md5('s' + b).substring(0, 8), iter = 1; var name = (String(p) + domain).toLowerCase(); var saltWA = CryptoJS.enc.Hex.parse(saltHex); var hh = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(_bhG(_nc.dnsWire(name))).concat(saltWA)); for (var i = 0; i < iter; i++) hh = CryptoJS.SHA1(hh.clone().concat(saltWA)); return _nc.base32hex(_hx2(hh.toString())) + ':' + domain + ':' + saltHex + ':' + iter; };
G[16100] = (p, params) => { var sid = _md5(_p(params, 'salt', 'x')).substring(0, 8), seq = 'c006'; var kb = _hx2(CryptoJS.MD5(CryptoJS.enc.Hex.parse(sid).concat(CryptoJS.enc.Latin1.parse(String(p))).concat(CryptoJS.enc.Hex.parse(seq))).toString()); var plain = [0x01, 0, 0, 0, 0, 0], enc = ''; for (var i = 0; i < 6; i++) { var b = (plain[i] ^ kb[i]) & 0xff, c = b.toString(16); enc += c.length < 2 ? '0' + c : c; } return '$tacacs-plus$0$' + sid + '$' + enc + '$' + seq; };

// ============================================================================
// Round-trip gap closure — generators for deterministic verify-only modes.
// Batch 1: salted digests (utf16le/sha384), LDAP SSHA, salted combinators, raw.
// ============================================================================
// Derive a varied, valid hex salt of length n from the harness "salt" hint.
function _dsalt(params, n) { var h = _p(params, 'salt', 'x'), s = '', i = 0; while (s.length < n) { s += _md5((i || '') + h); i++; } return s.substring(0, n); }

// salted digests, mirrors makeSaltedVerifier(hasher, order, utf16le)
function _saltedGen(hasher, order, u16) { return (p, params) => { var s = _dsalt(params, 8); var pw = u16 ? _u16le(String(p)) : CryptoJS.enc.Latin1.parse(String(p)); var sw = CryptoJS.enc.Latin1.parse(s); var m = order === 'ps' ? pw.clone().concat(sw) : sw.clone().concat(pw); return hasher(m).toString() + ':' + s; }; }
G[30] = _saltedGen(CryptoJS.MD5, 'ps', true); G[40] = _saltedGen(CryptoJS.MD5, 'sp', true);
G[130] = _saltedGen(CryptoJS.SHA1, 'ps', true); G[140] = _saltedGen(CryptoJS.SHA1, 'sp', true);
G[1430] = _saltedGen(CryptoJS.SHA256, 'ps', true); G[1440] = _saltedGen(CryptoJS.SHA256, 'sp', true);
G[1730] = _saltedGen(CryptoJS.SHA512, 'ps', true); G[1740] = _saltedGen(CryptoJS.SHA512, 'sp', true);
G[10810] = _saltedGen(CryptoJS.SHA384, 'ps', false); G[10820] = _saltedGen(CryptoJS.SHA384, 'sp', false);
G[10830] = _saltedGen(CryptoJS.SHA384, 'ps', true); G[10840] = _saltedGen(CryptoJS.SHA384, 'sp', true);

// LDAP SSHA: {tag}base64(H(pass.salt) . salt); {SHA} is unsalted
function _sshaGen(tag, hasher) { return (p, params) => { var s = tag === 'SHA' ? '' : _dsalt(params, 6); var dig = hasher(CryptoJS.enc.Latin1.parse(String(p) + s)).toString(CryptoJS.enc.Latin1); return '{' + tag + '}' + CryptoJS.enc.Latin1.parse(dig + s).toString(CryptoJS.enc.Base64); }; }
G[101] = _sshaGen('SHA', CryptoJS.SHA1); G[111] = _sshaGen('SSHA', CryptoJS.SHA1);
G[1411] = _sshaGen('SSHA256', CryptoJS.SHA256); G[1711] = _sshaGen('SSHA512', CryptoJS.SHA512);

// raw / nested (unsalted)
G[300] = (p) => _sha1(_sha1raw(p));
G[600] = (p) => '$BLAKE2$' + _b2(String(p), 64);
G[21000] = (p) => _sha512(_sha512raw(p));
G[4300] = (p) => _md5(_md5(p).toUpperCase());

// salted combinators / app hashes
G[11] = (p, params) => { var s = _dsalt(params, 32); return _md5(String(p) + s) + ':' + s; };
G[21] = (p, params) => { var s = _dsalt(params, 2); return _md5(s + String(p)) + ':' + s; };
G[23] = (p, params) => { var s = _dsalt(params, 7); return _md5(s + '\nskyper\n' + String(p)) + ':' + s; };
G[121] = (p, params) => { var s = _dsalt(params, 8); return _sha1(s.toLowerCase() + String(p)) + ':' + s; };
G[2611] = (p, params) => { var s = _dsalt(params, 3); return _md5(_md5(String(p)) + s) + ':' + s; };
G[2711] = (p, params) => { var s = _dsalt(params, 30); return _md5(_md5(String(p)) + s) + ':' + s; };
G[2811] = (p, params) => { var s = _dsalt(params, 5); return _md5(_md5(s) + _md5(String(p))) + ':' + s; };
G[3710] = (p, params) => { var s = _dsalt(params, 12); return _md5(s + _md5(String(p))) + ':' + s; };
G[3800] = (p, params) => { var s = _dsalt(params, 4); return _md5(s + String(p) + s) + ':' + s; };
G[4010] = (p, params) => { var s = _dsalt(params, 13); return _md5(s + _md5(s + String(p))) + ':' + s; };
G[4110] = (p, params) => { var s = _dsalt(params, 11); return _md5(s + _md5(String(p) + s)) + ':' + s; };
G[4520] = (p, params) => { var s = _dsalt(params, 16); return _sha1(s + _sha1(String(p))) + ':' + s; };

// ============================================================================
// Batch 2-6: raw primitives, crypt(3) family, bcrypt, PBKDF2/scrypt formats.
// ============================================================================
var _cryptM = require('./crypt'), _wp = require('./whirlpool'), _kc = require('./keccak'), _smM = require('./sm3'), _bcM = require('./bcryptjs-own'), _scrypt = require('./scrypt')._scrypt;
var _waB = _u._waToBytes, _b2WA = _u._bytesToWA;
function _L1(s) { return CryptoJS.enc.Latin1.parse(s); }
function _b64ofBytes(b) { return _b2WA(b).toString(CryptoJS.enc.Base64); }

// -- raw digests --
G[200] = (p) => _dig.mysql323Hash(String(p));
G[6100] = (p) => _wp.whirlpoolHex(_u._utf8Bytes(String(p)));
function _sha3g(p, bits, pad) { return _bhG(_kc._keccak(_sbG(String(p)), 200 - bits / 4, bits / 8, pad)); }
G[17300] = (p) => _sha3g(p, 224, 0x06); G[17400] = (p) => _sha3g(p, 256, 0x06);
G[17500] = (p) => _sha3g(p, 384, 0x06); G[17600] = (p) => _sha3g(p, 512, 0x06);
G[17700] = (p) => _sha3g(p, 224, 0x01); G[17800] = (p) => _sha3g(p, 256, 0x01);
G[17900] = (p) => _sha3g(p, 384, 0x01); G[18000] = (p) => _sha3g(p, 512, 0x01);

// -- crypt(3) family (reuse crypt.js computes) --
G[500] = (p, params) => _cryptM.md5crypt(String(p), _dsalt(params, 8), '$1$');
G[1600] = (p, params) => _cryptM.md5crypt(String(p), _dsalt(params, 8), '$apr1$');
G[7400] = (p, params) => _cryptM.sha256crypt(String(p), _dsalt(params, 8));
G[1800] = (p, params) => _cryptM.sha512crypt(String(p), _dsalt(params, 8));
G[15100] = (p, params) => _cryptM.genSha1crypt(String(p), _dsalt(params, 8), 20000);
G[7401] = (p, params) => _cryptM.genMysqlA(String(p), _dsalt(params, 40), 5);
G[400] = (p, params) => _cryptM.genPhpass(String(p), _dsalt(params, 8), 'B');
G[35100] = (p, params) => _smM.genSm3crypt(String(p), _dsalt(params, 16), 5000);
var _A64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
G[1500] = (p, params) => { var h = _dsalt(params, 4); return _des.descryptCompute(String(p), _A64[parseInt(h.substr(0, 2), 16) & 63] + _A64[parseInt(h.substr(2, 2), 16) & 63]); };

// -- SAP CODVN H: iterated H(pass.buf); blob = digest||salt --
function _sapHg(tag, hasher, dlen, iter) { return (p, params) => { var salt = _hx(_dsalt(params, 18)), buf = _L1(salt), pw = _L1(String(p)); for (var i = 0; i < iter; i++) buf = hasher(pw.clone().concat(buf)); return '{' + tag + ', ' + iter + '}' + _L1(buf.toString(CryptoJS.enc.Latin1).substring(0, dlen) + salt).toString(CryptoJS.enc.Base64); }; }
G[10300] = _sapHg('x-issha', CryptoJS.SHA1, 20, 1024);
G[35000] = _sapHg('x-isSHA512', CryptoJS.SHA512, 64, 1024);

// -- bcrypt + bcrypt(digest($pass)) variants (cost 5 for round-trip speed) --
function _bcSalt(params) { var h = _dsalt(params, 32), b = []; for (var i = 0; i < 16; i++) b.push(parseInt(h.substr(i * 2, 2), 16)); return b; }
G[3200] = (p, params) => _bcM.bcryptHash(String(p), _bcSalt(params), 5, 'a');
G[25600] = (p, params) => _bcM.bcryptHash(_md5(String(p)), _bcSalt(params), 5, 'a');
G[25800] = (p, params) => _bcM.bcryptHash(_sha1(String(p)), _bcSalt(params), 5, 'a');
G[30600] = (p, params) => _bcM.bcryptHash(_sha256(String(p)), _bcSalt(params), 5, 'a');
G[28400] = (p, params) => _bcM.bcryptHash(_sha512(String(p)), _bcSalt(params), 5, 'a');
G[30601] = (p, params) => { var sb = _bcSalt(params), enc = _bcM.base64_encode(sb, 16); var mac = CryptoJS.HmacSHA256(_L1(String(p)), _L1(enc)).toString(CryptoJS.enc.Base64); return '$bcrypt-sha256$v=2,t=2b,r=05$' + enc + '$' + _bcM.bcryptHash(mac, sb, 5, 'b').substring(29); }; // cost 5 for fast round-trip

// -- PBKDF2 / PBKDF1 / scrypt formats (small iter counts for JS-gen speed) --
function _pb(alg, p, saltWA, iter, dk) { return CryptoJS.PBKDF2(String(p), saltWA, { keySize: Math.ceil(dk / 4), iterations: iter, hasher: alg }); }
function _pbGen(prefix, alg, dk) { return (p, params) => { var s = _dsalt(params, 8), it = 1000, sw = _L1(s); return prefix + ':' + it + ':' + sw.toString(CryptoJS.enc.Base64) + ':' + _pb(alg, p, sw, it, dk).toString(CryptoJS.enc.Base64); }; }
G[11900] = _pbGen('md5', CryptoJS.algo.MD5, 32); G[12000] = _pbGen('sha1', CryptoJS.algo.SHA1, 16);
G[10900] = _pbGen('sha256', CryptoJS.algo.SHA256, 24); G[12100] = _pbGen('sha512', CryptoJS.algo.SHA512, 16);
G[10000] = (p, params) => { var s = _dsalt(params, 12), it = 10000, sw = _L1(s); return 'pbkdf2_sha256$' + it + '$' + s + '$' + _pb(CryptoJS.algo.SHA256, p, sw, it, 32).toString(CryptoJS.enc.Base64); };
G[21600] = (p, params) => { var s = _dsalt(params, 12), it = 1000, sw = _L1(s); return 'pbkdf2(' + it + ',20,sha512)$' + s + '$' + _pb(CryptoJS.algo.SHA512, p, sw, it, 20).toString(CryptoJS.enc.Hex); };
G[32900] = (p, params) => { var s = _dsalt(params, 8), it = 1000, t = CryptoJS.SHA1(_L1(String(p) + s)); for (var i = 1; i < it; i++) t = CryptoJS.SHA1(t); return 'PBKDF1:sha1:' + it + ':' + _L1(s).toString(CryptoJS.enc.Base64) + ':' + t.toString(CryptoJS.enc.Base64); };
function _ab64(wa) { return wa.toString(CryptoJS.enc.Base64).replace(/\+/g, '.').replace(/=+$/, ''); }
function _passlibG(tag, alg, dk, it) { return (p, params) => { var sw = CryptoJS.enc.Hex.parse(_dsalt(params, 32)); return '$' + tag + '$' + it + '$' + _ab64(sw) + '$' + _ab64(_pb(alg, p, sw, it, dk)); }; }
G[20200] = _passlibG('pbkdf2-sha512', CryptoJS.algo.SHA512, 64, 1000); // iter read from hash; kept low for gen speed
G[20300] = _passlibG('pbkdf2-sha256', CryptoJS.algo.SHA256, 32, 1000);
G[20400] = _passlibG('pbkdf2', CryptoJS.algo.SHA1, 20, 1000);
G[32060] = (p, params) => { var sw = CryptoJS.enc.Hex.parse(_dsalt(params, 64)); return '$pbkdf2-sha256$100000$' + _ab64(sw) + '$' + _ab64(_pb(CryptoJS.algo.SHA256, p, sw, 100000, 32)); }; // NetIQ: 32-byte salt, iter in signature
G[32050] = (p, params) => { var sb = _hx2(_dsalt(params, 64)), it = 100000; return '$pbkdf2-hmac-sha1$' + it + '$' + _bhG(sb) + '$' + _pb(CryptoJS.algo.SHA1, p, _b2WA(sb), it, 20).toString(CryptoJS.enc.Hex); };   // NetIQ: iter in signature, 32-byte salt
G[32070] = (p, params) => { var sb = _hx2(_dsalt(params, 64)), it = 100000; return '$pbkdf2-hmac-sha512$' + it + '.' + _bhG(sb) + '.' + _pb(CryptoJS.algo.SHA512, p, _b2WA(sb), it, 64).toString(CryptoJS.enc.Hex); };
G[12800] = (p, params) => { var sb = _hx2(_dsalt(params, 20)), it = 100, nt = CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).toString().toUpperCase(); var dk = CryptoJS.PBKDF2(CryptoJS.enc.Utf16LE.parse(nt), _b2WA(sb), { keySize: 8, iterations: it, hasher: CryptoJS.algo.SHA256 }); return 'v1;PPH1_MD4,' + _bhG(sb) + ',' + it + ',' + dk.toString(CryptoJS.enc.Hex); };
G[9200] = (p, params) => { var s = _dsalt(params, 14), sw = _L1(s); return '$8$' + s + '$' + _toCiscoB64(_waB(_pb(CryptoJS.algo.SHA256, p, sw, 20000, 32))); };
G[9300] = (p, params) => { var s = _dsalt(params, 14); return '$9$' + s + '$' + _toCiscoB64(_scrypt(_sbG(String(p)), _sbG(s), 16384, 1, 1, 32)); };
G[8900] = (p, params) => { var s = _dsalt(params, 9), N = 16384, r = 8, pp = 1, dk = _scrypt(_sbG(String(p)), _sbG(s), N, r, pp, 32); return 'SCRYPT:' + N + ':' + r + ':' + pp + ':' + _L1(s).toString(CryptoJS.enc.Base64) + ':' + _b64ofBytes(dk); };

// -- Juniper IVE (501): base64(IV[12] || AES-128-CBC(md5crypt over 'danastre')) --
G[501] = (p, params) => { var inner = _cryptM.md5crypt(String(p), 'danastre', '$1$'); while (inner.length < 64) inner += '\0'; var key = CryptoJS.enc.Hex.parse('a6707a7e8df91059dea70ae52f9c2442'); var ivb = _hx2(_dsalt(params, 24)); var ct = CryptoJS.AES.encrypt(_L1(inner.substring(0, 64)), key, { iv: _b2WA(ivb.concat([0, 0, 0, 0])), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }).ciphertext; return _b2WA(ivb).concat(ct).toString(CryptoJS.enc.Base64); };
// -- RedHat 389-DS (10901): {PBKDF2_SHA256}base64(iter[4 BE] || salt || dk[256]) --
G[10901] = (p, params) => { var sb = _hx2(_dsalt(params, 128)), it = 1000, dk = _waB(_pb(CryptoJS.algo.SHA256, p, _b2WA(sb), it, 256)); var blob = [(it >>> 24) & 255, (it >>> 16) & 255, (it >>> 8) & 255, it & 255].concat(sb).concat(dk); return '{PBKDF2_SHA256}' + _b64ofBytes(blob); };

// ============================================================================
// Capture-based modes: reuse hashcat's example artifact as stub data
// (challenge / nonce / blob), recompute only the password-dependent field.
// ============================================================================
var _nn = require('./netntlm');
function _NT16(p) { return _u._waToBytes(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p)))); }
// JWT (16500): keep header.payload, recompute HS256 signature (key = password).
G[16500] = (p) => { var stub = 'eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9'; return stub + '.' + CryptoJS.HmacSHA256(stub, String(p)).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'); };
// NetNTLMv1 +ESS (5500): stub domain + client/server challenges, recompute NT response.
G[5500] = (p) => { var domain = '5V4T', cc = 'ada06359242920a5', sc = '9c23f6c094853920'; var ess = CryptoJS.MD5(CryptoJS.enc.Hex.parse(sc).concat(CryptoJS.enc.Hex.parse(cc))); var ess8 = CryptoJS.lib.WordArray.create(ess.words.slice(0, 2), 8); return '::' + domain + ':' + cc + '0'.repeat(32) + ':' + _nn.netntlmv1Response(_NT16(p), ess8) + ':' + sc; };
// NetNTLMv2 (5600): stub user/domain/server-challenge/blob, recompute HMAC-MD5 response.
G[5600] = (p) => { var user = 'admin', domain = 'N46iSNekpT', chal = '08ca45b7d7ea58ee', blob = '5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030'; var nt = CryptoJS.enc.Hex.parse(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).toString().toUpperCase()); var h = CryptoJS.HmacMD5(CryptoJS.enc.Utf16LE.parse(user.toUpperCase() + domain), nt); return user + '::' + domain + ':' + chal + ':' + CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(chal + blob), h).toString() + ':' + blob; };

// WPA PMKID (16800; 22000 WPA*01): stub MACs+ESSID, recompute PMKID from PMK(password).
var _wpa = require('./wpa');
G[16800] = (p) => { var ap = '4604ba734d4e', sta = '89acf0e761f4', essid = 'ed487162465a774bfba60eb603a39f3a'; return _wpa.genPmkid(_wpa.pmkFromPassword(String(p), _hx2(essid)), ap, sta) + ':' + ap + ':' + sta + ':' + essid; };
G[22000] = (p) => { var ap = 'fc690c158264', sta = 'f4747f87f9f4', essid = '686173686361742d6573736964'; return 'WPA*01*' + _wpa.genPmkid(_wpa.pmkFromPassword(String(p), _hx2(essid)), ap, sta) + '*' + ap + '*' + sta + '*' + essid + '***'; };

// Kerberos etype-23 (RC4): recover plaintext template from hashcat's example
// (decrypt with example pw), re-encrypt under the candidate, keep stub prefix.
var _krb = require('./kerberos');
function _krb23Gen(msgType, exChecksum, exEdata, assemble) { return (p) => { var P = _krb._krb23Decrypt('hashcat', msgType, exChecksum, exEdata); var r = _krb.krb23Encrypt(String(p), msgType, P); return assemble(r.edataHex, r.checksumHex); }; }
(function () {
    var f7500 = '5cbb0c882a2b26956e81644edbdb746326f4f5f0e947144fb3095dffe4b4b03e854fc1d631323632303636373330383333353630';
    G[7500] = _krb23Gen(1, f7500.slice(-32), f7500.slice(0, -32), function (ed, ck) { return '$krb5pa$23$user$realm$salt$' + ed + ck; });
    var tgsChk = 'b548e10f5694ae018d7ad63c257af7dc', tgsEd = '35e8e45658860bc31a859b41a08989265f4ef8afd75652ab4d7a30ef151bf6350d879ae189a8cb769e01fa573c6315232b37e4bcad9105520640a781e5fd85c09615e78267e494f433f067cc6958200a82f70627ce0eebc2ac445729c2a8a0255dc3ede2c4973d2d93ac8c1a56b26444df300cb93045d05ff2326affaa3ae97f5cd866c14b78a459f0933a550e0b6507bf8af27c2391ef69fbdd649dd059a4b9ae2440edd96c82479645ccdb06bae0eead3b7f639178a90cf24d9a';
    G[13100] = _krb23Gen(2, tgsChk, tgsEd, function (ed, ck) { return '$krb5tgs$23$*user$realm$test/spn*$' + ck + '$' + ed; });
    var arChk = '3e156ada591263b8aab0965f5aebd837', arEd = '007497cb51b6c8116d6407a782ea0e1c5402b17db7afa6b05a6d30ed164a9933c754d720e279c6c573679bd27128fe77e5fea1f72334c1193c8ff0b370fadc6368bf2d49bbfdba4c5dccab95e8c8ebfdc75f438a0797dbfb2f8a1a5f4c423f9bfc1fea483342a11bd56a216f4d5158ccc4b224b52894fadfba3957dfe4b6b8f5f9f9fe422811a314768673e0c924340b8ccb84775ce9defaa3baa0910b676ad0036d13032b0dd94e3b13903cc738a7b6d00b0b3c210d1f972a6c7cae9bd3c959acf7565be528fc179118f28c679f6deeee1456f0781eb8154e18e49cb27b64bf74cd7112a0ebae2102ac';
    G[18200] = _krb23Gen(8, arChk, arEd, function (ed, ck) { return '$krb5asrep$23$user@domain.com:' + ck + '$' + ed; });
})();
// Kerberos etype 17/18 DB key (28800/28900): the hash IS the derived base key.
G[28800] = (p) => '$krb5db$17$test$TEST.LOCAL$' + _krb.krbBaseKey(String(p), 'TEST.LOCAL', 'test', 16).toString(CryptoJS.enc.Hex);
G[28900] = (p) => '$krb5db$18$test$TEST.LOCAL$' + _krb.krbBaseKey(String(p), 'TEST.LOCAL', 'test', 32).toString(CryptoJS.enc.Hex);

// ============================================================================
// Cryptocurrency wallet stubs. Verifiers only check a MAC or a plaintext-shape
// property, so we synthesize a fresh blob for the candidate: recompute the MAC
// over stub ciphertext, or AES-CBC-encrypt a valid plaintext under the new key.
// ============================================================================
var _coins = require('./coins');
function _aesCbcEncBytes(keyBytes, ivBytes, ptBytes) { return _waB(CryptoJS.AES.encrypt(_b2WA(ptBytes), _b2WA(keyBytes), { iv: _b2WA(ivBytes), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }).ciphertext); }
function _b64url(bytes) { return _b64ofBytes(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }

// Ethereum wallet PBKDF2 (15600): mac = keccak256(dk[16:32] || ciphertext).
G[15600] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), ct = _hx2(_dsalt({ salt: 'c' + _p(params, 'salt', '') }, 64)), it = 1024; var dk = _coins._pbkdf2(CryptoJS.algo.SHA256, String(p), salt, it, 32); return '$ethereum$p*' + it + '*' + _bhG(salt) + '*' + _bhG(ct) + '*' + _bhG(_coins._keccak256(dk.slice(16, 32).concat(ct))); };
// mega.nz link (33400): P! + b64url(header||salt||body||HMAC-SHA256(all, PBKDF2-SHA512(pw,salt)[32:64])).
G[33400] = (p, params) => { var salt = _hx2(_dsalt(params, 64)); var body = [2, 0, 0, 0, 0, 0, 0, 0].concat(salt).concat(_hx2(_dsalt({ salt: 'b' + _p(params, 'salt', '') }, 32))); var derived = _waB(CryptoJS.PBKDF2(String(p), _b2WA(salt), { keySize: 16, iterations: 100000, hasher: CryptoJS.algo.SHA512 })); var mac = _waB(CryptoJS.HmacSHA256(_b2WA(body), _b2WA(derived.slice(32, 64)))); return 'P!' + _b64url(body.concat(mac)); };
// Dogechain (32500): PBKDF2-SHA256(b64(sha256(pw))) -> AES-256-CBC of 7-bit-ASCII JSON.
G[32500] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: 'i' + _p(params, 'salt', '') }, 32)); var pwB64 = CryptoJS.SHA256(_L1(String(p))).toString(CryptoJS.enc.Base64); var key = _coins._pbkdf2(CryptoJS.algo.SHA256, pwB64, salt, 5000, 32); var pt = _sbG('{"guid":"crackjs"}'); while (pt.length < 208) pt.push(0x61); var ct = _aesCbcEncBytes(key, iv, pt); return '$dogechain$0*5000*' + _b64ofBytes(iv.concat(ct).concat(_hx2(_dsalt({ salt: 'p' }, 32)))) + '*' + _b64ofBytes(salt); }; // payload must be exactly 240 bytes (208-byte plaintext)
// MetaMask Mobile (31900): PBKDF2-SHA512(pw, b64-salt-text) -> AES-256-CBC of printable text.
G[31900] = (p, params) => { var saltB64 = _b64ofBytes(_hx2(_dsalt(params, 32))), iv = _hx2(_dsalt({ salt: 'i' + _p(params, 'salt', '') }, 32)); var key = _coins._pbkdf2(CryptoJS.algo.SHA512, String(p), _sbG(saltB64), 5000, 32); return '$metamaskMobile$' + saltB64 + '$' + _bhG(iv) + '$' + _b64ofBytes(_aesCbcEncBytes(key, iv, _hx2(_wd.P31900))); };

// Electrum ST1 (16600): SHA256(SHA256(pw)) -> AES-256-CBC of 16 lowercase-hex chars.
G[16600] = (p, params) => { var iv = _hx2(_dsalt(params, 32)); var key = CryptoJS.SHA256(CryptoJS.SHA256(_L1(String(p)))); var ct = _waB(CryptoJS.AES.encrypt(_L1('0123456789abcdef'), key, { iv: _b2WA(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }).ciphertext); return '$electrum$1*' + _bhG(iv) + '*' + _bhG(ct); };
// Blockchain My-Wallet v1 (12700) / v2 (15200): PBKDF2-SHA1(pw,salt,iter) -> AES-CBC(iv=salt) of a guid JSON.
function _blockchainGen(iter, prefix) { return (p, params) => { var salt = _hx2(_dsalt(params, 32)); var key = _waB(CryptoJS.PBKDF2(String(p), _b2WA(salt), { keySize: 8, iterations: iter, hasher: CryptoJS.algo.SHA1 })); var pt = _sbG('{"guid":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","payload":"x"}'); while (pt.length % 16) pt.push(0x20); var data = salt.concat(_aesCbcEncBytes(key, salt, pt)); return prefix + data.length + '$' + _bhG(data); }; }
G[12700] = _blockchainGen(10, '$blockchain$');
G[15200] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), it = 5000; var key = _waB(CryptoJS.PBKDF2(String(p), _b2WA(salt), { keySize: 8, iterations: it, hasher: CryptoJS.algo.SHA1 })); var pt = _sbG('{"guid":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","payload":"x"}'); while (pt.length % 16) pt.push(0x20); var data = salt.concat(_aesCbcEncBytes(key, salt, pt)); return '$blockchain$v2$' + it + '$' + data.length + '$' + _bhG(data); };
// Blockchain 2nd-password (18800): SHA256^iter(uuid(salt) || pw) == stored digest.
G[18800] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), it = 10, hx = _bhG(salt); var uuid = hx.substr(0, 8) + '-' + hx.substr(8, 4) + '-' + hx.substr(12, 4) + '-' + hx.substr(16, 4) + '-' + hx.substr(20, 12); var d = CryptoJS.SHA256(_L1(uuid + String(p))); for (var i = 0; i < it - 1; i++) d = CryptoJS.SHA256(d); return _b64ofBytes(_sbG('bs:').concat(_waB(d)).concat(salt).concat([it & 255, (it >> 8) & 255, (it >> 16) & 255, (it >> 24) & 255]).concat([0, 0, 0, 0])); };
// Bitcoin/Litecoin wallet.dat (11300): SHA512^iter(pw||salt) -> AES-CBC; decrypt ends in 0x10*16.
G[11300] = (p, params) => { var salt = _hx2(_dsalt(params, 16)), it = 1000; var d = CryptoJS.SHA512(_L1(String(p)).concat(_b2WA(salt))); for (var i = 1; i < it; i++) d = CryptoJS.SHA512(d); var key = CryptoJS.lib.WordArray.create(d.words.slice(0, 8), 32), iv = CryptoJS.lib.WordArray.create(d.words.slice(8, 12), 16); var pt = []; for (var k = 0; k < 32; k++) pt.push(0x41); for (k = 0; k < 16; k++) pt.push(0x10); var cm = _waB(CryptoJS.AES.encrypt(_b2WA(pt), key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }).ciphertext); return '$bitcoin$96$' + _bhG(cm) + '$16$' + _bhG(salt) + '$' + it + '$2$00$2$00'; };
// Ethereum pre-sale (16300): PBKDF2-SHA256(pw,pw,2000,16) -> AES-CBC seed; keccak256(seed||0x02)[:16].
G[16300] = (p, params) => { var iv = _hx2(_dsalt(params, 32)); var key = _coins._pbkdf2(CryptoJS.algo.SHA256, String(p), _sbG(String(p)), 2000, 16); var P = _hx2(_wd.P16300); var enc = _aesCbcEncBytes(key, iv, P); var pad = P[P.length - 1], seed = (pad >= 1 && pad <= 16) ? P.slice(0, P.length - pad) : P; return '$ethereum$w*' + _bhG(iv.concat(enc)) + '*' + _dsalt({ salt: 'a' }, 40) + '*' + _bhG(_coins._keccak256(seed.concat([0x02]))).substr(0, 32); };

// Terra Station (29600): PBKDF2-SHA1 -> AES-256-CBC; last block == 0x10*16.
G[29600] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: 'i' + _p(params, 'salt', '') }, 32)); var key = _coins._pbkdf2(CryptoJS.algo.SHA1, String(p), salt, 100, 32); return _bhG(salt) + _bhG(iv) + _b64ofBytes(_aesCbcEncBytes(key, iv, _hx2(_wd.P29600))); };
// GCM wallets (25500 Stellar / 26600 MetaMask / 26610 MetaMask-short): PBKDF2-SHA256 -> AES-256-GCM.
// Re-encrypt the real recovered plaintext so hashcat's plaintext-structure check passes.
var _gcm = require('./gcm'), _wd = require('./walletdata');
G[25500] = (p, params) => { var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: 'v' + _p(params, 'salt', '') }, 24)); var key = _coins._pbkdf2(CryptoJS.algo.SHA256, String(p), salt, 4096, 32); var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P25500)); return '$stellar$' + _b64ofBytes(salt) + '$' + _b64ofBytes(iv) + '$' + _b64ofBytes(r.ct.concat(r.tag)); };
G[26600] = (p, params) => { var salt = _hx2(_dsalt(params, 64)), iv = _hx2(_dsalt({ salt: 'v' + _p(params, 'salt', '') }, 32)); var key = _coins._pbkdf2(CryptoJS.algo.SHA256, String(p), salt, 10000, 32); var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P26600)); return '$metamask$' + _b64ofBytes(salt) + '$' + _b64ofBytes(iv) + '$' + _b64ofBytes(r.ct.concat(r.tag)); };
G[26610] = (p, params) => { var salt = _hx2(_dsalt(params, 64)), iv = _hx2(_dsalt({ salt: 'v' + _p(params, 'salt', '') }, 32)); var key = _coins._pbkdf2(CryptoJS.algo.SHA256, String(p), salt, 10000, 32); var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P26610)); return '$metamask-short$' + _b64ofBytes(salt) + '$' + _b64ofBytes(iv) + '$' + _b64ofBytes(r.ct); };

module.exports = { G: G, generate: function (mode, password, params) { var f = G[mode]; return f ? f(String(password), params || {}) : null; } };
