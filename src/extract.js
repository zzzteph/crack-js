// File-format -> hashcat-hash extraction.
//
//   extract(file)          sniff the container by magic bytes and return every
//                          crackable hash found, as hashcat-format lines.
//   extract(file, 'WPA')   only run the named extractor(s).
//
// The output lines feed straight into crack-js verifyHash() / hashcat -m. This is
// the inverse of the src/*.js verifiers: those consume a $zip2$/$7z$/WPA* line,
// these build one out of the raw bytes of a .zip / .7z / capture.
//
// Pure JS, no deps beyond ./util. Works in Node and the browser — pass a
// Uint8Array / ArrayBuffer / Buffer / number[] (a browser File/Blob must be read
// to an ArrayBuffer first: `extract(new Uint8Array(await file.arrayBuffer()), ...)`).
var u = require('./util');
var _bytesToHex = u._bytesToHex;

// ---------------------------------------------------------------------------
// input + little-endian byte helpers
// ---------------------------------------------------------------------------
function _toU8(input) {
    if (input == null) throw new Error('extract: empty input');
    if (input instanceof Uint8Array) return input;
    if (typeof ArrayBuffer !== 'undefined' && input instanceof ArrayBuffer) return new Uint8Array(input);
    if (input.buffer && typeof input.byteLength === 'number') return new Uint8Array(input.buffer, input.byteOffset || 0, input.byteLength);
    if (Array.isArray(input)) return Uint8Array.from(input);
    throw new Error('extract: unsupported input type');
}
function _u16(b, o) { return b[o] | (b[o + 1] << 8); }
function _u32(b, o) { return (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0; }
function _u64(b, o) { return _u32(b, o) + _u32(b, o + 4) * 4294967296; }   // exact for offsets < 2^53
function _hex(b, o, n) { var s = ''; for (var i = 0; i < n; i++) { var h = (b[o + i] & 0xff).toString(16); s += h.length < 2 ? '0' + h : h; } return s; }
function _ascii(b, o, n) { var s = ''; for (var i = 0; i < n; i++) s += String.fromCharCode(b[o + i]); return s; }
function _eq(b, o, sig) { for (var i = 0; i < sig.length; i++) if (b[o + i] !== sig[i]) return false; return true; }

// ---------------------------------------------------------------------------
// format detection (magic bytes)
// ---------------------------------------------------------------------------
var SIG = {
    zip: [0x50, 0x4b, 0x03, 0x04],   // PK\3\4  (also 05 06 empty / 07 08 spanned)
    zipc: [0x50, 0x4b],              // any PK — central dir / eocd fallback
    sevenzip: [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c],
    rar4: [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x00],       // Rar!\x1a\x07\x00
    rar5: [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x01, 0x00], // Rar!\x1a\x07\x01\x00
    ole: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],  // CFB — encrypted OOXML / legacy Office
    hccapx: [0x48, 0x43, 0x50, 0x58],                       // HCPX
    pcap_le: [0xd4, 0xc3, 0xb2, 0xa1], pcap_be: [0xa1, 0xb2, 0xc3, 0xd4],
    pcapng: [0x0a, 0x0d, 0x0d, 0x0a]
};
function detect(b) {
    if (_eq(b, 0, SIG.sevenzip)) return '7z';
    if (_eq(b, 0, SIG.rar5)) return 'rar';
    if (_eq(b, 0, SIG.rar4)) return 'rar';
    if (_eq(b, 0, SIG.ole)) return 'office';
    if (_eq(b, 0, SIG.hccapx)) return 'wpa';
    if (_eq(b, 0, SIG.pcapng) || _eq(b, 0, SIG.pcap_le) || _eq(b, 0, SIG.pcap_be)) return 'wpa';
    if (_eq(b, 0, SIG.zipc)) return 'zip';   // PK — zip / docx / xlsx / odf / jar
    return null;
}

