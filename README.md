# crack-js

A pure-JavaScript library for **verifying, identifying, generating, and benchmarking hashes in hashcat mode format** — 330 hash types, entirely client-side, with **crypto-js** as the only runtime dependency.

- **330** hash modes supported (verify + identify) · **289** with generators · **192** single-shot
- Runs in Node **and** the browser from a single UMD build (`dist/crack.js`)
- No network and no native code — pure JS + crypto-js (includes hand-written Keccak, BLAKE2, scrypt, Argon2, secp256k1, and an LZMA/LZMA2 decoder for 7-Zip)

## Install

```bash
npm install crack-js
```

```js
const crack = require('crack-js');
```

In the browser:

```html
<script src="dist/crack.js"></script>
<script>/* window.crack is now available */</script>
```

An interactive demo — speed benchmark, hash identifier, generator, file→hash extractor, and a Web-Worker **crack** tab (wordlist, wordlist + rules, bruteforce, and **mask** attacks, plus chained workflows) — is in **`index.html`**.

## Functions

| Function | Description |
|---|---|
| `generateHash(hashType, input, params?)` | Generate a hash for `input` in the given mode (number or name). Optional `params` (salt, iterations, …) are defaulted when omitted. Returns the hash string, or `null` for verify-only modes. |
| `verifyHash(input, hash, hashType)` | `true` if `input` produces `hash` under the given mode. |
| `getPossibleHashTypes(hash)` | Identify a hash: array of type names whose format matches. |
| `isValidHash(hash, hashType)` | Whether `hash` is a structurally valid string for the type. |
| `isFast(hashType)` | Whether the type is a single-shot (unsalted/fast) hash. |
| `measureSpeed(hashType, durationMs = 5000)` | Benchmark calculation throughput in hashes/second (default 5-second test). |
| `getExample(hashType)` | The official hashcat `{ password, hash }` example vector for the type. |

### Exported data

| Export | Description |
|---|---|
| `availableHashTypes` | Array of all 330 type names. |
| `hashTypes` | Array of `{ mode, modes, name, names, fast, generatable }` per type. |
| `generatableModes` | Array of the 289 mode numbers that have a generator. |
| `modeInfo` | Map of `{ mode: name }`. |

### Example

```js
const crack = require('crack-js');

crack.generateHash(0, 'hello');   // md5  -> '5d41402abc4b2a76b9719d911017c592'
crack.verifyHash('hello', '5d41402abc4b2a76b9719d911017c592', 0);   // true
crack.getPossibleHashTypes('5f4dcc3b5aa765d61d8327deb882cf99');      // ['md5', 'md4', 'ntlm', ...]
crack.measureSpeed('md5');        // hashes/sec, 5-second test
```

## Attacks — mask & bruteforce

Beyond one-shot `verifyHash`, the library ships lazy **candidate generators** and one-call **attack wrappers** (hashcat `-a 3`). *Bruteforce* walks a single charset over a length range; a *mask* fixes the characters you already know and varies only the rest — so every known character shrinks the search space by a whole factor. `fkaskgr?l?l?l?l?l?l?l?l` searches 26⁸ (the eight-character lowercase tail), not 26¹⁵.

