// 7-Zip AES (mode 11600).
//   key = SHA-256 over 2^cost iterations of ( salt || pw_utf16le || u64le(counter) ).
//   AES-256-CBC decrypt the data, then decompress by data_type and CRC32-check:
//     0 = stored (Copy)   1 = LZMA1   2 = LZMA2   7 = DEFLATE
//   hash = $7z$type$cost$saltlen$salt$ivlen$iv$crc$datalen$unpacksize$data[$crclen$coderattr]
//   (crc is DECIMAL; coder_attr is 5 bytes for LZMA1, 1 byte for LZMA2.)
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToHex = u._bytesToHex, _bytesToWA = u._bytesToWA, _hexToBytes = u._hexToBytes;
var _lzma = require('./lzma');
var _inflate = require('./inflate').inflateRaw;
var _crc32 = require('./rar').crc32;

function _u16le(s) { var b = [], i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); b.push(c & 0xff, (c >> 8) & 0xff); } return b; }

function sevenzipKey(password, saltBytes, cost) {
  var rounds = Math.pow(2, cost);
  var pwWA = _bytesToWA(_u16le(String(password)));
  var saltWA = saltBytes.length ? _bytesToWA(saltBytes) : null;
  var sha = CryptoJS.algo.SHA256.create();
  for (var i = 0; i < rounds; i++) {
    if (saltWA) sha.update(saltWA);
    sha.update(pwWA);
    sha.update(_bytesToWA([i & 0xff, (i >>> 8) & 0xff, (i >>> 16) & 0xff, (i >>> 24) & 0xff, 0, 0, 0, 0]));
  }
  return sha.finalize();   // WordArray (32-byte AES-256 key)
}

function _decompress(dataType, dec, coderAttr, crcLen) {
  if (dataType === 0) return dec;
  if (dataType === 1) return _lzma.lzmaDecode(dec, coderAttr, crcLen);
  if (dataType === 2) return _lzma.lzma2Decode(dec, coderAttr ? coderAttr[0] : 0, crcLen);
  if (dataType === 7) return _inflate(dec, crcLen);
  return null;
}

function verify7z(password, hash) {
  var s = String(hash).trim();
  if (s.slice(0, 4) !== '$7z$') return false;
  var f = s.slice(4).split('$');
  if (f.length < 10) return false;
  var dataType = parseInt(f[0], 10), cost = parseInt(f[1], 10);
  var salt = _hexToBytes(f[3]);
  var crc = parseInt(f[6], 10) >>> 0;
  var dataLen = parseInt(f[7], 10), unpackSize = parseInt(f[8], 10);
  var data = _hexToBytes(f[9]);
  if (data.length !== dataLen || dataLen === 0 || dataLen % 16 !== 0) return false;
  var crcLen = f.length > 10 ? parseInt(f[10], 10) : unpackSize;
  var coderAttr = f.length > 11 ? _hexToBytes(f[11]) : null;
  var iv = _hexToBytes(f[5]); while (iv.length < 16) iv.push(0); iv = iv.slice(0, 16);
  var key = sevenzipKey(password, salt, cost);
  var dec = _waToBytes(CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: _bytesToWA(data) }),
    key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(iv) }));
  var plain, n = (dataType === 0) ? unpackSize : crcLen;
  try { plain = _decompress(dataType, dec, coderAttr, crcLen); } catch (e) { return false; }
  if (!plain) return false;
  var out = [], i;
  for (i = 0; i < n && i < plain.length; i++) out.push(plain[i]);
  return (_crc32(out) >>> 0) === crc;
}

// Build a valid 7z hash (used to generate + for round-trip tests): AES-encrypt a
// (pre-compressed) body under the password's key.
function build7z(password, opts) {
  var cost = opts.cost || 14;
  var iv = (opts.iv || []).slice(); while (iv.length < 16) iv.push(0); iv = iv.slice(0, 16);
  var comp = opts.comp.slice(); var packedLen = comp.length;
  while (comp.length % 16 !== 0) comp.push(0);
  var key = sevenzipKey(password, [], cost);
  var enc = _waToBytes(CryptoJS.AES.encrypt(_bytesToWA(comp), key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding, iv: _bytesToWA(iv) }).ciphertext);
  var h = '$7z$' + opts.dataType + '$' + cost + '$0$$16$' + _bytesToHex(iv) + '$' + ((opts.crc >>> 0)) + '$' + enc.length + '$' + packedLen + '$' + _bytesToHex(enc);
  if (opts.dataType !== 0) h += '$' + opts.crcLen + '$' + _bytesToHex(opts.coderAttr);
  return h;
}

// Generate a valid (stored-codec) 7z hash for a password — deterministic, re-verifiable,
// and crackable by hashcat. Full LZMA/LZMA2/DEFLATE archives are supported by verify7z.
function gen7z(password, plaintextBytes, ivBytes) {
  return build7z(password, { dataType: 0, comp: plaintextBytes.slice(), crc: _crc32(plaintextBytes) >>> 0, iv: (ivBytes || []).slice() });
}

module.exports = { verify7z: verify7z, sevenzipKey: sevenzipKey, build7z: build7z, gen7z: gen7z };