// ---------------------------------------------------------------------------
// ZIP: WinZip-AES (13600) + traditional ZipCrypto (17200/17210, detect only for now)
// Walk the central directory (sizes are always present there), then read each
// encrypted entry's data from its local header.
// ---------------------------------------------------------------------------
function _zipCentralDir(b) {
    // locate End Of Central Directory (50 4B 05 06), scanning back over the comment
    var min = Math.max(0, b.length - 22 - 0xffff), i, eocd = -1;
    for (i = b.length - 22; i >= min; i--) if (b[i] === 0x50 && b[i + 1] === 0x4b && b[i + 2] === 0x05 && b[i + 3] === 0x06) { eocd = i; break; }
    if (eocd < 0) return null;
    var count = _u16(b, eocd + 10), cdOff = _u32(b, eocd + 16), p = cdOff, entries = [], e;
    for (e = 0; e < count && p + 46 <= b.length; e++) {
        if (!(b[p] === 0x50 && b[p + 1] === 0x4b && b[p + 2] === 0x01 && b[p + 3] === 0x02)) break;
        var verNeed = _u16(b, p + 6), flags = _u16(b, p + 8), method = _u16(b, p + 10), time = _u16(b, p + 12), crc = _u32(b, p + 16);
        var csize = _u32(b, p + 20), usize = _u32(b, p + 24);
        var fnLen = _u16(b, p + 28), exLen = _u16(b, p + 30), cmLen = _u16(b, p + 32);
        var lho = _u32(b, p + 42), name = _ascii(b, p + 46, fnLen);
        entries.push({ verNeed: verNeed, flags: flags, method: method, time: time, crc: crc, csize: csize, usize: usize, lho: lho, name: name });
        p += 46 + fnLen + exLen + cmLen;
    }
    return entries;
}
function _localDataOffset(b, lho) {
    if (!(b[lho] === 0x50 && b[lho + 1] === 0x4b && b[lho + 2] === 0x03 && b[lho + 3] === 0x04)) return -1;
    return lho + 30 + _u16(b, lho + 26) + _u16(b, lho + 28);
}
// find the AES (0x9901) extra field for a WinZip entry -> strength (1/2/3) + real method
function _aesExtra(b, exStart, exLen) {
    var p = exStart, end = exStart + exLen;
    while (p + 4 <= end) {
        var id = _u16(b, p), sz = _u16(b, p + 2);
        if (id === 0x9901) return { strength: b[p + 8], method: _u16(b, p + 9) };
        p += 4 + sz;
    }
    return null;
}
function extractZip(b) {
    var entries = _zipCentralDir(b), out = [], i;
    if (!entries) throw new Error('zip: no central directory found');
    for (i = 0; i < entries.length; i++) {
        var en = entries[i];
        if (!(en.flags & 1) && en.method !== 99) continue;   // not encrypted
        var dataOff = _localDataOffset(b, en.lho);
        if (dataOff < 0) continue;
        if (en.method === 99) {                              // ---- WinZip AES (13600)
            var lex = [en.lho + 30 + _u16(b, en.lho + 26), _u16(b, en.lho + 28)];
            var aes = _aesExtra(b, lex[0], lex[1]);
            if (!aes) continue;
            var saltLen = aes.strength === 1 ? 8 : aes.strength === 2 ? 12 : 16;
            var csize = en.csize, encLen = csize - saltLen - 2 - 10;
            if (encLen < 0) continue;
            var salt = _hex(b, dataOff, saltLen);
            var pv = _hex(b, dataOff + saltLen, 2);
            var ct = _hex(b, dataOff + saltLen + 2, encLen);
            var auth = _hex(b, dataOff + saltLen + 2 + encLen, 10);
            out.push({ type: 'zip', mode: 13600, name: 'WinZip', file: en.name,
                hash: '$zip2$*0*' + aes.strength + '*0*' + salt + '*' + pv + '*' + encLen + '*' + ct + '*' + auth + '*$/zip2$' });
        } else {                                             // ---- traditional ZipCrypto (17200/17210)
            if (en.method !== 0 && en.method !== 8) continue;
            var cl = en.csize;                               // = 12-byte crypt header + encrypted body
            if (cl < 13 || dataOff + cl > b.length) continue;
            var da = _hex(b, dataOff, cl);
            var hx2 = function (v) { var s = (v & 0xff).toString(16); return s.length < 2 ? '0' + s : s; };
            var streamed = (en.flags & 0x08) !== 0;          // data descriptor -> check byte comes from timestamp
            var cs = streamed ? (hx2(en.time >> 8) + hx2(en.time)) : (hx2(en.crc >>> 24) + hx2(en.crc >>> 16));
            var tc = hx2(en.time >> 8) + hx2(en.time);       // timestamp check bytes ($pkzip2$ TC field)
            var B = en.verNeed >= 20 ? 1 : 2;                // valid check bytes (zip >= 2.0 -> 1)
            var clHex = cl.toString(16), ulHex = (en.usize >>> 0).toString(16), crcHex = (en.crc >>> 0).toString(16);
            out.push({ type: 'zip', mode: en.method === 8 ? 17200 : 17210, name: 'PKZIP/ZipCrypto', file: en.name,
                hash: '$pkzip2$1*' + B + '*2*0*' + clHex + '*' + ulHex + '*' + crcHex + '*0*0*' + en.method + '*' + clHex + '*' + cs + '*' + tc + '*' + da + '*$/pkzip2$' });
        }
    }
    if (!out.length) throw new Error('zip: no encrypted entries found');
    return out;
}

