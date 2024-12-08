var bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");









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




function md5crypt(password, salt) {
    var pwlen = password.length;

    var da = password + "$1$" + salt;
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




    var hash = "$1$" + salt + "$" +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 0, 6, 12) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 1, 7, 13) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 2, 8, 14) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 3, 9, 15) +
        to64_triplet(dc_digest.toString(CryptoJS.enc.Latin1), 4, 10, 5) +
        to64_single(dc_digest.toString(CryptoJS.enc.Latin1), 11);



    return hash;

}



(function(Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var S = [
        [3, 7, 11, 19],
        [3, 5, 9, 13],
        [3, 9, 11, 15]
    ];
    var FF = 0x00000000;
    var GG = 0x5a827999;
    var HH = 0x6ed9eba1;

    /**
     * MD4 hash algorithm.
     */
    var MD4 = C_algo.MD4 = Hasher.extend({
        _doReset: function() {
            this._hash = new WordArray.init([
                0x67452301, 0xefcdab89,
                0x98badcfe, 0x10325476
            ]);
        },

        _doProcessBlock: function(M, offset) {
            // Swap endian
            for (var i = 0; i < 16; i++) {
                // Shortcuts
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];

                M[offset_i] = (
                    (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
                );
            }

            // Shortcuts
            var H = this._hash.words;

            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];

            // Working varialbes
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];

            // Computation
            a = CC(FFF, FF, a, b, c, d, M_offset_0, S[0][0]);
            d = CC(FFF, FF, d, a, b, c, M_offset_1, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_2, S[0][2]);
            b = CC(FFF, FF, b, c, d, a, M_offset_3, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_4, S[0][0]);
            d = CC(FFF, FF, d, a, b, c, M_offset_5, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_6, S[0][2]);
            b = CC(FFF, FF, b, c, d, a, M_offset_7, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_8, S[0][0]);
            d = CC(FFF, FF, d, a, b, c, M_offset_9, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_10, S[0][2]);
            b = CC(FFF, FF, b, c, d, a, M_offset_11, S[0][3]);
            a = CC(FFF, FF, a, b, c, d, M_offset_12, S[0][0]);
            d = CC(FFF, FF, d, a, b, c, M_offset_13, S[0][1]);
            c = CC(FFF, FF, c, d, a, b, M_offset_14, S[0][2]);
            b = CC(FFF, FF, b, c, d, a, M_offset_15, S[0][3]);

            a = CC(GGG, GG, a, b, c, d, M_offset_0, S[1][0]);
            d = CC(GGG, GG, d, a, b, c, M_offset_4, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_8, S[1][2]);
            b = CC(GGG, GG, b, c, d, a, M_offset_12, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_1, S[1][0]);
            d = CC(GGG, GG, d, a, b, c, M_offset_5, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_9, S[1][2]);
            b = CC(GGG, GG, b, c, d, a, M_offset_13, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_2, S[1][0]);
            d = CC(GGG, GG, d, a, b, c, M_offset_6, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_10, S[1][2]);
            b = CC(GGG, GG, b, c, d, a, M_offset_14, S[1][3]);
            a = CC(GGG, GG, a, b, c, d, M_offset_3, S[1][0]);
            d = CC(GGG, GG, d, a, b, c, M_offset_7, S[1][1]);
            c = CC(GGG, GG, c, d, a, b, M_offset_11, S[1][2]);
            b = CC(GGG, GG, b, c, d, a, M_offset_15, S[1][3]);

            a = CC(HHH, HH, a, b, c, d, M_offset_0, S[2][0]);
            d = CC(HHH, HH, d, a, b, c, M_offset_8, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_4, S[2][2]);
            b = CC(HHH, HH, b, c, d, a, M_offset_12, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_2, S[2][0]);
            d = CC(HHH, HH, d, a, b, c, M_offset_10, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_6, S[2][2]);
            b = CC(HHH, HH, b, c, d, a, M_offset_14, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_1, S[2][0]);
            d = CC(HHH, HH, d, a, b, c, M_offset_9, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_5, S[2][2]);
            b = CC(HHH, HH, b, c, d, a, M_offset_13, S[2][3]);
            a = CC(HHH, HH, a, b, c, d, M_offset_3, S[2][0]);
            d = CC(HHH, HH, d, a, b, c, M_offset_11, S[2][1]);
            c = CC(HHH, HH, c, d, a, b, M_offset_7, S[2][2]);
            b = CC(HHH, HH, b, c, d, a, M_offset_15, S[2][3]);

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
        },
        _doFinalize: function() {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
            var nBitsTotalL = nBitsTotal;
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
                (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00)
            );
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00)
            );

            data.sigBytes = (dataWords.length + 1) * 4;

            // Hash final blocks
            this._process();

            // Shortcuts
            var hash = this._hash;
            var H = hash.words;

            // Swap endian
            for (var i = 0; i < 4; i++) {
                // Shortcut
                var H_i = H[i];

                H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                    (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
            }

            // Return final computed hash
            return hash;
        },
        clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    function ROTL(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function CC(f, k, a, b, c, d, x, s) {
        return ROTL((a + f(b, c, d) + x + k), s);
    }

    function FFF(x, y, z) {
        return ((x & y) | ((~x) & z));
    }

    function GGG(x, y, z) {
        return ((x & y) | (x & z) | (y & z));
    }

    function HHH(x, y, z) {
        return (x ^ y ^ z);
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.MD4('message');
     *     var hash = CryptoJS.MD4(wordArray);
     */
    C.MD4 = Hasher._createHelper(MD4);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacMD4(message, key);
     */
    C.HmacMD4 = Hasher._createHmacHelper(MD4);
})(Math);

