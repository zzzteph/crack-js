/* crack-js — dictionary-attack worker.
 * One instance = one background cracking task. The main thread posts
 *   { words:[...], items:[ { hash, types:[...] }, ... ] }
 * where each item carries the candidate hash-types to try for that hash:
 *   - explicit mode  -> types = [ the chosen mode ]
 *   - auto-detect    -> types = getPossibleHashTypes(hash)  (every format match)
 *
 * For each candidate word it tries every type of every still-uncracked hash and
 * STOPS on the first type that verifies — that type is the answer for that hash.
 * It receives back a stream of:
 *   { type:'hit',      hash, password, mode }   // mode = the type that matched
 *   { type:'progress', tried, total, hps, cracked }
 *   { type:'done',     tried, total, cracked }
 *
 * hps = verifyHash operations per second (true candidate-hash rate).
 * Loaded over http(s); importScripts resolves the bundle relative to this file.
 */
importScripts('dist/crack.js');
var C = self.crack;

self.onmessage = function (e) {
  var d = e.data || {};
  var words = d.words || [];
  var remaining = (d.items || []).slice();   // [{ hash, types:[...] }] — still uncracked
  var total = words.length;
  var startCount = remaining.length;
  var tried = 0, ops = 0, t0 = Date.now(), last = 0;

  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    for (var j = remaining.length - 1; j >= 0; j--) {
      var it = remaining[j], hitType = null;
      for (var k = 0; k < it.types.length; k++) {   // try each possible type…
        ops++;
        try {
          if (C.verifyHash(w, it.hash, it.types[k])) { hitType = it.types[k]; break; }  // …stop on the one that matches
        } catch (_) {}
      }
      if (hitType !== null) {
        self.postMessage({ type: 'hit', hash: it.hash, password: w, mode: hitType });
        remaining.splice(j, 1);
      }
    }
    tried++;

    var now = Date.now();
    if (now - last > 100 || i === words.length - 1) {
      var secs = (now - t0) / 1000;
      self.postMessage({
        type: 'progress',
        tried: tried, total: total,
        hps: secs > 0 ? Math.round(ops / secs) : ops,
        cracked: startCount - remaining.length
      });
      last = now;
    }
    if (!remaining.length) break;            // everything cracked — stop early
  }

  self.postMessage({ type: 'done', tried: tried, total: total, cracked: startCount - remaining.length });
};
