// ZIP-family archive encryption verifiers + generators.
//
//   WinZip AES (13600)          - PBKDF2-HMAC-SHA1 -> 2-byte verifier + HMAC-SHA1(ciphertext)
//   SecureZIP AES (23001/2/3)   - custom SHA1 KDF -> AES-CBC; plaintext ends in 0x10*16 pad
//   PKZIP traditional (17200 compressed / 17210 uncompressed / 17220 & 17225 multi-file)
//                               - ZipCrypto stream cipher -> (inflate ->) CRC32
//
// All confirm the password deterministically (a MAC, a full padding block, or a CRC of the
// decrypted body) — none need a compressor. 7-Zip (LZMA), compressed RAR3-p (RAR codec) and
// the probabilistic PKZIP modes (checksum-only 17230 / master-key 20500/20510) are out of scope.
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToHex = u._bytesToHex, _bytesToWA = u._bytesToWA, _hexToBytes = u._hexToBytes, _utf8Bytes = u._utf8Bytes;
var _pkInflate = require('./inflate').inflateRaw;
var _pkCrc32 = require('./rar').crc32;

// ---------------------------------------------------------------------------
// WinZip AES (13600).  hash = $zip2$*type*mode*magic*salt*verify*length*data*auth*$/zip2$
//   PBKDF2-HMAC-SHA1(pw, salt, 1000) -> [ encKey(keyLen) | authKey(keyLen) | 2-byte verifier ].
//   keyLen = 16/24/32 for mode 1/2/3.  auth = first 10 bytes of HMAC-SHA1(data, authKey).
// ---------------------------------------------------------------------------
function winzipDerive(password, saltBytes, mode) {
    var keyLen = mode * 8 + 8, outLen = 2 * keyLen + 2;
    var dk = _waToBytes(CryptoJS.PBKDF2(String(password), _bytesToWA(saltBytes),
        { keySize: Math.ceil(outLen / 4), iterations: 1000, hasher: CryptoJS.algo.SHA1 })).slice(0, outLen);
    return { verify: _bytesToHex(dk.slice(outLen - 2)), authKey: dk.slice(keyLen, 2 * keyLen) };
}
function verifyWinzipAes(password, hash) {
    var m = /^\$zip2\$\*(\d+)\*([123])\*(\d+)\*([0-9a-fA-F]*)\*([0-9a-fA-F]*)\*(\d+)\*([0-9a-fA-F]*)\*([0-9a-fA-F]+)\*\$\/zip2\$$/.exec(String(hash));
    if (!m) return false;
    var d = winzipDerive(password, _hexToBytes(m[4]), parseInt(m[2], 10));
    if (m[5] && d.verify !== m[5].toLowerCase()) return false;
    var mac = _waToBytes(CryptoJS.HmacSHA1(_bytesToWA(_hexToBytes(m[7])), _bytesToWA(d.authKey))).slice(0, 10);
    return _bytesToHex(mac) === m[8].toLowerCase();
}
function genWinzipAes(password, saltHex, mode) {
    mode = mode || 1; saltHex = (saltHex || '0675369741458183').toLowerCase();
    var d = winzipDerive(password, _hexToBytes(saltHex), mode);
    var auth = _bytesToHex(_waToBytes(CryptoJS.HmacSHA1(_bytesToWA([]), _bytesToWA(d.authKey))).slice(0, 10));
    return '$zip2$*0*' + mode + '*0*' + saltHex + '*' + d.verify + '*0**' + auth + '*$/zip2$';
}