// ---------------------------------------------------------------------------
// WPA: hccapx struct -> 22000 (WPA*02); pass through .hc22000 text and hccapx-hex.
// pcap/pcapng parsing is handled in a later pass.
// ---------------------------------------------------------------------------
function _hccapxTo22000(b, o) {
    // struct layout (see src/wpa.js _verifyHccapx)
    var mp = b[o + 8], essidLen = b[o + 9];
    var essid = _hex(b, o + 10, essidLen);
    var keyver = b[o + 42], mic = _hex(b, o + 43, 16);
    var macAp = _hex(b, o + 59, 6), nonceAp = _hex(b, o + 65, 32);
    var macSta = _hex(b, o + 97, 6);
    var eapolLen = b[o + 135] | (b[o + 136] << 8), eapol = _hex(b, o + 137, eapolLen);
    var mph = (mp & 0xff).toString(16); if (mph.length < 2) mph = '0' + mph;   // hccapx message_pair -> 22000 messagepair
    // (keyver in b[42] is informational here; hashcat derives it from the EAPOL key-info field)
    return { type: 'wpa', mode: 22000, name: 'WPA EAPOL (from hccapx)', file: null, keyver: keyver,
        hash: 'WPA*02*' + mic + '*' + macAp + '*' + macSta + '*' + essid + '*' + nonceAp + '*' + eapol + '*' + mph };
}
function extractWpa(b, text) {
    var out = [], i;
    if (text != null) {                       // a text hashfile pasted / uploaded
        var lines = text.split(/\r?\n/);
        for (i = 0; i < lines.length; i++) {
            var ln = lines[i].trim();
            if (/^WPA\*(0[12])\*/.test(ln)) out.push({ type: 'wpa', mode: 22000, name: 'WPA (passthrough)', file: null, hash: ln });
            else if (/^[0-9a-fA-F]{32}[:*][0-9a-fA-F]{12}[:*][0-9a-fA-F]{12}[:*][0-9a-fA-F]+$/.test(ln)) {
                var pp = ln.split(/[:*]/);      // PMKID  pmkid:apmac:stamac:essidhex  (16800) -> WPA*01 (22000)
                out.push({ type: 'wpa', mode: 22000, name: 'WPA PMKID', file: null, hash: 'WPA*01*' + pp[0] + '*' + pp[1] + '*' + pp[2] + '*' + pp[3] + '***' });
            }
            else if (/^[0-9a-fA-F]{200,}$/.test(ln) && ln.slice(0, 8).toLowerCase() === '48435058') out.push(_hccapxTo22000(u._hexToBytes(ln), 0));
        }
        if (out.length) return out;
        throw new Error('wpa: no WPA hash lines found in text');
    }
    if (_eq(b, 0, SIG.hccapx)) {              // binary .hccapx (one or more 393-byte records)
        for (i = 0; i + 4 <= b.length && _eq(b, i, SIG.hccapx); i += 393) out.push(_hccapxTo22000(b, i));
        if (out.length) return out;
    }
    throw new Error('wpa: pcap/pcapng parsing not yet implemented — convert with hcxpcapngtool, or pass a .hccapx / .hc22000');
}

