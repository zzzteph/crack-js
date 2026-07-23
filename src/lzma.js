// Pure-JS LZMA decoder (LZMA1 + the LZMA2 chunk wrapper) — enough to decompress
// 7-Zip AES streams (mode 11600, data_type 1 = LZMA1, 2 = LZMA2). Input/output are
// plain byte arrays. Validated against streams produced by Python's `lzma` module.
//
// lzmaDecode(input, props5, outLen)   props5 = [lclppb, dictSize x4]  -> Uint8Array
// lzma2Decode(input, dictByte, outLen)                                -> Uint8Array

function makeLzma(lc, lp, pb) {
  var STATES = 12;
  function np(n) { var a = new Uint16Array(n); for (var i = 0; i < n; i++) a[i] = 1024; return a; }
  return {
    lc: lc, lp: lp, pb: pb,
    IsMatch: np(STATES << 4), IsRep: np(STATES), IsRepG0: np(STATES), IsRepG1: np(STATES), IsRepG2: np(STATES),
    IsRep0Long: np(STATES << 4), PosSlot: np(4 * 64), SpecPos: np(128), Align: np(16), Lit: np(0x300 << (lc + lp)),
    LenC: { c: np(2), lo: np(16 * 8), mi: np(16 * 8), hi: np(256) },
    RepLenC: { c: np(2), lo: np(16 * 8), mi: np(16 * 8), hi: np(256) },
    state: 0, r0: 0, r1: 0, r2: 0, r3: 0
  };
}

// Decode LZMA symbols into `out` starting at `op`, up to `limit`. `S` holds the
// (resettable) probability model + state + rep distances; the range decoder reads
// from `input` at `ipRef` (mutated). Returns the new output position.
function lzmaRun(S, input, ipRef, out, op, limit) {
  var lc = S.lc, lp = S.lp, pb = S.pb;
  var ip = ipRef.ip;
  function rd() { return ip < input.length ? (input[ip++] & 0xff) : 0; }
  var range = 0xFFFFFFFF >>> 0, code = 0;
  rd();
  for (var z = 0; z < 4; z++) code = ((code << 8) | rd()) >>> 0;
  function norm() { if ((range >>> 0) < 0x1000000) { range = (range << 8) >>> 0; code = ((code << 8) | rd()) >>> 0; } }
  function bit(P, i) {
    var p = P[i], bound = ((range >>> 11) * p) >>> 0, s;
    if ((code >>> 0) < (bound >>> 0)) { range = bound; P[i] = p + ((2048 - p) >>> 5); s = 0; }
    else { code = (code - bound) >>> 0; range = (range - bound) >>> 0; P[i] = p - (p >>> 5); s = 1; }
    norm(); return s;
  }
  function direct(n) { var r = 0; do { range = (range >>> 1) >>> 0; code = (code - range) >>> 0; var t = 0 - (code >>> 31); code = (code + (range & t)) >>> 0; norm(); r = ((r << 1) + (t + 1)) >>> 0; } while (--n); return r >>> 0; }
  function tree(P, off, n) { var m = 1; for (var i = 0; i < n; i++) m = (m << 1) + bit(P, off + m); return m - (1 << n); }
  function treeRev(P, off, n) { var m = 1, s = 0; for (var i = 0; i < n; i++) { var b = bit(P, off + m); m = (m << 1) + b; s |= b << i; } return s; }
  function len(L, ps) { if (bit(L.c, 0) === 0) return tree(L.lo, ps << 3, 3); if (bit(L.c, 1) === 0) return 8 + tree(L.mi, ps << 3, 3); return 16 + tree(L.hi, 0, 8); }

  var psMask = (1 << pb) - 1, lpMask = (1 << lp) - 1;
  var state = S.state, r0 = S.r0, r1 = S.r1, r2 = S.r2, r3 = S.r3;
  while (op < limit) {
    var ps = op & psMask;
    if (bit(S.IsMatch, (state << 4) + ps) === 0) {
      var prev = op > 0 ? out[op - 1] : 0;
      var litState = ((op & lpMask) << lc) + (prev >>> (8 - lc));
      var off = 0x300 * litState, sym = 1;
      if (state >= 7) {
        var mb = out[op - r0 - 1];
        do { var matchBit = (mb >> 7) & 1; mb = (mb << 1) & 0xff; var b = bit(S.Lit, off + ((1 + matchBit) << 8) + sym); sym = (sym << 1) | b; if (matchBit !== b) break; } while (sym < 0x100);
      }
      while (sym < 0x100) sym = (sym << 1) | bit(S.Lit, off + sym);
      out[op++] = sym & 0xff;
      state = state < 4 ? 0 : state < 10 ? state - 3 : state - 6;
    } else {
      var Ln;
      if (bit(S.IsRep, state) === 1) {
        if (bit(S.IsRepG0, state) === 0) {
          if (bit(S.IsRep0Long, (state << 4) + ps) === 0) { state = state < 7 ? 9 : 11; out[op] = out[op - r0 - 1]; op++; continue; }
        } else {
          var dist;
          if (bit(S.IsRepG1, state) === 0) dist = r1;
          else { if (bit(S.IsRepG2, state) === 0) dist = r2; else { dist = r3; r3 = r2; } r2 = r1; }
          r1 = r0; r0 = dist;
        }
        Ln = len(S.RepLenC, ps) + 2; state = state < 7 ? 8 : 11;
      } else {
        r3 = r2; r2 = r1; r1 = r0;
        Ln = len(S.LenC, ps) + 2; state = state < 7 ? 7 : 10;
        var lps = (Ln - 2) < 4 ? (Ln - 2) : 3;
        var slot = tree(S.PosSlot, lps << 6, 6);
        if (slot < 4) r0 = slot;
        else {
          var nd = (slot >> 1) - 1;
          r0 = ((2 | (slot & 1)) << nd) >>> 0;
          if (slot < 14) r0 = (r0 + treeRev(S.SpecPos, r0 - slot - 1, nd)) >>> 0;
          else { r0 = (r0 + (direct(nd - 4) << 4)) >>> 0; r0 = (r0 + treeRev(S.Align, 0, 4)) >>> 0; }
        }
        if ((r0 >>> 0) === 0xFFFFFFFF) break;
      }
      for (var k = 0; k < Ln && op < limit; k++) { out[op] = out[op - r0 - 1]; op++; }
    }
  }
  S.state = state; S.r0 = r0; S.r1 = r1; S.r2 = r2; S.r3 = r3;
  ipRef.ip = ip;
  return op;
}