// ---------------------------------------------------------------------------
// SecureZIP AES (23001/23002/23003).  hash = $zip3$*0*1*bit_len*0*iv*data*0*0*0*filename
//   key = ( SHA1((SHA1(pw)‖0*44)^0x36*64) ‖ SHA1((SHA1(pw)‖0*44)^0x5c*64) )[0:keyLen]
//   AES-CBC decrypt; correct iff plaintext ends in a full 0x10*16 PKCS7 pad block.
// ---------------------------------------------------------------------------
function securezipKey(password, keyLen) {
    var K = _waToBytes(CryptoJS.SHA1(_bytesToWA(_utf8Bytes(String(password)))));
    var ipad = [], opad = [], i, b;
    for (i = 0; i < 64; i++) { b = i < 20 ? K[i] : 0; ipad.push(b ^ 0x36); opad.push(b ^ 0x5c); }
    return _waToBytes(CryptoJS.SHA1(_bytesToWA(ipad))).concat(_waToBytes(CryptoJS.SHA1(_bytesToWA(opad)))).slice(0, keyLen);
}
function _securezipDecTail(password, hash) {
    var m = /^\$zip3\$\*0\*1\*(128|192|256)\*0\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*0\*0\*0\*.*$/.exec(String(hash));
    if (!m) return null;
    var iv = _hexToBytes(m[2]); while (iv.length < 16) iv.push(0); iv = iv.slice(0, 16);
    var data = _hexToBytes(m[3]);
    if (data.length < 16 || data.length % 16 !== 0) return null;
    var key = securezipKey(password, parseInt(m[1], 10) / 8);
    return _waToBytes(CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: _bytesToWA(data) }),
        _bytesToWA(key), { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(iv) }));
}
function verifySecurezip(password, hash) {
    var dec = _securezipDecTail(password, hash);
    if (!dec) return false;
    for (var i = dec.length - 16; i < dec.length; i++) if (dec[i] !== 0x10) return false;
    return true;
}
function genSecurezip(password, ivHex, bitLen) {
    bitLen = bitLen || 256; ivHex = (ivHex || '39bff47df6152a0214d7a967').toLowerCase();
    var iv = _hexToBytes(ivHex); while (iv.length < 16) iv.push(0); iv = iv.slice(0, 16);
    var key = securezipKey(password, bitLen / 8), pt = [], i;
    for (i = 0; i < 128; i++) pt.push(0x2a);
    for (i = 0; i < 16; i++) pt.push(0x10);
    var ct = _waToBytes(CryptoJS.AES.encrypt(_bytesToWA(pt), _bytesToWA(key),
        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(iv) }).ciphertext);
    return '$zip3$*0*1*' + bitLen + '*0*' + ivHex + '*' + _bytesToHex(ct) + '*0*0*0*file.txt';
}

// ---------------------------------------------------------------------------
// PKZIP traditional / ZipCrypto (17200/17210/17220/17225).
// Stream cipher keyed by 3 words seeded from the password; data = [12-byte cipher
// header | body]. A full-data entry is confirmed by CRC32 of the decrypted (and,
// for compression_type 8, inflated) body. Multi-file hashes carry several entries;
// checksum-only entries (no CRC) are skipped, so all-checksum-only hashes (17230)
// correctly can't be confirmed.
// ---------------------------------------------------------------------------
var _PK_T = (function () { var t = [], c, n, k; for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } return t; })();
function _pkc(crc, b) { return ((crc >>> 8) ^ _PK_T[(crc ^ b) & 0xff]) >>> 0; }
function _pkUpd(k, b) {
    k[0] = _pkc(k[0], b);
    k[1] = (k[1] + (k[0] & 0xff)) >>> 0;
    k[1] = (Math.imul(k[1], 134775813) + 1) >>> 0;
    k[2] = _pkc(k[2], (k[1] >>> 24) & 0xff);
}
function _pkInit(pw) { var k = [0x12345678, 0x23456789, 0x34567890], i; for (i = 0; i < pw.length; i++) _pkUpd(k, pw[i]); return k; }
function _pkDec(k, ct) { var out = [], i, t, b; for (i = 0; i < ct.length; i++) { t = (k[2] | 2) & 0xffff; b = ct[i] ^ (((t * (t ^ 1)) >>> 8) & 0xff); _pkUpd(k, b); out.push(b); } return out; }
function _pkEnc(k, pt) { var out = [], i, t; for (i = 0; i < pt.length; i++) { t = (k[2] | 2) & 0xffff; out.push(pt[i] ^ (((t * (t ^ 1)) >>> 8) & 0xff)); _pkUpd(k, pt[i]); } return out; }