| Function | Description |
|---|---|
| `crackMask(hash, hashType, mask, customs?, opts?)` | Try every candidate a mask expands to; return the matching password, or `null`. |
| `crackBruteforce(hash, hashType, charset, min, max, opts?)` | Try every string over `charset` of length `min…max`; return the match, or `null`. |
| `crackWordlist(hash, hashType, words, opts?)` | Try each word in an array; return the match, or `null`. |
| `crackRules(hash, hashType, words, rules, apply, opts?)` | Wordlist + rules. `apply(word, rule) => string` plugs in a rule engine (not bundled — it's UI-only, e.g. [hashcat-rules-js](https://github.com/zzzteph/hashcat-rules-js) `applyRule`); returns the match, or `null`. |
| `maskCandidates(mask, customs?)` | Lazy generator yielding every candidate a mask produces. |
| `bruteforceCandidates(charset, min, max)` | Lazy generator yielding every string over `charset` of length `min…max`. |
| `parseMask(mask, customs?)` | The mask compiled to an array of per-position charset strings (throws on a bad token). |
| `maskKeyspace(mask, customs?)` · `bruteforceKeyspace(charset, min, max)` | Candidate count (may be `Infinity`). |

`opts`: `{ limit, onProgress(tried, lastCandidate), progressEvery = 50000 }`. The generators are lazy, so a billion-candidate keyspace uses no memory and the wrappers stop the instant a candidate verifies.

**Mask tokens** — `?l` a–z · `?u` A–Z · `?d` 0–9 · `?s` symbols · `?a` = `?l?u?d?s` · `?h` 0–9a–f · `?H` 0–9A–F · `?b` 00–ff · `?1`–`?4` custom sets · `??` a literal `?`; every other character is a literal. Custom sets are passed as `{ 1: '?l?d' }` or `['?l?d']` (index 0 = `?1`) and may nest built-in tokens.

```js
const crack = require('crack-js');

// You know the first 7 characters; brute-force an 8-char lowercase tail (NTLM):
crack.crackMask('8be71fadca0f8edd5ff2603bd442c578', 1000, 'fkaskgr?l?l?l?l?l?l?l?l');

// Shaped by a policy — Capital + 5 lowercase + 2 digits + a symbol (SHA-256):
crack.crackMask(hash, 1400, '?u?l?l?l?l?l?d?d?s');

// Known prefix, then a 3-digit build number (SHA-1):
crack.crackMask(hash, 100, 'S3cur3-?d?d?d');                    // keyspace 1000

// Custom charsets — leet only where you'd expect it (MD5): ?1 = a|@|4, ?2 = d
crack.crackMask(hash, 0, 'p?1ss?2', { 1: 'a@4', 2: 'd' });     // keyspace 3

// A 4–6 digit PIN, a plain wordlist, and wordlist + rules:
crack.crackBruteforce(hash, 1000, '0123456789', 4, 6);         // NTLM PIN
crack.crackWordlist(hash, 100, ['correct horse', 'battery staple']);                    // SHA-1
crack.crackRules(hash, 0, ['summer', 'autumn'], [':', 'c', '$1$9', 'so0'], applyRule);  // + rule engine

// Size any space up front (keyspace = exact BigInt; maskKeyspace = quick Number):
crack.keyspace({ type: 'bruteforce', charset: '0123456789', min: 4, max: 8 });   // 111110000n
crack.maskKeyspace('company?d?d?d?d');                                            // 10000

// …or drive the lazy generator yourself:
for (const pw of crack.maskCandidates('logon-?h?h?h?h')) { /* 4 hex chars */ }
```

### Distributed cracking (keyspace & slicing)

To split one job across many machines, describe the attack as a **spec** and give each node a disjoint slice of the keyspace — hashcat's `--keyspace` + `-s`/`-l` model, in pure JS.

```js
{ type: 'wordlist',   words: [...] }
{ type: 'rules',      words: [...], rules: [...], apply }   // apply = (word, rule) => string
{ type: 'mask',       mask: '?l?l?d?d', customs }
{ type: 'bruteforce', charset: 'abc…', min: 1, max: 8 }
```

| Function | Description |
|---|---|
| `keyspace(spec)` | Total candidate count as a **BigInt** — exact for spaces far beyond 2⁵³ (e.g. `?a?a?a?a?a?a?a?a?a` = 95⁹). |
| `partition(spec \| total, nodes)` | Split `[0, N)` into `nodes` contiguous `{ index, skip, limit }` ranges (BigInts). Their union is exactly the whole space — no gaps, no overlap. |
| `attackCandidates(spec, { skip, limit })` | Lazy generator of one slice. It **seeks** to `skip` in O(length) — never walking the skipped candidates — so a node starts instantly however deep its offset. |
| `candidateAt(spec, index)` | The `index`-th candidate (0-based; BigInt/number/string). Random access for checkpoint / resume. |

Every `crack*` wrapper also accepts `{ skip, limit }`, so a worker cracks only its range:

```js
const crack = require('crack-js');
const spec = { type: 'mask', mask: '?u?l?l?l?l?l?d?d' };       // Capital + 5 lowercase + 2 digits

crack.keyspace(spec);                                          // 30891577600n  (~3.1e10)
const ranges = crack.partition(spec, 16);                      // 16 workers
// [ {index:0, skip:0n, limit:1930723600n}, {index:1, skip:1930723600n, limit:1930723600n}, … ]

// worker #7 cracks ONLY its slice (bcrypt); exactly one worker finds it, none overlap:
const r = ranges[7];
const found = crack.crackMask(hash, 3200, '?u?l?l?l?l?l?d?d', undefined, { skip: r.skip, limit: r.limit });
```

**Huge / "unlimited" masks.** `?a?a?a?a?a?a?a?a?a` is 95⁹ ≈ 6.3 × 10¹⁷ candidates — finite, but far past what a JS number holds exactly (2⁵³) and beyond any single machine. `keyspace()` returns a BigInt so the count and every `skip`/`limit` stay exact; generators are lazy so nothing is materialized; you only ever run the slices you carve out (set a per-node `limit` or time budget). `maskKeyspace()` stays a `Number` for quick UI estimates and may report `Infinity` for extreme masks — use `keyspace()` whenever the value must be exact.

**How fast is the skip?** Seeking to an offset is `O(mask length)` — a handful of BigInt divisions — so it costs the same whether you jump to candidate #5 or #630,000,000,000,000,000. Measured on one core of the dev host:

| Operation | Time |
|---|---|
| Seek to **any** offset in `?a`×9 (95⁹ ≈ 6.3 × 10¹⁷) — offset 0, N/2, N−1, or random | **~2 µs** |
| Seek in `?a`×20 (95²⁰) | ~9 µs |
| Seek in `?b`×130 (256¹³⁰ — a 314-digit index) | ~80 µs |
| `partition()` + seek the start of all 10,000 node slices | ~41 ms |
| Candidate **generation** (odometer walk, no hashing) | ~3.3 M/s |
| Candidate **testing** (NTLM `verifyHash`) | ~48 K/s |

```js
const spec = { type: 'mask', mask: '?a'.repeat(9) };   // 95^9 ≈ 6.3e17 candidates
crack.keyspace(spec);                                  // 630249409724609375n
crack.candidateAt(spec, 315124704862304687n);          // the exact middle candidate — in ~2µs, no walking
crack.attackCandidates(spec, { skip: 315124704862304687n, limit: 1000 });  // a node's slice, seeked instantly
```

Reaching that middle offset the naïve way (enumerating at ~3.3 M/s) would take ~6,000 years; seeking there takes ~2 µs. And since generation outruns hashing ~70× (3.3 M/s vs ~48 K/s for NTLM), the seek and the walk are effectively free — a node's real cost is hashing the candidates in its slice, so throughput scales with the number of nodes.

**Wordlists too big for memory (2 GB+).** `crackWordlist`/`crackRules` take an in-memory array — fine to a point, but a multi-GB dictionary won't fit. For those, shard the *file* by byte range with the Node-only helper `src/wordlist-fs.js` (not part of the browser bundle): each node seeks to its byte window, snaps to the next line, and streams until the window ends — every line covered exactly once, constant memory, no line index or counting pass.

```js
const fs = require('fs');
const crack = require('crack-js');
const { byteShards, streamShardLines } = require('crack-js/src/wordlist-fs');

const shards = byteShards(fs.statSync('rockyou-2gb.txt').size, NODES);   // one byte range per node
// on node i — constant memory, whatever the file size:
for await (const word of streamShardLines('rockyou-2gb.txt', shards[i].start, shards[i].end))
  if (crack.verifyHash(word, hash, mode)) return word;
```

## Supported hash modes

`✅` marks modes with a generator (`generateHash`); all 330 can be verified and identified. Examples are hashcat’s own test vectors (long ones truncated).

| Mode | Name | Gen | Example |
|--:|---|:-:|---|
| 0 | `md5` | ✅ | `8743b52063cd84097a65d1633f5c74f5` |
| 10 | `md5-pass-salt` | ✅ | `01dfae6e5d4d90d9892622325959afbe:7050461` |
| 11 | `joomla` | ✅ | `b78f863f2c67410c41e617f724e22f34:89384528665349271307465505333378` |
| 20 | `md5-salt-pass` | ✅ | `f0fda58630310a6dd91a7d8f0a4ceda2:4225637426` |
| 21 | `oscommerce` | ✅ | `e983672a03adcc9767b24584338eb378:00` |
| 23 | `skype` | ✅ | `d04d74780881019341915c70d914db29:0675841` |
| 30 | `md5-utf16le-pass-salt` | ✅ | `b31d032cfdcf47a399990a71e43c5d2a:144816` |
| 40 | `md5-salt-utf16le-pass` | ✅ | `d63d0e21fdc05f618d55ef306c54af82:13288442151473` |
| 50 | `hmac-md5-pass` | ✅ | `e28e4e37e972a945e464b5226053bac0:40` |
| 60 | `hmac-md5` | ✅ | `bfd280436f45fa38eaacac3b00518f29:1234` |
| 70 | `md5-utf16le` | ✅ | `2303b15bfa48c74a74758135a0df1201` |
| 100 | `sha1` | ✅ | `b89eaac7e61417341b710b727768294d0e6a277b` |
| 101 | `nsldap` | ✅ | `{SHA}uJ6qx+YUFzQbcQtyd2gpTQ5qJ3s=` |
| 110 | `sha1-pass-salt` | ✅ | `2fc5a684737ce1bf7b3b239df432416e0dd07357:2014` |
| 111 | `nsldaps` | ✅ | `{SSHA}FLzWcQqyle6Mo7NvrwXCMAmRzXQxNjYxMTYzNw==` |
| 112 | `oracle-11-sha1` | ✅ | `63ec5f6113843f5d229e2d49c068d983a9670d02:57677783202322766743` |
| 120 | `sha1-salt-pass` | ✅ | `cac35ec206d868b7d7cb0b55f31d9425b075082b:5363620024` |
| 121 | `smf` | ✅ | `d27c0a627a45db487af161fcc3a4005d88eb8a1f:25551135` |
| 124 | `django-sha1` | ✅ | `sha1$fe76b$02d5916550edf7fc8c886f044887f4b1abf9b013` |
| 130 | `sha1-utf16le-pass-salt` | ✅ | `c57f6ac1b71f45a07dbd91a59fa47c23abcd87c2:631225` |
| 131 | `mssql-2000` | ✅ | `0x0100778883860000000000000000000000000000000000000000eda3604e067a06…` |
| 132 | `mssql-2005` | ✅ | `0x010045083578bf13a6e30ca29c40e540813772754d54a5ffd325` |
| 133 | `peoplesoft` | ✅ | `uXmFVrdBvv293L9kDR3VnRmx4ZM=` |
| 140 | `sha1-salt-utf16le-pass` | ✅ | `5db61e4cd8776c7969cfd62456da639a4c87683a:8763434884872` |
| 150 | `hmac-sha1-pass` | ✅ | `02b256705348a28b1d6c0f063907979f7e0c82f8:10323` |
| 160 | `hmac-sha1` | ✅ | `d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234` |
| 170 | `sha1-utf16le` | ✅ | `b9798556b741befdbddcbf640d1dd59d19b1e193` |
| 200 | `mysql323` | ✅ | `7196759210defdc0` |
| 300 | `mysql41` | ✅ | `fcf7c1b8749cf99d88e5f34271d636178fb5d130` |
| 400 | `phpass` | ✅ | `$P$946647711V1klyitUYhtB8Yw5DMA/w.` |
| 500 | `md5crypt` | ✅ | `$1$28772684$iEwNOgGugqO9.bIz5sk8k/` |
| 501 | `juniper-ive` | ✅ | `3u+UR6n8AgABAAAAHxxdXKmiOmUoqKnZlf8lTOhlPYy93EAkbPfs5+49YLFd/B1+omSK…` |
| 600 | `blake2b-512` | ✅ | `$BLAKE2$296c269e70ac5f0095e6fb47693480f0f7b97ccd0307f5c3bfa4df8f5ca5…` |
| 610 | `blake2b-512-pass-salt` | ✅ | `$BLAKE2$41fcd44c789c735c08b43a871b81c8f617ca43918d38aee6cf8291c58a0b…` |
| 620 | `blake2b-512-salt-pass` | ✅ | `$BLAKE2$f0325fdfc3f82a014935442f7adbc069d4636d67276a85b09f8de368f122…` |
| 900 | `md4` | ✅ | `afe04867ec7a3845145579a95f72eca7` |
| 1000 | `ntlm` | ✅ | `b4b9b02e6f09a9bd760f388b67351e2b` |
| 1100 | `dcc` | ✅ | `c896b3c6963e03c86ade3a38370bbb09:54161084332` |
| 1300 | `sha224` | ✅ | `e4fa1555ad877bf0ec455483371867200eee89550a93eff2f95a6198` |
| 1310 | `sha224-pass-salt` | ✅ | `0cf361904f4b0234cf4ade8496d8c11c04e5982db967603e82f22b2f:89452466460…` |
| 1320 | `sha224-salt-pass` | ✅ | `4258a61d3d0d5a5b6796f0ab02d081e998fe657d55d22091d3b51409:36669207` |
| 1400 | `sha256` | ✅ | `127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935` |
| 1410 | `sha256-pass-salt` | ✅ | `c73d08de890479518ed60cf670d17faa26a4a71f995c1dcc978165399401a6c4:537…` |
| 1411 | `ssha-256` | ✅ | `{SSHA256}L5Wk0zPY2lmoR5pH20zngq37KkxFwgTquEhx95rxfVk3Ng==` |
| 1420 | `sha256-salt-pass` | ✅ | `eb368a2dfd38b405f014118c7d9747fcc97f4f0ee75c05963cd9da6ee65ef498:560…` |
| 1430 | `sha256-utf16le-pass-salt` | ✅ | `4cc8eb60476c33edac52b5a7548c2c50ef0f9e31ce656c6f4b213f901bc87421:890…` |
| 1440 | `sha256-salt-utf16le-pass` | ✅ | `a4bd99e1e0aba51814e81388badb23ecc560312c4324b2018ea76393ea1caca9:123…` |
| 1450 | `hmac-sha256-pass` | ✅ | `b435ffbacea34d5eb0dbc4d69a92f0152f2cf4cd364d34c2ece322ca22d8b334:212…` |
| 1460 | `hmac-sha256` | ✅ | `8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:123…` |
| 1470 | `sha256-utf16le` | ✅ | `9e9283e633f4a7a42d3abc93701155be8afe5660da24c8758e7d3533e2f2dc82` |
| 1500 | `descrypt` | ✅ | `24leDr0hHfb3A` |
| 1600 | `apr1-md5` | ✅ | `$apr1$62722340$zGjeAwVP2KwY6MtumUI1N/` |
| 1700 | `sha512` | ✅ | `82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9…` |
| 1710 | `sha512-pass-salt` | ✅ | `e5c3ede3e49fb86592fb03f471c35ba13e8d89b8ab65142c9a8fdafb635fa2223c24…` |
| 1711 | `ssha-512` | ✅ | `{SSHA512}Bz8w5q6qEtB1Nnc8b1jfTvTXVTwohWag33oghQGOtLChnkZTw/cuJaHQlLJ…` |
| 1720 | `sha512-salt-pass` | ✅ | `976b451818634a1e2acba682da3fd6efa72adf8a7a08d7939550c244b237c72c7d42…` |
| 1730 | `sha512-utf16le-pass-salt` | ✅ | `13070359002b6fbb3d28e50fba55efcf3d7cc115fe6e3f6c98bf0e3210f1c6923427…` |
| 1731 | `mssql-2012` | ✅ | `0x02003788006711b2e74e7d8cb4be96b1d187c962c5591a02d5a6ae81b3a4a094b2…` |
| 1740 | `sha512-salt-utf16le-pass` | ✅ | `bae3a3358b3459c761a3ed40d34022f0609a02d90a0d7274610b16147e58ece00cd8…` |
| 1750 | `hmac-sha512-pass` | ✅ | `138c00f17a1a0363f274817c91118f019aff09f937bfdaea844280a0c0e7811267cc…` |
| 1760 | `hmac-sha512` | ✅ | `7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3…` |
| 1770 | `sha512-utf16le` | ✅ | `79bba09eb9354412d0f2c037c22a777b8bf549ab12d49b77d5b25faa839e4378d8f6…` |
| 1800 | `sha512crypt` | ✅ | `$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2Xzz…` |
| 2100 | `dcc2` | ✅ | `$DCC2$10240#6848#e2829c8af2232fa53797e2f0e35e4626` |
| 2400 | `cisco-pix-md5` | ✅ | `dRRVnUmUHXOTt9nk` |
| 2410 | `cisco-asa-md5` | ✅ | `YjDBNr.A0AN7DA8s:4684` |
| 2500 | `wpa-eapol-pbkdf2` |  | `48435058040000000002353800000000000000000000000000000000000000000000…` |
| 2501 | `wpa-eapol-pmk` |  | `48435058040000000002353800000000000000000000000000000000000000000000…` |
| 2600 | `md5-md5` | ✅ | `a936af92b0ae20b1ff6c3347a72e5fbe` |
| 2611 | `vbulletin-lt-385` | ✅ | `28f9975808ae2bdc5847b1cda26033ea:308` |
| 2612 | `phps` | ✅ | `$PHPS$30353031383437363132$f02b0b2f25e5754edb04522c346ba243` |
| 2630 | `md5-md5-pass-salt` | ✅ | `0127eecea3120e34c8934ba3b72a390a:0` |
| 2711 | `vbulletin-gte-385` | ✅ | `0844fbb2fdeda31884a7a45ec2010bb6:324410183853308365427804872426` |
| 2811 | `mybb` | ✅ | `022f7e02b3314f7d0968f73c00ba759f:67588` |
| 3000 | `lm` | ✅ | `299bd128c1101fd6` |
| 3200 | `bcrypt` | ✅ | `$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6` |
| 3500 | `md5-md5-md5` | ✅ | `9882d0778518b095917eb589f6998441` |
| 3610 | `md5-md5-md5-pass-salt` | ✅ | `a0ab79f9e2b5a4434d2da61673b56362:1234` |
| 3710 | `md5-salt-md5pass` | ✅ | `a3aa0ae2b4a102a9974cdf40edeabee0:242812778074` |
| 3711 | `mediawiki-b` | ✅ | `$B$2152187716$8c8b39c3602b194eeeb6cac78eea2742` |
| 3800 | `md5-salt-pass-salt` | ✅ | `78274b1105fb8a7c415b43ffe35ec4a9:6` |
| 3910 | `md5-md5pass-md5salt` | ✅ | `d8281daba5da597503d12fe31808b4a7:283053` |
| 4010 | `md5-salt-md5-salt-pass` | ✅ | `82422514daaa8253be0aa43f3e263af5:7530326651137` |
| 4110 | `md5-salt-md5-pass-salt` | ✅ | `45b1005214e2d9472a7ad681578b2438:64268771004` |
| 4300 | `md5-uc-md5` | ✅ | `b8c385461bb9f9d733d3af832cf60b27` |
| 4400 | `md5-sha1` | ✅ | `288496df99b33f8f75a7ce4837d1b480` |
| 4410 | `md5-sha1pass-salt` | ✅ | `bc8319c0220bff8a0d7f5d703114a725:34659348756345251` |
| 4420 | `md5-sha1-pass-salt` | ✅ | `34ebbba3e5c98f6253c160eae53da092:6224378456121050285` |
| 4430 | `md5-sha1-salt-pass` | ✅ | `df0e9ede5b6c7d1f1b47199f86029002:59132809201799180722359939692710461…` |
| 4500 | `sha1-sha1` | ✅ | `3db9184f5da4e463832b086211af8d2314919951` |
| 4510 | `sha1-sha1pass-salt` | ✅ | `9138d472fce6fe50e2a32da4eec4ecdc8860f4d5:hashcat1` |
| 4520 | `sha1-salt-sha1-pass` | ✅ | `59b80a295392eedb677ca377ad7bf3487928df96:136472340404074825440760227…` |
| 4521 | `redmine` | ✅ | `c18e826af2a78c7b9b7261452613233417e65817:282465357206884527234834757…` |
| 4522 | `punbb` | ✅ | `9038129c474caa3f0de56f38db84033d0fe1d4b8:365563602032` |
| 4700 | `sha1-md5` | ✅ | `92d85978d884eb1d99a51652b1139c8279fa8663` |
| 4710 | `sha1-md5pass-salt` | ✅ | `53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1` |
| 4711 | `huawei-sha1-md5pass-salt` | ✅ | `53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1` |
| 4800 | `iscsi-chap-md5` | ✅ | `aa4aaa1d52319525023c06a4873f4c51:35343534373533343633383832343736:dc` |
| 4900 | `sha1-salt-pass-salt` | ✅ | `75d280ca9a0c2ee18729603104ead576d9ca6285:347070` |
| 5000 | `sha1-sha1-salt-pass-salt` | ✅ | `05ac0c544060af48f993f9c3cdf2fc03937ea35b:232725102020` |
| 5100 | `half-md5` | ✅ | `8743b52063cd8409` |
| 5300 | `ike-psk-md5` | ✅ | `50503326cac6e4bd892b8257805b5a59a285f464ad3f63dc01bd0335f8341ef52e00…` |
| 5400 | `ike-psk-sha1` | ✅ | `266b43c54636c062b6696b71f24b30999c98bd4c3ba57e2de56a7ae50bb17ebcbca1…` |
| 5500 | `netntlmv1` | ✅ | `::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5d…` |
| 5600 | `netntlmv2` | ✅ | `admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:…` |
| 5700 | `cisco-ios-sha256` | ✅ | `2btjjy78REtmYkkW0csHUbJZOstRXoWdX1mGrmmfeHI` |
| 5720 | `cisco-ise-sha256` | ✅ | `465865d4226c4d9696e601f2c99b25ae2c194ec01806bafc93933331acfc1a60e8bd…` |
| 5800 | `samsung-android-pin` | ✅ | `3edde1eb9e6679ccbc1ff3c417e8a475a2d2e279:7724368582277760` |
| 6000 | `ripemd160` | ✅ | `012cb9b334ec1aeb71a9c8ce85586082467f7eb6` |
| 6050 | `hmac-ripemd160-pass` | ✅ | `4f5edca01734e03dd7e735362625a76e6bcb61b2:52355614946067` |
| 6060 | `hmac-ripemd160-salt` | ✅ | `34d8e55a2ae1e9549a291326ce2f0a8dcdc75c5c:08523202563542341` |
| 6100 | `whirlpool` | ✅ | `7ca8eaaaa15eaa4c038b4c47b9313e92da827c06940e69947f85bc0fbef3eb8fd254…` |
| 6300 | `aix-smd5` | ✅ | `{smd5}17800721$WkGka7tXcrfpUQS6WOQyw/` |
| 7000 | `fortigate` | ✅ | `AK1FCIhM0IUIQVFJgcDFwLCMi7GppdwtRzMyDpFOFxdpH8=` |
| 7100 | `macos-pbkdf2-sha512` | ✅ | `$ml$1024$24843807311321316245062714671621235760770048781243652038377…` |
| 7200 | `grub2-pbkdf2-sha512` | ✅ | `grub.pbkdf2.sha512.1024.03510507805003756325721848020561235456073188…` |
| 7300 | `ipmi2-rakp-sha1` | ✅ | `34373437353333363838313532323234333833333032363033373333383632323031…` |
| 7350 | `ipmi2-rakp-md5` | ✅ | `08b017f3628b9835c748521e412429c9:f3450000df540000cdd981b0b3441be8774…` |
| 7400 | `sha256crypt` | ✅ | `$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV…` |
| 7401 | `mysql-sha256crypt` | ✅ | `$mysql$A$005*F9CC98CE08892924F50A213B6BC571A2C11778C5*62547939355939…` |
| 7500 | `krb5pa-23` | ✅ | `$krb5pa$23$user$realm$salt$5cbb0c882a2b26956e81644edbdb746326f4f5f0e…` |
| 7700 | `sap-codvn-b` |  | `027642760180$77EC38630C08DF8D` |
| 7800 | `sap-codvn-fg` |  | `604020408266$32837BA7B97672BA4E5AC74767A4E6E1AE802651` |
| 8000 | `sybase-ase` | ✅ | `0xc0071808773188715731b69bd4e310b4129913aaf657356c5bdf3c46f249ed4247…` |
| 8100 | `citrix-netscaler-sha1` | ✅ | `1130725275da09ca13254957f2314a639818d44c37ef6d558` |
| 8300 | `dnssec-nsec3` | ✅ | `pi6a89u8tca930h8mvolklmesefc5gmn:.fnmlbsik.net:35537886:1` |
| 8400 | `wbb3` | ✅ | `7f8d1951fe48ae3266980c2979c141f60e4415e5:503786476415388651787142660…` |
| 8900 | `scrypt` | ✅ | `SCRYPT:16384:8:1:OTEyNzU0ODg=:Cc8SPjRH1hFQhuIPCdF51uNGtJ2aOY/isuoMlM…` |
| 9200 | `cisco-ios-pbkdf2-sha256` | ✅ | `$8$84486783037343$pYNyVrtyMalQrZLxRi7ZLQS1Fl.jkYCgASUi5P8JNb2` |
| 9300 | `cisco-ios-scrypt` | ✅ | `$9$87023684531115$phio0TBQwaO7KZ8toQFyGFyDvyOzidaypRWN0uKX0hU` |
| 9900 | `radmin2` | ✅ | `22527bee5c29ce95373c4e0f359f079b` |
| 10000 | `django-pbkdf2-sha256` | ✅ | `pbkdf2_sha256$10000$1135411628$bFYX62rfJobJ07VwrUMXfuffLfj2RDM2G6/Br…` |
| 10100 | `siphash` | ✅ | `583e6f51e52ba296:2:4:47356410265714355482333327356688` |
| 10200 | `cram-md5` | ✅ | `$cram_md5$MTI=$dXNlciBiOGYwNjk5MTE0YjA1Nzg4OTIyM2RmMDg0ZjgyMjQ2Zg==` |
| 10300 | `sap-codvn-h-issha1` | ✅ | `{x-issha, 1024}BnjXMqcNTwa3BzdnUOf1iAu6dw02NzU4MzE2MTA=` |
| 10800 | `sha384` | ✅ | `07371af1ca1fca7c6941d2399f3610f1e392c56c6d73fddffe38f18c430a2817028d…` |
| 10810 | `sha384-pass-salt` | ✅ | `ca1c843a7a336234baf9db2e10bc38824ce523402fbd7741286b1602bdf6cb869a45…` |
| 10820 | `sha384-salt-pass` | ✅ | `63f63d7f82d4a4cb6b9ff37a6bc7c5ec39faaf9c9078551f5cbf7960e76ded87b643…` |
| 10830 | `sha384-utf16le-pass-salt` | ✅ | `3516a589d2ed4071bf5e36f22e11212b3ad9050b9094b23067103d51e99dcb25c4dc…` |
| 10840 | `sha384-salt-utf16le-pass` | ✅ | `316e93ea8e04de3e5a909c53d36923a31a16c1b9e89b44201d6082f87ca49c5bca53…` |
| 10870 | `sha384-utf16le` | ✅ | `48e61d68e93027fae35d405ed16cd01b6f1ae66267833b4a7aa1759e45bab9bba652…` |
| 10900 | `pbkdf2-hmac-sha256` | ✅ | `sha256:1000:NjI3MDM3:vVfavLQL9ZWjg8BUMq6/FB8FtpkIGWYk` |
| 10901 | `redhat-389-ds-pbkdf2` | ✅ | `{PBKDF2_SHA256}AAAgADkxMjM2NTIzMzgzMjQ3MjI4MDAwNTk5OTAyOTk4NDI2MjkyM…` |
| 11000 | `prestashop` | ✅ | `f22cade043e7214200206dbffca49fd9:27167508161455764247627144160038845…` |
| 11100 | `postgresql-cram-md5` | ✅ | `$postgres$postgres*74402844*4e7fabaaf34d780c4a5822d28ee1c83e` |
| 11200 | `mysql-cram-sha1` | ✅ | `$mysqlna$2576670568531371763643101056213751754328*5e4be686a3149a1284…` |
| 11300 | `bitcoin-wallet-dat` | ✅ | `$bitcoin$96$c265931309b4a59307921cf054b4ec6b6e4554369be79802e94e1647…` |
| 11600 | `7zip` | ✅ | `$7z$0$14$0$$11$33363437353138333138300000000000$2365089182$16$12$d00…` |
| 11900 | `pbkdf2-hmac-md5` | ✅ | `md5:1000:NjAxMDY4MQ==:a00DtIW9hP9voC85fmEA5uVhgdDx67nSPSm9yADHjkI=` |
| 12000 | `pbkdf2-hmac-sha1` | ✅ | `sha1:1000:MTYwNTM4MDU4Mzc4MzA=:aGghFQBtQ8+WVlMk5GEaMw==` |
| 12100 | `pbkdf2-hmac-sha512` | ✅ | `sha512:1000:NzY2:DNWohLbdIWIt4Npk9gpTvA==` |
| 12150 | `apache-shiro1-sha512` | ✅ | `$shiro1$SHA-512$1024$WobJGSjbUhsMdaILomMOdw==$9uptGJ24vzZCqZI55F77N7…` |
| 12300 | `oracle-t-pbkdf2` | ✅ | `8F75FBD166AFDB6D7587DAB89C2F15672AAC031C5B0B5E65C0835FB130555F6FF4E0…` |
| 12400 | `bsdi-crypt` |  | `_GW..8841inaTltazRsQ` |
| 12500 | `rar3hp` |  | `$RAR3$*0*45109af8ab5f297a*adbf6c5385d7a40373e8f77d7b89d317` |
| 12600 | `coldfusion-10` | ✅ | `3f3473a071b1fb955544e80c81853ca0f1e4f9ee4ca3bf4d2a8a10b5ef5be1f6:605…` |
| 12700 | `blockchain-my-wallet` | ✅ | `$blockchain$288$713253722114000682636604801283547365b7a53a802a7388d0…` |
| 12800 | `ms-azuresync-pbkdf2` | ✅ | `v1;PPH1_MD4,54188415275183448824,100,55b530f052a9af79a7ba9c466dddcb8…` |
| 13000 | `rar5` |  | `$rar5$16$38466361001011015181344360681307$15$00000000000000000000000…` |
| 13100 | `krb5tgs-23` | ✅ | `$krb5tgs$23$*user$realm$test/spn*$b548e10f5694ae018d7ad63c257af7dc$3…` |
| 13500 | `peoplesoft-ps-token` | ✅ | `24eea51b53d02b4c5ff99bcb05a6847fdb2d9308:4f10a0de76e242040c28e9d3dd1…` |
| 13600 | `winzip` | ✅ | `$zip2$*0*1*0*0675369741458183*5dc5*0**36b85538918416712640*$/zip2$` |
| 13900 | `opencart` | ✅ | `058c1c3773340c8563421e2b17e60eb7c916787e:827500576` |
| 14000 | `des-ecb` | ✅ | `53b325182924b356:1412781058343178` |
| 14100 | `3des-ede-ecb` | ✅ | `4c29eea59d8db1e7:7428288455525516` |
| 14900 | `skip32` | ✅ | `7090b6b9:04223875` |
| 15000 | `filezilla-server` | ✅ | `bfa9fe5a404faff8b0d200385e26b783a163e475869336029d3ebaccaf02b5f16e49…` |
| 15100 | `sha1crypt` | ✅ | `$sha1$20000$75552156$HhYMDdaEHiK3eMIzTldOFPnw.s2Q` |
| 15200 | `blockchain-my-wallet-v2` | ✅ | `$blockchain$v2$5000$288$324724252428471806184866704068819419467b2b32…` |
| 15400 | `chacha20` | ✅ | `$chacha20$*0400000000000003*16*0200000000000001*5152535455565758*6b0…` |
| 15600 | `ethereum-pbkdf2` | ✅ | `$ethereum$p*1024*38353131353831333338313138363430*a8b4dfe92687dbc0af…` |
| 15700 | `ethereum-scrypt` |  | `$ethereum$s*262144*8*1*313431383733343433383830323133363337343332363…` |
| 16000 | `tripcode` | ✅ | `pfaRCwDe0U` |
| 16100 | `tacacs-plus` | ✅ | `$tacacs-plus$0$5fde8e68$4e13e8fb33df$c006` |
| 16300 | `ethereum-presale` | ✅ | `$ethereum$w*e94a8e49deac2d62206bf9bfb7d2aaea7eb06c1a378cfc1ac056cc59…` |
| 16500 | `jwt` | ✅ | `eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFC…` |
| 16600 | `electrum-salt1` | ✅ | `$electrum$1*44358283104603165383613672586868*c43a6632d9f59364f74c395…` |
| 16800 | `wpa-pmkid-pbkdf2` | ✅ | `2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4:ed4871624…` |
| 16801 | `wpa-pmkid-pmk` |  | `2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4` |
| 17200 | `pkzip-compressed` | ✅ | `$pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3…` |
| 17210 | `pkzip-uncompressed` | ✅ | `$pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9f…` |
| 17220 | `pkzip-multi-compressed` | ✅ | `$pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49…` |
| 17225 | `pkzip-multi-mixed` | ✅ | `$pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056e…` |
| 17300 | `sha3-224` | ✅ | `412ef78534ba6ab0e9b1607d3e9767a25c1ea9d5e83176b4c2817a6c` |
| 17400 | `sha3-256` | ✅ | `d60fcf6585da4e17224f58858970f0ed5ab042c3916b76b0b828e62eaf636cbd` |
| 17500 | `sha3-384` | ✅ | `983ba28532cc6320d04f20fa485bcedb38bddb666eca5f1e5aa279ff1c6244fe5f83…` |
| 17600 | `sha3-512` | ✅ | `7c2dc1d743735d4e069f3bda85b1b7e9172033dfdd8cd599ca094ef8570f3930c3f2…` |
| 17700 | `keccak-224` | ✅ | `e1dfad9bafeae6ef15f5bbb16cf4c26f09f5f1e7870581962fc84636` |
| 17800 | `keccak-256` | ✅ | `203f88777f18bb4ee1226627b547808f38d90d3e106262b5de9ca943b57137b6` |
| 17900 | `keccak-384` | ✅ | `5804b7ada5806ba79540100e9a7ef493654ff2a21d94d4f2ce4bf69abda5d94bf037…` |
| 18000 | `keccak-512` | ✅ | `2fbf5c9080f0a704de2e915ba8fdae6ab00bbc026b2c1c8fa07da1239381c6b7f4df…` |
| 18200 | `krb5asrep-23` | ✅ | `$krb5asrep$23$user@domain.com:3e156ada591263b8aab0965f5aebd837$00749…` |
| 18500 | `sha1-md5-md5` | ✅ | `888a2ffcb3854fba0321110c5d0d434ad1aa2880` |
| 18700 | `java-object-hashcode` | ✅ | `29937c08` |
| 18800 | `blockchain-second-password` | ✅ | `YnM6WYERjJfhxwepT7zV6odWoEUz1X4esYQb4bQ3KZ7bbZAyOTc1MDM3OTc1NjMyODA0…` |
| 19000 | `qnx-md5` | ✅ | `@m@75f6f129f9c9e77b6b1b78f791ed764a@8741857532330050` |
| 19100 | `qnx-sha256` | ✅ | `@s@0b365cab7e17ee1e7e1a90078501cc1aa85888d6da34e2f5b04f5c614b882a93@…` |
| 19200 | `qnx-sha512` | ✅ | `@S@715df9e94c097805dd1e13c6a40f331d02ce589765a2100ec7435e76b978d5efc…` |
| 19300 | `sha1-salt1-pass-salt2` | ✅ | `630d2e918ab98e5fad9c61c0e4697654c4c16d73:184638128768986034208354201…` |
| 19500 | `rails-restful-auth` | ✅ | `d7d5ea3e09391da412b653ae6c8d7431ec273ea2:238769868762:89627835565276…` |
| 19600 | `krb5tgs-17` |  | `$krb5tgs$17$srv_http$synacktiv.local$849e31b3db1c1f203fa20b85$948690…` |
| 19700 | `krb5tgs-18` |  | `$krb5tgs$18$srv_http$synacktiv.local$16ce51f6eba20c8ee534ff8a$57d07b…` |
| 19800 | `krb5pa-17` |  | `$krb5pa$17$hashcat$HASHCATDOMAIN.COM$a17776abe5383236c58582f515843e0…` |
| 19900 | `krb5pa-18` |  | `$krb5pa$18$hashcat$HASHCATDOMAIN.COM$96c289009b05181bfd32062962740b1…` |
| 20200 | `passlib-pbkdf2-sha512` | ✅ | `$pbkdf2-sha512$25000$LyWE0HrP2RsjZCxlDGFMKQ$1vC5Ohk2mCS9b6akqsEfgeb4…` |
| 20300 | `passlib-pbkdf2-sha256` | ✅ | `$pbkdf2-sha256$29000$x9h7j/Ge8x6DMEao1VqrdQ$kra3R1wEnY8mPdDWOpTqOTIN…` |
| 20400 | `passlib-pbkdf2-sha1` | ✅ | `$pbkdf2$131000$r5WythYixPgfQ2jt3buXcg$8Kdr.QQEOaZIXNOrrru36I/.6Po` |
| 20710 | `sha256-sha256pass-salt` | ✅ | `bfede293ecf6539211a7305ea218b9f3f608953130405cda9eaba6fb6250f824:721…` |
| 20711 | `authme-sha256` | ✅ | `$SHA$7218532375810603$bfede293ecf6539211a7305ea218b9f3f608953130405c…` |
| 20712 | `netwitness-sha256` | ✅ | `6F48F44C46F5ADC534597687B086278F0AAF7D262ADDB3978562A7D55BBDF467:MDA…` |
| 20720 | `sha256-salt-sha256pass` | ✅ | `bae9edada8358fcebcd811f7d362f46277fb9d488379869fba65d79701d48b8b:869…` |
| 20730 | `sha256-sha256-pass-salt` | ✅ | `ad66bdc0841d7e08d96c03de271ce14e77de078746b535adbf9d4b6ccbf2a517:721…` |
| 20800 | `sha256-md5` | ✅ | `74ee1fae245edd6f27bf36efc3604942479fceefbadab5dc5c0b538c196eb0f1` |
| 20900 | `md5-sha1-md5-sha1-pass` | ✅ | `100b3a4fc1dc8d60d9bf40688d8b740a` |
| 21000 | `bitshares-v0` | ✅ | `caec04bdf7c17f763a9ec7439f7c9abda112f1bfc9b1bb684fef9b6142636979b989…` |
| 21100 | `sha1-md5-pass-salt` | ✅ | `aade80a61c6e3cd3cac614f47c1991e0a87dd028:6` |
| 21200 | `md5-sha1salt-md5pass` | ✅ | `e69b7a7fe1bf2ad9ef116f79551ee919:baa038987e582431a6d` |
| 21300 | `md5-salt-sha1-salt-pass` | ✅ | `799dc7d9aa4d3f404cc21a4936dbdcde:68617368636174` |
| 21310 | `md5-salt1-sha1-salt2-pass` | ✅ | `dc91b5a658ef4b7d859e90742f340e24:708237:d270e9eea5802e346bcaa9b229f3…` |
| 21400 | `sha256-sha256bin-pass` | ✅ | `0cc1b58a543f372327aa0281e97ab56e345267ee46feabf7709515debb7ec43c` |
| 21420 | `sha256-salt-sha256bin-pass` | ✅ | `5934ea4d670c13a71155faba42056b2525f71bdc9215d31108990c11bf3d98e3:926…` |
| 21500 | `solarwinds-orion` | ✅ | `$solarwinds$0$admin$fj4EBQewCQUZ7IYHl0qL8uj9kQSBb3m7N4u0crkKK0Uj9rbb…` |
| 21501 | `solarwinds-orion-v2` | ✅ | `$solarwinds$1$3pHkk55NTYpAeV3EJjcAww==$N4Ii2PxXX/bTZZwslQLIKrp0wvfZ5…` |
| 21600 | `web2py-pbkdf2-sha512` | ✅ | `pbkdf2(1000,20,sha512)$744943$c5f8cdef76e3327c908d8d96d4abdb3d8caba1…` |
| 21700 | `electrum-salt4` |  | `$electrum$4*03eae309d8bda5dcbddaae8145469193152763894b7260a6c4ba181b…` |
| 21800 | `electrum-salt5` |  | `$electrum$5*02170fee7c35f1ef3b229edc90fbd0793b688a0d6f41137a97aab234…` |
| 21900 | `md5-md5-md5-pass-salt1-salt2` | ✅ | `2c749af6c65cf3e82e5837e3056727f5:59331674906582121215362940957615121…` |
| 22000 | `wpa-pbkdf2-pmkid` | ✅ | `WPA*01*4d4fe7aac3a2cecab195321ceb99a7d0*fc690c158264*f4747f87f9f4*68…` |
| 22001 | `wpa-pmk-pmkid+eapol` |  | `WPA*01*5ce7ebe97a1bbfeb2822ae627b726d5b*27462da350ac*accd10fb464e*68…` |
| 22200 | `citrix-netscaler-sha512` | ✅ | `2f9282ade42ce148175dc3b4d8b5916dae5211eee49886c3f7cc768f6b9f2eb982a5…` |
| 22300 | `sha256-salt-pass-salt` | ✅ | `755a8ce4e0cf0baee41d714aa35c9fca803106608f718f973eab006578285007:112…` |
| 22301 | `telegram-passcode` | ✅ | `$telegram$0*518c001aeb3b4ae96c6173be4cebe60a85f67b1e087b045935849e2f…` |
| 22400 | `aescrypt-sha256` | ✅ | `$aescrypt$1*efc648908ca7ec727f37f3316dfd885c*eff5c87a35545406a57b56d…` |
| 22500 | `multibit-classic-md5` |  | `$multibit$1*e5912fe5c84af3d5*5f0391c219e8ef62c06505b1f6232858f5bcaa7…` |
| 22700 | `multibit-hd-scrypt` |  | `$multibit$2*2e311aa2cc5ec99f7073cacc8a2d1938*e3ad782e7f92d66a3cdfaec…` |
| 22800 | `simpla-md5-salt-pass-md5pass` | ✅ | `86d173f13213d1e48bce9647bdc306d5:8e86a279d6e182b3c811c559e6b15484` |
| 23001 | `securezip-aes128` | ✅ | `$zip3$*0*1*128*0*b4630625c92b6e7848f6fd86*df2f62611b3d02d2c7e05a48da…` |
| 23002 | `securezip-aes192` | ✅ | `$zip3$*0*1*192*0*53ff2de8c280778e1e0ab997*603eb37dbab9ea109e2c405e37…` |
| 23003 | `securezip-aes256` | ✅ | `$zip3$*0*1*256*0*39bff47df6152a0214d7a967*65ff418ffb3b1198cccdef0327…` |
| 23400 | `bitwarden` | ✅ | `$bitwarden$2*100000*2*bm9yZXBseUBoYXNoY2F0Lm5ldA==*+v5rHxYydSRUDlan+…` |
| 23700 | `rar3p-uncompressed` |  | `$RAR3$*1*e54a73729887cb53*49b0a846*16*14*1*34620bcca8176642a210b1051…` |
| 24300 | `sha1-salt-sha1-pass-salt` | ✅ | `94520b02c04e79e08a75a84c2a6e3ed4e3874fe8:ThisIsATestSalt` |
| 24800 | `umbraco-hmac-sha1` | ✅ | `8uigXlGMNI7BzwLCJlDbcKR2FP4=` |
| 25500 | `stellar-wallet-xlm` | ✅ | `$stellar$YAlIJziURRcBEWUwRSRDWA==$EutMmmcV5Hbf3p1I$rfSAF349RvGKG4R4Z…` |
| 25600 | `bcrypt-md5` | ✅ | `$2a$05$/VT2Xs2dMd8GJKfrXhjYP.DkTjOVrY12yDN7/6I8ZV0q/1lEohLru` |
| 25700 | `murmurhash` | ✅ | `b69e7687:05094309` |
| 25800 | `bcrypt-sha1` | ✅ | `$2a$05$Uo385Fa0g86uUXHwZxB90.qMMdRFExaXePGka4WGFv.86I45AEjmO` |
| 25900 | `knx-ip-secure` |  | `$knx-ip-secure-device-authentication-code$*3033*fa7c0d787a9467c209f0…` |
| 26300 | `fortigate256` | ✅ | `SH2lpcpFXM5QRlWYwY5vL9+5svfYyb+c79qENpxEoB3NtZpVxKwHjuq/9TH88U=` |
| 26401 | `aes-128-ecb-nokdf` | ✅ | `e7a32f3210455cc044f26117c4612aab:86046627772965328523223752173724` |
| 26402 | `aes-192-ecb-nokdf` | ✅ | `2995e91b798ef51232a91579edb1d176:49869364034411376791729962721320` |
| 26403 | `aes-256-ecb-nokdf` | ✅ | `264a4248c9522cb74d33fe26cb596895:61270210011294880287232432636227` |
| 26600 | `metamask` | ✅ | `$metamask$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2CQ5BEj…` |
| 26610 | `metamask-short` | ✅ | `$metamask-short$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2…` |
| 27000 | `netntlmv1-nt` |  | `::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5d…` |
| 27100 | `netntlmv2-nt` |  | `0UL5G37JOI0SX::6VB1IS0KA74:ebe1afa18b7fbfa6:aab8bf8675658dd2a939458a…` |
| 27200 | `rails-restful-auth-1round` | ✅ | `3999d08db95797891ec77f07223ca81bf43e1be2:5dcc47b04c49d3c8e1b9e4ec367…` |
| 27700 | `multibit-classic-scrypt` |  | `$multibit$3*16384*8*1*7523cb5482e81b81*91780fd49b81a782ab840157a69ba…` |
| 27800 | `murmurhash3` | ✅ | `23e93f65:00000000` |
| 27900 | `crc32c` | ✅ | `5e23d60f:00000000` |
| 28000 | `crc64jones` | ✅ | `65c1f848fe38cce6:4260950400318054` |
| 28200 | `exodus-scrypt-gcm` |  | `EXODUS:16384:8:1:IYkXZgFETRmFp4wQXyP8XMe3LtuOw8wMdLcBVQ+9YWE=:lq0W9e…` |
| 28400 | `bcrypt-sha512` | ✅ | `$2a$12$KhivLhCuLhSyMBOxLxCyLu78x4z2X/EJdZNfS3Gy36fvRt56P2jbS` |
| 28501 | `bitcoin-wif-p2pkh-compressed` |  | `1Jv6EonXm9x4Dw4QjEPAhGfmzFxTL7b3Zj` |
| 28502 | `bitcoin-wif-p2pkh-uncompressed` |  | `1L9nr4GX4Zmd7gDL1UT75QPUqxSgNTvdHb` |
| 28503 | `bitcoin-wif-p2wpkh-compressed` |  | `bc1qxd76a5zamfyw0g2d2rxkdh0zt9m0uzmxmwjf0q` |
| 28504 | `bitcoin-wif-p2wpkh-uncompressed` |  | `bc1qv8e65p73gmp4w3z6fqnyu8t6ct69vetsda3snd` |
| 28505 | `bitcoin-wif-p2sh-p2wpkh-compressed` |  | `3H1YvmSdrjEfj9LvtiKJ8XiYq5htJRuejA` |
| 28506 | `bitcoin-wif-p2sh-p2wpkh-uncompressed` |  | `3LovFVx5zBRvusVcj7pf3JxV9V46kjKhKu` |
| 28700 | `aws-sig-v4` | ✅ | `$AWS-Sig-v4$0$20220221T000000Z$us-east-1$s3$421ab6e4af9f49fa30fa9c25…` |
| 28800 | `krb5db-17` | ✅ | `$krb5db$17$test$TEST.LOCAL$1c41586d6c060071e08186ee214e725e` |
| 28900 | `krb5db-18` | ✅ | `$krb5db$18$test$TEST.LOCAL$266b5a53a6d663c3f69174f3309acada8e467c097…` |
| 29100 | `flask-session-cookie` | ✅ | `eyJ1c2VybmFtZSI6ImFkbWluIn0.YjdgRQ.1OTlf1PD0H9wXsu_qS0aywAJVD8` |
| 29600 | `terra-station` | ✅ | `67445496c838e96c1424a8dae4b146f0fc247c8c34ef33feffeb1e4412018512wZGt…` |
| 29800 | `bisq-scrypt` |  | `$bisq$3*32768*8*6*31d838af87f99cb8*5cfb7bf3228d9e865881156e17b186658…` |
| 30000 | `werkzeug-md5` | ✅ | `md5$84143$7f51edecfa6fb401a0b5e63d33fc8c0e` |
| 30120 | `werkzeug-sha256` | ✅ | `sha256$70108387805$8b9472281c36c3a693703de0e0f1ffab8fc0ecdd3bc5ead04…` |
| 30420 | `dane-tlsa-sha256` | ✅ | `127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df` |
| 30500 | `md5-md5salt-md5-md5pass` | ✅ | `e13bb4b8e5a98db7277df344aa3363cf:28945624531` |
| 30600 | `bcrypt-sha256` | ✅ | `$2b$10$FxDtpTNaL303lLcWtd6LFO2U6Gc63VJ07qycHcfqbQQ71GhO/qSzu` |
| 30601 | `bcrypt-hmac-sha256` | ✅ | `$bcrypt-sha256$v=2,t=2b,r=12$KSOjON/ciJR86a00N5q61.$AmWZucQuHk13FGkQ…` |
| 30901 | `bitcoin-raw-p2pkh-compressed` |  | `14Fqy5AGRehazZ4NLzxFWy2E4BiNFdH9Ut` |
| 30902 | `bitcoin-raw-p2pkh-uncompressed` |  | `12sLRz1TKPZurKCwVqeT5FkW3Y7usipPbZ` |
| 30903 | `bitcoin-raw-p2wpkh-compressed` |  | `bc1q926ca6n7wz7gm2gfd8xc5p0vu687ngvnknpx74` |
| 30904 | `bitcoin-raw-p2wpkh-uncompressed` |  | `bc1qq6samcuksd2f6rsc48eu3lkq87zp33vfud0p0t` |
| 30905 | `bitcoin-raw-p2sh-p2wpkh-compressed` |  | `3JqAMRQN3Gd6i8yV3Kw7v55RmFxW7iW2Aq` |
| 30906 | `bitcoin-raw-p2sh-p2wpkh-uncompressed` |  | `3PmD8zdrFD8KVgLrguVDCP2RJB4Rh35G9Z` |
| 31000 | `blake2s-256` | ✅ | `$BLAKE2$2c719b484789ad5f6fc1739012182169b25484af156adc91d4f64f72400e…` |
| 31300 | `ms-sntp` | ✅ | `$sntp-ms$cfc7023381cf6bb474cdcbeb0a67bdb3$90773369753681134296214095…` |
| 31700 | `md5-md5-md5pass-salt1-salt2` | ✅ | `c7a971e405313d0ecc22e37e8b2424a1:2316355934:478467` |
| 31900 | `metamask-mobile` | ✅ | `$metamaskMobile$JV4j2dUDl7n+sujyqW3Wvg==$398f9b04c822d36bfcbdd1e68c8…` |
| 32000 | `netiq-sspr-md5` | ✅ | `$sspr$0$100000$NONE$2c8586ef492e3c3dd3795395507dc14f` |
| 32010 | `netiq-sspr-sha1` | ✅ | `$sspr$1$100000$NONE$b3485214dfa55b038a606a183a560dab7db4ecf1` |
| 32020 | `netiq-sspr-sha1-salt` | ✅ | `$sspr$2$100000$CxCpGqosk9PkCBcoRFp6DLjjRhVEJKK8$a33283d71c2ecaf4f301…` |
| 32030 | `netiq-sspr-sha256-salt` | ✅ | `$sspr$3$100000$ODk2NDA5Mjc2NDIwMjMwMjQyMTQ1NzMz$7195873d47c7e3627510…` |
| 32031 | `adobe-aem-sspr-sha256` | ✅ | `$sspr$3$1000$f9bbf1381f481427$a1b45fd7eb190cc7f0bf831698cb777207eebb…` |
| 32040 | `netiq-sspr-sha512-salt` | ✅ | `$sspr$4$100000$NzYwNjMyNDc2MTQ2OTE4NTUzODAyODE3$0ce2e8b8efa4280e6e00…` |
| 32041 | `adobe-aem-sspr-sha512` | ✅ | `$sspr$4$1000$9ad596c50a5c9acd$d4cdc3c7d227e3cc57a9c9014b1eff1684808e…` |
| 32050 | `netiq-sspr-pbkdf2-sha1` | ✅ | `$pbkdf2-hmac-sha1$100000$7134180503252384106490944216249411431665011…` |
| 32060 | `netiq-sspr-pbkdf2-sha256` | ✅ | `$pbkdf2-sha256$100000$MDUzMTE4NjQyNDc5NTQxMjAwMjg1OTYxNjAxNDgzNzc$bw…` |
| 32070 | `netiq-sspr-pbkdf2-sha512` | ✅ | `$pbkdf2-hmac-sha512$100000.02112588415590109197494695474252151856898…` |
| 32100 | `krb5asrep-17` |  | `$krb5asrep$17$user$EXAMPLE.COM$a419c4030e555734b06c2629$c09a1421f96e…` |
| 32200 | `krb5asrep-18` |  | `$krb5asrep$18$user$EXAMPLE.COM$aa4c494f520b27873a4de8f7$ebc9976a77f6…` |
| 32410 | `sha512-sha512pass-salt` | ✅ | `25d509824028a999f4ee851b5de404bb316b78ae8e974874376484018f58520e0827…` |
| 32420 | `sha512-sha512binpass-salt` | ✅ | `c1bade2bd4ebc8db841ac6ab3e0a5035a29619e5b1a6135782b77da5d7cfaccee096…` |
| 32500 | `dogechain-wallet` | ✅ | `$dogechain$0*5000*EEmAkgiMlVrToRhu2suq91R5Frf+VQCvNzv9lj6OwRWIf/3IM3…` |
| 32800 | `md5-sha1-md5` | ✅ | `7b4f60b54472980e922280e225150dfa` |
| 32900 | `pbkdf1-sha1` | ✅ | `PBKDF1:sha1:1000:cGVuZ3VpbmtlZXBlcg==:J4BrIhXDUHNQ9lPPrWKn4V7Of9Y=` |
| 33000 | `md5-salt1-pass-salt2` | ✅ | `036a81bc84e01700faf965c3caaa3954:02434026169755300193055419493389031…` |
| 33100 | `md5-salt-md5pass-salt` | ✅ | `866244ca1d318292a6f40b60e03fd29c:72219426709` |
| 33300 | `hmac-blake2s-pass` | ✅ | `0d541ae24d30aff2627c4d1a910f766088a64809edb46a05d29649a9b944da6c:123…` |
| 33400 | `mega-nz-link` | ✅ | `P!AgD________U2XVjJi1vxkJgMPf5rkQYUn1H_6WI_sKtiic69mqBKP____________…` |
| 33500 | `rc4-40-dropn` | ✅ | `$rc4$40$0$e9a41693b759cf88929ca31203694f$0$48656c6c6f` |
| 33501 | `rc4-72-dropn` | ✅ | `$rc4$72$0$90eaa8d71c$0$48656c6c6f` |
| 33502 | `rc4-104-dropn` | ✅ | `$rc4$104$0$a04245c3d7$0$48656c6c6f` |
| 33600 | `ripemd-320` | ✅ | `8339009b816d4e4c2a6be3c6e1daac6aca69a7670ecdc583adfca0db17cc8f08ce35…` |
| 33650 | `hmac-ripemd320-pass` | ✅ | `e740440e7bd65056a90f1aa4eb00e00308a9f1788866b4eacbd46cfc8032301d4e5b…` |
| 33660 | `hmac-ripemd320-salt` | ✅ | `345136b13b3a6e52901e2a414efa0cf5fca2fecf8b03279656d3b0f42c30df3006c5…` |
| 34000 | `argon2` |  | `$argon2id$v=19$m=65536,t=3,p=1$FBMjI4RJBhIykCgol1KEJA$2ky5GAdhT1kH4k…` |
| 34200 | `murmurhash64a` | ✅ | `ef3014941bf1102d:837163b2348dfae1` |
| 34201 | `murmurhash64a-zero` | ✅ | `73f8142b4326d36a` |
| 34211 | `murmurhash64a-truncated-zero` | ✅ | `73f8142b` |
| 34400 | `sha224-sha224` | ✅ | `b7d9a0e57e6e94e8b87996b81ffa64b05d237c58fff1d7a4e4fe2a77` |
| 34500 | `sha224-sha1` | ✅ | `10d302483c927df95abba98d69dcd9608365241d1523a8cc5fcbcedc` |
| 34700 | `blockchain-legacy` |  | `$blockchain$269$0349575305940509451603791869345994679e29d1618f26ed65…` |
| 34800 | `blake2b-256` | ✅ | `$BLAKE2$68b163391b3e779dcddba4e6d8fa03e962c29569b430efa5ba0143033585…` |
| 34810 | `blake2b-256-pass-salt` | ✅ | `$BLAKE2$2b51353016a512b60e587bea98d799c2de243468085ca6cd67f983b2e55b…` |
| 34820 | `blake2b-256-salt-pass` | ✅ | `$BLAKE2$a4cad0b026ed24adf13fb70ec31d35b02751dcb33354e2c9d20ef3f96874…` |
| 35000 | `sap-codvn-h-issha512` | ✅ | `{x-isSHA512, 15000}YZH/V2T7zlQMGeWLBarm5Oi3qV9Y8ByXQijD28+bjtLdo7Yss…` |
| 35100 | `sm3crypt` | ✅ | `$sm3$KTTUB40dW4mRyRFd$ul2xLiIY3FJtbo8sv1R93sAYCkxQCH/6rmS1kD5vJYA` |

