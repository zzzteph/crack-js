// crypt(3) & iterated password hashes: md5crypt (500), sha256crypt (7400),
// sha512crypt (1800), phpass (400), Juniper/NetBSD sha1crypt (15100).
var CryptoJS = require('crypto-js');

function rstr_sha512(s) {

    return CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1);


}


function rstr_sha256(s) {

    return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1);


}

function _extend_256(source, size_ref) {
    var extended = "";
    for (var i = 0; i < Math.floor(size_ref / 32); i++)
        extended += source;
    extended += source.substr(0, size_ref % 32);
    return extended;
}



function _extend_512(source, size_ref) {
    var extended = "";
    for (var i = 0; i < Math.floor(size_ref / 64); i++)
        extended += source;
    extended += source.substr(0, size_ref % 64);
    return extended;
}

// steps 1-12 
function _sha512crypt_intermediate(password, salt) {
    var digest_b = rstr_sha512(password + salt + password);
    var key_len = password.length;

    // extend digest b so that it has the same size as password
    var digest_b_extended = _extend_512(digest_b, password.length);

    var intermediate_input = password + salt + digest_b_extended;
    for (var cnt = key_len; cnt > 0; cnt >>= 1) {
        if ((cnt & 1) != 0)
            intermediate_input += digest_b
        else
            intermediate_input += password;
    }
    var intermediate = rstr_sha512(intermediate_input);

    return intermediate;
}



function _sha256crypt_intermediate(password, salt) {
    var digest_b = rstr_sha256(password + salt + password);
    var key_len = password.length;

    // extend digest b so that it has the same size as password
    var digest_b_extended = _extend_256(digest_b, password.length);

    var intermediate_input = password + salt + digest_b_extended;
    for (var cnt = key_len; cnt > 0; cnt >>= 1) {
        if ((cnt & 1) != 0)
            intermediate_input += digest_b
        else
            intermediate_input += password;
    }
    var intermediate = rstr_sha256(intermediate_input);

    return intermediate;
}



function _rstr_sha256crypt(password, salt, rounds) {
    // steps 1-12
    var digest_a = _sha256crypt_intermediate(password, salt);

    // step 13-15
    var dp_input = "";
    for (var i = 0; i < password.length; i++)
        dp_input += password;
    var dp = rstr_sha256(dp_input);
    // step 16
    var p = _extend_256(dp, password.length);

    // step 17-19
    var ds_input = "";
    for (var i = 0; i < (16 + digest_a.charCodeAt(0)); i++)
        ds_input += salt;
    var ds = rstr_sha256(ds_input);
    // step 20
    var s = _extend_256(ds, salt.length);

    // step 21
    var digest = digest_a;
    var c_input = "";
    for (var i = 0; i < rounds; i++) {
        c_input = "";

        if (i & 1)
            c_input += p;
        else
            c_input += digest;

        if (i % 3)
            c_input += s;

        if (i % 7)
            c_input += p;

        if (i & 1)
            c_input += digest;
        else
            c_input += p;

        digest = rstr_sha256(c_input);
    }

    return digest;
}


function _rstr_sha512crypt(password, salt, rounds) {
    // steps 1-12
    var digest_a = _sha512crypt_intermediate(password, salt);

    // step 13-15
    var dp_input = "";
    for (var i = 0; i < password.length; i++)
        dp_input += password;
    var dp = rstr_sha512(dp_input);
    // step 16
    var p = _extend_512(dp, password.length);

    // step 17-19
    var ds_input = "";
    for (var i = 0; i < (16 + digest_a.charCodeAt(0)); i++)
        ds_input += salt;
    var ds = rstr_sha512(ds_input);
    // step 20
    var s = _extend_512(ds, salt.length);

    // step 21
    var digest = digest_a;
    var c_input = "";
    for (var i = 0; i < rounds; i++) {
        c_input = "";

        if (i & 1)
            c_input += p;
        else
            c_input += digest;

        if (i % 3)
            c_input += s;

        if (i % 7)
            c_input += p;

        if (i & 1)
            c_input += digest;
        else
            c_input += p;

        digest = rstr_sha512(c_input);
    }

    return digest;
};