// Walk the single/multi-file $pkzip2$ structure -> [{hasCrc, ctype, ulen, crc, dataIdx}]; null if malformed.
function _pkEntries(f) {
    if (f.length < 6) return null;
    var sig = f[0], v2 = /^\$pkzip2\$/.test(sig);
    if (!v2 && !/^\$pkzip\$/.test(sig)) return null;
    if (f[f.length - 1] !== (v2 ? '$/pkzip2$' : '$/pkzip$')) return null;
    var hashCount = parseInt(sig.charAt(sig.length - 1), 10);
    if (!(hashCount >= 1 && hashCount <= 8)) return null;
    var idx = 2, entries = [], e, ent, dataType;
    for (e = 0; e < hashCount; e++) {
        if (idx + 4 > f.length) return null;
        dataType = parseInt(f[idx], 10); idx += 2;                     // data_type, magic
        ent = { hasCrc: false, ctype: 0, ulen: 0, crc: 0, dataIdx: -1 };
        if (dataType > 1) {
            idx++;                                                     // compressed_length
            ent.ulen = parseInt(f[idx++], 16);
            ent.crc = parseInt(f[idx++], 16) >>> 0;
            idx += 2;                                                  // offset, additional_offset
            ent.hasCrc = true;
        }
        ent.ctype = parseInt(f[idx++], 10);
        idx += (v2 ? 3 : 2);                                           // data_length, checksum(s)
        ent.dataIdx = idx++;                                           // data
        entries.push(ent);
    }
    return (idx === f.length - 1) ? entries : null;                    // must land exactly on the end tag
}

function verifyPkzip(password, hash) {
    var f = String(hash).trim().split('*'), entries = _pkEntries(f);
    if (!entries) return false;
    var pw = _utf8Bytes(String(password)), any = false, e, ent, data, k, body, plain;
    for (e = 0; e < entries.length; e++) {
        ent = entries[e];
        if (!ent.hasCrc) continue;                                     // checksum-only entry -> not deterministic
        var dataHex = f[ent.dataIdx];
        if (!dataHex || !/^[0-9a-fA-F]+$/.test(dataHex)) return false;
        data = _hexToBytes(dataHex);
        if (data.length < 13) return false;
        k = _pkInit(pw);
        _pkDec(k, data.slice(0, 12));                                  // 12-byte cipher header
        body = _pkDec(k, data.slice(12));
        if (ent.ctype === 0) plain = body;
        else if (ent.ctype === 8) { try { plain = _pkInflate(body, ent.ulen); } catch (err) { return false; } }
        else return false;
        if ((_pkCrc32(plain.slice(0, ent.ulen)) >>> 0) !== ent.crc) return false;
        any = true;
    }
    return any;
}

function validatePkzip(hash, opts) {
    var entries = _pkEntries(String(hash).trim().split('*'));
    if (!entries) return false;
    if (opts.single && entries.length !== 1) return false;
    if (opts.multi && entries.length < 2) return false;
    if (opts.ctype != null && entries[0].ctype !== opts.ctype) return false;
    return true;
}