function mysql323Hash(password) {
    let nr = 1345345333;
    let nr2 = 305419889;
    let add = 7;

    for (let i = 0; i < password.length; i++) {
        let ch = password.charCodeAt(i);
        nr ^= ((nr & 63) + add) * ch + (nr << 8);
        nr2 += (nr2 << 8) ^ nr;
        add += ch;
    }


    let hash = (nr >>> 0).toString(16) + (nr2 >>> 0).toString(16);
    while (hash.length < 16) {
        hash = '0' + hash;
    }

    return hash;
}



function netntlmv2Hash(username,domain,challenge,blob,password)
{
    let wordsNtlm = CryptoJS.enc.Hex.parse(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(password)).toString().toUpperCase());
    var usernameDomain=CryptoJS.enc.Utf16LE.parse(username.toUpperCase()+domain)
    var ntlmv2hash=CryptoJS.HmacMD5(usernameDomain,wordsNtlm);
    var resultHash=CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(challenge+blob),ntlmv2hash);
    return CryptoJS.enc.Hex.stringify(resultHash);
    
}


export function verifyHash(password, hash, hashType) {
    switch (hashType) {

        case 'jwt':
            return verifyJWT(password, hash);
        case 'netntlmv2':
            return verifyNetNTLMV2(password, hash);
        case 'ntlm':
            return verifyNTLM(password, hash);
        case 'md5':
            return verifyMD5(password, hash);
        case 'sha1':
            return verifySHA1(password, hash);
        case 'sha256':
                return verifySHA256(password, hash);
        case 'sha512':
                return verifySHA512(password, hash);
        case 'bcrypt':
            return verifyBcrypt(password, hash);
        case 'md5crypt':
            return verifyMD5CRYPT(password, hash);
        case 'sha256crypt':
            return verifySHA256CRYPT(password, hash);
        case 'sha512crypt':
            return verifySHA512CRYPT(password, hash);       

        case 'hmac-md5':
                return verifyHMAC_MD5(password, hash);       

        case 'hmac-sha1':
                    return verifyHMAC_SHA1(password, hash);  
        case 'hmac-sha256':
                        return verifyHMAC_SHA256(password, hash);  
        case 'hmac-sha512':
                            return verifyHMAC_SHA512(password, hash);  
        case 'mysql323':
            return verify_mysql323(password, hash);  
                            
        default:
            throw new Error(`Unsupported hash type: ${hashType}`);
    }
}