function sha512crypt(password, salt) {

    //sha256 and 512 have similar algorithms than md5

    var magic = "$6$";
    var rounds;

    // parse the magic "$" stuff
    var magic_array = salt.split("$");
    if (magic_array.length > 1) {
        rounds = parseInt(magic_array[2].split("=")[1]);
        if (rounds) {
            if (rounds < 1000)
                rounds = 1000;
            if (rounds > 999999999)
                rounds = 999999999;
            salt = magic_array[3] || salt;
        } else {
            salt = magic_array[2] || salt;
        }
    }
    // salt is max 16 chars long
    salt = salt.substr(0, 16);
    var hash = "";
    var result = "";
    hash = _rstr_sha512crypt(password, salt, rounds || 5000);


    result =
        to64_triplet(hash, 0, 21, 42) +
        to64_triplet(hash, 22, 43, 1) +
        to64_triplet(hash, 44, 2, 23) +
        to64_triplet(hash, 3, 24, 45) +
        to64_triplet(hash, 25, 46, 4) +
        to64_triplet(hash, 47, 5, 26) +
        to64_triplet(hash, 6, 27, 48) +
        to64_triplet(hash, 28, 49, 7) +
        to64_triplet(hash, 50, 8, 29) +
        to64_triplet(hash, 9, 30, 51) +
        to64_triplet(hash, 31, 52, 10) +
        to64_triplet(hash, 53, 11, 32) +
        to64_triplet(hash, 12, 33, 54) +
        to64_triplet(hash, 34, 55, 13) +
        to64_triplet(hash, 56, 14, 35) +
        to64_triplet(hash, 15, 36, 57) +
        to64_triplet(hash, 37, 58, 16) +
        to64_triplet(hash, 59, 17, 38) +
        to64_triplet(hash, 18, 39, 60) +
        to64_triplet(hash, 40, 61, 19) +
        to64_triplet(hash, 62, 20, 41) +
        to64_single(hash, 63);




    return magic + salt + "$" + result;
}


function sha256crypt(password, salt) {

    //sha256 and 512 have similar algorithms than md5

    var magic = "$5$";
    var rounds;

    // parse the magic "$" stuff
    var magic_array = salt.split("$");
    if (magic_array.length > 1) {
        rounds = parseInt(magic_array[2].split("=")[1]);
        if (rounds) {
            if (rounds < 1000)
                rounds = 1000;
            if (rounds > 999999999)
                rounds = 999999999;
            salt = magic_array[3] || salt;
        } else {
            salt = magic_array[2] || salt;
        }
    }

    // salt is max 16 chars long
    salt = salt.substr(0, 16);
    var hash = "";
    var result = "";
    hash = _rstr_sha256crypt(password, salt, rounds || 5000);

    var result =
        to64_triplet(hash, 0, 10, 20) +
        to64_triplet(hash, 21, 1, 11) +
        to64_triplet(hash, 12, 22, 2) +
        to64_triplet(hash, 3, 13, 23) +
        to64_triplet(hash, 24, 4, 14) +
        to64_triplet(hash, 15, 25, 5) +
        to64_triplet(hash, 6, 16, 26) +
        to64_triplet(hash, 27, 7, 17) +
        to64_triplet(hash, 18, 28, 8) +
        to64_triplet(hash, 9, 19, 29) +
        to64_double(hash, 31, 30);




    return magic + salt + "$" + result;
}




function to64(v, n) {
    const ascii64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var s = "";
    while (--n >= 0) {
        s += ascii64.charAt(v & 0x3f);
        v >>= 6;
    }
    return s;
}

