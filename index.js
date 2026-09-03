var bcrypt = require('./src/bcryptjs-own');
var CryptoJS = require("crypto-js");
// Only two runtime deps: crypto-js (digests / HMAC / PBKDF2 / AES / RC4 / DES)
// and bcryptjs (Blowfish bcrypt). Everything else the "hard" tier needs —
// Keccak/SHA3, BLAKE2b, scrypt, Argon2, AES-GCM, secp256k1, Base58Check, Bech32
// — is hand-written in pure JS in ./src/*.js (one algorithm per file). No wasm.
// The low-level byte<->WordArray helpers below stay local (used pervasively by
// the mode verifiers); the per-algorithm modules keep their own copies.
var _keccakMod = require('./src/keccak'), makeKeccakVerifier = _keccakMod.makeKeccakVerifier, makeSha3Verifier = _keccakMod.makeSha3Verifier;
var _blake2bMod = require('./src/blake2b'), verifyBlake2b512 = _blake2bMod.verifyBlake2b512, makeBlake2bVerifier = _blake2bMod.makeBlake2bVerifier;
var verifyScrypt = require('./src/scrypt').verifyScrypt;
var verifyArgon2 = require('./src/argon2').verifyArgon2;
var _gcmTagOk = require('./src/gcm')._gcmTagOk;
var _secpPubKey = require('./src/secp256k1')._secpPubKey;
var _base58Mod = require('./src/base58'), _base58check = _base58Mod._base58check, _base58checkDecode = _base58Mod._base58checkDecode, _bech32Segwit = _base58Mod._bech32Segwit;
var _krb = require('./src/kerberos');
var verifyKrb5pa23 = _krb.verifyKrb5pa23, verifyKrb5tgs23 = _krb.verifyKrb5tgs23, verifyKrb5asrep23 = _krb.verifyKrb5asrep23,
    makeKrb5dbVerifier = _krb.makeKrb5dbVerifier, makeKrb5ticketVerifier = _krb.makeKrb5ticketVerifier, makeKrb5paAesVerifier = _krb.makeKrb5paAesVerifier,
    krbTgsCheck = _krb.krbTgsCheck, krbAsrepCheck = _krb.krbAsrepCheck,
    KRB_NFOLD2_TGS = _krb.KRB_NFOLD2_TGS, KRB_NFOLD2_ASREP = _krb.KRB_NFOLD2_ASREP, KRB_NFOLD1_PA = _krb.KRB_NFOLD1_PA, KRB_NFOLD2_PA = _krb.KRB_NFOLD2_PA;
var _ntlm = require('./src/netntlm');
var verifyNetntlmv1 = _ntlm.verifyNetntlmv1, verifyNetntlmv1NT = _ntlm.verifyNetntlmv1NT, verifyNetntlmv2NT = _ntlm.verifyNetntlmv2NT;
var _btc = require('./src/bitcoin');
var makeBtcVerifier = _btc.makeBtcVerifier, _btcP2pkh = _btc._btcP2pkh, _btcP2wpkh = _btc._btcP2wpkh, _btcP2shP2wpkh = _btc._btcP2shP2wpkh, _btcPrivWif = _btc._btcPrivWif, _btcPrivHex = _btc._btcPrivHex;
var _wal = require('./src/wallets');
var verifyMetamask = _wal.verifyMetamask, verifyMetamaskShort = _wal.verifyMetamaskShort, verifyBlockchain2ndPass = _wal.verifyBlockchain2ndPass, verifyWalletDat = _wal.verifyWalletDat, verifyBlockchainV1 = _wal.verifyBlockchainV1, verifyBlockchainV2 = _wal.verifyBlockchainV2;
var _crypt = require('./src/crypt');
var verifyMD5CRYPT = _crypt.verifyMD5CRYPT, verifySHA256CRYPT = _crypt.verifySHA256CRYPT, verifySHA512CRYPT = _crypt.verifySHA512CRYPT, verifyPhpass = _crypt.verifyPhpass, verifySha1crypt = _crypt.verifySha1crypt, verifyApr1 = _crypt.verifyApr1, verifyMysqlA = _crypt.verifyMysqlA, verifyAixSmd5 = _crypt.verifyAixSmd5;
var _dig = require('./src/digests');
var verifyNTLM = _dig.verifyNTLM, verifyMD5 = _dig.verifyMD5, verifySHA1 = _dig.verifySHA1, verifySHA256 = _dig.verifySHA256, verifySHA512 = _dig.verifySHA512, verifyBcrypt = _dig.verifyBcrypt, verify_mysql323 = _dig.verify_mysql323, makeSaltedVerifier = _dig.makeSaltedVerifier, makeRawHexVerifier = _dig.makeRawHexVerifier, makeUtf16leRawVerifier = _dig.makeUtf16leRawVerifier, verifyHalfMD5 = _dig.verifyHalfMD5, _md5hex = _dig._md5hex, _sha1hex = _dig._sha1hex, _md5s = _dig._md5s, _sha1s = _dig._sha1s, _sha224s = _dig._sha224s, _sha256s = _dig._sha256s, _sha512s = _dig._sha512s, _md5raw = _dig._md5raw, _sha1raw = _dig._sha1raw, _sha256raw = _dig._sha256raw, _sha512raw = _dig._sha512raw;
var _hmacMod = require('./src/hmac');
var verifyNetNTLMV2 = _hmacMod.verifyNetNTLMV2, verifyJWT = _hmacMod.verifyJWT, verifyHMAC_MD5 = _hmacMod.verifyHMAC_MD5, verifyHMAC_SHA1 = _hmacMod.verifyHMAC_SHA1, verifyHMAC_SHA256 = _hmacMod.verifyHMAC_SHA256, verifyHMAC_SHA512 = _hmacMod.verifyHMAC_SHA512, makeSshaVerifier = _hmacMod.makeSshaVerifier, makeHmacPassVerifier = _hmacMod.makeHmacPassVerifier;
var makePbkdf2Verifier = require('./src/pbkdf2').makePbkdf2Verifier;
var _bc = require('./src/bcrypt');
var makeBcryptPrehashVerifier = _bc.makeBcryptPrehashVerifier, verifyBcryptHmacSha256 = _bc.verifyBcryptHmacSha256;
var _sap = require('./src/sap');
var verifySapB = _sap.verifySapB, verifySapG = _sap.verifySapG;
var _wpa = require('./src/wpa'), verifyWpa = _wpa.verifyWpa;
var verifyWhirlpool = require('./src/whirlpool').verifyWhirlpool;
var _elec = require('./src/electrum');
var verifyElectrum16600 = _elec.verifyElectrum16600, verifyElectrum21700 = _elec.verifyElectrum21700, verifyElectrum21800 = _elec.verifyElectrum21800;
var _rar = require('./src/rar');
var _kdf = require('./src/kdf');
var _des = require('./src/des');
var _sm3 = require('./src/sm3');
var _coins = require('./src/coins');
var _gen = require('./src/gen');
var _nc = require('./src/noncrypto');
var _blake2s = require('./src/blake2s');
var _rmd320 = require('./src/ripemd320');
var verifyRar5 = _rar.verifyRar5, verifyRar3hp = _rar.verifyRar3hp, verifyRar3p = _rar.verifyRar3p;
var _zip = require('./src/zip');
var verifyWinzipAes = _zip.verifyWinzipAes, verifySecurezip = _zip.verifySecurezip, verifyPkzip = _zip.verifyPkzip;
var verify7z = require('./src/sevenzip').verify7z;
var _extract = require('./src/extract');
var _attack = require('./src/attack');



















// ===========================================================================
//  Hashcat-compatible hash-type registry
// ===========================================================================
//  Every supported hash type is ONE self-contained entry in HASH_REGISTRY.
//  The whole public API (verifyHash / isValidHash / isFast / measureSpeed /
//  getExample / getPossibleHashTypes / availableHashTypes) is derived from
//  this table, so adding a hashcat mode = appending one entry. See
//  HASH_TYPES.md for the algorithm behind each mode and ROADMAP.md for the
//  queue of modes still to implement.
//
//  entry = {
//    modes:    [<hashcat -m number>, ...]   // numeric hashcat identifiers
//    names:    ['<descriptive-name>', ...]  // names[0] is the canonical name
//    isFast:   <bool>                       // true => one hash op per guess
//    validate: (hash) => <bool>             // hashcat-format shape check
//    verify:   (password, hash) => <bool>   // does password produce hash?
//    example:  { password, hash }           // official hashcat example vector
//  }
//
//  `type` in the public API accepts EITHER a hashcat mode number (10, "1410")
//  OR any registered name ("md5", "sha256-pass-salt"). Existing names are
//  preserved for backward compatibility.
// ---------------------------------------------------------------------------





// byte helpers for the DES/AES/misc modes
function _sb(s) { var b = []; for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xff); return b; }
function _hb(h) { var b = []; for (var i = 0; i < h.length; i += 2) b.push(parseInt(h.substr(i, 2), 16)); return b; }
function _bh(b) { var s = ''; for (var i = 0; i < b.length; i++) { var c = (b[i] & 0xff).toString(16); s += c.length < 2 ? '0' + c : c; } return s; }
// Tripcode salt char-translation (perl tr/:;<=>?@[\]^_`/A-Ga-f/).
function _tripTr(s) { var from = ':;<=>?@[\\]^_`', to = 'ABCDEFGabcdef', out = ''; for (var i = 0; i < s.length; i++) { var j = from.indexOf(s[i]); out += j < 0 ? s[i] : to[j]; } return out; }

// Cisco-PIX/ASA pseudo-base64 of a 16-byte MD5 (Latin1 string): 4 LE u32 -> 4 chars each.
function _pixB64(md5latin1) {
    var itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', out = '';
    for (var i = 0; i < 4; i++) {
        var v = (md5latin1.charCodeAt(i * 4) & 0xff) | ((md5latin1.charCodeAt(i * 4 + 1) & 0xff) << 8) | ((md5latin1.charCodeAt(i * 4 + 2) & 0xff) << 16) | ((md5latin1.charCodeAt(i * 4 + 3) & 0xff) << 24);
        v = v >>> 0;
        for (var j = 0; j < 4; j++) { out += itoa64.charAt(v & 0x3f); v = Math.floor(v / 64); }
    }
    return out;
}