// ---------------------------------------------------------------------------
// 7-Zip (11600). Parse the container header -> AES coder (06F1'0701': cost/salt/iv)
// + compression coder (Copy/LZMA/LZMA2/Deflate) + packed stream + unpack size/CRC,
// then emit $7z$type$cost$saltlen$salt$ivlen$iv$crc$datalen$unpacksize$data[$crclen$attr].
// Header may itself be LZMA-encoded (kEncodedHeader) — decoded here (no password: 7z
// only encrypts the header with -mhe, which we don't attempt).
// ---------------------------------------------------------------------------
var _lz = require('./lzma');
function _sl(b, o, n) { var a = [], i; for (i = 0; i < n; i++) a.push(b[o + i]); return a; }
function _Rd(b, p, end) { this.b = b; this.p = p; this.end = end == null ? b.length : end; }
_Rd.prototype.u8 = function () { return this.b[this.p++]; };
_Rd.prototype.take = function (n) { var o = this.p; this.p += n; return o; };
_Rd.prototype.num = function () {              // 7z REAL_UINT64 (variable length)
    var first = this.b[this.p++], mask = 0x80, val = 0, i;
    for (i = 0; i < 8; i++) {
        if ((first & mask) === 0) { val += (first & (mask - 1)) * Math.pow(2, 8 * i); break; }
        val += this.b[this.p++] * Math.pow(2, 8 * i); mask >>= 1;
    }
    return val;
};
function _7zDigests(rd, count, set) {          // bit-vector of defined flags, then UINT32 CRCs
    var all = rd.u8(), def = [], i;
    if (all) { for (i = 0; i < count; i++) def.push(1); }
    else { var mask = 0, bt = 0; for (i = 0; i < count; i++) { if (mask === 0) { bt = rd.u8(); mask = 0x80; } def.push(bt & mask ? 1 : 0); mask >>= 1; } }
    for (i = 0; i < count; i++) if (def[i]) { var o = rd.take(4); set(i, (rd.b[o] | rd.b[o + 1] << 8 | rd.b[o + 2] << 16 | rd.b[o + 3] << 24) >>> 0); }
}
function _7zFolder(rd) {
    var nc = rd.num(), coders = [], tin = 0, tout = 0, i;
    for (i = 0; i < nc; i++) {
        var flag = rd.u8(), idSize = flag & 0x0f, ido = rd.take(idSize);
        var nin = 1, nout = 1;
        if (flag & 0x10) { nin = rd.num(); nout = rd.num(); }
        var props = null;
        if (flag & 0x20) { var ps = rd.num(); props = _sl(rd.b, rd.take(ps), ps); }
        coders.push({ id: _hex(rd.b, ido, idSize), nin: nin, nout: nout, props: props, outBase: tout });
        tin += nin; tout += nout;
    }
    var nbind = tout - 1, bind = [];
    for (i = 0; i < nbind; i++) bind.push({ inx: rd.num(), outx: rd.num() });
    var npack = tin - nbind, packed = [];
    if (npack === 1) { for (i = 0; i < tin; i++) { var used = false, j; for (j = 0; j < bind.length; j++) if (bind[j].inx === i) used = true; if (!used) { packed.push(i); break; } } }
    else for (i = 0; i < npack; i++) packed.push(rd.num());
    return { coders: coders, bind: bind, packed: packed, tout: tout, sizes: [] };
}
function _7zStreamsInfo(rd) {
    var info = { packPos: 0, packSizes: [], folders: [] }, id = rd.u8(), i, t;
    if (id === 0x06) {                          // PackInfo
        info.packPos = rd.num(); var n = rd.num(); t = rd.u8();
        if (t === 0x09) { for (i = 0; i < n; i++) info.packSizes.push(rd.num()); t = rd.u8(); }
        if (t === 0x0a) { _7zDigests(rd, n, function () {}); t = rd.u8(); }
        id = rd.u8();
    }
    if (id === 0x07) {                          // UnpackInfo
        rd.u8();                                // kFolder
        var nf = rd.num(); rd.u8();             // external (0)
        for (i = 0; i < nf; i++) info.folders.push(_7zFolder(rd));
        rd.u8();                                // kCodersUnpackSize
        for (i = 0; i < nf; i++) { var f = info.folders[i]; for (var j = 0; j < f.tout; j++) f.sizes.push(rd.num()); }
        t = rd.u8();
        if (t === 0x0a) { _7zDigests(rd, nf, function (k, c) { info.folders[k].crc = c; }); t = rd.u8(); }
        id = rd.u8();
    }
    if (id === 0x08) {                          // SubStreamsInfo
        t = rd.u8(); var nu = [];
        for (i = 0; i < info.folders.length; i++) nu.push(1);
        if (t === 0x0d) { for (i = 0; i < info.folders.length; i++) nu[i] = rd.num(); t = rd.u8(); }
        if (t === 0x09) { for (i = 0; i < info.folders.length; i++) for (var s = 0; s < nu[i] - 1; s++) rd.num(); t = rd.u8(); }
        if (t === 0x0a) { var need = 0; for (i = 0; i < info.folders.length; i++) need += (info.folders[i].crc == null ? nu[i] : 0); _7zDigests(rd, need, function (k, c) { if (info.folders[k]) info.folders[k].crc = c; }); t = rd.u8(); }
        id = rd.u8();
    }
    return info;
}
function _7zAesProps(p) {
    var b0 = p[0], cost = b0 & 0x3f, salt = [], iv = [];
    if (b0 & 0xc0) { var b1 = p[1], ss = ((b0 >> 7) & 1) + (b1 >> 4), is = ((b0 >> 6) & 1) + (b1 & 0x0f), o = 2; salt = p.slice(o, o + ss); iv = p.slice(o + ss, o + ss + is); }
    return { cost: cost, salt: salt, iv: iv };
}
var _7Z_CODEC = { '00': [0, null], '21': [2, 1], '030101': [1, 5], '040108': [7, null] };  // id -> [dataType, attrLen]
function _7zReadHeader(b) {
    var nho = _u64(b, 12), nhs = _u64(b, 20), hoff = 32 + nho, rd = new _Rd(b, hoff, hoff + nhs);
    var id = rd.u8();
    if (id === 0x17) {                          // kEncodedHeader — decode it (no AES; -mhe not supported)
        var si = _7zStreamsInfo(rd), fo = si.folders[0], packOff = 32 + si.packPos;
        var comp = _sl(b, packOff, si.packSizes[0]), outSize = fo.sizes[fo.sizes.length - 1], c0 = fo.coders[0], plain;
        if (c0.id === '00') plain = comp;
        else if (c0.id === '030101') plain = _lz.lzmaDecode(comp, c0.props, outSize);
        else if (c0.id === '21') plain = _lz.lzma2Decode(comp, c0.props ? c0.props[0] : 0, outSize);
        else throw new Error('7z: unsupported header codec ' + c0.id);
        rd = new _Rd(Uint8Array.from(plain), 0); id = rd.u8();
    }
    if (id !== 0x01) throw new Error('7z: bad header id 0x' + id.toString(16));
    var pid = rd.u8();
    if (pid === 0x02) throw new Error('7z: archive properties not supported');   // rare
    if (pid !== 0x04) throw new Error('7z: expected MainStreamsInfo, got 0x' + pid.toString(16));
    return { b: b, info: _7zStreamsInfo(rd) };
}
function extract7z(b) {
    var h = _7zReadHeader(b), info = h.info, out = [], fi;
    for (fi = 0; fi < info.folders.length; fi++) {
        var f = info.folders[fi], aes = null, aesOut = -1, comp = null, k;
        for (k = 0; k < f.coders.length; k++) {
            if (f.coders[k].id === '06f10701') { aes = _7zAesProps(f.coders[k].props); aesOut = f.coders[k].outBase; }
            else if (_7Z_CODEC[f.coders[k].id]) comp = f.coders[k];
        }
        if (!aes || !comp) continue;
        // packed data offset = 32 + packPos + (sizes of earlier folders' pack streams)
        var packStart = 0, pf; for (pf = 0; pf < fi; pf++) packStart += info.packSizes[pf] || 0;
        var dataOff = 32 + info.packPos + packStart, dataLen = info.packSizes[fi];
        var finalOut = -1, oi; for (oi = 0; oi < f.tout; oi++) { var bound = false, bj; for (bj = 0; bj < f.bind.length; bj++) if (f.bind[bj].outx === oi) bound = true; if (!bound) finalOut = oi; }
        var codec = _7Z_CODEC[comp.id], dataType = codec[0], attrLen = codec[1];
        var crcLen = f.sizes[finalOut], aesOutSize = f.sizes[aesOut];
        var hash = '$7z$' + dataType + '$' + aes.cost + '$' + (aes.salt.length) + '$' + _bytesToHex(aes.salt) +
            '$' + aes.iv.length + '$' + _bytesToHex(aes.iv) + '$' + (f.crc >>> 0) + '$' + dataLen + '$' + aesOutSize +
            '$' + _hex(b, dataOff, dataLen);
        if (dataType !== 0) hash += '$' + crcLen + '$' + _bytesToHex(comp.props ? comp.props.slice(0, attrLen == null ? comp.props.length : attrLen) : []);
        out.push({ type: '7z', mode: 11600, name: '7-Zip', file: null, hash: hash });
    }
    if (!out.length) throw new Error('7z: no AES-encrypted folder found (header-encrypted archives with -mhe are not supported)');
    return out;
}