function lzmaDecode(input, props, outLen) {
  var d = props[0] & 0xff, lc = d % 9; d = (d - lc) / 9;
  var lp = d % 5, pb = (d - lp) / 5;
  var S = makeLzma(lc, lp, pb);
  var out = new Uint8Array(outLen);
  lzmaRun(S, input, { ip: 0 }, out, 0, outLen);
  return out;
}

// LZMA2: stream of chunks. control 0x00=end; 0x01/0x02=uncompressed (reset/no);
// 0x80..0xFF=LZMA chunk (bits: reset mode, 21-bit unpacked size, then packed size,
// optional props byte). Dictionary (out) persists across chunks.
function lzma2Decode(input, dictByte, outLen) {
  var out = new Uint8Array(outLen), op = 0, ip = 0;
  var S = null;
  function u8() { return input[ip++] & 0xff; }
  while (op < outLen && ip < input.length) {
    var ctrl = u8();
    if (ctrl === 0) break;
    if (ctrl < 3) {                                  // uncompressed chunk (1=reset dict, 2=no reset)
      var usize = ((u8() << 8) | u8()) + 1;
      for (var i = 0; i < usize; i++) out[op++] = u8();
      if (S) { S.state = 0; S.r0 = S.r1 = S.r2 = S.r3 = 0; }   // dict continuity kept via `out`
    } else if (ctrl >= 0x80) {
      var unpackSize = (((ctrl & 0x1f) << 16) | (u8() << 8) | u8()) + 1;
      var packSize = ((u8() << 8) | u8()) + 1;
      var reset = (ctrl >> 5) & 3;                   // 0 none,1 state,2 state+props,3 state+props+dict
      if (reset >= 2) {
        var p = u8(), lc = p % 9; p = (p - lc) / 9; var lp = p % 5, pb = (p - lp) / 5;
        S = makeLzma(lc, lp, pb);
      } else if (reset >= 1) { S = makeLzma(S.lc, S.lp, S.pb); }   // reset probs+state, keep props+dict
      var ref = { ip: ip };
      op = lzmaRun(S, input, ref, out, op, op + unpackSize);
      ip += packSize;                                // advance past this chunk's packed bytes
    } else return out;
  }
  return out;
}

module.exports = { lzmaDecode: lzmaDecode, lzma2Decode: lzma2Decode };