const HASH_REGISTRY = [
    // ----- existing types (unsalted / crypt / hmac / structured) -----------
    { modes: [500], names: ['md5crypt'], isFast: false,
      validate: (h) => /^\$1\$[./A-Za-z0-9]{1,8}\$[./A-Za-z0-9]{22}$/.test(h),
      verify: verifyMD5CRYPT,
      example: { password: 'hashcat', hash: '$1$28772684$iEwNOgGugqO9.bIz5sk8k/' } },

    { modes: [7400], names: ['sha256crypt'], isFast: false,
      validate: (h) => /^\$5\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{43,86}$/.test(h),
      verify: verifySHA256CRYPT,
      example: { password: 'hashcat', hash: '$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD' } },

    { modes: [1800], names: ['sha512crypt'], isFast: false,
      validate: (h) => /^\$6\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{86,}$/.test(h),
      verify: verifySHA512CRYPT,
      example: { password: 'hashcat', hash: '$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/' } },

    { modes: [1000], names: ['ntlm'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: verifyNTLM,
      example: { password: 'hashcat', hash: 'b4b9b02e6f09a9bd760f388b67351e2b' } },

    { modes: [0], names: ['md5'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: verifyMD5,
      example: { password: 'hashcat', hash: '8743b52063cd84097a65d1633f5c74f5' } },

    { modes: [100], names: ['sha1'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: verifySHA1,
      example: { password: 'hashcat', hash: 'b89eaac7e61417341b710b727768294d0e6a277b' } },

    { modes: [1400], names: ['sha256'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: verifySHA256,
      example: { password: 'hashcat', hash: '127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935' } },

    { modes: [1700], names: ['sha512'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: verifySHA512,
      example: { password: 'hashcat', hash: '82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f' } },

    { modes: [3200], names: ['bcrypt'], isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: verifyBcrypt,
      example: { password: 'hashcat', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6' } },

    { modes: [5600], names: ['netntlmv2'], isFast: false,
      validate: (h) => /^[^:]+::[^:]+:[a-fA-F0-9]{16}:[a-fA-F0-9]{32,64}:[a-fA-F0-9]+$/.test(h),
      verify: verifyNetNTLMV2,
      example: { password: 'hashcat', hash: 'admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030' } },

    { modes: [60], names: ['hmac-md5'], isFast: false,
      validate: (h) => /^[a-fA-F0-9]{32}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_MD5,
      example: { password: 'hashcat', hash: 'bfd280436f45fa38eaacac3b00518f29:1234' } },

    { modes: [160], names: ['hmac-sha1'], isFast: false,
      validate: (h) => /^[a-fA-F0-9]{40}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA1,
      example: { password: 'hashcat', hash: 'd89c92b4400b15c39e462a8caa939ab40c3aeeea:1234' } },

    { modes: [1460], names: ['hmac-sha256'], isFast: false,
      validate: (h) => /^[a-fA-F0-9]{64}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA256,
      example: { password: 'hashcat', hash: '8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234' } },

    { modes: [1760], names: ['hmac-sha512'], isFast: false,
      validate: (h) => /^[a-fA-F0-9]{128}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA512,
      example: { password: 'hashcat', hash: '7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234' } },

    { modes: [200], names: ['mysql323'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: verify_mysql323,
      example: { password: 'hashcat', hash: '7196759210defdc0' } },

    { modes: [16500], names: ['jwt'], isFast: false,
      validate: (h) => /^([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})$/.test(h),
      verify: verifyJWT,
      example: { password: 'hashcat', hash: 'eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY' } },

    // ----- salted fast modes ("<hex-digest>:<salt>" hashcat format) --------
    // md5
    { modes: [10], names: ['md5-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'ps', false),
      example: { password: 'hashcat', hash: '01dfae6e5d4d90d9892622325959afbe:7050461' } },
    { modes: [20], names: ['md5-salt-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'sp', false),
      example: { password: 'hashcat', hash: 'f0fda58630310a6dd91a7d8f0a4ceda2:4225637426' } },
    { modes: [30], names: ['md5-utf16le-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'ps', true),
      example: { password: 'hashcat', hash: 'b31d032cfdcf47a399990a71e43c5d2a:144816' } },
    { modes: [40], names: ['md5-salt-utf16le-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'sp', true),
      example: { password: 'hashcat', hash: 'd63d0e21fdc05f618d55ef306c54af82:13288442151473' } },
    // sha1
    { modes: [110], names: ['sha1-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, 'ps', false),
      example: { password: 'hashcat', hash: '2fc5a684737ce1bf7b3b239df432416e0dd07357:2014' } },
    { modes: [120], names: ['sha1-salt-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, 'sp', false),
      example: { password: 'hashcat', hash: 'cac35ec206d868b7d7cb0b55f31d9425b075082b:5363620024' } },
    { modes: [130], names: ['sha1-utf16le-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, 'ps', true),
      example: { password: 'hashcat', hash: 'c57f6ac1b71f45a07dbd91a59fa47c23abcd87c2:631225' } },
    { modes: [140], names: ['sha1-salt-utf16le-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, 'sp', true),
      example: { password: 'hashcat', hash: '5db61e4cd8776c7969cfd62456da639a4c87683a:8763434884872' } },
    // sha256
    { modes: [1410], names: ['sha256-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, 'ps', false),
      example: { password: 'hashcat', hash: 'c73d08de890479518ed60cf670d17faa26a4a71f995c1dcc978165399401a6c4:53743528' } },
    { modes: [1420], names: ['sha256-salt-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, 'sp', false),
      example: { password: 'hashcat', hash: 'eb368a2dfd38b405f014118c7d9747fcc97f4f0ee75c05963cd9da6ee65ef498:560407001617' } },
    { modes: [1430], names: ['sha256-utf16le-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, 'ps', true),
      example: { password: 'hashcat', hash: '4cc8eb60476c33edac52b5a7548c2c50ef0f9e31ce656c6f4b213f901bc87421:890128' } },
    { modes: [1440], names: ['sha256-salt-utf16le-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, 'sp', true),
      example: { password: 'hashcat', hash: 'a4bd99e1e0aba51814e81388badb23ecc560312c4324b2018ea76393ea1caca9:12345678' } },
    // sha512
    { modes: [1710], names: ['sha512-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, 'ps', false),
      example: { password: 'hashcat', hash: 'e5c3ede3e49fb86592fb03f471c35ba13e8d89b8ab65142c9a8fdafb635fa2223c24e5558fd9313e8995019dcbec1fb584146b7bb12685c7765fc8c0d51379fd:6352283260' } },
    { modes: [1720], names: ['sha512-salt-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, 'sp', false),
      example: { password: 'hashcat', hash: '976b451818634a1e2acba682da3fd6efa72adf8a7a08d7939550c244b237c72c7d42367544e826c0c83fe5c02f97c0373b6b1386cc794bf0d21d2df01bb9c08a:2613516180127' } },
    { modes: [1730], names: ['sha512-utf16le-pass-salt'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, 'ps', true),
      example: { password: 'hashcat', hash: '13070359002b6fbb3d28e50fba55efcf3d7cc115fe6e3f6c98bf0e3210f1c6923427a1e1a3b214c1de92c467683f6466727ba3a51684022be5cc2ffcb78457d2:341351589' } },
    { modes: [1740], names: ['sha512-salt-utf16le-pass'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, 'sp', true),
      example: { password: 'hashcat', hash: 'bae3a3358b3459c761a3ed40d34022f0609a02d90a0d7274610b16147e58ece00cd849a0bd5cf6a92ee5eb5687075b4e754324dfa70deca6993a85b2ca865bc8:1237015423' } },

    // ----- hand-written primitive modes (see src/*.js) --------------------
    { modes: [600], names: ['blake2b-512', 'blake2b'], isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}$/.test(h),
      verify: verifyBlake2b512,
      example: { password: 'hashcat', hash: '$BLAKE2$296c269e70ac5f0095e6fb47693480f0f7b97ccd0307f5c3bfa4df8f5ca5c9308a0e7108e80a0a9c0ebb715e8b7109b072046c6cd5e155b4cfd2f27216283b1e' } },

    // ----- raw unsalted fast digests (plain lowercase hex) -----------------
    { modes: [900], names: ['md4'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.MD4),
      example: { password: 'hashcat', hash: 'afe04867ec7a3845145579a95f72eca7' } },
    { modes: [1300], names: ['sha224', 'sha2-224'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.SHA224),
      example: { password: 'hashcat', hash: 'e4fa1555ad877bf0ec455483371867200eee89550a93eff2f95a6198' } },
    { modes: [10800], names: ['sha384', 'sha2-384'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.SHA384),
      example: { password: 'hashcat', hash: '07371af1ca1fca7c6941d2399f3610f1e392c56c6d73fddffe38f18c430a2817028dae1ef09ac683b62148a2c8757f42' } },
    { modes: [6000], names: ['ripemd160', 'ripemd-160'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.RIPEMD160),
      example: { password: 'hashcat', hash: '012cb9b334ec1aeb71a9c8ce85586082467f7eb6' } },
    { modes: [5100], names: ['half-md5'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: verifyHalfMD5,
      example: { password: 'hashcat', hash: '8743b52063cd8409' } },

    // ----- PBKDF2-HMAC-* (slow KDF; "<algo>:<iter>:<b64salt>:<b64dk>") ------
    { modes: [11900], names: ['pbkdf2-hmac-md5'], isFast: false,
      validate: (h) => /^md5:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.MD5, 'md5'),
      example: { password: 'hashcat', hash: 'md5:1000:NjAxMDY4MQ==:a00DtIW9hP9voC85fmEA5uVhgdDx67nSPSm9yADHjkI=' } },
    { modes: [12000], names: ['pbkdf2-hmac-sha1'], isFast: false,
      validate: (h) => /^sha1:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA1, 'sha1'),
      example: { password: 'hashcat', hash: 'sha1:1000:MTYwNTM4MDU4Mzc4MzA=:aGghFQBtQ8+WVlMk5GEaMw==' } },
    { modes: [10900], names: ['pbkdf2-hmac-sha256'], isFast: false,
      validate: (h) => /^sha256:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA256, 'sha256'),
      example: { password: 'hashcat', hash: 'sha256:1000:NjI3MDM3:vVfavLQL9ZWjg8BUMq6/FB8FtpkIGWYk' } },
    { modes: [12100], names: ['pbkdf2-hmac-sha512'], isFast: false,
      validate: (h) => /^sha512:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA512, 'sha512'),
      example: { password: 'hashcat', hash: 'sha512:1000:NzY2:DNWohLbdIWIt4Npk9gpTvA==' } },

    // ----- phpass / sha1crypt / bcrypt-prehash (slow) ----------------------
    { modes: [400], names: ['phpass'], isFast: false,
      validate: (h) => /^\$[PH]\$[./0-9A-Za-z]{31}$/.test(h),
      verify: verifyPhpass,
      example: { password: 'hashcat', hash: '$P$946647711V1klyitUYhtB8Yw5DMA/w.' } },
    { modes: [15100], names: ['sha1crypt', 'sha1crypt-juniper-netbsd'], isFast: false,
      validate: (h) => /^\$sha1\$\d+\$[^$]*\$[./0-9A-Za-z]{28}$/.test(h),
      verify: verifySha1crypt,
      example: { password: 'hashcat', hash: '$sha1$20000$75552156$HhYMDdaEHiK3eMIzTldOFPnw.s2Q' } },
    { modes: [25600], names: ['bcrypt-md5'], isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.MD5),
      example: { password: 'hashcat', hash: '$2a$05$/VT2Xs2dMd8GJKfrXhjYP.DkTjOVrY12yDN7/6I8ZV0q/1lEohLru' } },
    { modes: [25800], names: ['bcrypt-sha1'], isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA1),
      example: { password: 'hashcat', hash: '$2a$05$Uo385Fa0g86uUXHwZxB90.qMMdRFExaXePGka4WGFv.86I45AEjmO' } },
    { modes: [30600], names: ['bcrypt-sha256'], isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA256),
      example: { password: 'hashcat', hash: '$2b$10$FxDtpTNaL303lLcWtd6LFO2U6Gc63VJ07qycHcfqbQQ71GhO/qSzu' } },
    { modes: [28400], names: ['bcrypt-sha512'], isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA512),
      example: { password: 'hashcat', hash: '$2a$12$KhivLhCuLhSyMBOxLxCyLu78x4z2X/EJdZNfS3Gy36fvRt56P2jbS' } },
    { modes: [30601], names: ['bcrypt-hmac-sha256'], isFast: false,
      validate: (h) => /^\$bcrypt-sha256\$v=2,t=2b,r=\d{2}\$[./A-Za-z0-9]{22}\$[./A-Za-z0-9]{31}$/.test(h),
      verify: verifyBcryptHmacSha256,
      example: { password: 'hashcat', hash: '$bcrypt-sha256$v=2,t=2b,r=12$KSOjON/ciJR86a00N5q61.$AmWZucQuHk13FGkQWhgMeiFvBfm2GCy' } },

    // ----- NetNTLMv1 / v2 (NT-hash / challenge-response) --------------------
    { modes: [5500], names: ['netntlmv1'], isFast: false,
      validate: (h) => /^[^:]*::[^:]*:[0-9a-fA-F]{48}:[0-9a-fA-F]{48}:[0-9a-fA-F]{16}$/.test(h),
      verify: verifyNetntlmv1,
      example: { password: 'hashcat', hash: '::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5daa70eaffde82ef99293a3f3bb59b7c9704ea:9c23f6c094853920' } },
    { modes: [27000], names: ['netntlmv1-nt'], isFast: false,
      validate: (h) => /^[^:]*::[^:]*:[0-9a-fA-F]{48}:[0-9a-fA-F]{48}:[0-9a-fA-F]{16}$/.test(h),
      verify: verifyNetntlmv1NT,
      example: { password: 'b4b9b02e6f09a9bd760f388b67351e2b', hash: '::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5daa70eaffde82ef99293a3f3bb59b7c9704ea:9c23f6c094853920' } },
    { modes: [27100], names: ['netntlmv2-nt'], isFast: false,
      validate: (h) => /^[^:]+::[^:]+:[a-fA-F0-9]{16}:[a-fA-F0-9]{32}:[a-fA-F0-9]+$/.test(h),
      verify: verifyNetntlmv2NT,
      example: { password: 'b4b9b02e6f09a9bd760f388b67351e2b', hash: '0UL5G37JOI0SX::6VB1IS0KA74:ebe1afa18b7fbfa6:aab8bf8675658dd2a939458a1077ba08:010100000000000031c8aa092510945398b9f7b7dde1a9fb00000000f7876f2b04b700' } },

    // ----- Kerberos 5 etype 23 (RC4-HMAC-MD5) ------------------------------
    { modes: [7500], names: ['krb5pa-23', 'kerberos-5-asreq-preauth'], isFast: false,
      validate: (h) => /^\$krb5pa\$23\$[^$]*\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,}$/.test(h),
      verify: verifyKrb5pa23,
      example: { password: 'hashcat', hash: '$krb5pa$23$user$realm$salt$5cbb0c882a2b26956e81644edbdb746326f4f5f0e947144fb3095dffe4b4b03e854fc1d631323632303636373330383333353630' } },
    { modes: [13100], names: ['krb5tgs-23', 'kerberos-5-tgs-rep'], isFast: false,
      validate: (h) => /^\$krb5tgs\$23\$(\*.+\*\$)?[0-9a-fA-F]{32}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: verifyKrb5tgs23,
      example: { password: 'hashcat', hash: '$krb5tgs$23$*user$realm$test/spn*$b548e10f5694ae018d7ad63c257af7dc$35e8e45658860bc31a859b41a08989265f4ef8afd75652ab4d7a30ef151bf6350d879ae189a8cb769e01fa573c6315232b37e4bcad9105520640a781e5fd85c09615e78267e494f433f067cc6958200a82f70627ce0eebc2ac445729c2a8a0255dc3ede2c4973d2d93ac8c1a56b26444df300cb93045d05ff2326affaa3ae97f5cd866c14b78a459f0933a550e0b6507bf8af27c2391ef69fbdd649dd059a4b9ae2440edd96c82479645ccdb06bae0eead3b7f639178a90cf24d9a' } },
    { modes: [18200], names: ['krb5asrep-23', 'kerberos-5-as-rep'], isFast: false,
      validate: (h) => /^\$krb5asrep\$23\$.+[:$][0-9a-fA-F]{32}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: verifyKrb5asrep23,
      example: { password: 'hashcat', hash: '$krb5asrep$23$user@domain.com:3e156ada591263b8aab0965f5aebd837$007497cb51b6c8116d6407a782ea0e1c5402b17db7afa6b05a6d30ed164a9933c754d720e279c6c573679bd27128fe77e5fea1f72334c1193c8ff0b370fadc6368bf2d49bbfdba4c5dccab95e8c8ebfdc75f438a0797dbfb2f8a1a5f4c423f9bfc1fea483342a11bd56a216f4d5158ccc4b224b52894fadfba3957dfe4b6b8f5f9f9fe422811a314768673e0c924340b8ccb84775ce9defaa3baa0910b676ad0036d13032b0dd94e3b13903cc738a7b6d00b0b3c210d1f972a6c7cae9bd3c959acf7565be528fc179118f28c679f6deeee1456f0781eb8154e18e49cb27b64bf74cd7112a0ebae2102ac' } },

    // ----- scrypt / Argon2 (memory-hard KDFs, hand-written) ---------------
    { modes: [8900], names: ['scrypt'], isFast: false,
      validate: (h) => /^SCRYPT:\d+:\d+:\d+:[^:]+:[^:]+$/.test(h),
      verify: verifyScrypt,
      example: { password: 'hashcat', hash: 'SCRYPT:16384:8:1:OTEyNzU0ODg=:Cc8SPjRH1hFQhuIPCdF51uNGtJ2aOY/isuoMlMUsJ8c=' } },
    { modes: [34000], names: ['argon2'], isFast: false,
      validate: (h) => /^\$argon2(d|i|id)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]+\$[A-Za-z0-9+/]+$/.test(h),
      verify: verifyArgon2,
      example: { password: 'hashcat', hash: '$argon2id$v=19$m=65536,t=3,p=1$FBMjI4RJBhIykCgol1KEJA$2ky5GAdhT1kH4kIgPN/oERE3Taiy43vNN70a3HpiKQU' } },

    // ----- Kerberos 5 etype 17/18 (AES-CTS-HMAC-SHA1) ----------------------
    { modes: [19600], names: ['krb5tgs-17'], isFast: false,
      validate: (h) => /^\$krb5tgs\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(16, 'krb5tgs', KRB_NFOLD2_TGS, krbTgsCheck),
      example: { password: 'hashcat', hash: '$krb5tgs$17$srv_http$synacktiv.local$849e31b3db1c1f203fa20b85$948690f5875125348286ad3346d27b43eaabc71896b620c16de7ddcdbd561628c650c508856a3f574261948b6db4b48332d30536e978046a423ad4368f9a69b4dc4642dab4e0d475d8299be718fd6f98ac85a771b457b2453e78c9411dfce572b19660fe7a5a8246d9b2a91ea2f14d1986ea0a77ecf9b8330bc8fd9ab540bcf46b74c5aa7005cfccd89ec05f66aeab30c6b2bf8595cf6c9a1b68ad885258850c4b1dd9265f270fb2af52fd76c16246df51ea67efc58a65c345686c84e43642febe908a' } },
    { modes: [19700], names: ['krb5tgs-18'], isFast: false,
      validate: (h) => /^\$krb5tgs\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(32, 'krb5tgs', KRB_NFOLD2_TGS, krbTgsCheck),
      example: { password: 'hashcat', hash: '$krb5tgs$18$srv_http$synacktiv.local$16ce51f6eba20c8ee534ff8a$57d07b23643a516834795f0c010da8f549b7e65063e5a367ca9240f9b800adad1734df7e7d5dd8307e785de4f40aacf901df41aa6ce695f8619ec579c1fa57ee93661cf402aeef4e3a42e7e3477645d52c09dc72feade03512dffe0df517344f673c63532b790c242cc1d50f4b4b34976cb6e08ab325b3aefb2684262a5ee9faacb14d059754f50553be5bfa5c4c51e833ff2b6ac02c6e5d4c4eb193e27d7dde301bd1ddf480e5e282b8c27ef37b136c8f140b56de105b73adeb1de16232fa1ab5c9f6' } },
    { modes: [28800], names: ['krb5db-17'], isFast: false,
      validate: (h) => /^\$krb5db\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{32}$/.test(h),
      verify: makeKrb5dbVerifier(16),
      example: { password: 'hashcat', hash: '$krb5db$17$test$TEST.LOCAL$1c41586d6c060071e08186ee214e725e' } },
    { modes: [28900], names: ['krb5db-18'], isFast: false,
      validate: (h) => /^\$krb5db\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{64}$/.test(h),
      verify: makeKrb5dbVerifier(32),
      example: { password: 'hashcat', hash: '$krb5db$18$test$TEST.LOCAL$266b5a53a6d663c3f69174f3309acada8e467c097c7973699f86286a6cf1a6c7' } },
    { modes: [32100], names: ['krb5asrep-17'], isFast: false,
      validate: (h) => /^\$krb5asrep\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(16, 'krb5asrep', KRB_NFOLD2_ASREP, krbAsrepCheck),
      example: { password: 'hashcat', hash: '$krb5asrep$17$user$EXAMPLE.COM$a419c4030e555734b06c2629$c09a1421f96eb126c757a4b87830381f142477d9a85b2beb3093dbfd44f38ddb6016a479537fb7b36e046315869fe79187217971ff6a12c1e0a2df3f68045e03814b21f756d8981f781803d65e8572823c88979581d93cf7d768f2efced16f3719b8d1004d9e73d798de255383476bced47d1982f16be77d0feb55a1f44f58bd013fa4caee58ac614caf0f1cf9101ec9623c5b8c2a1491b73f134f074790088fdb360b5ebce0d32a8145ed00a81ddf77188e150b92d8e8ddd0285d27f1514253e5546e6bba864b362bb1e6483b26d08fa4cc268bfbefe0f690039bcc524b774599df3680c1c3431d891bfa99514a877f964e' } },
    { modes: [32200], names: ['krb5asrep-18'], isFast: false,
      validate: (h) => /^\$krb5asrep\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(32, 'krb5asrep', KRB_NFOLD2_ASREP, krbAsrepCheck),
      example: { password: 'hashcat', hash: '$krb5asrep$18$user$EXAMPLE.COM$aa4c494f520b27873a4de8f7$ebc9976a77f62e8ccca02d43d68bafcc66a81fcbb44a336b00ce401982f32975a5f9bcdc752643252185866685b0a30aaf50e449e392a5994e6979f23aba25f7704c90b2efa03b703c3c2f9e3617cc588ed226d0417e7742d45407878fd946d046b4a9732b9a203cb857811714b009c195b7c96b9bccb7e48832b11a4e92ecf24c49e54de8d0d5d5351445b5126db90bb7eebc7861db1e61de1175824b0a45023a6fa06c2a9d3035fdcf863bea922648e3dc28b48e39b1dec0869e7fe4de399cb52dfcf2596599da54a4bb0169c72d9496de2e137a4594e0e8a69082fc558ac9ace65d32eae5e260a65ca3f2f5871aaeee7a3b090b50f39321d120c144421e0abe7d' } },
    { modes: [19800], names: ['krb5pa-17'], isFast: false,
      validate: (h) => /^\$krb5pa\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,112}$/.test(h),
      verify: makeKrb5paAesVerifier(16, KRB_NFOLD1_PA, KRB_NFOLD2_PA),
      example: { password: 'hashcat', hash: '$krb5pa$17$hashcat$HASHCATDOMAIN.COM$a17776abe5383236c58582f515843e029ecbff43706d177651b7b6cdb2713b17597ddb35b1c9c470c281589fd1d51cca125414d19e40e333' } },
    { modes: [19900], names: ['krb5pa-18'], isFast: false,
      validate: (h) => /^\$krb5pa\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,112}$/.test(h),
      verify: makeKrb5paAesVerifier(32, KRB_NFOLD1_PA, KRB_NFOLD2_PA),
      example: { password: 'hashcat', hash: '$krb5pa$18$hashcat$HASHCATDOMAIN.COM$96c289009b05181bfd32062962740b1b1ce5f74eb12e0266cde74e81094661addab08c0c1a178882c91a0ed89ae4e0e68d2820b9cce69770' } },

    // ----- Keccak (17700-18000) & SHA3 (17300-17600), hand-written --------
    { modes: [17700], names: ['keccak-224'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeKeccakVerifier(224), example: { password: 'hashcat', hash: 'e1dfad9bafeae6ef15f5bbb16cf4c26f09f5f1e7870581962fc84636' } },
    { modes: [17800], names: ['keccak-256'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeKeccakVerifier(256), example: { password: 'hashcat', hash: '203f88777f18bb4ee1226627b547808f38d90d3e106262b5de9ca943b57137b6' } },
    { modes: [17900], names: ['keccak-384'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeKeccakVerifier(384), example: { password: 'hashcat', hash: '5804b7ada5806ba79540100e9a7ef493654ff2a21d94d4f2ce4bf69abda5d94bf03701fe9525a15dfdc625bfbd769701' } },
    { modes: [18000], names: ['keccak-512'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeKeccakVerifier(512), example: { password: 'hashcat', hash: '2fbf5c9080f0a704de2e915ba8fdae6ab00bbc026b2c1c8fa07da1239381c6b7f4dfd399bf9652500da723694a4c719587dd0219cb30eabe61210a8ae4dc0b03' } },
    { modes: [17300], names: ['sha3-224'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeSha3Verifier(224), example: { password: 'hashcat', hash: '412ef78534ba6ab0e9b1607d3e9767a25c1ea9d5e83176b4c2817a6c' } },
    { modes: [17400], names: ['sha3-256'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeSha3Verifier(256), example: { password: 'hashcat', hash: 'd60fcf6585da4e17224f58858970f0ed5ab042c3916b76b0b828e62eaf636cbd' } },
    { modes: [17500], names: ['sha3-384'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeSha3Verifier(384), example: { password: 'hashcat', hash: '983ba28532cc6320d04f20fa485bcedb38bddb666eca5f1e5aa279ff1c6244fe5f83cf4bbf05b95ff378dd2353617221' } },
    { modes: [17600], names: ['sha3-512'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeSha3Verifier(512), example: { password: 'hashcat', hash: '7c2dc1d743735d4e069f3bda85b1b7e9172033dfdd8cd599ca094ef8570f3930c3f2c0b7afc8d6152ce4eaad6057a2ff22e71934b3a3dd0fb55a7fc84a53144e' } },

    // ----- nested hex-digest combinators -----------------------------------
    { modes: [2600], names: ['md5-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: 'a936af92b0ae20b1ff6c3347a72e5fbe' } },
    { modes: [3500], names: ['md5-md5-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(_md5hex(String(p)))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '9882d0778518b095917eb589f6998441' } },
    { modes: [4300], names: ['md5-uc-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(String(p)).toUpperCase()) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: 'b8c385461bb9f9d733d3af832cf60b27' } },
    { modes: [4400], names: ['md5-sha1'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_sha1hex(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '288496df99b33f8f75a7ce4837d1b480' } },
    { modes: [4500], names: ['sha1-sha1'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1hex(_sha1hex(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '3db9184f5da4e463832b086211af8d2314919951' } },
    { modes: [4700], names: ['sha1-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1hex(_md5hex(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '92d85978d884eb1d99a51652b1139c8279fa8663' } },
    { modes: [4520], names: ['sha1-salt-sha1-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(s + _sha1hex(String(p)))).toString() === d; },
      example: { password: 'hashcat', hash: '59b80a295392eedb677ca377ad7bf3487928df96:136472340404074825440760227553028141804855170538' } },
    { modes: [300], names: ['mysql41', 'mysql5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => CryptoJS.SHA1(CryptoJS.SHA1(String(p))).toString() === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: 'fcf7c1b8749cf99d88e5f34271d636178fb5d130' } },

    // ----- HMAC with key = password ("<hex>:<salt>") -----------------------
    { modes: [50], names: ['hmac-md5-pass'], isFast: false, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacMD5), example: { password: 'hashcat', hash: 'e28e4e37e972a945e464b5226053bac0:40' } },
    { modes: [150], names: ['hmac-sha1-pass'], isFast: false, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA1), example: { password: 'hashcat', hash: '02b256705348a28b1d6c0f063907979f7e0c82f8:10323' } },
    { modes: [1450], names: ['hmac-sha256-pass'], isFast: false, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA256), example: { password: 'hashcat', hash: 'b435ffbacea34d5eb0dbc4d69a92f0152f2cf4cd364d34c2ece322ca22d8b334:21217' } },
    { modes: [1750], names: ['hmac-sha512-pass'], isFast: false, validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA512), example: { password: 'hashcat', hash: '138c00f17a1a0363f274817c91118f019aff09f937bfdaea844280a0c0e7811267cc4735d967d8640eed1218268c1c4a76fec8f7aa551491b353829f3a654270:885142' } },

    // ----- app-specific salted digests ("<hex>:<salt>", salt verbatim) -----
    { modes: [11], names: ['joomla', 'md5-pass-salt-joomla'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'ps', false), example: { password: 'hashcat', hash: 'b78f863f2c67410c41e617f724e22f34:89384528665349271307465505333378' } },
    { modes: [21], names: ['oscommerce', 'md5-salt-pass-osc'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, 'sp', false), example: { password: 'hashcat', hash: 'e983672a03adcc9767b24584338eb378:00' } },
    { modes: [23], names: ['skype'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + '\nskyper\n' + String(p)) === d; },
      example: { password: 'hashcat', hash: 'd04d74780881019341915c70d914db29:0675841' } },
    { modes: [2611], names: ['vbulletin-lt-385', 'md5-md5pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(String(p)) + s) === d; },
      example: { password: 'hashcat', hash: '28f9975808ae2bdc5847b1cda26033ea:308' } },
    { modes: [2711], names: ['vbulletin-gte-385'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.{30,}$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(String(p)) + s) === d; },
      example: { password: 'hashcat', hash: '0844fbb2fdeda31884a7a45ec2010bb6:324410183853308365427804872426' } },
    { modes: [2811], names: ['mybb', 'ipb'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(s) + _md5s(String(p))) === d; },
      example: { password: 'hashcat', hash: '022f7e02b3314f7d0968f73c00ba759f:67588' } },
    { modes: [121], names: ['smf', 'sha1-lcsalt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _sha1s(s.toLowerCase() + String(p)) === d; },
      example: { password: 'hashcat', hash: 'd27c0a627a45db487af161fcc3a4005d88eb8a1f:25551135' } },
    { modes: [101], names: ['nsldap', 'ssha'], isFast: true, validate: (h) => /^\{SHA\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier('SHA', CryptoJS.SHA1, 20), example: { password: 'hashcat', hash: '{SHA}uJ6qx+YUFzQbcQtyd2gpTQ5qJ3s=' } },
    { modes: [111], names: ['nsldaps', 'ssha1'], isFast: true, validate: (h) => /^\{SSHA\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier('SSHA', CryptoJS.SHA1, 20), example: { password: 'hashcat', hash: '{SSHA}FLzWcQqyle6Mo7NvrwXCMAmRzXQxNjYxMTYzNw==' } },
    { modes: [1411], names: ['ssha-256'], isFast: true, validate: (h) => /^\{SSHA256\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier('SSHA256', CryptoJS.SHA256, 32), example: { password: 'hashcat', hash: '{SSHA256}L5Wk0zPY2lmoR5pH20zngq37KkxFwgTquEhx95rxfVk3Ng==' } },
    { modes: [1711], names: ['ssha-512'], isFast: true, validate: (h) => /^\{SSHA512\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier('SSHA512', CryptoJS.SHA512, 64), example: { password: 'hashcat', hash: '{SSHA512}Bz8w5q6qEtB1Nnc8b1jfTvTXVTwohWag33oghQGOtLChnkZTw/cuJaHQlLJEI3AWKZGCRyLA6Phujdxo+is7AjA2MDcyNjY1Mg==' } },
    { modes: [3710], names: ['md5-salt-md5pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(String(p))) === d; },
      example: { password: 'hashcat', hash: 'a3aa0ae2b4a102a9974cdf40edeabee0:242812778074' } },
    { modes: [3800], names: ['md5-salt-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + String(p) + s) === d; },
      example: { password: 'hashcat', hash: '78274b1105fb8a7c415b43ffe35ec4a9:6' } },
    { modes: [4010], names: ['md5-salt-md5-salt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(s + String(p))) === d; },
      example: { password: 'hashcat', hash: '82422514daaa8253be0aa43f3e263af5:7530326651137' } },
    { modes: [4110], names: ['md5-salt-md5-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(String(p) + s)) === d; },
      example: { password: 'hashcat', hash: '45b1005214e2d9472a7ad681578b2438:64268771004' } },

    // ----- crypto wallets --------------------------------------------------
    { modes: [26600], names: ['metamask'], isFast: false,
      validate: (h) => /^\$metamask\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: verifyMetamask,
      example: { password: 'hashcat1', hash: '$metamask$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2CQ5BEjaIOShFE7g==$R95fzGt4UQ0uwrcrVYnIi4UcSlWn9wlmer+//526ZDwYAp50K82F1u1oacYcdjjhuEvbZnWk/uBG00UkgLLlO3WbINljqmu2QWdDEwjTgo/qWR6MU9d/82rxNiONHQE8UrZ8SV+htVr6XIB0ze3aCV0E+fwI93EeP79ZeDxuOEhuHoiYT0bHWMv5nA48AdluG4DbOo7SrDAWBVCBsEdXsOfYsS3/TIh0a/iFCMX4uhxY2824JwcWp4H36SFWyBYMZCJ3/U4DYFbbjWZtGRthoJlIik5BJq4FLu3Y1jEgza0AWlAvu4MKTEqrYSpUIghfxf1a1f+kPvxsHNq0as0kRwCXu09DObbdsiggbmeoBkxMZiFq0d9ar/3Gon0r3hfc3c124Wlivzbzu1JcZ3wURhLSsUS7b5cfG86aXHJkxmQDA5urBz6lw3bsIvlEUB2ErkQy/zD+cPwCG1Rs/WKt7KNh45lppCUkHccbf+xlpdc8OfUwj01Xp7BdH8LMR7Vx1C4hZCvSdtURVl0VaAMxHDX0MjRkwmqS' } },
    { modes: [26610], names: ['metamask-short'], isFast: false,
      validate: (h) => /^\$metamask-short\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: verifyMetamaskShort,
      example: { password: 'hashcat1', hash: '$metamask-short$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2CQ5BEjaIOShFE7g==$R95fzGt4UQ0uwrcrVYnIi4UcSlWn9wlmer+//526ZDwYAp50K82F1u1oacYcdjjhuEvbZnWk/uBG00UkgLLlOw==' } },
    { modes: [18800], names: ['blockchain-second-password'], isFast: false,
      validate: (h) => /^[A-Za-z0-9+/]{78,}={0,2}$/.test(h) && /^YnM6/.test(h),
      verify: verifyBlockchain2ndPass,
      example: { password: 'hashcat', hash: 'YnM6WYERjJfhxwepT7zV6odWoEUz1X4esYQb4bQ3KZ7bbZAyOTc1MDM3OTc1NjMyODA0ECcAAD3vFoc=' } },

    // ----- Bitcoin private keys (password = privkey, hash = address) --------
    { modes: [28501], names: ['bitcoin-wif-p2pkh-compressed'], isFast: false, validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2pkh), example: { password: 'KxhashcatxhXkULNJYF8Fu46G28SJrC7x2qwFtRuf38kVjkWxHg3', hash: '1Jv6EonXm9x4Dw4QjEPAhGfmzFxTL7b3Zj' } },
    { modes: [28502], names: ['bitcoin-wif-p2pkh-uncompressed'], isFast: false, validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2pkh), example: { password: '5KcL859EUnBDtVG76134U6DZWnVmpE996emJnWmTLRW2hashcat', hash: '1L9nr4GX4Zmd7gDL1UT75QPUqxSgNTvdHb' } },
    { modes: [28503], names: ['bitcoin-wif-p2wpkh-compressed'], isFast: false, validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2wpkh), example: { password: 'KyhashcatpL2CQmMUDVMVuEXqdLSvfQ6TBjkUuyttSvBa7GMiuLi', hash: 'bc1qxd76a5zamfyw0g2d2rxkdh0zt9m0uzmxmwjf0q' } },
    { modes: [28504], names: ['bitcoin-wif-p2wpkh-uncompressed'], isFast: false, validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2wpkh), example: { password: '5HzV19ffW9QTnmZHbwETRpPHm1d4hAP8PG1etUb3T3jjhashcat', hash: 'bc1qv8e65p73gmp4w3z6fqnyu8t6ct69vetsda3snd' } },
    { modes: [28505], names: ['bitcoin-wif-p2sh-p2wpkh-compressed'], isFast: false, validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2shP2wpkh), example: { password: 'L4hashcat7q6HMnMFcukyvxxVJvpabXYjxXLey8846NtWUyX4YLi', hash: '3H1YvmSdrjEfj9LvtiKJ8XiYq5htJRuejA' } },
    { modes: [28506], names: ['bitcoin-wif-p2sh-p2wpkh-uncompressed'], isFast: false, validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2shP2wpkh), example: { password: '5JjDR424kMePbt5Uxnm2t1NizhdiVPcf8gCj68PQpP2ihashcat', hash: '3LovFVx5zBRvusVcj7pf3JxV9V46kjKhKu' } },
    { modes: [30901], names: ['bitcoin-raw-p2pkh-compressed'], isFast: false, validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2pkh), example: { password: '59887ec9920239bd45b6a9f82b7c4e024f80beaf887e5ee6aac5de0a899d3068', hash: '14Fqy5AGRehazZ4NLzxFWy2E4BiNFdH9Ut' } },
    { modes: [30902], names: ['bitcoin-raw-p2pkh-uncompressed'], isFast: false, validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2pkh), example: { password: '2006a306cf8f61c18c4e78e5fc0f5a7aa473b5ffb41f34344a32f8e042786fa1', hash: '12sLRz1TKPZurKCwVqeT5FkW3Y7usipPbZ' } },
    { modes: [30903], names: ['bitcoin-raw-p2wpkh-compressed'], isFast: false, validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2wpkh), example: { password: '4d1987d7a341d51557af59996845740135ab2506515426ada57cc8ec05adf794', hash: 'bc1q926ca6n7wz7gm2gfd8xc5p0vu687ngvnknpx74' } },
    { modes: [30904], names: ['bitcoin-raw-p2wpkh-uncompressed'], isFast: false, validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2wpkh), example: { password: '25c9f8f734d87aacd9308705ca50b9819a57425ffbfae41cef869b19764d72c2', hash: 'bc1qq6samcuksd2f6rsc48eu3lkq87zp33vfud0p0t' } },
    { modes: [30905], names: ['bitcoin-raw-p2sh-p2wpkh-compressed'], isFast: false, validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2shP2wpkh), example: { password: '83b45ff8d85f37aafc05a8accd1f1cd5e50868b57e2ef0ef6f287bb4d8d17786', hash: '3JqAMRQN3Gd6i8yV3Kw7v55RmFxW7iW2Aq' } },
    { modes: [30906], names: ['bitcoin-raw-p2sh-p2wpkh-uncompressed'], isFast: false, validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2shP2wpkh), example: { password: '4c969ccc86d9e1f557b4ff1f19badc9a99718dd2aec8fcf66460612e05f5f7dd', hash: '3PmD8zdrFD8KVgLrguVDCP2RJB4Rh35G9Z' } },
    { modes: [11300], names: ['bitcoin-wallet-dat'], isFast: false,
      validate: (h) => /^\$bitcoin\$\d+\$[0-9a-fA-F]+\$\d+\$[0-9a-fA-F]+\$\d+\$/.test(h),
      verify: verifyWalletDat,
      example: { password: 'hashcat', hash: '$bitcoin$96$c265931309b4a59307921cf054b4ec6b6e4554369be79802e94e16477645777d948ae1d375191831efc78e5acd1f0443$16$8017214013543185$200460$96$480008005625057442352316337722323437108374245623701184230273883222762730232857701607167815448714$66$014754433300175043011633205413774877455616682000536368706315333388' } },
    { modes: [12700], names: ['blockchain-my-wallet'], isFast: false,
      validate: (h) => /^\$blockchain\$\d+\$[0-9a-fA-F]{48,}$/.test(h),
      verify: verifyBlockchainV1,
      example: { password: 'hashcat', hash: '$blockchain$288$713253722114000682636604801283547365b7a53a802a7388d08eb7e6c32c1efb4a157fe19bca940a753d7f16e8bdaf491aa9cf6cda4035ac48d56bb025aced81455424272f3e0459ec7674df3e82abd7323bc09af4fd0869fd790b3f17f8fe424b8ec81a013e1476a5c5a6a53c4b85a055eecfbc13eccf855f905d3ddc3f0c54015b8cb177401d5942af833f655947bfc12fc00656302f31339187de2a69ab06bc61073933b3a48c9f144177ae4b330968eb919f8a22cec312f734475b28cdfe5c25b43c035bf132887f3241d86b71eb7e1cf517f99305b19c47997a1a1f89df6248749ac7f38ca7c88719cf16d6af2394307dce55600b8858f4789cf1ae8fd362ef565cd9332f32068b3c04c9282553e658b759c2e76ed092d67bd55961ae' } },
    { modes: [15200], names: ['blockchain-my-wallet-v2'], isFast: false,
      validate: (h) => /^\$blockchain\$v2\$\d+\$\d+\$[0-9a-fA-F]{48,}$/.test(h),
      verify: verifyBlockchainV2,
      example: { password: 'hashcat', hash: '$blockchain$v2$5000$288$324724252428471806184866704068819419467b2b32fd9593fd1a274e0b68bf2c72e5a1f5e748fd319056d1e47ca7b40767136a2d97d7133d14faaeca50986f66cdbc0faec0a3fabbd0ba5d08d5322b6b53da021aacfc439c45bec0e9fe02ad81db82f94e9bd36a7d4d76b505c2339fcd46565d3abab958fbeb1de8bfc53beb96cde8fe44128965477c9ef0762c62bbb1d66532b4888e174ea949db54374a2ed9686a63eb0b5b17ae293f7410bb4ae5106f108314a259c5fd097d558515d79350713412159103a8a174cd384a14f3da45efe18044e1146036000231f6042577d0add98fc959d265368e398dc1550b0bc693e9023cd9d51b40e701bd786e19c3a281a90465aa6ea3f9e756d430164ab2eb43be5b6796d7ac15b2fe99217410f2' } },
 
    { modes: [7700], names: ['sap-codvn-b', 'sap-bcode'], isFast: false,
      validate: (h) => /^[^$]+\$[0-9A-Fa-f]{16}$/.test(h),
      verify: verifySapB,
      example: { password: 'hashcat', hash: '027642760180$77EC38630C08DF8D' } },
    { modes: [7800], names: ['sap-codvn-fg', 'sap-passcode'], isFast: false,
      validate: (h) => /^[^$]+\$[0-9A-Fa-f]{40}$/.test(h),
      verify: verifySapG,
      example: { password: 'hashcat', hash: '604020408266$32837BA7B97672BA4E5AC74767A4E6E1AE802651' } },
    { modes: [23700], names: ['rar3p-uncompressed'], isFast: false,
      validate: (h) => /^\$RAR3\$\*1\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{8}\*\d+\*\d+\*1\*[0-9a-fA-F]+\*30$/.test(h),
      verify: verifyRar3p,
      example: { password: 'hashcat', hash: '$RAR3$*1*e54a73729887cb53*49b0a846*16*14*1*34620bcca8176642a210b1051901921e*30' } },
    { modes: [12500], names: ['rar3hp'], isFast: false,
      validate: (h) => /^\$RAR3\$\*0\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{32}$/.test(h),
      verify: verifyRar3hp,
      example: { password: 'hashcat', hash: '$RAR3$*0*45109af8ab5f297a*adbf6c5385d7a40373e8f77d7b89d317' } },
    { modes: [13000], names: ['rar5'], isFast: false,
      validate: (h) => /^\$rar5\$16\$[0-9a-fA-F]+\$\d+\$[0-9a-fA-F]+\$8\$[0-9a-fA-F]{16}$/.test(h),
      verify: verifyRar5,
      example: { password: 'hashcat', hash: '$rar5$16$38466361001011015181344360681307$15$00000000000000000000000000000000$8$cc7a30583e62676a' } },
    { modes: [13600], names: ['winzip'], isFast: false,
      validate: (h) => /^\$zip2\$\*\d+\*[123]\*\d+\*[0-9a-fA-F]*\*[0-9a-fA-F]*\*\d+\*[0-9a-fA-F]*\*[0-9a-fA-F]+\*\$\/zip2\$$/.test(h),
      verify: verifyWinzipAes,
      example: { password: 'hashcat', hash: '$zip2$*0*1*0*0675369741458183*5dc5*0**36b85538918416712640*$/zip2$' } },
    { modes: [23001], names: ['securezip-aes128'], isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*128\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: 'hashcat', hash: '$zip3$*0*1*128*0*b4630625c92b6e7848f6fd86*df2f62611b3d02d2c7e05a48dad57c7d93b0bac1362261ab533807afb69db856676aa6e350320130b5cbf27c55a48c0f75739654ac312f1cf5c37149557fc88a92c7e3dde8d23edd2b839036e88092a708b7e818bf1b6de92f0efb5cce184cceb11db6b3ca0527d0bdf1f1137ee6660d9890928cd80542ac1f439515519147c14d965b5ba107c6227f971e3e115170bf*0*0*0*file.txt' } },
    { modes: [23002], names: ['securezip-aes192'], isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*192\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: 'hashcat', hash: '$zip3$*0*1*192*0*53ff2de8c280778e1e0ab997*603eb37dbab9ea109e2c405e37d8cae1ec89e1e0d0b9ce5bf55d1b571c343b6a3df35fe381c30249cb0738a9b956ba8e52dfc5552894296300446a771032776c811ff8a71d9bb3c4d6c37016c027e41fea2d157d5b0ce17804b1d7c1606b7c1121d37851bd705e001f2cd755bbf305966d129a17c1d48ff8e87cfa41f479090cd456527db7d1d43f9020ad8e73f851a5*0*0*0*file.txt' } },
    { modes: [23003], names: ['securezip-aes256'], isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*256\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: 'hashcat', hash: '$zip3$*0*1*256*0*39bff47df6152a0214d7a967*65ff418ffb3b1198cccdef0327c03750f328d6dd5287e00e4c467f33b92a6ef40a74bb11b5afad61a6c3c9b279d8bd7961e96af7b470c36fc186fd3cfe059107021c9dea0cf206692f727eeca71f18f5b0b6ee1f702b648bba01aa21c7b7f3f0f7d547838aad46868155a04214f22feef7b31d7a15e1abe6dba5e569c62ee640783bb4a54054c2c69e93ece9f1a2af9d*0*0*0*file.txt' } },
    { modes: [17210], names: ['pkzip-uncompressed'], isFast: false,
      validate: (h) => _zip.validatePkzip(h, 0),
      verify: verifyPkzip,
      example: { password: 'hashcat', hash: '$pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9fc7e2be1a1f4f664269fceb6cb88723a97408ae1fe07f774d31d1442ea8485081e63f919851ca0b7588d5e3442317fff19fe547a4ef97492ed75417c427eea3c4e146e16c100a2f8b6abd7e5988dc967e5a0e51f641401605d673630ea52ebb04da4b388489901656532c9aa474ca090dbac7cf8a21428d57b42a71da5f3d83fed927361e5d385ca8e480a6d42dea5b4bf497d3a24e79fc7be37c8d1721238cbe9e1ea3ae1eb91fc02aabdf33070d718d5105b70b3d7f3d2c28b3edd822e89a5abc0c8fee117c7fbfbfd4b4c8e130977b75cb0b1da080bfe1c0859e6483c42f459c8069d45a76220e046e6c2a2417392fd87e4aa4a2559eaab3baf78a77a1b94d8c8af16a977b4bb45e3da211838ad044f209428dba82666bf3d54d4eed82c64a9b3444a44746b9e398d0516a2596d84243b4a1d7e87d9843f38e45b6be67fd980107f3ad7b8453d87300e6c51ac9f5e3f6c3b702654440c543b1d808b62f7a313a83b31a6faaeedc2620de7057cd0df80f70346fe2d4dccc318f0b5ed128bcf0643e63d754bb05f53afb2b0fa90b34b538b2ad3648209dff587df4fa18698e4fa6d858ad44aa55d2bba3b08dfdedd3e28b8b7caf394d5d9d95e452c2ab1c836b9d74538c2f0d24b9b577*$/pkzip2$' } },
    { modes: [17200], names: ['pkzip-compressed'], isFast: false,
      validate: (h) => _zip.validatePkzip(h, 8),
      verify: verifyPkzip,
      example: { password: 'hashcat', hash: '$pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3031a6f903e5f4e3211c8fdc4671547bf77f6f682afbfcc7475d83898985621a7af9bccd1349d1976500a68c48f630b7f22d7a0955524d768e34868880461335417ddd149c65a917c0eb0a4bf7224e24a1e04cf4ace5eef52205f4452e66ded937db9545f843a68b1e84a2e933cc05fb36d3db90e6c5faf1bee2249fdd06a7307849902a8bb24ec7e8a0886a4544ca47979a9dfeefe034bdfc5bd593904cfe9a5309dd199d337d3183f307c2cb39622549a5b9b8b485b7949a4803f63f67ca427a0640ad3793a519b2476c52198488e3e2e04cac202d624fb7d13c2*$/pkzip2$' } },
    { modes: [17220], names: ['pkzip-multi-compressed'], isFast: false,
      validate: (h) => _zip.validatePkzip(h, { multi: true }),
      verify: verifyPkzip,
      example: { password: 'hashcat', hash: '$pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49d3bbeab6cb385b7fa8a28dcccd3098bfdd7*1*0*8*24*2a74*882a*51281ac874a60baedc375ca645888d29780e20d4076edd1e7154a99bde982152a736311f*2*0*e3*1c5*eda7a8de*0*29*8*e3*eda7*5096*1455781b59707f5151139e018bdcfeebfc89bc37e372883a7ec0670a5eafc622feb338f9b021b6601a674094898a91beac70e41e675f77702834ca6156111a1bf7361bc9f3715d77dfcdd626634c68354c6f2e5e0a7b1e1ce84a44e632d0f6e36019feeab92fb7eac9dda8df436e287aafece95d042059a1b27d533c5eab62c1c559af220dc432f2eb1a38a70f29e8f3cb5a207704274d1e305d7402180fd47e026522792f5113c52a116d5bb25b67074ffd6f4926b221555234aabddc69775335d592d5c7d22462b75de1259e8342a9ba71cb06223d13c7f51f13be2ad76352c3b8ed*$/pkzip2$' } },
    { modes: [17225], names: ['pkzip-multi-mixed'], isFast: false,
      validate: (h) => _zip.validatePkzip(h, { multi: true }),
      verify: verifyPkzip,
      example: { password: 'hashcat', hash: '$pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056edf9fa4540919c109742dcb32f797fc90ce0*1*0*8*24*431a*3f26*18e2461c0dbad89bd9cc763067a020c89b5e16195b1ac5fa7fb13bd246d000b6833a2988*2*0*23*17*1e3c1a16*2e4*2f*0*23*1e3c*3f2d*54ea4dbc711026561485bbd191bf300ae24fa0997f3779b688cdad323985f8d3bb8b0c*$/pkzip2$' } },
    { modes: [11600], names: ['7zip'], isFast: false,
      validate: (h) => /^\$7z\$\d+\$\d+\$\d+\$[0-9a-fA-F]*\$\d+\$[0-9a-fA-F]+\$\d+\$\d+\$\d+\$[0-9a-fA-F]+/.test(h),
      verify: verify7z,
      example: { password: 'hashcat', hash: '$7z$0$14$0$$11$33363437353138333138300000000000$2365089182$16$12$d00321533b483f54a523f624a5f63269' } },
    { modes: [16600], names: ['electrum-salt1'], isFast: false,
      validate: (h) => /^\$electrum\$[123]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}$/.test(h),
      verify: verifyElectrum16600,
      example: { password: 'hashcat', hash: '$electrum$1*44358283104603165383613672586868*c43a6632d9f59364f74c395a03d8c2ea' } },
    { modes: [21700], names: ['electrum-salt4'], isFast: false,
      validate: (h) => /^\$electrum\$4\*[0-9a-fA-F]{66}\*[0-9a-fA-F]+\*[0-9a-fA-F]{64}$/.test(h),
      verify: verifyElectrum21700,
      example: { password: 'hashcat', hash: '$electrum$4*03eae309d8bda5dcbddaae8145469193152763894b7260a6c4ba181b3ac2ed5653*8c594086a64dc87a9c1f8a69f646e31e8d3182c3c722def4427aa20684776ac26092c6f60bf2762e27adfa93fe1e952dcb8d6362224b9a371953aa3a2edb596ce5eb4c0879c4353f2cc515ec6c9e7a6defa26c5df346d18a62e9d40fcc606bc8c34322bf2212f77770a683788db0baf4cb43595c2a27fe5ff8bdcb1fd915bcd725149d8ee8f14c71635fecb04da5dde97584f4581ceb7d907dceed80ae5daa8352dda20b25fd6001e99a96b7cf839a36cd3f5656304e6998c18e03dd2fb720cb41386c52910c9cb83272c3d50f3a6ff362ab8389b0c21c75133c971df0a75b331796371b060b32fe1673f4a041d7ae08bbdeffb45d706eaf65f99573c07972701c97766b4d7a8a03bba0f885eb3845dfd9152286e1de1f93e25ce04c54712509166dda80a84c2d34652f68e6c01e662f8b1cc7c15103a4502c29332a4fdbdda470c875809e15aab3f2fcb061ee96992ad7e8ab9da88203e35f47d6e88b07a13b0e70ef76de3be20dc06facbddc1e47206b16b44573f57396265116b4d243e77d1c98bc2b28aa3ec0f8d959764a54ecdd03d8360ff2823577fe2183e618aac15b30c1d20986841e3d83c0bfabcedb7c27ddc436eb7113db927e0beae7522b04566631a090b214660152a4f4a90e19356e66ee7309a0671b2e7bfde82667538d193fc7e397442052c6c611b6bf0a04f629a1dc7fa9eb44bfad1bfc6a0bce9f0564c3b483737e447720b7fd038c9a961a25e9594b76bf8c8071c83fcacd689c7469f698ee4aee4d4f626a73e21ce4967e705e4d83e1145b4260330367d8341c84723a1b02567ffbab26aac3afd1079887b4391f05d09780fc65f8b4f68cd51391c06593919d7eafd0775f83045b8f5c2e59cef902ff500654ea29b7623c7594ab2cc0e05ffe3f10abc46c9c5dac824673c307dcbff5bc5f3774141ff99f6a34ec4dd8a58d154a1c72636a2422b8fafdef399dec350d2b91947448582d52291f2261d264d29399ae3c92dc61769a49224af9e7c98d74190f93eb49a44db7587c1a2afb5e1a4bec5cdeb8ad2aac9728d5ae95600c52e9f063c11cdb32b7c1d8435ce76fcf1fa562bd38f14bf6c303c70fb373d951b8a691ab793f12c0f3336d6191378bccaed32923bba81868148f029e3d5712a2fb9f610997549710716db37f7400690c8dfbed12ff0a683d8e4d0079b380e2fd856eeafb8c6eedfac8fb54dacd6bd8a96e9f8d23ea87252c1a7c2b53efc6e6aa1f0cc30fbaaf68ee7d46666afc15856669cd9baebf9397ff9f322cce5285e68a985f3b6aadce5e8f14e9f9dd16764bc4e9f62168aa265d8634ab706ed40b0809023f141c36717bd6ccef9ec6aa6bfd2d00bda9375c2fee9ebba49590a166*1b0997cf64bb2c2ff88cb87bcacd9729d404bd46db18117c20d94e67c946fedc' } },
    { modes: [21800], names: ['electrum-salt5'], isFast: false,
      validate: (h) => /^\$electrum\$5\*[0-9a-fA-F]{66}\*[0-9a-fA-F]+\*[0-9a-fA-F]{64}$/.test(h),
      verify: verifyElectrum21800,
      example: { password: 'hashcat', hash: '$electrum$5*02170fee7c35f1ef3b229edc90fbd0793b688a0d6f41137a97aab2343d315cce16*94cf72d8f5d774932b414a3344984859e43721268d2eb35fa531de5a2fc7024b463c730a54f4f46229dd9fede5034b19ac415c2916e9c16b02094f845795df0c397ff76d597886b1f9e014ad1a8f64a3f617d9900aa645b3ba86f16ce542251fc22c41d93fa6bc118be96d9582917e19d2a299743331804cfc7ce2c035367b4cbcfb70adfb1e10a0f2795769f2165d8fd13daa8b45eeac495b5b63e91a87f63b42e483f84a881e49adecacf6519cb564694b42dd9fe80fcbc6cdb63cf5ae33f35255266f5c2524dd93d3cc15eba0f2ccdc3c109cc2d7e8f711b8b440f168caf8b005e8bcdfe694148e94a04d2a738f09349a96600bd8e8edae793b26ebae231022f24e96cb158db141ac40400a9e9ef099e673cfe017281537c57f82fb45c62bdb64462235a6eefb594961d5eb2c46537958e4d04250804c6e9f343ab7a0db07af6b8a9d1a6c5cfcd311b8fb8383ac9ed9d98d427d526c2f517fc97473bd87cb59899bd0e8fb8c57fa0f7e0d53daa57c972cf92764af4b1725a5fb8f504b663ec519731929b3caaa793d8ee74293eee27d0e208a60e26290bc546e6fa9ed865076e13febfea249729218c1b5752e912055fbf993fbac5df2cca2b37c5e0f9c30789858ceeb3c482a8db123966775aeed2eee2fc34efb160d164929f51589bff748ca773f38978bff3508d5a7591fb2d2795df983504a788071f469d78c88fd7899cabbc5804f458653d0206b82771a59522e1fa794d7de1536c51a437f5d6df5efd6654678e5794ca429b5752e1103340ed80786f1e9da7f5b39af628b2212e4d88cd36b8a7136d50a6b6e275ab406ba7c57cc70d77d01c4c16e9363901164fa92dc9e9b99219d5376f24862e775968605001e71b000e2c7123b4b43f3ca40db17efd729388782e46e64d43ccb947db4eb1473ff1a3836b74fe312cd1a33b73b8b8d80c087088932277773c329f2f66a01d6b3fc1e651c56959ebbed7b14a21b977f3acdedf1a0d98d519a74b50c39b3052d840106da4145345d86ec0461cddafacc2a4f0dd646457ad05bf04dcbcc80516a5c5ed14d2d639a70e77b686f19cbfb63f546d81ae19cc8ba35cce3f3b5b9602df25b678e14411fecec87b8347f5047513df415c6b1a3d39871a6bcb0f67d9cf8311596deae45fd1d84a04fd58f1fd55c5156b7309af09094c99a53674809cb87a45f95a2d69f9997a38085519cb4e056f9efd56672a2c1fe927d5ea8eec25b8aff6e56f9a2310f1a481daf407b8adf16201da267c59973920fd21bb087b88123ef98709839d6a3ee34efb8ccd5c15ed0e46cff3172682769531164b66c8689c35a26299dd26d09233d1f64f9667474141cf9c6a6de7f2bc52c3bb44cfe679ff4b912c06df406283836b3581773cb76d375304f46239da5996594a8d03b14c02f1b35a432dc44a96331242ae31174*33a7ee59d6d17ed1ee99dc0a71771227e6f3734b17ba36eb589bdced56244135' } },
    { modes: [6100], names: ['whirlpool'], isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: verifyWhirlpool,
      example: { password: 'hashcat', hash: '7ca8eaaaa15eaa4c038b4c47b9313e92da827c06940e69947f85bc0fbef3eb8fd254da220ad9e208b6b28f6bb9be31dd760f1fdb26112d83f87d96b416a4d258' } },
    { modes: [22000], names: ['wpa-pbkdf2-pmkid'], isFast: false,
      validate: (h) => /^WPA\*0[12]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]*\*/.test(h),
      verify: verifyWpa,
      example: { password: 'hashcat!', hash: 'WPA*01*4d4fe7aac3a2cecab195321ceb99a7d0*fc690c158264*f4747f87f9f4*686173686361742d6573736964***' } },
    { modes: [22001], names: ['wpa-pmk-pmkid+eapol'], isFast: false,
      validate: (h) => /^WPA\*0[12]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]*\*/.test(h),
      verify: _wpa.verifyWpaPmk,
      example: { password: '88f43854ae7b1624fc2ab7724859e795130f4843c7535729e819cf92f39535dc', hash: 'WPA*01*5ce7ebe97a1bbfeb2822ae627b726d5b*27462da350ac*accd10fb464e*686173686361742d6573736964***' } },
    { modes: [16800], names: ['wpa-pmkid-pbkdf2'], isFast: false,
      validate: (h) => /^[0-9a-fA-F]{32}:[0-9a-fA-F]{12}:[0-9a-fA-F]{12}:[0-9a-fA-F]+$/.test(h),
      verify: _wpa.verify16800,
      example: { password: 'hashcat!', hash: '2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4:ed487162465a774bfba60eb603a39f3a' } },
    { modes: [16801], names: ['wpa-pmkid-pmk'], isFast: false,
      validate: (h) => /^[0-9a-fA-F]{32}:[0-9a-fA-F]{12}:[0-9a-fA-F]{12}$/.test(h),
      verify: _wpa.verify16801,
      example: { password: '5b13d4babb3714ccc62c9f71864bc984efd6a55f237c7a87fc2151e1ca658a9d', hash: '2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4' } },
    { modes: [2500], names: ['wpa-eapol-pbkdf2'], isFast: false,
      validate: (h) => /^48435058[0-9a-fA-F]{778,}$/.test(h),
      verify: _wpa.verify2500,
      example: { password: 'hashcat!', hash: '4843505804000000000235380000000000000000000000000000000000000000000000000000000000000151aecc428f182acefbd1a9e62d369a079265784da83ba4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b823a1cd402aed449cced04f552c5b5acfebf06ae96a09c96d9a01c443a17aa62258c4f651a68aa67b0001030077fe010900200000000000000001a4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b8230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018dd160050f20101000050f20201000050f20201000050f20200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' } },
    { modes: [2501], names: ['wpa-eapol-pmk'], isFast: false,
      validate: (h) => /^48435058[0-9a-fA-F]{778,}$/.test(h),
      verify: _wpa.verify2501,
      example: { password: '7f620a599c445155935a35634638fa67b4aafecb92e0bd8625388757a63c2dda', hash: '4843505804000000000235380000000000000000000000000000000000000000000000000000000000000151aecc428f182acefbd1a9e62d369a079265784da83ba4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b823a1cd402aed449cced04f552c5b5acfebf06ae96a09c96d9a01c443a17aa62258c4f651a68aa67b0001030077fe010900200000000000000001a4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b8230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018dd160050f20101000050f20201000050f20201000050f20200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' } },

    // ----- easy digest breadth (crypto-js only) ----------------------------
    // raw utf16le
    { modes: [70], names: ['md5-utf16le'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.MD5), example: { password: 'hashcat', hash: '2303b15bfa48c74a74758135a0df1201' } },
    { modes: [170], names: ['sha1-utf16le'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA1), example: { password: 'hashcat', hash: 'b9798556b741befdbddcbf640d1dd59d19b1e193' } },
    { modes: [1470], names: ['sha256-utf16le'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA256), example: { password: 'hashcat', hash: '9e9283e633f4a7a42d3abc93701155be8afe5660da24c8758e7d3533e2f2dc82' } },
    { modes: [1770], names: ['sha512-utf16le'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA512), example: { password: 'hashcat', hash: '79bba09eb9354412d0f2c037c22a777b8bf549ab12d49b77d5b25faa839e4378d8f6fa11aceb6d9413977ae5ad5d011568bad2de4f998d75fd4ce916eda83697' } },
    { modes: [10870], names: ['sha384-utf16le'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA384), example: { password: 'hashcat', hash: '48e61d68e93027fae35d405ed16cd01b6f1ae66267833b4a7aa1759e45bab9bba652da2e4c07c155a3d8cf1d81f3a7e8' } },
    // salted sha224 / sha384
    { modes: [1310], names: ['sha224-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA224, 'ps', false), example: { password: 'hashcat', hash: '0cf361904f4b0234cf4ade8496d8c11c04e5982db967603e82f22b2f:89452466460220844541730694146873525188525677' } },
    { modes: [1320], names: ['sha224-salt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA224, 'sp', false), example: { password: 'hashcat', hash: '4258a61d3d0d5a5b6796f0ab02d081e998fe657d55d22091d3b51409:36669207' } },
    { modes: [10810], names: ['sha384-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, 'ps', false), example: { password: 'hashcat', hash: 'ca1c843a7a336234baf9db2e10bc38824ce523402fbd7741286b1602bdf6cb869a45289bb9fb706bd404b9f3842ff729:2746460797049820734631508' } },
    { modes: [10820], names: ['sha384-salt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, 'sp', false), example: { password: 'hashcat', hash: '63f63d7f82d4a4cb6b9ff37a6bc7c5ec39faaf9c9078551f5cbf7960e76ded87b643d37ac53c45bc544325e7ff83a1f2:93362' } },
    { modes: [10830], names: ['sha384-utf16le-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, 'ps', true), example: { password: 'hashcat', hash: '3516a589d2ed4071bf5e36f22e11212b3ad9050b9094b23067103d51e99dcb25c4dc397dba8034fed11a8184acfbb699:577730514588712' } },
    { modes: [10840], names: ['sha384-salt-utf16le-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, 'sp', true), example: { password: 'hashcat', hash: '316e93ea8e04de3e5a909c53d36923a31a16c1b9e89b44201d6082f87ca49c5bca53cad65f685207db3ea2ccc7ca40f8:700067651' } },

    // ----- more combinators (crypto-js only; format "<hex>:<salt>" unless noted) -----
    { modes: [2630], names: ['md5-md5-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_md5s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '0127eecea3120e34c8934ba3b72a390a:0' } },
    { modes: [4410], names: ['md5-sha1pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_sha1s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'bc8319c0220bff8a0d7f5d703114a725:34659348756345251' } },
    { modes: [4420], names: ['md5-sha1-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_sha1s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '34ebbba3e5c98f6253c160eae53da092:6224378456121050285' } },
    { modes: [4430], names: ['md5-sha1-salt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_sha1s(String(h).slice(i + 1) + String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'df0e9ede5b6c7d1f1b47199f86029002:59132809201799180722359939692710461886' } },
    { modes: [4510], names: ['sha1-sha1pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha1s(_sha1s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '9138d472fce6fe50e2a32da4eec4ecdc8860f4d5:hashcat1' } },
    { modes: [4710], names: ['sha1-md5pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha1s(_md5s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1' } },
    { modes: [4900], names: ['sha1-salt-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _sha1s(s + String(p) + s) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '75d280ca9a0c2ee18729603104ead576d9ca6285:347070' } },
    { modes: [5000], names: ['sha1-sha1-salt-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _sha1s(_sha1s(s + String(p) + s)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '05ac0c544060af48f993f9c3cdf2fc03937ea35b:232725102020' } },
    { modes: [21100], names: ['sha1-md5-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha1s(_md5s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'aade80a61c6e3cd3cac614f47c1991e0a87dd028:6' } },
    { modes: [22300], names: ['sha256-salt-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _sha256s(s + String(p) + s) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '755a8ce4e0cf0baee41d714aa35c9fca803106608f718f973eab006578285007:11265' } },
    { modes: [20710], names: ['sha256-sha256pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha256s(_sha256s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'bfede293ecf6539211a7305ea218b9f3f608953130405cda9eaba6fb6250f824:7218532375810603' } },
    { modes: [20720], names: ['sha256-salt-sha256pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha256s(String(h).slice(i + 1) + _sha256s(String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'bae9edada8358fcebcd811f7d362f46277fb9d488379869fba65d79701d48b8b:869dc2ed80187919' } },
    { modes: [20730], names: ['sha256-sha256-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha256s(_sha256s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'ad66bdc0841d7e08d96c03de271ce14e77de078746b535adbf9d4b6ccbf2a517:7218532375810603' } },
    { modes: [33000], names: ['md5-salt1-pass-salt2'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; return _md5s(q[1] + String(p) + q[2]) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '036a81bc84e01700faf965c3caaa3954:0243402616975530019305541949338903179746132451440267505028190519468680111713847350899833009965414425621884797638402856957040435715380438220464016:0757380776148401126145133134435506200715895167468508855794708942913462135276430452032928239699197100625556660484150983610760766285767453357925167463064045123083116191440783332986105343359475417787249790516137833723344398087127577224833364437305770807742238' } },
    // unsalted combinators
    { modes: [18500], names: ['sha1-md5-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1s(_md5s(_md5s(String(p)))) === String(h).toLowerCase(), example: { password: 'hashcat', hash: '888a2ffcb3854fba0321110c5d0d434ad1aa2880' } },
    { modes: [20800], names: ['sha256-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _sha256s(_md5s(String(p))) === String(h).toLowerCase(), example: { password: 'hashcat', hash: '74ee1fae245edd6f27bf36efc3604942479fceefbadab5dc5c0b538c196eb0f1' } },
    { modes: [32800], names: ['md5-sha1-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5s(_sha1s(_md5s(String(p)))) === String(h).toLowerCase(), example: { password: 'hashcat', hash: '7b4f60b54472980e922280e225150dfa' } },
    { modes: [34400], names: ['sha224-sha224'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha224s(_sha224s(String(p))) === String(h).toLowerCase(), example: { password: 'hashcat', hash: 'b7d9a0e57e6e94e8b87996b81ffa64b05d237c58fff1d7a4e4fe2a77' } },
    { modes: [34500], names: ['sha224-sha1'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha224s(_sha1s(String(p))) === String(h).toLowerCase(), example: { password: 'hashcat', hash: '10d302483c927df95abba98d69dcd9608365241d1523a8cc5fcbcedc' } },

    // ----- PBKDF2/PBKDF1 crypt formats (crypto-js PBKDF2) -----
    { modes: [10000], names: ['django-pbkdf2-sha256'], isFast: false, validate: (h) => /^pbkdf2_sha256\$\d+\$[^$]+\$[A-Za-z0-9+/]+=*$/.test(h),
      verify: _kdf.verifyDjango, example: { password: 'hashcat', hash: 'pbkdf2_sha256$10000$1135411628$bFYX62rfJobJ07VwrUMXfuffLfj2RDM2G6/BrTrUWkE=' } },
    { modes: [21600], names: ['web2py-pbkdf2-sha512'], isFast: false, validate: (h) => /^pbkdf2\(\d+,\d+,sha512\)\$[^$]+\$[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyWeb2py, example: { password: 'hashcat', hash: 'pbkdf2(1000,20,sha512)$744943$c5f8cdef76e3327c908d8d96d4abdb3d8caba14c' } },
    { modes: [32900], names: ['pbkdf1-sha1'], isFast: false, validate: (h) => /^PBKDF1:sha1:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: _kdf.verifyPbkdf1Sha1, example: { password: 'hashcat', hash: 'PBKDF1:sha1:1000:cGVuZ3VpbmtlZXBlcg==:J4BrIhXDUHNQ9lPPrWKn4V7Of9Y=' } },
    { modes: [20200], names: ['passlib-pbkdf2-sha512'], isFast: false, validate: (h) => /^\$pbkdf2-sha512\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha512, example: { password: 'hashcat', hash: '$pbkdf2-sha512$25000$LyWE0HrP2RsjZCxlDGFMKQ$1vC5Ohk2mCS9b6akqsEfgeb4l74SF8XjH.SljXf3dMLHdlY1GK9ojcCKts6/asR4aPqBmk74nCDddU3tvSCJvw' } },
    { modes: [20300], names: ['passlib-pbkdf2-sha256'], isFast: false, validate: (h) => /^\$pbkdf2-sha256\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha256, example: { password: 'hashcat', hash: '$pbkdf2-sha256$29000$x9h7j/Ge8x6DMEao1VqrdQ$kra3R1wEnY8mPdDWOpTqOTINaAmZvRMcYd8u5OBQP9A' } },
    { modes: [20400], names: ['passlib-pbkdf2-sha1'], isFast: false, validate: (h) => /^\$pbkdf2\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha1, example: { password: 'hashcat', hash: '$pbkdf2$131000$r5WythYixPgfQ2jt3buXcg$8Kdr.QQEOaZIXNOrrru36I/.6Po' } },
    { modes: [9200], names: ['cisco-ios-pbkdf2-sha256', 'cisco-type8'], isFast: false, validate: (h) => /^\$8\$[^$]+\$.{43}$/.test(h),
      verify: _kdf.verifyCisco8, example: { password: 'hashcat', hash: '$8$84486783037343$pYNyVrtyMalQrZLxRi7ZLQS1Fl.jkYCgASUi5P8JNb2' } },
    { modes: [9300], names: ['cisco-ios-scrypt', 'cisco-type9'], isFast: false, validate: (h) => /^\$9\$[^$]+\$.{43}$/.test(h),
      verify: _kdf.verifyCisco9, example: { password: 'hashcat', hash: '$9$87023684531115$phio0TBQwaO7KZ8toQFyGFyDvyOzidaypRWN0uKX0hU' } },
    { modes: [10300], names: ['sap-codvn-h-issha1'], isFast: false, validate: (h) => /^\{x-issha, \d+\}.+$/.test(h),
      verify: _kdf.verifySapCodvnH1, example: { password: 'hashcat', hash: '{x-issha, 1024}BnjXMqcNTwa3BzdnUOf1iAu6dw02NzU4MzE2MTA=' } },
    { modes: [35000], names: ['sap-codvn-h-issha512'], isFast: false, validate: (h) => /^\{x-isSHA512, \d+\}.+$/.test(h),
      verify: _kdf.verifySapCodvnH512, example: { password: 'hashcat', hash: '{x-isSHA512, 15000}YZH/V2T7zlQMGeWLBarm5Oi3qV9Y8ByXQijD28+bjtLdo7YssXaUBkxMXbS3l4yVlYw97tvYj+vu/L37sg1reDEzODQ4MDY1NzQ1NjQ=' } },
    { modes: [12800], names: ['ms-azuresync-pbkdf2'], isFast: false, validate: (h) => /^v1;PPH1_MD4,[0-9a-fA-F]+,\d+,[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyAzureSync, example: { password: 'hashcat', hash: 'v1;PPH1_MD4,54188415275183448824,100,55b530f052a9af79a7ba9c466dddcb8b116f8babf6c3873a51a3898fb008e123' } },
    { modes: [1600], names: ['apr1-md5', 'apache-md5'], isFast: false, validate: (h) => /^\$apr1\$[^$]*\$[./A-Za-z0-9]{22}$/.test(h),
      verify: verifyApr1, example: { password: 'hashcat', hash: '$apr1$62722340$zGjeAwVP2KwY6MtumUI1N/' } },
    { modes: [32050], names: ['netiq-sspr-pbkdf2-sha1'], isFast: false, validate: (h) => /^\$pbkdf2-hmac-sha1\$\d+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyNetIqSha1, example: { password: 'hashcat', hash: '$pbkdf2-hmac-sha1$100000$7134180503252384106490944216249411431665011151428170747164626720$990e0c5f62b1384d48cbe3660329b9741c4a8473' } },
    { modes: [32060], names: ['netiq-sspr-pbkdf2-sha256'], isFast: false, validate: (h) => /^\$pbkdf2-sha256\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha256, example: { password: 'hashcat', hash: '$pbkdf2-sha256$100000$MDUzMTE4NjQyNDc5NTQxMjAwMjg1OTYxNjAxNDgzNzc$bwYpAyQ2g5PqdnMj8mJ46mkwQbyztw8gEQqnhDHj48c' } },
    { modes: [32070], names: ['netiq-sspr-pbkdf2-sha512'], isFast: false, validate: (h) => /^\$pbkdf2-hmac-sha512\$\d+\.[0-9a-fA-F]+\.[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyNetIqSha512, example: { password: 'hashcat', hash: '$pbkdf2-hmac-sha512$100000.0211258841559010919749469547425215185689838310218571790549787198.1659e40e64daf84d635a5f1ed2f5708f6735233bed471994bdc0307b3c5f77597f79bdcdd088d1e79357b383809ddfd84379006b49e14f4ff45c449071478777' } },
    { modes: [21000], names: ['bitshares-v0'], isFast: false, validate: (h) => /^[0-9a-fA-F]{128}$/.test(h),
      verify: _coins.verifyBitShares, example: { password: 'hashcat', hash: 'caec04bdf7c17f763a9ec7439f7c9abda112f1bfc9b1bb684fef9b6142636979b9896cfc236896d821a69a961a143dd19c96d59777258201f1bbe5ecc2a2ecf5' } },
    { modes: [15600], names: ['ethereum-pbkdf2'], isFast: false, validate: (h) => /^\$ethereum\$p\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumPbkdf2, example: { password: 'hashcat', hash: '$ethereum$p*1024*38353131353831333338313138363430*a8b4dfe92687dbc0afeb5dae7863f18964241e96b264f09959903c8c924583fc*0a9252861d1e235994ce33dbca91c98231764d8ecb4950015a8ae20d6415b986' } },
    { modes: [15700], names: ['ethereum-scrypt'], isFast: false, validate: (h) => /^\$ethereum\$s\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumScrypt, example: { password: 'hashcat', hash: '$ethereum$s*262144*8*1*3134313837333434333838303231333633373433323633373534333136363537*73da7f80ec3bd4f2a128c3a815cfb4d576ecb1a9b47024c902e62ea926f7795b*910e0f8dc1f7ba41959e1089bb769f3e919109591913cc33ba03953d7a905efd' } },
    { modes: [28200], names: ['exodus-scrypt-gcm'], isFast: false, validate: (h) => /^EXODUS:\d+:\d+:\d+:[^:]+:[^:]+:[^:]+:[^:]+$/.test(h),
      verify: _coins.verifyExodus, example: { password: 'hashcat', hash: 'EXODUS:16384:8:1:IYkXZgFETRmFp4wQXyP8XMe3LtuOw8wMdLcBVQ+9YWE=:lq0W9ekN5sC0O7Xw:UD4a6mUUhkTbQtGWitXHZUg0pQ4RHI6W/KUyYE95m3k=:ZuNQckXOtr4r21x+DT1zpQ==' } },
    { modes: [31900], names: ['metamask-mobile'], isFast: false, validate: (h) => /^\$metamaskMobile\$[^$]+\$[0-9a-fA-F]{32}\$[^$]+$/.test(h),
      verify: _coins.verifyMetamaskMobile, example: { password: 'hashcat1', hash: '$metamaskMobile$JV4j2dUDl7n+sujyqW3Wvg==$398f9b04c822d36bfcbdd1e68c82d1e8$auj3J2TwOZ4ev3UIGmNa7VXLh0Nmzr3rDbpXRRrONr4=' } },
    { modes: [29600], names: ['terra-station'], isFast: false, validate: (h) => /^[0-9a-fA-F]{64}[A-Za-z0-9+/=]{40,}$/.test(h),
      verify: _coins.verifyTerra, example: { password: 'hashcat', hash: '67445496c838e96c1424a8dae4b146f0fc247c8c34ef33feffeb1e4412018512wZGtBMeN84XZE2LoOKwTGvA4Ee4m7PR1lDGIdWUV6OSUZKRiKFx9tlrnZLt8r8OfOzbwUS2a2Uo+nrrP6F85fh4eHstwPJw0KwzHWB8br58=' } },
    { modes: [25500], names: ['stellar-wallet-xlm'], isFast: false, validate: (h) => /^\$stellar\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: _coins.verifyStellar, example: { password: 'hashcat', hash: '$stellar$YAlIJziURRcBEWUwRSRDWA==$EutMmmcV5Hbf3p1I$rfSAF349RvGKG4R4Z2VCrH9WjNEKjbJa9hpOja9Yn8MwXruuFEMtw47HPn9CYj+JJ5Rb4Z87Wejj1c4fqpbMZHFOnqtQsVAr' } },
    { modes: [29800], names: ['bisq-scrypt'], isFast: false, validate: (h) => /^\$bisq\$3\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyBisq, example: { password: 'hashcat1', hash: '$bisq$3*32768*8*6*31d838af87f99cb8*5cfb7bf3228d9e865881156e17b1866589ffa6b757011e25d1319083595236d2' } },
    { modes: [27700], names: ['multibit-classic-scrypt'], isFast: false, validate: (h) => /^\$multibit\$3\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyMultibitClassicScrypt, example: { password: 'hashcat', hash: '$multibit$3*16384*8*1*7523cb5482e81b81*91780fd49b81a782ab840157a69ba7996d81270eaf456c850f314fc1787d9b0b' } },
    { modes: [22700], names: ['multibit-hd-scrypt'], isFast: false, validate: (h) => /^\$multibit\$2\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}$/.test(h),
      verify: _coins.verifyMultibitHd, example: { password: 'hashcat', hash: '$multibit$2*2e311aa2cc5ec99f7073cacc8a2d1938*e3ad782e7f92d66a3cdfaec43a46be29*5d1cabd4f4a50ba125f88c47027fff9b' } },
    { modes: [22500], names: ['multibit-classic-md5'], isFast: false, validate: (h) => /^\$multibit\$1\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyMultibitMd5, example: { password: 'hashcat', hash: '$multibit$1*e5912fe5c84af3d5*5f0391c219e8ef62c06505b1f6232858f5bcaa739c2b471d45dd0bd8345334de' } },
    { modes: [34700], names: ['blockchain-legacy'], isFast: false, validate: (h) => /^\$blockchain\$\d+\$[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyBlockchainLegacy, example: { password: 'hashcat', hash: '$blockchain$269$0349575305940509451603791869345994679e29d1618f26ed65ee15ad65d1af046f51ffcfbfa82dcccea07bb0f0fff725af53b96910646440b361453addc5caeb2a09479dc6cce3a1ebf138e2649689ab286ba2db6bd5edef310cac8f9386f002a534e9346cdc61bd0e21ca738eb2418a8158c83a43517981c43d8792cad6f290cbf40d5a3c1bb20283fcb44c59cae2dc90c898dbc4e960ca666653a08d90471610a8b9bf590752e8d8bee27e7aa58d015324dae83c87a46384ed8f947e37e65d4572018b5bfd8fd8ea70df777c8b692bc613ccb528356d1844490ac2b3be2dd8927fbf1aabf9b6cedec39742ed92a03220f4468bd32c1eed5d5c3c3aa0be459e06466c94991df97f335bd661' } },
    { modes: [16300], names: ['ethereum-presale'], isFast: false, validate: (h) => /^\$ethereum\$w\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumPresale, example: { password: 'hashcat', hash: '$ethereum$w*e94a8e49deac2d62206bf9bfb7d2aaea7eb06c1a378cfc1ac056cc599a569793c0ecc40e6a0c242dee2812f06b644d70f43331b1fa2ce4bd6cbb9f62dd25b443235bdb4c1ffb222084c9ded8c719624b338f17e0fd827b34d79801298ac75f74ed97ae16f72fccecf862d09a03498b1b8bd1d984fc43dd507ede5d4b6223a582352386407266b66c671077eefc1e07b5f42508bf926ab5616658c984968d8eec25c9d5197a4a30eed54c161595c3b4d558b17ab8a75ccca72b3d949919d197158ea5cfbc43ac7dd73cf77807dc2c8fe4ef1e942ccd11ec24fe8a410d48ef4b8a35c93ecf1a21c51a51a08f3225fbdcc338b1e7fdafd7d94b82a81d88c2e9a429acc3f8a5974eafb7af8c912597eb6fdcd80578bd12efddd99de47b44e7c8f6c38f2af3116b08796172eda89422e9ea9b99c7f98a7e331aeb4bb1b06f611e95082b629332c31dbcfd878aed77d300c9ed5c74af9cd6f5a8c4a261dd124317fb790a04481d93aec160af4ad8ec84c04d943a869f65f07f5ccf8295dc1c876f30408eac77f62192cbb25842470b4a5bdb4c8096f56da7e9ed05c21f61b94c54ef1c2e9e417cce627521a40a99e357dd9b7a7149041d589cbacbe0302db57ddc983b9a6d79ce3f2e9ae8ad45fa40b934ed6b36379b780549ae7553dbb1cab238138c05743d0103335325bd90e27d8ae1ea219eb8905503c5ad54fa12d22e9a7d296eee07c8a7b5041b8d56b8af290274d01eb0e4ad174eb26b23b5e9fb46ff7f88398e6266052292acb36554ccb9c2c03139fe72d3f5d30bd5d10bd79d7cb48d2ab24187d8efc3750d5a24980fb12122591455d14e75421a2074599f1cc9fdfc8f498c92ad8b904d3c4307f80c46921d8128*f3abede76ac15228f1b161dd9660bb9094e81b1b*d201ccd492c284484c7824c4d37b1593' } },
    { modes: [25900], names: ['knx-ip-secure'], isFast: false, validate: (h) => /^\$knx-ip-secure-device-authentication-code\$\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyKnx, example: { password: 'hashcat', hash: '$knx-ip-secure-device-authentication-code$*3033*fa7c0d787a9467c209f0a6e7cf16069ed704f3959dce19e45d7935c0a91bce41*f927640d9bbe9a4b0b74dd3289ad41ec' } },
    { modes: [33400], names: ['mega-nz-link'], isFast: false, validate: (h) => /^P![A-Za-z0-9_-]+$/.test(h),
      verify: _coins.verifyMega, example: { password: 'hashcat', hash: 'P!AgD________U2XVjJi1vxkJgMPf5rkQYUn1H_6WI_sKtiic69mqBKP_____________________O_PDG0Om7BSapL1QoRAgUrz9vzaZmrYnU8t-Au6hteg' } },
    { modes: [32500], names: ['dogechain-wallet'], isFast: false, validate: (h) => /^\$dogechain\$\d\*\d+\*[A-Za-z0-9+/=]+\*[A-Za-z0-9+/=]+$/.test(h),
      verify: _coins.verifyDogechain, example: { password: 'hashcat', hash: '$dogechain$0*5000*EEmAkgiMlVrToRhu2suq91R5Frf+VQCvNzv9lj6OwRWIf/3IM31wqhJM7gGQpinXH9kqHkuQ2DMZxspgA7QFAddsUWvZxGdNAkaeKy90EAsTLIuDQnH3plfBQfmL6j5NPaH7Nr7kF1PdvM0pbUw6XHySBYkD/rPHNM6n58NRK4xfO4VVMykeX3+m2LaVyv5s269r/op38svRPT0YFGpRcanY6/U1BeSrvG2IXii1BKXXAcVEN4GFmyEQRWKI0uZE+3M0atf7UEPD4K9tmEKosqdsF4MFLiBtfI4eq0+926ijoezDmUPvHIiyQZ9CH2jZ*6jOgqW/GxL9He1afQiINIg==' } },
    { modes: [501], names: ['juniper-ive'], isFast: false, validate: (h) => /^[A-Za-z0-9+\/]{102}==$/.test(h),
      verify: _kdf.verifyJuniper, example: { password: 'hashcat', hash: '3u+UR6n8AgABAAAAHxxdXKmiOmUoqKnZlf8lTOhlPYy93EAkbPfs5+49YLFd/B1+omSKbW7DoqNM40/EeVnwJ8kYoXv9zy9D5C5m5A==' } },
    { modes: [35100], names: ['sm3crypt'], isFast: false, validate: (h) => /^\$sm3\$(?:rounds=\d+\$)?[^$]+\$[.\/0-9A-Za-z]{43}$/.test(h),
      verify: _sm3.verifySm3crypt, example: { password: 'hashcat', hash: '$sm3$KTTUB40dW4mRyRFd$ul2xLiIY3FJtbo8sv1R93sAYCkxQCH/6rmS1kD5vJYA' } },
    { modes: [1500], names: ['descrypt', 'des-crypt'], isFast: false, validate: (h) => /^[.\/0-9A-Za-z]{13}$/.test(h),
      verify: _des.verifyDescrypt, example: { password: 'hashcat', hash: '24leDr0hHfb3A' } },
    { modes: [12400], names: ['bsdi-crypt', 'bsdicrypt'], isFast: false, validate: (h) => /^_[.\/0-9A-Za-z]{4}[.\/0-9A-Za-z]{4}[.\/0-9A-Za-z]{11}$/.test(h),
      verify: _des.verifyBsdi, example: { password: 'hashcat', hash: '_GW..8841inaTltazRsQ' } },
    { modes: [7401], names: ['mysql-sha256crypt'], isFast: false, validate: (h) => /^\$mysql\$A\$\d{3}\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: verifyMysqlA, example: { password: 'hashcat', hash: '$mysql$A$005*F9CC98CE08892924F50A213B6BC571A2C11778C5*625479393559393965414D45316477456B484F41316E64484742577A2E3162785353526B7554584647562F' } },
    { modes: [10901], names: ['redhat-389-ds-pbkdf2'], isFast: false, validate: (h) => /^\{PBKDF2_SHA256\}.+$/.test(h),
      verify: _kdf.verifyRedHat389, example: { password: 'hashcat', hash: '{PBKDF2_SHA256}AAAgADkxMjM2NTIzMzgzMjQ3MjI4MDAwNTk5OTAyOTk4NDI2MjkyMzAzNjg0NjQwOTMxNjI3OTMzNjg0MDI0OTY5NTe5ULagRTYpLaUoeqJMg8x9W/DXu+9VTFaVhaYvebYrY+sOqn1ZMRnws22C1uAkiE2tFM8qN+xw5xe7OmCPZ203NuruK4oB33QlsKIEz4ppm0TR94JB9PJx7lIQwFHD3FUNUNryj4jk6UYyJ4+V1Z9Ug/Iy/ylQBJgfs5ihzgxHYZrfp1wUCXFzlZG9mxmziPm8VFnAhaX4+FBAZvLAx33jpbKOwEg7TmwP2VJ8BNFLQRqwYdlqIjQlAhncXH+dqIF9VdM4MonAA0hx76bMvFTP7LF5VO1IqVmcuYz7YG9v4KKRjnvoUUqOj6okUBQTay3EzsdFVnUW1FemYOccJd5q' } },

    // ----- Easy tier: more digest combinators (crypto-js only) -----
    { modes: [3610], names: ['md5-md5-md5-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_md5s(_md5s(String(p))) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'a0ab79f9e2b5a4434d2da61673b56362:1234' } },
    { modes: [3910], names: ['md5-md5pass-md5salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_md5s(String(p)) + _md5s(String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'd8281daba5da597503d12fe31808b4a7:283053' } },
    { modes: [4711], names: ['huawei-sha1-md5pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha1s(_md5s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1' } },
    { modes: [19300], names: ['sha1-salt1-pass-salt2'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; return _sha1s(q[1] + String(p) + q[2]) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '630d2e918ab98e5fad9c61c0e4697654c4c16d73:18463812876898603420835420139870031762867:4449516425193605979760642927684590668549584534278112685644182848763890902699756869283142014018311837025441092624864168514500447147373198033271040848851687108629922695275682773136540885737874252666804716579965812709728589952868736177317883550827482248620334' } },
    { modes: [20900], names: ['md5-sha1-md5-sha1-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5s(_sha1s(String(p)) + _md5s(String(p)) + _sha1s(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '100b3a4fc1dc8d60d9bf40688d8b740a' } },
    { modes: [21200], names: ['md5-sha1salt-md5pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _md5s(_sha1s(s) + _md5s(String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'e69b7a7fe1bf2ad9ef116f79551ee919:baa038987e582431a6d' } },
    { modes: [21300], names: ['md5-salt-sha1-salt-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _md5s(s + _sha1s(s + String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '799dc7d9aa4d3f404cc21a4936dbdcde:68617368636174' } },
    { modes: [21310], names: ['md5-salt1-sha1-salt2-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; return _md5s(q[1] + _sha1s(q[2] + String(p))) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'dc91b5a658ef4b7d859e90742f340e24:708237:d270e9eea5802e346bcaa9b229f37766' } },
    { modes: [21900], names: ['md5-md5-md5-pass-salt1-salt2'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; return _md5s(_md5s(_md5s(String(p) + q[1])) + q[2]) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '2c749af6c65cf3e82e5837e3056727f5:59331674906582121215362940957615121466283616005471:17254656838978443692786064919357750120910718779182716907569266' } },
    { modes: [22800], names: ['simpla-md5-salt-pass-md5pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _md5s(s + String(p) + _md5s(String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '86d173f13213d1e48bce9647bdc306d5:8e86a279d6e182b3c811c559e6b15484' } },
    { modes: [24300], names: ['sha1-salt-sha1-pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _sha1s(s + _sha1s(String(p) + s)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '94520b02c04e79e08a75a84c2a6e3ed4e3874fe8:ThisIsATestSalt' } },
    { modes: [30500], names: ['md5-md5salt-md5-md5pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _md5s(_md5s(String(h).slice(i + 1)) + _md5s(_md5s(String(p)))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'e13bb4b8e5a98db7277df344aa3363cf:28945624531' } },
    { modes: [31700], names: ['md5-md5-md5pass-salt1-salt2'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; return _md5s(_md5s(_md5s(String(p)) + q[1]) + q[2]) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'c7a971e405313d0ecc22e37e8b2424a1:2316355934:478467' } },
    { modes: [33100], names: ['md5-salt-md5pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; var s = String(h).slice(i + 1); return _md5s(s + _md5s(String(p)) + s) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '866244ca1d318292a6f40b60e03fd29c:72219426709' } },
    { modes: [32410], names: ['sha512-sha512pass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha512s(_sha512s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '25d509824028a999f4ee851b5de404bb316b78ae8e974874376484018f58520e082747a7ce9f769bcaccb5f63878356c780f602e23393f12b650a6931e4b9338:21881837027919828109608' } },
    { modes: [32420], names: ['sha512-sha512binpass-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha512s(_sha512raw(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'c1bade2bd4ebc8db841ac6ab3e0a5035a29619e5b1a6135782b77da5d7cfaccee096f3ddb9ee23b9866378cfc2fb19f2c013fed1b7e1fffd18340a4f39238412:789' } },
    { modes: [21400], names: ['sha256-sha256bin-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _sha256s(_sha256raw(String(p))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '0cc1b58a543f372327aa0281e97ab56e345267ee46feabf7709515debb7ec43c' } },
    { modes: [21420], names: ['sha256-salt-sha256bin-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = String(h).indexOf(':'); if (i < 0) return false; return _sha256s(String(h).slice(i + 1) + _sha256raw(String(p))) === String(h).slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '5934ea4d670c13a71155faba42056b2525f71bdc9215d31108990c11bf3d98e3:9269771356270099311432765354522635185291064175409115041569' } },
    { modes: [20711], names: ['authme-sha256'], isFast: true, validate: (h) => /^\$SHA\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); if (q.length < 4) return false; return _sha256s(_sha256s(String(p)) + q[2]) === q[3].toLowerCase(); },
      example: { password: 'hashcat', hash: '$SHA$7218532375810603$bfede293ecf6539211a7305ea218b9f3f608953130405cda9eaba6fb6250f824' } },

    // ----- Easy tier: simple app hashes -----
    { modes: [2612], names: ['phps'], isFast: true, validate: (h) => /^\$PHPS\$[0-9a-fA-F]+\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var salt = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1); return _md5s(_md5s(String(p)) + salt) === q[3].toLowerCase(); },
      example: { password: 'hashcat', hash: '$PHPS$30353031383437363132$f02b0b2f25e5754edb04522c346ba243' } },
    { modes: [124], names: ['django-sha1'], isFast: true, validate: (h) => /^sha1\$[^$]*\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); return _sha1s(q[1] + String(p)) === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: 'sha1$fe76b$02d5916550edf7fc8c886f044887f4b1abf9b013' } },
    { modes: [131], names: ['mssql-2000'], isFast: true, validate: (h) => /^0x0100[0-9a-fA-F]{88}$/.test(h),
      verify: (p, h) => { var salt = h.substr(6, 8), digest = h.substr(54).toLowerCase(); return CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p).toUpperCase()).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest; },
      example: { password: 'hashcat', hash: '0x0100778883860000000000000000000000000000000000000000eda3604e067a06f2732b05b9cb90b8a710996939' } },
    { modes: [132], names: ['mssql-2005'], isFast: true, validate: (h) => /^0x0100[0-9a-fA-F]{48}$/.test(h),
      verify: (p, h) => { var salt = h.substr(6, 8), digest = h.substr(14).toLowerCase(); return CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p)).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest; },
      example: { password: 'hashcat', hash: '0x010045083578bf13a6e30ca29c40e540813772754d54a5ffd325' } },
    { modes: [1731], names: ['mssql-2012'], isFast: true, validate: (h) => /^0x0200[0-9a-fA-F]{136}$/.test(h),
      verify: (p, h) => { var salt = h.substr(6, 8), digest = h.substr(14).toLowerCase(); return CryptoJS.SHA512(CryptoJS.enc.Utf16LE.parse(String(p)).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest; },
      example: { password: 'hashcat', hash: '0x02003788006711b2e74e7d8cb4be96b1d187c962c5591a02d5a6ae81b3a4a094b26b7877958b26733e45016d929a756ed30d0a5ee65d3ce1970f9b7bf946e705c595f07625b1' } },
    { modes: [133], names: ['peoplesoft'], isFast: true, validate: (h) => /^[A-Za-z0-9+/]{27}=$/.test(h),
      verify: (p, h) => CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p))).toString(CryptoJS.enc.Base64) === String(h),
      example: { password: 'hashcat', hash: 'uXmFVrdBvv293L9kDR3VnRmx4ZM=' } },
    { modes: [4521], names: ['redmine'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _sha1s(h.slice(i + 1) + _sha1s(String(p))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'c18e826af2a78c7b9b7261452613233417e65817:28246535720688452723483475753333' } },
    { modes: [4522], names: ['punbb'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _sha1s(h.slice(i + 1) + _sha1s(String(p))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '9038129c474caa3f0de56f38db84033d0fe1d4b8:365563602032' } },
    { modes: [8100], names: ['citrix-netscaler-sha1'], isFast: true, validate: (h) => /^1[0-9a-fA-F]{48,}$/.test(h),
      verify: (p, h) => { var digest = h.slice(-40).toLowerCase(), salt = h.slice(1, -40); return _sha1s(salt + String(p) + '\0') === digest; },
      example: { password: 'hashcat', hash: '1130725275da09ca13254957f2314a639818d44c37ef6d558' } },
    { modes: [22200], names: ['citrix-netscaler-sha512'], isFast: true, validate: (h) => /^2[0-9a-fA-F]{136,}$/.test(h),
      verify: (p, h) => { var digest = h.slice(-128).toLowerCase(), salt = h.slice(1, -128); return _sha512s(salt + String(p) + '\0') === digest; },
      example: { password: 'hashcat', hash: '2f9282ade42ce148175dc3b4d8b5916dae5211eee49886c3f7cc768f6b9f2eb982a5ac2f2672a0223999bfd15349093278adf12f6276e8b61dacf5572b3f93d0b4fa886ce' } },
    { modes: [9900], names: ['radmin2'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var s = String(p); while (s.length < 100) s += '\0'; return _md5s(s.substring(0, 100)) === String(h).toLowerCase(); },
      example: { password: 'hashcat', hash: '22527bee5c29ce95373c4e0f359f079b' } },
    { modes: [11000], names: ['prestashop'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _md5s(h.slice(i + 1) + String(p)) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'f22cade043e7214200206dbffca49fd9:27167508161455764247627144160038845437138252877014827848' } },
    { modes: [3711], names: ['mediawiki-b'], isFast: true, validate: (h) => /^\$B\$[^$]*\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); return _md5s(q[2] + '-' + _md5s(String(p))) === q[3].toLowerCase(); },
      example: { password: 'hashcat', hash: '$B$2152187716$8c8b39c3602b194eeeb6cac78eea2742' } },
    { modes: [20712], names: ['netwitness-sha256'], isFast: true, validate: (h) => /^[A-Fa-f0-9]{64}:[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var salt = CryptoJS.enc.Base64.parse(h.slice(i + 1)).toString(CryptoJS.enc.Latin1); return _sha256s(_sha256s(String(p)).toUpperCase() + salt) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '6F48F44C46F5ADC534597687B086278F0AAF7D262ADDB3978562A7D55BBDF467:MDAwMzY1NzYwODI4MQ==' } },
    { modes: [30000], names: ['werkzeug-md5'], isFast: true, validate: (h) => /^md5\$[^$]+\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); return CryptoJS.HmacMD5(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(q[1])).toString() === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: 'md5$84143$7f51edecfa6fb401a0b5e63d33fc8c0e' } },
    { modes: [30120], names: ['werkzeug-sha256'], isFast: true, validate: (h) => /^sha256\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); return CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(q[1])).toString() === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: 'sha256$70108387805$8b9472281c36c3a693703de0e0f1ffab8fc0ecdd3bc5ead04c76dd74ef431e49' } },
    { modes: [5700], names: ['cisco-ios-sha256'], isFast: true, validate: (h) => /^[.\/0-9A-Za-z]{43}$/.test(h),
      verify: _kdf.verifyCiscoIos4, example: { password: 'hashcat', hash: '2btjjy78REtmYkkW0csHUbJZOstRXoWdX1mGrmmfeHI' } },
    { modes: [24800], names: ['umbraco-hmac-sha1'], isFast: true, validate: (h) => /^[A-Za-z0-9+/]{27}=$/.test(h),
      verify: (p, h) => CryptoJS.HmacSHA1(CryptoJS.enc.Utf16LE.parse(String(p)), CryptoJS.enc.Utf16LE.parse(String(p))).toString(CryptoJS.enc.Base64) === String(h),
      example: { password: 'hashcat', hash: '8uigXlGMNI7BzwLCJlDbcKR2FP4=' } },
    { modes: [8400], names: ['wbb3'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var s = h.slice(i + 1); return _sha1s(s + _sha1s(s + _sha1s(String(p)))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '7f8d1951fe48ae3266980c2979c141f60e4415e5:5037864764153886517871426607441768004150' } },
    { modes: [13900], names: ['opencart'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var s = h.slice(i + 1); return _sha1s(s + _sha1s(s + _sha1s(String(p)))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '058c1c3773340c8563421e2b17e60eb7c916787e:827500576' } },
    { modes: [27200], names: ['rails-restful-auth-1round'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var s = h.slice(i + 1); return _sha1s('--' + s + '--' + String(p) + '--') === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '3999d08db95797891ec77f07223ca81bf43e1be2:5dcc47b04c49d3c8e1b9e4ec367fddeed21b7b85' } },
    { modes: [19500], names: ['rails-restful-auth'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:[^:]*:.+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; var s = q[1], k = q[2]; var d = _sha1s(k + '--' + s + '--' + String(p) + '--' + k); for (var i = 0; i < 9; i++) d = _sha1s(d + '--' + s + '--' + String(p) + '--' + k); return d === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'd7d5ea3e09391da412b653ae6c8d7431ec273ea2:238769868762:8962783556527653675' } },
    { modes: [112], names: ['oracle-11-sha1'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:[0-9a-fA-F]{20}$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(String(p)).concat(CryptoJS.enc.Hex.parse(h.slice(i + 1)))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '63ec5f6113843f5d229e2d49c068d983a9670d02:57677783202322766743' } },
    { modes: [5720], names: ['cisco-ise-sha256'], isFast: false, validate: (h) => /^[a-fA-F0-9]{64}[0-9a-fA-F]*$/.test(h),
      verify: (p, h) => { var digest = h.substr(0, 64).toLowerCase(), salt = h.substr(64); var d = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(salt).concat(CryptoJS.enc.Latin1.parse(String(p)))); for (var i = 0; i < 128; i++) d = CryptoJS.SHA256(d); return d.toString() === digest; },
      example: { password: 'hashcat', hash: '465865d4226c4d9696e601f2c99b25ae2c194ec01806bafc93933331acfc1a60e8bdcca8be9fa245a5fa16029bb52480915746f47d1c539d01da7ec6f37468d1' } },
    { modes: [4800], names: ['iscsi-chap-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[0-9a-fA-F]+:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); if (q.length < 3) return false; var chal = CryptoJS.enc.Hex.parse(q[1]).toString(CryptoJS.enc.Latin1), id = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1); return _md5s(id + String(p) + chal) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'aa4aaa1d52319525023c06a4873f4c51:35343534373533343633383832343736:dc' } },
    { modes: [7000], names: ['fortigate'], isFast: true, validate: (h) => /^AK1[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => { var raw = CryptoJS.enc.Base64.parse(h.slice(3)).toString(CryptoJS.enc.Latin1); var salt = raw.substr(0, 12), want = raw.substr(12, 20); var magic = CryptoJS.enc.Hex.parse('a388ba2e424cb04a537930c13107cc3fa1329029a9815b70').toString(CryptoJS.enc.Latin1); return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(salt + String(p) + magic)).toString(CryptoJS.enc.Latin1) === want; },
      example: { password: 'hashcat', hash: 'AK1FCIhM0IUIQVFJgcDFwLCMi7GppdwtRzMyDpFOFxdpH8=' } },
    { modes: [26300], names: ['fortigate256'], isFast: true, validate: (h) => /^SH2[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => { var raw = CryptoJS.enc.Base64.parse(h.slice(3)).toString(CryptoJS.enc.Latin1); var salt = raw.substr(0, 12), want = raw.substr(12, 32); var magic = CryptoJS.enc.Hex.parse('a388ba2e424cb04a537930c13107cc3fa1329029a9815b70').toString(CryptoJS.enc.Latin1); return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(salt + String(p) + magic)).toString(CryptoJS.enc.Latin1) === want; },
      example: { password: 'hashcat', hash: 'SH2lpcpFXM5QRlWYwY5vL9+5svfYyb+c79qENpxEoB3NtZpVxKwHjuq/9TH88U=' } },
    { modes: [8000], names: ['sybase-ase'], isFast: true, validate: (h) => /^0xc007[0-9a-fA-F]{80}$/.test(h),
      verify: (p, h) => { var salt = h.substr(6, 16), want = h.substr(22).toLowerCase(); var pw = CryptoJS.enc.Utf16.parse(String(p)); var pad = CryptoJS.enc.Latin1.parse('\0'.repeat(510 - String(p).length * 2)); return CryptoJS.SHA256(pw.concat(pad).concat(CryptoJS.enc.Hex.parse(salt))).toString() === want; },
      example: { password: 'hashcat', hash: '0xc0071808773188715731b69bd4e310b4129913aaf657356c5bdf3c46f249ed42477b5c74af6eaac4d15a' } },
    { modes: [15000], names: ['filezilla-server'], isFast: true, validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _sha512s(String(p) + h.slice(i + 1)) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'bfa9fe5a404faff8b0d200385e26b783a163e475869336029d3ebaccaf02b5f16e4949279e8a33b942ab647f8f19a83dbe89a6d39dd6d8f84812de7d2e556767:6422386434050716105781561510557063652302782465168686858312232148' } },
    { modes: [32000], names: ['netiq-sspr-md5'], isFast: false, validate: (h) => /^\$sspr\$0\$\d+\$NONE\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(String(p))); for (var i = 1; i < it; i++) d = CryptoJS.MD5(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$0$100000$NONE$2c8586ef492e3c3dd3795395507dc14f' } },
    { modes: [32010], names: ['netiq-sspr-sha1'], isFast: false, validate: (h) => /^\$sspr\$1\$\d+\$NONE\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA1(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$1$100000$NONE$b3485214dfa55b038a606a183a560dab7db4ecf1' } },
    { modes: [32020], names: ['netiq-sspr-sha1-salt'], isFast: false, validate: (h) => /^\$sspr\$2\$\d+\$[^$]+\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(q[4] + String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA1(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$2$100000$CxCpGqosk9PkCBcoRFp6DLjjRhVEJKK8$a33283d71c2ecaf4f3017b0a89feca2fc879221c' } },
    { modes: [32030], names: ['netiq-sspr-sha256-salt'], isFast: false, validate: (h) => /^\$sspr\$3\$\d+\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(q[4] + String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA256(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$3$100000$ODk2NDA5Mjc2NDIwMjMwMjQyMTQ1NzMz$7195873d47c7e3627510862e37fe7cab9bc83b91feecb9864841bf80cff92419' } },
    { modes: [610], names: ['blake2b-512-pass-salt'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeBlake2bVerifier(64, 'ps'), example: { password: 'hashcat', hash: '$BLAKE2$41fcd44c789c735c08b43a871b81c8f617ca43918d38aee6cf8291c58a0b00a03115857425e5ff6f044be7a5bec8536b52d6c9992e21cd43cdca8a55bbf1f5c1:1033' } },
    { modes: [620], names: ['blake2b-512-salt-pass'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeBlake2bVerifier(64, 'sp'), example: { password: 'hashcat', hash: '$BLAKE2$f0325fdfc3f82a014935442f7adbc069d4636d67276a85b09f8de368f122cf5195a0b780d7fee709fbf1dcd02ddcb581df84508cf1fb0f3393af1be0565491c6:3301' } },
    { modes: [34800], names: ['blake2b-256'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}$/.test(h),
      verify: makeBlake2bVerifier(32, null), example: { password: 'hashcat', hash: '$BLAKE2$68b163391b3e779dcddba4e6d8fa03e962c29569b430efa5ba014303358557e1' } },
    { modes: [34810], names: ['blake2b-256-pass-salt'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeBlake2bVerifier(32, 'ps'), example: { password: 'hashcat', hash: '$BLAKE2$2b51353016a512b60e587bea98d799c2de243468085ca6cd67f983b2e55bfb67:2353288289' } },
    { modes: [34820], names: ['blake2b-256-salt-pass'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeBlake2bVerifier(32, 'sp'), example: { password: 'hashcat', hash: '$BLAKE2$a4cad0b026ed24adf13fb70ec31d35b02751dcb33354e2c9d20ef3f968748501:3601' } },
    { modes: [6300], names: ['aix-smd5'], isFast: false, validate: (h) => /^\{smd5\}.+\$.+$/.test(h),
      verify: verifyAixSmd5, example: { password: 'hashcat', hash: '{smd5}17800721$WkGka7tXcrfpUQS6WOQyw/' } },
    { modes: [32031], names: ['adobe-aem-sspr-sha256'], isFast: false, validate: (h) => /^\$sspr\$3\$\d+\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(q[4] + String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA256(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$3$1000$f9bbf1381f481427$a1b45fd7eb190cc7f0bf831698cb777207eebbb4b7ea2abd6fff84be539aae62' } },
    { modes: [32040], names: ['netiq-sspr-sha512-salt'], isFast: false, validate: (h) => /^\$sspr\$4\$\d+\$[^$]+\$[a-fA-F0-9]{128}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(q[4] + String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA512(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$4$100000$NzYwNjMyNDc2MTQ2OTE4NTUzODAyODE3$0ce2e8b8efa4280e6e003d77cb45d45300dff3960c5c073f68303565fe62fe4ff3ada8cee7d3b87d0457335ab0df73c5c64ee1f71ccf6b8bd43a316ecb42ecd4' } },
    { modes: [32041], names: ['adobe-aem-sspr-sha512'], isFast: false, validate: (h) => /^\$sspr\$4\$\d+\$[^$]+\$[a-fA-F0-9]{128}$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var it = parseInt(q[3], 10); var d = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(q[4] + String(p))); for (var i = 1; i < it; i++) d = CryptoJS.SHA512(d); return d.toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sspr$4$1000$9ad596c50a5c9acd$d4cdc3c7d227e3cc57a9c9014b1eff1684808ef40191482cd8ae6e9d7b66211a5f04e4b34f494b0513a5f67b9614c5ff16e95e624a60f41b16b90533f305146e' } },
    { modes: [2400], names: ['cisco-pix-md5'], isFast: true, validate: (h) => /^[.\/0-9A-Za-z]{16}$/.test(h),
      verify: (p, h) => { var s = String(p); var pad = Math.ceil(s.length / 16) * 16; while (s.length < pad) s += '\0'; return _pixB64(CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1)) === String(h); },
      example: { password: 'hashcat', hash: 'dRRVnUmUHXOTt9nk' } },
    { modes: [2410], names: ['cisco-asa-md5'], isFast: true, validate: (h) => /^[.\/0-9A-Za-z]{16}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var s = String(p) + h.slice(i + 1); var pad = Math.ceil(s.length / 16) * 16; while (s.length < pad) s += '\0'; return _pixB64(CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1)) === h.slice(0, i); },
      example: { password: 'hashcat', hash: 'YjDBNr.A0AN7DA8s:4684' } },

    // ----- non-cryptographic hashes -----
    { modes: [18700], names: ['java-object-hashcode'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => _nc.javaHashCode(String(p)).toString(16).padStart(8, '0') === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '29937c08' } },
    { modes: [25700], names: ['murmurhash'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var seed = parseInt(q[1], 16) >>> 0; return _nc.murmur2(_nc._bytes(String(p)), seed).toString(16).padStart(8, '0') === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'b69e7687:05094309' } },
    { modes: [27800], names: ['murmurhash3'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var seed = parseInt(q[1], 16) >>> 0; return _nc.murmur3(_nc._bytes(String(p)), seed).toString(16).padStart(8, '0') === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '23e93f65:00000000' } },
    { modes: [34200], names: ['murmurhash64a'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); return _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), BigInt('0x' + q[1]))) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'ef3014941bf1102d:837163b2348dfae1' } },
    { modes: [34201], names: ['murmurhash64a-zero'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n)) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '73f8142b4326d36a' } },
    { modes: [34211], names: ['murmurhash64a-truncated-zero'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n)).substring(0, 8) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '73f8142b' } },

    // ----- DES / AES-ECB / HMAC-RIPEMD160 / iterated-digest apps -----
    { modes: [14000], names: ['des-ecb'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var key = _sb(String(p)); if (key.length !== 8) return false; return _bh(_des.desEncryptBlock(key, _hb(q[1]))) === q[0].toLowerCase(); },
      example: { password: 'hashcat1', hash: '53b325182924b356:1412781058343178' } },
    { modes: [3000], names: ['lm'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => _bh(_des.lmHashHalf(_sb(String(p).toUpperCase()))) === String(h).toLowerCase(),
      example: { password: 'HASHCAT', hash: '299bd128c1101fd6' } },
    { modes: [16000], names: ['tripcode'], isFast: true, validate: (h) => /^[.\/0-9A-Za-z]{10}$/.test(h),
      verify: (p, h) => { var w = String(p); var salt = _tripTr((w + '..').substr(1, 2).replace(/[^.-z]/g, '.')); return _des.descryptCompute(w, salt).slice(-10) === String(h); },
      example: { password: 'hashcat', hash: 'pfaRCwDe0U' } },
    { modes: [26401], names: ['aes-128-ecb-nokdf'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var k = String(p); while (k.length < 16) k += '\0'; return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 16)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: 'e7a32f3210455cc044f26117c4612aab:86046627772965328523223752173724' } },
    { modes: [26402], names: ['aes-192-ecb-nokdf'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var k = String(p); while (k.length < 24) k += '\0'; return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 24)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '2995e91b798ef51232a91579edb1d176:49869364034411376791729962721320' } },
    { modes: [26403], names: ['aes-256-ecb-nokdf'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var k = String(p); while (k.length < 32) k += '\0'; return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 32)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '264a4248c9522cb74d33fe26cb596895:61270210011294880287232432636227' } },
    { modes: [6050], names: ['hmac-ripemd160-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(h.slice(i + 1)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '4f5edca01734e03dd7e735362625a76e6bcb61b2:52355614946067' } },
    { modes: [6060], names: ['hmac-ripemd160-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(h.slice(i + 1))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '34d8e55a2ae1e9549a291326ce2f0a8dcdc75c5c:08523202563542341' } },
    { modes: [19000], names: ['qnx-md5'], isFast: true, validate: (h) => /^@m@[a-fA-F0-9]{32}@.+$/.test(h),
      verify: (p, h) => { var q = String(h).split('@'); return _md5s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: '@m@75f6f129f9c9e77b6b1b78f791ed764a@8741857532330050' } },
    { modes: [19100], names: ['qnx-sha256'], isFast: true, validate: (h) => /^@s@[a-fA-F0-9]{64}@.+$/.test(h),
      verify: (p, h) => { var q = String(h).split('@'); return _sha256s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: '@s@0b365cab7e17ee1e7e1a90078501cc1aa85888d6da34e2f5b04f5c614b882a93@5498317092471604' } },
    { modes: [19200], names: ['qnx-sha512'], isFast: true, validate: (h) => /^@S@[a-fA-F0-9]{128}@.+$/.test(h),
      verify: (p, h) => { var q = String(h).split('@'); return _sha512s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: '@S@715df9e94c097805dd1e13c6a40f331d02ce589765a2100ec7435e76b978d5efc364ce10870780622cee003c9951bd92ec1020c924b124cfff7e0fa1f73e3672@2257314490293159' } },
    { modes: [12600], names: ['coldfusion-10'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _sha256s(h.slice(i + 1) + _sha1s(String(p)).toUpperCase()) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '3f3473a071b1fb955544e80c81853ca0f1e4f9ee4ca3bf4d2a8a10b5ef5be1f6:6058321484538505215534207835727413038041028036676832416353152201' } },
    { modes: [22301], names: ['telegram-passcode'], isFast: true, validate: (h) => /^\$telegram\$0\*[a-fA-F0-9]{64}\*[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => { var q = String(h).split('*'); var salt = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1); return _sha256s(salt + String(p) + salt) === q[1].toLowerCase(); },
      example: { password: 'hashcat', hash: '$telegram$0*518c001aeb3b4ae96c6173be4cebe60a85f67b1e087b045935849e2f815b5e41*25184098058621950709328221838128' } },
    { modes: [30420], names: ['dane-tlsa-sha256'], isFast: true, validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha256s(String(p)).substring(0, 56) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df' } },
    { modes: [11100], names: ['postgresql-cram-md5'], isFast: true, validate: (h) => /^\$postgres\$[^*]*\*[0-9a-fA-F]{8}\*[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split('*'); var user = q[0].slice(10); var salt = CryptoJS.enc.Hex.parse(q[1]).toString(CryptoJS.enc.Latin1); return _md5s(_md5s(String(p) + user) + salt) === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: '$postgres$postgres*74402844*4e7fabaaf34d780c4a5822d28ee1c83e' } },
    { modes: [11200], names: ['mysql-cram-sha1'], isFast: true, validate: (h) => /^\$mysqlna\$[0-9a-fA-F]+\*[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var q = String(h).slice(9).split('*'); var chal = CryptoJS.enc.Hex.parse(q[0]).toString(CryptoJS.enc.Latin1); var sp = _sha1raw(String(p)), x = _sha1raw(chal + _sha1raw(sp)), out = ''; for (var i = 0; i < 20; i++) { var b = (sp.charCodeAt(i) ^ x.charCodeAt(i)) & 0xff, c = b.toString(16); out += c.length < 2 ? '0' + c : c; } return out === q[1].toLowerCase(); },
      example: { password: 'hashcat', hash: '$mysqlna$2576670568531371763643101056213751754328*5e4be686a3149a12847caa9898247dcc05739601' } },
    { modes: [10200], names: ['cram-md5'], isFast: true, validate: (h) => /^\$cram_md5\$[^$]+\$[^$]+$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var chal = CryptoJS.enc.Base64.parse(q[2]).toString(CryptoJS.enc.Latin1); var resp = CryptoJS.enc.Base64.parse(q[3]).toString(CryptoJS.enc.Latin1); var hex = resp.slice(resp.lastIndexOf(' ') + 1); return CryptoJS.HmacMD5(CryptoJS.enc.Latin1.parse(chal), CryptoJS.enc.Latin1.parse(String(p))).toString() === hex.toLowerCase(); },
      example: { password: 'hashcat', hash: '$cram_md5$MTI=$dXNlciBiOGYwNjk5MTE0YjA1Nzg4OTIyM2RmMDg0ZjgyMjQ2Zg==' } },
    { modes: [12150], names: ['apache-shiro1-sha512'], isFast: false, validate: (h) => /^\$shiro1\$SHA-512\$\d+\$[^$]*\$[^$]+$/.test(h),
      verify: (p, h) => { var q = String(h).split('$'); var iter = parseInt(q[3], 10); var d = CryptoJS.SHA512(CryptoJS.enc.Base64.parse(q[4]).concat(CryptoJS.enc.Latin1.parse(String(p)))); for (var i = 1; i < iter; i++) d = CryptoJS.SHA512(d); return d.toString(CryptoJS.enc.Base64) === q[5]; },
      example: { password: 'hashcat', hash: '$shiro1$SHA-512$1024$WobJGSjbUhsMdaILomMOdw==$9uptGJ24vzZCqZI55F77N7xjUxGlVrK5aCmAwIrV1vwDmFM4akE6Hmd23Aj8ANLSUdIEkHLZ6SnoitZbOsoQNQ==' } },
    { modes: [12300], names: ['oracle-t-pbkdf2'], isFast: false, validate: (h) => /^[A-Fa-f0-9]{160,}$/.test(h),
      verify: (p, h) => { var salt = h.slice(128); var saltbin = CryptoJS.enc.Hex.parse(salt); var key = CryptoJS.PBKDF2(String(p), saltbin.clone().concat(CryptoJS.enc.Latin1.parse('AUTH_PBKDF2_SPEEDY_KEY')), { keySize: 16, iterations: 4096, hasher: CryptoJS.algo.SHA512 }); return CryptoJS.SHA512(key.clone().concat(saltbin)).toString().toUpperCase() === h.slice(0, 128).toUpperCase(); },
      example: { password: 'hashcat', hash: '8F75FBD166AFDB6D7587DAB89C2F15672AAC031C5B0B5E65C0835FB130555F6FF4E0E5764976755558112246FFF306450C22F6B7746B9E9831ED97B373992F9157436180438417080374881414745255' } },
    { modes: [10100], names: ['siphash'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}:2:4:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); var r = _nc.siphash24(_nc._bytes(String(p)), _hb(q[3])); var hi = Number((r >> 32n) & 0xffffffffn) >>> 0, lo = Number(r & 0xffffffffn) >>> 0; var sw = (x) => (((x & 0xff) << 24) | ((x & 0xff00) << 8) | ((x >>> 8) & 0xff00) | ((x >>> 24) & 0xff)) >>> 0; return sw(lo).toString(16).padStart(8, '0') + sw(hi).toString(16).padStart(8, '0') === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '583e6f51e52ba296:2:4:47356410265714355482333327356688' } },
    { modes: [27900], names: ['crc32c'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); return _nc.crc32c(_nc._bytes(String(p)), parseInt(q[1], 16) >>> 0).toString(16).padStart(8, '0') === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '5e23d60f:00000000' } },
    { modes: [28000], names: ['crc64jones'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => { var q = String(h).split(':'); return _nc._hex64(_nc.crc64jones(_nc._bytes(String(p)), BigInt('0x' + q[1]))) === q[0].toLowerCase(); },
      example: { password: 'hashcat', hash: '65c1f848fe38cce6:4260950400318054' } },
    { modes: [31000], names: ['blake2s-256'], isFast: true, validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _bh(_blake2s.blake2s(_sb(String(p)), 32)) === h.slice(8).toLowerCase(),
      example: { password: 'hashcat', hash: '$BLAKE2$2c719b484789ad5f6fc1739012182169b25484af156adc91d4f64f72400e574a' } },
    { modes: [33300], names: ['hmac-blake2s-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _bh(_blake2s.hmacBlake2s(_sb(String(p)), _sb(h.slice(i + 1)))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '0d541ae24d30aff2627c4d1a910f766088a64809edb46a05d29649a9b944da6c:1234' } },
    { modes: [33600], names: ['ripemd-320'], isFast: true, validate: (h) => /^[a-fA-F0-9]{80}$/.test(h),
      verify: (p, h) => _bh(_rmd320.ripemd320(_sb(String(p)))) === String(h).toLowerCase(),
      example: { password: 'hashcat', hash: '8339009b816d4e4c2a6be3c6e1daac6aca69a7670ecdc583adfca0db17cc8f08ce35d6c759b038ab' } },
    { modes: [33650], names: ['hmac-ripemd320-pass'], isFast: true, validate: (h) => /^[a-fA-F0-9]{80}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _bh(_rmd320.hmacRipemd320(_sb(String(p)), _sb(h.slice(i + 1)))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'e740440e7bd65056a90f1aa4eb00e00308a9f1788866b4eacbd46cfc8032301d4e5b3a9d179be044:95454599772294521162217' } },
    { modes: [33660], names: ['hmac-ripemd320-salt'], isFast: true, validate: (h) => /^[a-fA-F0-9]{80}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return _bh(_rmd320.hmacRipemd320(_sb(h.slice(i + 1)), _sb(String(p)))) === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '345136b13b3a6e52901e2a414efa0cf5fca2fecf8b03279656d3b0f42c30df3006c5ad186494996b:2436077107013929602' } },
    { modes: [1100], names: ['dcc', 'ms-cache'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var inner = CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))); return CryptoJS.MD4(inner.clone().concat(CryptoJS.enc.Utf16LE.parse(h.slice(i + 1).toLowerCase()))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: 'c896b3c6963e03c86ade3a38370bbb09:54161084332' } },
    { modes: [2100], names: ['dcc2', 'ms-cache-2'], isFast: false, validate: (h) => /^\$DCC2\$\d+#[^#]*#[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var m = /^\$DCC2\$(\d+)#([^#]*)#([a-fA-F0-9]{32})$/.exec(h); if (!m) return false; var saltbin = CryptoJS.enc.Utf16LE.parse(m[2].toLowerCase()); var dcc = CryptoJS.MD4(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).clone().concat(saltbin)); return CryptoJS.PBKDF2(dcc, saltbin, { keySize: 4, iterations: parseInt(m[1], 10), hasher: CryptoJS.algo.SHA1 }).toString() === m[3].toLowerCase(); },
      example: { password: 'hashcat', hash: '$DCC2$10240#6848#e2829c8af2232fa53797e2f0e35e4626' } },
    { modes: [7100], names: ['macos-pbkdf2-sha512'], isFast: false, validate: (h) => /^\$ml\$\d+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); return CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(q[3]), { keySize: 16, iterations: parseInt(q[2], 10), hasher: CryptoJS.algo.SHA512 }).toString() === q[4].toLowerCase(); },
      example: { password: 'hashcat', hash: '$ml$1024$2484380731132131624506271467162123576077004878124365203837706482$89a3a979ee186c0c837ca4551f32e951e6564c7ac6798aa35baf4427fbf6bd1d630642c12cfd5c236c7b0104782237db95e895f7c0e372cd81d58f0448daf958' } },
    { modes: [7200], names: ['grub2-pbkdf2-sha512'], isFast: false, validate: (h) => /^grub\.pbkdf2\.sha512\.\d+\.[0-9a-fA-F]+\.[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var q = h.split('.'); return CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(q[4]), { keySize: 16, iterations: parseInt(q[3], 10), hasher: CryptoJS.algo.SHA512 }).toString() === q[5].toLowerCase(); },
      example: { password: 'hashcat', hash: 'grub.pbkdf2.sha512.1024.03510507805003756325721848020561235456073188241051876082416068104377357018503082587026352628170170411053726157658716047762755750.aac26b18c2b0c44bcf56514d46aabd52eea097d9c95122722087829982e9dd957b2b641cb1e015d4df16a84d0571e96cf6d3de6361431bdeed4ddb0940f2425b' } },
    { modes: [7300], names: ['ipmi2-rakp-sha1'], isFast: true, validate: (h) => /^[0-9a-fA-F]+:[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var i = h.lastIndexOf(':'); return CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(h.slice(0, i)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(i + 1).toLowerCase(); },
      example: { password: 'hashcat', hash: '3437343735333336383831353232323433383333303236303337333338363232303135383237333638363532373231343030313131333838323734373138363632343133333335353030353633373533333133313530363533303738343334313330303630343633333237373037383537333630303233303830303437323838333237313438363238343434383831363634323431333430383735323038:f4b376e25868751fc0264f573ff1fe50b65ce5a2' } },
    { modes: [7350], names: ['ipmi2-rakp-md5'], isFast: true, validate: (h) => /^[a-fA-F0-9]{32}:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(h.slice(i + 1)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'admin', hash: '08b017f3628b9835c748521e412429c9:f3450000df540000cdd981b0b3441be8774a61e69321291891a29a0c5fdac3f06194bd2c29fa5246000000000000000000000000000000001400' } },
    { modes: [5400], names: ['ike-psk-sha1'], isFast: true, validate: (h) => /^([0-9a-fA-F]+:){8}[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => { var q = h.split(':'); if (q.length < 9) return false; var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(q[6] + q[7]), CryptoJS.enc.Latin1.parse(String(p))); return CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(q[0] + q[1] + q[2] + q[3] + q[4] + q[5]), d1).toString() === q[8].toLowerCase(); },
      example: { password: 'hashcat', hash: '266b43c54636c062b6696b71f24b30999c98bd4c3ba57e2de56a7ae50bb17ebcbca1abcd33e9ad466d4df6e6f2a407600f0c5a983f79d493b0a3694080a81143d4bac7a8b7b008ae5364a04688b3cfae44824885ca96ade1e395936567ecad519b502c3a786c72847f79c67b777feb8ba4f747303eb985709e92b3a5634f6513:60f861c6209c9c996ac0dcb49d6f6809faaaf0e8eb8041fe603a918170a801e94ab8ab10c5906d850f4282c0668029fa69dbc8576f7d86633dc2b21f0d79aa06342b02a4d2732841cd3266b84a7eb49ac489b307ba55562a17741142bac7712025f0a8cad59b11f19d9b756ce998176fd6b063df556957b257b3645549a138c2:f4dd079ed2b60e77:f1f8da1f38f76923:fd862602549f6949b33870f186d96cb8926a19d78442c02af823460740be719eba41a79388aeefb072e1ec7cb46b2f0b72e21fb30bd3a6568d2b041af7f9dc0c9cce27ed577e5aabb9ab6c405f1c4b189adbee8c9fb6abf4788b63a3ae05a02c192187b9d7246efe5e46db9b01bf8f4be05f7599ae52bf137743e41d90dceb85bd6ae07397dcc168bbc904adfebb08e6bc67e653edeee97a7e4ab9dab5e63fec:56e3f0d49ea70514:e754055008febe970053d795d26bfe609f42eda8:0c3283efd6396e7a2ecb008e1933fccb694a4ac0:8f79167724f4bdb2d76ee5d5e502b665e3445ea6' } },
    { modes: [14100], names: ['3des-ede-ecb'], isFast: true, validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => { var q = h.split(':'); var w = String(p); if (w.length !== 24) return false; var ct = _des.desEncryptBlock(_sb(w.slice(0, 8)), _hb(q[1])); ct = _des.desDecryptBlock(_sb(w.slice(8, 16)), ct); ct = _des.desEncryptBlock(_sb(w.slice(16, 24)), ct); return _bh(ct) === q[0].toLowerCase(); },
      example: { password: 'hashcat1hashcat1hashcat1', hash: '4c29eea59d8db1e7:7428288455525516' } },
    { modes: [33500], names: ['rc4-40-dropn'], isFast: true, validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4])); var off = parseInt(q[5], 10), known = _hb(q[6]); for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false; return true; },
      example: { password: 'hashc', hash: '$rc4$40$0$e9a41693b759cf88929ca31203694f$0$48656c6c6f' } },
    { modes: [33501], names: ['rc4-72-dropn'], isFast: true, validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4])); var off = parseInt(q[5], 10), known = _hb(q[6]); for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false; return true; },
      example: { password: 'hashcat12', hash: '$rc4$72$0$90eaa8d71c$0$48656c6c6f' } },
    { modes: [33502], names: ['rc4-104-dropn'], isFast: true, validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4])); var off = parseInt(q[5], 10), known = _hb(q[6]); for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false; return true; },
      example: { password: 'hashcat123456', hash: '$rc4$104$0$a04245c3d7$0$48656c6c6f' } },
    { modes: [21500], names: ['solarwinds-orion'], isFast: false, validate: (h) => /^\$solarwinds\$0\$[^$]*\$[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var u = q[3]; var cs = u.length >= 8 ? u.substring(0, 8) : (u + '1244352345234').substring(0, 8); var key = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Latin1.parse(cs), { keySize: 256, iterations: 1000, hasher: CryptoJS.algo.SHA1 }); return CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64) === q[4]; },
      example: { password: 'hashcat', hash: '$solarwinds$0$admin$fj4EBQewCQUZ7IYHl0qL8uj9kQSBb3m7N4u0crkKK0Uj9rbbAnSrBZMXO7oWx9KqL3sCzwncvPZ9hyDV9QCFTg==' } },
    { modes: [21501], names: ['solarwinds-orion-v2'], isFast: false, validate: (h) => /^\$solarwinds\$1\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var key = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Base64.parse(q[3]), { keySize: 256, iterations: 1000, hasher: CryptoJS.algo.SHA1 }); return CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64) === q[4]; },
      example: { password: 'hashcat', hash: '$solarwinds$1$3pHkk55NTYpAeV3EJjcAww==$N4Ii2PxXX/bTZZwslQLIKrp0wvfZ5aN9hpyiR896ozJMJTPO1Q7BK1Eht8Vhl4kXq/42Vn2zp3qYeAkRuqsuEw==' } },
    { modes: [22400], names: ['aescrypt-sha256'], isFast: false, validate: (h) => /^\$aescrypt\$1\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = h.split('*'); var key = CryptoJS.enc.Hex.parse(q[1]).concat(CryptoJS.enc.Latin1.parse('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0')); var w = CryptoJS.enc.Utf16LE.parse(String(p)); for (var i = 0; i < 8192; i++) key = CryptoJS.SHA256(key.clone().concat(w)); return CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(q[2]).concat(CryptoJS.enc.Hex.parse(q[3])), key).toString() === q[4].toLowerCase(); },
      example: { password: 'hashcat', hash: '$aescrypt$1*efc648908ca7ec727f37f3316dfd885c*eff5c87a35545406a57b56de57bd0554*3a66401271aec08cbd10cf2070332214093a33f36bd0dced4a4bb09fab817184*6a3c49fea0cafb19190dc4bdadb787e73b1df244c51780beef912598bd3bdf7e' } },
    { modes: [23400], names: ['bitwarden'], isFast: false, validate: (h) => /^\$bitwarden\$2\*\d+\*\d+\*[A-Za-z0-9+/=]+\*[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => { var q = h.split('*'); var d1 = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Base64.parse(q[3]), { keySize: 8, iterations: parseInt(q[1], 10), hasher: CryptoJS.algo.SHA256 }); var d2 = CryptoJS.PBKDF2(d1, CryptoJS.enc.Latin1.parse(String(p)), { keySize: 8, iterations: parseInt(q[2], 10), hasher: CryptoJS.algo.SHA256 }); return d2.toString(CryptoJS.enc.Base64) === q[4]; },
      example: { password: 'hashcat', hash: '$bitwarden$2*100000*2*bm9yZXBseUBoYXNoY2F0Lm5ldA==*+v5rHxYydSRUDlan+4pSoiYQwAgEhdmivlb+exQX+fg=' } },
    { modes: [31300], names: ['ms-sntp'], isFast: true, validate: (h) => /^\$sntp-ms\$[a-fA-F0-9]{32}\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); return CryptoJS.MD5(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).concat(CryptoJS.enc.Hex.parse(q[3]))).toString() === q[2].toLowerCase(); },
      example: { password: 'hashcat', hash: '$sntp-ms$cfc7023381cf6bb474cdcbeb0a67bdb3$907733697536811342962140955567108526489624716566696971338784438986103976327367763739445744705380' } },
    { modes: [13500], names: ['peoplesoft-ps-token'], isFast: true, validate: (h) => /^[a-fA-F0-9]{40}:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(h.slice(i + 1)).concat(CryptoJS.enc.Utf16LE.parse(String(p)))).toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '24eea51b53d02b4c5ff99bcb05a6847fdb2d9308:4f10a0de76e242040c28e9d3dd15c903343489c79765f9118c098c266b9ff505c95bd75bbe406ff3404849eea73930ad17937c0ba6fc3e7bb6d37362941318938b8af96d1292a310b3fd29a67e411ecb10d30247c99183a16951b3859054d4eba9dcd50709c7b21dee836d7ed195cc6b33317aeb557cc56392dc551faa8d5a0fb42212' } },
    { modes: [29100], names: ['flask-session-cookie'], isFast: true, validate: (h) => /^[^.]+\.[^.]+\.[A-Za-z0-9_-]+$/.test(h),
      verify: (p, h) => { var i = h.lastIndexOf('.'); var salt = h.slice(0, i), dg = h.slice(i + 1); var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse('cookie-session'), CryptoJS.enc.Latin1.parse(String(p))); var d2 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(salt), d1); return d2.toString(CryptoJS.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') === dg; },
      example: { password: 'hashcat', hash: 'eyJ1c2VybmFtZSI6ImFkbWluIn0.YjdgRQ.1OTlf1PD0H9wXsu_qS0aywAJVD8' } },
    { modes: [28700], names: ['aws-sig-v4'], isFast: true, validate: (h) => /^\$AWS-Sig-v4\$0\$[^$]+\$[^$]+\$[^$]+\$[0-9a-fA-F]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var longdate = q[3], region = q[4], service = q[5], canonical = q[6]; var date = longdate.substring(0, 8), L = CryptoJS.enc.Latin1; var kDate = CryptoJS.HmacSHA256(L.parse(date), L.parse('AWS4' + String(p))); var kRegion = CryptoJS.HmacSHA256(L.parse(region), kDate); var kService = CryptoJS.HmacSHA256(L.parse(service), kRegion); var kSigning = CryptoJS.HmacSHA256(L.parse('aws4_request'), kService); var sts = 'AWS4-HMAC-SHA256\n' + longdate + '\n' + date + '/' + region + '/' + service + '/aws4_request\n' + canonical; return CryptoJS.HmacSHA256(L.parse(sts), kSigning).toString() === q[7].toLowerCase(); },
      example: { password: 'hashcat', hash: '$AWS-Sig-v4$0$20220221T000000Z$us-east-1$s3$421ab6e4af9f49fa30fa9c253fcfeb2ce91668e139e6b23303c5f75b04f8a3c4$3755ed2bc1b2346e003ccaa7d02ae8b73c72bcbe9f452ccf066c78504d786bbb' } },
    { modes: [5800], names: ['samsung-android-pin'], isFast: false, validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => { var i = h.indexOf(':'); var salt = h.slice(i + 1), L = CryptoJS.enc.Latin1; var d = CryptoJS.SHA1(L.parse('0' + String(p) + salt)); for (var k = 1; k < 1024; k++) d = CryptoJS.SHA1(L.parse(d.toString(L) + (k + String(p) + salt))); return d.toString() === h.slice(0, i).toLowerCase(); },
      example: { password: 'hashcat', hash: '3edde1eb9e6679ccbc1ff3c417e8a475a2d2e279:7724368582277760' } },
    { modes: [15400], names: ['chacha20'], isFast: true, validate: (h) => /^\$chacha20\$\*[0-9a-fA-F]{16}\*\d+\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{16}$/.test(h),
      verify: (p, h) => { var q = h.split('*'); var offset = parseInt(q[2], 10), pt = _hb(q[4]), ct = _hb(q[5]); var key = _sb(String(p)); if (key.length !== 32) return false; var ks = _nc.chacha20ks(key, _hb(q[3]), _hb(q[1]), offset + 8); for (var i = 0; i < 8; i++) if ((ks[offset + i] ^ pt[i]) !== ct[i]) return false; return true; },
      example: { password: 'hashcat_hashcat_hashcat_hashcat_', hash: '$chacha20$*0400000000000003*16*0200000000000001*5152535455565758*6b05fe554b0bc3b3' } },
    { modes: [8300], names: ['dnssec-nsec3'], isFast: true, validate: (h) => /^[0-9a-v]{32}:[^:]*:[0-9a-fA-F]*:\d+$/.test(h),
      verify: (p, h) => { var q = h.split(':'); var domain = q[1], saltHex = q[2], iter = parseInt(q[3], 10); var name = (String(p) + domain).toLowerCase(); var saltWA = CryptoJS.enc.Hex.parse(saltHex); var hh = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(_bh(_nc.dnsWire(name))).concat(saltWA)); for (var i = 0; i < iter; i++) hh = CryptoJS.SHA1(hh.clone().concat(saltWA)); return _nc.base32hex(_hb(hh.toString())) === q[0]; },
      example: { password: 'hashcat', hash: 'pi6a89u8tca930h8mvolklmesefc5gmn:.fnmlbsik.net:35537886:1' } },
    { modes: [14900], names: ['skip32'], isFast: true, validate: (h) => /^[a-fA-F0-9]{8}:[0-9a-fA-F]{8}$/.test(h),
      verify: (p, h) => { var q = h.split(':'); var key = _sb(String(p)); if (key.length !== 10) return false; return _bh(_nc.skip32(key, _hb(q[1]), true)) === q[0].toLowerCase(); },
      example: { password: 'hashcat!!!', hash: '7090b6b9:04223875' } },
    { modes: [16100], names: ['tacacs-plus'], isFast: true, validate: (h) => /^\$tacacs-plus\$0\$[0-9a-fA-F]+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => { var q = h.split('$'); var kb = _hb(CryptoJS.MD5(CryptoJS.enc.Hex.parse(q[3]).concat(CryptoJS.enc.Latin1.parse(String(p))).concat(CryptoJS.enc.Hex.parse(q[5]))).toString()); var eb = _hb(q[4]); if (eb.length < 6) return false; var st = eb[0] ^ kb[0], fl = eb[1] ^ kb[1], sml = ((eb[2] ^ kb[2]) << 8) | (eb[3] ^ kb[3]), dl = ((eb[4] ^ kb[4]) << 8) | (eb[5] ^ kb[5]); return ((st >= 1 && st <= 7) || st === 0x21) && (fl === 0 || fl === 1) && (6 + sml + dl === eb.length); },
      example: { password: 'hashcat', hash: '$tacacs-plus$0$5fde8e68$4e13e8fb33df$c006' } },
    { modes: [5300], names: ['ike-psk-md5'], isFast: true, validate: (h) => /^([0-9a-fA-F]+:){8}[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => { var q = h.split(':'); if (q.length < 9) return false; var d1 = CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(q[6] + q[7]), CryptoJS.enc.Latin1.parse(String(p))); return CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(q[0] + q[1] + q[2] + q[3] + q[4] + q[5]), d1).toString() === q[8].toLowerCase(); },
      example: { password: 'hashcat', hash: '50503326cac6e4bd892b8257805b5a59a285f464ad3f63dc01bd0335f8341ef52e00be0b8cb205422a3788f021e4e6e8ccbe34784bc85abe42f62545bac64888426a2f1264fa28cf384ff00b14cfa5eff562dda4fad2a31fd7a6715218cff959916deed856feea5bee2e773241c5fbebf202958f0ce0c432955e0f1f6d1259da:688a7bfa8d5819630a970ed6d27018021a15fbb3e2fdcc36ce9b563d8ff95f510c4b3236c014d1cde9c2f1a999b121bc3ab1bc8049c8ac1e8c167a84f53c867492723eb01ab4b38074b38f4297d6fea8f44e01ea828fce33c433430938b1551f60673ce8088e7d2f41e3b49315344046fefee1e3860064331417562761db3ba4:c66606d691eaade4:8bdc88a2cdb4a1cf:c3b13137fae9f66684d98709939e5c3454ee31a98c80a1c76427d805b5dea866eff045515e8fb42dd259b9448caba9d937f4b3b75ec1b092a92232b4c8c1e70a60a52076e907f887b731d0f66e19e09b535238169c74c04a4b393f9b815c54eef4558cd8a22c9018bb4f24ee6db0e32979f9a353361cdba948f9027551ee40b1c96ba81c28aa3e1a0fac105dc469efa83f6d3ee281b945c6fa8b4677bac26dda:53f757c5b08afad6:aa02d9289e1702e5d7ed1e4ebf35ab31c2688e00:aab8580015cf545ac0b7291d15a4f2c79e06defd:944a0df3939f3bd281c9d05fbc0e3d30' } },
];

// Lookup maps: a `type` argument resolves by hashcat mode number OR by name.
const _typeByName = new Map();
const _typeByMode = new Map();
for (const _entry of HASH_REGISTRY) {
    for (const _n of _entry.names) _typeByName.set(String(_n).toLowerCase(), _entry);
    for (const _m of (_entry.modes || [])) _typeByMode.set(String(_m), _entry);
}

function resolveHashType(type) {
    if (type === null || type === undefined) return null;
    const key = String(type).trim().toLowerCase();
    return _typeByName.get(key) || _typeByMode.get(key) || null;
}

// ----- public API (all derived from HASH_REGISTRY) -------------------------

export function verifyHash(password, hash, hashType) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    return entry.verify(password, hash);
}

// Generate a hashcat-format hash from a password (+ optional params such as
// salt/username/iterations; sensible defaults are used when omitted). Returns
// null for modes that do not (yet) have a generator. `hashType` is a mode number
// or a registered type name.
export function generateHash(hashType, password, params) {
    const entry = resolveHashType(hashType);
    const mode = entry ? entry.modes[0] : parseInt(hashType, 10);
    return _gen.generate(mode, password, params || {});
}

// Modes that currently have a generator (for the round-trip validation harness).
export const generatableModes = Object.keys(_gen.G).map(function (k) { return parseInt(k, 10); });

// Mode number -> primary hash-type name (for the validation report table).
export const modeInfo = HASH_REGISTRY.reduce(function (acc, e) { e.modes.forEach(function (m) { acc[m] = e.names[0]; }); return acc; }, {});

export function isValidHash(hash, hashType) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    return entry.validate(hash);
}

export function isFast(hashType) {
    const entry = resolveHashType(hashType);
    return entry ? !!entry.isFast : false;
}

// Measure hash-calculation throughput (hashes/second) for a hash type by repeatedly
// verifying its example vector for `durationMs` (default 5000 = 5 seconds). Accepts a
// mode number or a type name.
export function measureSpeed(hashType, durationMs) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    const password = entry.example.password;
    const hash = entry.example.hash;
    const duration = (typeof durationMs === 'number' && durationMs > 0) ? durationMs : 5000;
    const startTime = Date.now();
    let count = 0;
    while (Date.now() - startTime < duration) {
        entry.verify(password, hash);
        count++;
    }
    return Math.floor(count / (duration / 1000));
}

// ---------------------------------------------------------------------------
// Batch verification: test one candidate against MANY targets with the MINIMUM hashing.
// prepareTargets(hashes, type) preprocesses a target set ONCE; matchCandidate(pw, prepared) returns the
// subset those cracked. For an UNSALTED single-shot type (md5/sha1/ntlm/sha256/…) the candidate is hashed
// ONCE and looked up in a digest map — O(1), independent of the number of targets. For a SALTED/keyed type
// it falls back to per-target verify (one hash per DISTINCT salt when salts differ, which is the usual case).
// "Unsalted" is auto-detected from the generator: if ANY of salt/username/iterations/rounds/cost changes the
// output, the type is salted/parametrized; only a deterministic, param-invariant generator that reproduces
// the type's own example vector qualifies for the fast path.
// ---------------------------------------------------------------------------

function _normHash(s) { return String(s).toLowerCase(); }

const _unsaltedCache = new Map();   // mode -> boolean
function _isUnsaltedSingleShot(entry) {
    const mode = entry.modes[0];
    if (_unsaltedCache.has(mode)) return _unsaltedCache.get(mode);
    let res = false;
    try {
        const pw = entry.example.password;
        const a = _gen.generate(mode, pw, {});
        if (a != null) {
            const b = _gen.generate(mode, pw, {});
            const s1 = _gen.generate(mode, pw, { salt: 'AaXx11', username: 'AaXx11', iterations: 7, rounds: 7, cost: 7 });
            const s2 = _gen.generate(mode, pw, { salt: 'BbYy22', username: 'BbYy22', iterations: 9, rounds: 9, cost: 9 });
            res = a === b && s1 === a && s2 === a && _normHash(a) === _normHash(entry.example.hash);
        }
    } catch (_) { res = false; }
    _unsaltedCache.set(mode, res);
    return res;
}

// Preprocess a set of target hashes for repeated candidate testing. Returns an opaque object.
export function prepareTargets(hashes, hashType) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    const list = Array.isArray(hashes) ? hashes : (hashes == null ? [] : [hashes]);
    if (_isUnsaltedSingleShot(entry)) {
        const map = new Map();                                   // normalized digest -> [original target strings]
        for (const h of list) { const k = _normHash(h); const g = map.get(k); if (g) g.push(h); else map.set(k, [h]); }
        return { hashType, mode: entry.modes[0], salted: false, map, count: list.length };
    }
    return { hashType, salted: true, entry, targets: list.slice(), count: list.length };
}

// Return the subset of a prepared target set that `candidate` cracks (empty array = no match). Unsalted:
// ONE hash of the candidate + a map lookup. Salted: entry.verify per target (minimal for distinct salts).
export function matchCandidate(candidate, prepared) {
    if (!prepared) return [];
    if (!prepared.salted) {
        let g;
        try { g = _gen.generate(prepared.mode, candidate, {}); } catch (_) { return []; }
        if (g == null) return [];
        const hit = prepared.map.get(_normHash(g));
        return hit ? hit.slice() : [];
    }
    const out = [], v = prepared.entry.verify, t = prepared.targets;
    for (let i = 0; i < t.length; i++) { if (v(candidate, t[i])) out.push(t[i]); }
    return out;
}

// Official hashcat example vector { password, hash } for a type (mode or name),
// or null if the type is unknown. Used by the test harness and benchmarks.
export function getExample(hashType) {
    const entry = resolveHashType(hashType);
    return entry ? { password: entry.example.password, hash: entry.example.hash } : null;
}

export function getPossibleHashTypes(hash) {
    const possibleHashTypes = [];
    for (const entry of HASH_REGISTRY) {
        try {
            if (entry.validate(hash)) possibleHashTypes.push(entry.names[0]);
        } catch (_) { /* ignore validators that dislike odd input */ }
    }
    return possibleHashTypes;
}

export const availableHashTypes = HASH_REGISTRY.map((entry) => entry.names[0]);

// File -> hashcat-hash extraction. extract(fileBytes[, 'zip'|'7z'|'rar'|'office'|'wpa'])
// sniffs the container (or uses the hint) and returns [{type, mode, name, file, hash}]
// lines ready for verifyHash()/hashcat. detectFileType(bytes) returns the format id.
export const extract = _extract.extract;
export const detectFileType = _extract.detect;

// Comprehensive catalogue: one object per registered hash type with its mode number(s),
// name(s), and capability flags (fast = single-shot; generatable = has a generator).
// Use for enumerating support, building UIs, or picking types to benchmark.
export const hashTypes = HASH_REGISTRY.map(function (entry) {
    return {
        mode: entry.modes[0],
        modes: entry.modes.slice(),
        name: entry.names[0],
        names: entry.names.slice(),
        fast: !!entry.isFast,
        generatable: entry.modes.some(function (m) { return _gen.G[m] != null; })
    };
});

// ---------------------------------------------------------------------------
// Attack wrappers (hashcat -a 3). The generators below are lazy — a keyspace of
// billions costs no memory, and crackMask()/crackBruteforce() stop the instant a
// candidate verifies. See src/attack.js for the mask token reference.
// ---------------------------------------------------------------------------

// mask -> array of per-position charset strings (throws on a bad token)
export const parseMask = _attack.parseMask;
// quick candidate counts for display (Number; may be Infinity for huge spaces)
export const maskKeyspace = _attack.maskKeyspace;
export const bruteforceKeyspace = _attack.bruteforceKeyspace;
// lazy generators of every candidate
export const maskCandidates = _attack.maskCandidates;
export const bruteforceCandidates = _attack.bruteforceCandidates;

// ---- distributed cracking (see src/attack.js) ----
// An attack "spec": {type:'wordlist',words} | {type:'rules',words,rules,apply?} |
//                   {type:'mask',mask,customs?} | {type:'bruteforce',charset,min,max}
// keyspace(spec): exact total candidate count as a BigInt (spaces exceed 2^53).
export const keyspace = _attack.keyspace;
// candidateAt(spec, index): the index-th candidate (0-based; BigInt|number|string) — random access / resume.
export const candidateAt = _attack.candidateAt;
// attackCandidates(spec, {skip, limit}): lazy generator of one keyspace slice (a node's share).
export const attackCandidates = _attack.candidates;
// partition(specOrTotal, nodes): cut a keyspace into contiguous [{index, skip, limit}] ranges (BigInts).
export const partition = _attack.partition;

// Run an iterable of candidates through verifyHash(); return the first password that
// matches `hash` under `type`, or null once the iterable is exhausted.
//   opts.onProgress(tried, lastCandidate)  called every opts.progressEvery tries (default 50000)
function runAttack(candidateIter, hash, type, opts) {
    opts = opts || {};
    const every = (typeof opts.progressEvery === 'number' && opts.progressEvery > 0) ? opts.progressEvery : 50000;
    let n = 0;
    for (const cand of candidateIter) {
        n++;
        if (verifyHash(cand, hash, type)) return cand;
        if (opts.onProgress && n % every === 0) opts.onProgress(n, cand);
    }
    return null;
}

// One-call attacks. Each returns the matching password, or null. `opts` may carry a
// keyspace slice { skip, limit } (so a distributed node cracks only its range) plus
// { onProgress, progressEvery }.
//   crackMask(hash, 1000, 'fkaskgr?l?l')          // NTLM, mask
//   crackBruteforce(hash, 0, 'abc…', 1, 4)        // MD5, charset + length
//   crackWordlist(hash, 100, ['pw1','pw2', …])    // SHA1, wordlist (array)
export function crackMask(hash, type, mask, customs, opts) {
    return runAttack(_attack.candidates({ type: 'mask', mask: mask, customs: customs }, opts), hash, type, opts);
}
export function crackBruteforce(hash, type, charset, min, max, opts) {
    return runAttack(_attack.candidates({ type: 'bruteforce', charset: charset, min: min, max: max }, opts), hash, type, opts);
}
export function crackWordlist(hash, type, words, opts) {
    return runAttack(_attack.candidates({ type: 'wordlist', words: words || [] }, opts), hash, type, opts);
}
// crackRules(hash, type, ['pw1', …], [':','c','$1', …], applyRule)  — wordlist + rules.
// The rule engine is intentionally not bundled (it is a UI-only lib), so pass an
// apply(word, rule) => string — e.g. zzzteph/hashcat-rules-js `applyRule`. Rules run
// all-rules-per-word (word-major), matching the browser crack tab and hashcat.
export function crackRules(hash, type, words, rules, apply, opts) {
    if (typeof apply !== 'function') throw new Error('crackRules: an apply(word, rule) => string function is required (e.g. hashcat-rules-js applyRule)');
    return runAttack(_attack.candidates({ type: 'rules', words: words || [], rules: rules || [], apply: apply }, opts), hash, type, opts);
}