export function measureSpeed(hashType) {
    let hash=false;
    switch (hashType) {

        case 'jwt': hash= "eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY";break;
        case 'netntlmv2':  hash= "admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030";break;
        case 'ntlm': hash= "b4b9b02e6f09a9bd760f388b67351e2b";break;
        case 'md5': hash= "8743b52063cd84097a65d1633f5c74f5";break;
        case 'sha1':  hash= "b89eaac7e61417341b710b727768294d0e6a277b";break;
        case 'sha256':  hash= "127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935";break;
        case 'sha512':  hash= "82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f";break;
        case 'bcrypt': hash= "$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6";break;
        case 'md5crypt': hash= "$1$28772684$iEwNOgGugqO9.bIz5sk8k/";break;
        case 'sha256crypt': hash= "$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD";break;
        case 'sha512crypt': hash= "$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/";break;
        case 'mysql323': hash= "7196759210defdc0";break;
        case 'hmac-md5':  hash= "bfd280436f45fa38eaacac3b00518f29:1234";break;
        case 'hmac-sha1': hash= "d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234";break;
        case 'hmac-sha256': hash= "8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234";break;
        case 'hmac-sha512': hash= "7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234";break;      
        default:
            throw new Error(`Unsupported hash type: ${hashType}`);
    }

      const duration = 5000;
    
        const startTime = Date.now();
        let count = 0;
        while (Date.now() - startTime < duration) {
          verifyHash("hashcat", hash, hashType);
          count++;
        }
      return Math.floor( count / (duration / 1000));

}







export function isValidHash(hash, hashType) {
    switch (hashType) {

        case 'jwt': return /^([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})$/.test(hash);
        case 'netntlmv2': return /^[^:]+::[^:]+:[a-fA-F0-9]{16}:[a-fA-F0-9]{32,64}:[a-fA-F0-9]+$/.test(hash);
        case 'ntlm': return /^[a-fA-F0-9]{32}$/.test(hash);
        case 'md5': return /^[a-fA-F0-9]{32}$/.test(hash);
        case 'sha1': return /^[a-fA-F0-9]{40}$/.test(hash);
        case 'sha256': return /^[a-fA-F0-9]{64}$/.test(hash);
        case 'sha512': return /^[a-fA-F0-9]{128}$/.test(hash);
        case 'bcrypt': return /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(hash);
        case 'md5crypt':return /^\$1\$[./A-Za-z0-9]{1,8}\$[./A-Za-z0-9]{22}$/.test(hash);
        case 'sha256crypt':return /^\$5\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{43,86}$/.test(hash);
        case 'sha512crypt':return /^\$6\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{86,}$/.test(hash);
        case 'mysql323':return /^[a-fA-F0-9]{16}$/.test(hash);
        case 'hmac-md5': return /^[a-fA-F0-9]{32}:[A-Za-z0-9_]+$/.test(hash);
        case 'hmac-sha1':   return /^[a-fA-F0-9]{40}:[A-Za-z0-9_]+$/.test(hash);
        case 'hmac-sha256':    return /^[a-fA-F0-9]{64}:[A-Za-z0-9_]+$/.test(hash);
        case 'hmac-sha512':    return /^[a-fA-F0-9]{128}:[A-Za-z0-9_]+$/.test(hash);                    
        default:
            throw new Error(`Unsupported hash type: ${hashType}`);
    }
}


export function getPossibleHashTypes(hash) {
    let possibleHashTypes=[];
    for (let i = 0; i < availableHashTypes.length; i++) {
       if(isValidHash(hash,availableHashTypes[i]))possibleHashTypes.push(availableHashTypes[i]);
    }
    return possibleHashTypes;
}



function verifyNetNTLMV2(password,hash)
{
    let parts = hash.split(":");
  
    if (parts.length < 6) return false
  
    var username = parts[0];
    var  domain = parts[2];
    var  challenge = parts[3];
    var  targetHash = parts[4];
    var  blob = parts[5];
  
    var targetHashCalculated=netntlmv2Hash(username,domain,challenge,blob,password);

    return targetHashCalculated === targetHash;

}