// ---------------------------------------------------------------------------
// MS Office (9400/9500/9600). Encrypted OOXML is an OLE2/CFB compound file; the
// EncryptionInfo stream holds the key-derivation params + verifier. Agile (2013+)
// is XML, standard (2007/2010) is binary. Emit
// $office$*ver*spinCount*keyBits*saltSize*salt*encVerifier*encVerifierHash.
// ---------------------------------------------------------------------------
function _b64(s) {
    var C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', out = [], buf = 0, bits = 0, i, c;
    for (i = 0; i < s.length; i++) { c = C.indexOf(s.charAt(i)); if (c < 0) continue; buf = (buf << 6) | c; bits += 6; if (bits >= 8) { bits -= 8; out.push((buf >> bits) & 0xff); } }
    return out;
}
function _cfbRead(b) {
    if (!_eq(b, 0, SIG.ole)) throw new Error('office: not an OLE2/CFB file');
    var secShift = _u16(b, 30), miniShift = _u16(b, 32), secSz = 1 << secShift, miniSz = 1 << miniShift;
    var firstDir = _u32(b, 48), miniCut = _u32(b, 56), firstMiniFat = _u32(b, 60), firstDifat = _u32(b, 68);
    var END = 0xfffffffe, FREE = 0xffffffff, i, k;
    var secOff = function (s) { return 512 + s * secSz; };
    var difat = [];
    for (i = 0; i < 109; i++) { var v = _u32(b, 76 + i * 4); if (v < 0xfffffffa) difat.push(v); }
    var ds = firstDifat, g = 0;
    while (ds !== END && ds !== FREE && g++ < 100000) { var base = secOff(ds), cnt = (secSz / 4) - 1; for (i = 0; i < cnt; i++) { var w = _u32(b, base + i * 4); if (w < 0xfffffffa) difat.push(w); } ds = _u32(b, base + cnt * 4); }
    var fat = [];
    for (var f = 0; f < difat.length; f++) { var o = secOff(difat[f]); for (i = 0; i < secSz / 4; i++) fat.push(_u32(b, o + i * 4)); }
    var chain = function (start) { var out = [], s = start, gg = 0; while (s !== END && s !== FREE && s < fat.length && gg++ < 1000000) { out.push(s); s = fat[s]; } return out; };
    var readFat = function (start, size) { var secs = chain(start), bytes = [], j; for (j = 0; j < secs.length; j++) { var oo = secOff(secs[j]); for (k = 0; k < secSz && bytes.length < size; k++) bytes.push(b[oo + k]); } return bytes; };
    var dirBytes = readFat(firstDir, 1 << 30), entries = [], n = Math.floor(dirBytes.length / 128);
    for (i = 0; i < n; i++) {
        var eo = i * 128, nl = _u16(dirBytes, eo + 64), name = '';   // nl counts the UTF-16 null terminator
        for (k = 0; k + 2 < nl && k < 64; k += 2) name += String.fromCharCode(dirBytes[eo + k] | (dirBytes[eo + k + 1] << 8));
        entries.push({ name: name, type: dirBytes[eo + 66], start: _u32(dirBytes, eo + 116), size: _u32(dirBytes, eo + 120) + _u32(dirBytes, eo + 124) * 4294967296 });
    }
    var root = null; for (i = 0; i < entries.length; i++) if (entries[i].type === 5) root = entries[i];
    var miniStream = root ? readFat(root.start, root.size) : [];
    var miniFat = [], mfSecs = chain(firstMiniFat);
    for (i = 0; i < mfSecs.length; i++) { var mo = secOff(mfSecs[i]); for (k = 0; k < secSz / 4; k++) miniFat.push(_u32(b, mo + k * 4)); }
    var readMini = function (start, size) { var s = start, out = [], gg = 0; while (s !== END && s !== FREE && s < miniFat.length && gg++ < 1000000) { var oo = s * miniSz; for (k = 0; k < miniSz && out.length < size; k++) out.push(miniStream[oo + k]); s = miniFat[s]; } return out; };
    return { entries: entries, read: function (e) { return e.size < miniCut ? readMini(e.start, e.size) : readFat(e.start, e.size); } };
}
function extractOffice(b) {
    var cfb = _cfbRead(b), ei = null, i;
    for (i = 0; i < cfb.entries.length; i++) if (cfb.entries[i].name === 'EncryptionInfo') ei = cfb.entries[i];
    if (!ei) throw new Error('office: no EncryptionInfo stream (file not password-encrypted?)');
    var info = cfb.read(ei), major = _u16(info, 0), minor = _u16(info, 2);
    if (major === 4 && minor === 4) {                       // ---- agile (2013+) -> 9600
        var xml = ''; for (i = 8; i < info.length; i++) xml += String.fromCharCode(info[i]);
        var ekM = /<[a-zA-Z0-9]*:?encryptedKey\b[^>]*>/.exec(xml);   // password key encryptor
        var ek = ekM ? ekM[0] : xml;
        var at = function (nm) { var m = new RegExp(nm + '="([^"]*)"').exec(ek); return m ? m[1] : null; };
        var spin = at('spinCount'), keyBits = at('keyBits'), saltSize = at('saltSize');
        var salt = _b64(at('saltValue') || ''), ev = _b64(at('encryptedVerifierHashInput') || ''), eh = _b64(at('encryptedVerifierHashValue') || '');
        if (!spin || !salt.length) throw new Error('office: could not parse agile EncryptionInfo');
        return [{ type: 'office', mode: 9600, name: 'MS Office 2013+', file: null,
            hash: '$office$*2013*' + spin + '*' + keyBits + '*' + saltSize + '*' + _bytesToHex(salt) + '*' + _bytesToHex(ev.slice(0, 16)) + '*' + _bytesToHex(eh.slice(0, 32)) }];
    }
    // ---- standard (2007/2010) binary EncryptionInfo -> 9400 / 9500
    var p = 8, hdrSize = _u32(info, p); p += 4;              // EncryptionHeaderSize
    var hdrStart = p, keySize = _u32(info, hdrStart + 16);   // EncryptionHeader.KeySize
    p += hdrSize;                                            // skip header to EncryptionVerifier
    var saltSz = _u32(info, p); p += 4;
    var salt2 = _sl(info, p, saltSz); p += saltSz;
    var encVer = _sl(info, p, 16); p += 16;
    var vhSize = _u32(info, p); p += 4;
    var encVerHash = _sl(info, p, 32);
    var yr = (major === 4) ? '2010' : '2007', spin2 = (major === 4) ? '100000' : '20';
    return [{ type: 'office', mode: (major === 4) ? 9500 : 9400, name: 'MS Office ' + yr, file: null,
        hash: '$office$*' + yr + '*' + spin2 + '*' + (keySize || 128) + '*' + saltSz + '*' + _bytesToHex(salt2) + '*' + _bytesToHex(encVer) + '*' + _bytesToHex(encVerHash) }];
}

