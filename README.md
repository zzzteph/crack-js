# crack-js

JavaScript implementation of various hashing algorithms. All hashes are accepted in Hashcat format. For more information, visit the [Hashcat wiki](https://hashcat.net/wiki/doku.php?id=example_hashes).

Currently supported hash types:

|Type|Example|Password|
| --- | --- | --- |
|md5crypt|$1$28772684$iEwNOgGugqO9.bIz5sk8k/|hashcat|
|sha256crypt|$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD|hashcat|
|sha512crypt|$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/|hashcat|
|bcrypt|$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6|hashcat|
|ntlm|b4b9b02e6f09a9bd760f388b67351e2b|hashcat|
|md5|8743b52063cd84097a65d1633f5c74f5|hashcat|
|sha1|b89eaac7e61417341b710b727768294d0e6a277b|hashcat|
|sha256|127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935|hashcat|
|sha512|82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f|hashcat|
|hmac-md5(\*)|bfd280436f45fa38eaacac3b00518f29:1234|hashcat|
|hmac-sha1(\*)|d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234|hashcat|
|hmac-sha256(\*)|8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234|hashcat|
|hmac-sha512(\*)|7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234|hashcat|
|netntlmv2|admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030|hashcat|
|mysql323|7196759210defdc0|hashcat|
|jwt|eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY|hashcat|

(\*) password will be tested as message and secret phrase

## Installation

```sh
npm install crack-js
```

### Compiles and minifies for production

```sh
npm run build
```


## Usage

```javascript
const hashcat = require('crack-js');

const password="hashcat";
const hash="b4b9b02e6f09a9bd760f388b67351e2b";
const type="ntlm"

if(hashcat.verifyHash(password,hash,type)==TRUE)
{
    console.log("Password found!");
}


```


### Parameters

The **verifyHash** function takes the following options:

 - **password** (required): The password that will be used to verify the hash
 - **hash** (required): Hash in specified format to test.
 - **type** (required): Type of the hash. You can list all available types with ```availableHashTypes```
 
### Return Value
The **verifyHash** function returns **true** if supplied hash is valid for the password and **false** if not.


 

### Example

```javascript
const hashcat = require('crack-js');

console.log(hashcat.availableHashTypes);
console.log(hashcat.verifyHash("hashcat","eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY","jwt"))
console.log(hashcat.verifyHash("hashcat","$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/","sha512crypt"));
console.log(hashcat.verifyHash("hashcat","$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD","sha256crypt"));
console.log(hashcat.verifyHash("hashcat","b4b9b02e6f09a9bd760f388b67351e2b","ntlm"));
console.log(hashcat.verifyHash("hashcat","8743b52063cd84097a65d1633f5c74f5","md5"));
console.log(hashcat.verifyHash("hashcat","b89eaac7e61417341b710b727768294d0e6a277b","sha1"));
console.log(hashcat.verifyHash("hashcat","127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935","sha256"));
console.log(hashcat.verifyHash("hashcat","82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f","sha512"));
console.log(hashcat.verifyHash("hashcat","$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6","bcrypt"));
console.log(hashcat.verifyHash("hashcat","admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030","netntlmv2"));
console.log(hashcat.verifyHash("hashcat","bfd280436f45fa38eaacac3b00518f29:1234","hmac-md5"));
console.log(hashcat.verifyHash("hashcat","d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234","hmac-sha1"));
console.log(hashcat.verifyHash("hashcat","8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234","hmac-sha256"));
console.log(hashcat.verifyHash("hashcat","7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234","hmac-sha512"));
console.log(hashcat.verifyHash("hashcat","7196759210defdc0","mysql323"));

```




# Credits and Dependencies

- **MD4** - [crypto-js Issue #1](https://github.com/tomyun/crypto-js/issues/1)
- **Crypto-js** - [crypto-js Repository](https://github.com/brix/crypto-js)
- **bcryptjs** - [bcrypt.js Repository](https://github.com/dcodeIO/bcrypt.js)