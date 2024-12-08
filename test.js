
const hashcat = require('./dist/crack.js');
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
console.log(hashcat.verifyHash("hashcat","$1$28772684$iEwNOgGugqO9.bIz5sk8k/","md5crypt"));
console.log(hashcat.verifyHash("test","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5mhBHqs5_DTLdINd9p5m7ZJ6XD0Xc55kIaCRY5r6HRA","jwt"));
console.log(hashcat.verifyHash("test","eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.KOZqnJ-wEzC-JvqqIHGKBIGgbYHH2Fej71TpBctnIguBkf3EdSYiwuRMSz35uY8E","jwt"));
console.log(hashcat.verifyHash("test","eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.VXfjNdZn9mDxRYhiaCi8rYYtcuNe3KCfK3LvggWSaHwjZsag9ugMOuDPOeeBD3oNhK-cOkTvRLy_ERbgnEyxYA","jwt"));




console.log(hashcat.getPossibleHashTypes("eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY"));
console.log(hashcat.getPossibleHashTypes("$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/"));
console.log(hashcat.getPossibleHashTypes("$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD"));
console.log(hashcat.getPossibleHashTypes("b4b9b02e6f09a9bd760f388b67351e2b"));
console.log(hashcat.getPossibleHashTypes("8743b52063cd84097a65d1633f5c74f5"));
console.log(hashcat.getPossibleHashTypes("b89eaac7e61417341b710b727768294d0e6a277b"));
console.log(hashcat.getPossibleHashTypes("127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935"));
console.log(hashcat.getPossibleHashTypes("82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f"));
console.log(hashcat.getPossibleHashTypes("$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6"));
console.log(hashcat.getPossibleHashTypes("admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030"));
console.log(hashcat.getPossibleHashTypes("bfd280436f45fa38eaacac3b00518f29:1234"));
console.log(hashcat.getPossibleHashTypes("d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234"));
console.log(hashcat.getPossibleHashTypes("8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234"));
console.log(hashcat.getPossibleHashTypes("7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234"));
console.log(hashcat.getPossibleHashTypes("7196759210defdc0"));
console.log(hashcat.getPossibleHashTypes("$1$28772684$iEwNOgGugqO9.bIz5sk8k/"));




console.log("Speed measure");
for(let type of hashcat.availableHashTypes)
{
    console.log(type+":"+hashcat.measureSpeed(type));
}