// ---------------------------------------------------------------------------
// RAR. RAR3 -hp (12500): 8-byte salt + a 16-byte known-plaintext block from the
// archive's last 24 bytes (per rar2john). RAR5 (13000): the FHEXTRA_CRYPT record
// in a file/service header -> $rar5$16$salt$lg2$iv$8$pswcheck.
// NOTE: implemented from the rar2john spec; not file-validated here (no RAR writer
// on this machine) — verify against a real .rar before relying on it.
// ---------------------------------------------------------------------------
function _vuint(b, o) { var val = 0, sh = 0, i = o; while (i < b.length) { var c = b[i++]; val += (c & 0x7f) * Math.pow(2, sh); if (!(c & 0x80)) break; sh += 7; } return { val: val, next: i }; }
function _extractRar5(b) {
    var p = 8;                                              // after 8-byte RAR5 signature
    while (p + 5 < b.length) {
        var hs = _vuint(b, p + 4);                          // block: CRC32(4) then HeaderSize vuint
        var hStart = hs.next, hEnd = hStart + hs.val, q = hStart;
        if (hs.val === 0 || hEnd > b.length) break;
        var ht = _vuint(b, q); q = ht.next;                 // HeaderType
        var hf = _vuint(b, q); q = hf.next;                 // HeaderFlags
        var extra = 0, dataSz = 0, t;
        if (hf.val & 0x01) { t = _vuint(b, q); extra = t.val; q = t.next; }   // has extra area
        if (hf.val & 0x02) { t = _vuint(b, q); dataSz = t.val; q = t.next; }  // has data
        if (ht.val === 2 || ht.val === 3) {                 // HEAD_FILE / HEAD_SERVICE -> scan extra area
            var ep = hEnd - extra;
            while (ep < hEnd) {
                var fs = _vuint(b, ep), fEnd = fs.next + fs.val, ftt = _vuint(b, fs.next);
                if (ftt.val === 1) {                        // FHEXTRA_CRYPT
                    var r = ftt.next;
                    r = _vuint(b, r).next;                  // EncVersion
                    var flg = _vuint(b, r); r = flg.next;   // Flags
                    var lg2 = b[r]; r += 1;                 // Lg2Count
                    var salt = _hex(b, r, 16); r += 16;
                    var iv = _hex(b, r, 16); r += 16;
                    var psw = _hex(b, r, 8);
                    if (!(flg.val & 0x01)) throw new Error('rar5: archive has no password check (PSWCHECK off) — unsupported');
                    return [{ type: 'rar', mode: 13000, name: 'RAR5', file: null, hash: '$rar5$16$' + salt + '$' + lg2 + '$' + iv + '$8$' + psw }];
                }
                ep = fEnd;
            }
        }
        p = hEnd + dataSz;
    }
    throw new Error('rar5: no FHEXTRA_CRYPT record found (archive not encrypted, or -p with PSWCHECK off)');
}
function extractRar(b) {
    if (_eq(b, 0, SIG.rar5)) return _extractRar5(b);
    if (!_eq(b, 0, SIG.rar4)) throw new Error('rar: not a RAR archive');
    var flags = _u16(b, 10);                                // RAR3 main header flags (crc@7, type@9=0x73, flags@10)
    if (b[9] === 0x73 && (flags & 0x0080)) {                // MHD_PASSWORD -> -hp header-encrypted (12500)
        if (b.length < 24) throw new Error('rar3: file too short');
        return [{ type: 'rar', mode: 12500, name: 'RAR3 (-hp)', file: null,
            hash: '$RAR3$*0*' + _hex(b, b.length - 24, 8) + '*' + _hex(b, b.length - 16, 16) }];
    }
    throw new Error('rar3: only -hp (header-encrypted) archives are supported; use `rar a -hp`, or RAR5');
}