function to64_triplet(str, idx0, idx1, idx2) {
    var v = (str.charCodeAt(idx0) << 16) |
        (str.charCodeAt(idx1) << 8) |
        (str.charCodeAt(idx2));
    return to64(v, 4);
}

function to64_double(str, idx0, idx1) {
    var v = (str.charCodeAt(idx0) << 8) |
        str.charCodeAt(idx1);
    return to64(v, 3);
}


function to64_single(str, idx0) {
    var v = str.charCodeAt(idx0);
    return to64(v, 2);
}




function md5crypt(password, salt, magic) {
    if (magic == null) magic = "$1$";
    var pwlen = password.length;

    var da = password + magic + salt;
    var db = password + salt + password;

    var db_digest = CryptoJS.MD5(db);


    for (pwlen; pwlen > 0; pwlen -= 16) {
        if (pwlen > 16)
            da = da.concat(db_digest.toString(CryptoJS.enc.Latin1));
        else
            da = da.concat(db_digest.toString(CryptoJS.enc.Latin1).substring(0, pwlen));
    }



    for (var i = password.length; i != 0; i >>= 1) {

        if (i % 2 == 1)
            da += '\0';
        else
            da += password.charAt(0);

    }

    var dc_digest = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(da));


    for (i = 0; i < 1000; i++) {
        var tmp = "";

        if (i & 1)
            tmp += password;
        else
            tmp += dc_digest.toString(CryptoJS.enc.Latin1);
        if (i % 3) {

            tmp += salt;
        }
        if (i % 7)
            tmp += password;

        if (i & 1)
            tmp += dc_digest.toString(CryptoJS.enc.Latin1);
        else
            tmp += password;
        dc_digest = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(tmp));

    }




    var hash = magic + salt + "$" +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 0, 6, 12) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 1, 7, 13) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 2, 8, 14) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 3, 9, 15) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 4, 10, 5) +
        to64_single(dc_digest.toString(CryptoJS.enc.Latin1), 11);



    return hash;

}

function verifyMD5CRYPT(password, hash) {
    const hashToVerify =md5crypt(password,hash.split("$")[2])
    return hashToVerify === hash;
}

// MySQL $A$ (7401): sha256crypt raw digest, rounds = cost*1000, hex-encoded.
// Format: $mysql$A$<cost:03>*<salt hex>*<dgst hex>
function verifyMysqlA(password, hash) {
    var m = /^\$mysql\$A\$(\d{3})\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
    if (!m) return false;
    var salt = "";
    for (var i = 0; i < m[2].length; i += 2) salt += String.fromCharCode(parseInt(m[2].substr(i, 2), 16));
    var h = _rstr_sha256crypt(String(password), salt, parseInt(m[1], 10) * 1000);
    // hashcat stores the hex of sha256crypt's 43-char base64 output, not the raw digest.
    var b64 = to64_triplet(h, 0, 10, 20) + to64_triplet(h, 21, 1, 11) + to64_triplet(h, 12, 22, 2) +
        to64_triplet(h, 3, 13, 23) + to64_triplet(h, 24, 4, 14) + to64_triplet(h, 15, 25, 5) +
        to64_triplet(h, 6, 16, 26) + to64_triplet(h, 27, 7, 17) + to64_triplet(h, 18, 28, 8) +
        to64_triplet(h, 9, 19, 29) + to64_double(h, 31, 30);
    var hex = "";
    for (var j = 0; j < b64.length; j++) { var c = b64.charCodeAt(j).toString(16); hex += c.length < 2 ? "0" + c : c; }
    return hex === m[3].toLowerCase();
}

// AIX {smd5} (6300): md5crypt with an EMPTY magic string, 1000 rounds.
function verifyAixSmd5(password, hash) {
    if (String(hash).indexOf('{smd5}') !== 0) return false;
    var inner = String(hash).slice(6), salt = inner.split('$')[0];
    return md5crypt(String(password), salt, '') === inner;
}