function verifyMD5CRYPT(password, hash) {
    const hashToVerify =md5crypt(password,hash.split("$")[2])
    return hashToVerify === hash;
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


function verifyJWT(password,hash)
{
	const jwtParts = hash.split(".");
	var clearedToken=String(jwtParts[0])+"."+String(jwtParts[1]);
    const header = JSON.parse(atob(jwtParts[0]));
    if (!header.alg) 
        return false;
    let signature=false;
    let alg=header.alg.toLowerCase();
    switch(alg)
    {
        case "hs256":signature=CryptoJS.HmacSHA256(String(clearedToken),String(password)).toString(CryptoJS.enc.Base64).replaceAll("=","").replaceAll("+","-").replaceAll('/','_');break;
        case "hs384":signature=CryptoJS.HmacSHA384(String(clearedToken),String(password)).toString(CryptoJS.enc.Base64).replaceAll("=","").replaceAll("+","-").replaceAll('/','_');break;
        case "hs512":signature=CryptoJS.HmacSHA512(String(clearedToken),String(password)).toString(CryptoJS.enc.Base64).replaceAll("=","").replaceAll("+","-").replaceAll('/','_');break;
        default: return false;
    }
    
    if (jwtParts[2] == signature)
        return true
    return false;
}

function verifyNTLM(password, hash) {
    const hashToVerify =CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(password)).toString().toUpperCase();
    return hashToVerify === hash.toString().toUpperCase();
}

function verifyMD5(password, hash) {
    const hashToVerify = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}

function verifySHA1(password, hash) {
    const hashToVerify = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}

function verifySHA256(password, hash) {
    const hashToVerify = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}


function verifySHA512(password, hash) {
    const hashToVerify = CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}


function verifyBcrypt(password, hash) {
    return bcrypt.compareSync(password, hash);
}


function verifyHMAC_MD5(password, hash) {

    const parts = hash.split(":");
    let hashToVerify=null;
    if (parts.length == 2) 
    { 
       hashToVerify = CryptoJS.HmacMD5(password, parts[1]).toString(CryptoJS.enc.Hex);
       return hashToVerify === parts[0].toLowerCase();
    }

    hashToVerify = CryptoJS.HmacMD5(password, password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();

}

function verifyHMAC_SHA1(password, hash) {
    

    const parts = hash.split(":");
    let hashToVerify=null;
    if (parts.length == 2) 
    { 


       hashToVerify = CryptoJS.HmacSHA1(password, parts[1]).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       hashToVerify = CryptoJS.HmacSHA1(parts[1],password).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       return false;


    }

    hashToVerify = CryptoJS.HmacSHA1(password, password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();



    
}


function verifyHMAC_SHA256(password, hash) {
    const parts = hash.split(":");
    let hashToVerify=null;
    if (parts.length == 2) 
    { 


       hashToVerify = CryptoJS.HmacSHA256(password, parts[1]).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       hashToVerify = CryptoJS.HmacSHA256(parts[1],password).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       return false;


    }
    hashToVerify = CryptoJS.HmacSHA256(password, password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}

function verifyHMAC_SHA512(password, hash) {
    const parts = hash.split(":");
    let hashToVerify=null;
    if (parts.length == 2) 
    {
       hashToVerify = CryptoJS.HmacSHA512(password, parts[1]).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       hashToVerify = CryptoJS.HmacSHA512(parts[1],password).toString(CryptoJS.enc.Hex);
       if(hashToVerify === parts[0].toLowerCase())return true;
       return false;
    }
    hashToVerify = CryptoJS.HmacSHA512(password, password).toString(CryptoJS.enc.Hex);
    return hashToVerify === hash.toLowerCase();
}


function verify_mysql323(password,hash) {
    let calculatedHash = mysql323Hash(password);
    return calculatedHash.toLowerCase() === hash.toLowerCase();


}




export const availableHashTypes = ['md5crypt','sha256crypt','sha512crypt','ntlm', 'md5', 'sha1','sha256','sha512', 'bcrypt','netntlmv2','hmac-md5','hmac-sha1','hmac-sha256','hmac-sha512','mysql323','jwt'];