// ---------------------------------------------------------------------------
// dispatcher
// ---------------------------------------------------------------------------
var HINTS = {
    zip: 'zip', winzip: 'zip', pkzip: 'zip',
    '7z': '7z', sevenzip: '7z', '7zip': '7z',
    rar: 'rar', rar3: 'rar', rar5: 'rar',
    office: 'office', docx: 'office', doc: 'office', xlsx: 'office', ooxml: 'office',
    wpa: 'wpa', wifi: 'wpa', hccapx: 'wpa', pmkid: 'wpa', pcap: 'wpa'
};
var RUN = { zip: extractZip, '7z': extract7z, rar: extractRar, office: extractOffice, wpa: extractWpa };

function extract(input, typeHint) {
    // text input (hash lines) only makes sense for WPA passthrough
    if (typeof input === 'string' && !/[\x00]/.test(input) && /WPA\*|:/.test(input) && !/^\$/.test(input)) {
        var fmtT = typeHint ? HINTS[String(typeHint).toLowerCase()] : 'wpa';
        if (fmtT === 'wpa') return extractWpa(null, input);
    }
    var b = _toU8(input);
    if (typeHint) {
        var fmt = HINTS[String(typeHint).toLowerCase()];
        if (!fmt) throw new Error('extract: unknown type "' + typeHint + '" (try zip/7z/rar/office/wpa)');
        return RUN[fmt](b);
    }
    var d = detect(b);
    if (!d) throw new Error('extract: unrecognized file format (magic ' + _hex(b, 0, Math.min(8, b.length)) + ')');
    return RUN[d](b);
}

module.exports = {
    extract: extract, detect: detect,
    extractZip: extractZip, extract7z: extract7z, extractRar: extractRar, extractOffice: extractOffice, extractWpa: extractWpa,
    _toU8: _toU8
};