// hashcat's example vectors — re-encrypt each entry's (password-independent) plaintext body
// under the candidate password. No DEFLATE compressor needed; bodies are reused as-is.
var _PKZIP_EX = {
    '17210': '$pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9fc7e2be1a1f4f664269fceb6cb88723a97408ae1fe07f774d31d1442ea8485081e63f919851ca0b7588d5e3442317fff19fe547a4ef97492ed75417c427eea3c4e146e16c100a2f8b6abd7e5988dc967e5a0e51f641401605d673630ea52ebb04da4b388489901656532c9aa474ca090dbac7cf8a21428d57b42a71da5f3d83fed927361e5d385ca8e480a6d42dea5b4bf497d3a24e79fc7be37c8d1721238cbe9e1ea3ae1eb91fc02aabdf33070d718d5105b70b3d7f3d2c28b3edd822e89a5abc0c8fee117c7fbfbfd4b4c8e130977b75cb0b1da080bfe1c0859e6483c42f459c8069d45a76220e046e6c2a2417392fd87e4aa4a2559eaab3baf78a77a1b94d8c8af16a977b4bb45e3da211838ad044f209428dba82666bf3d54d4eed82c64a9b3444a44746b9e398d0516a2596d84243b4a1d7e87d9843f38e45b6be67fd980107f3ad7b8453d87300e6c51ac9f5e3f6c3b702654440c543b1d808b62f7a313a83b31a6faaeedc2620de7057cd0df80f70346fe2d4dccc318f0b5ed128bcf0643e63d754bb05f53afb2b0fa90b34b538b2ad3648209dff587df4fa18698e4fa6d858ad44aa55d2bba3b08dfdedd3e28b8b7caf394d5d9d95e452c2ab1c836b9d74538c2f0d24b9b577*$/pkzip2$',
    '17200': '$pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3031a6f903e5f4e3211c8fdc4671547bf77f6f682afbfcc7475d83898985621a7af9bccd1349d1976500a68c48f630b7f22d7a0955524d768e34868880461335417ddd149c65a917c0eb0a4bf7224e24a1e04cf4ace5eef52205f4452e66ded937db9545f843a68b1e84a2e933cc05fb36d3db90e6c5faf1bee2249fdd06a7307849902a8bb24ec7e8a0886a4544ca47979a9dfeefe034bdfc5bd593904cfe9a5309dd199d337d3183f307c2cb39622549a5b9b8b485b7949a4803f63f67ca427a0640ad3793a519b2476c52198488e3e2e04cac202d624fb7d13c2*$/pkzip2$',
    '17220': '$pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49d3bbeab6cb385b7fa8a28dcccd3098bfdd7*1*0*8*24*2a74*882a*51281ac874a60baedc375ca645888d29780e20d4076edd1e7154a99bde982152a736311f*2*0*e3*1c5*eda7a8de*0*29*8*e3*eda7*5096*1455781b59707f5151139e018bdcfeebfc89bc37e372883a7ec0670a5eafc622feb338f9b021b6601a674094898a91beac70e41e675f77702834ca6156111a1bf7361bc9f3715d77dfcdd626634c68354c6f2e5e0a7b1e1ce84a44e632d0f6e36019feeab92fb7eac9dda8df436e287aafece95d042059a1b27d533c5eab62c1c559af220dc432f2eb1a38a70f29e8f3cb5a207704274d1e305d7402180fd47e026522792f5113c52a116d5bb25b67074ffd6f4926b221555234aabddc69775335d592d5c7d22462b75de1259e8342a9ba71cb06223d13c7f51f13be2ad76352c3b8ed*$/pkzip2$',
    '17225': '$pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056edf9fa4540919c109742dcb32f797fc90ce0*1*0*8*24*431a*3f26*18e2461c0dbad89bd9cc763067a020c89b5e16195b1ac5fa7fb13bd246d000b6833a2988*2*0*23*17*1e3c1a16*2e4*2f*0*23*1e3c*3f2d*54ea4dbc711026561485bbd191bf300ae24fa0997f3779b688cdad323985f8d3bb8b0c*$/pkzip2$'
};
function genPkzip(password, mode) {
    var f = _PKZIP_EX[String(mode)].split('*'), entries = _pkEntries(f);
    if (!entries) return null;
    var pw = _utf8Bytes(String(password)), e, di, plain;
    for (e = 0; e < entries.length; e++) {
        di = entries[e].dataIdx;
        plain = _pkDec(_pkInit(_utf8Bytes('hashcat')), _hexToBytes(f[di]));
        f[di] = _bytesToHex(_pkEnc(_pkInit(pw), plain));
    }
    return f.join('*');
}

module.exports = {
    verifyWinzipAes: verifyWinzipAes, genWinzipAes: genWinzipAes,
    verifySecurezip: verifySecurezip, genSecurezip: genSecurezip,
    verifyPkzip: verifyPkzip, validatePkzip: validatePkzip, genPkzip: genPkzip
};