// apr1 (1600) / Juniper $1$-in-blob share the md5crypt core with a custom magic.
function verifyApr1(password, hash) {
    var parts = String(hash).split("$");
    if (parts[1] !== "apr1") return false;
    return md5crypt(password, parts[2], "$apr1$") === String(hash);
}
function verifySHA256CRYPT(password, hash) {

    var magic_array = hash.split("$");
    var salt;
    var rounds;
    var rest;
    if (magic_array.length > 1) {
        rounds = parseInt(magic_array[2].split("=")[1]);
        if (rounds) {
            salt = magic_array[3];
            rest= magic_array[4];

        } else {
            salt = magic_array[2];
            rest= magic_array[3];
        }
    }
    else return false;

  var  formatted_hash="$5$"+salt+"$"+rest;


    const hashToVerify =sha256crypt(password,hash)
    return hashToVerify === formatted_hash;
}
function verifySHA512CRYPT(password, hash) {

    var magic_array = hash.split("$");
    var rounds;
    var salt;
    var rest;
    if (magic_array.length > 1) {
        rounds = parseInt(magic_array[2].split("=")[1]);
        if (rounds) {
            salt = magic_array[3];
            rest= magic_array[4];

        } else {
            salt = magic_array[2];
            rest= magic_array[3];
        }
    }
    else return false;

   var formatted_hash="$6$"+salt+"$"+rest;

    const hashToVerify =sha512crypt(password,hash)

    
    return hashToVerify === formatted_hash;
}

// ----- phpass (hashcat mode 400: WordPress / phpBB3 / Joomla) --------------
// Iterated MD5. Hash = "$P$" or "$H$" + cost-char + 8-char salt + 22-char digest.
// count = 1 << itoa64_index(cost-char); digest = md5(salt.pass) then md5(prev.pass)
// count times, encoded with phpass's own 3-byte->4-char base64.
var PHPASS_ITOA64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function phpassEncode64(input, count) {
    var output = '';
    var i = 0;
    do {
        var value = input.charCodeAt(i++);
        output += PHPASS_ITOA64.charAt(value & 0x3f);
        if (i < count) value |= input.charCodeAt(i) << 8;
        output += PHPASS_ITOA64.charAt((value >> 6) & 0x3f);
        if (i++ >= count) break;
        if (i < count) value |= input.charCodeAt(i) << 16;
        output += PHPASS_ITOA64.charAt((value >> 12) & 0x3f);
        if (i++ >= count) break;
        output += PHPASS_ITOA64.charAt((value >> 18) & 0x3f);
    } while (i < count);
    return output;
}

function verifyPhpass(password, hash) {
    var h = String(hash);
    if (!/^\$[PH]\$[./0-9A-Za-z]{31}$/.test(h)) return false;
    var countLog2 = PHPASS_ITOA64.indexOf(h.charAt(3));
    if (countLog2 < 7 || countLog2 > 30) return false;
    var count = 1 << countLog2;
    var setting = h.substring(0, 12);
    var salt = h.substring(4, 12);
    var passWA = CryptoJS.enc.Latin1.parse(String(password));
    var digest = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(salt).concat(passWA.clone()));
    for (var i = 0; i < count; i++) {
        digest = CryptoJS.MD5(digest.clone().concat(passWA.clone()));
    }
    return h === setting + phpassEncode64(digest.toString(CryptoJS.enc.Latin1), 16);
}

// ----- Juniper/NetBSD sha1crypt (hashcat mode 15100) -----------------------
// "$sha1$<iter>$<salt>$<digest>". tmp = HMAC-SHA1(key=pass, data="<salt>$sha1$<iter>")
// then iter-1 more HMAC-SHA1(key=pass, data=prev); the 20-byte tmp is crypt-base64
// encoded (7 groups, last group has a trailing zero byte).
function sha1cryptDigest(tmp) {
    var d = to64_triplet(tmp, 0, 1, 2) + to64_triplet(tmp, 3, 4, 5) +
            to64_triplet(tmp, 6, 7, 8) + to64_triplet(tmp, 9, 10, 11) +
            to64_triplet(tmp, 12, 13, 14) + to64_triplet(tmp, 15, 16, 17);
    var v = (tmp.charCodeAt(18) << 16) | (tmp.charCodeAt(19) << 8);
    return d + to64(v, 4);
}

