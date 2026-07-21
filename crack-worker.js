/* crack-js — dictionary-attack worker.
 * One instance = one background cracking task. The main thread posts
 *   { mode, words:[...], hashes:[...] }
 * and receives a stream of:
 *   { type:'hit',      hash, password }
 *   { type:'progress', tried, total, hps, cracked }
 *   { type:'done',     tried, total, cracked }
 *
 * hps = verifyHash operations per second (true candidate-hash rate).
 * Loaded over http(s) (e.g. GitHub Pages); importScripts resolves the
 * bundle relative to this worker's own URL.
 */
importScripts('dist/crack.js');
var C = self.crack;

self.onmessage = function (e) {
  var d = e.data || {};
  var mode = d.mode;
  var words = d.words || [];
  var remaining = (d.hashes || []).slice();   // still-uncracked targets
  var total = words.length;
  var startCount = remaining.length;
  var tried = 0, ops = 0, t0 = Date.now(), last = 0;

  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    for (var j = remaining.length - 1; j >= 0; j--) {
      ops++;
      var ok = false;
      try { ok = C.verifyHash(w, remaining[j], mode); } catch (_) {}
      if (ok) {
        self.postMessage({ type: 'hit', hash: remaining[j], password: w });
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
