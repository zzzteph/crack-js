// Keyed hashes / MACs: HMAC (key=salt, modes 60/160/1460/1760 and key=pass
// 50/150/1450/1750), LDAP SSHA, JWT (16500), and NetNTLMv2 (5600).
var u = require('./util');
var CryptoJS = u.CryptoJS;
var _waToBytes = u._waToBytes, _bytesToWA = u._bytesToWA, _bytesToHex = u._bytesToHex;

function netntlmv2Hash(username,domain,challenge,blob,password)
{
    let wordsNtlm = CryptoJS.enc.Hex.parse(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(password)).toString().toUpperCase());
    var usernameDomain=CryptoJS.enc.Utf16LE.parse(username.toUpperCase()+domain)
    var ntlmv2hash=CryptoJS.HmacMD5(usernameDomain,wordsNtlm);
    var resultHash=CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(challenge+blob),ntlmv2hash);
    return CryptoJS.enc.Hex.stringify(resultHash);
    
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

// {SHA}/{SSHA}/{SSHA256}/{SSHA512} (LDAP): base64( raw_digest(pass.salt) . salt ).
// digestLen bytes of digest, remaining bytes are the salt (empty for {SHA}).
function makeSshaVerifier(tag, hasher, digestLen) {
    var re = new RegExp('^\\{' + tag + '\\}(.+)$');
    return function (password, hash) {
        var m = re.exec(String(hash));
        if (!m) return false;
        var bytes;
        try { bytes = _waToBytes(CryptoJS.enc.Base64.parse(m[1])); } catch (e) { return false; }
        if (bytes.length < digestLen) return false;
        var salt = _bytesToWA(bytes.slice(digestLen));
        var calc = hasher(CryptoJS.enc.Latin1.parse(String(password)).concat(salt));
        return _bytesToHex(_waToBytes(calc)) === _bytesToHex(bytes.slice(0, digestLen));
    };
}

// HMAC where the KEY is the password and the message is the salt (modes 50/150/
// 1450/1750). Hash line is "<hex-digest>:<salt>".
function makeHmacPassVerifier(hmacFn) {
    return function (password, hash) {
        var line = String(hash);
        var idx = line.indexOf(':');
        if (idx < 0) return false;
        var digest = line.slice(0, idx).toLowerCase();
        var salt = line.slice(idx + 1);
        return hmacFn(CryptoJS.enc.Latin1.parse(salt), CryptoJS.enc.Latin1.parse(String(password))).toString() === digest;
    };
}

module.exports = { verifyNetNTLMV2: verifyNetNTLMV2, verifyJWT: verifyJWT, verifyHMAC_MD5: verifyHMAC_MD5, verifyHMAC_SHA1: verifyHMAC_SHA1, verifyHMAC_SHA256: verifyHMAC_SHA256, verifyHMAC_SHA512: verifyHMAC_SHA512, makeSshaVerifier: makeSshaVerifier, makeHmacPassVerifier: makeHmacPassVerifier };