function verifySha1crypt(password, hash) {
    var m = /^\$sha1\$(\d+)\$([^$]*)\$([./0-9A-Za-z]{28})$/.exec(String(hash));
    if (!m) return false;
    var iterations = parseInt(m[1], 10);
    var salt = m[2];
    if (!iterations) return false;
    var key = CryptoJS.enc.Latin1.parse(String(password));
    var tmp = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(salt + '$sha1$' + iterations), key);
    for (var r = 1; r < iterations; r++) tmp = CryptoJS.HmacSHA1(tmp, key);
    return sha1cryptDigest(tmp.toString(CryptoJS.enc.Latin1)) === m[3];
}

// ---- forward generators for the round-trip harness ----
function genSha1crypt(password, salt, iterations) {
    var key = CryptoJS.enc.Latin1.parse(String(password));
    var tmp = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(salt + '$sha1$' + iterations), key);
    for (var r = 1; r < iterations; r++) tmp = CryptoJS.HmacSHA1(tmp, key);
    return '$sha1$' + iterations + '$' + salt + '$' + sha1cryptDigest(tmp.toString(CryptoJS.enc.Latin1));
}
function genPhpass(password, salt, costChar) {
    var setting = '$P$' + costChar + salt, count = 1 << PHPASS_ITOA64.indexOf(costChar);
    var passWA = CryptoJS.enc.Latin1.parse(String(password));
    var digest = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(salt).concat(passWA.clone()));
    for (var i = 0; i < count; i++) digest = CryptoJS.MD5(digest.clone().concat(passWA.clone()));
    return setting + phpassEncode64(digest.toString(CryptoJS.enc.Latin1), 16);
}
function genMysqlA(password, saltHex, cost) {
    var salt = '';
    for (var i = 0; i < saltHex.length; i += 2) salt += String.fromCharCode(parseInt(saltHex.substr(i, 2), 16));
    var h = _rstr_sha256crypt(String(password), salt, cost * 1000);
    var b64 = to64_triplet(h, 0, 10, 20) + to64_triplet(h, 21, 1, 11) + to64_triplet(h, 12, 22, 2) +
        to64_triplet(h, 3, 13, 23) + to64_triplet(h, 24, 4, 14) + to64_triplet(h, 15, 25, 5) +
        to64_triplet(h, 6, 16, 26) + to64_triplet(h, 27, 7, 17) + to64_triplet(h, 18, 28, 8) +
        to64_triplet(h, 9, 19, 29) + to64_double(h, 31, 30);
    var hex = '';
    for (var j = 0; j < b64.length; j++) { var c = b64.charCodeAt(j).toString(16); hex += c.length < 2 ? '0' + c : c; }
    return '$mysql$A$' + ('00' + cost).slice(-3) + '*' + saltHex.toUpperCase() + '*' + hex.toUpperCase();
}

module.exports = { verifyMD5CRYPT: verifyMD5CRYPT, verifySHA256CRYPT: verifySHA256CRYPT, verifySHA512CRYPT: verifySHA512CRYPT, verifyPhpass: verifyPhpass, verifySha1crypt: verifySha1crypt, verifyApr1: verifyApr1, verifyMysqlA: verifyMysqlA, verifyAixSmd5: verifyAixSmd5, md5crypt: md5crypt, sha256crypt: sha256crypt, sha512crypt: sha512crypt, genSha1crypt: genSha1crypt, genPhpass: genPhpass, genMysqlA: genMysqlA };
