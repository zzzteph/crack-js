var crack = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/bcryptjs-own.js
  var require_bcryptjs_own = __commonJS({
    "src/bcryptjs-own.js"(exports, module) {
      var BCRYPT_SALT_LEN = 16;
      var BLOWFISH_NUM_ROUNDS = 16;
      var P_ORIG = [
        608135816,
        2242054355,
        320440878,
        57701188,
        2752067618,
        698298832,
        137296536,
        3964562569,
        1160258022,
        953160567,
        3193202383,
        887688300,
        3232508343,
        3380367581,
        1065670069,
        3041331479,
        2450970073,
        2306472731
      ];
      var S_ORIG = [
        3509652390,
        2564797868,
        805139163,
        3491422135,
        3101798381,
        1780907670,
        3128725573,
        4046225305,
        614570311,
        3012652279,
        134345442,
        2240740374,
        1667834072,
        1901547113,
        2757295779,
        4103290238,
        227898511,
        1921955416,
        1904987480,
        2182433518,
        2069144605,
        3260701109,
        2620446009,
        720527379,
        3318853667,
        677414384,
        3393288472,
        3101374703,
        2390351024,
        1614419982,
        1822297739,
        2954791486,
        3608508353,
        3174124327,
        2024746970,
        1432378464,
        3864339955,
        2857741204,
        1464375394,
        1676153920,
        1439316330,
        715854006,
        3033291828,
        289532110,
        2706671279,
        2087905683,
        3018724369,
        1668267050,
        732546397,
        1947742710,
        3462151702,
        2609353502,
        2950085171,
        1814351708,
        2050118529,
        680887927,
        999245976,
        1800124847,
        3300911131,
        1713906067,
        1641548236,
        4213287313,
        1216130144,
        1575780402,
        4018429277,
        3917837745,
        3693486850,
        3949271944,
        596196993,
        3549867205,
        258830323,
        2213823033,
        772490370,
        2760122372,
        1774776394,
        2652871518,
        566650946,
        4142492826,
        1728879713,
        2882767088,
        1783734482,
        3629395816,
        2517608232,
        2874225571,
        1861159788,
        326777828,
        3124490320,
        2130389656,
        2716951837,
        967770486,
        1724537150,
        2185432712,
        2364442137,
        1164943284,
        2105845187,
        998989502,
        3765401048,
        2244026483,
        1075463327,
        1455516326,
        1322494562,
        910128902,
        469688178,
        1117454909,
        936433444,
        3490320968,
        3675253459,
        1240580251,
        122909385,
        2157517691,
        634681816,
        4142456567,
        3825094682,
        3061402683,
        2540495037,
        79693498,
        3249098678,
        1084186820,
        1583128258,
        426386531,
        1761308591,
        1047286709,
        322548459,
        995290223,
        1845252383,
        2603652396,
        3431023940,
        2942221577,
        3202600964,
        3727903485,
        1712269319,
        422464435,
        3234572375,
        1170764815,
        3523960633,
        3117677531,
        1434042557,
        442511882,
        3600875718,
        1076654713,
        1738483198,
        4213154764,
        2393238008,
        3677496056,
        1014306527,
        4251020053,
        793779912,
        2902807211,
        842905082,
        4246964064,
        1395751752,
        1040244610,
        2656851899,
        3396308128,
        445077038,
        3742853595,
        3577915638,
        679411651,
        2892444358,
        2354009459,
        1767581616,
        3150600392,
        3791627101,
        3102740896,
        284835224,
        4246832056,
        1258075500,
        768725851,
        2589189241,
        3069724005,
        3532540348,
        1274779536,
        3789419226,
        2764799539,
        1660621633,
        3471099624,
        4011903706,
        913787905,
        3497959166,
        737222580,
        2514213453,
        2928710040,
        3937242737,
        1804850592,
        3499020752,
        2949064160,
        2386320175,
        2390070455,
        2415321851,
        4061277028,
        2290661394,
        2416832540,
        1336762016,
        1754252060,
        3520065937,
        3014181293,
        791618072,
        3188594551,
        3933548030,
        2332172193,
        3852520463,
        3043980520,
        413987798,
        3465142937,
        3030929376,
        4245938359,
        2093235073,
        3534596313,
        375366246,
        2157278981,
        2479649556,
        555357303,
        3870105701,
        2008414854,
        3344188149,
        4221384143,
        3956125452,
        2067696032,
        3594591187,
        2921233993,
        2428461,
        544322398,
        577241275,
        1471733935,
        610547355,
        4027169054,
        1432588573,
        1507829418,
        2025931657,
        3646575487,
        545086370,
        48609733,
        2200306550,
        1653985193,
        298326376,
        1316178497,
        3007786442,
        2064951626,
        458293330,
        2589141269,
        3591329599,
        3164325604,
        727753846,
        2179363840,
        146436021,
        1461446943,
        4069977195,
        705550613,
        3059967265,
        3887724982,
        4281599278,
        3313849956,
        1404054877,
        2845806497,
        146425753,
        1854211946,
        1266315497,
        3048417604,
        3681880366,
        3289982499,
        290971e4,
        1235738493,
        2632868024,
        2414719590,
        3970600049,
        1771706367,
        1449415276,
        3266420449,
        422970021,
        1963543593,
        2690192192,
        3826793022,
        1062508698,
        1531092325,
        1804592342,
        2583117782,
        2714934279,
        4024971509,
        1294809318,
        4028980673,
        1289560198,
        2221992742,
        1669523910,
        35572830,
        157838143,
        1052438473,
        1016535060,
        1802137761,
        1753167236,
        1386275462,
        3080475397,
        2857371447,
        1040679964,
        2145300060,
        2390574316,
        1461121720,
        2956646967,
        4031777805,
        4028374788,
        33600511,
        2920084762,
        1018524850,
        629373528,
        3691585981,
        3515945977,
        2091462646,
        2486323059,
        586499841,
        988145025,
        935516892,
        3367335476,
        2599673255,
        2839830854,
        265290510,
        3972581182,
        2759138881,
        3795373465,
        1005194799,
        847297441,
        406762289,
        1314163512,
        1332590856,
        1866599683,
        4127851711,
        750260880,
        613907577,
        1450815602,
        3165620655,
        3734664991,
        3650291728,
        3012275730,
        3704569646,
        1427272223,
        778793252,
        1343938022,
        2676280711,
        2052605720,
        1946737175,
        3164576444,
        3914038668,
        3967478842,
        3682934266,
        1661551462,
        3294938066,
        4011595847,
        840292616,
        3712170807,
        616741398,
        312560963,
        711312465,
        1351876610,
        322626781,
        1910503582,
        271666773,
        2175563734,
        1594956187,
        70604529,
        3617834859,
        1007753275,
        1495573769,
        4069517037,
        2549218298,
        2663038764,
        504708206,
        2263041392,
        3941167025,
        2249088522,
        1514023603,
        1998579484,
        1312622330,
        694541497,
        2582060303,
        2151582166,
        1382467621,
        776784248,
        2618340202,
        3323268794,
        2497899128,
        2784771155,
        503983604,
        4076293799,
        907881277,
        423175695,
        432175456,
        1378068232,
        4145222326,
        3954048622,
        3938656102,
        3820766613,
        2793130115,
        2977904593,
        26017576,
        3274890735,
        3194772133,
        1700274565,
        1756076034,
        4006520079,
        3677328699,
        720338349,
        1533947780,
        354530856,
        688349552,
        3973924725,
        1637815568,
        332179504,
        3949051286,
        53804574,
        2852348879,
        3044236432,
        1282449977,
        3583942155,
        3416972820,
        4006381244,
        1617046695,
        2628476075,
        3002303598,
        1686838959,
        431878346,
        2686675385,
        1700445008,
        1080580658,
        1009431731,
        832498133,
        3223435511,
        2605976345,
        2271191193,
        2516031870,
        1648197032,
        4164389018,
        2548247927,
        300782431,
        375919233,
        238389289,
        3353747414,
        2531188641,
        2019080857,
        1475708069,
        455242339,
        2609103871,
        448939670,
        3451063019,
        1395535956,
        2413381860,
        1841049896,
        1491858159,
        885456874,
        4264095073,
        4001119347,
        1565136089,
        3898914787,
        1108368660,
        540939232,
        1173283510,
        2745871338,
        3681308437,
        4207628240,
        3343053890,
        4016749493,
        1699691293,
        1103962373,
        3625875870,
        2256883143,
        3830138730,
        1031889488,
        3479347698,
        1535977030,
        4236805024,
        3251091107,
        2132092099,
        1774941330,
        1199868427,
        1452454533,
        157007616,
        2904115357,
        342012276,
        595725824,
        1480756522,
        206960106,
        497939518,
        591360097,
        863170706,
        2375253569,
        3596610801,
        1814182875,
        2094937945,
        3421402208,
        1082520231,
        3463918190,
        2785509508,
        435703966,
        3908032597,
        1641649973,
        2842273706,
        3305899714,
        1510255612,
        2148256476,
        2655287854,
        3276092548,
        4258621189,
        236887753,
        3681803219,
        274041037,
        1734335097,
        3815195456,
        3317970021,
        1899903192,
        1026095262,
        4050517792,
        356393447,
        2410691914,
        3873677099,
        3682840055,
        3913112168,
        2491498743,
        4132185628,
        2489919796,
        1091903735,
        1979897079,
        3170134830,
        3567386728,
        3557303409,
        857797738,
        1136121015,
        1342202287,
        507115054,
        2535736646,
        337727348,
        3213592640,
        1301675037,
        2528481711,
        1895095763,
        1721773893,
        3216771564,
        62756741,
        2142006736,
        835421444,
        2531993523,
        1442658625,
        3659876326,
        2882144922,
        676362277,
        1392781812,
        170690266,
        3921047035,
        1759253602,
        3611846912,
        1745797284,
        664899054,
        1329594018,
        3901205900,
        3045908486,
        2062866102,
        2865634940,
        3543621612,
        3464012697,
        1080764994,
        553557557,
        3656615353,
        3996768171,
        991055499,
        499776247,
        1265440854,
        648242737,
        3940784050,
        980351604,
        3713745714,
        1749149687,
        3396870395,
        4211799374,
        3640570775,
        1161844396,
        3125318951,
        1431517754,
        545492359,
        4268468663,
        3499529547,
        1437099964,
        2702547544,
        3433638243,
        2581715763,
        2787789398,
        1060185593,
        1593081372,
        2418618748,
        4260947970,
        69676912,
        2159744348,
        86519011,
        2512459080,
        3838209314,
        1220612927,
        3339683548,
        133810670,
        1090789135,
        1078426020,
        1569222167,
        845107691,
        3583754449,
        4072456591,
        1091646820,
        628848692,
        1613405280,
        3757631651,
        526609435,
        236106946,
        48312990,
        2942717905,
        3402727701,
        1797494240,
        859738849,
        992217954,
        4005476642,
        2243076622,
        3870952857,
        3732016268,
        765654824,
        3490871365,
        2511836413,
        1685915746,
        3888969200,
        1414112111,
        2273134842,
        3281911079,
        4080962846,
        172450625,
        2569994100,
        980381355,
        4109958455,
        2819808352,
        2716589560,
        2568741196,
        3681446669,
        3329971472,
        1835478071,
        660984891,
        3704678404,
        4045999559,
        3422617507,
        3040415634,
        1762651403,
        1719377915,
        3470491036,
        2693910283,
        3642056355,
        3138596744,
        1364962596,
        2073328063,
        1983633131,
        926494387,
        3423689081,
        2150032023,
        4096667949,
        1749200295,
        3328846651,
        309677260,
        2016342300,
        1779581495,
        3079819751,
        111262694,
        1274766160,
        443224088,
        298511866,
        1025883608,
        3806446537,
        1145181785,
        168956806,
        3641502830,
        3584813610,
        1689216846,
        3666258015,
        3200248200,
        1692713982,
        2646376535,
        4042768518,
        1618508792,
        1610833997,
        3523052358,
        4130873264,
        2001055236,
        3610705100,
        2202168115,
        4028541809,
        2961195399,
        1006657119,
        2006996926,
        3186142756,
        1430667929,
        3210227297,
        1314452623,
        4074634658,
        4101304120,
        2273951170,
        1399257539,
        3367210612,
        3027628629,
        1190975929,
        2062231137,
        2333990788,
        2221543033,
        2438960610,
        1181637006,
        548689776,
        2362791313,
        3372408396,
        3104550113,
        3145860560,
        296247880,
        1970579870,
        3078560182,
        3769228297,
        1714227617,
        3291629107,
        3898220290,
        166772364,
        1251581989,
        493813264,
        448347421,
        195405023,
        2709975567,
        677966185,
        3703036547,
        1463355134,
        2715995803,
        1338867538,
        1343315457,
        2802222074,
        2684532164,
        233230375,
        2599980071,
        2000651841,
        3277868038,
        1638401717,
        4028070440,
        3237316320,
        6314154,
        819756386,
        300326615,
        590932579,
        1405279636,
        3267499572,
        3150704214,
        2428286686,
        3959192993,
        3461946742,
        1862657033,
        1266418056,
        963775037,
        2089974820,
        2263052895,
        1917689273,
        448879540,
        3550394620,
        3981727096,
        150775221,
        3627908307,
        1303187396,
        508620638,
        2975983352,
        2726630617,
        1817252668,
        1876281319,
        1457606340,
        908771278,
        3720792119,
        3617206836,
        2455994898,
        1729034894,
        1080033504,
        976866871,
        3556439503,
        2881648439,
        1522871579,
        1555064734,
        1336096578,
        3548522304,
        2579274686,
        3574697629,
        3205460757,
        3593280638,
        3338716283,
        3079412587,
        564236357,
        2993598910,
        1781952180,
        1464380207,
        3163844217,
        3332601554,
        1699332808,
        1393555694,
        1183702653,
        3581086237,
        1288719814,
        691649499,
        2847557200,
        2895455976,
        3193889540,
        2717570544,
        1781354906,
        1676643554,
        2592534050,
        3230253752,
        1126444790,
        2770207658,
        2633158820,
        2210423226,
        2615765581,
        2414155088,
        3127139286,
        673620729,
        2805611233,
        1269405062,
        4015350505,
        3341807571,
        4149409754,
        1057255273,
        2012875353,
        2162469141,
        2276492801,
        2601117357,
        993977747,
        3918593370,
        2654263191,
        753973209,
        36408145,
        2530585658,
        25011837,
        3520020182,
        2088578344,
        530523599,
        2918365339,
        1524020338,
        1518925132,
        3760827505,
        3759777254,
        1202760957,
        3985898139,
        3906192525,
        674977740,
        4174734889,
        2031300136,
        2019492241,
        3983892565,
        4153806404,
        3822280332,
        352677332,
        2297720250,
        60907813,
        90501309,
        3286998549,
        1016092578,
        2535922412,
        2839152426,
        457141659,
        509813237,
        4120667899,
        652014361,
        1966332200,
        2975202805,
        55981186,
        2327461051,
        676427537,
        3255491064,
        2882294119,
        3433927263,
        1307055953,
        942726286,
        933058658,
        2468411793,
        3933900994,
        4215176142,
        1361170020,
        2001714738,
        2830558078,
        3274259782,
        1222529897,
        1679025792,
        2729314320,
        3714953764,
        1770335741,
        151462246,
        3013232138,
        1682292957,
        1483529935,
        471910574,
        1539241949,
        458788160,
        3436315007,
        1807016891,
        3718408830,
        978976581,
        1043663428,
        3165965781,
        1927990952,
        4200891579,
        2372276910,
        3208408903,
        3533431907,
        1412390302,
        2931980059,
        4132332400,
        1947078029,
        3881505623,
        4168226417,
        2941484381,
        1077988104,
        1320477388,
        886195818,
        18198404,
        3786409e3,
        2509781533,
        112762804,
        3463356488,
        1866414978,
        891333506,
        18488651,
        661792760,
        1628790961,
        3885187036,
        3141171499,
        876946877,
        2693282273,
        1372485963,
        791857591,
        2686433993,
        3759982718,
        3167212022,
        3472953795,
        2716379847,
        445679433,
        3561995674,
        3504004811,
        3574258232,
        54117162,
        3331405415,
        2381918588,
        3769707343,
        4154350007,
        1140177722,
        4074052095,
        668550556,
        3214352940,
        367459370,
        261225585,
        2610173221,
        4209349473,
        3468074219,
        3265815641,
        314222801,
        3066103646,
        3808782860,
        282218597,
        3406013506,
        3773591054,
        379116347,
        1285071038,
        846784868,
        2669647154,
        3771962079,
        3550491691,
        2305946142,
        453669953,
        1268987020,
        3317592352,
        3279303384,
        3744833421,
        2610507566,
        3859509063,
        266596637,
        3847019092,
        517658769,
        3462560207,
        3443424879,
        370717030,
        4247526661,
        2224018117,
        4143653529,
        4112773975,
        2788324899,
        2477274417,
        1456262402,
        2901442914,
        1517677493,
        1846949527,
        2295493580,
        3734397586,
        2176403920,
        1280348187,
        1908823572,
        3871786941,
        846861322,
        1172426758,
        3287448474,
        3383383037,
        1655181056,
        3139813346,
        901632758,
        1897031941,
        2986607138,
        3066810236,
        3447102507,
        1393639104,
        373351379,
        950779232,
        625454576,
        3124240540,
        4148612726,
        2007998917,
        544563296,
        2244738638,
        2330496472,
        2058025392,
        1291430526,
        424198748,
        50039436,
        29584100,
        3605783033,
        2429876329,
        2791104160,
        1057563949,
        3255363231,
        3075367218,
        3463963227,
        1469046755,
        985887462
      ];
      var C_ORIG = [
        1332899944,
        1700884034,
        1701343084,
        1684370003,
        1668446532,
        1869963892
      ];
      function _encipher(lr, off, P, S) {
        var n, l = lr[off], r = lr[off + 1];
        l ^= P[0];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[2];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[4];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[6];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[8];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[10];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[12];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[14];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[16];
        lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off + 1] = l;
        return lr;
      }
      var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
      ];
      var stringFromCharCode = String.fromCharCode;
      function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i) {
          word = word << 8 | data[offp] & 255;
          offp = (offp + 1) % data.length;
        }
        return { key: word, offp };
      }
      function _key(key, P, S) {
        var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw, i;
        for (i = 0; i < plen; i++) {
          sw = _streamtoword(key, offset);
          offset = sw.offp;
          P[i] = P[i] ^ sw.key;
        }
        for (i = 0; i < plen; i += 2) {
          lr = _encipher(lr, 0, P, S);
          P[i] = lr[0];
          P[i + 1] = lr[1];
        }
        for (i = 0; i < slen; i += 2) {
          lr = _encipher(lr, 0, P, S);
          S[i] = lr[0];
          S[i + 1] = lr[1];
        }
      }
      function _ekskey(data, key, P, S) {
        var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw, i;
        for (i = 0; i < plen; i++) {
          sw = _streamtoword(key, offp);
          offp = sw.offp;
          P[i] = P[i] ^ sw.key;
        }
        offp = 0;
        for (i = 0; i < plen; i += 2) {
          sw = _streamtoword(data, offp);
          offp = sw.offp;
          lr[0] ^= sw.key;
          sw = _streamtoword(data, offp);
          offp = sw.offp;
          lr[1] ^= sw.key;
          lr = _encipher(lr, 0, P, S);
          P[i] = lr[0];
          P[i + 1] = lr[1];
        }
        for (i = 0; i < slen; i += 2) {
          sw = _streamtoword(data, offp);
          offp = sw.offp;
          lr[0] ^= sw.key;
          sw = _streamtoword(data, offp);
          offp = sw.offp;
          lr[1] ^= sw.key;
          lr = _encipher(lr, 0, P, S);
          S[i] = lr[0];
          S[i + 1] = lr[1];
        }
      }
      function _crypt2(b, salt, rounds) {
        var cdata = C_ORIG.slice(), clen = cdata.length, i, j;
        if (rounds < 4 || rounds > 31) throw new Error("bad rounds");
        if (salt.length !== BCRYPT_SALT_LEN) throw new Error("bad salt length");
        rounds = 1 << rounds >>> 0;
        var P = P_ORIG.slice(), S = S_ORIG.slice();
        _ekskey(salt, b, P, S);
        for (i = 0; i < rounds; i++) {
          _key(b, P, S);
          _key(salt, P, S);
        }
        for (i = 0; i < 64; i++) for (j = 0; j < clen >> 1; j++) _encipher(cdata, j << 1, P, S);
        var ret = [];
        for (i = 0; i < clen; i++) {
          ret.push(cdata[i] >> 24 & 255, cdata[i] >> 16 & 255, cdata[i] >> 8 & 255, cdata[i] & 255);
        }
        return ret;
      }
      function base64_encode(bytes, len) {
        var off = 0, rs = [], c1, c2;
        while (off < len) {
          c1 = bytes[off++] & 255;
          rs.push(BASE64_CODE[c1 >> 2 & 63]);
          c1 = (c1 & 3) << 4;
          if (off >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = bytes[off++] & 255;
          c1 |= c2 >> 4 & 15;
          rs.push(BASE64_CODE[c1 & 63]);
          c1 = (c2 & 15) << 2;
          if (off >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = bytes[off++] & 255;
          c1 |= c2 >> 6 & 3;
          rs.push(BASE64_CODE[c1 & 63]);
          rs.push(BASE64_CODE[c2 & 63]);
        }
        return rs.join("");
      }
      function base64_decode(s, len) {
        var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        while (off < slen - 1 && olen < len) {
          code = s.charCodeAt(off++);
          c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          code = s.charCodeAt(off++);
          c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c1 == -1 || c2 == -1) break;
          o = c1 << 2 >>> 0;
          o |= (c2 & 48) >> 4;
          rs.push(o & 255);
          if (++olen >= len || off >= slen) break;
          code = s.charCodeAt(off++);
          c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c3 == -1) break;
          o = (c2 & 15) << 4 >>> 0;
          o |= (c3 & 60) >> 2;
          rs.push(o & 255);
          if (++olen >= len || off >= slen) break;
          code = s.charCodeAt(off++);
          c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          o = (c3 & 3) << 6 >>> 0;
          o |= c4;
          rs.push(o & 255);
          ++olen;
        }
        return rs;
      }
      function stringToBytes(str) {
        var s = unescape(encodeURIComponent(String(str))), out = [];
        for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
        return out;
      }
      function hashSync(password, salt) {
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") return null;
        var minor, offset;
        if (salt.charAt(2) === "$") {
          minor = "";
          offset = 3;
        } else {
          minor = salt.charAt(2);
          if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") return null;
          offset = 4;
        }
        if (salt.charAt(offset + 2) > "$") return null;
        var rounds = parseInt(salt.substring(offset, offset + 1), 10) * 10 + parseInt(salt.substring(offset + 1, offset + 2), 10);
        var real_salt = salt.substring(offset + 3, offset + 25);
        var passwordb = stringToBytes(password + (minor >= "a" ? "\0" : ""));
        var saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        var bytes = _crypt2(passwordb, saltb, rounds);
        var res = "$2" + (minor >= "a" ? minor : "") + "$" + (rounds < 10 ? "0" : "") + rounds + "$";
        res += base64_encode(saltb, saltb.length);
        res += base64_encode(bytes, C_ORIG.length * 4 - 1);
        return res;
      }
      function compareSync(password, hash) {
        if (typeof password !== "string" || typeof hash !== "string") return false;
        if (hash.length !== 60 && hash.length !== 59) return false;
        var salt = hash.substring(0, 29);
        var out;
        try {
          out = hashSync(password, salt);
        } catch (e) {
          return false;
        }
        if (out === null) return false;
        if (out.length !== hash.length) return false;
        var diff = 0;
        for (var i = 0; i < out.length; i++) diff |= out.charCodeAt(i) ^ hash.charCodeAt(i);
        return diff === 0;
      }
      function bcryptHash(password, saltBytes, cost, minor) {
        minor = minor || "a";
        var costStr = (cost < 10 ? "0" : "") + cost;
        return hashSync(password, "$2" + minor + "$" + costStr + "$" + base64_encode(saltBytes, 16));
      }
      module.exports = { hashSync, compareSync, bcryptHash, base64_encode };
    }
  });

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/crypto-js/core.js
  var require_core = __commonJS({
    "node_modules/crypto-js/core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.CryptoJS = factory();
        }
      })(exports, function() {
        var CryptoJS2 = CryptoJS2 || function(Math2, undefined2) {
          var crypto;
          if (typeof window !== "undefined" && window.crypto) {
            crypto = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof global !== "undefined" && global.crypto) {
            crypto = global.crypto;
          }
          if (!crypto && typeof __require === "function") {
            try {
              crypto = require_crypto();
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || /* @__PURE__ */ function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = /* @__PURE__ */ function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/x64-core.js
  var require_x64_core = __commonJS({
    "node_modules/crypto-js/x64-core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          var X64Word = C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          var X64WordArray = C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/lib-typedarrays.js
  var require_lib_typedarrays = __commonJS({
    "node_modules/crypto-js/lib-typedarrays.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS2.lib.WordArray;
      });
    }
  });

  // node_modules/crypto-js/enc-utf16.js
  var require_enc_utf16 = __commonJS({
    "node_modules/crypto-js/enc-utf16.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
            /**
             * Converts a word array to a UTF-16 BE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 BE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 BE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 BE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
             * Converts a word array to a UTF-16 LE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 LE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 LE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 LE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS2.enc.Utf16;
      });
    }
  });

  // node_modules/crypto-js/enc-base64.js
  var require_enc_base64 = __commonJS({
    "node_modules/crypto-js/enc-base64.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base64 = C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64;
      });
    }
  });

  // node_modules/crypto-js/enc-base64url.js
  var require_enc_base64url = __commonJS({
    "node_modules/crypto-js/enc-base64url.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base64url = C_enc.Base64url = {
            /**
             * Converts a word array to a Base64url string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {string} The Base64url string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
             */
            stringify: function(wordArray, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64url string to a word array.
             *
             * @param {string} base64Str The Base64url string.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
             */
            parse: function(base64Str, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64url;
      });
    }
  });

  // node_modules/crypto-js/md5.js
  var require_md5 = __commonJS({
    "node_modules/crypto-js/md5.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
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
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS2.MD5;
      });
    }
  });

  // node_modules/crypto-js/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/crypto-js/sha1.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS2.SHA1;
      });
    }
  });

  // node_modules/crypto-js/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/crypto-js/sha256.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS2.SHA256;
      });
    }
  });

  // node_modules/crypto-js/sha224.js
  var require_sha224 = __commonJS({
    "node_modules/crypto-js/sha224.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS2.SHA224;
      });
    }
  });

  // node_modules/crypto-js/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/crypto-js/sha512.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;
                var Wi = W[i];
                if (i < 16) {
                  Wih = Wi.high = M[offset + i * 2] | 0;
                  Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS2.SHA512;
      });
    }
  });

  // node_modules/crypto-js/sha384.js
  var require_sha384 = __commonJS({
    "node_modules/crypto-js/sha384.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./sha512"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS2.SHA384;
      });
    }
  });

  // node_modules/crypto-js/sha3.js
  var require_sha3 = __commonJS({
    "node_modules/crypto-js/sha3.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i = 0; i < 24; i++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i = 0; i < 25; i++) {
              T[i] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
             * Configuration options.
             *
             * @property {number} outputLength
             *   The desired number of bits in the output hash.
             *   Only values permitted are: 224, 256, 384, 512.
             *   Default: 512
             */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i = 0; i < nBlockSizeLanes; i++) {
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i = 0; i < outputLengthLanes; i++) {
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              var state = clone._state = this._state.slice(0);
              for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
              }
              return clone;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS2.SHA3;
      });
    }
  });

  // node_modules/crypto-js/ripemd160.js
  var require_ripemd160 = __commonJS({
    "node_modules/crypto-js/ripemd160.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })(Math);
        return CryptoJS2.RIPEMD160;
      });
    }
  });

  // node_modules/crypto-js/hmac.js
  var require_hmac = __commonJS({
    "node_modules/crypto-js/hmac.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          var HMAC = C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac;
            }
          });
        })();
      });
    }
  });

  // node_modules/crypto-js/pbkdf2.js
  var require_pbkdf2 = __commonJS({
    "node_modules/crypto-js/pbkdf2.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hasher to use. Default: SHA256
             * @property {number} iterations The number of iterations to perform. Default: 250000
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA256,
              iterations: 25e4
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.PBKDF2.create();
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Computes the Password-Based Key Derivation Function 2.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac.update(salt).finalize(blockIndex);
                hmac.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                  intermediate = hmac.finalize(intermediate);
                  hmac.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.PBKDF2;
      });
    }
  });

  // node_modules/crypto-js/evpkdf.js
  var require_evpkdf = __commonJS({
    "node_modules/crypto-js/evpkdf.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha1", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.EvpKDF;
      });
    }
  });

  // node_modules/crypto-js/cipher-core.js
  var require_cipher_core = __commonJS({
    "node_modules/crypto-js/cipher-core.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_evpkdf());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./evpkdf"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.lib.Cipher || function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),
            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: /* @__PURE__ */ function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined2;
              } else {
                block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC2;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function(password, keySize, ivSize, salt, hasher) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              if (!hasher) {
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              } else {
                var key = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
              }
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    }
  });

  // node_modules/crypto-js/mode-cfb.js
  var require_mode_cfb = __commonJS({
    "node_modules/crypto-js/mode-cfb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CFB = function() {
          var CFB = CryptoJS2.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
          return CFB;
        }();
        return CryptoJS2.mode.CFB;
      });
    }
  });

  // node_modules/crypto-js/mode-ctr.js
  var require_mode_ctr = __commonJS({
    "node_modules/crypto-js/mode-ctr.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CTR = function() {
          var CTR = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS2.mode.CTR;
      });
    }
  });

  // node_modules/crypto-js/mode-ctr-gladman.js
  var require_mode_ctr_gladman = __commonJS({
    "node_modules/crypto-js/mode-ctr-gladman.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS2.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS2.mode.CTRGladman;
      });
    }
  });

  // node_modules/crypto-js/mode-ofb.js
  var require_mode_ofb = __commonJS({
    "node_modules/crypto-js/mode-ofb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.OFB = function() {
          var OFB = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS2.mode.OFB;
      });
    }
  });

  // node_modules/crypto-js/mode-ecb.js
  var require_mode_ecb = __commonJS({
    "node_modules/crypto-js/mode-ecb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.ECB = function() {
          var ECB = CryptoJS2.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS2.mode.ECB;
      });
    }
  });

  // node_modules/crypto-js/pad-ansix923.js
  var require_pad_ansix923 = __commonJS({
    "node_modules/crypto-js/pad-ansix923.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Ansix923;
      });
    }
  });

  // node_modules/crypto-js/pad-iso10126.js
  var require_pad_iso10126 = __commonJS({
    "node_modules/crypto-js/pad-iso10126.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS2.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS2.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Iso10126;
      });
    }
  });

  // node_modules/crypto-js/pad-iso97971.js
  var require_pad_iso97971 = __commonJS({
    "node_modules/crypto-js/pad-iso97971.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS2.lib.WordArray.create([2147483648], 1));
            CryptoJS2.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS2.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS2.pad.Iso97971;
      });
    }
  });

  // node_modules/crypto-js/pad-zeropadding.js
  var require_pad_zeropadding = __commonJS({
    "node_modules/crypto-js/pad-zeropadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            for (var i = data.sigBytes - 1; i >= 0; i--) {
              if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                data.sigBytes = i + 1;
                break;
              }
            }
          }
        };
        return CryptoJS2.pad.ZeroPadding;
      });
    }
  });

  // node_modules/crypto-js/pad-nopadding.js
  var require_pad_nopadding = __commonJS({
    "node_modules/crypto-js/pad-nopadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS2.pad.NoPadding;
      });
    }
  });

  // node_modules/crypto-js/format-hex.js
  var require_format_hex = __commonJS({
    "node_modules/crypto-js/format-hex.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex = C_enc.Hex;
          var C_format = C.format;
          var HexFormatter = C_format.Hex = {
            /**
             * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The hexadecimally encoded string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            /**
             * Converts a hexadecimally encoded ciphertext string to a cipher params object.
             *
             * @param {string} input The hexadecimally encoded string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
             */
            parse: function(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS2.format.Hex;
      });
    }
  });

  // node_modules/crypto-js/aes.js
  var require_aes = __commonJS({
    "node_modules/crypto-js/aes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
              if (i < 128) {
                d[i] = i << 1;
              } else {
                d[i] = i << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
              this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M[offset] ^ keySchedule[0];
              var s1 = M[offset + 1] ^ keySchedule[1];
              var s2 = M[offset + 2] ^ keySchedule[2];
              var s3 = M[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M[offset] = t0;
              M[offset + 1] = t1;
              M[offset + 2] = t2;
              M[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS2.AES;
      });
    }
  });

  // node_modules/crypto-js/tripledes.js
  var require_tripledes = __commonJS({
    "node_modules/crypto-js/tripledes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i = 0; i < 24; i++) {
                  subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                  subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i = 1; i < 7; i++) {
                  subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
              this._lBlock = M[offset];
              this._rBlock = M[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f = 0;
                for (var i = 0; i < 8; i++) {
                  f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M[offset] = this._lBlock;
              M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M, offset) {
              this._des1.encryptBlock(M, offset);
              this._des2.decryptBlock(M, offset);
              this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
              this._des3.decryptBlock(M, offset);
              this._des2.encryptBlock(M, offset);
              this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS2.TripleDES;
      });
    }
  });

  // node_modules/crypto-js/rc4.js
  var require_rc4 = __commonJS({
    "node_modules/crypto-js/rc4.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S = this._S = [];
              for (var i = 0; i < 256; i++) {
                S[i] = i;
              }
              for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S[i] + keyByte) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
              M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i = (i + 1) % 256;
              j = (j + S[i]) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
              keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
             * Configuration options.
             *
             * @property {number} drop The number of keystream words to drop. Default 192
             */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS2.RC4;
      });
    }
  });

  // node_modules/crypto-js/rabbit.js
  var require_rabbit = __commonJS({
    "node_modules/crypto-js/rabbit.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              for (var i = 0; i < 4; i++) {
                K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
              }
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS2.Rabbit;
      });
    }
  });

  // node_modules/crypto-js/rabbit-legacy.js
  var require_rabbit_legacy = __commonJS({
    "node_modules/crypto-js/rabbit-legacy.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS2.RabbitLegacy;
      });
    }
  });

  // node_modules/crypto-js/blowfish.js
  var require_blowfish = __commonJS({
    "node_modules/crypto-js/blowfish.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          const N = 16;
          const ORIG_P = [
            608135816,
            2242054355,
            320440878,
            57701188,
            2752067618,
            698298832,
            137296536,
            3964562569,
            1160258022,
            953160567,
            3193202383,
            887688300,
            3232508343,
            3380367581,
            1065670069,
            3041331479,
            2450970073,
            2306472731
          ];
          const ORIG_S = [
            [
              3509652390,
              2564797868,
              805139163,
              3491422135,
              3101798381,
              1780907670,
              3128725573,
              4046225305,
              614570311,
              3012652279,
              134345442,
              2240740374,
              1667834072,
              1901547113,
              2757295779,
              4103290238,
              227898511,
              1921955416,
              1904987480,
              2182433518,
              2069144605,
              3260701109,
              2620446009,
              720527379,
              3318853667,
              677414384,
              3393288472,
              3101374703,
              2390351024,
              1614419982,
              1822297739,
              2954791486,
              3608508353,
              3174124327,
              2024746970,
              1432378464,
              3864339955,
              2857741204,
              1464375394,
              1676153920,
              1439316330,
              715854006,
              3033291828,
              289532110,
              2706671279,
              2087905683,
              3018724369,
              1668267050,
              732546397,
              1947742710,
              3462151702,
              2609353502,
              2950085171,
              1814351708,
              2050118529,
              680887927,
              999245976,
              1800124847,
              3300911131,
              1713906067,
              1641548236,
              4213287313,
              1216130144,
              1575780402,
              4018429277,
              3917837745,
              3693486850,
              3949271944,
              596196993,
              3549867205,
              258830323,
              2213823033,
              772490370,
              2760122372,
              1774776394,
              2652871518,
              566650946,
              4142492826,
              1728879713,
              2882767088,
              1783734482,
              3629395816,
              2517608232,
              2874225571,
              1861159788,
              326777828,
              3124490320,
              2130389656,
              2716951837,
              967770486,
              1724537150,
              2185432712,
              2364442137,
              1164943284,
              2105845187,
              998989502,
              3765401048,
              2244026483,
              1075463327,
              1455516326,
              1322494562,
              910128902,
              469688178,
              1117454909,
              936433444,
              3490320968,
              3675253459,
              1240580251,
              122909385,
              2157517691,
              634681816,
              4142456567,
              3825094682,
              3061402683,
              2540495037,
              79693498,
              3249098678,
              1084186820,
              1583128258,
              426386531,
              1761308591,
              1047286709,
              322548459,
              995290223,
              1845252383,
              2603652396,
              3431023940,
              2942221577,
              3202600964,
              3727903485,
              1712269319,
              422464435,
              3234572375,
              1170764815,
              3523960633,
              3117677531,
              1434042557,
              442511882,
              3600875718,
              1076654713,
              1738483198,
              4213154764,
              2393238008,
              3677496056,
              1014306527,
              4251020053,
              793779912,
              2902807211,
              842905082,
              4246964064,
              1395751752,
              1040244610,
              2656851899,
              3396308128,
              445077038,
              3742853595,
              3577915638,
              679411651,
              2892444358,
              2354009459,
              1767581616,
              3150600392,
              3791627101,
              3102740896,
              284835224,
              4246832056,
              1258075500,
              768725851,
              2589189241,
              3069724005,
              3532540348,
              1274779536,
              3789419226,
              2764799539,
              1660621633,
              3471099624,
              4011903706,
              913787905,
              3497959166,
              737222580,
              2514213453,
              2928710040,
              3937242737,
              1804850592,
              3499020752,
              2949064160,
              2386320175,
              2390070455,
              2415321851,
              4061277028,
              2290661394,
              2416832540,
              1336762016,
              1754252060,
              3520065937,
              3014181293,
              791618072,
              3188594551,
              3933548030,
              2332172193,
              3852520463,
              3043980520,
              413987798,
              3465142937,
              3030929376,
              4245938359,
              2093235073,
              3534596313,
              375366246,
              2157278981,
              2479649556,
              555357303,
              3870105701,
              2008414854,
              3344188149,
              4221384143,
              3956125452,
              2067696032,
              3594591187,
              2921233993,
              2428461,
              544322398,
              577241275,
              1471733935,
              610547355,
              4027169054,
              1432588573,
              1507829418,
              2025931657,
              3646575487,
              545086370,
              48609733,
              2200306550,
              1653985193,
              298326376,
              1316178497,
              3007786442,
              2064951626,
              458293330,
              2589141269,
              3591329599,
              3164325604,
              727753846,
              2179363840,
              146436021,
              1461446943,
              4069977195,
              705550613,
              3059967265,
              3887724982,
              4281599278,
              3313849956,
              1404054877,
              2845806497,
              146425753,
              1854211946
            ],
            [
              1266315497,
              3048417604,
              3681880366,
              3289982499,
              290971e4,
              1235738493,
              2632868024,
              2414719590,
              3970600049,
              1771706367,
              1449415276,
              3266420449,
              422970021,
              1963543593,
              2690192192,
              3826793022,
              1062508698,
              1531092325,
              1804592342,
              2583117782,
              2714934279,
              4024971509,
              1294809318,
              4028980673,
              1289560198,
              2221992742,
              1669523910,
              35572830,
              157838143,
              1052438473,
              1016535060,
              1802137761,
              1753167236,
              1386275462,
              3080475397,
              2857371447,
              1040679964,
              2145300060,
              2390574316,
              1461121720,
              2956646967,
              4031777805,
              4028374788,
              33600511,
              2920084762,
              1018524850,
              629373528,
              3691585981,
              3515945977,
              2091462646,
              2486323059,
              586499841,
              988145025,
              935516892,
              3367335476,
              2599673255,
              2839830854,
              265290510,
              3972581182,
              2759138881,
              3795373465,
              1005194799,
              847297441,
              406762289,
              1314163512,
              1332590856,
              1866599683,
              4127851711,
              750260880,
              613907577,
              1450815602,
              3165620655,
              3734664991,
              3650291728,
              3012275730,
              3704569646,
              1427272223,
              778793252,
              1343938022,
              2676280711,
              2052605720,
              1946737175,
              3164576444,
              3914038668,
              3967478842,
              3682934266,
              1661551462,
              3294938066,
              4011595847,
              840292616,
              3712170807,
              616741398,
              312560963,
              711312465,
              1351876610,
              322626781,
              1910503582,
              271666773,
              2175563734,
              1594956187,
              70604529,
              3617834859,
              1007753275,
              1495573769,
              4069517037,
              2549218298,
              2663038764,
              504708206,
              2263041392,
              3941167025,
              2249088522,
              1514023603,
              1998579484,
              1312622330,
              694541497,
              2582060303,
              2151582166,
              1382467621,
              776784248,
              2618340202,
              3323268794,
              2497899128,
              2784771155,
              503983604,
              4076293799,
              907881277,
              423175695,
              432175456,
              1378068232,
              4145222326,
              3954048622,
              3938656102,
              3820766613,
              2793130115,
              2977904593,
              26017576,
              3274890735,
              3194772133,
              1700274565,
              1756076034,
              4006520079,
              3677328699,
              720338349,
              1533947780,
              354530856,
              688349552,
              3973924725,
              1637815568,
              332179504,
              3949051286,
              53804574,
              2852348879,
              3044236432,
              1282449977,
              3583942155,
              3416972820,
              4006381244,
              1617046695,
              2628476075,
              3002303598,
              1686838959,
              431878346,
              2686675385,
              1700445008,
              1080580658,
              1009431731,
              832498133,
              3223435511,
              2605976345,
              2271191193,
              2516031870,
              1648197032,
              4164389018,
              2548247927,
              300782431,
              375919233,
              238389289,
              3353747414,
              2531188641,
              2019080857,
              1475708069,
              455242339,
              2609103871,
              448939670,
              3451063019,
              1395535956,
              2413381860,
              1841049896,
              1491858159,
              885456874,
              4264095073,
              4001119347,
              1565136089,
              3898914787,
              1108368660,
              540939232,
              1173283510,
              2745871338,
              3681308437,
              4207628240,
              3343053890,
              4016749493,
              1699691293,
              1103962373,
              3625875870,
              2256883143,
              3830138730,
              1031889488,
              3479347698,
              1535977030,
              4236805024,
              3251091107,
              2132092099,
              1774941330,
              1199868427,
              1452454533,
              157007616,
              2904115357,
              342012276,
              595725824,
              1480756522,
              206960106,
              497939518,
              591360097,
              863170706,
              2375253569,
              3596610801,
              1814182875,
              2094937945,
              3421402208,
              1082520231,
              3463918190,
              2785509508,
              435703966,
              3908032597,
              1641649973,
              2842273706,
              3305899714,
              1510255612,
              2148256476,
              2655287854,
              3276092548,
              4258621189,
              236887753,
              3681803219,
              274041037,
              1734335097,
              3815195456,
              3317970021,
              1899903192,
              1026095262,
              4050517792,
              356393447,
              2410691914,
              3873677099,
              3682840055
            ],
            [
              3913112168,
              2491498743,
              4132185628,
              2489919796,
              1091903735,
              1979897079,
              3170134830,
              3567386728,
              3557303409,
              857797738,
              1136121015,
              1342202287,
              507115054,
              2535736646,
              337727348,
              3213592640,
              1301675037,
              2528481711,
              1895095763,
              1721773893,
              3216771564,
              62756741,
              2142006736,
              835421444,
              2531993523,
              1442658625,
              3659876326,
              2882144922,
              676362277,
              1392781812,
              170690266,
              3921047035,
              1759253602,
              3611846912,
              1745797284,
              664899054,
              1329594018,
              3901205900,
              3045908486,
              2062866102,
              2865634940,
              3543621612,
              3464012697,
              1080764994,
              553557557,
              3656615353,
              3996768171,
              991055499,
              499776247,
              1265440854,
              648242737,
              3940784050,
              980351604,
              3713745714,
              1749149687,
              3396870395,
              4211799374,
              3640570775,
              1161844396,
              3125318951,
              1431517754,
              545492359,
              4268468663,
              3499529547,
              1437099964,
              2702547544,
              3433638243,
              2581715763,
              2787789398,
              1060185593,
              1593081372,
              2418618748,
              4260947970,
              69676912,
              2159744348,
              86519011,
              2512459080,
              3838209314,
              1220612927,
              3339683548,
              133810670,
              1090789135,
              1078426020,
              1569222167,
              845107691,
              3583754449,
              4072456591,
              1091646820,
              628848692,
              1613405280,
              3757631651,
              526609435,
              236106946,
              48312990,
              2942717905,
              3402727701,
              1797494240,
              859738849,
              992217954,
              4005476642,
              2243076622,
              3870952857,
              3732016268,
              765654824,
              3490871365,
              2511836413,
              1685915746,
              3888969200,
              1414112111,
              2273134842,
              3281911079,
              4080962846,
              172450625,
              2569994100,
              980381355,
              4109958455,
              2819808352,
              2716589560,
              2568741196,
              3681446669,
              3329971472,
              1835478071,
              660984891,
              3704678404,
              4045999559,
              3422617507,
              3040415634,
              1762651403,
              1719377915,
              3470491036,
              2693910283,
              3642056355,
              3138596744,
              1364962596,
              2073328063,
              1983633131,
              926494387,
              3423689081,
              2150032023,
              4096667949,
              1749200295,
              3328846651,
              309677260,
              2016342300,
              1779581495,
              3079819751,
              111262694,
              1274766160,
              443224088,
              298511866,
              1025883608,
              3806446537,
              1145181785,
              168956806,
              3641502830,
              3584813610,
              1689216846,
              3666258015,
              3200248200,
              1692713982,
              2646376535,
              4042768518,
              1618508792,
              1610833997,
              3523052358,
              4130873264,
              2001055236,
              3610705100,
              2202168115,
              4028541809,
              2961195399,
              1006657119,
              2006996926,
              3186142756,
              1430667929,
              3210227297,
              1314452623,
              4074634658,
              4101304120,
              2273951170,
              1399257539,
              3367210612,
              3027628629,
              1190975929,
              2062231137,
              2333990788,
              2221543033,
              2438960610,
              1181637006,
              548689776,
              2362791313,
              3372408396,
              3104550113,
              3145860560,
              296247880,
              1970579870,
              3078560182,
              3769228297,
              1714227617,
              3291629107,
              3898220290,
              166772364,
              1251581989,
              493813264,
              448347421,
              195405023,
              2709975567,
              677966185,
              3703036547,
              1463355134,
              2715995803,
              1338867538,
              1343315457,
              2802222074,
              2684532164,
              233230375,
              2599980071,
              2000651841,
              3277868038,
              1638401717,
              4028070440,
              3237316320,
              6314154,
              819756386,
              300326615,
              590932579,
              1405279636,
              3267499572,
              3150704214,
              2428286686,
              3959192993,
              3461946742,
              1862657033,
              1266418056,
              963775037,
              2089974820,
              2263052895,
              1917689273,
              448879540,
              3550394620,
              3981727096,
              150775221,
              3627908307,
              1303187396,
              508620638,
              2975983352,
              2726630617,
              1817252668,
              1876281319,
              1457606340,
              908771278,
              3720792119,
              3617206836,
              2455994898,
              1729034894,
              1080033504
            ],
            [
              976866871,
              3556439503,
              2881648439,
              1522871579,
              1555064734,
              1336096578,
              3548522304,
              2579274686,
              3574697629,
              3205460757,
              3593280638,
              3338716283,
              3079412587,
              564236357,
              2993598910,
              1781952180,
              1464380207,
              3163844217,
              3332601554,
              1699332808,
              1393555694,
              1183702653,
              3581086237,
              1288719814,
              691649499,
              2847557200,
              2895455976,
              3193889540,
              2717570544,
              1781354906,
              1676643554,
              2592534050,
              3230253752,
              1126444790,
              2770207658,
              2633158820,
              2210423226,
              2615765581,
              2414155088,
              3127139286,
              673620729,
              2805611233,
              1269405062,
              4015350505,
              3341807571,
              4149409754,
              1057255273,
              2012875353,
              2162469141,
              2276492801,
              2601117357,
              993977747,
              3918593370,
              2654263191,
              753973209,
              36408145,
              2530585658,
              25011837,
              3520020182,
              2088578344,
              530523599,
              2918365339,
              1524020338,
              1518925132,
              3760827505,
              3759777254,
              1202760957,
              3985898139,
              3906192525,
              674977740,
              4174734889,
              2031300136,
              2019492241,
              3983892565,
              4153806404,
              3822280332,
              352677332,
              2297720250,
              60907813,
              90501309,
              3286998549,
              1016092578,
              2535922412,
              2839152426,
              457141659,
              509813237,
              4120667899,
              652014361,
              1966332200,
              2975202805,
              55981186,
              2327461051,
              676427537,
              3255491064,
              2882294119,
              3433927263,
              1307055953,
              942726286,
              933058658,
              2468411793,
              3933900994,
              4215176142,
              1361170020,
              2001714738,
              2830558078,
              3274259782,
              1222529897,
              1679025792,
              2729314320,
              3714953764,
              1770335741,
              151462246,
              3013232138,
              1682292957,
              1483529935,
              471910574,
              1539241949,
              458788160,
              3436315007,
              1807016891,
              3718408830,
              978976581,
              1043663428,
              3165965781,
              1927990952,
              4200891579,
              2372276910,
              3208408903,
              3533431907,
              1412390302,
              2931980059,
              4132332400,
              1947078029,
              3881505623,
              4168226417,
              2941484381,
              1077988104,
              1320477388,
              886195818,
              18198404,
              3786409e3,
              2509781533,
              112762804,
              3463356488,
              1866414978,
              891333506,
              18488651,
              661792760,
              1628790961,
              3885187036,
              3141171499,
              876946877,
              2693282273,
              1372485963,
              791857591,
              2686433993,
              3759982718,
              3167212022,
              3472953795,
              2716379847,
              445679433,
              3561995674,
              3504004811,
              3574258232,
              54117162,
              3331405415,
              2381918588,
              3769707343,
              4154350007,
              1140177722,
              4074052095,
              668550556,
              3214352940,
              367459370,
              261225585,
              2610173221,
              4209349473,
              3468074219,
              3265815641,
              314222801,
              3066103646,
              3808782860,
              282218597,
              3406013506,
              3773591054,
              379116347,
              1285071038,
              846784868,
              2669647154,
              3771962079,
              3550491691,
              2305946142,
              453669953,
              1268987020,
              3317592352,
              3279303384,
              3744833421,
              2610507566,
              3859509063,
              266596637,
              3847019092,
              517658769,
              3462560207,
              3443424879,
              370717030,
              4247526661,
              2224018117,
              4143653529,
              4112773975,
              2788324899,
              2477274417,
              1456262402,
              2901442914,
              1517677493,
              1846949527,
              2295493580,
              3734397586,
              2176403920,
              1280348187,
              1908823572,
              3871786941,
              846861322,
              1172426758,
              3287448474,
              3383383037,
              1655181056,
              3139813346,
              901632758,
              1897031941,
              2986607138,
              3066810236,
              3447102507,
              1393639104,
              373351379,
              950779232,
              625454576,
              3124240540,
              4148612726,
              2007998917,
              544563296,
              2244738638,
              2330496472,
              2058025392,
              1291430526,
              424198748,
              50039436,
              29584100,
              3605783033,
              2429876329,
              2791104160,
              1057563949,
              3255363231,
              3075367218,
              3463963227,
              1469046755,
              985887462
            ]
          ];
          var BLOWFISH_CTX = {
            pbox: [],
            sbox: []
          };
          function F(ctx, x) {
            let a = x >> 24 & 255;
            let b = x >> 16 & 255;
            let c = x >> 8 & 255;
            let d = x & 255;
            let y = ctx.sbox[0][a] + ctx.sbox[1][b];
            y = y ^ ctx.sbox[2][c];
            y = y + ctx.sbox[3][d];
            return y;
          }
          function BlowFish_Encrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = 0; i < N; ++i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[N];
            Xl = Xl ^ ctx.pbox[N + 1];
            return { left: Xl, right: Xr };
          }
          function BlowFish_Decrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = N + 1; i > 1; --i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[1];
            Xl = Xl ^ ctx.pbox[0];
            return { left: Xl, right: Xr };
          }
          function BlowFishInit(ctx, key, keysize) {
            for (let Row = 0; Row < 4; Row++) {
              ctx.sbox[Row] = [];
              for (let Col = 0; Col < 256; Col++) {
                ctx.sbox[Row][Col] = ORIG_S[Row][Col];
              }
            }
            let keyIndex = 0;
            for (let index = 0; index < N + 2; index++) {
              ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
              keyIndex++;
              if (keyIndex >= keysize) {
                keyIndex = 0;
              }
            }
            let Data1 = 0;
            let Data2 = 0;
            let res = 0;
            for (let i = 0; i < N + 2; i += 2) {
              res = BlowFish_Encrypt(ctx, Data1, Data2);
              Data1 = res.left;
              Data2 = res.right;
              ctx.pbox[i] = Data1;
              ctx.pbox[i + 1] = Data2;
            }
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 256; j += 2) {
                res = BlowFish_Encrypt(ctx, Data1, Data2);
                Data1 = res.left;
                Data2 = res.right;
                ctx.sbox[i][j] = Data1;
                ctx.sbox[i][j + 1] = Data2;
              }
            }
            return true;
          }
          var Blowfish = C_algo.Blowfish = BlockCipher.extend({
            _doReset: function() {
              if (this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
            },
            encryptBlock: function(M, offset) {
              var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            decryptBlock: function(M, offset) {
              var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            blockSize: 64 / 32,
            keySize: 128 / 32,
            ivSize: 64 / 32
          });
          C.Blowfish = BlockCipher._createHelper(Blowfish);
        })();
        return CryptoJS2.Blowfish;
      });
    }
  });

  // node_modules/crypto-js/index.js
  var require_crypto_js = __commonJS({
    "node_modules/crypto-js/index.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_enc_base64url(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha3(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy(), require_blowfish());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish"], factory);
        } else {
          root.CryptoJS = factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2;
      });
    }
  });

  // src/md4.js
  var require_md4 = __commonJS({
    "src/md4.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      (function(Math2) {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var S = [[3, 7, 11, 19], [3, 5, 9, 13], [3, 9, 11, 15]];
        var FF = 0;
        var GG = 1518500249;
        var HH = 1859775393;
        var MD4 = C_algo.MD4 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([1732584193, 4023233417, 2562383102, 271733878]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0], M_offset_1 = M[offset + 1], M_offset_2 = M[offset + 2], M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4], M_offset_5 = M[offset + 5], M_offset_6 = M[offset + 6], M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8], M_offset_9 = M[offset + 9], M_offset_10 = M[offset + 10], M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12], M_offset_13 = M[offset + 13], M_offset_14 = M[offset + 14], M_offset_15 = M[offset + 15];
            var a = H[0], b = H[1], c = H[2], d = H[3];
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
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function ROTL(num, cnt) {
          return num << cnt | num >>> 32 - cnt;
        }
        function CC(f, k, a, b, c, d, x, s) {
          return ROTL(a + f(b, c, d) + x + k, s);
        }
        function FFF(x, y, z) {
          return x & y | ~x & z;
        }
        function GGG(x, y, z) {
          return x & y | x & z | y & z;
        }
        function HHH(x, y, z) {
          return x ^ y ^ z;
        }
        C.MD4 = Hasher._createHelper(MD4);
        C.HmacMD4 = Hasher._createHmacHelper(MD4);
      })(Math);
      module.exports = CryptoJS2;
    }
  });

  // src/util.js
  var require_util = __commonJS({
    "src/util.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      require_md4();
      var _MASK64 = (1n << 64n) - 1n;
      function _waToBytes(wa) {
        var bytes = [];
        for (var i = 0; i < wa.sigBytes; i++) bytes.push(wa.words[i >>> 2] >>> 24 - i % 4 * 8 & 255);
        return bytes;
      }
      function _bytesToWA(bytes) {
        var words = [];
        for (var i = 0; i < bytes.length; i++) words[i >>> 2] |= (bytes[i] & 255) << 24 - i % 4 * 8;
        return CryptoJS2.lib.WordArray.create(words, bytes.length);
      }
      function _u8ToWA(u8) {
        var words = [];
        for (var i = 0; i < u8.length; i++) words[i >>> 2] |= u8[i] << 24 - i % 4 * 8;
        return CryptoJS2.lib.WordArray.create(words, u8.length);
      }
      function _hexToBytes(hex) {
        var b = [];
        for (var i = 0; i + 1 < hex.length; i += 2) b.push(parseInt(hex.substr(i, 2), 16));
        return b;
      }
      function _bytesToHex(bytes) {
        var s = "";
        for (var i = 0; i < bytes.length; i++) {
          var h = (bytes[i] & 255).toString(16);
          s += h.length < 2 ? "0" + h : h;
        }
        return s;
      }
      function _utf8Bytes(str) {
        var s = unescape(encodeURIComponent(String(str))), out = [];
        for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
        return out;
      }
      function _le32(n) {
        return [n & 255, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255];
      }
      function aesEncBlockWA(keyWA, dataWA) {
        return CryptoJS2.AES.encrypt(dataWA.clone(), keyWA, { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding }).ciphertext;
      }
      function aesDecBlockWA(keyWA, dataWA) {
        return CryptoJS2.AES.decrypt(CryptoJS2.lib.CipherParams.create({ ciphertext: dataWA.clone() }), keyWA, { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding });
      }
      module.exports = {
        CryptoJS: CryptoJS2,
        _MASK64,
        _waToBytes,
        _bytesToWA,
        _u8ToWA,
        _hexToBytes,
        _bytesToHex,
        _utf8Bytes,
        _le32,
        aesEncBlockWA,
        aesDecBlockWA
      };
    }
  });

  // src/keccak.js
  var require_keccak = __commonJS({
    "src/keccak.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      function makeKeccakVerifier2(bits) {
        return function(password, hash) {
          return CryptoJS2.SHA3(CryptoJS2.enc.Latin1.parse(String(password)), { outputLength: bits }).toString() === String(hash).toLowerCase();
        };
      }
      var _KECCAK_RC = [
        "1",
        "8082",
        "800000000000808a",
        "8000000080008000",
        "808b",
        "80000001",
        "8000000080008081",
        "8000000000008009",
        "8a",
        "88",
        "80008009",
        "8000000a",
        "8000808b",
        "800000000000008b",
        "8000000000008089",
        "8000000000008003",
        "8000000000008002",
        "8000000000000080",
        "800a",
        "800000008000000a",
        "8000000080008081",
        "8000000000008080",
        "80000001",
        "8000000080008008"
      ].map(function(h) {
        return BigInt("0x" + h);
      });
      var _KECCAK_R = [0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14];
      var _MASK64 = u._MASK64;
      function _keccakF(s) {
        function rotl(x2, n) {
          var b = BigInt(n);
          return (x2 << b | x2 >> 64n - b) & _MASK64;
        }
        for (var round = 0; round < 24; round++) {
          var C = [], x, y;
          for (x = 0; x < 5; x++) C[x] = s[x] ^ s[x + 5] ^ s[x + 10] ^ s[x + 15] ^ s[x + 20];
          var D = [];
          for (x = 0; x < 5; x++) D[x] = C[(x + 4) % 5] ^ rotl(C[(x + 1) % 5], 1);
          for (x = 0; x < 5; x++) for (y = 0; y < 25; y += 5) s[x + y] ^= D[x];
          var B = new Array(25);
          for (x = 0; x < 5; x++) for (y = 0; y < 5; y++) B[y + 5 * ((2 * x + 3 * y) % 5)] = rotl(s[x + 5 * y], _KECCAK_R[x + 5 * y]);
          for (y = 0; y < 25; y += 5) for (x = 0; x < 5; x++) s[x + y] = B[x + y] ^ ~B[(x + 1) % 5 + y] & B[(x + 2) % 5 + y] & _MASK64;
          s[0] ^= _KECCAK_RC[round];
        }
      }
      function _keccak(msgBytes, rateBytes, outBytes, padByte) {
        var s = new Array(25).fill(0n);
        var rem = msgBytes.length % rateBytes;
        var pad = new Array(rateBytes - rem).fill(0);
        pad[0] = padByte;
        pad[pad.length - 1] |= 128;
        var data = msgBytes.concat(pad), off, i, j;
        for (off = 0; off < data.length; off += rateBytes) {
          for (i = 0; i < rateBytes; i += 8) {
            var lane = 0n;
            for (j = 7; j >= 0; j--) lane = lane << 8n | BigInt(data[off + i + j] & 255);
            s[i / 8] ^= lane;
          }
          _keccakF(s);
        }
        var out = [];
        while (out.length < outBytes) {
          for (i = 0; i < rateBytes && out.length < outBytes; i += 8)
            for (j = 0; j < 8 && out.length < outBytes; j++) out.push(Number(s[i / 8] >> BigInt(8 * j) & 0xffn));
          if (out.length < outBytes) _keccakF(s);
        }
        return out;
      }
      function makeSha3Verifier2(bits) {
        return function(password, hash) {
          return u._bytesToHex(_keccak(u._utf8Bytes(password), 200 - bits / 4, bits / 8, 6)) === String(hash).toLowerCase();
        };
      }
      module.exports = { makeKeccakVerifier: makeKeccakVerifier2, makeSha3Verifier: makeSha3Verifier2, _keccak };
    }
  });

  // src/blake2b.js
  var require_blake2b = __commonJS({
    "src/blake2b.js"(exports, module) {
      var u = require_util();
      var _MASK64 = u._MASK64;
      var _B2B_IV = [
        "6a09e667f3bcc908",
        "bb67ae8584caa73b",
        "3c6ef372fe94f82b",
        "a54ff53a5f1d36f1",
        "510e527fade682d1",
        "9b05688c2b3e6c1f",
        "1f83d9abfb41bd6b",
        "5be0cd19137e2179"
      ].map(function(h) {
        return BigInt("0x" + h);
      });
      var _B2B_SIGMA = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
        [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
        [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
        [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
        [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
        [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
        [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
        [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
        [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]
      ];
      function _rotr64(x, n) {
        var b = BigInt(n);
        return (x >> b | x << 64n - b) & _MASK64;
      }
      function _blake2b(msgBytes, outLen) {
        var h = _B2B_IV.slice();
        h[0] ^= BigInt(16842752 ^ outLen);
        function compress(blk, t, last) {
          var v = h.concat(_B2B_IV), m = [], i2, j;
          v[12] ^= BigInt(t) & _MASK64;
          if (last) v[14] ^= _MASK64;
          for (i2 = 0; i2 < 16; i2++) {
            var w = 0n;
            for (j = 7; j >= 0; j--) w = w << 8n | BigInt(blk[i2 * 8 + j] & 255);
            m[i2] = w;
          }
          function G(a, b, c, d, x, y) {
            v[a] = v[a] + v[b] + x & _MASK64;
            v[d] = _rotr64(v[d] ^ v[a], 32);
            v[c] = v[c] + v[d] & _MASK64;
            v[b] = _rotr64(v[b] ^ v[c], 24);
            v[a] = v[a] + v[b] + y & _MASK64;
            v[d] = _rotr64(v[d] ^ v[a], 16);
            v[c] = v[c] + v[d] & _MASK64;
            v[b] = _rotr64(v[b] ^ v[c], 63);
          }
          for (var r = 0; r < 12; r++) {
            var g = _B2B_SIGMA[r];
            G(0, 4, 8, 12, m[g[0]], m[g[1]]);
            G(1, 5, 9, 13, m[g[2]], m[g[3]]);
            G(2, 6, 10, 14, m[g[4]], m[g[5]]);
            G(3, 7, 11, 15, m[g[6]], m[g[7]]);
            G(0, 5, 10, 15, m[g[8]], m[g[9]]);
            G(1, 6, 11, 12, m[g[10]], m[g[11]]);
            G(2, 7, 8, 13, m[g[12]], m[g[13]]);
            G(3, 4, 9, 14, m[g[14]], m[g[15]]);
          }
          for (i2 = 0; i2 < 8; i2++) h[i2] ^= v[i2] ^ v[i2 + 8];
        }
        var msg = msgBytes.slice(), counter = 0, i = 0;
        if (msg.length === 0) {
          compress(new Array(128).fill(0), 0, true);
        } else {
          while (msg.length - i > 128) {
            counter += 128;
            compress(msg.slice(i, i + 128), counter, false);
            i += 128;
          }
          var lastBlk = msg.slice(i);
          counter += lastBlk.length;
          while (lastBlk.length < 128) lastBlk.push(0);
          compress(lastBlk, counter, true);
        }
        var out = [];
        for (var k = 0; k < outLen; k++) out.push(Number(h[k >> 3] >> BigInt(8 * (k & 7)) & 0xffn));
        return out;
      }
      function verifyBlake2b5122(password, hash) {
        var m = /^\$BLAKE2\$([a-fA-F0-9]{128})$/.exec(String(hash));
        if (!m) return false;
        return u._bytesToHex(_blake2b(u._utf8Bytes(password), 64)) === m[1].toLowerCase();
      }
      function makeBlake2bVerifier2(outLen, order) {
        return function(password, hash) {
          var m = /^\$BLAKE2\$([a-fA-F0-9]+)(?::(.+))?$/.exec(String(hash));
          if (!m) return false;
          if (m[1].length !== outLen * 2) return false;
          var salt = m[2] || "", msg = order === "sp" ? salt + String(password) : String(password) + salt;
          return u._bytesToHex(_blake2b(u._utf8Bytes(msg), outLen)) === m[1].toLowerCase();
        };
      }
      module.exports = { _blake2b, verifyBlake2b512: verifyBlake2b5122, makeBlake2bVerifier: makeBlake2bVerifier2 };
    }
  });

  // src/scrypt.js
  var require_scrypt = __commonJS({
    "src/scrypt.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      function _salsaR(a, c) {
        a = a >>> 0;
        return (a << c | a >>> 32 - c) >>> 0;
      }
      function _salsa20_8(B) {
        var x = new Uint32Array(B), i;
        for (i = 0; i < 8; i += 2) {
          x[4] ^= _salsaR(x[0] + x[12], 7);
          x[8] ^= _salsaR(x[4] + x[0], 9);
          x[12] ^= _salsaR(x[8] + x[4], 13);
          x[0] ^= _salsaR(x[12] + x[8], 18);
          x[9] ^= _salsaR(x[5] + x[1], 7);
          x[13] ^= _salsaR(x[9] + x[5], 9);
          x[1] ^= _salsaR(x[13] + x[9], 13);
          x[5] ^= _salsaR(x[1] + x[13], 18);
          x[14] ^= _salsaR(x[10] + x[6], 7);
          x[2] ^= _salsaR(x[14] + x[10], 9);
          x[6] ^= _salsaR(x[2] + x[14], 13);
          x[10] ^= _salsaR(x[6] + x[2], 18);
          x[3] ^= _salsaR(x[15] + x[11], 7);
          x[7] ^= _salsaR(x[3] + x[15], 9);
          x[11] ^= _salsaR(x[7] + x[3], 13);
          x[15] ^= _salsaR(x[11] + x[7], 18);
          x[1] ^= _salsaR(x[0] + x[3], 7);
          x[2] ^= _salsaR(x[1] + x[0], 9);
          x[3] ^= _salsaR(x[2] + x[1], 13);
          x[0] ^= _salsaR(x[3] + x[2], 18);
          x[6] ^= _salsaR(x[5] + x[4], 7);
          x[7] ^= _salsaR(x[6] + x[5], 9);
          x[4] ^= _salsaR(x[7] + x[6], 13);
          x[5] ^= _salsaR(x[4] + x[7], 18);
          x[11] ^= _salsaR(x[10] + x[9], 7);
          x[8] ^= _salsaR(x[11] + x[10], 9);
          x[9] ^= _salsaR(x[8] + x[11], 13);
          x[10] ^= _salsaR(x[9] + x[8], 18);
          x[12] ^= _salsaR(x[15] + x[14], 7);
          x[13] ^= _salsaR(x[12] + x[15], 9);
          x[14] ^= _salsaR(x[13] + x[12], 13);
          x[15] ^= _salsaR(x[14] + x[13], 18);
        }
        for (i = 0; i < 16; i++) B[i] = B[i] + x[i] >>> 0;
      }
      function _blockMix(B, r) {
        var X = new Uint32Array(B.subarray(32 * r - 16, 32 * r)), Y = new Uint32Array(32 * r), i, j;
        for (i = 0; i < 2 * r; i++) {
          for (j = 0; j < 16; j++) X[j] ^= B[i * 16 + j];
          _salsa20_8(X);
          var dest = i % 2 === 0 ? i / 2 : r + (i - 1) / 2;
          Y.set(X, dest * 16);
        }
        return Y;
      }
      function _roMix(B, N, r) {
        var X = new Uint32Array(B), V = new Array(N), i, k;
        for (i = 0; i < N; i++) {
          V[i] = new Uint32Array(X);
          X = _blockMix(X, r);
        }
        for (i = 0; i < N; i++) {
          var j = X[(2 * r - 1) * 16] & N - 1, Vj = V[j], T = new Uint32Array(32 * r);
          for (k = 0; k < T.length; k++) T[k] = X[k] ^ Vj[k];
          X = _blockMix(T, r);
        }
        return X;
      }
      function _pbkdf2Sha256Bytes(passBytes, saltBytes, iter, dkLen) {
        var wa = CryptoJS2.PBKDF2(u._bytesToWA(passBytes), u._bytesToWA(saltBytes), { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher: CryptoJS2.algo.SHA256 });
        return u._waToBytes(wa).slice(0, dkLen);
      }
      function _bytesToWords32LE(bytes) {
        var w = new Uint32Array(bytes.length / 4);
        for (var i = 0; i < w.length; i++) w[i] = (bytes[i * 4] | bytes[i * 4 + 1] << 8 | bytes[i * 4 + 2] << 16 | bytes[i * 4 + 3] << 24) >>> 0;
        return w;
      }
      function _words32LEToBytes(words) {
        var b = new Array(words.length * 4);
        for (var i = 0; i < words.length; i++) {
          b[i * 4] = words[i] & 255;
          b[i * 4 + 1] = words[i] >>> 8 & 255;
          b[i * 4 + 2] = words[i] >>> 16 & 255;
          b[i * 4 + 3] = words[i] >>> 24 & 255;
        }
        return b;
      }
      function _scrypt(passBytes, saltBytes, N, r, p, dkLen) {
        var B = _pbkdf2Sha256Bytes(passBytes, saltBytes, 1, p * 128 * r);
        for (var i = 0; i < p; i++) {
          var mixed = _words32LEToBytes(_roMix(_bytesToWords32LE(B.slice(i * 128 * r, (i + 1) * 128 * r)), N, r));
          for (var k = 0; k < mixed.length; k++) B[i * 128 * r + k] = mixed[k];
        }
        return _pbkdf2Sha256Bytes(passBytes, B, 1, dkLen);
      }
      function verifyScrypt2(password, hash) {
        var m = /^SCRYPT:(\d+):(\d+):(\d+):([^:]+):([^:]+)$/.exec(String(hash));
        if (!m) return false;
        var N = parseInt(m[1], 10), r = parseInt(m[2], 10), p = parseInt(m[3], 10);
        if ((N & N - 1) !== 0 || N < 2) return false;
        var saltBytes, wantBytes;
        try {
          saltBytes = u._waToBytes(CryptoJS2.enc.Base64.parse(m[4]));
          wantBytes = u._waToBytes(CryptoJS2.enc.Base64.parse(m[5]));
        } catch (e) {
          return false;
        }
        if (wantBytes.length < 1) return false;
        return u._bytesToHex(_scrypt(u._utf8Bytes(password), saltBytes, N, r, p, wantBytes.length)) === u._bytesToHex(wantBytes);
      }
      module.exports = { verifyScrypt: verifyScrypt2, _scrypt };
    }
  });

  // src/argon2.js
  var require_argon2 = __commonJS({
    "src/argon2.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _blake2b = require_blake2b()._blake2b;
      var _ARG_ROW = [];
      var _ARG_COL = [];
      (function() {
        for (var i = 0; i < 8; i++) {
          var row = [], col = [];
          for (var j = 0; j < 16; j++) row.push(i * 16 + j);
          for (j = 0; j < 8; j++) {
            col.push(16 * j + 2 * i);
            col.push(16 * j + 2 * i + 1);
          }
          _ARG_ROW.push(row);
          _ARG_COL.push(col);
        }
      })();
      function _blamka(Z, ai, bi) {
        var alo = Z[2 * ai], ahi = Z[2 * ai + 1], blo = Z[2 * bi], bhi = Z[2 * bi + 1];
        var aL = alo & 65535, aH = alo >>> 16, bL = blo & 65535, bH = blo >>> 16;
        var ll = aL * bL, lh = aL * bH, hl = aH * bL, hh = aH * bH;
        var cross = (ll >>> 16) + (lh & 65535) + (hl & 65535);
        var mlo = ((cross & 65535) << 16 | ll & 65535) >>> 0;
        var mhi = hh + (lh >>> 16) + (hl >>> 16) + (cross >>> 16) >>> 0;
        var p2lo = mlo << 1 >>> 0, p2hi = (mhi << 1 | mlo >>> 31) >>> 0;
        var s = alo + blo, rlo = s >>> 0, rhi = ahi + bhi + (s >= 4294967296 ? 1 : 0) >>> 0;
        s = rlo + p2lo;
        Z[2 * ai] = s >>> 0;
        Z[2 * ai + 1] = rhi + p2hi + (s >= 4294967296 ? 1 : 0) >>> 0;
      }
      function _xorRotr(Z, di, ai, n) {
        var xlo = (Z[2 * di] ^ Z[2 * ai]) >>> 0, xhi = (Z[2 * di + 1] ^ Z[2 * ai + 1]) >>> 0, nlo, nhi, s;
        if (n === 32) {
          nlo = xhi;
          nhi = xlo;
        } else if (n < 32) {
          nlo = (xlo >>> n | xhi << 32 - n) >>> 0;
          nhi = (xhi >>> n | xlo << 32 - n) >>> 0;
        } else {
          s = n - 32;
          nlo = (xhi >>> s | xlo << 32 - s) >>> 0;
          nhi = (xlo >>> s | xhi << 32 - s) >>> 0;
        }
        Z[2 * di] = nlo;
        Z[2 * di + 1] = nhi;
      }
      function _argon2Permute(Z, idx) {
        function GB(a, b, c, d) {
          _blamka(Z, idx[a], idx[b]);
          _xorRotr(Z, idx[d], idx[a], 32);
          _blamka(Z, idx[c], idx[d]);
          _xorRotr(Z, idx[b], idx[c], 24);
          _blamka(Z, idx[a], idx[b]);
          _xorRotr(Z, idx[d], idx[a], 16);
          _blamka(Z, idx[c], idx[d]);
          _xorRotr(Z, idx[b], idx[c], 63);
        }
        GB(0, 4, 8, 12);
        GB(1, 5, 9, 13);
        GB(2, 6, 10, 14);
        GB(3, 7, 11, 15);
        GB(0, 5, 10, 15);
        GB(1, 6, 11, 12);
        GB(2, 7, 8, 13);
        GB(3, 4, 9, 14);
      }
      var _ARG_R = new Uint32Array(256);
      var _ARG_Z = new Uint32Array(256);
      function _argon2Compress(X, Y) {
        var i;
        for (i = 0; i < 256; i++) {
          _ARG_R[i] = X[i] ^ Y[i];
          _ARG_Z[i] = _ARG_R[i];
        }
        for (i = 0; i < 8; i++) _argon2Permute(_ARG_Z, _ARG_ROW[i]);
        for (i = 0; i < 8; i++) _argon2Permute(_ARG_Z, _ARG_COL[i]);
        for (i = 0; i < 256; i++) _ARG_Z[i] = (_ARG_Z[i] ^ _ARG_R[i]) >>> 0;
        return _ARG_Z;
      }
      function _le32(n) {
        return [n & 255, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255];
      }
      function _blake2bLong(outLen, input) {
        if (outLen <= 64) return _blake2b(_le32(outLen).concat(input), outLen);
        var out = [], V = _blake2b(_le32(outLen).concat(input), 64);
        out = out.concat(V.slice(0, 32));
        while (outLen - out.length > 64) {
          V = _blake2b(V, 64);
          out = out.concat(V.slice(0, 32));
        }
        return out.concat(_blake2b(V, outLen - out.length));
      }
      function _blockToBytes(block) {
        var b = new Array(1024);
        for (var i = 0; i < 256; i++) {
          b[i * 4] = block[i] & 255;
          b[i * 4 + 1] = block[i] >>> 8 & 255;
          b[i * 4 + 2] = block[i] >>> 16 & 255;
          b[i * 4 + 3] = block[i] >>> 24 & 255;
        }
        return b;
      }
      function _storeBlockBytes(mem, blk, bytes) {
        var base = blk * 256;
        for (var i = 0; i < 256; i++) mem[base + i] = (bytes[i * 4] | bytes[i * 4 + 1] << 8 | bytes[i * 4 + 2] << 16 | bytes[i * 4 + 3] << 24) >>> 0;
      }
      function _argon2(passBytes, saltBytes, type, version, m, t, p, tagLen) {
        var mp = Math.floor(m / (4 * p)) * 4 * p, lanes = p, laneLen = mp / p, segLen = laneLen / 4;
        var mem = new Uint32Array(mp * 256), i, j, k;
        var h0 = _blake2b(_le32(p).concat(_le32(tagLen)).concat(_le32(m)).concat(_le32(t)).concat(_le32(version)).concat(_le32(type)).concat(_le32(passBytes.length)).concat(passBytes).concat(_le32(saltBytes.length)).concat(saltBytes).concat(_le32(0)).concat(_le32(0)), 64);
        for (i = 0; i < lanes; i++) {
          _storeBlockBytes(mem, i * laneLen, _blake2bLong(1024, h0.concat(_le32(0)).concat(_le32(i))));
          _storeBlockBytes(mem, i * laneLen + 1, _blake2bLong(1024, h0.concat(_le32(1)).concat(_le32(i))));
        }
        var zero = new Uint32Array(256), inputBlk = new Uint32Array(256), addr = new Uint32Array(256);
        for (var pass = 0; pass < t; pass++) {
          for (var slice = 0; slice < 4; slice++) {
            for (var lane = 0; lane < lanes; lane++) {
              var dataIndep = type === 1 || type === 2 && pass === 0 && slice < 2;
              var addrCounter = 0;
              if (dataIndep) {
                for (k = 0; k < 256; k++) inputBlk[k] = 0;
                inputBlk[0] = pass;
                inputBlk[2] = lane;
                inputBlk[4] = slice;
                inputBlk[6] = mp;
                inputBlk[8] = t;
                inputBlk[10] = type;
              }
              var startIdx = pass === 0 && slice === 0 ? 2 : 0;
              for (i = startIdx; i < segLen; i++) {
                if (dataIndep && (i % 128 === 0 || i === startIdx)) {
                  addrCounter++;
                  inputBlk[12] = addrCounter;
                  var t1 = Uint32Array.from(_argon2Compress(zero, inputBlk));
                  addr.set(_argon2Compress(zero, t1));
                }
                var col = slice * segLen + i;
                var prevCol = col === 0 ? laneLen - 1 : col - 1;
                var prevIdx = lane * laneLen + prevCol, J1, J2;
                if (dataIndep) {
                  var c = i % 128;
                  J1 = addr[2 * c] >>> 0;
                  J2 = addr[2 * c + 1] >>> 0;
                } else {
                  J1 = mem[prevIdx * 256] >>> 0;
                  J2 = mem[prevIdx * 256 + 1] >>> 0;
                }
                var refLane = pass === 0 && slice === 0 ? lane : J2 % lanes;
                var refArea;
                if (pass === 0) {
                  if (slice === 0) refArea = i - 1;
                  else refArea = refLane === lane ? slice * segLen + i - 1 : slice * segLen - (i === 0 ? 1 : 0);
                } else refArea = refLane === lane ? laneLen - segLen + i - 1 : laneLen - segLen - (i === 0 ? 1 : 0);
                var pll = (J1 & 65535) * (J1 & 65535), plh = (J1 & 65535) * (J1 >>> 16), phh = (J1 >>> 16) * (J1 >>> 16);
                var pcross = (pll >>> 16) + (plh & 65535) + (plh & 65535);
                var relHi = phh + (plh >>> 16) + (plh >>> 16) + (pcross >>> 16) >>> 0;
                var qll = (refArea & 65535) * (relHi & 65535), qlh = (refArea & 65535) * (relHi >>> 16), qhl = (refArea >>> 16) * (relHi & 65535), qhh = (refArea >>> 16) * (relHi >>> 16);
                var qcross = (qll >>> 16) + (qlh & 65535) + (qhl & 65535);
                var prod = qhh + (qlh >>> 16) + (qhl >>> 16) + (qcross >>> 16) >>> 0;
                var relPos = refArea - 1 - prod;
                var startPos = pass !== 0 && slice !== 3 ? (slice + 1) * segLen : 0;
                var refIndex = (startPos + relPos) % laneLen;
                var refBlk = refLane * laneLen + refIndex, cur = lane * laneLen + col;
                var nb = _argon2Compress(mem.subarray(prevIdx * 256, prevIdx * 256 + 256), mem.subarray(refBlk * 256, refBlk * 256 + 256));
                if (pass === 0) mem.set(nb, cur * 256);
                else for (k = 0; k < 256; k++) mem[cur * 256 + k] ^= nb[k];
              }
            }
          }
        }
        var C = new Uint32Array(mem.subarray((laneLen - 1) * 256, (laneLen - 1) * 256 + 256));
        for (i = 1; i < lanes; i++) {
          var off = (i * laneLen + laneLen - 1) * 256;
          for (k = 0; k < 256; k++) C[k] ^= mem[off + k];
        }
        return _blake2bLong(tagLen, _blockToBytes(C));
      }
      function _b64decode(str) {
        var s = str;
        while (s.length % 4 !== 0) s += "=";
        return u._waToBytes(CryptoJS2.enc.Base64.parse(s));
      }
      function verifyArgon22(password, hash) {
        var m = /^\$(argon2d|argon2i|argon2id)\$v=(\d+)\$m=(\d+),t=(\d+),p=(\d+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/.exec(String(hash));
        if (!m) return false;
        var type = m[1] === "argon2d" ? 0 : m[1] === "argon2i" ? 1 : 2;
        var salt, want;
        try {
          salt = _b64decode(m[6]);
          want = _b64decode(m[7]);
        } catch (e) {
          return false;
        }
        if (want.length < 4) return false;
        var dk = _argon2(u._utf8Bytes(password), salt, type, parseInt(m[2], 10), parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10), want.length);
        return u._bytesToHex(dk) === u._bytesToHex(want);
      }
      module.exports = { verifyArgon2: verifyArgon22 };
    }
  });

  // src/gcm.js
  var require_gcm = __commonJS({
    "src/gcm.js"(exports, module) {
      var u = require_util();
      function _aesEnc(keyWA, blockBytes) {
        return u._waToBytes(u.aesEncBlockWA(keyWA, u._bytesToWA(blockBytes)));
      }
      function _gfMul(X, Y) {
        var Z = new Array(16).fill(0), V = Y.slice(), i, j;
        for (i = 0; i < 128; i++) {
          if (X[i >> 3] >> 7 - (i & 7) & 1) for (j = 0; j < 16; j++) Z[j] ^= V[j];
          var lsb = V[15] & 1;
          for (j = 15; j > 0; j--) V[j] = (V[j] >> 1 | (V[j - 1] & 1) << 7) & 255;
          V[0] = V[0] >> 1 & 255;
          if (lsb) V[0] ^= 225;
        }
        return Z;
      }
      function _ghash(H, data) {
        var Y = new Array(16).fill(0);
        for (var off = 0; off < data.length; off += 16) {
          for (var i = 0; i < 16; i++) Y[i] ^= data[off + i];
          Y = _gfMul(Y, H);
        }
        return Y;
      }
      function _len64(nBits) {
        var b = new Array(8).fill(0);
        for (var i = 0; i < 8; i++) b[7 - i] = Math.floor(nBits / Math.pow(2, 8 * i)) & 255;
        return b;
      }
      function _gcmTagOk2(keyBytes, ivBytes, ctWithTag) {
        var keyWA = u._bytesToWA(keyBytes);
        var H = _aesEnc(keyWA, new Array(16).fill(0)), J0, i;
        if (ivBytes.length === 12) {
          J0 = ivBytes.concat([0, 0, 0, 1]);
        } else {
          var ivPad = ivBytes.slice();
          while (ivPad.length % 16 !== 0) ivPad.push(0);
          J0 = _ghash(H, ivPad.concat(new Array(8).fill(0)).concat(_len64(ivBytes.length * 8)));
        }
        var ct = ctWithTag.slice(0, ctWithTag.length - 16), tag = ctWithTag.slice(ctWithTag.length - 16);
        var ctPad = ct.slice();
        while (ctPad.length % 16 !== 0) ctPad.push(0);
        var S = _ghash(H, ctPad.concat(_len64(0)).concat(_len64(ct.length * 8)));
        var EJ0 = _aesEnc(keyWA, J0);
        for (i = 0; i < 16; i++) if ((S[i] ^ EJ0[i]) !== tag[i]) return false;
        return true;
      }
      function _gcmInc32(block) {
        for (var i = 15; i >= 12; i--) {
          block[i] = block[i] + 1 & 255;
          if (block[i] !== 0) break;
        }
      }
      function _gcmJ0(H, ivBytes) {
        if (ivBytes.length === 12) return ivBytes.concat([0, 0, 0, 1]);
        var ivPad = ivBytes.slice();
        while (ivPad.length % 16 !== 0) ivPad.push(0);
        return _ghash(H, ivPad.concat(new Array(8).fill(0)).concat(_len64(ivBytes.length * 8)));
      }
      function _gcmDecrypt(keyBytes, ivBytes, ct) {
        var keyWA = u._bytesToWA(keyBytes);
        var H = _aesEnc(keyWA, new Array(16).fill(0));
        var ctr = _gcmJ0(H, ivBytes).slice(), out = [];
        for (var off = 0; off < ct.length; off += 16) {
          _gcmInc32(ctr);
          var ks = _aesEnc(keyWA, ctr);
          for (var j = 0; j < 16 && off + j < ct.length; j++) out.push(ct[off + j] ^ ks[j]);
        }
        return out;
      }
      function _gcmEncrypt(keyBytes, ivBytes, plaintext) {
        var keyWA = u._bytesToWA(keyBytes);
        var H = _aesEnc(keyWA, new Array(16).fill(0));
        var J0 = _gcmJ0(H, ivBytes), ctr = J0.slice(), ct = [], off, j, i;
        for (off = 0; off < plaintext.length; off += 16) {
          _gcmInc32(ctr);
          var ks = _aesEnc(keyWA, ctr);
          for (j = 0; j < 16 && off + j < plaintext.length; j++) ct.push(plaintext[off + j] ^ ks[j]);
        }
        var ctPad = ct.slice();
        while (ctPad.length % 16 !== 0) ctPad.push(0);
        var S = _ghash(H, ctPad.concat(_len64(0)).concat(_len64(ct.length * 8))), EJ0 = _aesEnc(keyWA, J0), tag = [];
        for (i = 0; i < 16; i++) tag.push(S[i] ^ EJ0[i]);
        return { ct, tag };
      }
      module.exports = { _gcmTagOk: _gcmTagOk2, _gcmDecrypt, _gcmEncrypt };
    }
  });

  // src/secp256k1.js
  var require_secp256k1 = __commonJS({
    "src/secp256k1.js"(exports, module) {
      var _P = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
      var _N = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
      var _G = [
        BigInt("0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"),
        BigInt("0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8")
      ];
      function _pmod(a) {
        var r = a % _P;
        return r >= 0n ? r : r + _P;
      }
      function _modInv(a) {
        var lm = 1n, hm = 0n, low = _pmod(a), high = _P;
        while (low > 1n) {
          var r = high / low, nm = hm - lm * r, nw = high - low * r;
          hm = lm;
          lm = nm;
          high = low;
          low = nw;
        }
        return _pmod(lm);
      }
      function _ecAdd(P, Q) {
        if (P === null) return Q;
        if (Q === null) return P;
        var x1 = P[0], y1 = P[1], x2 = Q[0], y2 = Q[1], s;
        if (x1 === x2) {
          if (_pmod(y1 + y2) === 0n) return null;
          s = _pmod(3n * x1 * x1 % _P * _modInv(2n * y1));
        } else {
          s = _pmod((y2 - y1) * _modInv(x2 - x1));
        }
        var x3 = _pmod(s * s - x1 - x2);
        return [x3, _pmod(s * (x1 - x3) - y1)];
      }
      function _ecMul(k) {
        var R = null, Q = _G;
        while (k > 0n) {
          if (k & 1n) R = _ecAdd(R, Q);
          Q = _ecAdd(Q, Q);
          k >>= 1n;
        }
        return R;
      }
      function _bigTo32(n) {
        var o = new Array(32);
        for (var i = 31; i >= 0; i--) {
          o[i] = Number(n & 0xffn);
          n >>= 8n;
        }
        return o;
      }
      function _secpPubKey2(privBytes, compressed) {
        var k = 0n;
        for (var i = 0; i < privBytes.length; i++) k = k << 8n | BigInt(privBytes[i] & 255);
        if (k <= 0n || k >= _N) throw new Error("priv range");
        var Pt = _ecMul(k);
        if (Pt === null) throw new Error("inf");
        var xb = _bigTo32(Pt[0]);
        return compressed ? [(Pt[1] & 1n) === 0n ? 2 : 3].concat(xb) : [4].concat(xb).concat(_bigTo32(Pt[1]));
      }
      function _powmod(b, e) {
        var r = 1n;
        b = _pmod(b);
        while (e > 0n) {
          if (e & 1n) r = r * b % _P;
          b = b * b % _P;
          e >>= 1n;
        }
        return r;
      }
      function _ecMulPoint(k, P) {
        var R = null, Q = P;
        while (k > 0n) {
          if (k & 1n) R = _ecAdd(R, Q);
          Q = _ecAdd(Q, Q);
          k >>= 1n;
        }
        return R;
      }
      function _decompress(prefix, x) {
        var y = _powmod(x * x % _P * x + 7n, (_P + 1n) / 4n);
        if ((y & 1n) !== BigInt(prefix & 1)) y = _P - y;
        return [x, y];
      }
      function _secpSharedCompressed(scalarBytes, ephemeralBytes) {
        var m = 0n, i;
        for (i = 0; i < scalarBytes.length; i++) m = m << 8n | BigInt(scalarBytes[i] & 255);
        var x = 0n;
        for (i = 1; i < ephemeralBytes.length; i++) x = x << 8n | BigInt(ephemeralBytes[i] & 255);
        var R = _ecMulPoint(m, _decompress(ephemeralBytes[0], x));
        if (R === null) return null;
        return [(R[1] & 1n) === 0n ? 2 : 3].concat(_bigTo32(R[0]));
      }
      module.exports = { _secpPubKey: _secpPubKey2, _secpSharedCompressed };
    }
  });

  // src/base58.js
  var require_base58 = __commonJS({
    "src/base58.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      function _base58encode(bytes) {
        var digits = [0], i, j;
        for (i = 0; i < bytes.length; i++) {
          var carry = bytes[i] & 255;
          for (j = 0; j < digits.length; j++) {
            carry += digits[j] << 8;
            digits[j] = carry % 58;
            carry = carry / 58 | 0;
          }
          while (carry > 0) {
            digits.push(carry % 58);
            carry = carry / 58 | 0;
          }
        }
        var str = "";
        for (i = 0; i < bytes.length && bytes[i] === 0; i++) str += "1";
        for (j = digits.length - 1; j >= 0; j--) str += _B58[digits[j]];
        return str;
      }
      function _base58decode(str) {
        var bytes = [0], i, j;
        for (i = 0; i < str.length; i++) {
          var val = _B58.indexOf(str[i]);
          if (val < 0) throw new Error("base58");
          var carry = val;
          for (j = 0; j < bytes.length; j++) {
            carry += bytes[j] * 58;
            bytes[j] = carry & 255;
            carry >>= 8;
          }
          while (carry > 0) {
            bytes.push(carry & 255);
            carry >>= 8;
          }
        }
        for (i = 0; i < str.length && str[i] === "1"; i++) bytes.push(0);
        return bytes.reverse();
      }
      function _sha256d(bytes) {
        return u._waToBytes(CryptoJS2.SHA256(CryptoJS2.SHA256(u._bytesToWA(bytes))));
      }
      function _base58check2(payload) {
        return _base58encode(payload.concat(_sha256d(payload).slice(0, 4)));
      }
      function _base58checkDecode2(str) {
        var full = _base58decode(str);
        if (full.length < 5) throw new Error("short");
        var payload = full.slice(0, full.length - 4), chk = _sha256d(payload).slice(0, 4);
        for (var i = 0; i < 4; i++) if (chk[i] !== full[full.length - 4 + i]) throw new Error("checksum");
        return payload;
      }
      var _BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
      function _bech32Polymod(values) {
        var GEN = [996825010, 642813549, 513874426, 1027748829, 705979059], chk = 1;
        for (var p = 0; p < values.length; p++) {
          var top = chk >>> 25;
          chk = (chk & 33554431) << 5 ^ values[p];
          for (var i = 0; i < 5; i++) if (top >>> i & 1) chk ^= GEN[i];
        }
        return chk >>> 0;
      }
      function _convertBits(data, from, to, pad) {
        var acc = 0, bits = 0, ret = [], maxv = (1 << to) - 1;
        for (var i = 0; i < data.length; i++) {
          acc = (acc << from | data[i] & 255) >>> 0;
          bits += from;
          while (bits >= to) {
            bits -= to;
            ret.push(acc >>> bits & maxv);
          }
        }
        if (pad && bits > 0) ret.push(acc << to - bits & maxv);
        return ret;
      }
      function _bech32Segwit2(hrp, witver, program) {
        var data = [witver].concat(_convertBits(program, 8, 5, true)), i;
        var values = [];
        for (i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) >> 5);
        values.push(0);
        for (i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) & 31);
        values = values.concat(data).concat([0, 0, 0, 0, 0, 0]);
        var polymod = _bech32Polymod(values) ^ 1, chk = [];
        for (i = 0; i < 6; i++) chk.push(polymod >>> 5 * (5 - i) & 31);
        var combined = data.concat(chk), str = hrp + "1";
        for (i = 0; i < combined.length; i++) str += _BECH32[combined[i]];
        return str;
      }
      module.exports = { _base58check: _base58check2, _base58checkDecode: _base58checkDecode2, _bech32Segwit: _bech32Segwit2 };
    }
  });

  // src/kerberos.js
  var require_kerberos = __commonJS({
    "src/kerberos.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToWA = u._bytesToWA;
      var _hexToBytes = u._hexToBytes;
      var _bytesToHex = u._bytesToHex;
      var aesEncBlockWA = u.aesEncBlockWA;
      var aesDecBlockWA = u.aesDecBlockWA;
      function _hmacMd5Bytes(dataBytes, keyBytes) {
        return _waToBytes(CryptoJS2.HmacMD5(_bytesToWA(dataBytes), _bytesToWA(keyBytes)));
      }
      function _rc4(keyBytes, dataBytes) {
        var s = [];
        for (var i = 0; i < 256; i++) s[i] = i;
        var j = 0;
        for (i = 0; i < 256; i++) {
          j = j + s[i] + keyBytes[i % keyBytes.length] & 255;
          var t = s[i];
          s[i] = s[j];
          s[j] = t;
        }
        var out = [], x = 0;
        j = 0;
        for (var k = 0; k < dataBytes.length; k++) {
          x = x + 1 & 255;
          j = j + s[x] & 255;
          var t2 = s[x];
          s[x] = s[j];
          s[j] = t2;
          out.push(dataBytes[k] ^ s[s[x] + s[j] & 255]);
        }
        return out;
      }
      function _krb23Decrypt(password, msgType, checksumHex, edataHex) {
        var k = _waToBytes(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(password))));
        var k1 = _hmacMd5Bytes([msgType, 0, 0, 0], k);
        var k3 = _hmacMd5Bytes(_hexToBytes(checksumHex), k1);
        return _rc4(k3, _hexToBytes(edataHex));
      }
      function krb23Encrypt(password, msgType, plaintextBytes) {
        var k = _waToBytes(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(password))));
        var k1 = _hmacMd5Bytes([msgType, 0, 0, 0], k);
        var checksum = _hmacMd5Bytes(plaintextBytes, k1);
        var k3 = _hmacMd5Bytes(checksum, k1);
        return { edataHex: _bytesToHex(_rc4(k3, plaintextBytes)), checksumHex: _bytesToHex(checksum) };
      }
      function verifyKrb5pa232(password, hash) {
        var m = /^\$krb5pa\$23\$[^$]*\$[^$]*\$[^$]*\$([0-9a-fA-F]{104,})$/.exec(String(hash));
        if (!m) return false;
        var field = m[1];
        var edataHex = field.substr(0, field.length - 32), checksumHex = field.substr(field.length - 32);
        if (edataHex.length % 2 !== 0) return false;
        var clear = _krb23Decrypt(password, 1, checksumHex, edataHex);
        for (var i = 14; i < 28; i++) {
          if (clear[i] < 48 || clear[i] > 57) return false;
        }
        return true;
      }
      function verifyKrb5tgs232(password, hash) {
        var m = /^\$krb5tgs\$23\$\*.+\*\$([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash)) || /^\$krb5tgs\$23\$([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash));
        if (!m) return false;
        var td = _bytesToHex(_krb23Decrypt(password, 2, m[1], m[2]));
        return (td.substr(16, 4) === "6381" && td.substr(22, 2) === "30" || td.substr(16, 4) === "6382") && (td.substr(32, 6) === "030500" || td.substr(32, 8) === "050307a0");
      }
      function verifyKrb5asrep232(password, hash) {
        var m = /^\$krb5asrep\$23\$.+[:$]([0-9a-fA-F]{32})\$([0-9a-fA-F]{64,})$/.exec(String(hash));
        if (!m) return false;
        var td = _bytesToHex(_krb23Decrypt(password, 8, m[1], m[2]));
        return td.substr(16, 4) === "7981" && td.substr(22, 2) === "30" || td.substr(16, 2) === "79" && td.substr(20, 2) === "30" || td.substr(16, 4) === "7982" && td.substr(24, 2) === "30";
      }
      var KRB_NFOLD_KERBEROS = "6b65726265726f737b9b5b2b93132b93";
      function krbDK(keyWA, nfoldWA, keysize) {
        var out = null, prev = nfoldWA;
        for (var i = 0; i < keysize / 16; i++) {
          prev = aesEncBlockWA(keyWA, prev);
          out = out ? out.concat(prev.clone()) : prev.clone();
        }
        return out;
      }
      function krbBaseKey(password, realm, user, keysize) {
        var seedWA = CryptoJS2.PBKDF2(
          String(password),
          CryptoJS2.enc.Utf8.parse(String(realm).toUpperCase() + String(user)),
          { keySize: keysize / 4, iterations: 4096, hasher: CryptoJS2.algo.SHA1 }
        );
        return krbDK(seedWA, CryptoJS2.enc.Hex.parse(KRB_NFOLD_KERBEROS), keysize);
      }
      function krbKe(password, realm, user, keysize, nfold2Hex) {
        return krbDK(krbBaseKey(password, realm, user, keysize), CryptoJS2.enc.Hex.parse(nfold2Hex), keysize);
      }
      function krbBlock1Hex(keWA, edata2Hex) {
        var ct = CryptoJS2.enc.Hex.parse(edata2Hex.substr(0, 64));
        var c0 = CryptoJS2.lib.WordArray.create(ct.words.slice(0, 4), 16);
        var c1 = CryptoJS2.lib.WordArray.create(ct.words.slice(4, 8), 16);
        var d = aesDecBlockWA(keWA, c1), p1 = [];
        for (var i = 0; i < 4; i++) p1[i] = d.words[i] ^ c0.words[i];
        return CryptoJS2.lib.WordArray.create(p1, 16).toString(CryptoJS2.enc.Hex);
      }
      var KRB_NFOLD2_TGS2 = "b5b0582c14b6500aad56ab55aa80556a";
      var KRB_NFOLD2_ASREP2 = "be349a4d24be500eaf57abd5ea80757a";
      var KRB_NFOLD1_PA2 = "5b582c160a5aa80556ab55aad5402ab5";
      var KRB_NFOLD2_PA2 = "ae2c160b04ad5006ab55aad56a80355a";
      function makeKrb5dbVerifier2(keysize) {
        var et = keysize === 16 ? "17" : "18";
        var re = new RegExp("^\\$krb5db\\$" + et + "\\$([^$]*)\\$([^$]*)\\$([0-9a-fA-F]{" + keysize * 2 + "})$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m) return false;
          return krbBaseKey(password, m[2], m[1], keysize).toString(CryptoJS2.enc.Hex) === m[3].toLowerCase();
        };
      }
      function krbTgsCheck2(p1) {
        return (p1.substr(0, 4) === "6381" && p1.substr(6, 2) === "30" || p1.substr(0, 4) === "6382") && (p1.substr(16, 6) === "030500" || p1.substr(16, 8) === "050307a0");
      }
      function krbAsrepCheck2(p1) {
        return (p1.substr(0, 4) === "7981" || p1.substr(0, 4) === "7a81" || p1.substr(0, 4) === "7982" || p1.substr(0, 4) === "7a82") && p1.substr(6, 2) === "30";
      }
      function makeKrb5ticketVerifier2(keysize, sig, nfold2, checkFn) {
        var et = keysize === 16 ? "17" : "18";
        var re = new RegExp("^\\$" + sig + "\\$" + et + "\\$([^$]*)\\$([^$]*)\\$[0-9a-fA-F]{24}\\$([0-9a-fA-F]{64,})$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m) return false;
          return checkFn(krbBlock1Hex(krbKe(password, m[2], m[1], keysize, nfold2), m[3]));
        };
      }
      function aesCbcDecryptBytes(keyWA, dataBytes) {
        var dec = CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: _bytesToWA(dataBytes) }),
          keyWA,
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: CryptoJS2.enc.Hex.parse("00000000000000000000000000000000") }
        );
        return _waToBytes(dec);
      }
      function krbCtsDecrypt(keWA, enc) {
        var L = enc.length;
        if (L === 16) return _waToBytes(aesDecBlockWA(keWA, _bytesToWA(enc)));
        var lastLen = L % 16;
        if (lastLen === 0) {
          var cbc0 = enc.slice(0, L - 32).concat(enc.slice(L - 16, L)).concat(enc.slice(L - 32, L - 16));
          return aesCbcDecryptBytes(keWA, cbc0);
        }
        var nMinus1 = enc.slice(L - lastLen - 16, L - lastLen);
        var nMinus1Dec = _waToBytes(aesDecBlockWA(keWA, _bytesToWA(nMinus1)));
        var padded = enc.concat(nMinus1Dec.slice(lastLen, 16)), PL = padded.length;
        var cbc = padded.slice(0, PL - 32).concat(padded.slice(PL - 16, PL)).concat(padded.slice(PL - 32, PL - 16));
        return aesCbcDecryptBytes(keWA, cbc).slice(0, L);
      }
      function makeKrb5paAesVerifier2(keysize, nfold1, nfold2) {
        var et = keysize === 16 ? "17" : "18";
        var re = new RegExp("^\\$krb5pa\\$" + et + "\\$([^$]*)\\$([^$]*)\\$([0-9a-fA-F]+)$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m || m[3].length <= 24 || (m[3].length - 24) % 2 !== 0) return false;
          var encHex = m[3].substr(0, m[3].length - 24), checksumHex = m[3].substr(m[3].length - 24).toLowerCase();
          var base = krbBaseKey(password, m[2], m[1], keysize);
          var clear = krbCtsDecrypt(krbDK(base, CryptoJS2.enc.Hex.parse(nfold2), keysize), _hexToBytes(encHex));
          var mac = CryptoJS2.HmacSHA1(_bytesToWA(clear), krbDK(base, CryptoJS2.enc.Hex.parse(nfold1), keysize));
          return mac.toString(CryptoJS2.enc.Hex).substr(0, 24) === checksumHex;
        };
      }
      module.exports = {
        verifyKrb5pa23: verifyKrb5pa232,
        verifyKrb5tgs23: verifyKrb5tgs232,
        verifyKrb5asrep23: verifyKrb5asrep232,
        _krb23Decrypt,
        krb23Encrypt,
        krbBaseKey,
        makeKrb5dbVerifier: makeKrb5dbVerifier2,
        makeKrb5ticketVerifier: makeKrb5ticketVerifier2,
        makeKrb5paAesVerifier: makeKrb5paAesVerifier2,
        krbTgsCheck: krbTgsCheck2,
        krbAsrepCheck: krbAsrepCheck2,
        KRB_NFOLD2_TGS: KRB_NFOLD2_TGS2,
        KRB_NFOLD2_ASREP: KRB_NFOLD2_ASREP2,
        KRB_NFOLD1_PA: KRB_NFOLD1_PA2,
        KRB_NFOLD2_PA: KRB_NFOLD2_PA2
      };
    }
  });

  // src/netntlm.js
  var require_netntlm = __commonJS({
    "src/netntlm.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      function ntlmDesKeyWA(k0, k1, k2, k3, k4, k5, k6) {
        var s = String.fromCharCode(
          k0 & 255,
          (k0 << 7 | k1 >> 1) & 255,
          (k1 << 6 | k2 >> 2) & 255,
          (k2 << 5 | k3 >> 3) & 255,
          (k3 << 4 | k4 >> 4) & 255,
          (k4 << 3 | k5 >> 5) & 255,
          (k5 << 2 | k6 >> 6) & 255,
          k6 << 1 & 255
        );
        return CryptoJS2.enc.Latin1.parse(s);
      }
      function desEcbBlockHex(keyWA, dataWA) {
        return CryptoJS2.DES.encrypt(dataWA.clone(), keyWA, { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding }).ciphertext.toString(CryptoJS2.enc.Hex);
      }
      function netntlmv1Response(nt16bytes, challenge8WA) {
        var b = nt16bytes.concat([0, 0, 0, 0, 0]), out = "";
        for (var g = 0; g < 3; g++) {
          var o = g * 7;
          out += desEcbBlockHex(ntlmDesKeyWA(b[o], b[o + 1], b[o + 2], b[o + 3], b[o + 4], b[o + 5], b[o + 6]), challenge8WA);
        }
        return out;
      }
      function netntlmv1VerifyCore(nt16bytes, hash) {
        var parts = String(hash).split(":");
        if (parts.length < 6) return false;
        var cchallHex = parts[3], ntresp = parts[4].toLowerCase(), schallHex = parts[5];
        if (!/^[0-9a-fA-F]{48}$/.test(cchallHex) || !/^[0-9a-fA-F]{16}$/.test(schallHex) || !/^[0-9a-fA-F]{48}$/.test(ntresp)) return false;
        var cchall = CryptoJS2.enc.Hex.parse(cchallHex.substr(0, 16));
        var schall = CryptoJS2.enc.Hex.parse(schallHex);
        var md5wa = CryptoJS2.MD5(schall.clone().concat(cchall.clone()));
        var ess = CryptoJS2.lib.WordArray.create(md5wa.words.slice(0, 2), 8);
        return netntlmv1Response(nt16bytes, ess) === ntresp || netntlmv1Response(nt16bytes, schall) === ntresp;
      }
      function verifyNetntlmv12(password, hash) {
        return netntlmv1VerifyCore(_waToBytes(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(password)))), hash);
      }
      function verifyNetntlmv1NT2(password, hash) {
        var p = String(password);
        if (!/^[0-9a-fA-F]{32}$/.test(p)) return false;
        return netntlmv1VerifyCore(_waToBytes(CryptoJS2.enc.Hex.parse(p)), hash);
      }
      function verifyNetntlmv2NT2(password, hash) {
        var p = String(password);
        if (!/^[0-9a-fA-F]{32}$/.test(p)) return false;
        var parts = String(hash).split(":");
        if (parts.length < 6) return false;
        var user = parts[0], domain = parts[2], srv = parts[3], digest = parts[4].toLowerCase(), cli = parts[5];
        var ntlmv2hash = CryptoJS2.HmacMD5(CryptoJS2.enc.Utf16LE.parse(user.toUpperCase() + domain), CryptoJS2.enc.Hex.parse(p));
        var result = CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(srv + cli), ntlmv2hash);
        return result.toString(CryptoJS2.enc.Hex) === digest;
      }
      module.exports = { verifyNetntlmv1: verifyNetntlmv12, verifyNetntlmv1NT: verifyNetntlmv1NT2, verifyNetntlmv2NT: verifyNetntlmv2NT2, netntlmv1Response };
    }
  });

  // src/bitcoin.js
  var require_bitcoin = __commonJS({
    "src/bitcoin.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _hexToBytes = u._hexToBytes;
      var _u8ToWA = u._u8ToWA;
      var _secpPubKey2 = require_secp256k1()._secpPubKey;
      var b58 = require_base58();
      var _base58check2 = b58._base58check;
      var _base58checkDecode2 = b58._base58checkDecode;
      var _bech32Segwit2 = b58._bech32Segwit;
      function _hash160(bytes) {
        return _waToBytes(CryptoJS2.RIPEMD160(CryptoJS2.SHA256(_u8ToWA(bytes))));
      }
      function _btcP2pkh2(pub) {
        return _base58check2([0].concat(_hash160(pub)));
      }
      function _btcP2wpkh2(pub) {
        return _bech32Segwit2("bc", 0, _hash160(pub));
      }
      function _btcP2shP2wpkh2(pub) {
        return _base58check2([5].concat(_hash160([0, 20].concat(_hash160(pub)))));
      }
      function _btcPrivWif2(word) {
        var d = _base58checkDecode2(word);
        return d.length >= 33 ? d.slice(1, 33) : null;
      }
      function _btcPrivHex2(word) {
        return /^[0-9a-fA-F]{64}$/.test(word) ? _hexToBytes(word) : null;
      }
      function makeBtcVerifier2(keyFn, compressed, addrFn) {
        return function(password, hash) {
          var priv, pub;
          try {
            priv = keyFn(String(password));
          } catch (e) {
            return false;
          }
          if (!priv) return false;
          try {
            pub = _secpPubKey2(priv, compressed);
          } catch (e) {
            return false;
          }
          try {
            return addrFn(pub) === String(hash);
          } catch (e) {
            return false;
          }
        };
      }
      module.exports = {
        makeBtcVerifier: makeBtcVerifier2,
        _btcP2pkh: _btcP2pkh2,
        _btcP2wpkh: _btcP2wpkh2,
        _btcP2shP2wpkh: _btcP2shP2wpkh2,
        _btcPrivWif: _btcPrivWif2,
        _btcPrivHex: _btcPrivHex2
      };
    }
  });

  // src/wallets.js
  var require_wallets = __commonJS({
    "src/wallets.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToWA = u._bytesToWA;
      var _bytesToHex = u._bytesToHex;
      var _gcmMod = require_gcm();
      var _gcmTagOk2 = _gcmMod._gcmTagOk;
      var _gcmDecrypt = _gcmMod._gcmDecrypt;
      function verifyMetamask2(password, hash) {
        var m = /^\$metamask\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
        if (!m) return false;
        var salt, iv, ctTag;
        try {
          salt = _waToBytes(CryptoJS2.enc.Base64.parse(m[1]));
          iv = _waToBytes(CryptoJS2.enc.Base64.parse(m[2]));
          ctTag = _waToBytes(CryptoJS2.enc.Base64.parse(m[3]));
        } catch (e) {
          return false;
        }
        if (ctTag.length < 16) return false;
        var keyWA = CryptoJS2.PBKDF2(String(password), _bytesToWA(salt), { keySize: 8, iterations: 1e4, hasher: CryptoJS2.algo.SHA256 });
        return _gcmTagOk2(_waToBytes(keyWA), iv, ctTag);
      }
      function verifyMetamaskShort2(password, hash) {
        var m = /^\$metamask-short\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
        if (!m) return false;
        var salt, iv, ct;
        try {
          salt = _waToBytes(CryptoJS2.enc.Base64.parse(m[1]));
          iv = _waToBytes(CryptoJS2.enc.Base64.parse(m[2]));
          ct = _waToBytes(CryptoJS2.enc.Base64.parse(m[3]));
        } catch (e) {
          return false;
        }
        if (ct.length < 16) return false;
        var keyWA = CryptoJS2.PBKDF2(String(password), _bytesToWA(salt), { keySize: 8, iterations: 1e4, hasher: CryptoJS2.algo.SHA256 });
        var pt = _gcmDecrypt(_waToBytes(keyWA), iv, ct);
        for (var i = 0; i < pt.length; i++) if (pt[i] < 32 || pt[i] > 126) return false;
        return pt.length > 0;
      }
      function verifyBlockchain2ndPass2(password, hash) {
        var raw;
        try {
          raw = _waToBytes(CryptoJS2.enc.Base64.parse(String(hash)));
        } catch (e) {
          return false;
        }
        if (raw.length < 59 || raw[0] !== 98 || raw[1] !== 115 || raw[2] !== 58) return false;
        var digestStored = raw.slice(3, 35), salt = raw.slice(35, 51);
        var iter = raw[51] | raw[52] << 8 | raw[53] << 16 | raw[54] << 24;
        if (iter < 1 || iter > 1e6) return false;
        var hx = _bytesToHex(salt);
        var uuid = hx.substr(0, 8) + "-" + hx.substr(8, 4) + "-" + hx.substr(12, 4) + "-" + hx.substr(16, 4) + "-" + hx.substr(20, 12);
        var digest = CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(uuid + String(password)));
        for (var i = 0; i < iter - 1; i++) digest = CryptoJS2.SHA256(digest);
        return digest.toString(CryptoJS2.enc.Hex) === _bytesToHex(digestStored);
      }
      function verifyWalletDat2(password, hash) {
        var parts = String(hash).split("$");
        if (parts[1] !== "bitcoin" || parts.length < 7) return false;
        var cmaster = parts[3], saltHex = parts[5], iter = parseInt(parts[6], 10);
        if (!iter || !/^[0-9a-fA-F]+$/.test(cmaster) || !/^[0-9a-fA-F]+$/.test(saltHex)) return false;
        var digest = CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(String(password)).concat(CryptoJS2.enc.Hex.parse(saltHex)));
        for (var i = 1; i < iter; i++) digest = CryptoJS2.SHA512(digest);
        var keyWA = CryptoJS2.lib.WordArray.create(digest.words.slice(0, 8), 32);
        var ivWA = CryptoJS2.lib.WordArray.create(digest.words.slice(8, 12), 16);
        var dec = CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: CryptoJS2.enc.Hex.parse(cmaster) }),
          keyWA,
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: ivWA }
        );
        var b = _waToBytes(dec), n = b.length, ok16 = n >= 16, ok8 = n >= 8, j;
        for (j = 1; j <= 16; j++) if (b[n - j] !== 16) {
          ok16 = false;
          break;
        }
        for (j = 1; j <= 8; j++) if (b[n - j] !== 8) {
          ok8 = false;
          break;
        }
        return ok16 || ok8;
      }
      function _blockchainCheck(password, saltHex, encHex, iter) {
        var saltWA = CryptoJS2.enc.Hex.parse(saltHex);
        var key = CryptoJS2.PBKDF2(String(password), saltWA, { keySize: 8, iterations: iter, hasher: CryptoJS2.algo.SHA1 });
        var dec = CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: CryptoJS2.enc.Hex.parse(encHex) }),
          key,
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: saltWA }
        );
        var s = dec.toString(CryptoJS2.enc.Latin1);
        return s.charAt(0) === "{" && s.indexOf('"guid"') >= 0;
      }
      function verifyBlockchainV12(password, hash) {
        var m = /^\$blockchain\$\d+\$([0-9a-fA-F]{32})([0-9a-fA-F]+)$/.exec(String(hash));
        return m ? _blockchainCheck(password, m[1], m[2], 10) : false;
      }
      function verifyBlockchainV22(password, hash) {
        var m = /^\$blockchain\$v2\$(\d+)\$\d+\$([0-9a-fA-F]{32})([0-9a-fA-F]+)$/.exec(String(hash));
        return m ? _blockchainCheck(password, m[2], m[3], parseInt(m[1], 10)) : false;
      }
      module.exports = {
        verifyMetamask: verifyMetamask2,
        verifyMetamaskShort: verifyMetamaskShort2,
        verifyBlockchain2ndPass: verifyBlockchain2ndPass2,
        verifyWalletDat: verifyWalletDat2,
        verifyBlockchainV1: verifyBlockchainV12,
        verifyBlockchainV2: verifyBlockchainV22
      };
    }
  });

  // src/crypt.js
  var require_crypt = __commonJS({
    "src/crypt.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      function rstr_sha512(s) {
        return CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      function rstr_sha256(s) {
        return CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
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
      function _sha512crypt_intermediate(password, salt) {
        var digest_b = rstr_sha512(password + salt + password);
        var key_len = password.length;
        var digest_b_extended = _extend_512(digest_b, password.length);
        var intermediate_input = password + salt + digest_b_extended;
        for (var cnt = key_len; cnt > 0; cnt >>= 1) {
          if ((cnt & 1) != 0)
            intermediate_input += digest_b;
          else
            intermediate_input += password;
        }
        var intermediate = rstr_sha512(intermediate_input);
        return intermediate;
      }
      function _sha256crypt_intermediate(password, salt) {
        var digest_b = rstr_sha256(password + salt + password);
        var key_len = password.length;
        var digest_b_extended = _extend_256(digest_b, password.length);
        var intermediate_input = password + salt + digest_b_extended;
        for (var cnt = key_len; cnt > 0; cnt >>= 1) {
          if ((cnt & 1) != 0)
            intermediate_input += digest_b;
          else
            intermediate_input += password;
        }
        var intermediate = rstr_sha256(intermediate_input);
        return intermediate;
      }
      function _rstr_sha256crypt(password, salt, rounds) {
        var digest_a = _sha256crypt_intermediate(password, salt);
        var dp_input = "";
        for (var i = 0; i < password.length; i++)
          dp_input += password;
        var dp = rstr_sha256(dp_input);
        var p = _extend_256(dp, password.length);
        var ds_input = "";
        for (var i = 0; i < 16 + digest_a.charCodeAt(0); i++)
          ds_input += salt;
        var ds = rstr_sha256(ds_input);
        var s = _extend_256(ds, salt.length);
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
        var digest_a = _sha512crypt_intermediate(password, salt);
        var dp_input = "";
        for (var i = 0; i < password.length; i++)
          dp_input += password;
        var dp = rstr_sha512(dp_input);
        var p = _extend_512(dp, password.length);
        var ds_input = "";
        for (var i = 0; i < 16 + digest_a.charCodeAt(0); i++)
          ds_input += salt;
        var ds = rstr_sha512(ds_input);
        var s = _extend_512(ds, salt.length);
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
      }
      function sha512crypt(password, salt) {
        var magic = "$6$";
        var rounds;
        var magic_array = salt.split("$");
        if (magic_array.length > 1) {
          rounds = parseInt(magic_array[2].split("=")[1]);
          if (rounds) {
            if (rounds < 1e3)
              rounds = 1e3;
            if (rounds > 999999999)
              rounds = 999999999;
            salt = magic_array[3] || salt;
          } else {
            salt = magic_array[2] || salt;
          }
        }
        salt = salt.substr(0, 16);
        var hash = "";
        var result = "";
        hash = _rstr_sha512crypt(password, salt, rounds || 5e3);
        result = to64_triplet(hash, 0, 21, 42) + to64_triplet(hash, 22, 43, 1) + to64_triplet(hash, 44, 2, 23) + to64_triplet(hash, 3, 24, 45) + to64_triplet(hash, 25, 46, 4) + to64_triplet(hash, 47, 5, 26) + to64_triplet(hash, 6, 27, 48) + to64_triplet(hash, 28, 49, 7) + to64_triplet(hash, 50, 8, 29) + to64_triplet(hash, 9, 30, 51) + to64_triplet(hash, 31, 52, 10) + to64_triplet(hash, 53, 11, 32) + to64_triplet(hash, 12, 33, 54) + to64_triplet(hash, 34, 55, 13) + to64_triplet(hash, 56, 14, 35) + to64_triplet(hash, 15, 36, 57) + to64_triplet(hash, 37, 58, 16) + to64_triplet(hash, 59, 17, 38) + to64_triplet(hash, 18, 39, 60) + to64_triplet(hash, 40, 61, 19) + to64_triplet(hash, 62, 20, 41) + to64_single(hash, 63);
        return magic + salt + "$" + result;
      }
      function sha256crypt(password, salt) {
        var magic = "$5$";
        var rounds;
        var magic_array = salt.split("$");
        if (magic_array.length > 1) {
          rounds = parseInt(magic_array[2].split("=")[1]);
          if (rounds) {
            if (rounds < 1e3)
              rounds = 1e3;
            if (rounds > 999999999)
              rounds = 999999999;
            salt = magic_array[3] || salt;
          } else {
            salt = magic_array[2] || salt;
          }
        }
        salt = salt.substr(0, 16);
        var hash = "";
        var result = "";
        hash = _rstr_sha256crypt(password, salt, rounds || 5e3);
        var result = to64_triplet(hash, 0, 10, 20) + to64_triplet(hash, 21, 1, 11) + to64_triplet(hash, 12, 22, 2) + to64_triplet(hash, 3, 13, 23) + to64_triplet(hash, 24, 4, 14) + to64_triplet(hash, 15, 25, 5) + to64_triplet(hash, 6, 16, 26) + to64_triplet(hash, 27, 7, 17) + to64_triplet(hash, 18, 28, 8) + to64_triplet(hash, 9, 19, 29) + to64_double(hash, 31, 30);
        return magic + salt + "$" + result;
      }
      function to64(v, n) {
        const ascii64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var s = "";
        while (--n >= 0) {
          s += ascii64.charAt(v & 63);
          v >>= 6;
        }
        return s;
      }
      function to64_triplet(str, idx0, idx1, idx2) {
        var v = str.charCodeAt(idx0) << 16 | str.charCodeAt(idx1) << 8 | str.charCodeAt(idx2);
        return to64(v, 4);
      }
      function to64_double(str, idx0, idx1) {
        var v = str.charCodeAt(idx0) << 8 | str.charCodeAt(idx1);
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
        var db_digest = CryptoJS2.MD5(db);
        for (pwlen; pwlen > 0; pwlen -= 16) {
          if (pwlen > 16)
            da = da.concat(db_digest.toString(CryptoJS2.enc.Latin1));
          else
            da = da.concat(db_digest.toString(CryptoJS2.enc.Latin1).substring(0, pwlen));
        }
        for (var i = password.length; i != 0; i >>= 1) {
          if (i % 2 == 1)
            da += "\0";
          else
            da += password.charAt(0);
        }
        var dc_digest = CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(da));
        for (i = 0; i < 1e3; i++) {
          var tmp = "";
          if (i & 1)
            tmp += password;
          else
            tmp += dc_digest.toString(CryptoJS2.enc.Latin1);
          if (i % 3) {
            tmp += salt;
          }
          if (i % 7)
            tmp += password;
          if (i & 1)
            tmp += dc_digest.toString(CryptoJS2.enc.Latin1);
          else
            tmp += password;
          dc_digest = CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(tmp));
        }
        var hash = magic + salt + "$" + to64_triplet(dc_digest.toString(CryptoJS2.enc.Latin1), 0, 6, 12) + to64_triplet(dc_digest.toString(CryptoJS2.enc.Latin1), 1, 7, 13) + to64_triplet(dc_digest.toString(CryptoJS2.enc.Latin1), 2, 8, 14) + to64_triplet(dc_digest.toString(CryptoJS2.enc.Latin1), 3, 9, 15) + to64_triplet(dc_digest.toString(CryptoJS2.enc.Latin1), 4, 10, 5) + to64_single(dc_digest.toString(CryptoJS2.enc.Latin1), 11);
        return hash;
      }
      function verifyMD5CRYPT2(password, hash) {
        const hashToVerify = md5crypt(password, hash.split("$")[2]);
        return hashToVerify === hash;
      }
      function verifyMysqlA2(password, hash) {
        var m = /^\$mysql\$A\$(\d{3})\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var salt = "";
        for (var i = 0; i < m[2].length; i += 2) salt += String.fromCharCode(parseInt(m[2].substr(i, 2), 16));
        var h = _rstr_sha256crypt(String(password), salt, parseInt(m[1], 10) * 1e3);
        var b64 = to64_triplet(h, 0, 10, 20) + to64_triplet(h, 21, 1, 11) + to64_triplet(h, 12, 22, 2) + to64_triplet(h, 3, 13, 23) + to64_triplet(h, 24, 4, 14) + to64_triplet(h, 15, 25, 5) + to64_triplet(h, 6, 16, 26) + to64_triplet(h, 27, 7, 17) + to64_triplet(h, 18, 28, 8) + to64_triplet(h, 9, 19, 29) + to64_double(h, 31, 30);
        var hex = "";
        for (var j = 0; j < b64.length; j++) {
          var c = b64.charCodeAt(j).toString(16);
          hex += c.length < 2 ? "0" + c : c;
        }
        return hex === m[3].toLowerCase();
      }
      function verifyAixSmd52(password, hash) {
        if (String(hash).indexOf("{smd5}") !== 0) return false;
        var inner = String(hash).slice(6), salt = inner.split("$")[0];
        return md5crypt(String(password), salt, "") === inner;
      }
      function verifyApr12(password, hash) {
        var parts = String(hash).split("$");
        if (parts[1] !== "apr1") return false;
        return md5crypt(password, parts[2], "$apr1$") === String(hash);
      }
      function verifySHA256CRYPT2(password, hash) {
        var magic_array = hash.split("$");
        var salt;
        var rounds;
        var rest;
        if (magic_array.length > 1) {
          rounds = parseInt(magic_array[2].split("=")[1]);
          if (rounds) {
            salt = magic_array[3];
            rest = magic_array[4];
          } else {
            salt = magic_array[2];
            rest = magic_array[3];
          }
        } else return false;
        var formatted_hash = "$5$" + salt + "$" + rest;
        const hashToVerify = sha256crypt(password, hash);
        return hashToVerify === formatted_hash;
      }
      function verifySHA512CRYPT2(password, hash) {
        var magic_array = hash.split("$");
        var rounds;
        var salt;
        var rest;
        if (magic_array.length > 1) {
          rounds = parseInt(magic_array[2].split("=")[1]);
          if (rounds) {
            salt = magic_array[3];
            rest = magic_array[4];
          } else {
            salt = magic_array[2];
            rest = magic_array[3];
          }
        } else return false;
        var formatted_hash = "$6$" + salt + "$" + rest;
        const hashToVerify = sha512crypt(password, hash);
        return hashToVerify === formatted_hash;
      }
      var PHPASS_ITOA64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      function phpassEncode64(input, count) {
        var output = "";
        var i = 0;
        do {
          var value = input.charCodeAt(i++);
          output += PHPASS_ITOA64.charAt(value & 63);
          if (i < count) value |= input.charCodeAt(i) << 8;
          output += PHPASS_ITOA64.charAt(value >> 6 & 63);
          if (i++ >= count) break;
          if (i < count) value |= input.charCodeAt(i) << 16;
          output += PHPASS_ITOA64.charAt(value >> 12 & 63);
          if (i++ >= count) break;
          output += PHPASS_ITOA64.charAt(value >> 18 & 63);
        } while (i < count);
        return output;
      }
      function verifyPhpass2(password, hash) {
        var h = String(hash);
        if (!/^\$[PH]\$[./0-9A-Za-z]{31}$/.test(h)) return false;
        var countLog2 = PHPASS_ITOA64.indexOf(h.charAt(3));
        if (countLog2 < 7 || countLog2 > 30) return false;
        var count = 1 << countLog2;
        var setting = h.substring(0, 12);
        var salt = h.substring(4, 12);
        var passWA = CryptoJS2.enc.Latin1.parse(String(password));
        var digest = CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(salt).concat(passWA.clone()));
        for (var i = 0; i < count; i++) {
          digest = CryptoJS2.MD5(digest.clone().concat(passWA.clone()));
        }
        return h === setting + phpassEncode64(digest.toString(CryptoJS2.enc.Latin1), 16);
      }
      function sha1cryptDigest(tmp) {
        var d = to64_triplet(tmp, 0, 1, 2) + to64_triplet(tmp, 3, 4, 5) + to64_triplet(tmp, 6, 7, 8) + to64_triplet(tmp, 9, 10, 11) + to64_triplet(tmp, 12, 13, 14) + to64_triplet(tmp, 15, 16, 17);
        var v = tmp.charCodeAt(18) << 16 | tmp.charCodeAt(19) << 8;
        return d + to64(v, 4);
      }
      function verifySha1crypt2(password, hash) {
        var m = /^\$sha1\$(\d+)\$([^$]*)\$([./0-9A-Za-z]{28})$/.exec(String(hash));
        if (!m) return false;
        var iterations = parseInt(m[1], 10);
        var salt = m[2];
        if (!iterations) return false;
        var key = CryptoJS2.enc.Latin1.parse(String(password));
        var tmp = CryptoJS2.HmacSHA1(CryptoJS2.enc.Latin1.parse(salt + "$sha1$" + iterations), key);
        for (var r = 1; r < iterations; r++) tmp = CryptoJS2.HmacSHA1(tmp, key);
        return sha1cryptDigest(tmp.toString(CryptoJS2.enc.Latin1)) === m[3];
      }
      function genSha1crypt(password, salt, iterations) {
        var key = CryptoJS2.enc.Latin1.parse(String(password));
        var tmp = CryptoJS2.HmacSHA1(CryptoJS2.enc.Latin1.parse(salt + "$sha1$" + iterations), key);
        for (var r = 1; r < iterations; r++) tmp = CryptoJS2.HmacSHA1(tmp, key);
        return "$sha1$" + iterations + "$" + salt + "$" + sha1cryptDigest(tmp.toString(CryptoJS2.enc.Latin1));
      }
      function genPhpass(password, salt, costChar) {
        var setting = "$P$" + costChar + salt, count = 1 << PHPASS_ITOA64.indexOf(costChar);
        var passWA = CryptoJS2.enc.Latin1.parse(String(password));
        var digest = CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(salt).concat(passWA.clone()));
        for (var i = 0; i < count; i++) digest = CryptoJS2.MD5(digest.clone().concat(passWA.clone()));
        return setting + phpassEncode64(digest.toString(CryptoJS2.enc.Latin1), 16);
      }
      function genMysqlA(password, saltHex, cost) {
        var salt = "";
        for (var i = 0; i < saltHex.length; i += 2) salt += String.fromCharCode(parseInt(saltHex.substr(i, 2), 16));
        var h = _rstr_sha256crypt(String(password), salt, cost * 1e3);
        var b64 = to64_triplet(h, 0, 10, 20) + to64_triplet(h, 21, 1, 11) + to64_triplet(h, 12, 22, 2) + to64_triplet(h, 3, 13, 23) + to64_triplet(h, 24, 4, 14) + to64_triplet(h, 15, 25, 5) + to64_triplet(h, 6, 16, 26) + to64_triplet(h, 27, 7, 17) + to64_triplet(h, 18, 28, 8) + to64_triplet(h, 9, 19, 29) + to64_double(h, 31, 30);
        var hex = "";
        for (var j = 0; j < b64.length; j++) {
          var c = b64.charCodeAt(j).toString(16);
          hex += c.length < 2 ? "0" + c : c;
        }
        return "$mysql$A$" + ("00" + cost).slice(-3) + "*" + saltHex.toUpperCase() + "*" + hex.toUpperCase();
      }
      module.exports = { verifyMD5CRYPT: verifyMD5CRYPT2, verifySHA256CRYPT: verifySHA256CRYPT2, verifySHA512CRYPT: verifySHA512CRYPT2, verifyPhpass: verifyPhpass2, verifySha1crypt: verifySha1crypt2, verifyApr1: verifyApr12, verifyMysqlA: verifyMysqlA2, verifyAixSmd5: verifyAixSmd52, md5crypt, sha256crypt, sha512crypt, genSha1crypt, genPhpass, genMysqlA };
    }
  });

  // src/digests.js
  var require_digests = __commonJS({
    "src/digests.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      var bcrypt2 = require_bcryptjs_own();
      require_md4();
      function mysql323Hash(password) {
        let nr = 1345345333;
        let nr2 = 305419889;
        let add = 7;
        for (let i = 0; i < password.length; i++) {
          let ch = password.charCodeAt(i);
          nr ^= ((nr & 63) + add) * ch + (nr << 8);
          nr2 += nr2 << 8 ^ nr;
          add += ch;
        }
        var h1 = ((nr & 2147483647) >>> 0).toString(16);
        var h2 = ((nr2 & 2147483647) >>> 0).toString(16);
        while (h1.length < 8) h1 = "0" + h1;
        while (h2.length < 8) h2 = "0" + h2;
        return h1 + h2;
      }
      function verifyNTLM2(password, hash) {
        const hashToVerify = CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(password)).toString().toUpperCase();
        return hashToVerify === hash.toString().toUpperCase();
      }
      function verifyMD52(password, hash) {
        const hashToVerify = CryptoJS2.MD5(password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifySHA12(password, hash) {
        const hashToVerify = CryptoJS2.SHA1(password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifySHA2562(password, hash) {
        const hashToVerify = CryptoJS2.SHA256(password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifySHA5122(password, hash) {
        const hashToVerify = CryptoJS2.SHA512(password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifyBcrypt2(password, hash) {
        return bcrypt2.compareSync(password, hash);
      }
      function verify_mysql3232(password, hash) {
        let calculatedHash = mysql323Hash(password);
        return calculatedHash.toLowerCase() === hash.toLowerCase();
      }
      function makeSaltedVerifier2(hasher, order, utf16le) {
        return function(password, hash) {
          password = String(password);
          var line = String(hash);
          var idx = line.indexOf(":");
          if (idx < 0 || idx === line.length - 1) return false;
          var digest = line.slice(0, idx).toLowerCase();
          var salt = line.slice(idx + 1);
          var passWA = utf16le ? CryptoJS2.enc.Utf16LE.parse(password) : CryptoJS2.enc.Latin1.parse(password);
          var saltWA = CryptoJS2.enc.Latin1.parse(salt);
          var message = order === "ps" ? passWA.clone().concat(saltWA) : saltWA.clone().concat(passWA);
          return hasher(message).toString(CryptoJS2.enc.Hex) === digest;
        };
      }
      function makeRawHexVerifier2(hasher) {
        return function(password, hash) {
          return hasher(String(password)).toString(CryptoJS2.enc.Hex) === String(hash).toLowerCase();
        };
      }
      function verifyHalfMD52(password, hash) {
        return CryptoJS2.MD5(String(password)).toString(CryptoJS2.enc.Hex).substring(0, 16) === String(hash).toLowerCase();
      }
      function _md5hex2(x) {
        return CryptoJS2.MD5(x).toString();
      }
      function _sha1hex2(x) {
        return CryptoJS2.SHA1(x).toString();
      }
      function _md5s2(s) {
        return CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha1s2(s) {
        return CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha224s2(s) {
        return CryptoJS2.SHA224(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha256s2(s) {
        return CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha512s2(s) {
        return CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _md5raw2(s) {
        return CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      function _sha1raw2(s) {
        return CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      function _sha256raw2(s) {
        return CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      function _sha512raw2(s) {
        return CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      function makeUtf16leRawVerifier2(hasher) {
        return function(password, hash) {
          return hasher(CryptoJS2.enc.Utf16LE.parse(String(password))).toString() === String(hash).toLowerCase();
        };
      }
      module.exports = { verifyNTLM: verifyNTLM2, verifyMD5: verifyMD52, verifySHA1: verifySHA12, verifySHA256: verifySHA2562, verifySHA512: verifySHA5122, verifyBcrypt: verifyBcrypt2, verify_mysql323: verify_mysql3232, mysql323Hash, makeSaltedVerifier: makeSaltedVerifier2, makeRawHexVerifier: makeRawHexVerifier2, makeUtf16leRawVerifier: makeUtf16leRawVerifier2, verifyHalfMD5: verifyHalfMD52, _md5hex: _md5hex2, _sha1hex: _sha1hex2, _md5s: _md5s2, _sha1s: _sha1s2, _sha224s: _sha224s2, _sha256s: _sha256s2, _sha512s: _sha512s2, _md5raw: _md5raw2, _sha1raw: _sha1raw2, _sha256raw: _sha256raw2, _sha512raw: _sha512raw2 };
    }
  });

  // src/hmac.js
  var require_hmac2 = __commonJS({
    "src/hmac.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToWA = u._bytesToWA;
      var _bytesToHex = u._bytesToHex;
      function netntlmv2Hash(username, domain, challenge, blob, password) {
        let wordsNtlm = CryptoJS2.enc.Hex.parse(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(password)).toString().toUpperCase());
        var usernameDomain = CryptoJS2.enc.Utf16LE.parse(username.toUpperCase() + domain);
        var ntlmv2hash = CryptoJS2.HmacMD5(usernameDomain, wordsNtlm);
        var resultHash = CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(challenge + blob), ntlmv2hash);
        return CryptoJS2.enc.Hex.stringify(resultHash);
      }
      function verifyNetNTLMV22(password, hash) {
        let parts = hash.split(":");
        if (parts.length < 6) return false;
        var username = parts[0];
        var domain = parts[2];
        var challenge = parts[3];
        var targetHash = parts[4];
        var blob = parts[5];
        var targetHashCalculated = netntlmv2Hash(username, domain, challenge, blob, password);
        return targetHashCalculated === targetHash;
      }
      function verifyJWT2(password, hash) {
        const jwtParts = hash.split(".");
        var clearedToken = String(jwtParts[0]) + "." + String(jwtParts[1]);
        const header = JSON.parse(atob(jwtParts[0]));
        if (!header.alg)
          return false;
        let signature = false;
        let alg = header.alg.toLowerCase();
        switch (alg) {
          case "hs256":
            signature = CryptoJS2.HmacSHA256(String(clearedToken), String(password)).toString(CryptoJS2.enc.Base64).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");
            break;
          case "hs384":
            signature = CryptoJS2.HmacSHA384(String(clearedToken), String(password)).toString(CryptoJS2.enc.Base64).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");
            break;
          case "hs512":
            signature = CryptoJS2.HmacSHA512(String(clearedToken), String(password)).toString(CryptoJS2.enc.Base64).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");
            break;
          default:
            return false;
        }
        if (jwtParts[2] == signature)
          return true;
        return false;
      }
      function verifyHMAC_MD52(password, hash) {
        const parts = hash.split(":");
        let hashToVerify = null;
        if (parts.length == 2) {
          hashToVerify = CryptoJS2.HmacMD5(password, parts[1]).toString(CryptoJS2.enc.Hex);
          return hashToVerify === parts[0].toLowerCase();
        }
        hashToVerify = CryptoJS2.HmacMD5(password, password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifyHMAC_SHA12(password, hash) {
        const parts = hash.split(":");
        let hashToVerify = null;
        if (parts.length == 2) {
          hashToVerify = CryptoJS2.HmacSHA1(password, parts[1]).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          hashToVerify = CryptoJS2.HmacSHA1(parts[1], password).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          return false;
        }
        hashToVerify = CryptoJS2.HmacSHA1(password, password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifyHMAC_SHA2562(password, hash) {
        const parts = hash.split(":");
        let hashToVerify = null;
        if (parts.length == 2) {
          hashToVerify = CryptoJS2.HmacSHA256(password, parts[1]).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          hashToVerify = CryptoJS2.HmacSHA256(parts[1], password).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          return false;
        }
        hashToVerify = CryptoJS2.HmacSHA256(password, password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function verifyHMAC_SHA5122(password, hash) {
        const parts = hash.split(":");
        let hashToVerify = null;
        if (parts.length == 2) {
          hashToVerify = CryptoJS2.HmacSHA512(password, parts[1]).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          hashToVerify = CryptoJS2.HmacSHA512(parts[1], password).toString(CryptoJS2.enc.Hex);
          if (hashToVerify === parts[0].toLowerCase()) return true;
          return false;
        }
        hashToVerify = CryptoJS2.HmacSHA512(password, password).toString(CryptoJS2.enc.Hex);
        return hashToVerify === hash.toLowerCase();
      }
      function makeSshaVerifier2(tag, hasher, digestLen) {
        var re = new RegExp("^\\{" + tag + "\\}(.+)$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m) return false;
          var bytes;
          try {
            bytes = _waToBytes(CryptoJS2.enc.Base64.parse(m[1]));
          } catch (e) {
            return false;
          }
          if (bytes.length < digestLen) return false;
          var salt = _bytesToWA(bytes.slice(digestLen));
          var calc = hasher(CryptoJS2.enc.Latin1.parse(String(password)).concat(salt));
          return _bytesToHex(_waToBytes(calc)) === _bytesToHex(bytes.slice(0, digestLen));
        };
      }
      function makeHmacPassVerifier2(hmacFn) {
        return function(password, hash) {
          var line = String(hash);
          var idx = line.indexOf(":");
          if (idx < 0) return false;
          var digest = line.slice(0, idx).toLowerCase();
          var salt = line.slice(idx + 1);
          return hmacFn(CryptoJS2.enc.Latin1.parse(salt), CryptoJS2.enc.Latin1.parse(String(password))).toString() === digest;
        };
      }
      module.exports = { verifyNetNTLMV2: verifyNetNTLMV22, verifyJWT: verifyJWT2, verifyHMAC_MD5: verifyHMAC_MD52, verifyHMAC_SHA1: verifyHMAC_SHA12, verifyHMAC_SHA256: verifyHMAC_SHA2562, verifyHMAC_SHA512: verifyHMAC_SHA5122, makeSshaVerifier: makeSshaVerifier2, makeHmacPassVerifier: makeHmacPassVerifier2 };
    }
  });

  // src/pbkdf2.js
  var require_pbkdf22 = __commonJS({
    "src/pbkdf2.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      function makePbkdf2Verifier2(hasher, prefix) {
        return function(password, hash) {
          var parts = String(hash).split(":");
          if (parts.length !== 4 || parts[0] !== prefix) return false;
          var iter = parseInt(parts[1], 10);
          if (!iter || iter < 1) return false;
          var saltWA, wantWA;
          try {
            saltWA = CryptoJS2.enc.Base64.parse(parts[2]);
            wantWA = CryptoJS2.enc.Base64.parse(parts[3]);
          } catch (e) {
            return false;
          }
          var dkLen = wantWA.sigBytes;
          if (dkLen < 1) return false;
          var dk = CryptoJS2.PBKDF2(String(password), saltWA, { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher });
          return dk.toString(CryptoJS2.enc.Hex).substring(0, dkLen * 2) === wantWA.toString(CryptoJS2.enc.Hex);
        };
      }
      module.exports = { makePbkdf2Verifier: makePbkdf2Verifier2 };
    }
  });

  // src/bcrypt.js
  var require_bcrypt = __commonJS({
    "src/bcrypt.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      var bcrypt2 = require_bcryptjs_own();
      function makeBcryptPrehashVerifier2(hasher) {
        return function(password, hash) {
          return bcrypt2.compareSync(hasher(String(password)).toString(CryptoJS2.enc.Hex), String(hash));
        };
      }
      function verifyBcryptHmacSha2562(password, hash) {
        var m = /^\$bcrypt-sha256\$v=2,t=2b,r=(\d{2})\$([./A-Za-z0-9]{22})\$([./A-Za-z0-9]{31})$/.exec(String(hash));
        if (!m) return false;
        var cost = m[1], encodedSalt = m[2], hashPart = m[3];
        var mac = CryptoJS2.HmacSHA256(CryptoJS2.enc.Latin1.parse(String(password)), CryptoJS2.enc.Latin1.parse(encodedSalt));
        var b64pw = mac.toString(CryptoJS2.enc.Base64);
        return bcrypt2.compareSync(b64pw, "$2b$" + cost + "$" + encodedSalt + hashPart);
      }
      module.exports = { makeBcryptPrehashVerifier: makeBcryptPrehashVerifier2, verifyBcryptHmacSha256: verifyBcryptHmacSha2562 };
    }
  });

  // src/sap.js
  var require_sap = __commonJS({
    "src/sap.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToWA = u._bytesToWA;
      var SAP_MAGIC = "\x91\xACQ\x9FgTC$\xE7;\xE0(t{\xC2\x863\xEBZO\xCB\\\b\ns7]/3\x8F\xE6\xE5\xF8\x9B\xAE\xDD\xF2K\x8D,\xE1\xD4\xDC\xB0\xCB\xDF\x9D\xD4pm\xF9MB?\x9B\x1B\x94\x9F[\xC1\x9B\x9D\x9D^\x8A\x9Aj\xE8\xD9|X\xC7*\xF6\xA1\x99c\n\xD7\xFDp\xC3\xF6^t\xC9\v&\x98\xF7&\x8A\x92\x93%\xB0\xA2\r#\xEDcym2\xFA<5\x9A\xA3\xB3\xDD\x8E\n$\xBFQ\xC3|\xCDU\x9F7\xAF\x94L)\bR\x82\xB2;N7\x9F\x07\x91;\xFD\xCD";
      function verifySapG2(password, hash) {
        var m = /^([^$]+)\$([0-9A-Fa-f]{40})$/.exec(String(hash));
        if (!m) return false;
        var salt = m[1].toUpperCase(), want = m[2].toUpperCase(), word = String(password);
        var d = _waToBytes(CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(word + salt)));
        var lenMA = 32, offMA = 0, i;
        for (i = 0; i < 10; i++) lenMA += d[i] % 6;
        for (i = 10; i < 20; i++) offMA += d[i] % 8;
        var magic = SAP_MAGIC.substr(offMA, lenMA);
        return CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(word + magic + salt)).toString().toUpperCase() === want;
      }
      var SAPB_TRANS = function() {
        var t = [], i;
        for (i = 0; i < 256; i++) t[i] = 255;
        var mid = [
          63,
          64,
          65,
          80,
          67,
          68,
          69,
          75,
          71,
          72,
          77,
          78,
          84,
          81,
          83,
          70,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          86,
          85,
          92,
          73,
          93,
          74,
          66,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          88,
          91,
          89,
          255,
          82,
          76,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          87,
          94,
          90,
          79,
          255
        ];
        for (i = 0; i < mid.length; i++) t[32 + i] = mid[i];
        return t;
      }();
      var SAPB_BCODE = [
        20,
        119,
        243,
        212,
        187,
        113,
        35,
        208,
        3,
        255,
        71,
        147,
        85,
        170,
        102,
        145,
        242,
        136,
        107,
        153,
        191,
        203,
        50,
        26,
        25,
        217,
        167,
        130,
        34,
        73,
        162,
        81,
        226,
        183,
        51,
        113,
        139,
        159,
        93,
        1,
        68,
        112,
        174,
        17,
        239,
        40,
        240,
        13
      ];
      function sapbTranscode(str) {
        var out = [];
        for (var i = 0; i < str.length; i++) out.push(SAPB_TRANS[str.charCodeAt(i) & 255]);
        return out;
      }
      function sapbWaldorf(abcd, w, s) {
        var wlen = w.length, slen = s.length;
        var sum20 = (abcd[0] & 3) + (abcd[1] & 3) + (abcd[2] & 3) + (abcd[3] & 3) + (abcd[5] & 3);
        sum20 |= 32;
        var out = [], k;
        for (k = 0; k < sum20; k++) out[k] = 0;
        var i1 = 0, i2 = 0, i3 = 0;
        for (; i2 < sum20; i2 += 2) {
          if (i1 < wlen) {
            if (abcd[15 - i1] & 1) {
              out[i2] = SAPB_BCODE[48 - 1 - i1];
              i2++;
            }
            out[i2] = w[i1];
            i1++;
            i2++;
          }
          if (i3 < slen) {
            out[i2] = s[i3];
            i2++;
            i3++;
          }
          out[i2] = SAPB_BCODE[i2 - i1 - i3];
        }
        var res = [];
        for (k = 0; k < sum20; k++) res[k] = out[k] || 0;
        return res;
      }
      function verifySapB2(password, hash) {
        var m = /^([^$]+)\$([0-9A-Fa-f]{16})$/.exec(String(hash));
        if (!m) return false;
        var salt = m[1].toUpperCase(), want = m[2].toUpperCase(), word = String(password).toUpperCase();
        var wt = sapbTranscode(word), st = sapbTranscode(salt);
        var d1 = _waToBytes(CryptoJS2.MD5(_bytesToWA(wt.concat(st))));
        var d2 = _waToBytes(CryptoJS2.MD5(_bytesToWA(sapbWaldorf(d1, wt, st))));
        var a = ((d2[0] << 24 | d2[1] << 16 | d2[2] << 8 | d2[3]) ^ (d2[8] << 24 | d2[9] << 16 | d2[10] << 8 | d2[11])) >>> 0;
        var b = ((d2[4] << 24 | d2[5] << 16 | d2[6] << 8 | d2[7]) ^ (d2[12] << 24 | d2[13] << 16 | d2[14] << 8 | d2[15])) >>> 0;
        var out = (("0000000" + a.toString(16)).slice(-8) + ("0000000" + b.toString(16)).slice(-8)).toUpperCase();
        return out === want;
      }
      module.exports = { verifySapB: verifySapB2, verifySapG: verifySapG2 };
    }
  });

  // src/wpa.js
  var require_wpa = __commonJS({
    "src/wpa.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _hexToBytes = u._hexToBytes;
      var _bytesToHex = u._bytesToHex;
      var _bytesToWA = u._bytesToWA;
      var _waToBytes = u._waToBytes;
      function _hmac(hasher, keyBytes, msgBytes) {
        return _waToBytes(hasher(_bytesToWA(msgBytes), _bytesToWA(keyBytes)));
      }
      function _pmkFromPassword(password, essidBytes) {
        return _waToBytes(CryptoJS2.PBKDF2(String(password), _bytesToWA(essidBytes), { keySize: 8, iterations: 4096, hasher: CryptoJS2.algo.SHA1 }));
      }
      function _pmkFromHex(pmkHex) {
        return /^[0-9a-fA-F]{64}$/.test(String(pmkHex)) ? _hexToBytes(String(pmkHex)) : null;
      }
      function _pmkidOk(pmkBytes, macApHex, macStaHex, pmkidHex) {
        var msg = u._utf8Bytes("PMK Name").concat(_hexToBytes(macApHex)).concat(_hexToBytes(macStaHex));
        return _bytesToHex(_hmac(CryptoJS2.HmacSHA1, pmkBytes, msg).slice(0, 16)) === String(pmkidHex).toLowerCase();
      }
      function _prf512(pmkBytes, dataBytes) {
        var label = u._utf8Bytes("Pairwise key expansion"), out = [];
        for (var i = 0; i < 4; i++)
          out = out.concat(_hmac(CryptoJS2.HmacSHA1, pmkBytes, label.concat([0]).concat(dataBytes).concat([i])));
        return out.slice(0, 64);
      }
      function _cmpBytes(a, b) {
        for (var i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
        }
        return 0;
      }
      function _aesCmac(keyBytes, msgBytes) {
        var key = _bytesToWA(keyBytes);
        function enc(block16) {
          return _waToBytes(CryptoJS2.AES.encrypt(_bytesToWA(block16), key, { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding }).ciphertext);
        }
        function shl1(x2) {
          var o = new Array(16), carry = 0;
          for (var i2 = 15; i2 >= 0; i2--) {
            o[i2] = (x2[i2] << 1 | carry) & 255;
            carry = x2[i2] >> 7 & 1;
          }
          return { v: o, carry };
        }
        var L = enc(new Array(16).fill(0));
        var s1 = shl1(L), K1 = s1.v;
        if (s1.carry) K1[15] ^= 135;
        var s2 = shl1(K1), K2 = s2.v;
        if (s2.carry) K2[15] ^= 135;
        var n = Math.ceil(msgBytes.length / 16) || 1, i, last;
        if (msgBytes.length > 0 && msgBytes.length % 16 === 0) {
          last = msgBytes.slice((n - 1) * 16);
          for (i = 0; i < 16; i++) last[i] ^= K1[i];
        } else {
          last = msgBytes.slice((n - 1) * 16);
          last.push(128);
          while (last.length < 16) last.push(0);
          for (i = 0; i < 16; i++) last[i] ^= K2[i];
        }
        var x = new Array(16).fill(0);
        for (var b = 0; b < n - 1; b++) {
          for (i = 0; i < 16; i++) x[i] ^= msgBytes[b * 16 + i];
          x = enc(x);
        }
        for (i = 0; i < 16; i++) x[i] ^= last[i];
        return enc(x);
      }
      function _eapolMicOk(pmkBytes, macAp, macSta, anonce, snonce, eapol, keyver, wantMicHex) {
        var data = _cmpBytes(macAp, macSta) < 0 ? macAp.concat(macSta) : macSta.concat(macAp);
        data = data.concat(_cmpBytes(anonce, snonce) < 0 ? anonce.concat(snonce) : snonce.concat(anonce));
        var kck = _prf512(pmkBytes, data).slice(0, 16), mic;
        if (keyver === 1) mic = _hmac(CryptoJS2.HmacMD5, kck, eapol).slice(0, 16);
        else if (keyver === 2) mic = _hmac(CryptoJS2.HmacSHA1, kck, eapol).slice(0, 16);
        else mic = _aesCmac(kck, eapol).slice(0, 16);
        return _bytesToHex(mic) === String(wantMicHex).toLowerCase();
      }
      function _verifyHccapx(getPmk, hash) {
        var h = String(hash);
        if (!/^[0-9a-fA-F]+$/.test(h) || h.length < 786) return false;
        var b = _hexToBytes(h);
        if (b[0] !== 72 || b[1] !== 67 || b[2] !== 80 || b[3] !== 88) return false;
        var essidLen = b[9], essid = b.slice(10, 10 + essidLen);
        var keyver = b[42], keymic = b.slice(43, 59);
        var macAp = b.slice(59, 65), nonceAp = b.slice(65, 97);
        var macSta = b.slice(97, 103), nonceSta = b.slice(103, 135);
        var eapolLen = b[135] | b[136] << 8, eapol = b.slice(137, 137 + eapolLen);
        var pmk = getPmk(essid);
        if (!pmk) return false;
        return _eapolMicOk(pmk, macAp, macSta, nonceAp, nonceSta, eapol, keyver, _bytesToHex(keymic));
      }
      function _verifyWpaCombined(getPmk, hash) {
        var p = String(hash).split("*");
        if (p[0] !== "WPA") return false;
        if (p[1] === "01") {
          var pmk1 = getPmk(_hexToBytes(p[5] || ""));
          if (!pmk1) return false;
          return _pmkidOk(pmk1, p[3], p[4], p[2]);
        }
        if (p[1] === "02") {
          var essid = _hexToBytes(p[5] || ""), anonce = _hexToBytes(p[6] || ""), eapol = _hexToBytes(p[7] || "");
          var mp = parseInt(p[8], 16) || 0, keyver = mp & 7 || 2;
          var snonce = eapol.slice(81, 81 + 32);
          var pmk2 = getPmk(essid);
          if (!pmk2) return false;
          return _eapolMicOk(pmk2, _hexToBytes(p[3]), _hexToBytes(p[4]), anonce, snonce, eapol, keyver, p[2]);
        }
        return false;
      }
      function verifyWpa2(password, hash) {
        return _verifyWpaCombined(function(e) {
          return _pmkFromPassword(password, e);
        }, hash);
      }
      function verifyWpaPmk(password, hash) {
        return _verifyWpaCombined(function() {
          return _pmkFromHex(password);
        }, hash);
      }
      function verify16800(password, hash) {
        var p = String(hash).split(":");
        if (p.length < 4) return false;
        return _pmkidOk(_pmkFromPassword(password, _hexToBytes(p[3])), p[1], p[2], p[0]);
      }
      function verify16801(password, hash) {
        var p = String(hash).split(":");
        if (p.length < 3) return false;
        var pmk = _pmkFromHex(password);
        return pmk ? _pmkidOk(pmk, p[1], p[2], p[0]) : false;
      }
      function verify2500(password, hash) {
        return _verifyHccapx(function(e) {
          return _pmkFromPassword(password, e);
        }, hash);
      }
      function verify2501(password, hash) {
        return _verifyHccapx(function() {
          return _pmkFromHex(password);
        }, hash);
      }
      function genPmkid(pmkBytes, macApHex, macStaHex) {
        var msg = u._utf8Bytes("PMK Name").concat(_hexToBytes(macApHex)).concat(_hexToBytes(macStaHex));
        return _bytesToHex(_hmac(CryptoJS2.HmacSHA1, pmkBytes, msg).slice(0, 16));
      }
      module.exports = {
        verifyWpa: verifyWpa2,
        verifyWpaPmk,
        verify16800,
        verify16801,
        verify2500,
        verify2501,
        genPmkid,
        pmkFromPassword: _pmkFromPassword
      };
    }
  });

  // src/whirlpool.js
  var require_whirlpool = __commonJS({
    "src/whirlpool.js"(exports, module) {
      var _utf8Bytes = require_util()._utf8Bytes;
      var _M64 = (1n << 64n) - 1n;
      var MT0 = [
        0x18186018c07830d8n,
        0x23238c2305af4626n,
        0xc6c63fc67ef991b8n,
        0xe8e887e8136fcdfbn,
        0x878726874ca113cbn,
        0xb8b8dab8a9626d11n,
        0x0101040108050209n,
        0x4f4f214f426e9e0dn,
        0x3636d836adee6c9bn,
        0xa6a6a2a6590451ffn,
        0xd2d26fd2debdb90cn,
        0xf5f5f3f5fb06f70en,
        0x7979f979ef80f296n,
        0x6f6fa16f5fcede30n,
        0x91917e91fcef3f6dn,
        0x52525552aa07a4f8n,
        0x60609d6027fdc047n,
        0xbcbccabc89766535n,
        0x9b9b569baccd2b37n,
        0x8e8e028e048c018an,
        0xa3a3b6a371155bd2n,
        0x0c0c300c603c186cn,
        0x7b7bf17bff8af684n,
        0x3535d435b5e16a80n,
        0x1d1d741de8693af5n,
        0xe0e0a7e05347ddb3n,
        0xd7d77bd7f6acb321n,
        0xc2c22fc25eed999cn,
        0x2e2eb82e6d965c43n,
        0x4b4b314b627a9629n,
        0xfefedffea321e15dn,
        0x575741578216aed5n,
        0x15155415a8412abdn,
        0x7777c1779fb6eee8n,
        0x3737dc37a5eb6e92n,
        0xe5e5b3e57b56d79en,
        0x9f9f469f8cd92313n,
        0xf0f0e7f0d317fd23n,
        0x4a4a354a6a7f9420n,
        0xdada4fda9e95a944n,
        0x58587d58fa25b0a2n,
        0xc9c903c906ca8fcfn,
        0x2929a429558d527cn,
        0x0a0a280a5022145an,
        0xb1b1feb1e14f7f50n,
        0xa0a0baa0691a5dc9n,
        0x6b6bb16b7fdad614n,
        0x85852e855cab17d9n,
        0xbdbdcebd8173673cn,
        0x5d5d695dd234ba8fn,
        0x1010401080502090n,
        0xf4f4f7f4f303f507n,
        0xcbcb0bcb16c08bddn,
        0x3e3ef83eedc67cd3n,
        0x0505140528110a2dn,
        0x676781671fe6ce78n,
        0xe4e4b7e47353d597n,
        0x27279c2725bb4e02n,
        0x4141194132588273n,
        0x8b8b168b2c9d0ba7n,
        0xa7a7a6a7510153f6n,
        0x7d7de97dcf94fab2n,
        0x95956e95dcfb3749n,
        0xd8d847d88e9fad56n,
        0xfbfbcbfb8b30eb70n,
        0xeeee9fee2371c1cdn,
        0x7c7ced7cc791f8bbn,
        0x6666856617e3cc71n,
        0xdddd53dda68ea77bn,
        0x17175c17b84b2eafn,
        0x4747014702468e45n,
        0x9e9e429e84dc211an,
        0xcaca0fca1ec589d4n,
        0x2d2db42d75995a58n,
        0xbfbfc6bf9179632en,
        0x07071c07381b0e3fn,
        0xadad8ead012347acn,
        0x5a5a755aea2fb4b0n,
        0x838336836cb51befn,
        0x3333cc3385ff66b6n,
        0x636391633ff2c65cn,
        0x02020802100a0412n,
        0xaaaa92aa39384993n,
        0x7171d971afa8e2den,
        0xc8c807c80ecf8dc6n,
        0x19196419c87d32d1n,
        0x494939497270923bn,
        0xd9d943d9869aaf5fn,
        0xf2f2eff2c31df931n,
        0xe3e3abe34b48dba8n,
        0x5b5b715be22ab6b9n,
        0x88881a8834920dbcn,
        0x9a9a529aa4c8293en,
        0x262698262dbe4c0bn,
        0x3232c8328dfa64bfn,
        0xb0b0fab0e94a7d59n,
        0xe9e983e91b6acff2n,
        0x0f0f3c0f78331e77n,
        0xd5d573d5e6a6b733n,
        0x80803a8074ba1df4n,
        0xbebec2be997c6127n,
        0xcdcd13cd26de87ebn,
        0x3434d034bde46889n,
        0x48483d487a759032n,
        0xffffdbffab24e354n,
        0x7a7af57af78ff48dn,
        0x90907a90f4ea3d64n,
        0x5f5f615fc23ebe9dn,
        0x202080201da0403dn,
        0x6868bd6867d5d00fn,
        0x1a1a681ad07234can,
        0xaeae82ae192c41b7n,
        0xb4b4eab4c95e757dn,
        0x54544d549a19a8cen,
        0x93937693ece53b7fn,
        0x222288220daa442fn,
        0x64648d6407e9c863n,
        0xf1f1e3f1db12ff2an,
        0x7373d173bfa2e6ccn,
        0x12124812905a2482n,
        0x40401d403a5d807an,
        0x0808200840281048n,
        0xc3c32bc356e89b95n,
        0xecec97ec337bc5dfn,
        0xdbdb4bdb9690ab4dn,
        0xa1a1bea1611f5fc0n,
        0x8d8d0e8d1c830791n,
        0x3d3df43df5c97ac8n,
        0x97976697ccf1335bn,
        0x0000000000000000n,
        0xcfcf1bcf36d483f9n,
        0x2b2bac2b4587566en,
        0x7676c57697b3ece1n,
        0x8282328264b019e6n,
        0xd6d67fd6fea9b128n,
        0x1b1b6c1bd87736c3n,
        0xb5b5eeb5c15b7774n,
        0xafaf86af112943ben,
        0x6a6ab56a77dfd41dn,
        0x50505d50ba0da0ean,
        0x45450945124c8a57n,
        0xf3f3ebf3cb18fb38n,
        0x3030c0309df060adn,
        0xefef9bef2b74c3c4n,
        0x3f3ffc3fe5c37edan,
        0x55554955921caac7n,
        0xa2a2b2a2791059dbn,
        0xeaea8fea0365c9e9n,
        0x656589650fecca6an,
        0xbabad2bab9686903n,
        0x2f2fbc2f65935e4an,
        0xc0c027c04ee79d8en,
        0xdede5fdebe81a160n,
        0x1c1c701ce06c38fcn,
        0xfdfdd3fdbb2ee746n,
        0x4d4d294d52649a1fn,
        0x92927292e4e03976n,
        0x7575c9758fbceafan,
        0x06061806301e0c36n,
        0x8a8a128a249809aen,
        0xb2b2f2b2f940794bn,
        0xe6e6bfe66359d185n,
        0x0e0e380e70361c7en,
        0x1f1f7c1ff8633ee7n,
        0x6262956237f7c455n,
        0xd4d477d4eea3b53an,
        0xa8a89aa829324d81n,
        0x96966296c4f43152n,
        0xf9f9c3f99b3aef62n,
        0xc5c533c566f697a3n,
        0x2525942535b14a10n,
        0x59597959f220b2abn,
        0x84842a8454ae15d0n,
        0x7272d572b7a7e4c5n,
        0x3939e439d5dd72ecn,
        0x4c4c2d4c5a619816n,
        0x5e5e655eca3bbc94n,
        0x7878fd78e785f09fn,
        0x3838e038ddd870e5n,
        0x8c8c0a8c14860598n,
        0xd1d163d1c6b2bf17n,
        0xa5a5aea5410b57e4n,
        0xe2e2afe2434dd9a1n,
        0x616199612ff8c24en,
        0xb3b3f6b3f1457b42n,
        0x2121842115a54234n,
        0x9c9c4a9c94d62508n,
        0x1e1e781ef0663ceen,
        0x4343114322528661n,
        0xc7c73bc776fc93b1n,
        0xfcfcd7fcb32be54fn,
        0x0404100420140824n,
        0x51515951b208a2e3n,
        0x99995e99bcc72f25n,
        0x6d6da96d4fc4da22n,
        0x0d0d340d68391a65n,
        0xfafacffa8335e979n,
        0xdfdf5bdfb684a369n,
        0x7e7ee57ed79bfca9n,
        0x242490243db44819n,
        0x3b3bec3bc5d776fen,
        0xabab96ab313d4b9an,
        0xcece1fce3ed181f0n,
        0x1111441188552299n,
        0x8f8f068f0c890383n,
        0x4e4e254e4a6b9c04n,
        0xb7b7e6b7d1517366n,
        0xebeb8beb0b60cbe0n,
        0x3c3cf03cfdcc78c1n,
        0x81813e817cbf1ffdn,
        0x94946a94d4fe3540n,
        0xf7f7fbf7eb0cf31cn,
        0xb9b9deb9a1676f18n,
        0x13134c13985f268bn,
        0x2c2cb02c7d9c5851n,
        0xd3d36bd3d6b8bb05n,
        0xe7e7bbe76b5cd38cn,
        0x6e6ea56e57cbdc39n,
        0xc4c437c46ef395aan,
        0x03030c03180f061bn,
        0x565645568a13acdcn,
        0x44440d441a49885en,
        0x7f7fe17fdf9efea0n,
        0xa9a99ea921374f88n,
        0x2a2aa82a4d825467n,
        0xbbbbd6bbb16d6b0an,
        0xc1c123c146e29f87n,
        0x53535153a202a6f1n,
        0xdcdc57dcae8ba572n,
        0x0b0b2c0b58271653n,
        0x9d9d4e9d9cd32701n,
        0x6c6cad6c47c1d82bn,
        0x3131c43195f562a4n,
        0x7474cd7487b9e8f3n,
        0xf6f6fff6e309f115n,
        0x464605460a438c4cn,
        0xacac8aac092645a5n,
        0x89891e893c970fb5n,
        0x14145014a04428b4n,
        0xe1e1a3e15b42dfban,
        0x16165816b04e2ca6n,
        0x3a3ae83acdd274f7n,
        0x6969b9696fd0d206n,
        0x09092409482d1241n,
        0x7070dd70a7ade0d7n,
        0xb6b6e2b6d954716fn,
        0xd0d067d0ceb7bd1en,
        0xeded93ed3b7ec7d6n,
        0xcccc17cc2edb85e2n,
        0x424215422a578468n,
        0x98985a98b4c22d2cn,
        0xa4a4aaa4490e55edn,
        0x2828a0285d885075n,
        0x5c5c6d5cda31b886n,
        0xf8f8c7f8933fed6bn,
        0x8686228644a411c2n
      ];
      function _rotr(x, n) {
        var b = BigInt(n);
        return (x >> b | x << 64n - b) & _M64;
      }
      var MT = [MT0];
      for (_t = 1; _t < 8; _t++) MT[_t] = MT0.map(function(v) {
        return _rotr(v, 8 * _t);
      });
      var _t;
      var RC = [
        0x1823c6e887b8014fn,
        0x36a6d2f5796f9152n,
        0x60bc9b8ea30c7b35n,
        0x1de0d7c22e4bfe57n,
        0x157737e59ff04adan,
        0x58c9290ab1a06b85n,
        0xbd5d10f4cb3e0567n,
        0xe427418ba77d95d8n,
        0xfbee7c66dd17479en,
        0xca2dbf07ad5a8333n
      ];
      function F1(v0, v1, v2, v3, v4, v5, v6, v7) {
        return MT[0][Number(v0 >> 56n & 0xffn)] ^ MT[1][Number(v1 >> 48n & 0xffn)] ^ MT[2][Number(v2 >> 40n & 0xffn)] ^ MT[3][Number(v3 >> 32n & 0xffn)] ^ MT[4][Number(v4 >> 24n & 0xffn)] ^ MT[5][Number(v5 >> 16n & 0xffn)] ^ MT[6][Number(v6 >> 8n & 0xffn)] ^ MT[7][Number(v7 & 0xffn)];
      }
      function _rho(s) {
        var L = [];
        for (var i = 0; i < 8; i++) L[i] = F1(s[i], s[(i + 7) % 8], s[(i + 6) % 8], s[(i + 5) % 8], s[(i + 4) % 8], s[(i + 3) % 8], s[(i + 2) % 8], s[(i + 1) % 8]);
        return L;
      }
      function _transform(H, W) {
        var K = H.slice(), S = [], i, r;
        for (i = 0; i < 8; i++) S[i] = K[i] ^ W[i];
        for (r = 0; r < 10; r++) {
          K = _rho(K);
          K[0] ^= RC[r];
          var LS = _rho(S);
          for (i = 0; i < 8; i++) S[i] = LS[i] ^ K[i];
        }
        for (i = 0; i < 8; i++) H[i] = (H[i] ^ S[i] ^ W[i]) & _M64;
      }
      function whirlpoolHex(msg) {
        var H = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
        var padded = msg.slice(), bl = msg.length * 8;
        padded.push(128);
        while (padded.length % 64 !== 32) padded.push(0);
        var lenb = new Array(32).fill(0);
        for (var i = 31; i >= 24; i--) {
          lenb[i] = bl & 255;
          bl = Math.floor(bl / 256);
        }
        padded = padded.concat(lenb);
        for (var off = 0; off < padded.length; off += 64) {
          var W = [];
          for (var k = 0; k < 8; k++) {
            var w = 0n;
            for (var j = 0; j < 8; j++) w = w << 8n | BigInt(padded[off + k * 8 + j] & 255);
            W[k] = w;
          }
          _transform(H, W);
        }
        var out = "";
        for (k = 0; k < 8; k++) out += H[k].toString(16).padStart(16, "0");
        return out;
      }
      function verifyWhirlpool2(password, hash) {
        return whirlpoolHex(_utf8Bytes(password)) === String(hash).toLowerCase();
      }
      module.exports = { verifyWhirlpool: verifyWhirlpool2, whirlpoolHex };
    }
  });

  // src/electrum.js
  var require_electrum = __commonJS({
    "src/electrum.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _hexToBytes = u._hexToBytes;
      var _bytesToWA = u._bytesToWA;
      var _waToBytes = u._waToBytes;
      var _secpSharedCompressed = require_secp256k1()._secpSharedCompressed;
      function electrumKey(password, ephemeralBytes) {
        var priv = _waToBytes(CryptoJS2.PBKDF2(String(password), CryptoJS2.enc.Latin1.parse(""), { keySize: 16, iterations: 1024, hasher: CryptoJS2.algo.SHA512 }));
        var comp;
        try {
          comp = _secpSharedCompressed(priv, ephemeralBytes);
        } catch (e) {
          return null;
        }
        if (!comp) return null;
        return _waToBytes(CryptoJS2.SHA512(_bytesToWA(comp)));
      }
      function verifyElectrum217002(password, hash) {
        var m = /^\$electrum\$4\*([0-9a-fA-F]{66})\*([0-9a-fA-F]+)\*([0-9a-fA-F]{64})$/.exec(String(hash));
        if (!m) return false;
        var key = electrumKey(password, _hexToBytes(m[1]));
        if (!key) return false;
        return CryptoJS2.HmacSHA256(CryptoJS2.enc.Hex.parse(m[2]), _bytesToWA(key.slice(32, 64))).toString() === m[3].toLowerCase();
      }
      function verifyElectrum218002(password, hash) {
        var m = /^\$electrum\$5\*([0-9a-fA-F]{66})\*([0-9a-fA-F]+)\*[0-9a-fA-F]{64}$/.exec(String(hash));
        if (!m) return false;
        var key = electrumKey(password, _hexToBytes(m[1]));
        if (!key) return false;
        var dec = _waToBytes(CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: CryptoJS2.enc.Hex.parse(m[2]) }),
          _bytesToWA(key.slice(16, 32)),
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(key.slice(0, 16)) }
        ));
        return dec.length >= 3 && dec[0] === 120 && dec[1] === 156 && (dec[2] & 7) === 5;
      }
      function verifyElectrum166002(password, hash) {
        var m = /^\$electrum\$[123]\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})$/.exec(String(hash));
        if (!m) return false;
        var key = CryptoJS2.SHA256(CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(String(password))));
        var dec = CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: CryptoJS2.enc.Hex.parse(m[2]) }),
          key,
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: CryptoJS2.enc.Hex.parse(m[1]) }
        );
        var s = dec.toString(CryptoJS2.enc.Latin1);
        return s.length === 16 && /^[0-9a-f]+$/.test(s);
      }
      module.exports = { verifyElectrum16600: verifyElectrum166002, verifyElectrum21700: verifyElectrum217002, verifyElectrum21800: verifyElectrum218002 };
    }
  });

  // src/rar.js
  var require_rar = __commonJS({
    "src/rar.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToHex = u._bytesToHex;
      var _bytesToWA = u._bytesToWA;
      var _hexToBytes = u._hexToBytes;
      var RAR3_FIXED = _hexToBytes("c43d7b00400700000000000000000000");
      function rar3Key(password, saltBytes) {
        var unit = _waToBytes(CryptoJS2.enc.Utf16LE.parse(String(password))).concat(saltBytes);
        var ctx = CryptoJS2.algo.SHA1.create(), iv = [], seg = [], i, b;
        for (i = 0; i < 262144; i++) {
          for (b = 0; b < unit.length; b++) seg.push(unit[b]);
          seg.push(i & 255, i >> 8 & 255, i >> 16 & 255);
          if ((i & 16383) === 0) {
            ctx.update(_bytesToWA(seg));
            seg = [];
            iv.push(_waToBytes(ctx.clone().finalize())[19]);
          }
        }
        if (seg.length) ctx.update(_bytesToWA(seg));
        var k = _waToBytes(ctx.finalize()), key = [], w;
        for (w = 0; w < 4; w++) key.push(k[w * 4 + 3], k[w * 4 + 2], k[w * 4 + 1], k[w * 4]);
        return { key, iv };
      }
      function verifyRar3hp2(password, hash) {
        var m = /^\$RAR3\$\*0\*([0-9a-fA-F]{16})\*([0-9a-fA-F]{32})$/.exec(String(hash));
        if (!m) return false;
        var kd = rar3Key(password, _hexToBytes(m[1]));
        var enc = CryptoJS2.AES.encrypt(
          _bytesToWA(RAR3_FIXED),
          _bytesToWA(kd.key),
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(kd.iv) }
        ).ciphertext;
        return enc.toString(CryptoJS2.enc.Hex).substr(0, 32) === m[2].toLowerCase();
      }
      var _CRC_T = function() {
        var t = [], c, n, k;
        for (n = 0; n < 256; n++) {
          c = n;
          for (k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          t[n] = c >>> 0;
        }
        return t;
      }();
      function crc32(bytes) {
        var crc = 4294967295;
        for (var i = 0; i < bytes.length; i++) crc = crc >>> 8 ^ _CRC_T[(crc ^ bytes[i]) & 255];
        return (crc ^ 4294967295) >>> 0;
      }
      function verifyRar3p2(password, hash) {
        var m = /^\$RAR3\$\*1\*([0-9a-fA-F]{16})\*([0-9a-fA-F]{8})\*\d+\*(\d+)\*1\*([0-9a-fA-F]+)\*30$/.exec(String(hash));
        if (!m) return false;
        var kd = rar3Key(password, _hexToBytes(m[1]));
        var dec = _waToBytes(CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: _bytesToWA(_hexToBytes(m[4])) }),
          _bytesToWA(kd.key),
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(kd.iv) }
        ));
        var crc = crc32(dec.slice(0, parseInt(m[3], 10)));
        var swap = ((crc & 255) << 24 | (crc & 65280) << 8 | crc >>> 8 & 65280 | crc >>> 24 & 255) >>> 0;
        return ("0000000" + swap.toString(16)).slice(-8) === m[2].toLowerCase();
      }
      function verifyRar52(password, hash) {
        var m = /^\$rar5\$16\$([0-9a-fA-F]+)\$(\d+)\$[0-9a-fA-F]+\$8\$([0-9a-fA-F]{16})$/.exec(String(hash));
        if (!m) return false;
        var iter = (1 << parseInt(m[2], 10)) + 32;
        var dk = _waToBytes(CryptoJS2.PBKDF2(String(password), CryptoJS2.enc.Hex.parse(m[1]), { keySize: 8, iterations: iter, hasher: CryptoJS2.algo.SHA256 }));
        var out = [];
        for (var i = 0; i < 8; i++) out[i] = dk[i] ^ dk[8 + i] ^ dk[16 + i] ^ dk[24 + i];
        return _bytesToHex(out) === m[3].toLowerCase();
      }
      module.exports = { verifyRar5: verifyRar52, verifyRar3hp: verifyRar3hp2, verifyRar3p: verifyRar3p2, crc32 };
    }
  });

  // src/kdf.js
  var require_kdf = __commonJS({
    "src/kdf.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      require_md4();
      var _scrypt = require_scrypt()._scrypt;
      var _waToBytes = u._waToBytes;
      var _bytesToWA = u._bytesToWA;
      var _bytesToHex = u._bytesToHex;
      var _hexToBytes = u._hexToBytes;
      var _utf8Bytes = u._utf8Bytes;
      var _STD_B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var _CISCO_B64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      function _toCiscoB64(bytes) {
        var std = CryptoJS2.enc.Base64.stringify(_bytesToWA(bytes));
        var out = "";
        for (var i = 0; i < 43; i++) {
          var j = _STD_B64.indexOf(std[i]);
          out += j < 0 ? std[i] : _CISCO_B64[j];
        }
        return out;
      }
      function _b64ToBytes(s, ab64) {
        if (ab64) s = s.replace(/\./g, "+");
        while (s.length % 4 !== 0) s += "=";
        return _waToBytes(CryptoJS2.enc.Base64.parse(s));
      }
      function _pbkdf2(hasher, password, saltWA, iter, dkLen) {
        return _waToBytes(CryptoJS2.PBKDF2(String(password), saltWA, { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher })).slice(0, dkLen);
      }
      function verifyDjango(password, hash) {
        var m = /^pbkdf2_sha256\$(\d+)\$([^$]+)\$([A-Za-z0-9+/]+=*)$/.exec(String(hash));
        if (!m) return false;
        var want = _b64ToBytes(m[3], false);
        var dk = _pbkdf2(CryptoJS2.algo.SHA256, password, CryptoJS2.enc.Latin1.parse(m[2]), parseInt(m[1], 10), want.length);
        return _bytesToHex(dk) === _bytesToHex(want);
      }
      function verifyWeb2py(password, hash) {
        var m = /^pbkdf2\((\d+),(\d+),sha512\)\$([^$]+)\$([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var dk = _pbkdf2(CryptoJS2.algo.SHA512, password, CryptoJS2.enc.Latin1.parse(m[3]), parseInt(m[1], 10), parseInt(m[2], 10));
        return _bytesToHex(dk) === m[4].toLowerCase();
      }
      function verifyPbkdf1Sha1(password, hash) {
        var m = /^PBKDF1:sha1:(\d+):([A-Za-z0-9+/]+=*):([A-Za-z0-9+/]+=*)$/.exec(String(hash));
        if (!m) return false;
        var iter = parseInt(m[1], 10), salt = _b64ToBytes(m[2], false), want = _b64ToBytes(m[3], false);
        var t = CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(String(password)).concat(_bytesToWA(salt)));
        for (var i = 1; i < iter; i++) t = CryptoJS2.SHA1(t);
        return _waToBytes(t).slice(0, want.length).join(",") === want.join(",");
      }
      function makePasslibVerifier(hasher, tag) {
        var re = new RegExp("^\\$" + tag + "\\$(\\d+)\\$([A-Za-z0-9./]+)\\$([A-Za-z0-9./]+)$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m) return false;
          var salt = _b64ToBytes(m[2], true), want = _b64ToBytes(m[3], true);
          var dk = _pbkdf2(hasher, password, _bytesToWA(salt), parseInt(m[1], 10), want.length);
          return _bytesToHex(dk) === _bytesToHex(want);
        };
      }
      function verifyCiscoIos4(password, hash) {
        return _toCiscoB64(_waToBytes(CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(String(password))))) === String(hash);
      }
      function verifyCisco8(password, hash) {
        var m = /^\$8\$([^$]+)\$(.{43})$/.exec(String(hash));
        if (!m) return false;
        var dk = _pbkdf2(CryptoJS2.algo.SHA256, password, CryptoJS2.enc.Latin1.parse(m[1]), 2e4, 32);
        return _toCiscoB64(dk) === m[2];
      }
      function verifyCisco9(password, hash) {
        var m = /^\$9\$([^$]+)\$(.{43})$/.exec(String(hash));
        if (!m) return false;
        var dk = _scrypt(_utf8Bytes(String(password)), _utf8Bytes(m[1]), 16384, 1, 1, 32);
        return _toCiscoB64(dk) === m[2];
      }
      function makeSapCodvnH(hasher, tag, dgstLen) {
        var re = new RegExp("^\\{" + tag + ", (\\d+)\\}(.+)$");
        return function(password, hash) {
          var m = re.exec(String(hash));
          if (!m) return false;
          var iter = parseInt(m[1], 10), blob = _waToBytes(CryptoJS2.enc.Base64.parse(m[2]));
          if (blob.length < dgstLen) return false;
          var salt = blob.slice(dgstLen);
          var buf = _bytesToWA(salt);
          var pw = CryptoJS2.enc.Latin1.parse(String(password));
          for (var i = 0; i < iter; i++) buf = hasher(pw.clone().concat(buf));
          return _waToBytes(buf).join(",") === blob.slice(0, dgstLen).join(",");
        };
      }
      function verifyAzureSync(password, hash) {
        var m = /^v1;PPH1_MD4,([0-9a-fA-F]+),(\d+),([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var nt = CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(password))).toString().toUpperCase();
        var pwWA = CryptoJS2.enc.Utf16LE.parse(nt);
        var dk = _waToBytes(CryptoJS2.PBKDF2(pwWA, _bytesToWA(_hexToBytes(m[1])), { keySize: 8, iterations: parseInt(m[2], 10), hasher: CryptoJS2.algo.SHA256 })).slice(0, 32);
        return _bytesToHex(dk) === m[3].toLowerCase();
      }
      function verifyNetIqSha1(password, hash) {
        var m = /^\$pbkdf2-hmac-sha1\$(\d+)\$([0-9a-fA-F]+)\$([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var dk = _pbkdf2(CryptoJS2.algo.SHA1, password, _bytesToWA(_hexToBytes(m[2])), parseInt(m[1], 10), m[3].length / 2);
        return _bytesToHex(dk) === m[3].toLowerCase();
      }
      function verifyNetIqSha512(password, hash) {
        var m = /^\$pbkdf2-hmac-sha512\$(\d+)\.([0-9a-fA-F]+)\.([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var dk = _pbkdf2(CryptoJS2.algo.SHA512, password, _bytesToWA(_hexToBytes(m[2])), parseInt(m[1], 10), m[3].length / 2);
        return _bytesToHex(dk) === m[3].toLowerCase();
      }
      var _verifyMD5CRYPT = require_crypt().verifyMD5CRYPT;
      function verifyJuniper(password, hash) {
        var blob;
        try {
          blob = _waToBytes(CryptoJS2.enc.Base64.parse(String(hash)));
        } catch (e) {
          return false;
        }
        if (blob.length < 76) return false;
        var iv = _bytesToWA(blob.slice(0, 12).concat([0, 0, 0, 0]));
        var ct = _bytesToWA(blob.slice(12, 76));
        var key = CryptoJS2.enc.Hex.parse("a6707a7e8df91059dea70ae52f9c2442");
        var pt = _waToBytes(CryptoJS2.AES.decrypt({ ciphertext: ct }, key, { iv, mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }));
        var s = "";
        for (var i = 0; i < 34 && i < pt.length; i++) s += String.fromCharCode(pt[i]);
        return /^\$1\$danastre\$/.test(s) && _verifyMD5CRYPT(String(password), s);
      }
      function verifyRedHat389(password, hash) {
        var m = /^\{PBKDF2_SHA256\}(.+)$/.exec(String(hash));
        if (!m) return false;
        var blob = _waToBytes(CryptoJS2.enc.Base64.parse(m[1]));
        if (blob.length <= 4 + 256) return false;
        var iter = (blob[0] << 24 | blob[1] << 16 | blob[2] << 8 | blob[3]) >>> 0;
        var want = blob.slice(blob.length - 256), salt = blob.slice(4, blob.length - 256);
        var dk = _pbkdf2(CryptoJS2.algo.SHA256, password, _bytesToWA(salt), iter, 256);
        return _bytesToHex(dk) === _bytesToHex(want);
      }
      module.exports = {
        _toCiscoB64,
        verifyCiscoIos4,
        verifyDjango,
        verifyWeb2py,
        verifyPbkdf1Sha1,
        verifyCisco8,
        verifyCisco9,
        verifyAzureSync,
        verifyNetIqSha1,
        verifyNetIqSha512,
        verifyRedHat389,
        verifyJuniper,
        verifySapCodvnH1: makeSapCodvnH(CryptoJS2.SHA1, "x-issha", 20),
        verifySapCodvnH512: makeSapCodvnH(CryptoJS2.SHA512, "x-isSHA512", 64),
        verifyPasslibSha1: makePasslibVerifier(CryptoJS2.algo.SHA1, "pbkdf2"),
        verifyPasslibSha256: makePasslibVerifier(CryptoJS2.algo.SHA256, "pbkdf2-sha256"),
        verifyPasslibSha512: makePasslibVerifier(CryptoJS2.algo.SHA512, "pbkdf2-sha512")
      };
    }
  });

  // src/des.js
  var require_des = __commonJS({
    "src/des.js"(exports, module) {
      var ITOA64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];
      var FP = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];
      var E = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1];
      var P = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
      var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
      var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
      var SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
      var SBOX = [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
      ];
      function _permute(bits, table) {
        var out = new Array(table.length);
        for (var i = 0; i < table.length; i++) out[i] = bits[table[i] - 1];
        return out;
      }
      function _keySchedule(keyBits) {
        var cd = _permute(keyBits, PC1), c = cd.slice(0, 28), d = cd.slice(28, 56), sub = [];
        for (var r = 0; r < 16; r++) {
          var s = SHIFTS[r];
          c = c.slice(s).concat(c.slice(0, s));
          d = d.slice(s).concat(d.slice(0, s));
          sub.push(_permute(c.concat(d), PC2));
        }
        return sub;
      }
      function _desCrypt(block, sub, salt, count) {
        var b = _permute(block, IP), L = b.slice(0, 32), R = b.slice(32, 64), i, r, k;
        for (var c = 0; c < count; c++) {
          for (r = 0; r < 16; r++) {
            var er = _permute(R, E);
            for (i = 0; i < 24; i++) if (salt >> i & 1) {
              var t = er[i];
              er[i] = er[i + 24];
              er[i + 24] = t;
            }
            for (k = 0; k < 48; k++) er[k] ^= sub[r][k];
            var out32 = [];
            for (var sb = 0; sb < 8; sb++) {
              var six = er.slice(sb * 6, sb * 6 + 6);
              var row = six[0] << 1 | six[5], col = six[1] << 3 | six[2] << 2 | six[3] << 1 | six[4];
              var v = SBOX[sb][row * 16 + col];
              out32.push(v >> 3 & 1, v >> 2 & 1, v >> 1 & 1, v & 1);
            }
            var f = _permute(out32, P), nR = new Array(32);
            for (k = 0; k < 32; k++) nR[k] = L[k] ^ f[k];
            L = R;
            R = nR;
          }
          var tmp = L;
          L = R;
          R = tmp;
        }
        return _permute(L.concat(R), FP);
      }
      function _bytesToKeyBits(kb) {
        var bits = new Array(64);
        for (var j = 0; j < 8; j++) for (var k = 0; k < 8; k++) bits[j * 8 + k] = kb[j] >> 7 - k & 1;
        return bits;
      }
      function _blockToB64(bits) {
        var v = bits.slice();
        v.push(0, 0);
        var out = "";
        for (var i = 0; i < 11; i++) {
          var idx = 0;
          for (var b = 0; b < 6; b++) idx = idx << 1 | v[i * 6 + b];
          out += ITOA64[idx];
        }
        return out;
      }
      function _a64(ch) {
        return ITOA64.indexOf(ch);
      }
      function verifyDescrypt(password, hash) {
        var h = String(hash);
        if (!/^[.\/0-9A-Za-z]{13}$/.test(h)) return false;
        var s0 = _a64(h[0]), s1 = _a64(h[1]);
        if (s0 < 0 || s1 < 0) return false;
        var salt = s0 | s1 << 6;
        var kb = new Array(8), p = String(password);
        for (var j = 0; j < 8; j++) kb[j] = (j < p.length ? (p.charCodeAt(j) & 127) << 1 : 0) & 255;
        var sub = _keySchedule(_bytesToKeyBits(kb));
        var res = _desCrypt(new Array(64).fill(0), sub, salt, 25);
        return h.substring(0, 2) + _blockToB64(res) === h;
      }
      function verifyBsdi(password, hash) {
        var h = String(hash);
        var m = /^_([.\/0-9A-Za-z]{4})([.\/0-9A-Za-z]{4})([.\/0-9A-Za-z]{11})$/.exec(h);
        if (!m) return false;
        var iter = 0, salt = 0, i;
        for (i = 0; i < 4; i++) iter |= _a64(m[1][i]) << 6 * i;
        for (i = 0; i < 4; i++) salt |= _a64(m[2][i]) << 6 * i;
        var p = String(password), idx = 0, kb = new Array(8), j;
        for (j = 0; j < 8; j++) kb[j] = (idx < p.length ? (p.charCodeAt(idx++) & 127) << 1 : 0) & 255;
        var sub = _keySchedule(_bytesToKeyBits(kb));
        while (idx < p.length) {
          var enc = _desCrypt(_bytesToKeyBits(kb), sub, 0, 1);
          for (j = 0; j < 8; j++) {
            var byte = 0;
            for (var b = 0; b < 8; b++) byte = byte << 1 | enc[j * 8 + b];
            kb[j] = byte;
          }
          for (j = 0; j < 8 && idx < p.length; j++) kb[j] ^= (p.charCodeAt(idx++) & 127) << 1;
          sub = _keySchedule(_bytesToKeyBits(kb));
        }
        var res = _desCrypt(new Array(64).fill(0), sub, salt, iter);
        return "_" + m[1] + m[2] + _blockToB64(res) === h;
      }
      function _desBlock(sub, ptBytes) {
        var bits = new Array(64), i, k;
        for (i = 0; i < 8; i++) for (k = 0; k < 8; k++) bits[i * 8 + k] = ptBytes[i] >> 7 - k & 1;
        var out = _desCrypt(bits, sub, 0, 1), bytes = new Array(8);
        for (i = 0; i < 8; i++) {
          var b = 0;
          for (k = 0; k < 8; k++) b = b << 1 | out[i * 8 + k];
          bytes[i] = b;
        }
        return bytes;
      }
      function desEncryptBlock(keyBytes, ptBytes) {
        return _desBlock(_keySchedule(_bytesToKeyBits(keyBytes)), ptBytes);
      }
      function desDecryptBlock(keyBytes, ptBytes) {
        return _desBlock(_keySchedule(_bytesToKeyBits(keyBytes)).slice().reverse(), ptBytes);
      }
      function _lmKey(s) {
        var key = [
          s[0] >> 1,
          (s[0] & 1) << 6 | s[1] >> 2,
          (s[1] & 3) << 5 | s[2] >> 3,
          (s[2] & 7) << 4 | s[3] >> 4,
          (s[3] & 15) << 3 | s[4] >> 5,
          (s[4] & 31) << 2 | s[5] >> 6,
          (s[5] & 63) << 1 | s[6] >> 7,
          s[6] & 127
        ];
        for (var i = 0; i < 8; i++) key[i] = key[i] << 1 & 255;
        return key;
      }
      function lmHashHalf(pw7) {
        var s = pw7.slice(0, 7);
        while (s.length < 7) s.push(0);
        return desEncryptBlock(_lmKey(s), [75, 71, 83, 33, 64, 35, 36, 37]);
      }
      function descryptCompute(password, salt2) {
        var salt = (_a64(salt2[0]) < 0 ? 0 : _a64(salt2[0])) | (_a64(salt2[1]) < 0 ? 0 : _a64(salt2[1])) << 6;
        var kb = new Array(8), p = String(password);
        for (var j = 0; j < 8; j++) kb[j] = (j < p.length ? (p.charCodeAt(j) & 127) << 1 : 0) & 255;
        var sub = _keySchedule(_bytesToKeyBits(kb));
        return salt2 + _blockToB64(_desCrypt(new Array(64).fill(0), sub, salt, 25));
      }
      module.exports = { verifyDescrypt, verifyBsdi, desEncryptBlock, desDecryptBlock, lmHashHalf, descryptCompute };
    }
  });

  // src/sm3.js
  var require_sm3 = __commonJS({
    "src/sm3.js"(exports, module) {
      var _IV = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214];
      function _rotl(x, n) {
        n &= 31;
        return (x << n | x >>> 32 - n) >>> 0;
      }
      function _p0(x) {
        return (x ^ _rotl(x, 9) ^ _rotl(x, 17)) >>> 0;
      }
      function _p1(x) {
        return (x ^ _rotl(x, 15) ^ _rotl(x, 23)) >>> 0;
      }
      function sm3Bytes(msg) {
        var len = msg.length, bitLen = len * 8;
        var padded = msg.slice();
        padded.push(128);
        while (padded.length % 64 !== 56) padded.push(0);
        for (var s = 56; s >= 0; s -= 8) padded.push(Math.floor(bitLen / Math.pow(2, s)) & 255);
        var V = _IV.slice();
        var W = new Array(68), W1 = new Array(64), j, i;
        for (var blk = 0; blk < padded.length; blk += 64) {
          for (j = 0; j < 16; j++)
            W[j] = (padded[blk + j * 4] << 24 | padded[blk + j * 4 + 1] << 16 | padded[blk + j * 4 + 2] << 8 | padded[blk + j * 4 + 3]) >>> 0;
          for (j = 16; j < 68; j++)
            W[j] = (_p1((W[j - 16] ^ W[j - 9] ^ _rotl(W[j - 3], 15)) >>> 0) ^ _rotl(W[j - 13], 7) ^ W[j - 6]) >>> 0;
          for (j = 0; j < 64; j++) W1[j] = (W[j] ^ W[j + 4]) >>> 0;
          var A = V[0], B = V[1], C = V[2], D = V[3], E = V[4], F = V[5], G = V[6], H = V[7];
          for (j = 0; j < 64; j++) {
            var Tj = j < 16 ? 2043430169 : 2055708042;
            var SS1 = _rotl(_rotl(A, 12) + E + _rotl(Tj, j) >>> 0, 7);
            var SS2 = (SS1 ^ _rotl(A, 12)) >>> 0;
            var FF = j < 16 ? A ^ B ^ C : A & B | A & C | B & C;
            var GG = j < 16 ? E ^ F ^ G : E & F | ~E & G;
            var TT1 = (FF >>> 0) + D + SS2 + W1[j] >>> 0;
            var TT2 = (GG >>> 0) + H + SS1 + W[j] >>> 0;
            D = C;
            C = _rotl(B, 9);
            B = A;
            A = TT1;
            H = G;
            G = _rotl(F, 19);
            F = E;
            E = _p0(TT2);
          }
          V[0] = (V[0] ^ A) >>> 0;
          V[1] = (V[1] ^ B) >>> 0;
          V[2] = (V[2] ^ C) >>> 0;
          V[3] = (V[3] ^ D) >>> 0;
          V[4] = (V[4] ^ E) >>> 0;
          V[5] = (V[5] ^ F) >>> 0;
          V[6] = (V[6] ^ G) >>> 0;
          V[7] = (V[7] ^ H) >>> 0;
        }
        var out = [];
        for (i = 0; i < 8; i++) {
          out.push(V[i] >>> 24 & 255, V[i] >>> 16 & 255, V[i] >>> 8 & 255, V[i] & 255);
        }
        return out;
      }
      function _shaCryptRaw(H, bs, key, salt, rounds) {
        var i, b = H(key.concat(salt).concat(key));
        var tmp = key.concat(salt);
        for (i = key.length; i > 0; i -= bs) tmp = tmp.concat(i > bs ? b : b.slice(0, i));
        for (i = key.length; i > 0; i >>= 1) tmp = tmp.concat(i & 1 ? b : key);
        var A = H(tmp);
        var dpin = [];
        for (i = 0; i < key.length; i++) dpin = dpin.concat(key);
        var dp = H(dpin), P = [];
        for (i = key.length; i > 0; i -= bs) P = P.concat(i > bs ? dp : dp.slice(0, i));
        var dsin = [], cnt = 16 + A[0];
        for (i = 0; i < cnt; i++) dsin = dsin.concat(salt);
        var ds = H(dsin), S = [];
        for (i = salt.length; i > 0; i -= bs) S = S.concat(i > bs ? ds : ds.slice(0, i));
        var digest = A;
        for (i = 0; i < rounds; i++) {
          var c = i & 1 ? P.slice() : digest.slice();
          if (i % 3) c = c.concat(S);
          if (i % 7) c = c.concat(P);
          c = c.concat(i & 1 ? digest : P);
          digest = H(c);
        }
        return digest;
      }
      var ITOA64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      function _to64(v, n) {
        var s = "";
        while (--n >= 0) {
          s += ITOA64[v & 63];
          v >>= 6;
        }
        return s;
      }
      function _to64crypt256(c) {
        function t(a, b, d) {
          return _to64(c[a] << 16 | c[b] << 8 | c[d], 4);
        }
        return t(0, 10, 20) + t(21, 1, 11) + t(12, 22, 2) + t(3, 13, 23) + t(24, 4, 14) + t(15, 25, 5) + t(6, 16, 26) + t(27, 7, 17) + t(18, 28, 8) + t(9, 19, 29) + _to64(c[31] << 8 | c[30], 3);
      }
      function _strBytes(s) {
        var b = [];
        for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 255);
        return b;
      }
      function verifySm3crypt(password, hash) {
        var m = /^\$sm3\$(?:rounds=(\d+)\$)?([^$]+)\$([.\/0-9A-Za-z]{43})$/.exec(String(hash));
        if (!m) return false;
        var rounds = m[1] ? parseInt(m[1], 10) : 5e3;
        var dig = _shaCryptRaw(sm3Bytes, 32, _strBytes(String(password)), _strBytes(m[2]), rounds);
        return _to64crypt256(dig) === m[3];
      }
      function genSm3crypt(password, salt, rounds) {
        rounds = rounds || 5e3;
        var dig = _shaCryptRaw(sm3Bytes, 32, _strBytes(String(password)), _strBytes(salt), rounds);
        return "$sm3$" + salt + "$" + _to64crypt256(dig);
      }
      module.exports = { sm3Bytes, verifySm3crypt, genSm3crypt };
    }
  });

  // src/coins.js
  var require_coins = __commonJS({
    "src/coins.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _keccak = require_keccak()._keccak;
      var _scrypt = require_scrypt()._scrypt;
      var _gcmTagOk2 = require_gcm()._gcmTagOk;
      var _hexToBytes = u._hexToBytes;
      var _bytesToHex = u._bytesToHex;
      var _bytesToWA = u._bytesToWA;
      var _waToBytes = u._waToBytes;
      var _utf8Bytes = u._utf8Bytes;
      function _keccak256(bytes) {
        return _keccak(bytes, 136, 32, 1);
      }
      function _pbkdf2(hasher, passStr, saltBytes, iter, dkLen) {
        return _waToBytes(CryptoJS2.PBKDF2(String(passStr), _bytesToWA(saltBytes), { keySize: Math.ceil(dkLen / 4), iterations: iter, hasher })).slice(0, dkLen);
      }
      function _b64(s) {
        return _waToBytes(CryptoJS2.enc.Base64.parse(String(s)));
      }
      function _aesCbcDec(keyBytes, ivBytes, ctBytes) {
        return _waToBytes(CryptoJS2.AES.decrypt({ ciphertext: _bytesToWA(ctBytes) }, _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }));
      }
      function _allPrintable(bytes) {
        for (var i = 0; i < bytes.length; i++) if (bytes[i] < 32 || bytes[i] > 126) return false;
        return true;
      }
      function verifyBitShares(password, hash) {
        return CryptoJS2.SHA512(CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(String(password)))).toString() === String(hash).toLowerCase();
      }
      function verifyEthereumPbkdf2(password, hash) {
        var m = /^\$ethereum\$p\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var dk = _pbkdf2(CryptoJS2.algo.SHA256, password, _hexToBytes(m[2]), parseInt(m[1], 10), 32);
        return _bytesToHex(_keccak256(dk.slice(16, 32).concat(_hexToBytes(m[3])))) === m[4].toLowerCase();
      }
      function verifyEthereumScrypt(password, hash) {
        var m = /^\$ethereum\$s\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var dk = _scrypt(_utf8Bytes(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
        return _bytesToHex(_keccak256(dk.slice(16, 32).concat(_hexToBytes(m[5])))) === m[6].toLowerCase();
      }
      function verifyExodus(password, hash) {
        var m = /^EXODUS:(\d+):(\d+):(\d+):([^:]+):([^:]+):([^:]+):([^:]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _scrypt(_utf8Bytes(String(password)), _b64(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
        return _gcmTagOk2(key, _b64(m[5]), _b64(m[6]).concat(_b64(m[7])));
      }
      function verifyMetamaskMobile(password, hash) {
        var m = /^\$metamaskMobile\$([^$]+)\$([0-9a-fA-F]{32})\$([^$]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _pbkdf2(CryptoJS2.algo.SHA512, password, _utf8Bytes(m[1]), 5e3, 32);
        return _allPrintable(_aesCbcDec(key, _hexToBytes(m[2]), _b64(m[3])));
      }
      function verifyStellar(password, hash) {
        var m = /^\$stellar\$([^$]+)\$([^$]+)\$([^$]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _pbkdf2(CryptoJS2.algo.SHA256, password, _b64(m[1]), 4096, 32);
        return _gcmTagOk2(key, _b64(m[2]), _b64(m[3]));
      }
      function _utf16be(s) {
        var b = [];
        for (var i = 0; i < s.length; i++) {
          var c = s.charCodeAt(i);
          b.push(c >> 8 & 255, c & 255);
        }
        return b;
      }
      function verifyBisq(password, hash) {
        var m = /^\$bisq\$3\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _scrypt(_utf16be(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
        var blob = _hexToBytes(m[5]);
        var pt = _aesCbcDec(key, blob.slice(0, 16), blob.slice(16, 32));
        for (var i = 0; i < 16; i++) if (pt[i] !== 16) return false;
        return true;
      }
      function verifyTerra(password, hash) {
        var m = /^([0-9a-fA-F]{32})([0-9a-fA-F]{32})([A-Za-z0-9+/=]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _pbkdf2(CryptoJS2.algo.SHA1, password, _hexToBytes(m[1]), 100, 32);
        var pt = _aesCbcDec(key, _hexToBytes(m[2]), _b64(m[3]));
        if (pt.length < 16) return false;
        for (var i = pt.length - 16; i < pt.length; i++) if (pt[i] !== 16) return false;
        return true;
      }
      function _aesOfbDec(keyBytes, ivBytes, ctBytes) {
        return _waToBytes(CryptoJS2.AES.decrypt({ ciphertext: _bytesToWA(ctBytes) }, _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS2.mode.OFB, padding: CryptoJS2.pad.NoPadding }));
      }
      function _md5bytes(bytes) {
        return _waToBytes(CryptoJS2.MD5(_bytesToWA(bytes)));
      }
      function _asciiEq(bytes, off, str) {
        for (var i = 0; i < str.length; i++) if (bytes[off + i] !== str.charCodeAt(i)) return false;
        return true;
      }
      function verifyMultibitClassicScrypt(password, hash) {
        var m = /^\$multibit\$3\*(\d+)\*(\d+)\*(\d+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _scrypt(_utf16be(String(password)), _hexToBytes(m[4]), parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), 32);
        var blob = _hexToBytes(m[5]), pt = _aesCbcDec(key, blob.slice(0, 16), blob.slice(16, 32));
        for (var i = 0; i < 16; i++) if (pt[i] !== 16) return false;
        return true;
      }
      var _BITCOINJ = ".abcdefghijklmnopqrstuvwxyz";
      function verifyMultibitHd(password, hash) {
        var m = /^\$multibit\$2\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})\*([0-9a-fA-F]{32})$/.exec(String(hash));
        if (!m) return false;
        var key = _scrypt(_utf16be(String(password)), _hexToBytes("3551038075a3b0c5"), 16384, 8, 1, 32);
        var pt = _aesCbcDec(key, _hexToBytes(m[1]), _hexToBytes(m[2]));
        if (pt[0] !== 10 || pt[1] >= 128 || !_asciiEq(pt, 2, "org.")) return false;
        for (var i = 6; i < 14; i++) if (_BITCOINJ.indexOf(String.fromCharCode(pt[i])) < 0) return false;
        return true;
      }
      function verifyBlockchainLegacy(password, hash) {
        var m = /^\$blockchain\$\d+\$([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var all = _hexToBytes(m[1]), salt = all.slice(0, 16), enc = all.slice(16);
        var key = _pbkdf2(CryptoJS2.algo.SHA1, password, salt, 1, 32);
        var pt = _aesOfbDec(key, salt, enc.slice(0, 16));
        return _asciiEq(pt, 0, '{\n"guid" : "');
      }
      function verifyMultibitMd5(password, hash) {
        var m = /^\$multibit\$1\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var ws = _utf8Bytes(String(password)).concat(_hexToBytes(m[1]));
        var key1 = _md5bytes(ws), key2 = _md5bytes(key1.concat(ws)), iv = _md5bytes(key2.concat(ws));
        var pt = _aesCbcDec(key1.concat(key2), iv, _hexToBytes(m[2]).slice(0, 16));
        var f = pt[0];
        return f === 75 || f === 76 || f === 81 || f === 53 || f === 35 || f === 10;
      }
      function _aesCbcEnc(keyBytes, ivBytes, ptBytes) {
        return _waToBytes(CryptoJS2.AES.encrypt(_bytesToWA(ptBytes), _bytesToWA(keyBytes), { iv: _bytesToWA(ivBytes), mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }).ciphertext);
      }
      function _aesEcbEnc(keyBytes, ptBytes) {
        return _waToBytes(CryptoJS2.AES.encrypt(_bytesToWA(ptBytes), _bytesToWA(keyBytes), { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding }).ciphertext);
      }
      function verifyEthereumPresale(password, hash) {
        var m = /^\$ethereum\$w\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var blob = _hexToBytes(m[1]), iv = blob.slice(0, 16), enc = blob.slice(16);
        var key = _pbkdf2(CryptoJS2.algo.SHA256, password, _utf8Bytes(String(password)), 2e3, 16);
        var seed = _aesCbcDec(key, iv, enc);
        var pad = seed[seed.length - 1];
        if (pad >= 1 && pad <= 16) seed = seed.slice(0, seed.length - pad);
        return _bytesToHex(_keccak256(seed.concat([2]))).substr(0, 32) === m[3].toLowerCase();
      }
      function verifyKnx(password, hash) {
        var m = /^\$knx-ip-secure-device-authentication-code\$\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)$/.exec(String(hash));
        if (!m) return false;
        var key = _pbkdf2(CryptoJS2.algo.SHA256, password, _utf8Bytes("device-authentication-code.1.secure.ip.knx.org"), 65536, 16);
        var ad = _hexToBytes("061009520038").concat(_hexToBytes(m[1])).concat(_hexToBytes(m[2]));
        var unpadded = [ad.length >> 8 & 255, ad.length & 255].concat(ad);
        while (unpadded.length % 16 !== 0) unpadded.push(0);
        var blocks = new Array(16).fill(0).concat(unpadded);
        var ct = _aesCbcEnc(key, new Array(16).fill(0), blocks);
        var yn = ct.slice(ct.length - 16);
        var s0 = _aesEcbEnc(key, _hexToBytes("0000000000000000000000000000ff00"));
        var mac = [];
        for (var i = 0; i < 16; i++) mac.push(yn[i] ^ s0[i]);
        return _bytesToHex(mac) === m[3].toLowerCase();
      }
      function verifyDogechain(password, hash) {
        var m = /^\$dogechain\$\d\*(\d+)\*([A-Za-z0-9+/=]+)\*([A-Za-z0-9+/=]+)$/.exec(String(hash));
        if (!m) return false;
        var pwB64 = CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(String(password))).toString(CryptoJS2.enc.Base64);
        var key = _pbkdf2(CryptoJS2.algo.SHA256, pwB64, _b64(m[3]), parseInt(m[1], 10), 32);
        var payload = _b64(m[2]);
        if (payload.length < 48) return false;
        var pt = _aesCbcDec(key, payload.slice(0, 16), payload.slice(16, payload.length - 16));
        for (var i = 0; i < pt.length; i++) if (pt[i] & 128) return false;
        return true;
      }
      function verifyMega(password, hash) {
        var m = /^P!([A-Za-z0-9_-]+)$/.exec(String(hash));
        if (!m) return false;
        var s = m[1].replace(/-/g, "+").replace(/_/g, "/");
        while (s.length % 4 !== 0) s += "=";
        var data = _waToBytes(CryptoJS2.enc.Base64.parse(s));
        if (data.length < 88 || data[0] !== 2) return false;
        var salt = data.slice(8, 40), macTag = data.slice(data.length - 32), hmacced = data.slice(0, data.length - 32);
        var derived = _waToBytes(CryptoJS2.PBKDF2(String(password), _bytesToWA(salt), { keySize: 16, iterations: 1e5, hasher: CryptoJS2.algo.SHA512 }));
        var mac = _waToBytes(CryptoJS2.HmacSHA256(_bytesToWA(hmacced), _bytesToWA(derived.slice(32, 64))));
        return _bytesToHex(mac) === _bytesToHex(macTag);
      }
      module.exports = {
        verifyBitShares,
        verifyEthereumPbkdf2,
        verifyEthereumScrypt,
        verifyExodus,
        verifyMetamaskMobile,
        verifyStellar,
        verifyBisq,
        verifyTerra,
        verifyMultibitClassicScrypt,
        verifyMultibitHd,
        verifyBlockchainLegacy,
        verifyMultibitMd5,
        verifyEthereumPresale,
        verifyKnx,
        verifyDogechain,
        verifyMega,
        _keccak256,
        _pbkdf2,
        _b64,
        _aesCbcDec,
        _allPrintable
      };
    }
  });

  // src/inflate.js
  var require_inflate = __commonJS({
    "src/inflate.js"(exports, module) {
      var _LEN_BASE = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
      var _LEN_EXTRA = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
      var _DIST_BASE = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
      var _DIST_EXTRA = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
      var _CLC_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      function _buildHuffman(lengths) {
        var maxLen = 0, i;
        for (i = 0; i < lengths.length; i++) if (lengths[i] > maxLen) maxLen = lengths[i];
        var blCount = new Array(maxLen + 1).fill(0);
        for (i = 0; i < lengths.length; i++) blCount[lengths[i]]++;
        blCount[0] = 0;
        var nextCode = new Array(maxLen + 1).fill(0), code = 0;
        for (var bits = 1; bits <= maxLen; bits++) {
          code = code + blCount[bits - 1] << 1;
          nextCode[bits] = code;
        }
        var map = {};
        for (i = 0; i < lengths.length; i++) if (lengths[i]) map[lengths[i] << 16 | nextCode[lengths[i]]++] = i;
        return { map, maxLen };
      }
      var _FIXED_LIT = function() {
        var l = [];
        for (var i = 0; i < 144; i++) l[i] = 8;
        for (; i < 256; i++) l[i] = 9;
        for (; i < 280; i++) l[i] = 7;
        for (; i < 288; i++) l[i] = 8;
        return _buildHuffman(l);
      }();
      var _FIXED_DIST = _buildHuffman(new Array(30).fill(5));
      function inflateRaw(input, maxOut) {
        var out = [], pos = 0, bitBuf = 0, bitCnt = 0;
        var cap = maxOut != null && maxOut >= 0 ? maxOut + 16 : 67108864;
        function getBit() {
          if (bitCnt === 0) {
            if (pos >= input.length) throw new Error("inflate: eof");
            bitBuf = input[pos++] | 0;
            bitCnt = 8;
          }
          var b = bitBuf & 1;
          bitBuf >>= 1;
          bitCnt--;
          return b;
        }
        function getBits(n2) {
          var v = 0;
          for (var i2 = 0; i2 < n2; i2++) v |= getBit() << i2;
          return v;
        }
        function decode(h) {
          var code = 0, len = 0;
          while (len <= h.maxLen) {
            code = code << 1 | getBit();
            len++;
            var s2 = h.map[len << 16 | code];
            if (s2 !== void 0) return s2;
          }
          throw new Error("inflate: bad code");
        }
        var bfinal, i, k;
        do {
          bfinal = getBit();
          var btype = getBits(2);
          if (btype === 0) {
            bitCnt = 0;
            var blen = input[pos] | input[pos + 1] << 8;
            pos += 4;
            if (pos + blen > input.length || out.length + blen > cap) throw new Error("inflate: eof");
            for (k = 0; k < blen; k++) out.push(input[pos++] & 255);
          } else if (btype === 1 || btype === 2) {
            var litH, distH;
            if (btype === 1) {
              litH = _FIXED_LIT;
              distH = _FIXED_DIST;
            } else {
              var hlit = getBits(5) + 257, hdist = getBits(5) + 1, hclen = getBits(4) + 4;
              var clcLen = new Array(19).fill(0);
              for (i = 0; i < hclen; i++) clcLen[_CLC_ORDER[i]] = getBits(3);
              var clcH = _buildHuffman(clcLen);
              var all = [], n = hlit + hdist;
              while (all.length < n) {
                var sym = decode(clcH);
                if (sym < 16) all.push(sym);
                else if (sym === 16) {
                  var r = getBits(2) + 3, p = all[all.length - 1];
                  while (r-- > 0) all.push(p);
                } else if (sym === 17) {
                  var r2 = getBits(3) + 3;
                  while (r2-- > 0) all.push(0);
                } else {
                  var r3 = getBits(7) + 11;
                  while (r3-- > 0) all.push(0);
                }
              }
              litH = _buildHuffman(all.slice(0, hlit));
              distH = _buildHuffman(all.slice(hlit));
            }
            while (true) {
              var s = decode(litH);
              if (s < 256) {
                out.push(s);
                if (out.length > cap) throw new Error("inflate: overflow");
              } else if (s === 256) break;
              else {
                s -= 257;
                var length = _LEN_BASE[s] + getBits(_LEN_EXTRA[s]);
                var ds = decode(distH);
                var dist = _DIST_BASE[ds] + getBits(_DIST_EXTRA[ds]);
                var start = out.length - dist;
                if (start < 0 || out.length + length > cap) throw new Error("inflate: overflow");
                for (k = 0; k < length; k++) out.push(out[start + k]);
              }
            }
          } else throw new Error("inflate: bad btype");
        } while (!bfinal);
        return out;
      }
      module.exports = { inflateRaw };
    }
  });

  // src/zip.js
  var require_zip = __commonJS({
    "src/zip.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToHex = u._bytesToHex;
      var _bytesToWA = u._bytesToWA;
      var _hexToBytes = u._hexToBytes;
      var _utf8Bytes = u._utf8Bytes;
      var _pkInflate = require_inflate().inflateRaw;
      var _pkCrc32 = require_rar().crc32;
      function winzipDerive(password, saltBytes, mode) {
        var keyLen = mode * 8 + 8, outLen = 2 * keyLen + 2;
        var dk = _waToBytes(CryptoJS2.PBKDF2(
          String(password),
          _bytesToWA(saltBytes),
          { keySize: Math.ceil(outLen / 4), iterations: 1e3, hasher: CryptoJS2.algo.SHA1 }
        )).slice(0, outLen);
        return { verify: _bytesToHex(dk.slice(outLen - 2)), authKey: dk.slice(keyLen, 2 * keyLen) };
      }
      function verifyWinzipAes2(password, hash) {
        var m = /^\$zip2\$\*(\d+)\*([123])\*(\d+)\*([0-9a-fA-F]*)\*([0-9a-fA-F]*)\*(\d+)\*([0-9a-fA-F]*)\*([0-9a-fA-F]+)\*\$\/zip2\$$/.exec(String(hash));
        if (!m) return false;
        var d = winzipDerive(password, _hexToBytes(m[4]), parseInt(m[2], 10));
        if (m[5] && d.verify !== m[5].toLowerCase()) return false;
        var mac = _waToBytes(CryptoJS2.HmacSHA1(_bytesToWA(_hexToBytes(m[7])), _bytesToWA(d.authKey))).slice(0, 10);
        return _bytesToHex(mac) === m[8].toLowerCase();
      }
      function genWinzipAes(password, saltHex, mode) {
        mode = mode || 1;
        saltHex = (saltHex || "0675369741458183").toLowerCase();
        var d = winzipDerive(password, _hexToBytes(saltHex), mode);
        var auth = _bytesToHex(_waToBytes(CryptoJS2.HmacSHA1(_bytesToWA([]), _bytesToWA(d.authKey))).slice(0, 10));
        return "$zip2$*0*" + mode + "*0*" + saltHex + "*" + d.verify + "*0**" + auth + "*$/zip2$";
      }
      function securezipKey(password, keyLen) {
        var K = _waToBytes(CryptoJS2.SHA1(_bytesToWA(_utf8Bytes(String(password)))));
        var ipad = [], opad = [], i, b;
        for (i = 0; i < 64; i++) {
          b = i < 20 ? K[i] : 0;
          ipad.push(b ^ 54);
          opad.push(b ^ 92);
        }
        return _waToBytes(CryptoJS2.SHA1(_bytesToWA(ipad))).concat(_waToBytes(CryptoJS2.SHA1(_bytesToWA(opad)))).slice(0, keyLen);
      }
      function _securezipDecTail(password, hash) {
        var m = /^\$zip3\$\*0\*1\*(128|192|256)\*0\*([0-9a-fA-F]+)\*([0-9a-fA-F]+)\*0\*0\*0\*.*$/.exec(String(hash));
        if (!m) return null;
        var iv = _hexToBytes(m[2]);
        while (iv.length < 16) iv.push(0);
        iv = iv.slice(0, 16);
        var data = _hexToBytes(m[3]);
        if (data.length < 16 || data.length % 16 !== 0) return null;
        var key = securezipKey(password, parseInt(m[1], 10) / 8);
        return _waToBytes(CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: _bytesToWA(data) }),
          _bytesToWA(key),
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(iv) }
        ));
      }
      function verifySecurezip2(password, hash) {
        var dec = _securezipDecTail(password, hash);
        if (!dec) return false;
        for (var i = dec.length - 16; i < dec.length; i++) if (dec[i] !== 16) return false;
        return true;
      }
      function genSecurezip(password, ivHex, bitLen) {
        bitLen = bitLen || 256;
        ivHex = (ivHex || "39bff47df6152a0214d7a967").toLowerCase();
        var iv = _hexToBytes(ivHex);
        while (iv.length < 16) iv.push(0);
        iv = iv.slice(0, 16);
        var key = securezipKey(password, bitLen / 8), pt = [], i;
        for (i = 0; i < 128; i++) pt.push(42);
        for (i = 0; i < 16; i++) pt.push(16);
        var ct = _waToBytes(CryptoJS2.AES.encrypt(
          _bytesToWA(pt),
          _bytesToWA(key),
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(iv) }
        ).ciphertext);
        return "$zip3$*0*1*" + bitLen + "*0*" + ivHex + "*" + _bytesToHex(ct) + "*0*0*0*file.txt";
      }
      var _PK_T = function() {
        var t = [], c, n, k;
        for (n = 0; n < 256; n++) {
          c = n;
          for (k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          t[n] = c >>> 0;
        }
        return t;
      }();
      function _pkc(crc, b) {
        return (crc >>> 8 ^ _PK_T[(crc ^ b) & 255]) >>> 0;
      }
      function _pkUpd(k, b) {
        k[0] = _pkc(k[0], b);
        k[1] = k[1] + (k[0] & 255) >>> 0;
        k[1] = Math.imul(k[1], 134775813) + 1 >>> 0;
        k[2] = _pkc(k[2], k[1] >>> 24 & 255);
      }
      function _pkInit(pw) {
        var k = [305419896, 591751049, 878082192], i;
        for (i = 0; i < pw.length; i++) _pkUpd(k, pw[i]);
        return k;
      }
      function _pkDec(k, ct) {
        var out = [], i, t, b;
        for (i = 0; i < ct.length; i++) {
          t = (k[2] | 2) & 65535;
          b = ct[i] ^ t * (t ^ 1) >>> 8 & 255;
          _pkUpd(k, b);
          out.push(b);
        }
        return out;
      }
      function _pkEnc(k, pt) {
        var out = [], i, t;
        for (i = 0; i < pt.length; i++) {
          t = (k[2] | 2) & 65535;
          out.push(pt[i] ^ t * (t ^ 1) >>> 8 & 255);
          _pkUpd(k, pt[i]);
        }
        return out;
      }
      function _pkEntries(f) {
        if (f.length < 6) return null;
        var sig = f[0], v2 = /^\$pkzip2\$/.test(sig);
        if (!v2 && !/^\$pkzip\$/.test(sig)) return null;
        if (f[f.length - 1] !== (v2 ? "$/pkzip2$" : "$/pkzip$")) return null;
        var hashCount = parseInt(sig.charAt(sig.length - 1), 10);
        if (!(hashCount >= 1 && hashCount <= 8)) return null;
        var idx = 2, entries = [], e, ent, dataType;
        for (e = 0; e < hashCount; e++) {
          if (idx + 4 > f.length) return null;
          dataType = parseInt(f[idx], 10);
          idx += 2;
          ent = { hasCrc: false, ctype: 0, ulen: 0, crc: 0, dataIdx: -1 };
          if (dataType > 1) {
            idx++;
            ent.ulen = parseInt(f[idx++], 16);
            ent.crc = parseInt(f[idx++], 16) >>> 0;
            idx += 2;
            ent.hasCrc = true;
          }
          ent.ctype = parseInt(f[idx++], 10);
          idx += v2 ? 3 : 2;
          ent.dataIdx = idx++;
          entries.push(ent);
        }
        return idx === f.length - 1 ? entries : null;
      }
      function verifyPkzip2(password, hash) {
        var f = String(hash).trim().split("*"), entries = _pkEntries(f);
        if (!entries) return false;
        var pw = _utf8Bytes(String(password)), any = false, e, ent, data, k, body, plain;
        for (e = 0; e < entries.length; e++) {
          ent = entries[e];
          if (!ent.hasCrc) continue;
          var dataHex = f[ent.dataIdx];
          if (!dataHex || !/^[0-9a-fA-F]+$/.test(dataHex)) return false;
          data = _hexToBytes(dataHex);
          if (data.length < 13) return false;
          k = _pkInit(pw);
          _pkDec(k, data.slice(0, 12));
          body = _pkDec(k, data.slice(12));
          if (ent.ctype === 0) plain = body;
          else if (ent.ctype === 8) {
            try {
              plain = _pkInflate(body, ent.ulen);
            } catch (err) {
              return false;
            }
          } else return false;
          if (_pkCrc32(plain.slice(0, ent.ulen)) >>> 0 !== ent.crc) return false;
          any = true;
        }
        return any;
      }
      function validatePkzip(hash, opts) {
        var entries = _pkEntries(String(hash).trim().split("*"));
        if (!entries) return false;
        if (opts.single && entries.length !== 1) return false;
        if (opts.multi && entries.length < 2) return false;
        if (opts.ctype != null && entries[0].ctype !== opts.ctype) return false;
        return true;
      }
      var _PKZIP_EX = {
        "17210": "$pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9fc7e2be1a1f4f664269fceb6cb88723a97408ae1fe07f774d31d1442ea8485081e63f919851ca0b7588d5e3442317fff19fe547a4ef97492ed75417c427eea3c4e146e16c100a2f8b6abd7e5988dc967e5a0e51f641401605d673630ea52ebb04da4b388489901656532c9aa474ca090dbac7cf8a21428d57b42a71da5f3d83fed927361e5d385ca8e480a6d42dea5b4bf497d3a24e79fc7be37c8d1721238cbe9e1ea3ae1eb91fc02aabdf33070d718d5105b70b3d7f3d2c28b3edd822e89a5abc0c8fee117c7fbfbfd4b4c8e130977b75cb0b1da080bfe1c0859e6483c42f459c8069d45a76220e046e6c2a2417392fd87e4aa4a2559eaab3baf78a77a1b94d8c8af16a977b4bb45e3da211838ad044f209428dba82666bf3d54d4eed82c64a9b3444a44746b9e398d0516a2596d84243b4a1d7e87d9843f38e45b6be67fd980107f3ad7b8453d87300e6c51ac9f5e3f6c3b702654440c543b1d808b62f7a313a83b31a6faaeedc2620de7057cd0df80f70346fe2d4dccc318f0b5ed128bcf0643e63d754bb05f53afb2b0fa90b34b538b2ad3648209dff587df4fa18698e4fa6d858ad44aa55d2bba3b08dfdedd3e28b8b7caf394d5d9d95e452c2ab1c836b9d74538c2f0d24b9b577*$/pkzip2$",
        "17200": "$pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3031a6f903e5f4e3211c8fdc4671547bf77f6f682afbfcc7475d83898985621a7af9bccd1349d1976500a68c48f630b7f22d7a0955524d768e34868880461335417ddd149c65a917c0eb0a4bf7224e24a1e04cf4ace5eef52205f4452e66ded937db9545f843a68b1e84a2e933cc05fb36d3db90e6c5faf1bee2249fdd06a7307849902a8bb24ec7e8a0886a4544ca47979a9dfeefe034bdfc5bd593904cfe9a5309dd199d337d3183f307c2cb39622549a5b9b8b485b7949a4803f63f67ca427a0640ad3793a519b2476c52198488e3e2e04cac202d624fb7d13c2*$/pkzip2$",
        "17220": "$pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49d3bbeab6cb385b7fa8a28dcccd3098bfdd7*1*0*8*24*2a74*882a*51281ac874a60baedc375ca645888d29780e20d4076edd1e7154a99bde982152a736311f*2*0*e3*1c5*eda7a8de*0*29*8*e3*eda7*5096*1455781b59707f5151139e018bdcfeebfc89bc37e372883a7ec0670a5eafc622feb338f9b021b6601a674094898a91beac70e41e675f77702834ca6156111a1bf7361bc9f3715d77dfcdd626634c68354c6f2e5e0a7b1e1ce84a44e632d0f6e36019feeab92fb7eac9dda8df436e287aafece95d042059a1b27d533c5eab62c1c559af220dc432f2eb1a38a70f29e8f3cb5a207704274d1e305d7402180fd47e026522792f5113c52a116d5bb25b67074ffd6f4926b221555234aabddc69775335d592d5c7d22462b75de1259e8342a9ba71cb06223d13c7f51f13be2ad76352c3b8ed*$/pkzip2$",
        "17225": "$pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056edf9fa4540919c109742dcb32f797fc90ce0*1*0*8*24*431a*3f26*18e2461c0dbad89bd9cc763067a020c89b5e16195b1ac5fa7fb13bd246d000b6833a2988*2*0*23*17*1e3c1a16*2e4*2f*0*23*1e3c*3f2d*54ea4dbc711026561485bbd191bf300ae24fa0997f3779b688cdad323985f8d3bb8b0c*$/pkzip2$"
      };
      function genPkzip(password, mode) {
        var f = _PKZIP_EX[String(mode)].split("*"), entries = _pkEntries(f);
        if (!entries) return null;
        var pw = _utf8Bytes(String(password)), e, di, plain;
        for (e = 0; e < entries.length; e++) {
          di = entries[e].dataIdx;
          plain = _pkDec(_pkInit(_utf8Bytes("hashcat")), _hexToBytes(f[di]));
          f[di] = _bytesToHex(_pkEnc(_pkInit(pw), plain));
        }
        return f.join("*");
      }
      module.exports = {
        verifyWinzipAes: verifyWinzipAes2,
        genWinzipAes,
        verifySecurezip: verifySecurezip2,
        genSecurezip,
        verifyPkzip: verifyPkzip2,
        validatePkzip,
        genPkzip
      };
    }
  });

  // src/lzma.js
  var require_lzma = __commonJS({
    "src/lzma.js"(exports, module) {
      function makeLzma(lc, lp, pb) {
        var STATES = 12;
        function np(n) {
          var a = new Uint16Array(n);
          for (var i = 0; i < n; i++) a[i] = 1024;
          return a;
        }
        return {
          lc,
          lp,
          pb,
          IsMatch: np(STATES << 4),
          IsRep: np(STATES),
          IsRepG0: np(STATES),
          IsRepG1: np(STATES),
          IsRepG2: np(STATES),
          IsRep0Long: np(STATES << 4),
          PosSlot: np(4 * 64),
          SpecPos: np(128),
          Align: np(16),
          Lit: np(768 << lc + lp),
          LenC: { c: np(2), lo: np(16 * 8), mi: np(16 * 8), hi: np(256) },
          RepLenC: { c: np(2), lo: np(16 * 8), mi: np(16 * 8), hi: np(256) },
          state: 0,
          r0: 0,
          r1: 0,
          r2: 0,
          r3: 0
        };
      }
      function lzmaRun(S, input, ipRef, out, op, limit) {
        var lc = S.lc, lp = S.lp, pb = S.pb;
        var ip = ipRef.ip;
        function rd() {
          return ip < input.length ? input[ip++] & 255 : 0;
        }
        var range = 4294967295 >>> 0, code = 0;
        rd();
        for (var z = 0; z < 4; z++) code = (code << 8 | rd()) >>> 0;
        function norm() {
          if (range >>> 0 < 16777216) {
            range = range << 8 >>> 0;
            code = (code << 8 | rd()) >>> 0;
          }
        }
        function bit(P, i) {
          var p = P[i], bound = (range >>> 11) * p >>> 0, s;
          if (code >>> 0 < bound >>> 0) {
            range = bound;
            P[i] = p + (2048 - p >>> 5);
            s = 0;
          } else {
            code = code - bound >>> 0;
            range = range - bound >>> 0;
            P[i] = p - (p >>> 5);
            s = 1;
          }
          norm();
          return s;
        }
        function direct(n) {
          var r = 0;
          do {
            range = range >>> 1 >>> 0;
            code = code - range >>> 0;
            var t = 0 - (code >>> 31);
            code = code + (range & t) >>> 0;
            norm();
            r = (r << 1) + (t + 1) >>> 0;
          } while (--n);
          return r >>> 0;
        }
        function tree(P, off2, n) {
          var m = 1;
          for (var i = 0; i < n; i++) m = (m << 1) + bit(P, off2 + m);
          return m - (1 << n);
        }
        function treeRev(P, off2, n) {
          var m = 1, s = 0;
          for (var i = 0; i < n; i++) {
            var b2 = bit(P, off2 + m);
            m = (m << 1) + b2;
            s |= b2 << i;
          }
          return s;
        }
        function len(L, ps2) {
          if (bit(L.c, 0) === 0) return tree(L.lo, ps2 << 3, 3);
          if (bit(L.c, 1) === 0) return 8 + tree(L.mi, ps2 << 3, 3);
          return 16 + tree(L.hi, 0, 8);
        }
        var psMask = (1 << pb) - 1, lpMask = (1 << lp) - 1;
        var state = S.state, r0 = S.r0, r1 = S.r1, r2 = S.r2, r3 = S.r3;
        while (op < limit) {
          var ps = op & psMask;
          if (bit(S.IsMatch, (state << 4) + ps) === 0) {
            var prev = op > 0 ? out[op - 1] : 0;
            var litState = ((op & lpMask) << lc) + (prev >>> 8 - lc);
            var off = 768 * litState, sym = 1;
            if (state >= 7) {
              var mb = out[op - r0 - 1];
              do {
                var matchBit = mb >> 7 & 1;
                mb = mb << 1 & 255;
                var b = bit(S.Lit, off + (1 + matchBit << 8) + sym);
                sym = sym << 1 | b;
                if (matchBit !== b) break;
              } while (sym < 256);
            }
            while (sym < 256) sym = sym << 1 | bit(S.Lit, off + sym);
            out[op++] = sym & 255;
            state = state < 4 ? 0 : state < 10 ? state - 3 : state - 6;
          } else {
            var Ln;
            if (bit(S.IsRep, state) === 1) {
              if (bit(S.IsRepG0, state) === 0) {
                if (bit(S.IsRep0Long, (state << 4) + ps) === 0) {
                  state = state < 7 ? 9 : 11;
                  out[op] = out[op - r0 - 1];
                  op++;
                  continue;
                }
              } else {
                var dist;
                if (bit(S.IsRepG1, state) === 0) dist = r1;
                else {
                  if (bit(S.IsRepG2, state) === 0) dist = r2;
                  else {
                    dist = r3;
                    r3 = r2;
                  }
                  r2 = r1;
                }
                r1 = r0;
                r0 = dist;
              }
              Ln = len(S.RepLenC, ps) + 2;
              state = state < 7 ? 8 : 11;
            } else {
              r3 = r2;
              r2 = r1;
              r1 = r0;
              Ln = len(S.LenC, ps) + 2;
              state = state < 7 ? 7 : 10;
              var lps = Ln - 2 < 4 ? Ln - 2 : 3;
              var slot = tree(S.PosSlot, lps << 6, 6);
              if (slot < 4) r0 = slot;
              else {
                var nd = (slot >> 1) - 1;
                r0 = (2 | slot & 1) << nd >>> 0;
                if (slot < 14) r0 = r0 + treeRev(S.SpecPos, r0 - slot - 1, nd) >>> 0;
                else {
                  r0 = r0 + (direct(nd - 4) << 4) >>> 0;
                  r0 = r0 + treeRev(S.Align, 0, 4) >>> 0;
                }
              }
              if (r0 >>> 0 === 4294967295) break;
            }
            for (var k = 0; k < Ln && op < limit; k++) {
              out[op] = out[op - r0 - 1];
              op++;
            }
          }
        }
        S.state = state;
        S.r0 = r0;
        S.r1 = r1;
        S.r2 = r2;
        S.r3 = r3;
        ipRef.ip = ip;
        return op;
      }
      function lzmaDecode(input, props, outLen) {
        var d = props[0] & 255, lc = d % 9;
        d = (d - lc) / 9;
        var lp = d % 5, pb = (d - lp) / 5;
        var S = makeLzma(lc, lp, pb);
        var out = new Uint8Array(outLen);
        lzmaRun(S, input, { ip: 0 }, out, 0, outLen);
        return out;
      }
      function lzma2Decode(input, dictByte, outLen) {
        var out = new Uint8Array(outLen), op = 0, ip = 0;
        var S = null;
        function u8() {
          return input[ip++] & 255;
        }
        while (op < outLen && ip < input.length) {
          var ctrl = u8();
          if (ctrl === 0) break;
          if (ctrl < 3) {
            var usize = (u8() << 8 | u8()) + 1;
            for (var i = 0; i < usize; i++) out[op++] = u8();
            if (S) {
              S.state = 0;
              S.r0 = S.r1 = S.r2 = S.r3 = 0;
            }
          } else if (ctrl >= 128) {
            var unpackSize = ((ctrl & 31) << 16 | u8() << 8 | u8()) + 1;
            var packSize = (u8() << 8 | u8()) + 1;
            var reset = ctrl >> 5 & 3;
            if (reset >= 2) {
              var p = u8(), lc = p % 9;
              p = (p - lc) / 9;
              var lp = p % 5, pb = (p - lp) / 5;
              S = makeLzma(lc, lp, pb);
            } else if (reset >= 1) {
              S = makeLzma(S.lc, S.lp, S.pb);
            }
            var ref = { ip };
            op = lzmaRun(S, input, ref, out, op, op + unpackSize);
            ip += packSize;
          } else return out;
        }
        return out;
      }
      module.exports = { lzmaDecode, lzma2Decode };
    }
  });

  // src/sevenzip.js
  var require_sevenzip = __commonJS({
    "src/sevenzip.js"(exports, module) {
      var u = require_util();
      var CryptoJS2 = u.CryptoJS;
      var _waToBytes = u._waToBytes;
      var _bytesToHex = u._bytesToHex;
      var _bytesToWA = u._bytesToWA;
      var _hexToBytes = u._hexToBytes;
      var _lzma = require_lzma();
      var _inflate = require_inflate().inflateRaw;
      var _crc32 = require_rar().crc32;
      function _u16le(s) {
        var b = [], i, c;
        for (i = 0; i < s.length; i++) {
          c = s.charCodeAt(i);
          b.push(c & 255, c >> 8 & 255);
        }
        return b;
      }
      function sevenzipKey(password, saltBytes, cost) {
        var rounds = Math.pow(2, cost);
        var pwWA = _bytesToWA(_u16le(String(password)));
        var saltWA = saltBytes.length ? _bytesToWA(saltBytes) : null;
        var sha = CryptoJS2.algo.SHA256.create();
        for (var i = 0; i < rounds; i++) {
          if (saltWA) sha.update(saltWA);
          sha.update(pwWA);
          sha.update(_bytesToWA([i & 255, i >>> 8 & 255, i >>> 16 & 255, i >>> 24 & 255, 0, 0, 0, 0]));
        }
        return sha.finalize();
      }
      function _decompress(dataType, dec, coderAttr, crcLen) {
        if (dataType === 0) return dec;
        if (dataType === 1) return _lzma.lzmaDecode(dec, coderAttr, crcLen);
        if (dataType === 2) return _lzma.lzma2Decode(dec, coderAttr ? coderAttr[0] : 0, crcLen);
        if (dataType === 7) return _inflate(dec, crcLen);
        return null;
      }
      function verify7z2(password, hash) {
        var s = String(hash).trim();
        if (s.slice(0, 4) !== "$7z$") return false;
        var f = s.slice(4).split("$");
        if (f.length < 10) return false;
        var dataType = parseInt(f[0], 10), cost = parseInt(f[1], 10);
        var salt = _hexToBytes(f[3]);
        var crc = parseInt(f[6], 10) >>> 0;
        var dataLen = parseInt(f[7], 10), unpackSize = parseInt(f[8], 10);
        var data = _hexToBytes(f[9]);
        if (data.length !== dataLen || dataLen === 0 || dataLen % 16 !== 0) return false;
        var crcLen = f.length > 10 ? parseInt(f[10], 10) : unpackSize;
        var coderAttr = f.length > 11 ? _hexToBytes(f[11]) : null;
        var iv = _hexToBytes(f[5]);
        while (iv.length < 16) iv.push(0);
        iv = iv.slice(0, 16);
        var key = sevenzipKey(password, salt, cost);
        var dec = _waToBytes(CryptoJS2.AES.decrypt(
          CryptoJS2.lib.CipherParams.create({ ciphertext: _bytesToWA(data) }),
          key,
          { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(iv) }
        ));
        var plain, n = dataType === 0 ? unpackSize : crcLen;
        try {
          plain = _decompress(dataType, dec, coderAttr, crcLen);
        } catch (e) {
          return false;
        }
        if (!plain) return false;
        var out = [], i;
        for (i = 0; i < n && i < plain.length; i++) out.push(plain[i]);
        return _crc32(out) >>> 0 === crc;
      }
      function build7z(password, opts) {
        var cost = opts.cost || 14;
        var iv = (opts.iv || []).slice();
        while (iv.length < 16) iv.push(0);
        iv = iv.slice(0, 16);
        var comp = opts.comp.slice();
        var packedLen = comp.length;
        while (comp.length % 16 !== 0) comp.push(0);
        var key = sevenzipKey(password, [], cost);
        var enc = _waToBytes(CryptoJS2.AES.encrypt(_bytesToWA(comp), key, { mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding, iv: _bytesToWA(iv) }).ciphertext);
        var h = "$7z$" + opts.dataType + "$" + cost + "$0$$16$" + _bytesToHex(iv) + "$" + (opts.crc >>> 0) + "$" + enc.length + "$" + packedLen + "$" + _bytesToHex(enc);
        if (opts.dataType !== 0) h += "$" + opts.crcLen + "$" + _bytesToHex(opts.coderAttr);
        return h;
      }
      function gen7z(password, plaintextBytes, ivBytes) {
        return build7z(password, { dataType: 0, comp: plaintextBytes.slice(), crc: _crc32(plaintextBytes) >>> 0, iv: (ivBytes || []).slice() });
      }
      module.exports = { verify7z: verify7z2, sevenzipKey, build7z, gen7z };
    }
  });

  // src/noncrypto.js
  var require_noncrypto = __commonJS({
    "src/noncrypto.js"(exports, module) {
      function _bytes(s) {
        var b = [];
        for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 255);
        return b;
      }
      function javaHashCode(str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) h = Math.imul(h, 31) + str.charCodeAt(i) | 0;
        return h >>> 0;
      }
      function murmur2(bytes, seed) {
        var M = 2144752301, R = 16, len = bytes.length, blocks = Math.floor(len / 4), off = 0, i, j;
        var hash = seed + 3735928559 >>> 0;
        for (i = 0; i < blocks; i++) {
          var w = (bytes[off] | bytes[off + 1] << 8 | bytes[off + 2] << 16 | bytes[off + 3] << 24) >>> 0;
          var tmp = Math.imul(hash + w >>> 0, M) >>> 0;
          hash = (tmp ^ tmp >>> R) >>> 0;
          off += 4;
        }
        var wt = 0, rem = len & 3;
        for (j = 0; j < rem; j++) wt = (wt | (bytes[off + j] & 255) << 8 * j) >>> 0;
        var tmp2 = Math.imul(hash + wt >>> 0, M) >>> 0;
        if (rem) hash = (tmp2 ^ tmp2 >>> R) >>> 0;
        hash = Math.imul(hash, M) >>> 0;
        hash = (hash ^ hash >>> 10) >>> 0;
        hash = Math.imul(hash, M) >>> 0;
        hash = (hash ^ hash >>> 17) >>> 0;
        return hash >>> 0;
      }
      function murmur3(bytes, seed) {
        var c1 = 3432918353, c2 = 461845907, len = bytes.length, h = seed >>> 0, nb = len >> 2, i = 0, b;
        for (b = 0; b < nb; b++) {
          var k = (bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24) >>> 0;
          k = Math.imul(k, c1) >>> 0;
          k = (k << 15 | k >>> 17) >>> 0;
          k = Math.imul(k, c2) >>> 0;
          h = (h ^ k) >>> 0;
          h = (h << 13 | h >>> 19) >>> 0;
          h = Math.imul(h, 5) + 3864292196 >>> 0;
          i += 4;
        }
        var k1 = 0, tail = len & 3;
        if (tail >= 3) k1 = (k1 ^ bytes[i + 2] << 16) >>> 0;
        if (tail >= 2) k1 = (k1 ^ bytes[i + 1] << 8) >>> 0;
        if (tail >= 1) {
          k1 = (k1 ^ bytes[i]) >>> 0;
          k1 = Math.imul(k1, c1) >>> 0;
          k1 = (k1 << 15 | k1 >>> 17) >>> 0;
          k1 = Math.imul(k1, c2) >>> 0;
          h = (h ^ k1) >>> 0;
        }
        h = (h ^ len) >>> 0;
        h = (h ^ h >>> 16) >>> 0;
        h = Math.imul(h, 2246822507) >>> 0;
        h = (h ^ h >>> 13) >>> 0;
        h = Math.imul(h, 3266489909) >>> 0;
        h = (h ^ h >>> 16) >>> 0;
        return h >>> 0;
      }
      var _M64 = 0xFFFFFFFFFFFFFFFFn;
      var _MC = 0xc6a4a7935bd1e995n;
      var _MR = 47n;
      function murmur64a(bytes, seed) {
        var len = bytes.length, h = (seed ^ BigInt(len) * _MC) & _M64, nb = len >> 3, i = 0, b, j;
        for (b = 0; b < nb; b++) {
          var k = 0n;
          for (j = 0; j < 8; j++) k |= BigInt(bytes[i + j] & 255) << BigInt(8 * j);
          k = k * _MC & _M64;
          k ^= k >> _MR;
          k = k * _MC & _M64;
          h ^= k;
          h = h * _MC & _M64;
          i += 8;
        }
        var tail = len & 7;
        if (tail) {
          for (j = tail - 1; j >= 0; j--) h ^= BigInt(bytes[i + j] & 255) << BigInt(8 * j);
          h = h * _MC & _M64;
        }
        h ^= h >> _MR;
        h = h * _MC & _M64;
        h ^= h >> _MR;
        return h & _M64;
      }
      function _hex64(v) {
        return v.toString(16).padStart(16, "0");
      }
      function _le64(b, o) {
        var v = 0n;
        for (var i = 0; i < 8; i++) v |= BigInt(b[o + i] & 255) << BigInt(8 * i);
        return v;
      }
      function _rotl(x, r) {
        return (x << r | x >> 64n - r) & _M64;
      }
      function siphash24(msg, key) {
        var k0 = _le64(key, 0), k1 = _le64(key, 8);
        var v0 = 0x736f6d6570736575n ^ k0, v1 = 0x646f72616e646f6dn ^ k1, v2 = 0x6c7967656e657261n ^ k0, v3 = 0x7465646279746573n ^ k1;
        function round() {
          v0 = v0 + v1 & _M64;
          v1 = _rotl(v1, 13n);
          v1 ^= v0;
          v0 = _rotl(v0, 32n);
          v2 = v2 + v3 & _M64;
          v3 = _rotl(v3, 16n);
          v3 ^= v2;
          v0 = v0 + v3 & _M64;
          v3 = _rotl(v3, 21n);
          v3 ^= v0;
          v2 = v2 + v1 & _M64;
          v1 = _rotl(v1, 17n);
          v1 ^= v2;
          v2 = _rotl(v2, 32n);
        }
        var len = msg.length, end = len - len % 8, i, m;
        for (i = 0; i < end; i += 8) {
          m = _le64(msg, i);
          v3 ^= m;
          round();
          round();
          v0 ^= m;
        }
        var b = BigInt(len & 255) << 56n;
        for (i = end; i < len; i++) b |= BigInt(msg[i] & 255) << BigInt(8 * (i - end));
        v3 ^= b;
        round();
        round();
        v0 ^= b;
        v2 ^= 0xffn;
        round();
        round();
        round();
        round();
        return (v0 ^ v1 ^ v2 ^ v3) & _M64;
      }
      var _CRC32C_T = function() {
        var t = new Array(256);
        for (var n = 0; n < 256; n++) {
          var c = n;
          for (var k = 0; k < 8; k++) c = c & 1 ? 2197175160 ^ c >>> 1 : c >>> 1;
          t[n] = c >>> 0;
        }
        return t;
      }();
      function crc32c(bytes, init) {
        var crc = (init ^ 4294967295) >>> 0;
        for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8 ^ _CRC32C_T[(crc ^ bytes[i]) & 255]) >>> 0;
        return (crc ^ 4294967295) >>> 0;
      }
      var _CRC64_T = function() {
        var poly = 0x95ac9329ac4bc9b5n, t = new Array(256);
        for (var n = 0; n < 256; n++) {
          var c = BigInt(n);
          for (var k = 0; k < 8; k++) c = c & 1n ? poly ^ c >> 1n : c >> 1n;
          t[n] = c & _M64;
        }
        return t;
      }();
      function crc64jones(bytes, init) {
        var h = init & _M64;
        for (var i = 0; i < bytes.length; i++) h = _CRC64_T[Number(h & 0xffn) ^ bytes[i] & 255] ^ h >> 8n;
        return h & _M64;
      }
      function rc4drop(keyBytes, drop, dataBytes) {
        var s = new Array(256), i, j = 0, t;
        for (i = 0; i < 256; i++) s[i] = i;
        for (i = 0; i < 256; i++) {
          j = j + s[i] + keyBytes[i % keyBytes.length] & 255;
          t = s[i];
          s[i] = s[j];
          s[j] = t;
        }
        var x = 0, y = 0, out = [];
        for (i = 0; i < drop; i++) {
          x = x + 1 & 255;
          y = y + s[x] & 255;
          t = s[x];
          s[x] = s[y];
          s[y] = t;
        }
        for (i = 0; i < dataBytes.length; i++) {
          x = x + 1 & 255;
          y = y + s[x] & 255;
          t = s[x];
          s[x] = s[y];
          s[y] = t;
          out.push(dataBytes[i] ^ s[s[x] + s[y] & 255]);
        }
        return out;
      }
      var _SKIP32_F = [
        163,
        215,
        9,
        131,
        248,
        72,
        246,
        244,
        179,
        33,
        21,
        120,
        153,
        177,
        175,
        249,
        231,
        45,
        77,
        138,
        206,
        76,
        202,
        46,
        82,
        149,
        217,
        30,
        78,
        56,
        68,
        40,
        10,
        223,
        2,
        160,
        23,
        241,
        96,
        104,
        18,
        183,
        122,
        195,
        233,
        250,
        61,
        83,
        150,
        132,
        107,
        186,
        242,
        99,
        154,
        25,
        124,
        174,
        229,
        245,
        247,
        22,
        106,
        162,
        57,
        182,
        123,
        15,
        193,
        147,
        129,
        27,
        238,
        180,
        26,
        234,
        208,
        145,
        47,
        184,
        85,
        185,
        218,
        133,
        63,
        65,
        191,
        224,
        90,
        88,
        128,
        95,
        102,
        11,
        216,
        144,
        53,
        213,
        192,
        167,
        51,
        6,
        101,
        105,
        69,
        0,
        148,
        86,
        109,
        152,
        155,
        118,
        151,
        252,
        178,
        194,
        176,
        254,
        219,
        32,
        225,
        235,
        214,
        228,
        221,
        71,
        74,
        29,
        66,
        237,
        158,
        110,
        73,
        60,
        205,
        67,
        39,
        210,
        7,
        212,
        222,
        199,
        103,
        24,
        137,
        203,
        48,
        31,
        141,
        198,
        143,
        170,
        200,
        116,
        220,
        201,
        93,
        92,
        49,
        164,
        112,
        136,
        97,
        44,
        159,
        13,
        43,
        135,
        80,
        130,
        84,
        100,
        38,
        125,
        3,
        64,
        52,
        75,
        28,
        115,
        209,
        196,
        253,
        59,
        204,
        251,
        127,
        171,
        230,
        62,
        91,
        165,
        173,
        4,
        35,
        156,
        20,
        81,
        34,
        240,
        41,
        121,
        113,
        126,
        255,
        140,
        14,
        226,
        12,
        239,
        188,
        114,
        117,
        111,
        55,
        161,
        236,
        211,
        142,
        98,
        139,
        134,
        16,
        232,
        8,
        119,
        17,
        190,
        146,
        79,
        36,
        197,
        50,
        54,
        157,
        207,
        243,
        166,
        187,
        172,
        94,
        108,
        169,
        19,
        87,
        37,
        181,
        227,
        189,
        168,
        58,
        1,
        5,
        89,
        42,
        70
      ];
      function _skip32g(key, k, w) {
        var g1 = w >> 8 & 255, g2 = w & 255;
        var g3 = _SKIP32_F[g2 ^ key[4 * k % 10]] ^ g1;
        var g4 = _SKIP32_F[g3 ^ key[(4 * k + 1) % 10]] ^ g2;
        var g5 = _SKIP32_F[g4 ^ key[(4 * k + 2) % 10]] ^ g3;
        var g6 = _SKIP32_F[g5 ^ key[(4 * k + 3) % 10]] ^ g4;
        return (g5 << 8 | g6) & 65535;
      }
      function skip32(key, buf, encrypt) {
        var k = encrypt ? 0 : 23, kstep = encrypt ? 1 : -1, i;
        var wl = (buf[0] << 8 | buf[1]) & 65535, wr = (buf[2] << 8 | buf[3]) & 65535;
        for (i = 0; i < 12; i++) {
          wr = (wr ^ _skip32g(key, k, wl) ^ k) & 65535;
          k += kstep;
          wl = (wl ^ _skip32g(key, k, wr) ^ k) & 65535;
          k += kstep;
        }
        return [wr >> 8 & 255, wr & 255, wl >> 8 & 255, wl & 255];
      }
      function _cc_rotl(x, n) {
        return (x << n | x >>> 32 - n) >>> 0;
      }
      function _cc_block(state) {
        var x = state.slice(), i;
        function QR(a, b, c, d) {
          x[a] = x[a] + x[b] >>> 0;
          x[d] = _cc_rotl(x[d] ^ x[a], 16);
          x[c] = x[c] + x[d] >>> 0;
          x[b] = _cc_rotl(x[b] ^ x[c], 12);
          x[a] = x[a] + x[b] >>> 0;
          x[d] = _cc_rotl(x[d] ^ x[a], 8);
          x[c] = x[c] + x[d] >>> 0;
          x[b] = _cc_rotl(x[b] ^ x[c], 7);
        }
        for (i = 0; i < 10; i++) {
          QR(0, 4, 8, 12);
          QR(1, 5, 9, 13);
          QR(2, 6, 10, 14);
          QR(3, 7, 11, 15);
          QR(0, 5, 10, 15);
          QR(1, 6, 11, 12);
          QR(2, 7, 8, 13);
          QR(3, 4, 9, 14);
        }
        var out = [];
        for (i = 0; i < 16; i++) {
          var v = x[i] + state[i] >>> 0;
          out.push(v & 255, v >>> 8 & 255, v >>> 16 & 255, v >>> 24 & 255);
        }
        return out;
      }
      function _le32(b, o) {
        return (b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24) >>> 0;
      }
      function chacha20ks(key, iv, counter, nbytes) {
        var st = [1634760805, 857760878, 2036477234, 1797285236], i;
        for (i = 0; i < 8; i++) st.push(_le32(key, i * 4));
        st.push(_le32(counter, 0), _le32(counter, 4), _le32(iv, 0), _le32(iv, 4));
        var out = [];
        while (out.length < nbytes) {
          var blk = _cc_block(st);
          for (var j = 0; j < 64; j++) out.push(blk[j]);
          st[12] = st[12] + 1 >>> 0;
          if (st[12] === 0) st[13] = st[13] + 1 >>> 0;
        }
        return out;
      }
      function dnsWire(name) {
        var labels = String(name).split(".").filter(function(l) {
          return l.length > 0;
        }), b = [];
        for (var i = 0; i < labels.length; i++) {
          b.push(labels[i].length & 255);
          for (var j = 0; j < labels[i].length; j++) b.push(labels[i].charCodeAt(j) & 255);
        }
        b.push(0);
        return b;
      }
      function base32hex(bytes) {
        var a = "0123456789abcdefghijklmnopqrstuv", bits = 0, val = 0, out = "";
        for (var i = 0; i < bytes.length; i++) {
          val = val << 8 | bytes[i] & 255;
          bits += 8;
          while (bits >= 5) {
            bits -= 5;
            out += a[val >>> bits & 31];
          }
          val &= bits > 0 ? (1 << bits) - 1 : 0;
        }
        if (bits > 0) out += a[val << 5 - bits & 31];
        return out;
      }
      module.exports = { _bytes, javaHashCode, murmur2, murmur3, murmur64a, _hex64, siphash24, crc32c, crc64jones, rc4drop, skip32, dnsWire, base32hex, chacha20ks };
    }
  });

  // src/blake2s.js
  var require_blake2s = __commonJS({
    "src/blake2s.js"(exports, module) {
      var _IV = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
      var _SIGMA = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
        [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
        [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
        [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
        [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
        [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
        [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
        [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
        [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]
      ];
      function _rotr32(x, n) {
        return (x >>> n | x << 32 - n) >>> 0;
      }
      function blake2s(msgBytes, outLen) {
        var h = _IV.slice();
        h[0] = (h[0] ^ 16842752 ^ outLen) >>> 0;
        function compress(blk, t, last2) {
          var v = h.concat(_IV), m = new Array(16), i2;
          v[12] = (v[12] ^ t >>> 0) >>> 0;
          v[13] = (v[13] ^ Math.floor(t / 4294967296)) >>> 0;
          if (last2) v[14] = (v[14] ^ 4294967295) >>> 0;
          for (i2 = 0; i2 < 16; i2++) m[i2] = (blk[i2 * 4] | blk[i2 * 4 + 1] << 8 | blk[i2 * 4 + 2] << 16 | blk[i2 * 4 + 3] << 24) >>> 0;
          function G(a, b, c, d, x, y) {
            v[a] = v[a] + v[b] + x >>> 0;
            v[d] = _rotr32(v[d] ^ v[a], 16);
            v[c] = v[c] + v[d] >>> 0;
            v[b] = _rotr32(v[b] ^ v[c], 12);
            v[a] = v[a] + v[b] + y >>> 0;
            v[d] = _rotr32(v[d] ^ v[a], 8);
            v[c] = v[c] + v[d] >>> 0;
            v[b] = _rotr32(v[b] ^ v[c], 7);
          }
          for (var r = 0; r < 10; r++) {
            var g = _SIGMA[r];
            G(0, 4, 8, 12, m[g[0]], m[g[1]]);
            G(1, 5, 9, 13, m[g[2]], m[g[3]]);
            G(2, 6, 10, 14, m[g[4]], m[g[5]]);
            G(3, 7, 11, 15, m[g[6]], m[g[7]]);
            G(0, 5, 10, 15, m[g[8]], m[g[9]]);
            G(1, 6, 11, 12, m[g[10]], m[g[11]]);
            G(2, 7, 8, 13, m[g[12]], m[g[13]]);
            G(3, 4, 9, 14, m[g[14]], m[g[15]]);
          }
          for (i2 = 0; i2 < 8; i2++) h[i2] = (h[i2] ^ v[i2] ^ v[i2 + 8]) >>> 0;
        }
        var msg = msgBytes.slice(), counter = 0, i = 0;
        if (msg.length === 0) {
          compress(new Array(64).fill(0), 0, true);
        } else {
          while (msg.length - i > 64) {
            counter += 64;
            compress(msg.slice(i, i + 64), counter, false);
            i += 64;
          }
          var last = msg.slice(i);
          counter += last.length;
          while (last.length < 64) last.push(0);
          compress(last, counter, true);
        }
        var out = [];
        for (var k = 0; k < outLen; k++) out.push(h[k >> 2] >>> 8 * (k & 3) & 255);
        return out;
      }
      function hmacBlake2s(keyBytes, msgBytes) {
        var key = keyBytes.slice();
        if (key.length > 64) key = blake2s(key, 32);
        while (key.length < 64) key.push(0);
        var ipad = [], opad = [], i;
        for (i = 0; i < 64; i++) {
          ipad.push(key[i] ^ 54);
          opad.push(key[i] ^ 92);
        }
        var inner = blake2s(ipad.concat(msgBytes), 32);
        return blake2s(opad.concat(inner), 32);
      }
      module.exports = { blake2s, hmacBlake2s };
    }
  });

  // src/ripemd320.js
  var require_ripemd320 = __commonJS({
    "src/ripemd320.js"(exports, module) {
      var _RL = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8,
        3,
        10,
        14,
        4,
        9,
        15,
        8,
        1,
        2,
        7,
        0,
        6,
        13,
        11,
        5,
        12,
        1,
        9,
        11,
        10,
        0,
        8,
        12,
        4,
        13,
        3,
        7,
        15,
        14,
        5,
        6,
        2,
        4,
        0,
        5,
        9,
        7,
        12,
        2,
        10,
        14,
        1,
        3,
        8,
        11,
        6,
        15,
        13
      ];
      var _RR = [
        5,
        14,
        7,
        0,
        9,
        2,
        11,
        4,
        13,
        6,
        15,
        8,
        1,
        10,
        3,
        12,
        6,
        11,
        3,
        7,
        0,
        13,
        5,
        10,
        14,
        15,
        8,
        12,
        4,
        9,
        1,
        2,
        15,
        5,
        1,
        3,
        7,
        14,
        6,
        9,
        11,
        8,
        12,
        2,
        10,
        0,
        4,
        13,
        8,
        6,
        4,
        1,
        3,
        11,
        15,
        0,
        5,
        12,
        2,
        13,
        9,
        7,
        10,
        14,
        12,
        15,
        10,
        4,
        1,
        5,
        8,
        7,
        6,
        2,
        13,
        14,
        0,
        3,
        9,
        11
      ];
      var _SL = [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8,
        7,
        6,
        8,
        13,
        11,
        9,
        7,
        15,
        7,
        12,
        15,
        9,
        11,
        7,
        13,
        12,
        11,
        13,
        6,
        7,
        14,
        9,
        13,
        15,
        14,
        8,
        13,
        6,
        5,
        12,
        7,
        5,
        11,
        12,
        14,
        15,
        14,
        15,
        9,
        8,
        9,
        14,
        5,
        6,
        8,
        6,
        5,
        12,
        9,
        15,
        5,
        11,
        6,
        8,
        13,
        12,
        5,
        12,
        13,
        14,
        11,
        8,
        5,
        6
      ];
      var _SR = [
        8,
        9,
        9,
        11,
        13,
        15,
        15,
        5,
        7,
        7,
        8,
        11,
        14,
        14,
        12,
        6,
        9,
        13,
        15,
        7,
        12,
        8,
        9,
        11,
        7,
        7,
        12,
        7,
        6,
        15,
        13,
        11,
        9,
        7,
        15,
        11,
        8,
        6,
        6,
        14,
        12,
        13,
        5,
        14,
        13,
        13,
        7,
        5,
        15,
        5,
        8,
        11,
        14,
        14,
        6,
        14,
        6,
        9,
        12,
        9,
        12,
        5,
        15,
        8,
        8,
        5,
        12,
        9,
        12,
        5,
        14,
        6,
        8,
        13,
        6,
        5,
        15,
        13,
        11,
        11
      ];
      var _KL = [0, 1518500249, 1859775393, 2400959708, 2840853838];
      var _KR = [1352829926, 1548603684, 1836072691, 2053994217, 0];
      function _rol(x, n) {
        return (x << n | x >>> 32 - n) >>> 0;
      }
      function _f(j, x, y, z) {
        if (j < 16) return (x ^ y ^ z) >>> 0;
        if (j < 32) return (x & y | ~x & z) >>> 0;
        if (j < 48) return ((x | ~y) ^ z) >>> 0;
        if (j < 64) return (x & z | y & ~z) >>> 0;
        return (x ^ (y | ~z)) >>> 0;
      }
      function ripemd320(bytes) {
        var h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520, 1985229328, 4275878552, 2309737967, 19088743, 1009589775];
        var msg = bytes.slice(), ml = msg.length;
        msg.push(128);
        while (msg.length % 64 !== 56) msg.push(0);
        var bl = ml * 8;
        for (var s = 0; s < 8; s++) msg.push(Math.floor(bl / Math.pow(2, 8 * s)) & 255);
        for (var off = 0; off < msg.length; off += 64) {
          var X = new Array(16), i;
          for (i = 0; i < 16; i++) X[i] = (msg[off + i * 4] | msg[off + i * 4 + 1] << 8 | msg[off + i * 4 + 2] << 16 | msg[off + i * 4 + 3] << 24) >>> 0;
          var al = h[0], bl2 = h[1], cl = h[2], dl = h[3], el = h[4], ar = h[5], br = h[6], cr = h[7], dr = h[8], er = h[9], t;
          for (var j = 0; j < 80; j++) {
            var rnd = j >> 4;
            t = _rol(al + _f(j, bl2, cl, dl) + X[_RL[j]] + _KL[rnd] >>> 0, _SL[j]) + el >>> 0;
            al = el;
            el = dl;
            dl = _rol(cl, 10);
            cl = bl2;
            bl2 = t;
            t = _rol(ar + _f(79 - j, br, cr, dr) + X[_RR[j]] + _KR[rnd] >>> 0, _SR[j]) + er >>> 0;
            ar = er;
            er = dr;
            dr = _rol(cr, 10);
            cr = br;
            br = t;
            if (j === 15) {
              t = bl2;
              bl2 = br;
              br = t;
            } else if (j === 31) {
              t = dl;
              dl = dr;
              dr = t;
            } else if (j === 47) {
              t = al;
              al = ar;
              ar = t;
            } else if (j === 63) {
              t = cl;
              cl = cr;
              cr = t;
            } else if (j === 79) {
              t = el;
              el = er;
              er = t;
            }
          }
          h[0] = h[0] + al >>> 0;
          h[1] = h[1] + bl2 >>> 0;
          h[2] = h[2] + cl >>> 0;
          h[3] = h[3] + dl >>> 0;
          h[4] = h[4] + el >>> 0;
          h[5] = h[5] + ar >>> 0;
          h[6] = h[6] + br >>> 0;
          h[7] = h[7] + cr >>> 0;
          h[8] = h[8] + dr >>> 0;
          h[9] = h[9] + er >>> 0;
        }
        var out = [];
        for (var k = 0; k < 10; k++) {
          out.push(h[k] & 255, h[k] >>> 8 & 255, h[k] >>> 16 & 255, h[k] >>> 24 & 255);
        }
        return out;
      }
      function hmacRipemd320(keyBytes, msgBytes) {
        var key = keyBytes.slice();
        if (key.length > 64) key = ripemd320(key);
        while (key.length < 64) key.push(0);
        var ip = [], op = [], i;
        for (i = 0; i < 64; i++) {
          ip.push(key[i] ^ 54);
          op.push(key[i] ^ 92);
        }
        return ripemd320(op.concat(ripemd320(ip.concat(msgBytes))));
      }
      module.exports = { ripemd320, hmacRipemd320 };
    }
  });

  // src/walletdata.js
  var require_walletdata = __commonJS({
    "src/walletdata.js"(exports, module) {
      module.exports = {
        P25500: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        P26600: "5b7b2274797065223a224844204b65792054726565222c2264617461223a7b226d6e656d6f6e6963223a5b3131322c39372c3132312c3130392c3130312c3131302c3131362c33322c3131372c3131322c3131352c3130312c3131362c33322c3130392c3130312c3131362c39372c3130382c33322c39392c3130342c39372c3131322c3131362c3130312c3131342c33322c3131342c3131372c3131302c33322c39372c3130302c3130392c3130352c3131362c33322c3130392c3130312c39372c3131352c3131372c3131342c3130312c33322c3131342c3130312c3130392c3130352c3131302c3130302c33322c3131352c3131372c3131322c3131322c3130382c3132312c33322c3130342c3131312c3131322c3130312c33322c3130312c3131302c3130312c3130392c3132312c33322c3130342c3130312c3130302c3130332c3130312c3130342c3131312c3130335d2c226e756d6265724f664163636f756e7473223a312c22686450617468223a226d2f3434272f3630272f30272f30227d7d5d",
        P26610: "5b7b2274797065223a224844204b65792054726565222c2264617461223a7b226d6e656d6f6e6963223a5b3131322c39372c3132312c3130392c3130312c3131",
        P29600: "3031623365643836333231316661386664656464373965373932346431376230303735353239366131336663346365336239623363333465383163333135383710101010101010101010101010101010",
        P31900: "5b7b2274797065223a224844204b65792054726565222c2264617461223a7b22",
        P16300: "b61686548b70e30404b60d9728c2759244563439cf174fe102541306c113068f49f16e2b5fe595a85b6bacca7ff35c1ae06df5cb2a2e5ee92219a20515839b3b7ec93cefa7ee7c63d065a17440bc517aa17d801eeddef8c348f3c6e2bbe100e4bc3b7d45681285b4fdb85b7b893c80f171b427744617f2bf2ebd71bde4bf7ece560dd2bd2eaf71871c91ecfd2e479224672488ef45f90c511cc6d0c2213772f31498554048de24709cba831835b158d44a9be14c3c176e40e35b551f1b8a5b70125d8fa48238c80ce7bee076a829997a5cf17231699eca66c1a8f93216f31aa11819f5fc7aba0d7609cb295206bf0a7b2142918c67fad61a14076b44127612b17f1e5127c3423f63734c9b79650fe3c3f178c4e66fb9b4231a0ae2a517da66507882bc026f768ee742b2462e2e48b545d51e43c7a240023e90e7bee2b315f5351965ecf15e4b41aa51eb25448af58752965fc270c167301cb0155c2eb8f3010e723602f101bf635a5f1d0e076f6d1d5b835d00cbe673691daa8c6917d09465226bffb4010d549adc207596a97e40c0aaad6a8672e5a31a428335f318cd047ac4e86588c0bccc1c9a1878ea45d801298e18c02b11d98e5d696565afcc54ce617530c621128c524f4ed73f641a754a7122540e968ad83c16cd6062dab32a97e69f64fb5cd3340a56d355f4171c0cb178676624bbce2c7e0a84b1fb525a4418d850a1ffec91fbd7b05a72b8985a81ce79233154fd73852ac65abf7fad0b2168654ba2d51b3974d167f841b6584ae3d38fe456596a3f87f267ed27dbc8d935ab3b370b0f73b1462bcb0b5937e81d1184247210101010101010101010101010101010"
      };
    }
  });

  // src/gen.js
  var require_gen = __commonJS({
    "src/gen.js"(exports, module) {
      var CryptoJS2 = require_crypto_js();
      require_md4();
      var _dig2 = require_digests();
      var _md5s2 = _dig2._md5s;
      var _sha1s2 = _dig2._sha1s;
      var _sha224s2 = _dig2._sha224s;
      var _sha256s2 = _dig2._sha256s;
      var _sha512s2 = _dig2._sha512s;
      var _md5raw2 = _dig2._md5raw;
      var _sha1raw2 = _dig2._sha1raw;
      var _sha256raw2 = _dig2._sha256raw;
      var _sha512raw2 = _dig2._sha512raw;
      var _zip2 = require_zip();
      var _7z = require_sevenzip();
      function _md5(s) {
        return CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha1(s) {
        return CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha224(s) {
        return CryptoJS2.SHA224(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha256(s) {
        return CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha384(s) {
        return CryptoJS2.SHA384(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _sha512(s) {
        return CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _md4u(s) {
        return CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(s)).toString();
      }
      function _ripemd160(s) {
        return CryptoJS2.RIPEMD160(CryptoJS2.enc.Latin1.parse(s)).toString();
      }
      function _u16le(s) {
        return CryptoJS2.enc.Utf16LE.parse(s);
      }
      function _hmac(hasher, msg, key) {
        return hasher(CryptoJS2.enc.Latin1.parse(msg), CryptoJS2.enc.Latin1.parse(key)).toString();
      }
      function _p(params, k, d) {
        return params && params[k] != null ? String(params[k]) : d;
      }
      var G = {};
      G[0] = (p) => _md5(p);
      G[100] = (p) => _sha1(p);
      G[1300] = (p) => _sha224(p);
      G[1400] = (p) => _sha256(p);
      G[1700] = (p) => _sha512(p);
      G[10800] = (p) => _sha384(p);
      G[900] = (p) => CryptoJS2.MD4(CryptoJS2.enc.Latin1.parse(p)).toString();
      G[1e3] = (p) => _md4u(p).toUpperCase();
      G[6e3] = (p) => _ripemd160(p);
      G[70] = (p) => CryptoJS2.MD5(_u16le(p)).toString();
      G[170] = (p) => CryptoJS2.SHA1(_u16le(p)).toString();
      G[1470] = (p) => CryptoJS2.SHA256(_u16le(p)).toString();
      G[1770] = (p) => CryptoJS2.SHA512(_u16le(p)).toString();
      G[10870] = (p) => CryptoJS2.SHA384(_u16le(p)).toString();
      G[5100] = (p) => _md5(p).substring(0, 16);
      function saltedPS(hfn) {
        return (p, params) => {
          var s = _p(params, "salt", " ha$");
          return hfn(p + s) + ":" + s;
        };
      }
      function saltedSP(hfn) {
        return (p, params) => {
          var s = _p(params, "salt", " ha$");
          return hfn(s + p) + ":" + s;
        };
      }
      G[10] = saltedPS(_md5);
      G[20] = saltedSP(_md5);
      G[110] = saltedPS(_sha1);
      G[120] = saltedSP(_sha1);
      G[1410] = saltedPS(_sha256);
      G[1420] = saltedSP(_sha256);
      G[1710] = saltedPS(_sha512);
      G[1720] = saltedSP(_sha512);
      G[1310] = saltedPS(_sha224);
      G[1320] = saltedSP(_sha224);
      function hmacKeyPass(hasher) {
        return (p, params) => {
          var s = _p(params, "salt", "salty");
          return _hmac(hasher, s, p) + ":" + s;
        };
      }
      function hmacKeySalt(hasher) {
        return (p, params) => {
          var s = _p(params, "salt", "salty");
          return _hmac(hasher, p, s) + ":" + s;
        };
      }
      G[50] = hmacKeyPass(CryptoJS2.HmacMD5);
      G[60] = hmacKeySalt(CryptoJS2.HmacMD5);
      G[150] = hmacKeyPass(CryptoJS2.HmacSHA1);
      G[160] = hmacKeySalt(CryptoJS2.HmacSHA1);
      G[1450] = hmacKeyPass(CryptoJS2.HmacSHA256);
      G[1460] = hmacKeySalt(CryptoJS2.HmacSHA256);
      G[1750] = hmacKeyPass(CryptoJS2.HmacSHA512);
      G[1760] = hmacKeySalt(CryptoJS2.HmacSHA512);
      G[2600] = (p) => _md5(_md5(p));
      G[3500] = (p) => _md5(_md5(_md5(p)));
      G[4400] = (p) => _md5(_sha1(p));
      G[4500] = (p) => _sha1(_sha1(p));
      G[4700] = (p) => _sha1(_md5(p));
      G[18500] = (p) => _sha1(_md5(_md5(p)));
      G[20800] = (p) => _sha256(_md5(p));
      G[32800] = (p) => _md5(_sha1(_md5(p)));
      G[34400] = (p) => _sha224(_sha224(p));
      G[34500] = (p) => _sha224(_sha1(p));
      G[20900] = (p) => _md5(_sha1(p) + _md5(p) + _sha1(p));
      G[21400] = (p) => _sha256(_sha256raw2(p));
      G[2630] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_md5(p + s)) + ":" + s;
      };
      G[3610] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_md5(_md5(p)) + s) + ":" + s;
      };
      G[3910] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_md5(p) + _md5(s)) + ":" + s;
      };
      G[4410] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_sha1(p) + s) + ":" + s;
      };
      G[4420] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_sha1(p + s)) + ":" + s;
      };
      G[4430] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_sha1(s + p)) + ":" + s;
      };
      G[4510] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(_sha1(p) + s) + ":" + s;
      };
      G[4710] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(_md5(p) + s) + ":" + s;
      };
      G[4711] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 8);
        return _sha1(_md5(p) + s) + ":" + s;
      };
      G[4900] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(s + p + s) + ":" + s;
      };
      G[5e3] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(_sha1(s + p + s)) + ":" + s;
      };
      G[21100] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(_md5(p + s)) + ":" + s;
      };
      G[22300] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(s + p + s) + ":" + s;
      };
      G[20710] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(_sha256(p) + s) + ":" + s;
      };
      G[20720] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(s + _sha256(p)) + ":" + s;
      };
      G[20730] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(_sha256(p + s)) + ":" + s;
      };
      G[21200] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_sha1(s) + _md5(p)) + ":" + s;
      };
      G[21300] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(s + _sha1(s + p)) + ":" + s;
      };
      G[22800] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(s + p + _md5(p)) + ":" + s;
      };
      G[24300] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha1(s + _sha1(p + s)) + ":" + s;
      };
      G[30500] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(_md5(s) + _md5(_md5(p))) + ":" + s;
      };
      G[33100] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _md5(s + _md5(p) + s) + ":" + s;
      };
      G[32410] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha512(_sha512(p) + s) + ":" + s;
      };
      G[32420] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha512(_sha512raw2(p) + s) + ":" + s;
      };
      G[21420] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(s + _sha256raw2(p)) + ":" + s;
      };
      G[33e3] = (p, params) => {
        var a = _p(params, "salt1", "aa"), b = _p(params, "salt2", "bb");
        return _md5(a + p + b) + ":" + a + ":" + b;
      };
      G[19300] = (p, params) => {
        var a = _p(params, "salt1", "aa"), b = _p(params, "salt2", "bb");
        return _sha1(a + p + b) + ":" + a + ":" + b;
      };
      G[21310] = (p, params) => {
        var a = _p(params, "salt1", "aa"), b = _p(params, "salt2", "bb");
        return _md5(a + _sha1(b + p)) + ":" + a + ":" + b;
      };
      G[31700] = (p, params) => {
        var a = _p(params, "salt1", "aa"), b = _p(params, "salt2", "bb");
        return _md5(_md5(_md5(p) + a) + b) + ":" + a + ":" + b;
      };
      G[21900] = (p, params) => {
        var a = _p(params, "salt1", "aa"), b = _p(params, "salt2", "bb");
        return _md5(_md5(_md5(p + a)) + b) + ":" + a + ":" + b;
      };
      G[20711] = (p, params) => {
        var s = _md5(_p(params, "salt", "ab12")).substring(0, 16);
        return "$SHA$" + s + "$" + _sha256(_sha256(p) + s);
      };
      function _hexOf(s) {
        return CryptoJS2.enc.Latin1.parse(s).toString(CryptoJS2.enc.Hex);
      }
      function _mssqlSalt(hint) {
        return _md5(hint).substring(0, 8);
      }
      G[2612] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return "$PHPS$" + _hexOf(s) + "$" + _md5(_md5(p) + s);
      };
      G[124] = (p, params) => {
        var s = _p(params, "salt", "fe76b");
        return "sha1$" + s + "$" + _sha1(s + p);
      };
      G[131] = (p, params) => {
        var s = _mssqlSalt(_p(params, "salt", "x"));
        return "0x0100" + s + "0".repeat(40) + CryptoJS2.SHA1(_u16le(String(p).toUpperCase()).concat(CryptoJS2.enc.Hex.parse(s))).toString();
      };
      G[132] = (p, params) => {
        var s = _mssqlSalt(_p(params, "salt", "x"));
        return "0x0100" + s + CryptoJS2.SHA1(_u16le(String(p)).concat(CryptoJS2.enc.Hex.parse(s))).toString();
      };
      G[1731] = (p, params) => {
        var s = _mssqlSalt(_p(params, "salt", "x"));
        return "0x0200" + s + CryptoJS2.SHA512(_u16le(String(p)).concat(CryptoJS2.enc.Hex.parse(s))).toString();
      };
      G[133] = (p) => CryptoJS2.SHA1(_u16le(String(p))).toString(CryptoJS2.enc.Base64);
      G[4521] = (p, params) => {
        var s = _md5(_p(params, "salt", "x"));
        return _sha1(s + _sha1(p)) + ":" + s;
      };
      G[4522] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 12);
        return _sha1(s + _sha1(p)) + ":" + s;
      };
      G[8100] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 8);
        return "1" + s + _sha1(s + p + "\0");
      };
      G[22200] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 8);
        return "2" + s + _sha512(s + p + "\0");
      };
      G[9900] = (p) => {
        var s = String(p);
        while (s.length < 100) s += "\0";
        return _md5(s.substring(0, 100));
      };
      G[11e3] = (p, params) => {
        var s = (_md5(_p(params, "salt", "x")) + _md5("p" + _p(params, "salt", "x")) + _md5("q")).substring(0, 56);
        return _md5(s + p) + ":" + s;
      };
      G[3711] = (p, params) => {
        var s = _p(params, "salt", "2152187716");
        return "$B$" + s + "$" + _md5(s + "-" + _md5(p));
      };
      G[20712] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return _sha256(_sha256(p).toUpperCase() + s).toUpperCase() + ":" + CryptoJS2.enc.Latin1.parse(s).toString(CryptoJS2.enc.Base64);
      };
      G[3e4] = (p, params) => {
        var s = _p(params, "salt", "84143");
        return "md5$" + s + "$" + _hmac(CryptoJS2.HmacMD5, p, s);
      };
      G[30120] = (p, params) => {
        var s = _p(params, "salt", "70108387805");
        return "sha256$" + s + "$" + _hmac(CryptoJS2.HmacSHA256, p, s);
      };
      var _toCiscoB64 = require_kdf()._toCiscoB64;
      function _bytesOf(latin1) {
        var b = [];
        for (var i = 0; i < latin1.length; i++) b.push(latin1.charCodeAt(i) & 255);
        return b;
      }
      function _hx(hex) {
        return CryptoJS2.enc.Hex.parse(hex).toString(CryptoJS2.enc.Latin1);
      }
      G[5700] = (p) => _toCiscoB64(_bytesOf(_sha256raw2(p)));
      G[24800] = (p) => CryptoJS2.HmacSHA1(_u16le(String(p)), _u16le(String(p))).toString(CryptoJS2.enc.Base64);
      G[8400] = (p, params) => {
        var s = _sha1(_p(params, "salt", "x"));
        return _sha1(s + _sha1(s + _sha1(p))) + ":" + s;
      };
      G[13900] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 9);
        return _sha1(s + _sha1(s + _sha1(p))) + ":" + s;
      };
      G[27200] = (p, params) => {
        var s = _sha1(_p(params, "salt", "x"));
        return _sha1("--" + s + "--" + p + "--") + ":" + s;
      };
      G[19500] = (p, params) => {
        var s = _p(params, "salt", "12345"), k = _p(params, "sitekey", "9876543210");
        var d = _sha1(k + "--" + s + "--" + p + "--" + k);
        for (var i = 0; i < 9; i++) d = _sha1(d + "--" + s + "--" + p + "--" + k);
        return d + ":" + s + ":" + k;
      };
      G[112] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 20);
        return _sha1(p + _hx(s)) + ":" + s;
      };
      G[5720] = (p, params) => {
        var s = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 64);
        var d = CryptoJS2.SHA256(CryptoJS2.enc.Hex.parse(s).concat(CryptoJS2.enc.Latin1.parse(String(p))));
        for (var i = 0; i < 128; i++) d = CryptoJS2.SHA256(d);
        return d.toString() + s;
      };
      G[4800] = (p, params) => {
        var chal = _md5(_p(params, "salt", "x")), id = _md5(_p(params, "salt", "y")).substring(0, 2);
        return _md5(_hx(id) + String(p) + _hx(chal)) + ":" + chal + ":" + id;
      };
      var _MAGIC_FG = CryptoJS2.enc.Hex.parse("a388ba2e424cb04a537930c13107cc3fa1329029a9815b70").toString(CryptoJS2.enc.Latin1);
      G[7e3] = (p, params) => {
        var salt = _hx(_md5(_p(params, "salt", "x")).substring(0, 24));
        var dig = CryptoJS2.SHA1(CryptoJS2.enc.Latin1.parse(salt + String(p) + _MAGIC_FG)).toString(CryptoJS2.enc.Latin1);
        return "AK1" + CryptoJS2.enc.Latin1.parse(salt + dig).toString(CryptoJS2.enc.Base64);
      };
      G[26300] = (p, params) => {
        var salt = _hx(_md5(_p(params, "salt", "x")).substring(0, 24));
        var dig = CryptoJS2.SHA256(CryptoJS2.enc.Latin1.parse(salt + String(p) + _MAGIC_FG)).toString(CryptoJS2.enc.Latin1);
        return "SH2" + CryptoJS2.enc.Latin1.parse(salt + dig).toString(CryptoJS2.enc.Base64);
      };
      G[8e3] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 16);
        var pw = CryptoJS2.enc.Utf16.parse(String(p));
        var pad = CryptoJS2.enc.Latin1.parse("\0".repeat(510 - String(p).length * 2));
        return "0xc007" + salt + CryptoJS2.SHA256(pw.concat(pad).concat(CryptoJS2.enc.Hex.parse(salt))).toString();
      };
      G[15e3] = (p, params) => {
        var s = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 64);
        return _sha512(String(p) + s) + ":" + s;
      };
      function _ssprIter(hasher, seedStr, it) {
        var d = hasher(CryptoJS2.enc.Latin1.parse(seedStr));
        for (var i = 1; i < it; i++) d = hasher(d);
        return d.toString();
      }
      G[32e3] = (p) => "$sspr$0$100000$NONE$" + _ssprIter(CryptoJS2.MD5, String(p), 1e5);
      G[32010] = (p) => "$sspr$1$100000$NONE$" + _ssprIter(CryptoJS2.SHA1, String(p), 1e5);
      function _ssprSalt(params) {
        return CryptoJS2.enc.Hex.parse(_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x")).substring(0, 16)).toString(CryptoJS2.enc.Base64);
      }
      G[32020] = (p, params) => {
        var bs = _ssprSalt(params);
        return "$sspr$2$100000$" + bs + "$" + _ssprIter(CryptoJS2.SHA1, bs + String(p), 1e5);
      };
      G[32030] = (p, params) => {
        var bs = _ssprSalt(params);
        return "$sspr$3$100000$" + bs + "$" + _ssprIter(CryptoJS2.SHA256, bs + String(p), 1e5);
      };
      var _u = require_util();
      var _blake2b = require_blake2b()._blake2b;
      var _md5crypt = require_crypt().md5crypt;
      function _b2(msg, n) {
        return _u._bytesToHex(_blake2b(_u._utf8Bytes(msg), n));
      }
      G[610] = (p, params) => {
        var s = _p(params, "salt", "1033");
        return "$BLAKE2$" + _b2(String(p) + s, 64) + ":" + s;
      };
      G[620] = (p, params) => {
        var s = _p(params, "salt", "3301");
        return "$BLAKE2$" + _b2(s + String(p), 64) + ":" + s;
      };
      G[34800] = (p) => "$BLAKE2$" + _b2(String(p), 32);
      G[34810] = (p, params) => {
        var s = _p(params, "salt", "2353288289");
        return "$BLAKE2$" + _b2(String(p) + s, 32) + ":" + s;
      };
      G[34820] = (p, params) => {
        var s = _p(params, "salt", "3601");
        return "$BLAKE2$" + _b2(s + String(p), 32) + ":" + s;
      };
      G[6300] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 8);
        return "{smd5}" + _md5crypt(String(p), s, "");
      };
      G[32031] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        return "$sspr$3$1000$" + s + "$" + _ssprIter(CryptoJS2.SHA256, s + String(p), 1e3);
      };
      G[32040] = (p, params) => {
        var bs = _ssprSalt(params);
        return "$sspr$4$100000$" + bs + "$" + _ssprIter(CryptoJS2.SHA512, bs + String(p), 1e5);
      };
      G[32041] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        return "$sspr$4$1000$" + s + "$" + _ssprIter(CryptoJS2.SHA512, s + String(p), 1e3);
      };
      function _pixB64g(m) {
        var a = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", o = "";
        for (var i = 0; i < 4; i++) {
          var v = (m.charCodeAt(i * 4) & 255 | (m.charCodeAt(i * 4 + 1) & 255) << 8 | (m.charCodeAt(i * 4 + 2) & 255) << 16 | (m.charCodeAt(i * 4 + 3) & 255) << 24) >>> 0;
          for (var j = 0; j < 4; j++) {
            o += a.charAt(v & 63);
            v = Math.floor(v / 64);
          }
        }
        return o;
      }
      function _md5pad(s) {
        var pad = Math.ceil(s.length / 16) * 16 || 16;
        while (s.length < pad) s += "\0";
        return CryptoJS2.MD5(CryptoJS2.enc.Latin1.parse(s)).toString(CryptoJS2.enc.Latin1);
      }
      G[2400] = (p) => _pixB64g(_md5pad(String(p)));
      G[2410] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 4);
        return _pixB64g(_md5pad(String(p) + s)) + ":" + s;
      };
      var _nc2 = require_noncrypto();
      function _h8(x) {
        return (x >>> 0).toString(16).padStart(8, "0");
      }
      G[18700] = (p) => _h8(_nc2.javaHashCode(String(p)));
      G[25700] = (p, params) => {
        var seed = parseInt(_md5(_p(params, "salt", "x")).substring(0, 8), 16) >>> 0;
        return _h8(_nc2.murmur2(_nc2._bytes(String(p)), seed)) + ":" + _h8(seed);
      };
      G[27800] = (p, params) => {
        var seed = parseInt(_md5(_p(params, "salt", "x")).substring(0, 8), 16) >>> 0;
        return _h8(_nc2.murmur3(_nc2._bytes(String(p)), seed)) + ":" + _h8(seed);
      };
      G[34200] = (p, params) => {
        var seed = BigInt("0x" + _md5(_p(params, "salt", "x")).substring(0, 16));
        return _nc2._hex64(_nc2.murmur64a(_nc2._bytes(String(p)), seed)) + ":" + seed.toString(16).padStart(16, "0");
      };
      G[34201] = (p) => _nc2._hex64(_nc2.murmur64a(_nc2._bytes(String(p)), 0n));
      G[34211] = (p) => _nc2._hex64(_nc2.murmur64a(_nc2._bytes(String(p)), 0n)).substring(0, 8);
      var _des2 = require_des();
      function _sbG(s) {
        var b = [];
        for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 255);
        return b;
      }
      function _bhG(b) {
        var s = "";
        for (var i = 0; i < b.length; i++) {
          var c = (b[i] & 255).toString(16);
          s += c.length < 2 ? "0" + c : c;
        }
        return s;
      }
      G[14e3] = (p, params) => {
        if (String(p).length !== 8) return null;
        var salt = _md5(_p(params, "salt", "x")).substring(0, 16);
        return _bhG(_des2.desEncryptBlock(_sbG(String(p)), _hx2(salt))) + ":" + salt;
      };
      G[3e3] = (p) => {
        if (String(p).length > 7 || String(p).length === 0) return null;
        return _bhG(_des2.lmHashHalf(_sbG(String(p).toUpperCase())));
      };
      G[16e3] = (p) => {
        var w = String(p);
        var salt = w.length < 2 ? "aa" : (w + "..").substr(1, 2);
        salt = salt.replace(/[^.-z]/g, ".");
        var from = ":;<=>?@[\\]^_`", to = "ABCDEFGabcdef", o = "";
        for (var i = 0; i < salt.length; i++) {
          var j = from.indexOf(salt[i]);
          o += j < 0 ? salt[i] : to[j];
        }
        return _des2.descryptCompute(w, o).slice(-10);
      };
      function _hx2(hex) {
        var b = [];
        for (var i = 0; i < hex.length; i += 2) b.push(parseInt(hex.substr(i, 2), 16));
        return b;
      }
      function _aesEcbNokdf(p, klen, salt) {
        var k = String(p);
        while (k.length < klen) k += "\0";
        return CryptoJS2.AES.encrypt(CryptoJS2.enc.Hex.parse(salt), CryptoJS2.enc.Latin1.parse(k.substring(0, klen)), { mode: CryptoJS2.mode.ECB, padding: CryptoJS2.pad.NoPadding }).ciphertext.toString();
      }
      G[26401] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 32);
        return _aesEcbNokdf(p, 16, s) + ":" + s;
      };
      G[26402] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 32);
        return _aesEcbNokdf(p, 24, s) + ":" + s;
      };
      G[26403] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 32);
        return _aesEcbNokdf(p, 32, s) + ":" + s;
      };
      G[6050] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return CryptoJS2.HmacRIPEMD160(CryptoJS2.enc.Latin1.parse(s), CryptoJS2.enc.Latin1.parse(String(p))).toString() + ":" + s;
      };
      G[6060] = (p, params) => {
        var s = _p(params, "salt", "ab12");
        return CryptoJS2.HmacRIPEMD160(CryptoJS2.enc.Latin1.parse(String(p)), CryptoJS2.enc.Latin1.parse(s)).toString() + ":" + s;
      };
      G[19e3] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        return "@m@" + _md5(s + String(p).repeat(1001)) + "@" + s;
      };
      G[19100] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        return "@s@" + _sha256(s + String(p).repeat(1001)) + "@" + s;
      };
      G[19200] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        return "@S@" + _sha512(s + String(p).repeat(1001)) + "@" + s;
      };
      G[12600] = (p, params) => {
        var s = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 64);
        return _sha256(s + _sha1(String(p)).toUpperCase()) + ":" + s;
      };
      G[22301] = (p, params) => {
        var s = _md5(_p(params, "salt", "x")).substring(0, 32);
        var sb = _hx(s);
        return "$telegram$0*" + _sha256(sb + String(p) + sb) + "*" + s;
      };
      G[30420] = (p) => _sha256(String(p)).substring(0, 56);
      G[11100] = (p, params) => {
        var user = _p(params, "user", "postgres");
        var salt = _md5(_p(params, "salt", "x")).substring(0, 8);
        return "$postgres$" + user + "*" + salt + "*" + _md5(_md5(String(p) + user) + _hx(salt));
      };
      G[11200] = (p, params) => {
        var chal = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 40);
        var sp = _sha1raw2(String(p)), x = _sha1raw2(_hx(chal) + _sha1raw2(sp)), out = "";
        for (var i = 0; i < 20; i++) {
          var b = (sp.charCodeAt(i) ^ x.charCodeAt(i)) & 255, c = b.toString(16);
          out += c.length < 2 ? "0" + c : c;
        }
        return "$mysqlna$" + chal + "*" + out;
      };
      G[10200] = (p, params) => {
        var chal = _p(params, "salt", "challenge12"), user = _p(params, "user", "user");
        var hmac = CryptoJS2.HmacMD5(CryptoJS2.enc.Latin1.parse(chal), CryptoJS2.enc.Latin1.parse(String(p))).toString();
        return "$cram_md5$" + CryptoJS2.enc.Latin1.parse(chal).toString(CryptoJS2.enc.Base64) + "$" + CryptoJS2.enc.Latin1.parse(user + " " + hmac).toString(CryptoJS2.enc.Base64);
      };
      G[12150] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 16);
        var d = CryptoJS2.SHA512(CryptoJS2.enc.Latin1.parse(salt).concat(CryptoJS2.enc.Latin1.parse(String(p))));
        for (var i = 1; i < 1024; i++) d = CryptoJS2.SHA512(d);
        return "$shiro1$SHA-512$1024$" + CryptoJS2.enc.Latin1.parse(salt).toString(CryptoJS2.enc.Base64) + "$" + d.toString(CryptoJS2.enc.Base64);
      };
      G[12300] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 32);
        var saltbin = CryptoJS2.enc.Hex.parse(salt);
        var key = CryptoJS2.PBKDF2(String(p), saltbin.clone().concat(CryptoJS2.enc.Latin1.parse("AUTH_PBKDF2_SPEEDY_KEY")), { keySize: 16, iterations: 4096, hasher: CryptoJS2.algo.SHA512 });
        return CryptoJS2.SHA512(key.clone().concat(saltbin)).toString().toUpperCase() + salt.toUpperCase();
      };
      G[10100] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x"));
        var r = _nc2.siphash24(_nc2._bytes(String(p)), _hx2(salt));
        var hi = Number(r >> 32n & 0xffffffffn) >>> 0, lo = Number(r & 0xffffffffn) >>> 0;
        var sw = (x) => ((x & 255) << 24 | (x & 65280) << 8 | x >>> 8 & 65280 | x >>> 24 & 255) >>> 0;
        return sw(lo).toString(16).padStart(8, "0") + sw(hi).toString(16).padStart(8, "0") + ":2:4:" + salt;
      };
      G[27900] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 8);
        return _nc2.crc32c(_nc2._bytes(String(p)), parseInt(salt, 16) >>> 0).toString(16).padStart(8, "0") + ":" + salt;
      };
      G[28e3] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 16);
        return _nc2._hex64(_nc2.crc64jones(_nc2._bytes(String(p)), BigInt("0x" + salt))) + ":" + salt;
      };
      var _b2s = require_blake2s();
      var _rmd3202 = require_ripemd320();
      G[31e3] = (p) => "$BLAKE2$" + _bhG(_b2s.blake2s(_sbG(String(p)), 32));
      G[33300] = (p, params) => {
        var s = _p(params, "salt", "1234");
        return _bhG(_b2s.hmacBlake2s(_sbG(String(p)), _sbG(s))) + ":" + s;
      };
      G[33600] = (p) => _bhG(_rmd3202.ripemd320(_sbG(String(p))));
      G[33650] = (p, params) => {
        var s = _p(params, "salt", "1234");
        return _bhG(_rmd3202.hmacRipemd320(_sbG(String(p)), _sbG(s))) + ":" + s;
      };
      G[33660] = (p, params) => {
        var s = _p(params, "salt", "1234");
        return _bhG(_rmd3202.hmacRipemd320(_sbG(s), _sbG(String(p)))) + ":" + s;
      };
      G[1100] = (p, params) => {
        var s = _p(params, "salt", "domainuser");
        var inner = CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p)));
        return CryptoJS2.MD4(inner.clone().concat(CryptoJS2.enc.Utf16LE.parse(s.toLowerCase()))).toString() + ":" + s;
      };
      G[2100] = (p, params) => {
        var user = _p(params, "salt", "admin");
        var saltbin = CryptoJS2.enc.Utf16LE.parse(user.toLowerCase());
        var dcc = CryptoJS2.MD4(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p))).clone().concat(saltbin));
        return "$DCC2$1024#" + user + "#" + CryptoJS2.PBKDF2(dcc, saltbin, { keySize: 4, iterations: 1024, hasher: CryptoJS2.algo.SHA1 }).toString();
      };
      G[7100] = (p, params) => {
        var salt = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 64);
        return "$ml$1024$" + salt + "$" + CryptoJS2.PBKDF2(String(p), CryptoJS2.enc.Hex.parse(salt), { keySize: 16, iterations: 1024, hasher: CryptoJS2.algo.SHA512 }).toString();
      };
      G[7200] = (p, params) => {
        var b = _p(params, "salt", "x");
        var salt = (_md5(b) + _md5("a" + b) + _md5("b" + b) + _md5("c" + b)).substring(0, 128);
        return "grub.pbkdf2.sha512.1024." + salt + "." + CryptoJS2.PBKDF2(String(p), CryptoJS2.enc.Hex.parse(salt), { keySize: 16, iterations: 1024, hasher: CryptoJS2.algo.SHA512 }).toString();
      };
      G[7300] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"));
        return salt + ":" + CryptoJS2.HmacSHA1(CryptoJS2.enc.Hex.parse(salt), CryptoJS2.enc.Latin1.parse(String(p))).toString();
      };
      G[7350] = (p, params) => {
        var b = _p(params, "salt", "x");
        var salt = _md5(b) + _md5("a" + b) + _md5("b" + b) + _md5("c" + b);
        return CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(salt), CryptoJS2.enc.Latin1.parse(String(p))).toString() + ":" + salt;
      };
      G[5300] = (p, params) => {
        var b = _p(params, "salt", "x");
        var f = [];
        for (var i = 0; i < 6; i++) f.push(_md5(i + b) + _md5("a" + i + b));
        var f6 = (_md5("n1" + b) + _md5("n2" + b)).substring(0, 40), f7 = (_md5("n3" + b) + _md5("n4" + b)).substring(0, 40);
        var d1 = CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(f6 + f7), CryptoJS2.enc.Latin1.parse(String(p)));
        var d2 = CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(f.join("")), d1).toString();
        return f.join(":") + ":" + f6 + ":" + f7 + ":" + d2;
      };
      G[5400] = (p, params) => {
        var b = _p(params, "salt", "x");
        var f = [];
        for (var i = 0; i < 6; i++) f.push(_md5(i + b) + _md5("a" + i + b));
        var f6 = (_md5("n1" + b) + _md5("n2" + b)).substring(0, 40), f7 = (_md5("n3" + b) + _md5("n4" + b)).substring(0, 40);
        var d1 = CryptoJS2.HmacSHA1(CryptoJS2.enc.Hex.parse(f6 + f7), CryptoJS2.enc.Latin1.parse(String(p)));
        var d2 = CryptoJS2.HmacSHA1(CryptoJS2.enc.Hex.parse(f.join("")), d1).toString();
        return f.join(":") + ":" + f6 + ":" + f7 + ":" + d2;
      };
      G[14100] = (p, params) => {
        var w = String(p);
        if (w.length !== 24) return null;
        var s = _md5(_p(params, "salt", "x")).substring(0, 16);
        var ct = _des2.desEncryptBlock(_sbG(w.slice(0, 8)), _hx2(s));
        ct = _des2.desDecryptBlock(_sbG(w.slice(8, 16)), ct);
        ct = _des2.desEncryptBlock(_sbG(w.slice(16, 24)), ct);
        return _bhG(ct) + ":" + s;
      };
      function _rc4gen(p, keybits) {
        return "$rc4$" + keybits + "$0$" + _bhG(_nc2.rc4drop(_sbG(String(p)), 0, _hx2("48656c6c6f"))) + "$0$48656c6c6f";
      }
      G[33500] = (p) => String(p).length === 5 ? _rc4gen(p, 40) : null;
      G[33501] = (p) => String(p).length === 9 ? _rc4gen(p, 72) : null;
      G[33502] = (p) => String(p).length === 13 ? _rc4gen(p, 104) : null;
      G[21500] = (p, params) => {
        var u = _md5(_p(params, "salt", "x")).substring(0, 10);
        var cs = u.substring(0, 8);
        var key = CryptoJS2.PBKDF2(String(p), CryptoJS2.enc.Latin1.parse(cs), { keySize: 256, iterations: 1e3, hasher: CryptoJS2.algo.SHA1 });
        return "$solarwinds$0$" + u + "$" + CryptoJS2.SHA512(key).toString(CryptoJS2.enc.Base64);
      };
      G[21501] = (p, params) => {
        var salt = CryptoJS2.enc.Hex.parse(_md5(_p(params, "salt", "x")));
        var key = CryptoJS2.PBKDF2(String(p), salt, { keySize: 256, iterations: 1e3, hasher: CryptoJS2.algo.SHA1 });
        return "$solarwinds$1$" + salt.toString(CryptoJS2.enc.Base64) + "$" + CryptoJS2.SHA512(key).toString(CryptoJS2.enc.Base64);
      };
      G[22400] = (p, params) => {
        var b = _p(params, "salt", "x");
        var salt = _md5(b), iv = _md5("iv" + b), ka = _md5("k1" + b) + _md5("k2" + b);
        var key = CryptoJS2.enc.Hex.parse(salt).concat(CryptoJS2.enc.Latin1.parse("\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"));
        var w = CryptoJS2.enc.Utf16LE.parse(String(p));
        for (var i = 0; i < 8192; i++) key = CryptoJS2.SHA256(key.clone().concat(w));
        return "$aescrypt$1*" + salt + "*" + iv + "*" + ka + "*" + CryptoJS2.HmacSHA256(CryptoJS2.enc.Hex.parse(iv).concat(CryptoJS2.enc.Hex.parse(ka)), key).toString();
      };
      G[23400] = (p, params) => {
        var email = CryptoJS2.enc.Latin1.parse(_p(params, "salt", "noreply@hashcat.net"));
        var d1 = CryptoJS2.PBKDF2(String(p), email, { keySize: 8, iterations: 1e3, hasher: CryptoJS2.algo.SHA256 });
        var d2 = CryptoJS2.PBKDF2(d1, CryptoJS2.enc.Latin1.parse(String(p)), { keySize: 8, iterations: 2, hasher: CryptoJS2.algo.SHA256 });
        return "$bitwarden$2*1000*2*" + email.toString(CryptoJS2.enc.Base64) + "*" + d2.toString(CryptoJS2.enc.Base64);
      };
      G[31300] = (p, params) => {
        var b = _p(params, "salt", "x");
        var salt = (_md5(b) + _md5("a" + b) + _md5("c" + b)).substring(0, 96);
        return "$sntp-ms$" + CryptoJS2.MD5(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p))).concat(CryptoJS2.enc.Hex.parse(salt))).toString() + "$" + salt;
      };
      G[13500] = (p, params) => {
        var b = _p(params, "salt", "x");
        var salt = (_md5(b) + _md5("a" + b) + _md5("c" + b)).substring(0, 80);
        return CryptoJS2.SHA1(CryptoJS2.enc.Hex.parse(salt).concat(CryptoJS2.enc.Utf16LE.parse(String(p)))).toString() + ":" + salt;
      };
      G[29100] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")) + "." + _md5("a" + _p(params, "salt", "x")).substring(0, 6);
        var d1 = CryptoJS2.HmacSHA1(CryptoJS2.enc.Latin1.parse("cookie-session"), CryptoJS2.enc.Latin1.parse(String(p)));
        var d2 = CryptoJS2.HmacSHA1(CryptoJS2.enc.Latin1.parse(salt), d1);
        return salt + "." + d2.toString(CryptoJS2.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      };
      G[28700] = (p, params) => {
        var longdate = "20220221T000000Z", region = "us-east-1", service = "s3", canonical = (_md5(_p(params, "salt", "x")) + _md5("a" + _p(params, "salt", "x"))).substring(0, 64);
        var date = longdate.substring(0, 8), L = CryptoJS2.enc.Latin1;
        var kDate = CryptoJS2.HmacSHA256(L.parse(date), L.parse("AWS4" + String(p)));
        var kRegion = CryptoJS2.HmacSHA256(L.parse(region), kDate);
        var kService = CryptoJS2.HmacSHA256(L.parse(service), kRegion);
        var kSigning = CryptoJS2.HmacSHA256(L.parse("aws4_request"), kService);
        var sts = "AWS4-HMAC-SHA256\n" + longdate + "\n" + date + "/" + region + "/" + service + "/aws4_request\n" + canonical;
        return "$AWS-Sig-v4$0$" + longdate + "$" + region + "$" + service + "$" + canonical + "$" + CryptoJS2.HmacSHA256(L.parse(sts), kSigning).toString();
      };
      G[5800] = (p, params) => {
        var salt = _md5(_p(params, "salt", "x")).substring(0, 16), L = CryptoJS2.enc.Latin1;
        var d = CryptoJS2.SHA1(L.parse("0" + String(p) + salt));
        for (var k = 1; k < 1024; k++) d = CryptoJS2.SHA1(L.parse(d.toString(L) + (k + String(p) + salt)));
        return d.toString() + ":" + salt;
      };
      G[14900] = (p, params) => {
        if (String(p).length !== 10) return null;
        var salt = _md5(_p(params, "salt", "x")).substring(0, 8);
        return _bhG(_nc2.skip32(_sbG(String(p)), _hx2(salt), true)) + ":" + salt;
      };
      G[15400] = (p) => {
        var w = String(p);
        if (w.length !== 32) return null;
        var counter = "0400000000000003", iv = "0200000000000001", offset = 16;
        var PT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0a2b4c6d8e", seg = [], i;
        for (i = 0; i < 8; i++) seg.push(PT.charCodeAt(offset + i) & 255);
        var ks = _nc2.chacha20ks(_sbG(w), _hx2(iv), _hx2(counter), offset + 8), ct = [];
        for (i = 0; i < 8; i++) ct.push(ks[offset + i] ^ seg[i]);
        return "$chacha20$*" + counter + "*" + offset + "*" + iv + "*" + _bhG(seg) + "*" + _bhG(ct);
      };
      G[8300] = (p, params) => {
        var b = _p(params, "salt", "x");
        var domain = "." + _md5(b).substring(0, 8) + ".net", saltHex = _md5("s" + b).substring(0, 8), iter = 1;
        var name = (String(p) + domain).toLowerCase();
        var saltWA = CryptoJS2.enc.Hex.parse(saltHex);
        var hh = CryptoJS2.SHA1(CryptoJS2.enc.Hex.parse(_bhG(_nc2.dnsWire(name))).concat(saltWA));
        for (var i = 0; i < iter; i++) hh = CryptoJS2.SHA1(hh.clone().concat(saltWA));
        return _nc2.base32hex(_hx2(hh.toString())) + ":" + domain + ":" + saltHex + ":" + iter;
      };
      G[16100] = (p, params) => {
        var sid = _md5(_p(params, "salt", "x")).substring(0, 8), seq = "c006";
        var kb = _hx2(CryptoJS2.MD5(CryptoJS2.enc.Hex.parse(sid).concat(CryptoJS2.enc.Latin1.parse(String(p))).concat(CryptoJS2.enc.Hex.parse(seq))).toString());
        var plain = [1, 0, 0, 0, 0, 0], enc = "";
        for (var i = 0; i < 6; i++) {
          var b = (plain[i] ^ kb[i]) & 255, c = b.toString(16);
          enc += c.length < 2 ? "0" + c : c;
        }
        return "$tacacs-plus$0$" + sid + "$" + enc + "$" + seq;
      };
      function _dsalt(params, n) {
        var h = _p(params, "salt", "x"), s = "", i = 0;
        while (s.length < n) {
          s += _md5((i || "") + h);
          i++;
        }
        return s.substring(0, n);
      }
      function _saltedGen(hasher, order, u16) {
        return (p, params) => {
          var s = _dsalt(params, 8);
          var pw = u16 ? _u16le(String(p)) : CryptoJS2.enc.Latin1.parse(String(p));
          var sw = CryptoJS2.enc.Latin1.parse(s);
          var m = order === "ps" ? pw.clone().concat(sw) : sw.clone().concat(pw);
          return hasher(m).toString() + ":" + s;
        };
      }
      G[30] = _saltedGen(CryptoJS2.MD5, "ps", true);
      G[40] = _saltedGen(CryptoJS2.MD5, "sp", true);
      G[130] = _saltedGen(CryptoJS2.SHA1, "ps", true);
      G[140] = _saltedGen(CryptoJS2.SHA1, "sp", true);
      G[1430] = _saltedGen(CryptoJS2.SHA256, "ps", true);
      G[1440] = _saltedGen(CryptoJS2.SHA256, "sp", true);
      G[1730] = _saltedGen(CryptoJS2.SHA512, "ps", true);
      G[1740] = _saltedGen(CryptoJS2.SHA512, "sp", true);
      G[10810] = _saltedGen(CryptoJS2.SHA384, "ps", false);
      G[10820] = _saltedGen(CryptoJS2.SHA384, "sp", false);
      G[10830] = _saltedGen(CryptoJS2.SHA384, "ps", true);
      G[10840] = _saltedGen(CryptoJS2.SHA384, "sp", true);
      function _sshaGen(tag, hasher) {
        return (p, params) => {
          var s = tag === "SHA" ? "" : _dsalt(params, 6);
          var dig = hasher(CryptoJS2.enc.Latin1.parse(String(p) + s)).toString(CryptoJS2.enc.Latin1);
          return "{" + tag + "}" + CryptoJS2.enc.Latin1.parse(dig + s).toString(CryptoJS2.enc.Base64);
        };
      }
      G[101] = _sshaGen("SHA", CryptoJS2.SHA1);
      G[111] = _sshaGen("SSHA", CryptoJS2.SHA1);
      G[1411] = _sshaGen("SSHA256", CryptoJS2.SHA256);
      G[1711] = _sshaGen("SSHA512", CryptoJS2.SHA512);
      G[300] = (p) => _sha1(_sha1raw2(p));
      G[600] = (p) => "$BLAKE2$" + _b2(String(p), 64);
      G[21e3] = (p) => _sha512(_sha512raw2(p));
      G[4300] = (p) => _md5(_md5(p).toUpperCase());
      G[11] = (p, params) => {
        var s = _dsalt(params, 32);
        return _md5(String(p) + s) + ":" + s;
      };
      G[21] = (p, params) => {
        var s = _dsalt(params, 2);
        return _md5(s + String(p)) + ":" + s;
      };
      G[23] = (p, params) => {
        var s = _dsalt(params, 7);
        return _md5(s + "\nskyper\n" + String(p)) + ":" + s;
      };
      G[121] = (p, params) => {
        var s = _dsalt(params, 8);
        return _sha1(s.toLowerCase() + String(p)) + ":" + s;
      };
      G[2611] = (p, params) => {
        var s = _dsalt(params, 3);
        return _md5(_md5(String(p)) + s) + ":" + s;
      };
      G[2711] = (p, params) => {
        var s = _dsalt(params, 30);
        return _md5(_md5(String(p)) + s) + ":" + s;
      };
      G[2811] = (p, params) => {
        var s = _dsalt(params, 5);
        return _md5(_md5(s) + _md5(String(p))) + ":" + s;
      };
      G[3710] = (p, params) => {
        var s = _dsalt(params, 12);
        return _md5(s + _md5(String(p))) + ":" + s;
      };
      G[3800] = (p, params) => {
        var s = _dsalt(params, 4);
        return _md5(s + String(p) + s) + ":" + s;
      };
      G[4010] = (p, params) => {
        var s = _dsalt(params, 13);
        return _md5(s + _md5(s + String(p))) + ":" + s;
      };
      G[4110] = (p, params) => {
        var s = _dsalt(params, 11);
        return _md5(s + _md5(String(p) + s)) + ":" + s;
      };
      G[4520] = (p, params) => {
        var s = _dsalt(params, 16);
        return _sha1(s + _sha1(String(p))) + ":" + s;
      };
      var _cryptM = require_crypt();
      var _wp = require_whirlpool();
      var _kc = require_keccak();
      var _smM = require_sm3();
      var _bcM = require_bcryptjs_own();
      var _scrypt = require_scrypt()._scrypt;
      var _waB = _u._waToBytes;
      var _b2WA = _u._bytesToWA;
      function _L1(s) {
        return CryptoJS2.enc.Latin1.parse(s);
      }
      function _b64ofBytes(b) {
        return _b2WA(b).toString(CryptoJS2.enc.Base64);
      }
      G[200] = (p) => _dig2.mysql323Hash(String(p));
      G[6100] = (p) => _wp.whirlpoolHex(_u._utf8Bytes(String(p)));
      function _sha3g(p, bits, pad) {
        return _bhG(_kc._keccak(_sbG(String(p)), 200 - bits / 4, bits / 8, pad));
      }
      G[17300] = (p) => _sha3g(p, 224, 6);
      G[17400] = (p) => _sha3g(p, 256, 6);
      G[17500] = (p) => _sha3g(p, 384, 6);
      G[17600] = (p) => _sha3g(p, 512, 6);
      G[17700] = (p) => _sha3g(p, 224, 1);
      G[17800] = (p) => _sha3g(p, 256, 1);
      G[17900] = (p) => _sha3g(p, 384, 1);
      G[18e3] = (p) => _sha3g(p, 512, 1);
      G[500] = (p, params) => _cryptM.md5crypt(String(p), _dsalt(params, 8), "$1$");
      G[1600] = (p, params) => _cryptM.md5crypt(String(p), _dsalt(params, 8), "$apr1$");
      G[7400] = (p, params) => _cryptM.sha256crypt(String(p), _dsalt(params, 8));
      G[1800] = (p, params) => _cryptM.sha512crypt(String(p), _dsalt(params, 8));
      G[15100] = (p, params) => _cryptM.genSha1crypt(String(p), _dsalt(params, 8), 2e4);
      G[7401] = (p, params) => _cryptM.genMysqlA(String(p), _dsalt(params, 40), 5);
      G[400] = (p, params) => _cryptM.genPhpass(String(p), _dsalt(params, 8), "B");
      G[35100] = (p, params) => _smM.genSm3crypt(String(p), _dsalt(params, 16), 5e3);
      var _A64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      G[1500] = (p, params) => {
        var h = _dsalt(params, 4);
        return _des2.descryptCompute(String(p), _A64[parseInt(h.substr(0, 2), 16) & 63] + _A64[parseInt(h.substr(2, 2), 16) & 63]);
      };
      function _sapHg(tag, hasher, dlen, iter) {
        return (p, params) => {
          var salt = _hx(_dsalt(params, 18)), buf = _L1(salt), pw = _L1(String(p));
          for (var i = 0; i < iter; i++) buf = hasher(pw.clone().concat(buf));
          return "{" + tag + ", " + iter + "}" + _L1(buf.toString(CryptoJS2.enc.Latin1).substring(0, dlen) + salt).toString(CryptoJS2.enc.Base64);
        };
      }
      G[10300] = _sapHg("x-issha", CryptoJS2.SHA1, 20, 1024);
      G[35e3] = _sapHg("x-isSHA512", CryptoJS2.SHA512, 64, 1024);
      function _bcSalt(params) {
        var h = _dsalt(params, 32), b = [];
        for (var i = 0; i < 16; i++) b.push(parseInt(h.substr(i * 2, 2), 16));
        return b;
      }
      G[3200] = (p, params) => _bcM.bcryptHash(String(p), _bcSalt(params), 5, "a");
      G[25600] = (p, params) => _bcM.bcryptHash(_md5(String(p)), _bcSalt(params), 5, "a");
      G[25800] = (p, params) => _bcM.bcryptHash(_sha1(String(p)), _bcSalt(params), 5, "a");
      G[30600] = (p, params) => _bcM.bcryptHash(_sha256(String(p)), _bcSalt(params), 5, "a");
      G[28400] = (p, params) => _bcM.bcryptHash(_sha512(String(p)), _bcSalt(params), 5, "a");
      G[30601] = (p, params) => {
        var sb = _bcSalt(params), enc = _bcM.base64_encode(sb, 16);
        var mac = CryptoJS2.HmacSHA256(_L1(String(p)), _L1(enc)).toString(CryptoJS2.enc.Base64);
        return "$bcrypt-sha256$v=2,t=2b,r=05$" + enc + "$" + _bcM.bcryptHash(mac, sb, 5, "b").substring(29);
      };
      function _pb(alg, p, saltWA, iter, dk) {
        return CryptoJS2.PBKDF2(String(p), saltWA, { keySize: Math.ceil(dk / 4), iterations: iter, hasher: alg });
      }
      function _pbGen(prefix, alg, dk) {
        return (p, params) => {
          var s = _dsalt(params, 8), it = 1e3, sw = _L1(s);
          return prefix + ":" + it + ":" + sw.toString(CryptoJS2.enc.Base64) + ":" + _pb(alg, p, sw, it, dk).toString(CryptoJS2.enc.Base64);
        };
      }
      G[11900] = _pbGen("md5", CryptoJS2.algo.MD5, 32);
      G[12e3] = _pbGen("sha1", CryptoJS2.algo.SHA1, 16);
      G[10900] = _pbGen("sha256", CryptoJS2.algo.SHA256, 24);
      G[12100] = _pbGen("sha512", CryptoJS2.algo.SHA512, 16);
      G[1e4] = (p, params) => {
        var s = _dsalt(params, 12), it = 1e4, sw = _L1(s);
        return "pbkdf2_sha256$" + it + "$" + s + "$" + _pb(CryptoJS2.algo.SHA256, p, sw, it, 32).toString(CryptoJS2.enc.Base64);
      };
      G[21600] = (p, params) => {
        var s = _dsalt(params, 12), it = 1e3, sw = _L1(s);
        return "pbkdf2(" + it + ",20,sha512)$" + s + "$" + _pb(CryptoJS2.algo.SHA512, p, sw, it, 20).toString(CryptoJS2.enc.Hex);
      };
      G[32900] = (p, params) => {
        var s = _dsalt(params, 8), it = 1e3, t = CryptoJS2.SHA1(_L1(String(p) + s));
        for (var i = 1; i < it; i++) t = CryptoJS2.SHA1(t);
        return "PBKDF1:sha1:" + it + ":" + _L1(s).toString(CryptoJS2.enc.Base64) + ":" + t.toString(CryptoJS2.enc.Base64);
      };
      function _ab64(wa) {
        return wa.toString(CryptoJS2.enc.Base64).replace(/\+/g, ".").replace(/=+$/, "");
      }
      function _passlibG(tag, alg, dk, it) {
        return (p, params) => {
          var sw = CryptoJS2.enc.Hex.parse(_dsalt(params, 32));
          return "$" + tag + "$" + it + "$" + _ab64(sw) + "$" + _ab64(_pb(alg, p, sw, it, dk));
        };
      }
      G[20200] = _passlibG("pbkdf2-sha512", CryptoJS2.algo.SHA512, 64, 1e3);
      G[20300] = _passlibG("pbkdf2-sha256", CryptoJS2.algo.SHA256, 32, 1e3);
      G[20400] = _passlibG("pbkdf2", CryptoJS2.algo.SHA1, 20, 1e3);
      G[32060] = (p, params) => {
        var sw = CryptoJS2.enc.Hex.parse(_dsalt(params, 64));
        return "$pbkdf2-sha256$100000$" + _ab64(sw) + "$" + _ab64(_pb(CryptoJS2.algo.SHA256, p, sw, 1e5, 32));
      };
      G[32050] = (p, params) => {
        var sb = _hx2(_dsalt(params, 64)), it = 1e5;
        return "$pbkdf2-hmac-sha1$" + it + "$" + _bhG(sb) + "$" + _pb(CryptoJS2.algo.SHA1, p, _b2WA(sb), it, 20).toString(CryptoJS2.enc.Hex);
      };
      G[32070] = (p, params) => {
        var sb = _hx2(_dsalt(params, 64)), it = 1e5;
        return "$pbkdf2-hmac-sha512$" + it + "." + _bhG(sb) + "." + _pb(CryptoJS2.algo.SHA512, p, _b2WA(sb), it, 64).toString(CryptoJS2.enc.Hex);
      };
      G[12800] = (p, params) => {
        var sb = _hx2(_dsalt(params, 20)), it = 100, nt = CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p))).toString().toUpperCase();
        var dk = CryptoJS2.PBKDF2(CryptoJS2.enc.Utf16LE.parse(nt), _b2WA(sb), { keySize: 8, iterations: it, hasher: CryptoJS2.algo.SHA256 });
        return "v1;PPH1_MD4," + _bhG(sb) + "," + it + "," + dk.toString(CryptoJS2.enc.Hex);
      };
      G[9200] = (p, params) => {
        var s = _dsalt(params, 14), sw = _L1(s);
        return "$8$" + s + "$" + _toCiscoB64(_waB(_pb(CryptoJS2.algo.SHA256, p, sw, 2e4, 32)));
      };
      G[9300] = (p, params) => {
        var s = _dsalt(params, 14);
        return "$9$" + s + "$" + _toCiscoB64(_scrypt(_sbG(String(p)), _sbG(s), 16384, 1, 1, 32));
      };
      G[8900] = (p, params) => {
        var s = _dsalt(params, 9), N = 16384, r = 8, pp = 1, dk = _scrypt(_sbG(String(p)), _sbG(s), N, r, pp, 32);
        return "SCRYPT:" + N + ":" + r + ":" + pp + ":" + _L1(s).toString(CryptoJS2.enc.Base64) + ":" + _b64ofBytes(dk);
      };
      G[501] = (p, params) => {
        var inner = _cryptM.md5crypt(String(p), "danastre", "$1$");
        while (inner.length < 64) inner += "\0";
        var key = CryptoJS2.enc.Hex.parse("a6707a7e8df91059dea70ae52f9c2442");
        var ivb = _hx2(_dsalt(params, 24));
        var ct = CryptoJS2.AES.encrypt(_L1(inner.substring(0, 64)), key, { iv: _b2WA(ivb.concat([0, 0, 0, 0])), mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }).ciphertext;
        return _b2WA(ivb).concat(ct).toString(CryptoJS2.enc.Base64);
      };
      G[10901] = (p, params) => {
        var sb = _hx2(_dsalt(params, 128)), it = 1e3, dk = _waB(_pb(CryptoJS2.algo.SHA256, p, _b2WA(sb), it, 256));
        var blob = [it >>> 24 & 255, it >>> 16 & 255, it >>> 8 & 255, it & 255].concat(sb).concat(dk);
        return "{PBKDF2_SHA256}" + _b64ofBytes(blob);
      };
      var _nn = require_netntlm();
      function _NT16(p) {
        return _u._waToBytes(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p))));
      }
      G[16500] = (p) => {
        var stub = "eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9";
        return stub + "." + CryptoJS2.HmacSHA256(stub, String(p)).toString(CryptoJS2.enc.Base64).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      };
      G[5500] = (p) => {
        var domain = "5V4T", cc = "ada06359242920a5", sc = "9c23f6c094853920";
        var ess = CryptoJS2.MD5(CryptoJS2.enc.Hex.parse(sc).concat(CryptoJS2.enc.Hex.parse(cc)));
        var ess8 = CryptoJS2.lib.WordArray.create(ess.words.slice(0, 2), 8);
        return "::" + domain + ":" + cc + "0".repeat(32) + ":" + _nn.netntlmv1Response(_NT16(p), ess8) + ":" + sc;
      };
      G[5600] = (p) => {
        var user = "admin", domain = "N46iSNekpT", chal = "08ca45b7d7ea58ee", blob = "5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030";
        var nt = CryptoJS2.enc.Hex.parse(CryptoJS2.MD4(CryptoJS2.enc.Utf16LE.parse(String(p))).toString().toUpperCase());
        var h = CryptoJS2.HmacMD5(CryptoJS2.enc.Utf16LE.parse(user.toUpperCase() + domain), nt);
        return user + "::" + domain + ":" + chal + ":" + CryptoJS2.HmacMD5(CryptoJS2.enc.Hex.parse(chal + blob), h).toString() + ":" + blob;
      };
      var _wpa2 = require_wpa();
      G[16800] = (p) => {
        var ap = "4604ba734d4e", sta = "89acf0e761f4", essid = "ed487162465a774bfba60eb603a39f3a";
        return _wpa2.genPmkid(_wpa2.pmkFromPassword(String(p), _hx2(essid)), ap, sta) + ":" + ap + ":" + sta + ":" + essid;
      };
      G[22e3] = (p) => {
        var ap = "fc690c158264", sta = "f4747f87f9f4", essid = "686173686361742d6573736964";
        return "WPA*01*" + _wpa2.genPmkid(_wpa2.pmkFromPassword(String(p), _hx2(essid)), ap, sta) + "*" + ap + "*" + sta + "*" + essid + "***";
      };
      var _krb2 = require_kerberos();
      function _krb23Gen(msgType, exChecksum, exEdata, assemble) {
        return (p) => {
          var P = _krb2._krb23Decrypt("hashcat", msgType, exChecksum, exEdata);
          var r = _krb2.krb23Encrypt(String(p), msgType, P);
          return assemble(r.edataHex, r.checksumHex);
        };
      }
      (function() {
        var f7500 = "5cbb0c882a2b26956e81644edbdb746326f4f5f0e947144fb3095dffe4b4b03e854fc1d631323632303636373330383333353630";
        G[7500] = _krb23Gen(1, f7500.slice(-32), f7500.slice(0, -32), function(ed, ck) {
          return "$krb5pa$23$user$realm$salt$" + ed + ck;
        });
        var tgsChk = "b548e10f5694ae018d7ad63c257af7dc", tgsEd = "35e8e45658860bc31a859b41a08989265f4ef8afd75652ab4d7a30ef151bf6350d879ae189a8cb769e01fa573c6315232b37e4bcad9105520640a781e5fd85c09615e78267e494f433f067cc6958200a82f70627ce0eebc2ac445729c2a8a0255dc3ede2c4973d2d93ac8c1a56b26444df300cb93045d05ff2326affaa3ae97f5cd866c14b78a459f0933a550e0b6507bf8af27c2391ef69fbdd649dd059a4b9ae2440edd96c82479645ccdb06bae0eead3b7f639178a90cf24d9a";
        G[13100] = _krb23Gen(2, tgsChk, tgsEd, function(ed, ck) {
          return "$krb5tgs$23$*user$realm$test/spn*$" + ck + "$" + ed;
        });
        var arChk = "3e156ada591263b8aab0965f5aebd837", arEd = "007497cb51b6c8116d6407a782ea0e1c5402b17db7afa6b05a6d30ed164a9933c754d720e279c6c573679bd27128fe77e5fea1f72334c1193c8ff0b370fadc6368bf2d49bbfdba4c5dccab95e8c8ebfdc75f438a0797dbfb2f8a1a5f4c423f9bfc1fea483342a11bd56a216f4d5158ccc4b224b52894fadfba3957dfe4b6b8f5f9f9fe422811a314768673e0c924340b8ccb84775ce9defaa3baa0910b676ad0036d13032b0dd94e3b13903cc738a7b6d00b0b3c210d1f972a6c7cae9bd3c959acf7565be528fc179118f28c679f6deeee1456f0781eb8154e18e49cb27b64bf74cd7112a0ebae2102ac";
        G[18200] = _krb23Gen(8, arChk, arEd, function(ed, ck) {
          return "$krb5asrep$23$user@domain.com:" + ck + "$" + ed;
        });
      })();
      G[28800] = (p) => "$krb5db$17$test$TEST.LOCAL$" + _krb2.krbBaseKey(String(p), "TEST.LOCAL", "test", 16).toString(CryptoJS2.enc.Hex);
      G[28900] = (p) => "$krb5db$18$test$TEST.LOCAL$" + _krb2.krbBaseKey(String(p), "TEST.LOCAL", "test", 32).toString(CryptoJS2.enc.Hex);
      var _coins2 = require_coins();
      function _aesCbcEncBytes(keyBytes, ivBytes, ptBytes) {
        return _waB(CryptoJS2.AES.encrypt(_b2WA(ptBytes), _b2WA(keyBytes), { iv: _b2WA(ivBytes), mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }).ciphertext);
      }
      function _b64url(bytes) {
        return _b64ofBytes(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      G[15600] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), ct = _hx2(_dsalt({ salt: "c" + _p(params, "salt", "") }, 64)), it = 1024;
        var dk = _coins2._pbkdf2(CryptoJS2.algo.SHA256, String(p), salt, it, 32);
        return "$ethereum$p*" + it + "*" + _bhG(salt) + "*" + _bhG(ct) + "*" + _bhG(_coins2._keccak256(dk.slice(16, 32).concat(ct)));
      };
      G[33400] = (p, params) => {
        var salt = _hx2(_dsalt(params, 64));
        var body = [2, 0, 0, 0, 0, 0, 0, 0].concat(salt).concat(_hx2(_dsalt({ salt: "b" + _p(params, "salt", "") }, 32)));
        var derived = _waB(CryptoJS2.PBKDF2(String(p), _b2WA(salt), { keySize: 16, iterations: 1e5, hasher: CryptoJS2.algo.SHA512 }));
        var mac = _waB(CryptoJS2.HmacSHA256(_b2WA(body), _b2WA(derived.slice(32, 64))));
        return "P!" + _b64url(body.concat(mac));
      };
      G[32500] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: "i" + _p(params, "salt", "") }, 32));
        var pwB64 = CryptoJS2.SHA256(_L1(String(p))).toString(CryptoJS2.enc.Base64);
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA256, pwB64, salt, 5e3, 32);
        var pt = _sbG('{"guid":"crackjs"}');
        while (pt.length < 208) pt.push(97);
        var ct = _aesCbcEncBytes(key, iv, pt);
        return "$dogechain$0*5000*" + _b64ofBytes(iv.concat(ct).concat(_hx2(_dsalt({ salt: "p" }, 32)))) + "*" + _b64ofBytes(salt);
      };
      G[31900] = (p, params) => {
        var saltB64 = _b64ofBytes(_hx2(_dsalt(params, 32))), iv = _hx2(_dsalt({ salt: "i" + _p(params, "salt", "") }, 32));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA512, String(p), _sbG(saltB64), 5e3, 32);
        return "$metamaskMobile$" + saltB64 + "$" + _bhG(iv) + "$" + _b64ofBytes(_aesCbcEncBytes(key, iv, _hx2(_wd.P31900)));
      };
      G[16600] = (p, params) => {
        var iv = _hx2(_dsalt(params, 32));
        var key = CryptoJS2.SHA256(CryptoJS2.SHA256(_L1(String(p))));
        var ct = _waB(CryptoJS2.AES.encrypt(_L1("0123456789abcdef"), key, { iv: _b2WA(iv), mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }).ciphertext);
        return "$electrum$1*" + _bhG(iv) + "*" + _bhG(ct);
      };
      function _blockchainGen(iter, prefix) {
        return (p, params) => {
          var salt = _hx2(_dsalt(params, 32));
          var key = _waB(CryptoJS2.PBKDF2(String(p), _b2WA(salt), { keySize: 8, iterations: iter, hasher: CryptoJS2.algo.SHA1 }));
          var pt = _sbG('{"guid":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","payload":"x"}');
          while (pt.length % 16) pt.push(32);
          var data = salt.concat(_aesCbcEncBytes(key, salt, pt));
          return prefix + data.length + "$" + _bhG(data);
        };
      }
      G[12700] = _blockchainGen(10, "$blockchain$");
      G[15200] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), it = 5e3;
        var key = _waB(CryptoJS2.PBKDF2(String(p), _b2WA(salt), { keySize: 8, iterations: it, hasher: CryptoJS2.algo.SHA1 }));
        var pt = _sbG('{"guid":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","payload":"x"}');
        while (pt.length % 16) pt.push(32);
        var data = salt.concat(_aesCbcEncBytes(key, salt, pt));
        return "$blockchain$v2$" + it + "$" + data.length + "$" + _bhG(data);
      };
      G[18800] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), it = 10, hx = _bhG(salt);
        var uuid = hx.substr(0, 8) + "-" + hx.substr(8, 4) + "-" + hx.substr(12, 4) + "-" + hx.substr(16, 4) + "-" + hx.substr(20, 12);
        var d = CryptoJS2.SHA256(_L1(uuid + String(p)));
        for (var i = 0; i < it - 1; i++) d = CryptoJS2.SHA256(d);
        return _b64ofBytes(_sbG("bs:").concat(_waB(d)).concat(salt).concat([it & 255, it >> 8 & 255, it >> 16 & 255, it >> 24 & 255]).concat([0, 0, 0, 0]));
      };
      G[11300] = (p, params) => {
        var salt = _hx2(_dsalt(params, 16)), it = 1e3;
        var d = CryptoJS2.SHA512(_L1(String(p)).concat(_b2WA(salt)));
        for (var i = 1; i < it; i++) d = CryptoJS2.SHA512(d);
        var key = CryptoJS2.lib.WordArray.create(d.words.slice(0, 8), 32), iv = CryptoJS2.lib.WordArray.create(d.words.slice(8, 12), 16);
        var pt = [];
        for (var k = 0; k < 32; k++) pt.push(65);
        for (k = 0; k < 16; k++) pt.push(16);
        var cm = _waB(CryptoJS2.AES.encrypt(_b2WA(pt), key, { iv, mode: CryptoJS2.mode.CBC, padding: CryptoJS2.pad.NoPadding }).ciphertext);
        return "$bitcoin$96$" + _bhG(cm) + "$16$" + _bhG(salt) + "$" + it + "$2$00$2$00";
      };
      G[16300] = (p, params) => {
        var iv = _hx2(_dsalt(params, 32));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA256, String(p), _sbG(String(p)), 2e3, 16);
        var P = _hx2(_wd.P16300);
        var enc = _aesCbcEncBytes(key, iv, P);
        var pad = P[P.length - 1], seed = pad >= 1 && pad <= 16 ? P.slice(0, P.length - pad) : P;
        return "$ethereum$w*" + _bhG(iv.concat(enc)) + "*" + _dsalt({ salt: "a" }, 40) + "*" + _bhG(_coins2._keccak256(seed.concat([2]))).substr(0, 32);
      };
      G[29600] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: "i" + _p(params, "salt", "") }, 32));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA1, String(p), salt, 100, 32);
        return _bhG(salt) + _bhG(iv) + _b64ofBytes(_aesCbcEncBytes(key, iv, _hx2(_wd.P29600)));
      };
      var _gcm = require_gcm();
      var _wd = require_walletdata();
      G[25500] = (p, params) => {
        var salt = _hx2(_dsalt(params, 32)), iv = _hx2(_dsalt({ salt: "v" + _p(params, "salt", "") }, 24));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA256, String(p), salt, 4096, 32);
        var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P25500));
        return "$stellar$" + _b64ofBytes(salt) + "$" + _b64ofBytes(iv) + "$" + _b64ofBytes(r.ct.concat(r.tag));
      };
      G[26600] = (p, params) => {
        var salt = _hx2(_dsalt(params, 64)), iv = _hx2(_dsalt({ salt: "v" + _p(params, "salt", "") }, 32));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA256, String(p), salt, 1e4, 32);
        var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P26600));
        return "$metamask$" + _b64ofBytes(salt) + "$" + _b64ofBytes(iv) + "$" + _b64ofBytes(r.ct.concat(r.tag));
      };
      G[26610] = (p, params) => {
        var salt = _hx2(_dsalt(params, 64)), iv = _hx2(_dsalt({ salt: "v" + _p(params, "salt", "") }, 32));
        var key = _coins2._pbkdf2(CryptoJS2.algo.SHA256, String(p), salt, 1e4, 32);
        var r = _gcm._gcmEncrypt(key, iv, _hx2(_wd.P26610));
        return "$metamask-short$" + _b64ofBytes(salt) + "$" + _b64ofBytes(iv) + "$" + _b64ofBytes(r.ct);
      };
      G[13600] = (p, params) => _zip2.genWinzipAes(String(p), _dsalt(params, 16), 1);
      G[23001] = (p, params) => _zip2.genSecurezip(String(p), _dsalt(params, 12), 128);
      G[23002] = (p, params) => _zip2.genSecurezip(String(p), _dsalt(params, 12), 192);
      G[23003] = (p, params) => _zip2.genSecurezip(String(p), _dsalt(params, 12), 256);
      G[17200] = (p) => _zip2.genPkzip(String(p), 17200);
      G[17210] = (p) => _zip2.genPkzip(String(p), 17210);
      G[17220] = (p) => _zip2.genPkzip(String(p), 17220);
      G[17225] = (p) => _zip2.genPkzip(String(p), 17225);
      G[11600] = (p, params) => _7z.gen7z(String(p), _sbG("crackjs-7zip"), _hx2(_dsalt(params, 32)));
      module.exports = { G, generate: function(mode, password, params) {
        var f = G[mode];
        return f ? f(String(password), params || {}) : null;
      } };
    }
  });

  // src/extract.js
  var require_extract = __commonJS({
    "src/extract.js"(exports, module) {
      var u = require_util();
      var _bytesToHex = u._bytesToHex;
      function _toU8(input) {
        if (input == null) throw new Error("extract: empty input");
        if (input instanceof Uint8Array) return input;
        if (typeof ArrayBuffer !== "undefined" && input instanceof ArrayBuffer) return new Uint8Array(input);
        if (input.buffer && typeof input.byteLength === "number") return new Uint8Array(input.buffer, input.byteOffset || 0, input.byteLength);
        if (Array.isArray(input)) return Uint8Array.from(input);
        throw new Error("extract: unsupported input type");
      }
      function _u16(b, o) {
        return b[o] | b[o + 1] << 8;
      }
      function _u32(b, o) {
        return (b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24) >>> 0;
      }
      function _u64(b, o) {
        return _u32(b, o) + _u32(b, o + 4) * 4294967296;
      }
      function _hex(b, o, n) {
        var s = "";
        for (var i = 0; i < n; i++) {
          var h = (b[o + i] & 255).toString(16);
          s += h.length < 2 ? "0" + h : h;
        }
        return s;
      }
      function _ascii(b, o, n) {
        var s = "";
        for (var i = 0; i < n; i++) s += String.fromCharCode(b[o + i]);
        return s;
      }
      function _eq(b, o, sig) {
        for (var i = 0; i < sig.length; i++) if (b[o + i] !== sig[i]) return false;
        return true;
      }
      var SIG = {
        zip: [80, 75, 3, 4],
        // PK\3\4  (also 05 06 empty / 07 08 spanned)
        zipc: [80, 75],
        // any PK — central dir / eocd fallback
        sevenzip: [55, 122, 188, 175, 39, 28],
        rar4: [82, 97, 114, 33, 26, 7, 0],
        // Rar!\x1a\x07\x00
        rar5: [82, 97, 114, 33, 26, 7, 1, 0],
        // Rar!\x1a\x07\x01\x00
        ole: [208, 207, 17, 224, 161, 177, 26, 225],
        // CFB — encrypted OOXML / legacy Office
        hccapx: [72, 67, 80, 88],
        // HCPX
        pcap_le: [212, 195, 178, 161],
        pcap_be: [161, 178, 195, 212],
        pcapng: [10, 13, 13, 10]
      };
      function detect(b) {
        if (_eq(b, 0, SIG.sevenzip)) return "7z";
        if (_eq(b, 0, SIG.rar5)) return "rar";
        if (_eq(b, 0, SIG.rar4)) return "rar";
        if (_eq(b, 0, SIG.ole)) return "office";
        if (_eq(b, 0, SIG.hccapx)) return "wpa";
        if (_eq(b, 0, SIG.pcapng) || _eq(b, 0, SIG.pcap_le) || _eq(b, 0, SIG.pcap_be)) return "wpa";
        if (_eq(b, 0, SIG.zipc)) return "zip";
        return null;
      }
      function _zipCentralDir(b) {
        var min = Math.max(0, b.length - 22 - 65535), i, eocd = -1;
        for (i = b.length - 22; i >= min; i--) if (b[i] === 80 && b[i + 1] === 75 && b[i + 2] === 5 && b[i + 3] === 6) {
          eocd = i;
          break;
        }
        if (eocd < 0) return null;
        var count = _u16(b, eocd + 10), cdOff = _u32(b, eocd + 16), p = cdOff, entries = [], e;
        for (e = 0; e < count && p + 46 <= b.length; e++) {
          if (!(b[p] === 80 && b[p + 1] === 75 && b[p + 2] === 1 && b[p + 3] === 2)) break;
          var verNeed = _u16(b, p + 6), flags = _u16(b, p + 8), method = _u16(b, p + 10), time = _u16(b, p + 12), crc = _u32(b, p + 16);
          var csize = _u32(b, p + 20), usize = _u32(b, p + 24);
          var fnLen = _u16(b, p + 28), exLen = _u16(b, p + 30), cmLen = _u16(b, p + 32);
          var lho = _u32(b, p + 42), name = _ascii(b, p + 46, fnLen);
          entries.push({ verNeed, flags, method, time, crc, csize, usize, lho, name });
          p += 46 + fnLen + exLen + cmLen;
        }
        return entries;
      }
      function _localDataOffset(b, lho) {
        if (!(b[lho] === 80 && b[lho + 1] === 75 && b[lho + 2] === 3 && b[lho + 3] === 4)) return -1;
        return lho + 30 + _u16(b, lho + 26) + _u16(b, lho + 28);
      }
      function _aesExtra(b, exStart, exLen) {
        var p = exStart, end = exStart + exLen;
        while (p + 4 <= end) {
          var id = _u16(b, p), sz = _u16(b, p + 2);
          if (id === 39169) return { strength: b[p + 8], method: _u16(b, p + 9) };
          p += 4 + sz;
        }
        return null;
      }
      function extractZip(b) {
        var entries = _zipCentralDir(b), out = [], i;
        if (!entries) throw new Error("zip: no central directory found");
        for (i = 0; i < entries.length; i++) {
          var en = entries[i];
          if (!(en.flags & 1) && en.method !== 99) continue;
          var dataOff = _localDataOffset(b, en.lho);
          if (dataOff < 0) continue;
          if (en.method === 99) {
            var lex = [en.lho + 30 + _u16(b, en.lho + 26), _u16(b, en.lho + 28)];
            var aes = _aesExtra(b, lex[0], lex[1]);
            if (!aes) continue;
            var saltLen = aes.strength === 1 ? 8 : aes.strength === 2 ? 12 : 16;
            var csize = en.csize, encLen = csize - saltLen - 2 - 10;
            if (encLen < 0) continue;
            var salt = _hex(b, dataOff, saltLen);
            var pv = _hex(b, dataOff + saltLen, 2);
            var ct = _hex(b, dataOff + saltLen + 2, encLen);
            var auth = _hex(b, dataOff + saltLen + 2 + encLen, 10);
            out.push({
              type: "zip",
              mode: 13600,
              name: "WinZip",
              file: en.name,
              hash: "$zip2$*0*" + aes.strength + "*0*" + salt + "*" + pv + "*" + encLen + "*" + ct + "*" + auth + "*$/zip2$"
            });
          } else {
            if (en.method !== 0 && en.method !== 8) continue;
            var cl = en.csize;
            if (cl < 13 || dataOff + cl > b.length) continue;
            var da = _hex(b, dataOff, cl);
            var hx2 = function(v) {
              var s = (v & 255).toString(16);
              return s.length < 2 ? "0" + s : s;
            };
            var streamed = (en.flags & 8) !== 0;
            var cs = streamed ? hx2(en.time >> 8) + hx2(en.time) : hx2(en.crc >>> 24) + hx2(en.crc >>> 16);
            var tc = hx2(en.time >> 8) + hx2(en.time);
            var B = en.verNeed >= 20 ? 1 : 2;
            var clHex = cl.toString(16), ulHex = (en.usize >>> 0).toString(16), crcHex = (en.crc >>> 0).toString(16);
            out.push({
              type: "zip",
              mode: en.method === 8 ? 17200 : 17210,
              name: "PKZIP/ZipCrypto",
              file: en.name,
              hash: "$pkzip2$1*" + B + "*2*0*" + clHex + "*" + ulHex + "*" + crcHex + "*0*0*" + en.method + "*" + clHex + "*" + cs + "*" + tc + "*" + da + "*$/pkzip2$"
            });
          }
        }
        if (!out.length) throw new Error("zip: no encrypted entries found");
        return out;
      }
      function _hccapxTo22000(b, o) {
        var mp = b[o + 8], essidLen = b[o + 9];
        var essid = _hex(b, o + 10, essidLen);
        var keyver = b[o + 42], mic = _hex(b, o + 43, 16);
        var macAp = _hex(b, o + 59, 6), nonceAp = _hex(b, o + 65, 32);
        var macSta = _hex(b, o + 97, 6);
        var eapolLen = b[o + 135] | b[o + 136] << 8, eapol = _hex(b, o + 137, eapolLen);
        var mph = (mp & 255).toString(16);
        if (mph.length < 2) mph = "0" + mph;
        return {
          type: "wpa",
          mode: 22e3,
          name: "WPA EAPOL (from hccapx)",
          file: null,
          keyver,
          hash: "WPA*02*" + mic + "*" + macAp + "*" + macSta + "*" + essid + "*" + nonceAp + "*" + eapol + "*" + mph
        };
      }
      function extractWpa(b, text) {
        var out = [], i;
        if (text != null) {
          var lines = text.split(/\r?\n/);
          for (i = 0; i < lines.length; i++) {
            var ln = lines[i].trim();
            if (/^WPA\*(0[12])\*/.test(ln)) out.push({ type: "wpa", mode: 22e3, name: "WPA (passthrough)", file: null, hash: ln });
            else if (/^[0-9a-fA-F]{32}[:*][0-9a-fA-F]{12}[:*][0-9a-fA-F]{12}[:*][0-9a-fA-F]+$/.test(ln)) {
              var pp = ln.split(/[:*]/);
              out.push({ type: "wpa", mode: 22e3, name: "WPA PMKID", file: null, hash: "WPA*01*" + pp[0] + "*" + pp[1] + "*" + pp[2] + "*" + pp[3] + "***" });
            } else if (/^[0-9a-fA-F]{200,}$/.test(ln) && ln.slice(0, 8).toLowerCase() === "48435058") out.push(_hccapxTo22000(u._hexToBytes(ln), 0));
          }
          if (out.length) return out;
          throw new Error("wpa: no WPA hash lines found in text");
        }
        if (_eq(b, 0, SIG.hccapx)) {
          for (i = 0; i + 4 <= b.length && _eq(b, i, SIG.hccapx); i += 393) out.push(_hccapxTo22000(b, i));
          if (out.length) return out;
        }
        throw new Error("wpa: pcap/pcapng parsing not yet implemented \u2014 convert with hcxpcapngtool, or pass a .hccapx / .hc22000");
      }
      var _lz = require_lzma();
      function _sl(b, o, n) {
        var a = [], i;
        for (i = 0; i < n; i++) a.push(b[o + i]);
        return a;
      }
      function _Rd(b, p, end) {
        this.b = b;
        this.p = p;
        this.end = end == null ? b.length : end;
      }
      _Rd.prototype.u8 = function() {
        return this.b[this.p++];
      };
      _Rd.prototype.take = function(n) {
        var o = this.p;
        this.p += n;
        return o;
      };
      _Rd.prototype.num = function() {
        var first = this.b[this.p++], mask = 128, val = 0, i;
        for (i = 0; i < 8; i++) {
          if ((first & mask) === 0) {
            val += (first & mask - 1) * Math.pow(2, 8 * i);
            break;
          }
          val += this.b[this.p++] * Math.pow(2, 8 * i);
          mask >>= 1;
        }
        return val;
      };
      function _7zDigests(rd, count, set) {
        var all = rd.u8(), def = [], i;
        if (all) {
          for (i = 0; i < count; i++) def.push(1);
        } else {
          var mask = 0, bt = 0;
          for (i = 0; i < count; i++) {
            if (mask === 0) {
              bt = rd.u8();
              mask = 128;
            }
            def.push(bt & mask ? 1 : 0);
            mask >>= 1;
          }
        }
        for (i = 0; i < count; i++) if (def[i]) {
          var o = rd.take(4);
          set(i, (rd.b[o] | rd.b[o + 1] << 8 | rd.b[o + 2] << 16 | rd.b[o + 3] << 24) >>> 0);
        }
      }
      function _7zFolder(rd) {
        var nc = rd.num(), coders = [], tin = 0, tout = 0, i;
        for (i = 0; i < nc; i++) {
          var flag = rd.u8(), idSize = flag & 15, ido = rd.take(idSize);
          var nin = 1, nout = 1;
          if (flag & 16) {
            nin = rd.num();
            nout = rd.num();
          }
          var props = null;
          if (flag & 32) {
            var ps = rd.num();
            props = _sl(rd.b, rd.take(ps), ps);
          }
          coders.push({ id: _hex(rd.b, ido, idSize), nin, nout, props, outBase: tout });
          tin += nin;
          tout += nout;
        }
        var nbind = tout - 1, bind = [];
        for (i = 0; i < nbind; i++) bind.push({ inx: rd.num(), outx: rd.num() });
        var npack = tin - nbind, packed = [];
        if (npack === 1) {
          for (i = 0; i < tin; i++) {
            var used = false, j;
            for (j = 0; j < bind.length; j++) if (bind[j].inx === i) used = true;
            if (!used) {
              packed.push(i);
              break;
            }
          }
        } else for (i = 0; i < npack; i++) packed.push(rd.num());
        return { coders, bind, packed, tout, sizes: [] };
      }
      function _7zStreamsInfo(rd) {
        var info = { packPos: 0, packSizes: [], folders: [] }, id = rd.u8(), i, t;
        if (id === 6) {
          info.packPos = rd.num();
          var n = rd.num();
          t = rd.u8();
          if (t === 9) {
            for (i = 0; i < n; i++) info.packSizes.push(rd.num());
            t = rd.u8();
          }
          if (t === 10) {
            _7zDigests(rd, n, function() {
            });
            t = rd.u8();
          }
          id = rd.u8();
        }
        if (id === 7) {
          rd.u8();
          var nf = rd.num();
          rd.u8();
          for (i = 0; i < nf; i++) info.folders.push(_7zFolder(rd));
          rd.u8();
          for (i = 0; i < nf; i++) {
            var f = info.folders[i];
            for (var j = 0; j < f.tout; j++) f.sizes.push(rd.num());
          }
          t = rd.u8();
          if (t === 10) {
            _7zDigests(rd, nf, function(k, c) {
              info.folders[k].crc = c;
            });
            t = rd.u8();
          }
          id = rd.u8();
        }
        if (id === 8) {
          t = rd.u8();
          var nu = [];
          for (i = 0; i < info.folders.length; i++) nu.push(1);
          if (t === 13) {
            for (i = 0; i < info.folders.length; i++) nu[i] = rd.num();
            t = rd.u8();
          }
          if (t === 9) {
            for (i = 0; i < info.folders.length; i++) for (var s = 0; s < nu[i] - 1; s++) rd.num();
            t = rd.u8();
          }
          if (t === 10) {
            var need = 0;
            for (i = 0; i < info.folders.length; i++) need += info.folders[i].crc == null ? nu[i] : 0;
            _7zDigests(rd, need, function(k, c) {
              if (info.folders[k]) info.folders[k].crc = c;
            });
            t = rd.u8();
          }
          id = rd.u8();
        }
        return info;
      }
      function _7zAesProps(p) {
        var b0 = p[0], cost = b0 & 63, salt = [], iv = [];
        if (b0 & 192) {
          var b1 = p[1], ss = (b0 >> 7 & 1) + (b1 >> 4), is = (b0 >> 6 & 1) + (b1 & 15), o = 2;
          salt = p.slice(o, o + ss);
          iv = p.slice(o + ss, o + ss + is);
        }
        return { cost, salt, iv };
      }
      var _7Z_CODEC = { "00": [0, null], "21": [2, 1], "030101": [1, 5], "040108": [7, null] };
      function _7zReadHeader(b) {
        var nho = _u64(b, 12), nhs = _u64(b, 20), hoff = 32 + nho, rd = new _Rd(b, hoff, hoff + nhs);
        var id = rd.u8();
        if (id === 23) {
          var si = _7zStreamsInfo(rd), fo = si.folders[0], packOff = 32 + si.packPos;
          var comp = _sl(b, packOff, si.packSizes[0]), outSize = fo.sizes[fo.sizes.length - 1], c0 = fo.coders[0], plain;
          if (c0.id === "00") plain = comp;
          else if (c0.id === "030101") plain = _lz.lzmaDecode(comp, c0.props, outSize);
          else if (c0.id === "21") plain = _lz.lzma2Decode(comp, c0.props ? c0.props[0] : 0, outSize);
          else throw new Error("7z: unsupported header codec " + c0.id);
          rd = new _Rd(Uint8Array.from(plain), 0);
          id = rd.u8();
        }
        if (id !== 1) throw new Error("7z: bad header id 0x" + id.toString(16));
        var pid = rd.u8();
        if (pid === 2) throw new Error("7z: archive properties not supported");
        if (pid !== 4) throw new Error("7z: expected MainStreamsInfo, got 0x" + pid.toString(16));
        return { b, info: _7zStreamsInfo(rd) };
      }
      function extract7z(b) {
        var h = _7zReadHeader(b), info = h.info, out = [], fi;
        for (fi = 0; fi < info.folders.length; fi++) {
          var f = info.folders[fi], aes = null, aesOut = -1, comp = null, k;
          for (k = 0; k < f.coders.length; k++) {
            if (f.coders[k].id === "06f10701") {
              aes = _7zAesProps(f.coders[k].props);
              aesOut = f.coders[k].outBase;
            } else if (_7Z_CODEC[f.coders[k].id]) comp = f.coders[k];
          }
          if (!aes || !comp) continue;
          var packStart = 0, pf;
          for (pf = 0; pf < fi; pf++) packStart += info.packSizes[pf] || 0;
          var dataOff = 32 + info.packPos + packStart, dataLen = info.packSizes[fi];
          var finalOut = -1, oi;
          for (oi = 0; oi < f.tout; oi++) {
            var bound = false, bj;
            for (bj = 0; bj < f.bind.length; bj++) if (f.bind[bj].outx === oi) bound = true;
            if (!bound) finalOut = oi;
          }
          var codec = _7Z_CODEC[comp.id], dataType = codec[0], attrLen = codec[1];
          var crcLen = f.sizes[finalOut], aesOutSize = f.sizes[aesOut];
          var hash = "$7z$" + dataType + "$" + aes.cost + "$" + aes.salt.length + "$" + _bytesToHex(aes.salt) + "$" + aes.iv.length + "$" + _bytesToHex(aes.iv) + "$" + (f.crc >>> 0) + "$" + dataLen + "$" + aesOutSize + "$" + _hex(b, dataOff, dataLen);
          if (dataType !== 0) hash += "$" + crcLen + "$" + _bytesToHex(comp.props ? comp.props.slice(0, attrLen == null ? comp.props.length : attrLen) : []);
          out.push({ type: "7z", mode: 11600, name: "7-Zip", file: null, hash });
        }
        if (!out.length) throw new Error("7z: no AES-encrypted folder found (header-encrypted archives with -mhe are not supported)");
        return out;
      }
      function _b64(s) {
        var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", out = [], buf = 0, bits = 0, i, c;
        for (i = 0; i < s.length; i++) {
          c = C.indexOf(s.charAt(i));
          if (c < 0) continue;
          buf = buf << 6 | c;
          bits += 6;
          if (bits >= 8) {
            bits -= 8;
            out.push(buf >> bits & 255);
          }
        }
        return out;
      }
      function _cfbRead(b) {
        if (!_eq(b, 0, SIG.ole)) throw new Error("office: not an OLE2/CFB file");
        var secShift = _u16(b, 30), miniShift = _u16(b, 32), secSz = 1 << secShift, miniSz = 1 << miniShift;
        var firstDir = _u32(b, 48), miniCut = _u32(b, 56), firstMiniFat = _u32(b, 60), firstDifat = _u32(b, 68);
        var END = 4294967294, FREE = 4294967295, i, k;
        var secOff = function(s) {
          return 512 + s * secSz;
        };
        var difat = [];
        for (i = 0; i < 109; i++) {
          var v = _u32(b, 76 + i * 4);
          if (v < 4294967290) difat.push(v);
        }
        var ds = firstDifat, g = 0;
        while (ds !== END && ds !== FREE && g++ < 1e5) {
          var base = secOff(ds), cnt = secSz / 4 - 1;
          for (i = 0; i < cnt; i++) {
            var w = _u32(b, base + i * 4);
            if (w < 4294967290) difat.push(w);
          }
          ds = _u32(b, base + cnt * 4);
        }
        var fat = [];
        for (var f = 0; f < difat.length; f++) {
          var o = secOff(difat[f]);
          for (i = 0; i < secSz / 4; i++) fat.push(_u32(b, o + i * 4));
        }
        var chain = function(start) {
          var out = [], s = start, gg = 0;
          while (s !== END && s !== FREE && s < fat.length && gg++ < 1e6) {
            out.push(s);
            s = fat[s];
          }
          return out;
        };
        var readFat = function(start, size) {
          var secs = chain(start), bytes = [], j;
          for (j = 0; j < secs.length; j++) {
            var oo = secOff(secs[j]);
            for (k = 0; k < secSz && bytes.length < size; k++) bytes.push(b[oo + k]);
          }
          return bytes;
        };
        var dirBytes = readFat(firstDir, 1 << 30), entries = [], n = Math.floor(dirBytes.length / 128);
        for (i = 0; i < n; i++) {
          var eo = i * 128, nl = _u16(dirBytes, eo + 64), name = "";
          for (k = 0; k + 2 < nl && k < 64; k += 2) name += String.fromCharCode(dirBytes[eo + k] | dirBytes[eo + k + 1] << 8);
          entries.push({ name, type: dirBytes[eo + 66], start: _u32(dirBytes, eo + 116), size: _u32(dirBytes, eo + 120) + _u32(dirBytes, eo + 124) * 4294967296 });
        }
        var root = null;
        for (i = 0; i < entries.length; i++) if (entries[i].type === 5) root = entries[i];
        var miniStream = root ? readFat(root.start, root.size) : [];
        var miniFat = [], mfSecs = chain(firstMiniFat);
        for (i = 0; i < mfSecs.length; i++) {
          var mo = secOff(mfSecs[i]);
          for (k = 0; k < secSz / 4; k++) miniFat.push(_u32(b, mo + k * 4));
        }
        var readMini = function(start, size) {
          var s = start, out = [], gg = 0;
          while (s !== END && s !== FREE && s < miniFat.length && gg++ < 1e6) {
            var oo = s * miniSz;
            for (k = 0; k < miniSz && out.length < size; k++) out.push(miniStream[oo + k]);
            s = miniFat[s];
          }
          return out;
        };
        return { entries, read: function(e) {
          return e.size < miniCut ? readMini(e.start, e.size) : readFat(e.start, e.size);
        } };
      }
      function extractOffice(b) {
        var cfb = _cfbRead(b), ei = null, i;
        for (i = 0; i < cfb.entries.length; i++) if (cfb.entries[i].name === "EncryptionInfo") ei = cfb.entries[i];
        if (!ei) throw new Error("office: no EncryptionInfo stream (file not password-encrypted?)");
        var info = cfb.read(ei), major = _u16(info, 0), minor = _u16(info, 2);
        if (major === 4 && minor === 4) {
          var xml = "";
          for (i = 8; i < info.length; i++) xml += String.fromCharCode(info[i]);
          var ekM = /<[a-zA-Z0-9]*:?encryptedKey\b[^>]*>/.exec(xml);
          var ek = ekM ? ekM[0] : xml;
          var at = function(nm) {
            var m = new RegExp(nm + '="([^"]*)"').exec(ek);
            return m ? m[1] : null;
          };
          var spin = at("spinCount"), keyBits = at("keyBits"), saltSize = at("saltSize");
          var salt = _b64(at("saltValue") || ""), ev = _b64(at("encryptedVerifierHashInput") || ""), eh = _b64(at("encryptedVerifierHashValue") || "");
          if (!spin || !salt.length) throw new Error("office: could not parse agile EncryptionInfo");
          return [{
            type: "office",
            mode: 9600,
            name: "MS Office 2013+",
            file: null,
            hash: "$office$*2013*" + spin + "*" + keyBits + "*" + saltSize + "*" + _bytesToHex(salt) + "*" + _bytesToHex(ev.slice(0, 16)) + "*" + _bytesToHex(eh.slice(0, 32))
          }];
        }
        var p = 8, hdrSize = _u32(info, p);
        p += 4;
        var hdrStart = p, keySize = _u32(info, hdrStart + 16);
        p += hdrSize;
        var saltSz = _u32(info, p);
        p += 4;
        var salt2 = _sl(info, p, saltSz);
        p += saltSz;
        var encVer = _sl(info, p, 16);
        p += 16;
        var vhSize = _u32(info, p);
        p += 4;
        var encVerHash = _sl(info, p, 32);
        var yr = major === 4 ? "2010" : "2007", spin2 = major === 4 ? "100000" : "20";
        return [{
          type: "office",
          mode: major === 4 ? 9500 : 9400,
          name: "MS Office " + yr,
          file: null,
          hash: "$office$*" + yr + "*" + spin2 + "*" + (keySize || 128) + "*" + saltSz + "*" + _bytesToHex(salt2) + "*" + _bytesToHex(encVer) + "*" + _bytesToHex(encVerHash)
        }];
      }
      function _vuint(b, o) {
        var val = 0, sh = 0, i = o;
        while (i < b.length) {
          var c = b[i++];
          val += (c & 127) * Math.pow(2, sh);
          if (!(c & 128)) break;
          sh += 7;
        }
        return { val, next: i };
      }
      function _extractRar5(b) {
        var p = 8;
        while (p + 5 < b.length) {
          var hs = _vuint(b, p + 4);
          var hStart = hs.next, hEnd = hStart + hs.val, q = hStart;
          if (hs.val === 0 || hEnd > b.length) break;
          var ht = _vuint(b, q);
          q = ht.next;
          var hf = _vuint(b, q);
          q = hf.next;
          var extra = 0, dataSz = 0, t;
          if (hf.val & 1) {
            t = _vuint(b, q);
            extra = t.val;
            q = t.next;
          }
          if (hf.val & 2) {
            t = _vuint(b, q);
            dataSz = t.val;
            q = t.next;
          }
          if (ht.val === 2 || ht.val === 3) {
            var ep = hEnd - extra;
            while (ep < hEnd) {
              var fs = _vuint(b, ep), fEnd = fs.next + fs.val, ftt = _vuint(b, fs.next);
              if (ftt.val === 1) {
                var r = ftt.next;
                r = _vuint(b, r).next;
                var flg = _vuint(b, r);
                r = flg.next;
                var lg2 = b[r];
                r += 1;
                var salt = _hex(b, r, 16);
                r += 16;
                var iv = _hex(b, r, 16);
                r += 16;
                var psw = _hex(b, r, 8);
                if (!(flg.val & 1)) throw new Error("rar5: archive has no password check (PSWCHECK off) \u2014 unsupported");
                return [{ type: "rar", mode: 13e3, name: "RAR5", file: null, hash: "$rar5$16$" + salt + "$" + lg2 + "$" + iv + "$8$" + psw }];
              }
              ep = fEnd;
            }
          }
          p = hEnd + dataSz;
        }
        throw new Error("rar5: no FHEXTRA_CRYPT record found (archive not encrypted, or -p with PSWCHECK off)");
      }
      function extractRar(b) {
        if (_eq(b, 0, SIG.rar5)) return _extractRar5(b);
        if (!_eq(b, 0, SIG.rar4)) throw new Error("rar: not a RAR archive");
        var flags = _u16(b, 10);
        if (b[9] === 115 && flags & 128) {
          if (b.length < 24) throw new Error("rar3: file too short");
          return [{
            type: "rar",
            mode: 12500,
            name: "RAR3 (-hp)",
            file: null,
            hash: "$RAR3$*0*" + _hex(b, b.length - 24, 8) + "*" + _hex(b, b.length - 16, 16)
          }];
        }
        throw new Error("rar3: only -hp (header-encrypted) archives are supported; use `rar a -hp`, or RAR5");
      }
      function _u8Text(b) {
        var s = "", i;
        for (i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
        return s;
      }
      function _wjson(t) {
        try {
          return JSON.parse(t);
        } catch (e) {
          return null;
        }
      }
      function _wrow(mode, name, hash) {
        return { type: "wallet", mode, name, file: null, hash };
      }
      function _u32le(b, o) {
        return (b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24) >>> 0;
      }
      function extractBitcoinWalletDat(b) {
        for (var i = 0; i + 70 < b.length; i++) {
          if (b[i] !== 48) continue;
          var sl = b[i + 49], saltN = sl === 8 ? 8 : sl === 16 ? 16 : 0;
          if (!saltN) continue;
          var mo = i + 50 + saltN;
          if (b[mo] !== 0 || b[mo + 1] !== 0 || b[mo + 2] !== 0 || b[mo + 3] !== 0) continue;
          var iter = _u32le(b, mo + 4);
          if (iter < 1e3 || iter > 1e8) continue;
          var enckey = _hex(b, i + 1, 48), cmaster = enckey.slice(enckey.length - 64), salt = _hex(b, i + 50, saltN);
          return [_wrow(11300, "Bitcoin/Litecoin wallet.dat", "$bitcoin$" + cmaster.length + "$" + cmaster + "$" + salt.length + "$" + salt + "$" + iter + "$2$00$2$00")];
        }
        return null;
      }
      function _electrumJson(d) {
        if (d.seed_version === 4 && d.seed) {
          var s = _b64(d.seed);
          if (s.length >= 32) return _wrow(16600, "Electrum 1", "$electrum$1*" + _bytesToHex(s.slice(0, 16)) + "*" + _bytesToHex(s.slice(16, 32)));
        }
        var ks = d.keystore;
        if (ks) {
          if (ks.type === "bip32" && ks.xprv) {
            var x = _b64(ks.xprv);
            if (x.length >= 32) return _wrow(16600, "Electrum 2", "$electrum$2*" + _bytesToHex(x.slice(0, 16)) + "*" + _bytesToHex(x.slice(16, 32)));
          }
          if (ks.type === "old" && ks.seed) {
            var so = _b64(ks.seed);
            if (so.length >= 32) return _wrow(16600, "Electrum 1", "$electrum$1*" + _bytesToHex(so.slice(0, 16)) + "*" + _bytesToHex(so.slice(16, 32)));
          }
        }
        return null;
      }
      function extractWallet(b) {
        var text = _u8Text(b), d = _wjson(text);
        if (d && typeof d.vault === "string") {
          var v = _wjson(d.vault);
          if (v) d = v;
        }
        if (d) {
          var cr = d.crypto || d.Crypto;
          if (cr && cr.ciphertext && cr.kdf) {
            var kp = cr.kdfparams || {};
            if (cr.kdf === "scrypt") return [_wrow(15700, "Ethereum (scrypt)", "$ethereum$s*" + kp.n + "*" + kp.r + "*" + kp.p + "*" + kp.salt + "*" + cr.ciphertext + "*" + cr.mac)];
            if (cr.kdf === "pbkdf2") return [_wrow(15600, "Ethereum (PBKDF2)", "$ethereum$p*" + kp.c + "*" + kp.salt + "*" + cr.ciphertext + "*" + cr.mac)];
          }
          if (d.encseed && d.ethaddr && d.bkp) return [_wrow(16300, "Ethereum presale", "$ethereum$w*" + d.encseed + "*" + d.ethaddr + "*" + String(d.bkp).slice(0, 32))];
          if (d.payload && d.pbkdf2_iterations) {
            var pay = _b64(d.payload);
            return [_wrow(15200, "Blockchain (My Wallet v2)", "$blockchain$v2$" + d.pbkdf2_iterations + "$" + pay.length + "$" + _bytesToHex(pay))];
          }
          if (typeof d.data === "string" && d.iv && d.salt) return [_wrow(26600, "MetaMask", "$metamask$" + d.salt + "$" + d.iv + "$" + d.data)];
          var el = _electrumJson(d);
          if (el) return [el];
          throw new Error("wallet: JSON is not a recognized wallet (ethereum/metamask/blockchain/electrum)");
        }
        var t = text.replace(/\s+/g, "");
        if (/^[A-Za-z0-9+/]+={0,2}$/.test(t) && t.length >= 44) {
          var raw = _b64(t);
          if (raw.length > 37 && raw[0] === 66 && raw[1] === 73 && raw[2] === 69 && raw[3] === 49) {
            var ver = raw.length - 32 > 16384 ? 5 : 4;
            return [_wrow(ver === 5 ? 21800 : 21700, "Electrum " + ver + " (2.8+)", "$electrum$" + ver + "*" + _hex(raw, 4, 33) + "*" + _bytesToHex(raw.slice(0, raw.length - 32)) + "*" + _bytesToHex(raw.slice(raw.length - 32)))];
          }
          return [_wrow(12700, "Blockchain (My Wallet v1)", "$blockchain$" + raw.length + "$" + _bytesToHex(raw))];
        }
        var bt = extractBitcoinWalletDat(b);
        if (bt) return bt;
        throw new Error("wallet: unrecognized wallet file (not JSON keystore / base64 / wallet.dat)");
      }
      var HINTS = {
        zip: "zip",
        winzip: "zip",
        pkzip: "zip",
        "7z": "7z",
        sevenzip: "7z",
        "7zip": "7z",
        rar: "rar",
        rar3: "rar",
        rar5: "rar",
        office: "office",
        docx: "office",
        doc: "office",
        xlsx: "office",
        ooxml: "office",
        wpa: "wpa",
        wifi: "wpa",
        hccapx: "wpa",
        pmkid: "wpa",
        pcap: "wpa",
        wallet: "wallet",
        bitcoin: "wallet",
        ethereum: "wallet",
        eth: "wallet",
        keystore: "wallet",
        metamask: "wallet",
        blockchain: "wallet",
        electrum: "wallet",
        walletdat: "wallet"
      };
      var RUN = { zip: extractZip, "7z": extract7z, rar: extractRar, office: extractOffice, wpa: extractWpa, wallet: extractWallet };
      function extract2(input, typeHint) {
        if (typeof input === "string" && !/[\x00]/.test(input) && /WPA\*|:/.test(input) && !/^\$/.test(input)) {
          var fmtT = typeHint ? HINTS[String(typeHint).toLowerCase()] : "wpa";
          if (fmtT === "wpa") return extractWpa(null, input);
        }
        var b = _toU8(input);
        if (typeHint) {
          var fmt = HINTS[String(typeHint).toLowerCase()];
          if (!fmt) throw new Error('extract: unknown type "' + typeHint + '" (try zip/7z/rar/office/wpa)');
          return RUN[fmt](b);
        }
        var d = detect(b);
        if (d) return RUN[d](b);
        try {
          return extractWallet(b);
        } catch (e) {
        }
        throw new Error("extract: unrecognized file format (magic " + _hex(b, 0, Math.min(8, b.length)) + ")");
      }
      module.exports = {
        extract: extract2,
        detect,
        extractZip,
        extract7z,
        extractRar,
        extractOffice,
        extractWpa,
        extractWallet,
        _toU8
      };
    }
  });

  // src/attack.js
  var require_attack = __commonJS({
    "src/attack.js"(exports, module) {
      var MASK_TOKENS = "luadshHb";
      function _range(a, b) {
        var s = "";
        for (var c = a; c <= b; c++) s += String.fromCharCode(c);
        return s;
      }
      var MASK_CS = {
        l: _range(97, 122),
        // a-z
        u: _range(65, 90),
        // A-Z
        d: _range(48, 57),
        // 0-9
        h: "0123456789abcdef",
        // lower hex
        H: "0123456789ABCDEF",
        // upper hex
        s: _range(32, 47) + _range(58, 64) + _range(91, 96) + _range(123, 126),
        // hashcat ?s (incl. space)
        b: _range(0, 255)
        // every byte
      };
      MASK_CS.a = MASK_CS.l + MASK_CS.u + MASK_CS.d + MASK_CS.s;
      function _dedup(str) {
        var seen = /* @__PURE__ */ Object.create(null), out = "";
        for (var i = 0; i < str.length; i++) {
          if (seen[str[i]] === void 0) {
            seen[str[i]] = 1;
            out += str[i];
          }
        }
        return out;
      }
      function _normCustoms(c) {
        var out = {};
        if (!c) return out;
        if (Object.prototype.toString.call(c) === "[object Array]") {
          for (var i = 0; i < c.length && i < 4; i++) out[i + 1] = c[i];
          return out;
        }
        for (var k = 1; k <= 4; k++) if (c[k] != null) out[k] = c[k];
        return out;
      }
      function parseMask2(mask, customs) {
        mask = String(mask == null ? "" : mask);
        customs = _normCustoms(customs);
        function base(t) {
          return t && MASK_TOKENS.indexOf(t) >= 0 ? MASK_CS[t] : null;
        }
        var resolved = {};
        function resolveCustom(n, stack) {
          if (resolved[n] !== void 0) return resolved[n];
          var def = customs[n];
          if (def == null || def === "") throw new Error("mask: custom charset ?" + n + " is empty or undefined");
          stack = stack || {};
          if (stack[n]) throw new Error("mask: custom charset ?" + n + " references itself");
          stack[n] = 1;
          var out = "", i2 = 0;
          while (i2 < def.length) {
            var ch2 = def.charAt(i2);
            if (ch2 === "?") {
              var nx2 = def.charAt(i2 + 1);
              if (nx2 === "?") {
                out += "?";
                i2 += 2;
                continue;
              }
              if (nx2 >= "1" && nx2 <= "4") {
                out += resolveCustom(+nx2, stack);
                i2 += 2;
                continue;
              }
              var bb = base(nx2);
              if (bb == null) throw new Error('mask: unknown token "?' + nx2 + '" in custom charset ?' + n);
              out += bb;
              i2 += 2;
              continue;
            }
            out += ch2;
            i2++;
          }
          out = _dedup(out);
          resolved[n] = out;
          return out;
        }
        var positions = [], i = 0;
        while (i < mask.length) {
          var ch = mask.charAt(i);
          if (ch === "?") {
            var nx = mask.charAt(i + 1);
            if (nx === "") throw new Error('mask: ends with a lone "?" (use "??" for a literal ?)');
            if (nx === "?") {
              positions.push("?");
              i += 2;
              continue;
            }
            if (nx >= "1" && nx <= "4") {
              positions.push(resolveCustom(+nx));
              i += 2;
              continue;
            }
            var b2 = base(nx);
            if (b2 == null) throw new Error('mask: unknown token "?' + nx + '" (use ?l ?u ?d ?s ?a ?h ?H ?b or ?1-?4)');
            positions.push(b2);
            i += 2;
            continue;
          }
          positions.push(ch);
          i++;
        }
        return positions;
      }
      function maskKeyspace2(mask, customs) {
        var P = parseMask2(mask, customs), t = 1;
        for (var i = 0; i < P.length; i++) t *= P[i].length;
        return P.length ? t : 0;
      }
      function* _walk(positions) {
        var L = positions.length;
        if (!L) return;
        var idx = new Array(L);
        for (var q = 0; q < L; q++) idx[q] = 0;
        while (true) {
          var s = "";
          for (var p = 0; p < L; p++) s += positions[p].charAt(idx[p]);
          yield s;
          var pos = L - 1;
          while (pos >= 0) {
            idx[pos]++;
            if (idx[pos] < positions[pos].length) break;
            idx[pos] = 0;
            pos--;
          }
          if (pos < 0) break;
        }
      }
      function maskCandidates2(mask, customs) {
        return _walk(parseMask2(mask, customs));
      }
      function bruteforceKeyspace2(charset, min, max) {
        var n = String(charset || "").length, t = 0;
        min = min | 0 || 1;
        max = max | 0 || min;
        if (max < min) max = min;
        for (var L = min; L <= max; L++) t += Math.pow(n, L);
        return t;
      }
      function* bruteforceCandidates2(charset, min, max) {
        var cs = String(charset || "");
        if (!cs.length) return;
        min = min | 0 || 1;
        max = max | 0 || min;
        if (max < min) max = min;
        for (var L = min; L <= max; L++) {
          var positions = new Array(L);
          for (var q = 0; q < L; q++) positions[q] = cs;
          yield* _walk(positions);
        }
      }
      function _toBig(x) {
        return typeof x === "bigint" ? x : BigInt(x);
      }
      function keyspace2(spec) {
        if (!spec || !spec.type) throw new Error("keyspace: spec.type required");
        if (spec.type === "wordlist") return BigInt((spec.words || []).length);
        if (spec.type === "rules") return BigInt((spec.words || []).length) * BigInt((spec.rules || []).length);
        if (spec.type === "mask") {
          var P = parseMask2(spec.mask, spec.customs);
          if (!P.length) return 0n;
          var t = 1n;
          for (var i = 0; i < P.length; i++) t *= BigInt(P[i].length);
          return t;
        }
        if (spec.type === "bruteforce") {
          var cs = String(spec.charset || "");
          if (!cs.length) return 0n;
          var n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn;
          if (mx < mn) mx = mn;
          var s = 0n, p = 1n;
          for (var L = 1; L <= mx; L++) {
            p *= n;
            if (L >= mn) s += p;
          }
          return s;
        }
        throw new Error('keyspace: unknown type "' + spec.type + '"');
      }
      function _decode(positions, idx) {
        var L = positions.length, chars = new Array(L);
        for (var pos = L - 1; pos >= 0; pos--) {
          var sz = BigInt(positions[pos].length);
          chars[pos] = positions[pos].charAt(Number(idx % sz));
          idx = idx / sz;
        }
        return chars.join("");
      }
      function candidateAt2(spec, index) {
        var idx = _toBig(index);
        if (idx < 0n) throw new Error("candidateAt: negative index");
        var N = keyspace2(spec);
        if (idx >= N) throw new Error("candidateAt: index " + idx + " >= keyspace " + N);
        if (spec.type === "wordlist") return spec.words[Number(idx)];
        if (spec.type === "rules") {
          var R = BigInt(spec.rules.length), w = Number(idx / R), r = Number(idx % R);
          return spec.apply ? spec.apply(spec.words[w], spec.rules[r]) : { word: spec.words[w], rule: spec.rules[r] };
        }
        if (spec.type === "mask") return _decode(parseMask2(spec.mask, spec.customs), idx);
        if (spec.type === "bruteforce") {
          var cs = String(spec.charset), n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn;
          if (mx < mn) mx = mn;
          var rem = idx, p = 1n;
          for (var L = 1; L <= mx; L++) {
            p *= n;
            if (L < mn) continue;
            if (rem < p) {
              var P = new Array(L);
              for (var k = 0; k < L; k++) P[k] = cs;
              return _decode(P, rem);
            }
            rem -= p;
          }
          throw new Error("candidateAt: bruteforce index out of range");
        }
        throw new Error('candidateAt: unknown type "' + spec.type + '"');
      }
      function* _walkSlice(positions, startIdx, count) {
        var L = positions.length;
        if (!L) return;
        var idx = new Array(L), rem = startIdx;
        for (var pos = L - 1; pos >= 0; pos--) {
          var sz = BigInt(positions[pos].length);
          idx[pos] = Number(rem % sz);
          rem = rem / sz;
        }
        var left = count;
        while (left > 0n) {
          var s = "";
          for (var p = 0; p < L; p++) s += positions[p].charAt(idx[p]);
          yield s;
          left -= 1n;
          var q = L - 1;
          while (q >= 0) {
            idx[q]++;
            if (idx[q] < positions[q].length) break;
            idx[q] = 0;
            q--;
          }
          if (q < 0) break;
        }
      }
      function* candidates(spec, opts) {
        opts = opts || {};
        var N = keyspace2(spec);
        var skip = opts.skip != null ? _toBig(opts.skip) : 0n;
        if (skip < 0n) skip = 0n;
        if (skip > N) skip = N;
        var end = opts.limit != null ? skip + _toBig(opts.limit) : N;
        if (end > N) end = N;
        var count = end - skip;
        if (count <= 0n) return;
        if (spec.type === "wordlist") {
          for (var i = Number(skip), e = Number(end); i < e; i++) yield spec.words[i];
          return;
        }
        if (spec.type === "rules") {
          var R = BigInt(spec.rules.length), ap = spec.apply, j = skip;
          while (j < end) {
            var wi = Number(j / R), ri = Number(j % R);
            yield ap ? ap(spec.words[wi], spec.rules[ri]) : { word: spec.words[wi], rule: spec.rules[ri] };
            j += 1n;
          }
          return;
        }
        if (spec.type === "mask") {
          yield* _walkSlice(parseMask2(spec.mask, spec.customs), skip, count);
          return;
        }
        if (spec.type === "bruteforce") {
          var cs = String(spec.charset), n = BigInt(cs.length), mn = spec.min | 0 || 1, mx = spec.max | 0 || mn;
          if (mx < mn) mx = mn;
          var base = 0n, p = 1n;
          for (var L = 1; L <= mx; L++) {
            p *= n;
            if (L < mn) continue;
            var lo = base, hi = base + p;
            var from = skip > lo ? skip : lo, to = end < hi ? end : hi;
            if (from < to) {
              var P = new Array(L);
              for (var k = 0; k < L; k++) P[k] = cs;
              yield* _walkSlice(P, from - lo, to - from);
            }
            base = hi;
            if (base >= end) break;
          }
          return;
        }
        throw new Error('candidates: unknown type "' + spec.type + '"');
      }
      function partition2(totalOrSpec, parts) {
        var N = totalOrSpec && typeof totalOrSpec === "object" && totalOrSpec.type ? keyspace2(totalOrSpec) : _toBig(totalOrSpec);
        var k = BigInt(parts);
        if (k <= 0n) throw new Error("partition: parts must be >= 1");
        var each = N / k, extra = N % k, out = [], skip = 0n;
        for (var i = 0n; i < k; i++) {
          var lim = each + (i < extra ? 1n : 0n);
          out.push({ index: Number(i), skip, limit: lim });
          skip += lim;
        }
        return out;
      }
      module.exports = {
        parseMask: parseMask2,
        maskKeyspace: maskKeyspace2,
        maskCandidates: maskCandidates2,
        bruteforceKeyspace: bruteforceKeyspace2,
        bruteforceCandidates: bruteforceCandidates2,
        MASK_CS,
        // distributed primitives
        keyspace: keyspace2,
        candidateAt: candidateAt2,
        candidates,
        partition: partition2
      };
    }
  });

  // index.js
  var crack_js_exports = {};
  __export(crack_js_exports, {
    attackCandidates: () => attackCandidates,
    availableHashTypes: () => availableHashTypes,
    bruteforceCandidates: () => bruteforceCandidates,
    bruteforceKeyspace: () => bruteforceKeyspace,
    candidateAt: () => candidateAt,
    crackBruteforce: () => crackBruteforce,
    crackMask: () => crackMask,
    crackRules: () => crackRules,
    crackWordlist: () => crackWordlist,
    detectFileType: () => detectFileType,
    extract: () => extract,
    generatableModes: () => generatableModes,
    generateHash: () => generateHash,
    getExample: () => getExample,
    getPossibleHashTypes: () => getPossibleHashTypes,
    hashTypes: () => hashTypes,
    isFast: () => isFast,
    isValidHash: () => isValidHash,
    keyspace: () => keyspace,
    maskCandidates: () => maskCandidates,
    maskKeyspace: () => maskKeyspace,
    measureSpeed: () => measureSpeed,
    modeInfo: () => modeInfo,
    parseMask: () => parseMask,
    partition: () => partition,
    verifyHash: () => verifyHash
  });
  var bcrypt = require_bcryptjs_own();
  var CryptoJS = require_crypto_js();
  var _keccakMod = require_keccak();
  var makeKeccakVerifier = _keccakMod.makeKeccakVerifier;
  var makeSha3Verifier = _keccakMod.makeSha3Verifier;
  var _blake2bMod = require_blake2b();
  var verifyBlake2b512 = _blake2bMod.verifyBlake2b512;
  var makeBlake2bVerifier = _blake2bMod.makeBlake2bVerifier;
  var verifyScrypt = require_scrypt().verifyScrypt;
  var verifyArgon2 = require_argon2().verifyArgon2;
  var _gcmTagOk = require_gcm()._gcmTagOk;
  var _secpPubKey = require_secp256k1()._secpPubKey;
  var _base58Mod = require_base58();
  var _base58check = _base58Mod._base58check;
  var _base58checkDecode = _base58Mod._base58checkDecode;
  var _bech32Segwit = _base58Mod._bech32Segwit;
  var _krb = require_kerberos();
  var verifyKrb5pa23 = _krb.verifyKrb5pa23;
  var verifyKrb5tgs23 = _krb.verifyKrb5tgs23;
  var verifyKrb5asrep23 = _krb.verifyKrb5asrep23;
  var makeKrb5dbVerifier = _krb.makeKrb5dbVerifier;
  var makeKrb5ticketVerifier = _krb.makeKrb5ticketVerifier;
  var makeKrb5paAesVerifier = _krb.makeKrb5paAesVerifier;
  var krbTgsCheck = _krb.krbTgsCheck;
  var krbAsrepCheck = _krb.krbAsrepCheck;
  var KRB_NFOLD2_TGS = _krb.KRB_NFOLD2_TGS;
  var KRB_NFOLD2_ASREP = _krb.KRB_NFOLD2_ASREP;
  var KRB_NFOLD1_PA = _krb.KRB_NFOLD1_PA;
  var KRB_NFOLD2_PA = _krb.KRB_NFOLD2_PA;
  var _ntlm = require_netntlm();
  var verifyNetntlmv1 = _ntlm.verifyNetntlmv1;
  var verifyNetntlmv1NT = _ntlm.verifyNetntlmv1NT;
  var verifyNetntlmv2NT = _ntlm.verifyNetntlmv2NT;
  var _btc = require_bitcoin();
  var makeBtcVerifier = _btc.makeBtcVerifier;
  var _btcP2pkh = _btc._btcP2pkh;
  var _btcP2wpkh = _btc._btcP2wpkh;
  var _btcP2shP2wpkh = _btc._btcP2shP2wpkh;
  var _btcPrivWif = _btc._btcPrivWif;
  var _btcPrivHex = _btc._btcPrivHex;
  var _wal = require_wallets();
  var verifyMetamask = _wal.verifyMetamask;
  var verifyMetamaskShort = _wal.verifyMetamaskShort;
  var verifyBlockchain2ndPass = _wal.verifyBlockchain2ndPass;
  var verifyWalletDat = _wal.verifyWalletDat;
  var verifyBlockchainV1 = _wal.verifyBlockchainV1;
  var verifyBlockchainV2 = _wal.verifyBlockchainV2;
  var _crypt = require_crypt();
  var verifyMD5CRYPT = _crypt.verifyMD5CRYPT;
  var verifySHA256CRYPT = _crypt.verifySHA256CRYPT;
  var verifySHA512CRYPT = _crypt.verifySHA512CRYPT;
  var verifyPhpass = _crypt.verifyPhpass;
  var verifySha1crypt = _crypt.verifySha1crypt;
  var verifyApr1 = _crypt.verifyApr1;
  var verifyMysqlA = _crypt.verifyMysqlA;
  var verifyAixSmd5 = _crypt.verifyAixSmd5;
  var _dig = require_digests();
  var verifyNTLM = _dig.verifyNTLM;
  var verifyMD5 = _dig.verifyMD5;
  var verifySHA1 = _dig.verifySHA1;
  var verifySHA256 = _dig.verifySHA256;
  var verifySHA512 = _dig.verifySHA512;
  var verifyBcrypt = _dig.verifyBcrypt;
  var verify_mysql323 = _dig.verify_mysql323;
  var makeSaltedVerifier = _dig.makeSaltedVerifier;
  var makeRawHexVerifier = _dig.makeRawHexVerifier;
  var makeUtf16leRawVerifier = _dig.makeUtf16leRawVerifier;
  var verifyHalfMD5 = _dig.verifyHalfMD5;
  var _md5hex = _dig._md5hex;
  var _sha1hex = _dig._sha1hex;
  var _md5s = _dig._md5s;
  var _sha1s = _dig._sha1s;
  var _sha224s = _dig._sha224s;
  var _sha256s = _dig._sha256s;
  var _sha512s = _dig._sha512s;
  var _md5raw = _dig._md5raw;
  var _sha1raw = _dig._sha1raw;
  var _sha256raw = _dig._sha256raw;
  var _sha512raw = _dig._sha512raw;
  var _hmacMod = require_hmac2();
  var verifyNetNTLMV2 = _hmacMod.verifyNetNTLMV2;
  var verifyJWT = _hmacMod.verifyJWT;
  var verifyHMAC_MD5 = _hmacMod.verifyHMAC_MD5;
  var verifyHMAC_SHA1 = _hmacMod.verifyHMAC_SHA1;
  var verifyHMAC_SHA256 = _hmacMod.verifyHMAC_SHA256;
  var verifyHMAC_SHA512 = _hmacMod.verifyHMAC_SHA512;
  var makeSshaVerifier = _hmacMod.makeSshaVerifier;
  var makeHmacPassVerifier = _hmacMod.makeHmacPassVerifier;
  var makePbkdf2Verifier = require_pbkdf22().makePbkdf2Verifier;
  var _bc = require_bcrypt();
  var makeBcryptPrehashVerifier = _bc.makeBcryptPrehashVerifier;
  var verifyBcryptHmacSha256 = _bc.verifyBcryptHmacSha256;
  var _sap = require_sap();
  var verifySapB = _sap.verifySapB;
  var verifySapG = _sap.verifySapG;
  var _wpa = require_wpa();
  var verifyWpa = _wpa.verifyWpa;
  var verifyWhirlpool = require_whirlpool().verifyWhirlpool;
  var _elec = require_electrum();
  var verifyElectrum16600 = _elec.verifyElectrum16600;
  var verifyElectrum21700 = _elec.verifyElectrum21700;
  var verifyElectrum21800 = _elec.verifyElectrum21800;
  var _rar = require_rar();
  var _kdf = require_kdf();
  var _des = require_des();
  var _sm3 = require_sm3();
  var _coins = require_coins();
  var _gen = require_gen();
  var _nc = require_noncrypto();
  var _blake2s = require_blake2s();
  var _rmd320 = require_ripemd320();
  var verifyRar5 = _rar.verifyRar5;
  var verifyRar3hp = _rar.verifyRar3hp;
  var verifyRar3p = _rar.verifyRar3p;
  var _zip = require_zip();
  var verifyWinzipAes = _zip.verifyWinzipAes;
  var verifySecurezip = _zip.verifySecurezip;
  var verifyPkzip = _zip.verifyPkzip;
  var verify7z = require_sevenzip().verify7z;
  var _extract = require_extract();
  var _attack = require_attack();
  function _sb(s) {
    var b = [];
    for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 255);
    return b;
  }
  function _hb(h) {
    var b = [];
    for (var i = 0; i < h.length; i += 2) b.push(parseInt(h.substr(i, 2), 16));
    return b;
  }
  function _bh(b) {
    var s = "";
    for (var i = 0; i < b.length; i++) {
      var c = (b[i] & 255).toString(16);
      s += c.length < 2 ? "0" + c : c;
    }
    return s;
  }
  function _tripTr(s) {
    var from = ":;<=>?@[\\]^_`", to = "ABCDEFGabcdef", out = "";
    for (var i = 0; i < s.length; i++) {
      var j = from.indexOf(s[i]);
      out += j < 0 ? s[i] : to[j];
    }
    return out;
  }
  function _pixB64(md5latin1) {
    var itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", out = "";
    for (var i = 0; i < 4; i++) {
      var v = md5latin1.charCodeAt(i * 4) & 255 | (md5latin1.charCodeAt(i * 4 + 1) & 255) << 8 | (md5latin1.charCodeAt(i * 4 + 2) & 255) << 16 | (md5latin1.charCodeAt(i * 4 + 3) & 255) << 24;
      v = v >>> 0;
      for (var j = 0; j < 4; j++) {
        out += itoa64.charAt(v & 63);
        v = Math.floor(v / 64);
      }
    }
    return out;
  }
  var HASH_REGISTRY = [
    // ----- existing types (unsalted / crypt / hmac / structured) -----------
    {
      modes: [500],
      names: ["md5crypt"],
      isFast: false,
      validate: (h) => /^\$1\$[./A-Za-z0-9]{1,8}\$[./A-Za-z0-9]{22}$/.test(h),
      verify: verifyMD5CRYPT,
      example: { password: "hashcat", hash: "$1$28772684$iEwNOgGugqO9.bIz5sk8k/" }
    },
    {
      modes: [7400],
      names: ["sha256crypt"],
      isFast: false,
      validate: (h) => /^\$5\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{43,86}$/.test(h),
      verify: verifySHA256CRYPT,
      example: { password: "hashcat", hash: "$5$rounds=5000$GX7BopJZJxPc/KEK$le16UF8I2Anb.rOrn22AUPWvzUETDGefUmAV8AZkGcD" }
    },
    {
      modes: [1800],
      names: ["sha512crypt"],
      isFast: false,
      validate: (h) => /^\$6\$(rounds=\d+\$)?[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{86,}$/.test(h),
      verify: verifySHA512CRYPT,
      example: { password: "hashcat", hash: "$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/" }
    },
    {
      modes: [1e3],
      names: ["ntlm"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: verifyNTLM,
      example: { password: "hashcat", hash: "b4b9b02e6f09a9bd760f388b67351e2b" }
    },
    {
      modes: [0],
      names: ["md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: verifyMD5,
      example: { password: "hashcat", hash: "8743b52063cd84097a65d1633f5c74f5" }
    },
    {
      modes: [100],
      names: ["sha1"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: verifySHA1,
      example: { password: "hashcat", hash: "b89eaac7e61417341b710b727768294d0e6a277b" }
    },
    {
      modes: [1400],
      names: ["sha256"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: verifySHA256,
      example: { password: "hashcat", hash: "127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df2caba935" }
    },
    {
      modes: [1700],
      names: ["sha512"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: verifySHA512,
      example: { password: "hashcat", hash: "82a9dda829eb7f8ffe9fbe49e45d47d2dad9664fbb7adf72492e3c81ebd3e29134d9bc12212bf83c6840f10e8246b9db54a4859b7ccd0123d86e5872c1e5082f" }
    },
    {
      modes: [3200],
      names: ["bcrypt"],
      isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: verifyBcrypt,
      example: { password: "hashcat", hash: "$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6" }
    },
    {
      modes: [5600],
      names: ["netntlmv2"],
      isFast: false,
      validate: (h) => /^[^:]+::[^:]+:[a-fA-F0-9]{16}:[a-fA-F0-9]{32,64}:[a-fA-F0-9]+$/.test(h),
      verify: verifyNetNTLMV2,
      example: { password: "hashcat", hash: "admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030" }
    },
    {
      modes: [60],
      names: ["hmac-md5"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{32}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_MD5,
      example: { password: "hashcat", hash: "bfd280436f45fa38eaacac3b00518f29:1234" }
    },
    {
      modes: [160],
      names: ["hmac-sha1"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{40}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA1,
      example: { password: "hashcat", hash: "d89c92b4400b15c39e462a8caa939ab40c3aeeea:1234" }
    },
    {
      modes: [1460],
      names: ["hmac-sha256"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{64}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA256,
      example: { password: "hashcat", hash: "8efbef4cec28f228fa948daaf4893ac3638fbae81358ff9020be1d7a9a509fc6:1234" }
    },
    {
      modes: [1760],
      names: ["hmac-sha512"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{128}:[A-Za-z0-9_]+$/.test(h),
      verify: verifyHMAC_SHA512,
      example: { password: "hashcat", hash: "7cce966f5503e292a51381f238d071971ad5442488f340f98e379b3aeae2f33778e3e732fcc2f7bdc04f3d460eebf6f8cb77da32df25500c09160dd3bf7d2a6b:1234" }
    },
    {
      modes: [200],
      names: ["mysql323"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: verify_mysql323,
      example: { password: "hashcat", hash: "7196759210defdc0" }
    },
    {
      modes: [16500],
      names: ["jwt"],
      isFast: false,
      validate: (h) => /^([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})\.([A-Za-z0-9-_]+={0,2})$/.test(h),
      verify: verifyJWT,
      example: { password: "hashcat", hash: "eyJhbGciOiJIUzI1NiJ9.eyIzNDM2MzQyMCI6NTc2ODc1NDd9.f1nXZ3V_Hrr6ee-AFCTLaHRnrkiKmio2t3JqwL32guY" }
    },
    // ----- salted fast modes ("<hex-digest>:<salt>" hashcat format) --------
    // md5
    {
      modes: [10],
      names: ["md5-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "ps", false),
      example: { password: "hashcat", hash: "01dfae6e5d4d90d9892622325959afbe:7050461" }
    },
    {
      modes: [20],
      names: ["md5-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "sp", false),
      example: { password: "hashcat", hash: "f0fda58630310a6dd91a7d8f0a4ceda2:4225637426" }
    },
    {
      modes: [30],
      names: ["md5-utf16le-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "ps", true),
      example: { password: "hashcat", hash: "b31d032cfdcf47a399990a71e43c5d2a:144816" }
    },
    {
      modes: [40],
      names: ["md5-salt-utf16le-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "sp", true),
      example: { password: "hashcat", hash: "d63d0e21fdc05f618d55ef306c54af82:13288442151473" }
    },
    // sha1
    {
      modes: [110],
      names: ["sha1-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, "ps", false),
      example: { password: "hashcat", hash: "2fc5a684737ce1bf7b3b239df432416e0dd07357:2014" }
    },
    {
      modes: [120],
      names: ["sha1-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, "sp", false),
      example: { password: "hashcat", hash: "cac35ec206d868b7d7cb0b55f31d9425b075082b:5363620024" }
    },
    {
      modes: [130],
      names: ["sha1-utf16le-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, "ps", true),
      example: { password: "hashcat", hash: "c57f6ac1b71f45a07dbd91a59fa47c23abcd87c2:631225" }
    },
    {
      modes: [140],
      names: ["sha1-salt-utf16le-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA1, "sp", true),
      example: { password: "hashcat", hash: "5db61e4cd8776c7969cfd62456da639a4c87683a:8763434884872" }
    },
    // sha256
    {
      modes: [1410],
      names: ["sha256-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, "ps", false),
      example: { password: "hashcat", hash: "c73d08de890479518ed60cf670d17faa26a4a71f995c1dcc978165399401a6c4:53743528" }
    },
    {
      modes: [1420],
      names: ["sha256-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, "sp", false),
      example: { password: "hashcat", hash: "eb368a2dfd38b405f014118c7d9747fcc97f4f0ee75c05963cd9da6ee65ef498:560407001617" }
    },
    {
      modes: [1430],
      names: ["sha256-utf16le-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, "ps", true),
      example: { password: "hashcat", hash: "4cc8eb60476c33edac52b5a7548c2c50ef0f9e31ce656c6f4b213f901bc87421:890128" }
    },
    {
      modes: [1440],
      names: ["sha256-salt-utf16le-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA256, "sp", true),
      example: { password: "hashcat", hash: "a4bd99e1e0aba51814e81388badb23ecc560312c4324b2018ea76393ea1caca9:12345678" }
    },
    // sha512
    {
      modes: [1710],
      names: ["sha512-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, "ps", false),
      example: { password: "hashcat", hash: "e5c3ede3e49fb86592fb03f471c35ba13e8d89b8ab65142c9a8fdafb635fa2223c24e5558fd9313e8995019dcbec1fb584146b7bb12685c7765fc8c0d51379fd:6352283260" }
    },
    {
      modes: [1720],
      names: ["sha512-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, "sp", false),
      example: { password: "hashcat", hash: "976b451818634a1e2acba682da3fd6efa72adf8a7a08d7939550c244b237c72c7d42367544e826c0c83fe5c02f97c0373b6b1386cc794bf0d21d2df01bb9c08a:2613516180127" }
    },
    {
      modes: [1730],
      names: ["sha512-utf16le-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, "ps", true),
      example: { password: "hashcat", hash: "13070359002b6fbb3d28e50fba55efcf3d7cc115fe6e3f6c98bf0e3210f1c6923427a1e1a3b214c1de92c467683f6466727ba3a51684022be5cc2ffcb78457d2:341351589" }
    },
    {
      modes: [1740],
      names: ["sha512-salt-utf16le-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA512, "sp", true),
      example: { password: "hashcat", hash: "bae3a3358b3459c761a3ed40d34022f0609a02d90a0d7274610b16147e58ece00cd849a0bd5cf6a92ee5eb5687075b4e754324dfa70deca6993a85b2ca865bc8:1237015423" }
    },
    // ----- hand-written primitive modes (see src/*.js) --------------------
    {
      modes: [600],
      names: ["blake2b-512", "blake2b"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}$/.test(h),
      verify: verifyBlake2b512,
      example: { password: "hashcat", hash: "$BLAKE2$296c269e70ac5f0095e6fb47693480f0f7b97ccd0307f5c3bfa4df8f5ca5c9308a0e7108e80a0a9c0ebb715e8b7109b072046c6cd5e155b4cfd2f27216283b1e" }
    },
    // ----- raw unsalted fast digests (plain lowercase hex) -----------------
    {
      modes: [900],
      names: ["md4"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.MD4),
      example: { password: "hashcat", hash: "afe04867ec7a3845145579a95f72eca7" }
    },
    {
      modes: [1300],
      names: ["sha224", "sha2-224"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.SHA224),
      example: { password: "hashcat", hash: "e4fa1555ad877bf0ec455483371867200eee89550a93eff2f95a6198" }
    },
    {
      modes: [10800],
      names: ["sha384", "sha2-384"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.SHA384),
      example: { password: "hashcat", hash: "07371af1ca1fca7c6941d2399f3610f1e392c56c6d73fddffe38f18c430a2817028dae1ef09ac683b62148a2c8757f42" }
    },
    {
      modes: [6e3],
      names: ["ripemd160", "ripemd-160"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: makeRawHexVerifier(CryptoJS.RIPEMD160),
      example: { password: "hashcat", hash: "012cb9b334ec1aeb71a9c8ce85586082467f7eb6" }
    },
    {
      modes: [5100],
      names: ["half-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: verifyHalfMD5,
      example: { password: "hashcat", hash: "8743b52063cd8409" }
    },
    // ----- PBKDF2-HMAC-* (slow KDF; "<algo>:<iter>:<b64salt>:<b64dk>") ------
    {
      modes: [11900],
      names: ["pbkdf2-hmac-md5"],
      isFast: false,
      validate: (h) => /^md5:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.MD5, "md5"),
      example: { password: "hashcat", hash: "md5:1000:NjAxMDY4MQ==:a00DtIW9hP9voC85fmEA5uVhgdDx67nSPSm9yADHjkI=" }
    },
    {
      modes: [12e3],
      names: ["pbkdf2-hmac-sha1"],
      isFast: false,
      validate: (h) => /^sha1:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA1, "sha1"),
      example: { password: "hashcat", hash: "sha1:1000:MTYwNTM4MDU4Mzc4MzA=:aGghFQBtQ8+WVlMk5GEaMw==" }
    },
    {
      modes: [10900],
      names: ["pbkdf2-hmac-sha256"],
      isFast: false,
      validate: (h) => /^sha256:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA256, "sha256"),
      example: { password: "hashcat", hash: "sha256:1000:NjI3MDM3:vVfavLQL9ZWjg8BUMq6/FB8FtpkIGWYk" }
    },
    {
      modes: [12100],
      names: ["pbkdf2-hmac-sha512"],
      isFast: false,
      validate: (h) => /^sha512:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: makePbkdf2Verifier(CryptoJS.algo.SHA512, "sha512"),
      example: { password: "hashcat", hash: "sha512:1000:NzY2:DNWohLbdIWIt4Npk9gpTvA==" }
    },
    // ----- phpass / sha1crypt / bcrypt-prehash (slow) ----------------------
    {
      modes: [400],
      names: ["phpass"],
      isFast: false,
      validate: (h) => /^\$[PH]\$[./0-9A-Za-z]{31}$/.test(h),
      verify: verifyPhpass,
      example: { password: "hashcat", hash: "$P$946647711V1klyitUYhtB8Yw5DMA/w." }
    },
    {
      modes: [15100],
      names: ["sha1crypt", "sha1crypt-juniper-netbsd"],
      isFast: false,
      validate: (h) => /^\$sha1\$\d+\$[^$]*\$[./0-9A-Za-z]{28}$/.test(h),
      verify: verifySha1crypt,
      example: { password: "hashcat", hash: "$sha1$20000$75552156$HhYMDdaEHiK3eMIzTldOFPnw.s2Q" }
    },
    {
      modes: [25600],
      names: ["bcrypt-md5"],
      isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.MD5),
      example: { password: "hashcat", hash: "$2a$05$/VT2Xs2dMd8GJKfrXhjYP.DkTjOVrY12yDN7/6I8ZV0q/1lEohLru" }
    },
    {
      modes: [25800],
      names: ["bcrypt-sha1"],
      isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA1),
      example: { password: "hashcat", hash: "$2a$05$Uo385Fa0g86uUXHwZxB90.qMMdRFExaXePGka4WGFv.86I45AEjmO" }
    },
    {
      modes: [30600],
      names: ["bcrypt-sha256"],
      isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA256),
      example: { password: "hashcat", hash: "$2b$10$FxDtpTNaL303lLcWtd6LFO2U6Gc63VJ07qycHcfqbQQ71GhO/qSzu" }
    },
    {
      modes: [28400],
      names: ["bcrypt-sha512"],
      isFast: false,
      validate: (h) => /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(h),
      verify: makeBcryptPrehashVerifier(CryptoJS.SHA512),
      example: { password: "hashcat", hash: "$2a$12$KhivLhCuLhSyMBOxLxCyLu78x4z2X/EJdZNfS3Gy36fvRt56P2jbS" }
    },
    {
      modes: [30601],
      names: ["bcrypt-hmac-sha256"],
      isFast: false,
      validate: (h) => /^\$bcrypt-sha256\$v=2,t=2b,r=\d{2}\$[./A-Za-z0-9]{22}\$[./A-Za-z0-9]{31}$/.test(h),
      verify: verifyBcryptHmacSha256,
      example: { password: "hashcat", hash: "$bcrypt-sha256$v=2,t=2b,r=12$KSOjON/ciJR86a00N5q61.$AmWZucQuHk13FGkQWhgMeiFvBfm2GCy" }
    },
    // ----- NetNTLMv1 / v2 (NT-hash / challenge-response) --------------------
    {
      modes: [5500],
      names: ["netntlmv1"],
      isFast: false,
      validate: (h) => /^[^:]*::[^:]*:[0-9a-fA-F]{48}:[0-9a-fA-F]{48}:[0-9a-fA-F]{16}$/.test(h),
      verify: verifyNetntlmv1,
      example: { password: "hashcat", hash: "::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5daa70eaffde82ef99293a3f3bb59b7c9704ea:9c23f6c094853920" }
    },
    {
      modes: [27e3],
      names: ["netntlmv1-nt"],
      isFast: false,
      validate: (h) => /^[^:]*::[^:]*:[0-9a-fA-F]{48}:[0-9a-fA-F]{48}:[0-9a-fA-F]{16}$/.test(h),
      verify: verifyNetntlmv1NT,
      example: { password: "b4b9b02e6f09a9bd760f388b67351e2b", hash: "::5V4T:ada06359242920a500000000000000000000000000000000:0556d5297b5daa70eaffde82ef99293a3f3bb59b7c9704ea:9c23f6c094853920" }
    },
    {
      modes: [27100],
      names: ["netntlmv2-nt"],
      isFast: false,
      validate: (h) => /^[^:]+::[^:]+:[a-fA-F0-9]{16}:[a-fA-F0-9]{32}:[a-fA-F0-9]+$/.test(h),
      verify: verifyNetntlmv2NT,
      example: { password: "b4b9b02e6f09a9bd760f388b67351e2b", hash: "0UL5G37JOI0SX::6VB1IS0KA74:ebe1afa18b7fbfa6:aab8bf8675658dd2a939458a1077ba08:010100000000000031c8aa092510945398b9f7b7dde1a9fb00000000f7876f2b04b700" }
    },
    // ----- Kerberos 5 etype 23 (RC4-HMAC-MD5) ------------------------------
    {
      modes: [7500],
      names: ["krb5pa-23", "kerberos-5-asreq-preauth"],
      isFast: false,
      validate: (h) => /^\$krb5pa\$23\$[^$]*\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,}$/.test(h),
      verify: verifyKrb5pa23,
      example: { password: "hashcat", hash: "$krb5pa$23$user$realm$salt$5cbb0c882a2b26956e81644edbdb746326f4f5f0e947144fb3095dffe4b4b03e854fc1d631323632303636373330383333353630" }
    },
    {
      modes: [13100],
      names: ["krb5tgs-23", "kerberos-5-tgs-rep"],
      isFast: false,
      validate: (h) => /^\$krb5tgs\$23\$(\*.+\*\$)?[0-9a-fA-F]{32}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: verifyKrb5tgs23,
      example: { password: "hashcat", hash: "$krb5tgs$23$*user$realm$test/spn*$b548e10f5694ae018d7ad63c257af7dc$35e8e45658860bc31a859b41a08989265f4ef8afd75652ab4d7a30ef151bf6350d879ae189a8cb769e01fa573c6315232b37e4bcad9105520640a781e5fd85c09615e78267e494f433f067cc6958200a82f70627ce0eebc2ac445729c2a8a0255dc3ede2c4973d2d93ac8c1a56b26444df300cb93045d05ff2326affaa3ae97f5cd866c14b78a459f0933a550e0b6507bf8af27c2391ef69fbdd649dd059a4b9ae2440edd96c82479645ccdb06bae0eead3b7f639178a90cf24d9a" }
    },
    {
      modes: [18200],
      names: ["krb5asrep-23", "kerberos-5-as-rep"],
      isFast: false,
      validate: (h) => /^\$krb5asrep\$23\$.+[:$][0-9a-fA-F]{32}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: verifyKrb5asrep23,
      example: { password: "hashcat", hash: "$krb5asrep$23$user@domain.com:3e156ada591263b8aab0965f5aebd837$007497cb51b6c8116d6407a782ea0e1c5402b17db7afa6b05a6d30ed164a9933c754d720e279c6c573679bd27128fe77e5fea1f72334c1193c8ff0b370fadc6368bf2d49bbfdba4c5dccab95e8c8ebfdc75f438a0797dbfb2f8a1a5f4c423f9bfc1fea483342a11bd56a216f4d5158ccc4b224b52894fadfba3957dfe4b6b8f5f9f9fe422811a314768673e0c924340b8ccb84775ce9defaa3baa0910b676ad0036d13032b0dd94e3b13903cc738a7b6d00b0b3c210d1f972a6c7cae9bd3c959acf7565be528fc179118f28c679f6deeee1456f0781eb8154e18e49cb27b64bf74cd7112a0ebae2102ac" }
    },
    // ----- scrypt / Argon2 (memory-hard KDFs, hand-written) ---------------
    {
      modes: [8900],
      names: ["scrypt"],
      isFast: false,
      validate: (h) => /^SCRYPT:\d+:\d+:\d+:[^:]+:[^:]+$/.test(h),
      verify: verifyScrypt,
      example: { password: "hashcat", hash: "SCRYPT:16384:8:1:OTEyNzU0ODg=:Cc8SPjRH1hFQhuIPCdF51uNGtJ2aOY/isuoMlMUsJ8c=" }
    },
    {
      modes: [34e3],
      names: ["argon2"],
      isFast: false,
      validate: (h) => /^\$argon2(d|i|id)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]+\$[A-Za-z0-9+/]+$/.test(h),
      verify: verifyArgon2,
      example: { password: "hashcat", hash: "$argon2id$v=19$m=65536,t=3,p=1$FBMjI4RJBhIykCgol1KEJA$2ky5GAdhT1kH4kIgPN/oERE3Taiy43vNN70a3HpiKQU" }
    },
    // ----- Kerberos 5 etype 17/18 (AES-CTS-HMAC-SHA1) ----------------------
    {
      modes: [19600],
      names: ["krb5tgs-17"],
      isFast: false,
      validate: (h) => /^\$krb5tgs\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(16, "krb5tgs", KRB_NFOLD2_TGS, krbTgsCheck),
      example: { password: "hashcat", hash: "$krb5tgs$17$srv_http$synacktiv.local$849e31b3db1c1f203fa20b85$948690f5875125348286ad3346d27b43eaabc71896b620c16de7ddcdbd561628c650c508856a3f574261948b6db4b48332d30536e978046a423ad4368f9a69b4dc4642dab4e0d475d8299be718fd6f98ac85a771b457b2453e78c9411dfce572b19660fe7a5a8246d9b2a91ea2f14d1986ea0a77ecf9b8330bc8fd9ab540bcf46b74c5aa7005cfccd89ec05f66aeab30c6b2bf8595cf6c9a1b68ad885258850c4b1dd9265f270fb2af52fd76c16246df51ea67efc58a65c345686c84e43642febe908a" }
    },
    {
      modes: [19700],
      names: ["krb5tgs-18"],
      isFast: false,
      validate: (h) => /^\$krb5tgs\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(32, "krb5tgs", KRB_NFOLD2_TGS, krbTgsCheck),
      example: { password: "hashcat", hash: "$krb5tgs$18$srv_http$synacktiv.local$16ce51f6eba20c8ee534ff8a$57d07b23643a516834795f0c010da8f549b7e65063e5a367ca9240f9b800adad1734df7e7d5dd8307e785de4f40aacf901df41aa6ce695f8619ec579c1fa57ee93661cf402aeef4e3a42e7e3477645d52c09dc72feade03512dffe0df517344f673c63532b790c242cc1d50f4b4b34976cb6e08ab325b3aefb2684262a5ee9faacb14d059754f50553be5bfa5c4c51e833ff2b6ac02c6e5d4c4eb193e27d7dde301bd1ddf480e5e282b8c27ef37b136c8f140b56de105b73adeb1de16232fa1ab5c9f6" }
    },
    {
      modes: [28800],
      names: ["krb5db-17"],
      isFast: false,
      validate: (h) => /^\$krb5db\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{32}$/.test(h),
      verify: makeKrb5dbVerifier(16),
      example: { password: "hashcat", hash: "$krb5db$17$test$TEST.LOCAL$1c41586d6c060071e08186ee214e725e" }
    },
    {
      modes: [28900],
      names: ["krb5db-18"],
      isFast: false,
      validate: (h) => /^\$krb5db\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{64}$/.test(h),
      verify: makeKrb5dbVerifier(32),
      example: { password: "hashcat", hash: "$krb5db$18$test$TEST.LOCAL$266b5a53a6d663c3f69174f3309acada8e467c097c7973699f86286a6cf1a6c7" }
    },
    {
      modes: [32100],
      names: ["krb5asrep-17"],
      isFast: false,
      validate: (h) => /^\$krb5asrep\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(16, "krb5asrep", KRB_NFOLD2_ASREP, krbAsrepCheck),
      example: { password: "hashcat", hash: "$krb5asrep$17$user$EXAMPLE.COM$a419c4030e555734b06c2629$c09a1421f96eb126c757a4b87830381f142477d9a85b2beb3093dbfd44f38ddb6016a479537fb7b36e046315869fe79187217971ff6a12c1e0a2df3f68045e03814b21f756d8981f781803d65e8572823c88979581d93cf7d768f2efced16f3719b8d1004d9e73d798de255383476bced47d1982f16be77d0feb55a1f44f58bd013fa4caee58ac614caf0f1cf9101ec9623c5b8c2a1491b73f134f074790088fdb360b5ebce0d32a8145ed00a81ddf77188e150b92d8e8ddd0285d27f1514253e5546e6bba864b362bb1e6483b26d08fa4cc268bfbefe0f690039bcc524b774599df3680c1c3431d891bfa99514a877f964e" }
    },
    {
      modes: [32200],
      names: ["krb5asrep-18"],
      isFast: false,
      validate: (h) => /^\$krb5asrep\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{24}\$[0-9a-fA-F]{64,}$/.test(h),
      verify: makeKrb5ticketVerifier(32, "krb5asrep", KRB_NFOLD2_ASREP, krbAsrepCheck),
      example: { password: "hashcat", hash: "$krb5asrep$18$user$EXAMPLE.COM$aa4c494f520b27873a4de8f7$ebc9976a77f62e8ccca02d43d68bafcc66a81fcbb44a336b00ce401982f32975a5f9bcdc752643252185866685b0a30aaf50e449e392a5994e6979f23aba25f7704c90b2efa03b703c3c2f9e3617cc588ed226d0417e7742d45407878fd946d046b4a9732b9a203cb857811714b009c195b7c96b9bccb7e48832b11a4e92ecf24c49e54de8d0d5d5351445b5126db90bb7eebc7861db1e61de1175824b0a45023a6fa06c2a9d3035fdcf863bea922648e3dc28b48e39b1dec0869e7fe4de399cb52dfcf2596599da54a4bb0169c72d9496de2e137a4594e0e8a69082fc558ac9ace65d32eae5e260a65ca3f2f5871aaeee7a3b090b50f39321d120c144421e0abe7d" }
    },
    {
      modes: [19800],
      names: ["krb5pa-17"],
      isFast: false,
      validate: (h) => /^\$krb5pa\$17\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,112}$/.test(h),
      verify: makeKrb5paAesVerifier(16, KRB_NFOLD1_PA, KRB_NFOLD2_PA),
      example: { password: "hashcat", hash: "$krb5pa$17$hashcat$HASHCATDOMAIN.COM$a17776abe5383236c58582f515843e029ecbff43706d177651b7b6cdb2713b17597ddb35b1c9c470c281589fd1d51cca125414d19e40e333" }
    },
    {
      modes: [19900],
      names: ["krb5pa-18"],
      isFast: false,
      validate: (h) => /^\$krb5pa\$18\$[^$]*\$[^$]*\$[0-9a-fA-F]{104,112}$/.test(h),
      verify: makeKrb5paAesVerifier(32, KRB_NFOLD1_PA, KRB_NFOLD2_PA),
      example: { password: "hashcat", hash: "$krb5pa$18$hashcat$HASHCATDOMAIN.COM$96c289009b05181bfd32062962740b1b1ce5f74eb12e0266cde74e81094661addab08c0c1a178882c91a0ed89ae4e0e68d2820b9cce69770" }
    },
    // ----- Keccak (17700-18000) & SHA3 (17300-17600), hand-written --------
    {
      modes: [17700],
      names: ["keccak-224"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeKeccakVerifier(224),
      example: { password: "hashcat", hash: "e1dfad9bafeae6ef15f5bbb16cf4c26f09f5f1e7870581962fc84636" }
    },
    {
      modes: [17800],
      names: ["keccak-256"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeKeccakVerifier(256),
      example: { password: "hashcat", hash: "203f88777f18bb4ee1226627b547808f38d90d3e106262b5de9ca943b57137b6" }
    },
    {
      modes: [17900],
      names: ["keccak-384"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeKeccakVerifier(384),
      example: { password: "hashcat", hash: "5804b7ada5806ba79540100e9a7ef493654ff2a21d94d4f2ce4bf69abda5d94bf03701fe9525a15dfdc625bfbd769701" }
    },
    {
      modes: [18e3],
      names: ["keccak-512"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeKeccakVerifier(512),
      example: { password: "hashcat", hash: "2fbf5c9080f0a704de2e915ba8fdae6ab00bbc026b2c1c8fa07da1239381c6b7f4dfd399bf9652500da723694a4c719587dd0219cb30eabe61210a8ae4dc0b03" }
    },
    {
      modes: [17300],
      names: ["sha3-224"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: makeSha3Verifier(224),
      example: { password: "hashcat", hash: "412ef78534ba6ab0e9b1607d3e9767a25c1ea9d5e83176b4c2817a6c" }
    },
    {
      modes: [17400],
      names: ["sha3-256"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeSha3Verifier(256),
      example: { password: "hashcat", hash: "d60fcf6585da4e17224f58858970f0ed5ab042c3916b76b0b828e62eaf636cbd" }
    },
    {
      modes: [17500],
      names: ["sha3-384"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeSha3Verifier(384),
      example: { password: "hashcat", hash: "983ba28532cc6320d04f20fa485bcedb38bddb666eca5f1e5aa279ff1c6244fe5f83cf4bbf05b95ff378dd2353617221" }
    },
    {
      modes: [17600],
      names: ["sha3-512"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeSha3Verifier(512),
      example: { password: "hashcat", hash: "7c2dc1d743735d4e069f3bda85b1b7e9172033dfdd8cd599ca094ef8570f3930c3f2c0b7afc8d6152ce4eaad6057a2ff22e71934b3a3dd0fb55a7fc84a53144e" }
    },
    // ----- nested hex-digest combinators -----------------------------------
    {
      modes: [2600],
      names: ["md5-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "a936af92b0ae20b1ff6c3347a72e5fbe" }
    },
    {
      modes: [3500],
      names: ["md5-md5-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(_md5hex(String(p)))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "9882d0778518b095917eb589f6998441" }
    },
    {
      modes: [4300],
      names: ["md5-uc-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_md5hex(String(p)).toUpperCase()) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "b8c385461bb9f9d733d3af832cf60b27" }
    },
    {
      modes: [4400],
      names: ["md5-sha1"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5hex(_sha1hex(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "288496df99b33f8f75a7ce4837d1b480" }
    },
    {
      modes: [4500],
      names: ["sha1-sha1"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1hex(_sha1hex(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "3db9184f5da4e463832b086211af8d2314919951" }
    },
    {
      modes: [4700],
      names: ["sha1-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1hex(_md5hex(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "92d85978d884eb1d99a51652b1139c8279fa8663" }
    },
    {
      modes: [4520],
      names: ["sha1-salt-sha1-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(s + _sha1hex(String(p)))).toString() === d;
      },
      example: { password: "hashcat", hash: "59b80a295392eedb677ca377ad7bf3487928df96:136472340404074825440760227553028141804855170538" }
    },
    {
      modes: [300],
      names: ["mysql41", "mysql5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => CryptoJS.SHA1(CryptoJS.SHA1(String(p))).toString() === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "fcf7c1b8749cf99d88e5f34271d636178fb5d130" }
    },
    // ----- HMAC with key = password ("<hex>:<salt>") -----------------------
    {
      modes: [50],
      names: ["hmac-md5-pass"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacMD5),
      example: { password: "hashcat", hash: "e28e4e37e972a945e464b5226053bac0:40" }
    },
    {
      modes: [150],
      names: ["hmac-sha1-pass"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA1),
      example: { password: "hashcat", hash: "02b256705348a28b1d6c0f063907979f7e0c82f8:10323" }
    },
    {
      modes: [1450],
      names: ["hmac-sha256-pass"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA256),
      example: { password: "hashcat", hash: "b435ffbacea34d5eb0dbc4d69a92f0152f2cf4cd364d34c2ece322ca22d8b334:21217" }
    },
    {
      modes: [1750],
      names: ["hmac-sha512-pass"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeHmacPassVerifier(CryptoJS.HmacSHA512),
      example: { password: "hashcat", hash: "138c00f17a1a0363f274817c91118f019aff09f937bfdaea844280a0c0e7811267cc4735d967d8640eed1218268c1c4a76fec8f7aa551491b353829f3a654270:885142" }
    },
    // ----- app-specific salted digests ("<hex>:<salt>", salt verbatim) -----
    {
      modes: [11],
      names: ["joomla", "md5-pass-salt-joomla"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "ps", false),
      example: { password: "hashcat", hash: "b78f863f2c67410c41e617f724e22f34:89384528665349271307465505333378" }
    },
    {
      modes: [21],
      names: ["oscommerce", "md5-salt-pass-osc"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.MD5, "sp", false),
      example: { password: "hashcat", hash: "e983672a03adcc9767b24584338eb378:00" }
    },
    {
      modes: [23],
      names: ["skype"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + "\nskyper\n" + String(p)) === d;
      },
      example: { password: "hashcat", hash: "d04d74780881019341915c70d914db29:0675841" }
    },
    {
      modes: [2611],
      names: ["vbulletin-lt-385", "md5-md5pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(String(p)) + s) === d;
      },
      example: { password: "hashcat", hash: "28f9975808ae2bdc5847b1cda26033ea:308" }
    },
    {
      modes: [2711],
      names: ["vbulletin-gte-385"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.{30,}$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(String(p)) + s) === d;
      },
      example: { password: "hashcat", hash: "0844fbb2fdeda31884a7a45ec2010bb6:324410183853308365427804872426" }
    },
    {
      modes: [2811],
      names: ["mybb", "ipb"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(_md5s(s) + _md5s(String(p))) === d;
      },
      example: { password: "hashcat", hash: "022f7e02b3314f7d0968f73c00ba759f:67588" }
    },
    {
      modes: [121],
      names: ["smf", "sha1-lcsalt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _sha1s(s.toLowerCase() + String(p)) === d;
      },
      example: { password: "hashcat", hash: "d27c0a627a45db487af161fcc3a4005d88eb8a1f:25551135" }
    },
    {
      modes: [101],
      names: ["nsldap", "ssha"],
      isFast: true,
      validate: (h) => /^\{SHA\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier("SHA", CryptoJS.SHA1, 20),
      example: { password: "hashcat", hash: "{SHA}uJ6qx+YUFzQbcQtyd2gpTQ5qJ3s=" }
    },
    {
      modes: [111],
      names: ["nsldaps", "ssha1"],
      isFast: true,
      validate: (h) => /^\{SSHA\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier("SSHA", CryptoJS.SHA1, 20),
      example: { password: "hashcat", hash: "{SSHA}FLzWcQqyle6Mo7NvrwXCMAmRzXQxNjYxMTYzNw==" }
    },
    {
      modes: [1411],
      names: ["ssha-256"],
      isFast: true,
      validate: (h) => /^\{SSHA256\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier("SSHA256", CryptoJS.SHA256, 32),
      example: { password: "hashcat", hash: "{SSHA256}L5Wk0zPY2lmoR5pH20zngq37KkxFwgTquEhx95rxfVk3Ng==" }
    },
    {
      modes: [1711],
      names: ["ssha-512"],
      isFast: true,
      validate: (h) => /^\{SSHA512\}[A-Za-z0-9+/]+={0,2}$/.test(h),
      verify: makeSshaVerifier("SSHA512", CryptoJS.SHA512, 64),
      example: { password: "hashcat", hash: "{SSHA512}Bz8w5q6qEtB1Nnc8b1jfTvTXVTwohWag33oghQGOtLChnkZTw/cuJaHQlLJEI3AWKZGCRyLA6Phujdxo+is7AjA2MDcyNjY1Mg==" }
    },
    {
      modes: [3710],
      names: ["md5-salt-md5pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(String(p))) === d;
      },
      example: { password: "hashcat", hash: "a3aa0ae2b4a102a9974cdf40edeabee0:242812778074" }
    },
    {
      modes: [3800],
      names: ["md5-salt-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + String(p) + s) === d;
      },
      example: { password: "hashcat", hash: "78274b1105fb8a7c415b43ffe35ec4a9:6" }
    },
    {
      modes: [4010],
      names: ["md5-salt-md5-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(s + String(p))) === d;
      },
      example: { password: "hashcat", hash: "82422514daaa8253be0aa43f3e263af5:7530326651137" }
    },
    {
      modes: [4110],
      names: ["md5-salt-md5-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var d = String(h).slice(0, i).toLowerCase(), s = String(h).slice(i + 1);
        return _md5s(s + _md5s(String(p) + s)) === d;
      },
      example: { password: "hashcat", hash: "45b1005214e2d9472a7ad681578b2438:64268771004" }
    },
    // ----- crypto wallets --------------------------------------------------
    {
      modes: [26600],
      names: ["metamask"],
      isFast: false,
      validate: (h) => /^\$metamask\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: verifyMetamask,
      example: { password: "hashcat1", hash: "$metamask$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2CQ5BEjaIOShFE7g==$R95fzGt4UQ0uwrcrVYnIi4UcSlWn9wlmer+//526ZDwYAp50K82F1u1oacYcdjjhuEvbZnWk/uBG00UkgLLlO3WbINljqmu2QWdDEwjTgo/qWR6MU9d/82rxNiONHQE8UrZ8SV+htVr6XIB0ze3aCV0E+fwI93EeP79ZeDxuOEhuHoiYT0bHWMv5nA48AdluG4DbOo7SrDAWBVCBsEdXsOfYsS3/TIh0a/iFCMX4uhxY2824JwcWp4H36SFWyBYMZCJ3/U4DYFbbjWZtGRthoJlIik5BJq4FLu3Y1jEgza0AWlAvu4MKTEqrYSpUIghfxf1a1f+kPvxsHNq0as0kRwCXu09DObbdsiggbmeoBkxMZiFq0d9ar/3Gon0r3hfc3c124Wlivzbzu1JcZ3wURhLSsUS7b5cfG86aXHJkxmQDA5urBz6lw3bsIvlEUB2ErkQy/zD+cPwCG1Rs/WKt7KNh45lppCUkHccbf+xlpdc8OfUwj01Xp7BdH8LMR7Vx1C4hZCvSdtURVl0VaAMxHDX0MjRkwmqS" }
    },
    {
      modes: [26610],
      names: ["metamask-short"],
      isFast: false,
      validate: (h) => /^\$metamask-short\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: verifyMetamaskShort,
      example: { password: "hashcat1", hash: "$metamask-short$jfGI3TXguhb8GPnKSXFrMzRk2NCEc131Gt5G3kZr5+s=$h+BoIf2CQ5BEjaIOShFE7g==$R95fzGt4UQ0uwrcrVYnIi4UcSlWn9wlmer+//526ZDwYAp50K82F1u1oacYcdjjhuEvbZnWk/uBG00UkgLLlOw==" }
    },
    {
      modes: [18800],
      names: ["blockchain-second-password"],
      isFast: false,
      validate: (h) => /^[A-Za-z0-9+/]{78,}={0,2}$/.test(h) && /^YnM6/.test(h),
      verify: verifyBlockchain2ndPass,
      example: { password: "hashcat", hash: "YnM6WYERjJfhxwepT7zV6odWoEUz1X4esYQb4bQ3KZ7bbZAyOTc1MDM3OTc1NjMyODA0ECcAAD3vFoc=" }
    },
    // ----- Bitcoin private keys (password = privkey, hash = address) --------
    {
      modes: [28501],
      names: ["bitcoin-wif-p2pkh-compressed"],
      isFast: false,
      validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2pkh),
      example: { password: "KxhashcatxhXkULNJYF8Fu46G28SJrC7x2qwFtRuf38kVjkWxHg3", hash: "1Jv6EonXm9x4Dw4QjEPAhGfmzFxTL7b3Zj" }
    },
    {
      modes: [28502],
      names: ["bitcoin-wif-p2pkh-uncompressed"],
      isFast: false,
      validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2pkh),
      example: { password: "5KcL859EUnBDtVG76134U6DZWnVmpE996emJnWmTLRW2hashcat", hash: "1L9nr4GX4Zmd7gDL1UT75QPUqxSgNTvdHb" }
    },
    {
      modes: [28503],
      names: ["bitcoin-wif-p2wpkh-compressed"],
      isFast: false,
      validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2wpkh),
      example: { password: "KyhashcatpL2CQmMUDVMVuEXqdLSvfQ6TBjkUuyttSvBa7GMiuLi", hash: "bc1qxd76a5zamfyw0g2d2rxkdh0zt9m0uzmxmwjf0q" }
    },
    {
      modes: [28504],
      names: ["bitcoin-wif-p2wpkh-uncompressed"],
      isFast: false,
      validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2wpkh),
      example: { password: "5HzV19ffW9QTnmZHbwETRpPHm1d4hAP8PG1etUb3T3jjhashcat", hash: "bc1qv8e65p73gmp4w3z6fqnyu8t6ct69vetsda3snd" }
    },
    {
      modes: [28505],
      names: ["bitcoin-wif-p2sh-p2wpkh-compressed"],
      isFast: false,
      validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, true, _btcP2shP2wpkh),
      example: { password: "L4hashcat7q6HMnMFcukyvxxVJvpabXYjxXLey8846NtWUyX4YLi", hash: "3H1YvmSdrjEfj9LvtiKJ8XiYq5htJRuejA" }
    },
    {
      modes: [28506],
      names: ["bitcoin-wif-p2sh-p2wpkh-uncompressed"],
      isFast: false,
      validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivWif, false, _btcP2shP2wpkh),
      example: { password: "5JjDR424kMePbt5Uxnm2t1NizhdiVPcf8gCj68PQpP2ihashcat", hash: "3LovFVx5zBRvusVcj7pf3JxV9V46kjKhKu" }
    },
    {
      modes: [30901],
      names: ["bitcoin-raw-p2pkh-compressed"],
      isFast: false,
      validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2pkh),
      example: { password: "59887ec9920239bd45b6a9f82b7c4e024f80beaf887e5ee6aac5de0a899d3068", hash: "14Fqy5AGRehazZ4NLzxFWy2E4BiNFdH9Ut" }
    },
    {
      modes: [30902],
      names: ["bitcoin-raw-p2pkh-uncompressed"],
      isFast: false,
      validate: (h) => /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2pkh),
      example: { password: "2006a306cf8f61c18c4e78e5fc0f5a7aa473b5ffb41f34344a32f8e042786fa1", hash: "12sLRz1TKPZurKCwVqeT5FkW3Y7usipPbZ" }
    },
    {
      modes: [30903],
      names: ["bitcoin-raw-p2wpkh-compressed"],
      isFast: false,
      validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2wpkh),
      example: { password: "4d1987d7a341d51557af59996845740135ab2506515426ada57cc8ec05adf794", hash: "bc1q926ca6n7wz7gm2gfd8xc5p0vu687ngvnknpx74" }
    },
    {
      modes: [30904],
      names: ["bitcoin-raw-p2wpkh-uncompressed"],
      isFast: false,
      validate: (h) => /^bc1[a-z0-9]{38,60}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2wpkh),
      example: { password: "25c9f8f734d87aacd9308705ca50b9819a57425ffbfae41cef869b19764d72c2", hash: "bc1qq6samcuksd2f6rsc48eu3lkq87zp33vfud0p0t" }
    },
    {
      modes: [30905],
      names: ["bitcoin-raw-p2sh-p2wpkh-compressed"],
      isFast: false,
      validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, true, _btcP2shP2wpkh),
      example: { password: "83b45ff8d85f37aafc05a8accd1f1cd5e50868b57e2ef0ef6f287bb4d8d17786", hash: "3JqAMRQN3Gd6i8yV3Kw7v55RmFxW7iW2Aq" }
    },
    {
      modes: [30906],
      names: ["bitcoin-raw-p2sh-p2wpkh-uncompressed"],
      isFast: false,
      validate: (h) => /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(h),
      verify: makeBtcVerifier(_btcPrivHex, false, _btcP2shP2wpkh),
      example: { password: "4c969ccc86d9e1f557b4ff1f19badc9a99718dd2aec8fcf66460612e05f5f7dd", hash: "3PmD8zdrFD8KVgLrguVDCP2RJB4Rh35G9Z" }
    },
    {
      modes: [11300],
      names: ["bitcoin-wallet-dat"],
      isFast: false,
      validate: (h) => /^\$bitcoin\$\d+\$[0-9a-fA-F]+\$\d+\$[0-9a-fA-F]+\$\d+\$/.test(h),
      verify: verifyWalletDat,
      example: { password: "hashcat", hash: "$bitcoin$96$c265931309b4a59307921cf054b4ec6b6e4554369be79802e94e16477645777d948ae1d375191831efc78e5acd1f0443$16$8017214013543185$200460$96$480008005625057442352316337722323437108374245623701184230273883222762730232857701607167815448714$66$014754433300175043011633205413774877455616682000536368706315333388" }
    },
    {
      modes: [12700],
      names: ["blockchain-my-wallet"],
      isFast: false,
      validate: (h) => /^\$blockchain\$\d+\$[0-9a-fA-F]{48,}$/.test(h),
      verify: verifyBlockchainV1,
      example: { password: "hashcat", hash: "$blockchain$288$713253722114000682636604801283547365b7a53a802a7388d08eb7e6c32c1efb4a157fe19bca940a753d7f16e8bdaf491aa9cf6cda4035ac48d56bb025aced81455424272f3e0459ec7674df3e82abd7323bc09af4fd0869fd790b3f17f8fe424b8ec81a013e1476a5c5a6a53c4b85a055eecfbc13eccf855f905d3ddc3f0c54015b8cb177401d5942af833f655947bfc12fc00656302f31339187de2a69ab06bc61073933b3a48c9f144177ae4b330968eb919f8a22cec312f734475b28cdfe5c25b43c035bf132887f3241d86b71eb7e1cf517f99305b19c47997a1a1f89df6248749ac7f38ca7c88719cf16d6af2394307dce55600b8858f4789cf1ae8fd362ef565cd9332f32068b3c04c9282553e658b759c2e76ed092d67bd55961ae" }
    },
    {
      modes: [15200],
      names: ["blockchain-my-wallet-v2"],
      isFast: false,
      validate: (h) => /^\$blockchain\$v2\$\d+\$\d+\$[0-9a-fA-F]{48,}$/.test(h),
      verify: verifyBlockchainV2,
      example: { password: "hashcat", hash: "$blockchain$v2$5000$288$324724252428471806184866704068819419467b2b32fd9593fd1a274e0b68bf2c72e5a1f5e748fd319056d1e47ca7b40767136a2d97d7133d14faaeca50986f66cdbc0faec0a3fabbd0ba5d08d5322b6b53da021aacfc439c45bec0e9fe02ad81db82f94e9bd36a7d4d76b505c2339fcd46565d3abab958fbeb1de8bfc53beb96cde8fe44128965477c9ef0762c62bbb1d66532b4888e174ea949db54374a2ed9686a63eb0b5b17ae293f7410bb4ae5106f108314a259c5fd097d558515d79350713412159103a8a174cd384a14f3da45efe18044e1146036000231f6042577d0add98fc959d265368e398dc1550b0bc693e9023cd9d51b40e701bd786e19c3a281a90465aa6ea3f9e756d430164ab2eb43be5b6796d7ac15b2fe99217410f2" }
    },
    {
      modes: [7700],
      names: ["sap-codvn-b", "sap-bcode"],
      isFast: false,
      validate: (h) => /^[^$]+\$[0-9A-Fa-f]{16}$/.test(h),
      verify: verifySapB,
      example: { password: "hashcat", hash: "027642760180$77EC38630C08DF8D" }
    },
    {
      modes: [7800],
      names: ["sap-codvn-fg", "sap-passcode"],
      isFast: false,
      validate: (h) => /^[^$]+\$[0-9A-Fa-f]{40}$/.test(h),
      verify: verifySapG,
      example: { password: "hashcat", hash: "604020408266$32837BA7B97672BA4E5AC74767A4E6E1AE802651" }
    },
    {
      modes: [23700],
      names: ["rar3p-uncompressed"],
      isFast: false,
      validate: (h) => /^\$RAR3\$\*1\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{8}\*\d+\*\d+\*1\*[0-9a-fA-F]+\*30$/.test(h),
      verify: verifyRar3p,
      example: { password: "hashcat", hash: "$RAR3$*1*e54a73729887cb53*49b0a846*16*14*1*34620bcca8176642a210b1051901921e*30" }
    },
    {
      modes: [12500],
      names: ["rar3hp"],
      isFast: false,
      validate: (h) => /^\$RAR3\$\*0\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{32}$/.test(h),
      verify: verifyRar3hp,
      example: { password: "hashcat", hash: "$RAR3$*0*45109af8ab5f297a*adbf6c5385d7a40373e8f77d7b89d317" }
    },
    {
      modes: [13e3],
      names: ["rar5"],
      isFast: false,
      validate: (h) => /^\$rar5\$16\$[0-9a-fA-F]+\$\d+\$[0-9a-fA-F]+\$8\$[0-9a-fA-F]{16}$/.test(h),
      verify: verifyRar5,
      example: { password: "hashcat", hash: "$rar5$16$38466361001011015181344360681307$15$00000000000000000000000000000000$8$cc7a30583e62676a" }
    },
    {
      modes: [13600],
      names: ["winzip"],
      isFast: false,
      validate: (h) => /^\$zip2\$\*\d+\*[123]\*\d+\*[0-9a-fA-F]*\*[0-9a-fA-F]*\*\d+\*[0-9a-fA-F]*\*[0-9a-fA-F]+\*\$\/zip2\$$/.test(h),
      verify: verifyWinzipAes,
      example: { password: "hashcat", hash: "$zip2$*0*1*0*0675369741458183*5dc5*0**36b85538918416712640*$/zip2$" }
    },
    {
      modes: [23001],
      names: ["securezip-aes128"],
      isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*128\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: "hashcat", hash: "$zip3$*0*1*128*0*b4630625c92b6e7848f6fd86*df2f62611b3d02d2c7e05a48dad57c7d93b0bac1362261ab533807afb69db856676aa6e350320130b5cbf27c55a48c0f75739654ac312f1cf5c37149557fc88a92c7e3dde8d23edd2b839036e88092a708b7e818bf1b6de92f0efb5cce184cceb11db6b3ca0527d0bdf1f1137ee6660d9890928cd80542ac1f439515519147c14d965b5ba107c6227f971e3e115170bf*0*0*0*file.txt" }
    },
    {
      modes: [23002],
      names: ["securezip-aes192"],
      isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*192\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: "hashcat", hash: "$zip3$*0*1*192*0*53ff2de8c280778e1e0ab997*603eb37dbab9ea109e2c405e37d8cae1ec89e1e0d0b9ce5bf55d1b571c343b6a3df35fe381c30249cb0738a9b956ba8e52dfc5552894296300446a771032776c811ff8a71d9bb3c4d6c37016c027e41fea2d157d5b0ce17804b1d7c1606b7c1121d37851bd705e001f2cd755bbf305966d129a17c1d48ff8e87cfa41f479090cd456527db7d1d43f9020ad8e73f851a5*0*0*0*file.txt" }
    },
    {
      modes: [23003],
      names: ["securezip-aes256"],
      isFast: false,
      validate: (h) => /^\$zip3\$\*0\*1\*256\*0\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*0\*0\*0\*/.test(h),
      verify: verifySecurezip,
      example: { password: "hashcat", hash: "$zip3$*0*1*256*0*39bff47df6152a0214d7a967*65ff418ffb3b1198cccdef0327c03750f328d6dd5287e00e4c467f33b92a6ef40a74bb11b5afad61a6c3c9b279d8bd7961e96af7b470c36fc186fd3cfe059107021c9dea0cf206692f727eeca71f18f5b0b6ee1f702b648bba01aa21c7b7f3f0f7d547838aad46868155a04214f22feef7b31d7a15e1abe6dba5e569c62ee640783bb4a54054c2c69e93ece9f1a2af9d*0*0*0*file.txt" }
    },
    {
      modes: [17210],
      names: ["pkzip-uncompressed"],
      isFast: false,
      validate: (h) => _zip.validatePkzip(h, 0),
      verify: verifyPkzip,
      example: { password: "hashcat", hash: "$pkzip2$1*1*2*0*1d1*1c5*eda7a8de*0*28*0*1d1*eda7*5096*1dea673da43d9fc7e2be1a1f4f664269fceb6cb88723a97408ae1fe07f774d31d1442ea8485081e63f919851ca0b7588d5e3442317fff19fe547a4ef97492ed75417c427eea3c4e146e16c100a2f8b6abd7e5988dc967e5a0e51f641401605d673630ea52ebb04da4b388489901656532c9aa474ca090dbac7cf8a21428d57b42a71da5f3d83fed927361e5d385ca8e480a6d42dea5b4bf497d3a24e79fc7be37c8d1721238cbe9e1ea3ae1eb91fc02aabdf33070d718d5105b70b3d7f3d2c28b3edd822e89a5abc0c8fee117c7fbfbfd4b4c8e130977b75cb0b1da080bfe1c0859e6483c42f459c8069d45a76220e046e6c2a2417392fd87e4aa4a2559eaab3baf78a77a1b94d8c8af16a977b4bb45e3da211838ad044f209428dba82666bf3d54d4eed82c64a9b3444a44746b9e398d0516a2596d84243b4a1d7e87d9843f38e45b6be67fd980107f3ad7b8453d87300e6c51ac9f5e3f6c3b702654440c543b1d808b62f7a313a83b31a6faaeedc2620de7057cd0df80f70346fe2d4dccc318f0b5ed128bcf0643e63d754bb05f53afb2b0fa90b34b538b2ad3648209dff587df4fa18698e4fa6d858ad44aa55d2bba3b08dfdedd3e28b8b7caf394d5d9d95e452c2ab1c836b9d74538c2f0d24b9b577*$/pkzip2$" }
    },
    {
      modes: [17200],
      names: ["pkzip-compressed"],
      isFast: false,
      validate: (h) => _zip.validatePkzip(h, 8),
      verify: verifyPkzip,
      example: { password: "hashcat", hash: "$pkzip2$1*1*2*0*e3*1c5*eda7a8de*0*28*8*e3*eda7*5096*a9fc1f4e951c8fb3031a6f903e5f4e3211c8fdc4671547bf77f6f682afbfcc7475d83898985621a7af9bccd1349d1976500a68c48f630b7f22d7a0955524d768e34868880461335417ddd149c65a917c0eb0a4bf7224e24a1e04cf4ace5eef52205f4452e66ded937db9545f843a68b1e84a2e933cc05fb36d3db90e6c5faf1bee2249fdd06a7307849902a8bb24ec7e8a0886a4544ca47979a9dfeefe034bdfc5bd593904cfe9a5309dd199d337d3183f307c2cb39622549a5b9b8b485b7949a4803f63f67ca427a0640ad3793a519b2476c52198488e3e2e04cac202d624fb7d13c2*$/pkzip2$" }
    },
    {
      modes: [17220],
      names: ["pkzip-multi-compressed"],
      isFast: false,
      validate: (h) => _zip.validatePkzip(h, { multi: true }),
      verify: verifyPkzip,
      example: { password: "hashcat", hash: "$pkzip2$3*1*1*0*8*24*a425*8827*d1730095cd829e245df04ebba6c52c0573d49d3bbeab6cb385b7fa8a28dcccd3098bfdd7*1*0*8*24*2a74*882a*51281ac874a60baedc375ca645888d29780e20d4076edd1e7154a99bde982152a736311f*2*0*e3*1c5*eda7a8de*0*29*8*e3*eda7*5096*1455781b59707f5151139e018bdcfeebfc89bc37e372883a7ec0670a5eafc622feb338f9b021b6601a674094898a91beac70e41e675f77702834ca6156111a1bf7361bc9f3715d77dfcdd626634c68354c6f2e5e0a7b1e1ce84a44e632d0f6e36019feeab92fb7eac9dda8df436e287aafece95d042059a1b27d533c5eab62c1c559af220dc432f2eb1a38a70f29e8f3cb5a207704274d1e305d7402180fd47e026522792f5113c52a116d5bb25b67074ffd6f4926b221555234aabddc69775335d592d5c7d22462b75de1259e8342a9ba71cb06223d13c7f51f13be2ad76352c3b8ed*$/pkzip2$" }
    },
    {
      modes: [17225],
      names: ["pkzip-multi-mixed"],
      isFast: false,
      validate: (h) => _zip.validatePkzip(h, { multi: true }),
      verify: verifyPkzip,
      example: { password: "hashcat", hash: "$pkzip2$3*1*1*0*0*24*3e2c*3ef8*0619e9d17ff3f994065b99b1fa8aef41c056edf9fa4540919c109742dcb32f797fc90ce0*1*0*8*24*431a*3f26*18e2461c0dbad89bd9cc763067a020c89b5e16195b1ac5fa7fb13bd246d000b6833a2988*2*0*23*17*1e3c1a16*2e4*2f*0*23*1e3c*3f2d*54ea4dbc711026561485bbd191bf300ae24fa0997f3779b688cdad323985f8d3bb8b0c*$/pkzip2$" }
    },
    {
      modes: [11600],
      names: ["7zip"],
      isFast: false,
      validate: (h) => /^\$7z\$\d+\$\d+\$\d+\$[0-9a-fA-F]*\$\d+\$[0-9a-fA-F]+\$\d+\$\d+\$\d+\$[0-9a-fA-F]+/.test(h),
      verify: verify7z,
      example: { password: "hashcat", hash: "$7z$0$14$0$$11$33363437353138333138300000000000$2365089182$16$12$d00321533b483f54a523f624a5f63269" }
    },
    {
      modes: [16600],
      names: ["electrum-salt1"],
      isFast: false,
      validate: (h) => /^\$electrum\$[123]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}$/.test(h),
      verify: verifyElectrum16600,
      example: { password: "hashcat", hash: "$electrum$1*44358283104603165383613672586868*c43a6632d9f59364f74c395a03d8c2ea" }
    },
    {
      modes: [21700],
      names: ["electrum-salt4"],
      isFast: false,
      validate: (h) => /^\$electrum\$4\*[0-9a-fA-F]{66}\*[0-9a-fA-F]+\*[0-9a-fA-F]{64}$/.test(h),
      verify: verifyElectrum21700,
      example: { password: "hashcat", hash: "$electrum$4*03eae309d8bda5dcbddaae8145469193152763894b7260a6c4ba181b3ac2ed5653*8c594086a64dc87a9c1f8a69f646e31e8d3182c3c722def4427aa20684776ac26092c6f60bf2762e27adfa93fe1e952dcb8d6362224b9a371953aa3a2edb596ce5eb4c0879c4353f2cc515ec6c9e7a6defa26c5df346d18a62e9d40fcc606bc8c34322bf2212f77770a683788db0baf4cb43595c2a27fe5ff8bdcb1fd915bcd725149d8ee8f14c71635fecb04da5dde97584f4581ceb7d907dceed80ae5daa8352dda20b25fd6001e99a96b7cf839a36cd3f5656304e6998c18e03dd2fb720cb41386c52910c9cb83272c3d50f3a6ff362ab8389b0c21c75133c971df0a75b331796371b060b32fe1673f4a041d7ae08bbdeffb45d706eaf65f99573c07972701c97766b4d7a8a03bba0f885eb3845dfd9152286e1de1f93e25ce04c54712509166dda80a84c2d34652f68e6c01e662f8b1cc7c15103a4502c29332a4fdbdda470c875809e15aab3f2fcb061ee96992ad7e8ab9da88203e35f47d6e88b07a13b0e70ef76de3be20dc06facbddc1e47206b16b44573f57396265116b4d243e77d1c98bc2b28aa3ec0f8d959764a54ecdd03d8360ff2823577fe2183e618aac15b30c1d20986841e3d83c0bfabcedb7c27ddc436eb7113db927e0beae7522b04566631a090b214660152a4f4a90e19356e66ee7309a0671b2e7bfde82667538d193fc7e397442052c6c611b6bf0a04f629a1dc7fa9eb44bfad1bfc6a0bce9f0564c3b483737e447720b7fd038c9a961a25e9594b76bf8c8071c83fcacd689c7469f698ee4aee4d4f626a73e21ce4967e705e4d83e1145b4260330367d8341c84723a1b02567ffbab26aac3afd1079887b4391f05d09780fc65f8b4f68cd51391c06593919d7eafd0775f83045b8f5c2e59cef902ff500654ea29b7623c7594ab2cc0e05ffe3f10abc46c9c5dac824673c307dcbff5bc5f3774141ff99f6a34ec4dd8a58d154a1c72636a2422b8fafdef399dec350d2b91947448582d52291f2261d264d29399ae3c92dc61769a49224af9e7c98d74190f93eb49a44db7587c1a2afb5e1a4bec5cdeb8ad2aac9728d5ae95600c52e9f063c11cdb32b7c1d8435ce76fcf1fa562bd38f14bf6c303c70fb373d951b8a691ab793f12c0f3336d6191378bccaed32923bba81868148f029e3d5712a2fb9f610997549710716db37f7400690c8dfbed12ff0a683d8e4d0079b380e2fd856eeafb8c6eedfac8fb54dacd6bd8a96e9f8d23ea87252c1a7c2b53efc6e6aa1f0cc30fbaaf68ee7d46666afc15856669cd9baebf9397ff9f322cce5285e68a985f3b6aadce5e8f14e9f9dd16764bc4e9f62168aa265d8634ab706ed40b0809023f141c36717bd6ccef9ec6aa6bfd2d00bda9375c2fee9ebba49590a166*1b0997cf64bb2c2ff88cb87bcacd9729d404bd46db18117c20d94e67c946fedc" }
    },
    {
      modes: [21800],
      names: ["electrum-salt5"],
      isFast: false,
      validate: (h) => /^\$electrum\$5\*[0-9a-fA-F]{66}\*[0-9a-fA-F]+\*[0-9a-fA-F]{64}$/.test(h),
      verify: verifyElectrum21800,
      example: { password: "hashcat", hash: "$electrum$5*02170fee7c35f1ef3b229edc90fbd0793b688a0d6f41137a97aab2343d315cce16*94cf72d8f5d774932b414a3344984859e43721268d2eb35fa531de5a2fc7024b463c730a54f4f46229dd9fede5034b19ac415c2916e9c16b02094f845795df0c397ff76d597886b1f9e014ad1a8f64a3f617d9900aa645b3ba86f16ce542251fc22c41d93fa6bc118be96d9582917e19d2a299743331804cfc7ce2c035367b4cbcfb70adfb1e10a0f2795769f2165d8fd13daa8b45eeac495b5b63e91a87f63b42e483f84a881e49adecacf6519cb564694b42dd9fe80fcbc6cdb63cf5ae33f35255266f5c2524dd93d3cc15eba0f2ccdc3c109cc2d7e8f711b8b440f168caf8b005e8bcdfe694148e94a04d2a738f09349a96600bd8e8edae793b26ebae231022f24e96cb158db141ac40400a9e9ef099e673cfe017281537c57f82fb45c62bdb64462235a6eefb594961d5eb2c46537958e4d04250804c6e9f343ab7a0db07af6b8a9d1a6c5cfcd311b8fb8383ac9ed9d98d427d526c2f517fc97473bd87cb59899bd0e8fb8c57fa0f7e0d53daa57c972cf92764af4b1725a5fb8f504b663ec519731929b3caaa793d8ee74293eee27d0e208a60e26290bc546e6fa9ed865076e13febfea249729218c1b5752e912055fbf993fbac5df2cca2b37c5e0f9c30789858ceeb3c482a8db123966775aeed2eee2fc34efb160d164929f51589bff748ca773f38978bff3508d5a7591fb2d2795df983504a788071f469d78c88fd7899cabbc5804f458653d0206b82771a59522e1fa794d7de1536c51a437f5d6df5efd6654678e5794ca429b5752e1103340ed80786f1e9da7f5b39af628b2212e4d88cd36b8a7136d50a6b6e275ab406ba7c57cc70d77d01c4c16e9363901164fa92dc9e9b99219d5376f24862e775968605001e71b000e2c7123b4b43f3ca40db17efd729388782e46e64d43ccb947db4eb1473ff1a3836b74fe312cd1a33b73b8b8d80c087088932277773c329f2f66a01d6b3fc1e651c56959ebbed7b14a21b977f3acdedf1a0d98d519a74b50c39b3052d840106da4145345d86ec0461cddafacc2a4f0dd646457ad05bf04dcbcc80516a5c5ed14d2d639a70e77b686f19cbfb63f546d81ae19cc8ba35cce3f3b5b9602df25b678e14411fecec87b8347f5047513df415c6b1a3d39871a6bcb0f67d9cf8311596deae45fd1d84a04fd58f1fd55c5156b7309af09094c99a53674809cb87a45f95a2d69f9997a38085519cb4e056f9efd56672a2c1fe927d5ea8eec25b8aff6e56f9a2310f1a481daf407b8adf16201da267c59973920fd21bb087b88123ef98709839d6a3ee34efb8ccd5c15ed0e46cff3172682769531164b66c8689c35a26299dd26d09233d1f64f9667474141cf9c6a6de7f2bc52c3bb44cfe679ff4b912c06df406283836b3581773cb76d375304f46239da5996594a8d03b14c02f1b35a432dc44a96331242ae31174*33a7ee59d6d17ed1ee99dc0a71771227e6f3734b17ba36eb589bdced56244135" }
    },
    {
      modes: [6100],
      names: ["whirlpool"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: verifyWhirlpool,
      example: { password: "hashcat", hash: "7ca8eaaaa15eaa4c038b4c47b9313e92da827c06940e69947f85bc0fbef3eb8fd254da220ad9e208b6b28f6bb9be31dd760f1fdb26112d83f87d96b416a4d258" }
    },
    {
      modes: [22e3],
      names: ["wpa-pbkdf2-pmkid"],
      isFast: false,
      validate: (h) => /^WPA\*0[12]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]*\*/.test(h),
      verify: verifyWpa,
      example: { password: "hashcat!", hash: "WPA*01*4d4fe7aac3a2cecab195321ceb99a7d0*fc690c158264*f4747f87f9f4*686173686361742d6573736964***" }
    },
    {
      modes: [22001],
      names: ["wpa-pmk-pmkid+eapol"],
      isFast: false,
      validate: (h) => /^WPA\*0[12]\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]{12}\*[0-9a-fA-F]*\*/.test(h),
      verify: _wpa.verifyWpaPmk,
      example: { password: "88f43854ae7b1624fc2ab7724859e795130f4843c7535729e819cf92f39535dc", hash: "WPA*01*5ce7ebe97a1bbfeb2822ae627b726d5b*27462da350ac*accd10fb464e*686173686361742d6573736964***" }
    },
    {
      modes: [16800],
      names: ["wpa-pmkid-pbkdf2"],
      isFast: false,
      validate: (h) => /^[0-9a-fA-F]{32}:[0-9a-fA-F]{12}:[0-9a-fA-F]{12}:[0-9a-fA-F]+$/.test(h),
      verify: _wpa.verify16800,
      example: { password: "hashcat!", hash: "2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4:ed487162465a774bfba60eb603a39f3a" }
    },
    {
      modes: [16801],
      names: ["wpa-pmkid-pmk"],
      isFast: false,
      validate: (h) => /^[0-9a-fA-F]{32}:[0-9a-fA-F]{12}:[0-9a-fA-F]{12}$/.test(h),
      verify: _wpa.verify16801,
      example: { password: "5b13d4babb3714ccc62c9f71864bc984efd6a55f237c7a87fc2151e1ca658a9d", hash: "2582a8281bf9d4308d6f5731d0e61c61:4604ba734d4e:89acf0e761f4" }
    },
    {
      modes: [2500],
      names: ["wpa-eapol-pbkdf2"],
      isFast: false,
      validate: (h) => /^48435058[0-9a-fA-F]{778,}$/.test(h),
      verify: _wpa.verify2500,
      example: { password: "hashcat!", hash: "4843505804000000000235380000000000000000000000000000000000000000000000000000000000000151aecc428f182acefbd1a9e62d369a079265784da83ba4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b823a1cd402aed449cced04f552c5b5acfebf06ae96a09c96d9a01c443a17aa62258c4f651a68aa67b0001030077fe010900200000000000000001a4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b8230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018dd160050f20101000050f20201000050f20201000050f20200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }
    },
    {
      modes: [2501],
      names: ["wpa-eapol-pmk"],
      isFast: false,
      validate: (h) => /^48435058[0-9a-fA-F]{778,}$/.test(h),
      verify: _wpa.verify2501,
      example: { password: "7f620a599c445155935a35634638fa67b4aafecb92e0bd8625388757a63c2dda", hash: "4843505804000000000235380000000000000000000000000000000000000000000000000000000000000151aecc428f182acefbd1a9e62d369a079265784da83ba4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b823a1cd402aed449cced04f552c5b5acfebf06ae96a09c96d9a01c443a17aa62258c4f651a68aa67b0001030077fe010900200000000000000001a4cf88375c44c830e6e5aa5d6faf352aa496a9ee129fb8292f7435df5420b8230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018dd160050f20101000050f20201000050f20201000050f20200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" }
    },
    // ----- easy digest breadth (crypto-js only) ----------------------------
    // raw utf16le
    {
      modes: [70],
      names: ["md5-utf16le"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.MD5),
      example: { password: "hashcat", hash: "2303b15bfa48c74a74758135a0df1201" }
    },
    {
      modes: [170],
      names: ["sha1-utf16le"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA1),
      example: { password: "hashcat", hash: "b9798556b741befdbddcbf640d1dd59d19b1e193" }
    },
    {
      modes: [1470],
      names: ["sha256-utf16le"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA256),
      example: { password: "hashcat", hash: "9e9283e633f4a7a42d3abc93701155be8afe5660da24c8758e7d3533e2f2dc82" }
    },
    {
      modes: [1770],
      names: ["sha512-utf16le"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA512),
      example: { password: "hashcat", hash: "79bba09eb9354412d0f2c037c22a777b8bf549ab12d49b77d5b25faa839e4378d8f6fa11aceb6d9413977ae5ad5d011568bad2de4f998d75fd4ce916eda83697" }
    },
    {
      modes: [10870],
      names: ["sha384-utf16le"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}$/.test(h),
      verify: makeUtf16leRawVerifier(CryptoJS.SHA384),
      example: { password: "hashcat", hash: "48e61d68e93027fae35d405ed16cd01b6f1ae66267833b4a7aa1759e45bab9bba652da2e4c07c155a3d8cf1d81f3a7e8" }
    },
    // salted sha224 / sha384
    {
      modes: [1310],
      names: ["sha224-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA224, "ps", false),
      example: { password: "hashcat", hash: "0cf361904f4b0234cf4ade8496d8c11c04e5982db967603e82f22b2f:89452466460220844541730694146873525188525677" }
    },
    {
      modes: [1320],
      names: ["sha224-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA224, "sp", false),
      example: { password: "hashcat", hash: "4258a61d3d0d5a5b6796f0ab02d081e998fe657d55d22091d3b51409:36669207" }
    },
    {
      modes: [10810],
      names: ["sha384-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, "ps", false),
      example: { password: "hashcat", hash: "ca1c843a7a336234baf9db2e10bc38824ce523402fbd7741286b1602bdf6cb869a45289bb9fb706bd404b9f3842ff729:2746460797049820734631508" }
    },
    {
      modes: [10820],
      names: ["sha384-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, "sp", false),
      example: { password: "hashcat", hash: "63f63d7f82d4a4cb6b9ff37a6bc7c5ec39faaf9c9078551f5cbf7960e76ded87b643d37ac53c45bc544325e7ff83a1f2:93362" }
    },
    {
      modes: [10830],
      names: ["sha384-utf16le-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, "ps", true),
      example: { password: "hashcat", hash: "3516a589d2ed4071bf5e36f22e11212b3ad9050b9094b23067103d51e99dcb25c4dc397dba8034fed11a8184acfbb699:577730514588712" }
    },
    {
      modes: [10840],
      names: ["sha384-salt-utf16le-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{96}:.+$/.test(h),
      verify: makeSaltedVerifier(CryptoJS.SHA384, "sp", true),
      example: { password: "hashcat", hash: "316e93ea8e04de3e5a909c53d36923a31a16c1b9e89b44201d6082f87ca49c5bca53cad65f685207db3ea2ccc7ca40f8:700067651" }
    },
    // ----- more combinators (crypto-js only; format "<hex>:<salt>" unless noted) -----
    {
      modes: [2630],
      names: ["md5-md5-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_md5s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "0127eecea3120e34c8934ba3b72a390a:0" }
    },
    {
      modes: [4410],
      names: ["md5-sha1pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_sha1s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "bc8319c0220bff8a0d7f5d703114a725:34659348756345251" }
    },
    {
      modes: [4420],
      names: ["md5-sha1-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_sha1s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "34ebbba3e5c98f6253c160eae53da092:6224378456121050285" }
    },
    {
      modes: [4430],
      names: ["md5-sha1-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_sha1s(String(h).slice(i + 1) + String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "df0e9ede5b6c7d1f1b47199f86029002:59132809201799180722359939692710461886" }
    },
    {
      modes: [4510],
      names: ["sha1-sha1pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha1s(_sha1s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "9138d472fce6fe50e2a32da4eec4ecdc8860f4d5:hashcat1" }
    },
    {
      modes: [4710],
      names: ["sha1-md5pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha1s(_md5s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1" }
    },
    {
      modes: [4900],
      names: ["sha1-salt-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _sha1s(s + String(p) + s) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "75d280ca9a0c2ee18729603104ead576d9ca6285:347070" }
    },
    {
      modes: [5e3],
      names: ["sha1-sha1-salt-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _sha1s(_sha1s(s + String(p) + s)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "05ac0c544060af48f993f9c3cdf2fc03937ea35b:232725102020" }
    },
    {
      modes: [21100],
      names: ["sha1-md5-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha1s(_md5s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "aade80a61c6e3cd3cac614f47c1991e0a87dd028:6" }
    },
    {
      modes: [22300],
      names: ["sha256-salt-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _sha256s(s + String(p) + s) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "755a8ce4e0cf0baee41d714aa35c9fca803106608f718f973eab006578285007:11265" }
    },
    {
      modes: [20710],
      names: ["sha256-sha256pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha256s(_sha256s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "bfede293ecf6539211a7305ea218b9f3f608953130405cda9eaba6fb6250f824:7218532375810603" }
    },
    {
      modes: [20720],
      names: ["sha256-salt-sha256pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha256s(String(h).slice(i + 1) + _sha256s(String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "bae9edada8358fcebcd811f7d362f46277fb9d488379869fba65d79701d48b8b:869dc2ed80187919" }
    },
    {
      modes: [20730],
      names: ["sha256-sha256-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha256s(_sha256s(String(p) + String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "ad66bdc0841d7e08d96c03de271ce14e77de078746b535adbf9d4b6ccbf2a517:7218532375810603" }
    },
    {
      modes: [33e3],
      names: ["md5-salt1-pass-salt2"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        return _md5s(q[1] + String(p) + q[2]) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "036a81bc84e01700faf965c3caaa3954:0243402616975530019305541949338903179746132451440267505028190519468680111713847350899833009965414425621884797638402856957040435715380438220464016:0757380776148401126145133134435506200715895167468508855794708942913462135276430452032928239699197100625556660484150983610760766285767453357925167463064045123083116191440783332986105343359475417787249790516137833723344398087127577224833364437305770807742238" }
    },
    // unsalted combinators
    {
      modes: [18500],
      names: ["sha1-md5-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => _sha1s(_md5s(_md5s(String(p)))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "888a2ffcb3854fba0321110c5d0d434ad1aa2880" }
    },
    {
      modes: [20800],
      names: ["sha256-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _sha256s(_md5s(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "74ee1fae245edd6f27bf36efc3604942479fceefbadab5dc5c0b538c196eb0f1" }
    },
    {
      modes: [32800],
      names: ["md5-sha1-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5s(_sha1s(_md5s(String(p)))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "7b4f60b54472980e922280e225150dfa" }
    },
    {
      modes: [34400],
      names: ["sha224-sha224"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha224s(_sha224s(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "b7d9a0e57e6e94e8b87996b81ffa64b05d237c58fff1d7a4e4fe2a77" }
    },
    {
      modes: [34500],
      names: ["sha224-sha1"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha224s(_sha1s(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "10d302483c927df95abba98d69dcd9608365241d1523a8cc5fcbcedc" }
    },
    // ----- PBKDF2/PBKDF1 crypt formats (crypto-js PBKDF2) -----
    {
      modes: [1e4],
      names: ["django-pbkdf2-sha256"],
      isFast: false,
      validate: (h) => /^pbkdf2_sha256\$\d+\$[^$]+\$[A-Za-z0-9+/]+=*$/.test(h),
      verify: _kdf.verifyDjango,
      example: { password: "hashcat", hash: "pbkdf2_sha256$10000$1135411628$bFYX62rfJobJ07VwrUMXfuffLfj2RDM2G6/BrTrUWkE=" }
    },
    {
      modes: [21600],
      names: ["web2py-pbkdf2-sha512"],
      isFast: false,
      validate: (h) => /^pbkdf2\(\d+,\d+,sha512\)\$[^$]+\$[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyWeb2py,
      example: { password: "hashcat", hash: "pbkdf2(1000,20,sha512)$744943$c5f8cdef76e3327c908d8d96d4abdb3d8caba14c" }
    },
    {
      modes: [32900],
      names: ["pbkdf1-sha1"],
      isFast: false,
      validate: (h) => /^PBKDF1:sha1:\d+:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/.test(h),
      verify: _kdf.verifyPbkdf1Sha1,
      example: { password: "hashcat", hash: "PBKDF1:sha1:1000:cGVuZ3VpbmtlZXBlcg==:J4BrIhXDUHNQ9lPPrWKn4V7Of9Y=" }
    },
    {
      modes: [20200],
      names: ["passlib-pbkdf2-sha512"],
      isFast: false,
      validate: (h) => /^\$pbkdf2-sha512\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha512,
      example: { password: "hashcat", hash: "$pbkdf2-sha512$25000$LyWE0HrP2RsjZCxlDGFMKQ$1vC5Ohk2mCS9b6akqsEfgeb4l74SF8XjH.SljXf3dMLHdlY1GK9ojcCKts6/asR4aPqBmk74nCDddU3tvSCJvw" }
    },
    {
      modes: [20300],
      names: ["passlib-pbkdf2-sha256"],
      isFast: false,
      validate: (h) => /^\$pbkdf2-sha256\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha256,
      example: { password: "hashcat", hash: "$pbkdf2-sha256$29000$x9h7j/Ge8x6DMEao1VqrdQ$kra3R1wEnY8mPdDWOpTqOTINaAmZvRMcYd8u5OBQP9A" }
    },
    {
      modes: [20400],
      names: ["passlib-pbkdf2-sha1"],
      isFast: false,
      validate: (h) => /^\$pbkdf2\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha1,
      example: { password: "hashcat", hash: "$pbkdf2$131000$r5WythYixPgfQ2jt3buXcg$8Kdr.QQEOaZIXNOrrru36I/.6Po" }
    },
    {
      modes: [9200],
      names: ["cisco-ios-pbkdf2-sha256", "cisco-type8"],
      isFast: false,
      validate: (h) => /^\$8\$[^$]+\$.{43}$/.test(h),
      verify: _kdf.verifyCisco8,
      example: { password: "hashcat", hash: "$8$84486783037343$pYNyVrtyMalQrZLxRi7ZLQS1Fl.jkYCgASUi5P8JNb2" }
    },
    {
      modes: [9300],
      names: ["cisco-ios-scrypt", "cisco-type9"],
      isFast: false,
      validate: (h) => /^\$9\$[^$]+\$.{43}$/.test(h),
      verify: _kdf.verifyCisco9,
      example: { password: "hashcat", hash: "$9$87023684531115$phio0TBQwaO7KZ8toQFyGFyDvyOzidaypRWN0uKX0hU" }
    },
    {
      modes: [10300],
      names: ["sap-codvn-h-issha1"],
      isFast: false,
      validate: (h) => /^\{x-issha, \d+\}.+$/.test(h),
      verify: _kdf.verifySapCodvnH1,
      example: { password: "hashcat", hash: "{x-issha, 1024}BnjXMqcNTwa3BzdnUOf1iAu6dw02NzU4MzE2MTA=" }
    },
    {
      modes: [35e3],
      names: ["sap-codvn-h-issha512"],
      isFast: false,
      validate: (h) => /^\{x-isSHA512, \d+\}.+$/.test(h),
      verify: _kdf.verifySapCodvnH512,
      example: { password: "hashcat", hash: "{x-isSHA512, 15000}YZH/V2T7zlQMGeWLBarm5Oi3qV9Y8ByXQijD28+bjtLdo7YssXaUBkxMXbS3l4yVlYw97tvYj+vu/L37sg1reDEzODQ4MDY1NzQ1NjQ=" }
    },
    {
      modes: [12800],
      names: ["ms-azuresync-pbkdf2"],
      isFast: false,
      validate: (h) => /^v1;PPH1_MD4,[0-9a-fA-F]+,\d+,[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyAzureSync,
      example: { password: "hashcat", hash: "v1;PPH1_MD4,54188415275183448824,100,55b530f052a9af79a7ba9c466dddcb8b116f8babf6c3873a51a3898fb008e123" }
    },
    {
      modes: [1600],
      names: ["apr1-md5", "apache-md5"],
      isFast: false,
      validate: (h) => /^\$apr1\$[^$]*\$[./A-Za-z0-9]{22}$/.test(h),
      verify: verifyApr1,
      example: { password: "hashcat", hash: "$apr1$62722340$zGjeAwVP2KwY6MtumUI1N/" }
    },
    {
      modes: [32050],
      names: ["netiq-sspr-pbkdf2-sha1"],
      isFast: false,
      validate: (h) => /^\$pbkdf2-hmac-sha1\$\d+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyNetIqSha1,
      example: { password: "hashcat", hash: "$pbkdf2-hmac-sha1$100000$7134180503252384106490944216249411431665011151428170747164626720$990e0c5f62b1384d48cbe3660329b9741c4a8473" }
    },
    {
      modes: [32060],
      names: ["netiq-sspr-pbkdf2-sha256"],
      isFast: false,
      validate: (h) => /^\$pbkdf2-sha256\$\d+\$[A-Za-z0-9./]+\$[A-Za-z0-9./]+$/.test(h),
      verify: _kdf.verifyPasslibSha256,
      example: { password: "hashcat", hash: "$pbkdf2-sha256$100000$MDUzMTE4NjQyNDc5NTQxMjAwMjg1OTYxNjAxNDgzNzc$bwYpAyQ2g5PqdnMj8mJ46mkwQbyztw8gEQqnhDHj48c" }
    },
    {
      modes: [32070],
      names: ["netiq-sspr-pbkdf2-sha512"],
      isFast: false,
      validate: (h) => /^\$pbkdf2-hmac-sha512\$\d+\.[0-9a-fA-F]+\.[0-9a-fA-F]+$/.test(h),
      verify: _kdf.verifyNetIqSha512,
      example: { password: "hashcat", hash: "$pbkdf2-hmac-sha512$100000.0211258841559010919749469547425215185689838310218571790549787198.1659e40e64daf84d635a5f1ed2f5708f6735233bed471994bdc0307b3c5f77597f79bdcdd088d1e79357b383809ddfd84379006b49e14f4ff45c449071478777" }
    },
    {
      modes: [21e3],
      names: ["bitshares-v0"],
      isFast: false,
      validate: (h) => /^[0-9a-fA-F]{128}$/.test(h),
      verify: _coins.verifyBitShares,
      example: { password: "hashcat", hash: "caec04bdf7c17f763a9ec7439f7c9abda112f1bfc9b1bb684fef9b6142636979b9896cfc236896d821a69a961a143dd19c96d59777258201f1bbe5ecc2a2ecf5" }
    },
    {
      modes: [15600],
      names: ["ethereum-pbkdf2"],
      isFast: false,
      validate: (h) => /^\$ethereum\$p\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumPbkdf2,
      example: { password: "hashcat", hash: "$ethereum$p*1024*38353131353831333338313138363430*a8b4dfe92687dbc0afeb5dae7863f18964241e96b264f09959903c8c924583fc*0a9252861d1e235994ce33dbca91c98231764d8ecb4950015a8ae20d6415b986" }
    },
    {
      modes: [15700],
      names: ["ethereum-scrypt"],
      isFast: false,
      validate: (h) => /^\$ethereum\$s\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumScrypt,
      example: { password: "hashcat", hash: "$ethereum$s*262144*8*1*3134313837333434333838303231333633373433323633373534333136363537*73da7f80ec3bd4f2a128c3a815cfb4d576ecb1a9b47024c902e62ea926f7795b*910e0f8dc1f7ba41959e1089bb769f3e919109591913cc33ba03953d7a905efd" }
    },
    {
      modes: [28200],
      names: ["exodus-scrypt-gcm"],
      isFast: false,
      validate: (h) => /^EXODUS:\d+:\d+:\d+:[^:]+:[^:]+:[^:]+:[^:]+$/.test(h),
      verify: _coins.verifyExodus,
      example: { password: "hashcat", hash: "EXODUS:16384:8:1:IYkXZgFETRmFp4wQXyP8XMe3LtuOw8wMdLcBVQ+9YWE=:lq0W9ekN5sC0O7Xw:UD4a6mUUhkTbQtGWitXHZUg0pQ4RHI6W/KUyYE95m3k=:ZuNQckXOtr4r21x+DT1zpQ==" }
    },
    {
      modes: [31900],
      names: ["metamask-mobile"],
      isFast: false,
      validate: (h) => /^\$metamaskMobile\$[^$]+\$[0-9a-fA-F]{32}\$[^$]+$/.test(h),
      verify: _coins.verifyMetamaskMobile,
      example: { password: "hashcat1", hash: "$metamaskMobile$JV4j2dUDl7n+sujyqW3Wvg==$398f9b04c822d36bfcbdd1e68c82d1e8$auj3J2TwOZ4ev3UIGmNa7VXLh0Nmzr3rDbpXRRrONr4=" }
    },
    {
      modes: [29600],
      names: ["terra-station"],
      isFast: false,
      validate: (h) => /^[0-9a-fA-F]{64}[A-Za-z0-9+/=]{40,}$/.test(h),
      verify: _coins.verifyTerra,
      example: { password: "hashcat", hash: "67445496c838e96c1424a8dae4b146f0fc247c8c34ef33feffeb1e4412018512wZGtBMeN84XZE2LoOKwTGvA4Ee4m7PR1lDGIdWUV6OSUZKRiKFx9tlrnZLt8r8OfOzbwUS2a2Uo+nrrP6F85fh4eHstwPJw0KwzHWB8br58=" }
    },
    {
      modes: [25500],
      names: ["stellar-wallet-xlm"],
      isFast: false,
      validate: (h) => /^\$stellar\$[^$]+\$[^$]+\$[^$]+$/.test(h),
      verify: _coins.verifyStellar,
      example: { password: "hashcat", hash: "$stellar$YAlIJziURRcBEWUwRSRDWA==$EutMmmcV5Hbf3p1I$rfSAF349RvGKG4R4Z2VCrH9WjNEKjbJa9hpOja9Yn8MwXruuFEMtw47HPn9CYj+JJ5Rb4Z87Wejj1c4fqpbMZHFOnqtQsVAr" }
    },
    {
      modes: [29800],
      names: ["bisq-scrypt"],
      isFast: false,
      validate: (h) => /^\$bisq\$3\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyBisq,
      example: { password: "hashcat1", hash: "$bisq$3*32768*8*6*31d838af87f99cb8*5cfb7bf3228d9e865881156e17b1866589ffa6b757011e25d1319083595236d2" }
    },
    {
      modes: [27700],
      names: ["multibit-classic-scrypt"],
      isFast: false,
      validate: (h) => /^\$multibit\$3\*\d+\*\d+\*\d+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyMultibitClassicScrypt,
      example: { password: "hashcat", hash: "$multibit$3*16384*8*1*7523cb5482e81b81*91780fd49b81a782ab840157a69ba7996d81270eaf456c850f314fc1787d9b0b" }
    },
    {
      modes: [22700],
      names: ["multibit-hd-scrypt"],
      isFast: false,
      validate: (h) => /^\$multibit\$2\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}\*[0-9a-fA-F]{32}$/.test(h),
      verify: _coins.verifyMultibitHd,
      example: { password: "hashcat", hash: "$multibit$2*2e311aa2cc5ec99f7073cacc8a2d1938*e3ad782e7f92d66a3cdfaec43a46be29*5d1cabd4f4a50ba125f88c47027fff9b" }
    },
    {
      modes: [22500],
      names: ["multibit-classic-md5"],
      isFast: false,
      validate: (h) => /^\$multibit\$1\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyMultibitMd5,
      example: { password: "hashcat", hash: "$multibit$1*e5912fe5c84af3d5*5f0391c219e8ef62c06505b1f6232858f5bcaa739c2b471d45dd0bd8345334de" }
    },
    {
      modes: [34700],
      names: ["blockchain-legacy"],
      isFast: false,
      validate: (h) => /^\$blockchain\$\d+\$[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyBlockchainLegacy,
      example: { password: "hashcat", hash: "$blockchain$269$0349575305940509451603791869345994679e29d1618f26ed65ee15ad65d1af046f51ffcfbfa82dcccea07bb0f0fff725af53b96910646440b361453addc5caeb2a09479dc6cce3a1ebf138e2649689ab286ba2db6bd5edef310cac8f9386f002a534e9346cdc61bd0e21ca738eb2418a8158c83a43517981c43d8792cad6f290cbf40d5a3c1bb20283fcb44c59cae2dc90c898dbc4e960ca666653a08d90471610a8b9bf590752e8d8bee27e7aa58d015324dae83c87a46384ed8f947e37e65d4572018b5bfd8fd8ea70df777c8b692bc613ccb528356d1844490ac2b3be2dd8927fbf1aabf9b6cedec39742ed92a03220f4468bd32c1eed5d5c3c3aa0be459e06466c94991df97f335bd661" }
    },
    {
      modes: [16300],
      names: ["ethereum-presale"],
      isFast: false,
      validate: (h) => /^\$ethereum\$w\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyEthereumPresale,
      example: { password: "hashcat", hash: "$ethereum$w*e94a8e49deac2d62206bf9bfb7d2aaea7eb06c1a378cfc1ac056cc599a569793c0ecc40e6a0c242dee2812f06b644d70f43331b1fa2ce4bd6cbb9f62dd25b443235bdb4c1ffb222084c9ded8c719624b338f17e0fd827b34d79801298ac75f74ed97ae16f72fccecf862d09a03498b1b8bd1d984fc43dd507ede5d4b6223a582352386407266b66c671077eefc1e07b5f42508bf926ab5616658c984968d8eec25c9d5197a4a30eed54c161595c3b4d558b17ab8a75ccca72b3d949919d197158ea5cfbc43ac7dd73cf77807dc2c8fe4ef1e942ccd11ec24fe8a410d48ef4b8a35c93ecf1a21c51a51a08f3225fbdcc338b1e7fdafd7d94b82a81d88c2e9a429acc3f8a5974eafb7af8c912597eb6fdcd80578bd12efddd99de47b44e7c8f6c38f2af3116b08796172eda89422e9ea9b99c7f98a7e331aeb4bb1b06f611e95082b629332c31dbcfd878aed77d300c9ed5c74af9cd6f5a8c4a261dd124317fb790a04481d93aec160af4ad8ec84c04d943a869f65f07f5ccf8295dc1c876f30408eac77f62192cbb25842470b4a5bdb4c8096f56da7e9ed05c21f61b94c54ef1c2e9e417cce627521a40a99e357dd9b7a7149041d589cbacbe0302db57ddc983b9a6d79ce3f2e9ae8ad45fa40b934ed6b36379b780549ae7553dbb1cab238138c05743d0103335325bd90e27d8ae1ea219eb8905503c5ad54fa12d22e9a7d296eee07c8a7b5041b8d56b8af290274d01eb0e4ad174eb26b23b5e9fb46ff7f88398e6266052292acb36554ccb9c2c03139fe72d3f5d30bd5d10bd79d7cb48d2ab24187d8efc3750d5a24980fb12122591455d14e75421a2074599f1cc9fdfc8f498c92ad8b904d3c4307f80c46921d8128*f3abede76ac15228f1b161dd9660bb9094e81b1b*d201ccd492c284484c7824c4d37b1593" }
    },
    {
      modes: [25900],
      names: ["knx-ip-secure"],
      isFast: false,
      validate: (h) => /^\$knx-ip-secure-device-authentication-code\$\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: _coins.verifyKnx,
      example: { password: "hashcat", hash: "$knx-ip-secure-device-authentication-code$*3033*fa7c0d787a9467c209f0a6e7cf16069ed704f3959dce19e45d7935c0a91bce41*f927640d9bbe9a4b0b74dd3289ad41ec" }
    },
    {
      modes: [33400],
      names: ["mega-nz-link"],
      isFast: false,
      validate: (h) => /^P![A-Za-z0-9_-]+$/.test(h),
      verify: _coins.verifyMega,
      example: { password: "hashcat", hash: "P!AgD________U2XVjJi1vxkJgMPf5rkQYUn1H_6WI_sKtiic69mqBKP_____________________O_PDG0Om7BSapL1QoRAgUrz9vzaZmrYnU8t-Au6hteg" }
    },
    {
      modes: [32500],
      names: ["dogechain-wallet"],
      isFast: false,
      validate: (h) => /^\$dogechain\$\d\*\d+\*[A-Za-z0-9+/=]+\*[A-Za-z0-9+/=]+$/.test(h),
      verify: _coins.verifyDogechain,
      example: { password: "hashcat", hash: "$dogechain$0*5000*EEmAkgiMlVrToRhu2suq91R5Frf+VQCvNzv9lj6OwRWIf/3IM31wqhJM7gGQpinXH9kqHkuQ2DMZxspgA7QFAddsUWvZxGdNAkaeKy90EAsTLIuDQnH3plfBQfmL6j5NPaH7Nr7kF1PdvM0pbUw6XHySBYkD/rPHNM6n58NRK4xfO4VVMykeX3+m2LaVyv5s269r/op38svRPT0YFGpRcanY6/U1BeSrvG2IXii1BKXXAcVEN4GFmyEQRWKI0uZE+3M0atf7UEPD4K9tmEKosqdsF4MFLiBtfI4eq0+926ijoezDmUPvHIiyQZ9CH2jZ*6jOgqW/GxL9He1afQiINIg==" }
    },
    {
      modes: [501],
      names: ["juniper-ive"],
      isFast: false,
      validate: (h) => /^[A-Za-z0-9+\/]{102}==$/.test(h),
      verify: _kdf.verifyJuniper,
      example: { password: "hashcat", hash: "3u+UR6n8AgABAAAAHxxdXKmiOmUoqKnZlf8lTOhlPYy93EAkbPfs5+49YLFd/B1+omSKbW7DoqNM40/EeVnwJ8kYoXv9zy9D5C5m5A==" }
    },
    {
      modes: [35100],
      names: ["sm3crypt"],
      isFast: false,
      validate: (h) => /^\$sm3\$(?:rounds=\d+\$)?[^$]+\$[.\/0-9A-Za-z]{43}$/.test(h),
      verify: _sm3.verifySm3crypt,
      example: { password: "hashcat", hash: "$sm3$KTTUB40dW4mRyRFd$ul2xLiIY3FJtbo8sv1R93sAYCkxQCH/6rmS1kD5vJYA" }
    },
    {
      modes: [1500],
      names: ["descrypt", "des-crypt"],
      isFast: false,
      validate: (h) => /^[.\/0-9A-Za-z]{13}$/.test(h),
      verify: _des.verifyDescrypt,
      example: { password: "hashcat", hash: "24leDr0hHfb3A" }
    },
    {
      modes: [12400],
      names: ["bsdi-crypt", "bsdicrypt"],
      isFast: false,
      validate: (h) => /^_[.\/0-9A-Za-z]{4}[.\/0-9A-Za-z]{4}[.\/0-9A-Za-z]{11}$/.test(h),
      verify: _des.verifyBsdi,
      example: { password: "hashcat", hash: "_GW..8841inaTltazRsQ" }
    },
    {
      modes: [7401],
      names: ["mysql-sha256crypt"],
      isFast: false,
      validate: (h) => /^\$mysql\$A\$\d{3}\*[0-9a-fA-F]+\*[0-9a-fA-F]+$/.test(h),
      verify: verifyMysqlA,
      example: { password: "hashcat", hash: "$mysql$A$005*F9CC98CE08892924F50A213B6BC571A2C11778C5*625479393559393965414D45316477456B484F41316E64484742577A2E3162785353526B7554584647562F" }
    },
    {
      modes: [10901],
      names: ["redhat-389-ds-pbkdf2"],
      isFast: false,
      validate: (h) => /^\{PBKDF2_SHA256\}.+$/.test(h),
      verify: _kdf.verifyRedHat389,
      example: { password: "hashcat", hash: "{PBKDF2_SHA256}AAAgADkxMjM2NTIzMzgzMjQ3MjI4MDAwNTk5OTAyOTk4NDI2MjkyMzAzNjg0NjQwOTMxNjI3OTMzNjg0MDI0OTY5NTe5ULagRTYpLaUoeqJMg8x9W/DXu+9VTFaVhaYvebYrY+sOqn1ZMRnws22C1uAkiE2tFM8qN+xw5xe7OmCPZ203NuruK4oB33QlsKIEz4ppm0TR94JB9PJx7lIQwFHD3FUNUNryj4jk6UYyJ4+V1Z9Ug/Iy/ylQBJgfs5ihzgxHYZrfp1wUCXFzlZG9mxmziPm8VFnAhaX4+FBAZvLAx33jpbKOwEg7TmwP2VJ8BNFLQRqwYdlqIjQlAhncXH+dqIF9VdM4MonAA0hx76bMvFTP7LF5VO1IqVmcuYz7YG9v4KKRjnvoUUqOj6okUBQTay3EzsdFVnUW1FemYOccJd5q" }
    },
    // ----- Easy tier: more digest combinators (crypto-js only) -----
    {
      modes: [3610],
      names: ["md5-md5-md5-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_md5s(_md5s(String(p))) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "a0ab79f9e2b5a4434d2da61673b56362:1234" }
    },
    {
      modes: [3910],
      names: ["md5-md5pass-md5salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_md5s(String(p)) + _md5s(String(h).slice(i + 1))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "d8281daba5da597503d12fe31808b4a7:283053" }
    },
    {
      modes: [4711],
      names: ["huawei-sha1-md5pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha1s(_md5s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "53c724b7f34f09787ed3f1b316215fc35c789504:hashcat1" }
    },
    {
      modes: [19300],
      names: ["sha1-salt1-pass-salt2"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        return _sha1s(q[1] + String(p) + q[2]) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "630d2e918ab98e5fad9c61c0e4697654c4c16d73:18463812876898603420835420139870031762867:4449516425193605979760642927684590668549584534278112685644182848763890902699756869283142014018311837025441092624864168514500447147373198033271040848851687108629922695275682773136540885737874252666804716579965812709728589952868736177317883550827482248620334" }
    },
    {
      modes: [20900],
      names: ["md5-sha1-md5-sha1-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => _md5s(_sha1s(String(p)) + _md5s(String(p)) + _sha1s(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "100b3a4fc1dc8d60d9bf40688d8b740a" }
    },
    {
      modes: [21200],
      names: ["md5-sha1salt-md5pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _md5s(_sha1s(s) + _md5s(String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "e69b7a7fe1bf2ad9ef116f79551ee919:baa038987e582431a6d" }
    },
    {
      modes: [21300],
      names: ["md5-salt-sha1-salt-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _md5s(s + _sha1s(s + String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "799dc7d9aa4d3f404cc21a4936dbdcde:68617368636174" }
    },
    {
      modes: [21310],
      names: ["md5-salt1-sha1-salt2-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        return _md5s(q[1] + _sha1s(q[2] + String(p))) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "dc91b5a658ef4b7d859e90742f340e24:708237:d270e9eea5802e346bcaa9b229f37766" }
    },
    {
      modes: [21900],
      names: ["md5-md5-md5-pass-salt1-salt2"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        return _md5s(_md5s(_md5s(String(p) + q[1])) + q[2]) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "2c749af6c65cf3e82e5837e3056727f5:59331674906582121215362940957615121466283616005471:17254656838978443692786064919357750120910718779182716907569266" }
    },
    {
      modes: [22800],
      names: ["simpla-md5-salt-pass-md5pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _md5s(s + String(p) + _md5s(String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "86d173f13213d1e48bce9647bdc306d5:8e86a279d6e182b3c811c559e6b15484" }
    },
    {
      modes: [24300],
      names: ["sha1-salt-sha1-pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _sha1s(s + _sha1s(String(p) + s)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "94520b02c04e79e08a75a84c2a6e3ed4e3874fe8:ThisIsATestSalt" }
    },
    {
      modes: [30500],
      names: ["md5-md5salt-md5-md5pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _md5s(_md5s(String(h).slice(i + 1)) + _md5s(_md5s(String(p)))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "e13bb4b8e5a98db7277df344aa3363cf:28945624531" }
    },
    {
      modes: [31700],
      names: ["md5-md5-md5pass-salt1-salt2"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        return _md5s(_md5s(_md5s(String(p)) + q[1]) + q[2]) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "c7a971e405313d0ecc22e37e8b2424a1:2316355934:478467" }
    },
    {
      modes: [33100],
      names: ["md5-salt-md5pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        var s = String(h).slice(i + 1);
        return _md5s(s + _md5s(String(p)) + s) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "866244ca1d318292a6f40b60e03fd29c:72219426709" }
    },
    {
      modes: [32410],
      names: ["sha512-sha512pass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha512s(_sha512s(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "25d509824028a999f4ee851b5de404bb316b78ae8e974874376484018f58520e082747a7ce9f769bcaccb5f63878356c780f602e23393f12b650a6931e4b9338:21881837027919828109608" }
    },
    {
      modes: [32420],
      names: ["sha512-sha512binpass-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha512s(_sha512raw(String(p)) + String(h).slice(i + 1)) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "c1bade2bd4ebc8db841ac6ab3e0a5035a29619e5b1a6135782b77da5d7cfaccee096f3ddb9ee23b9866378cfc2fb19f2c013fed1b7e1fffd18340a4f39238412:789" }
    },
    {
      modes: [21400],
      names: ["sha256-sha256bin-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _sha256s(_sha256raw(String(p))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "0cc1b58a543f372327aa0281e97ab56e345267ee46feabf7709515debb7ec43c" }
    },
    {
      modes: [21420],
      names: ["sha256-salt-sha256bin-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = String(h).indexOf(":");
        if (i < 0) return false;
        return _sha256s(String(h).slice(i + 1) + _sha256raw(String(p))) === String(h).slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "5934ea4d670c13a71155faba42056b2525f71bdc9215d31108990c11bf3d98e3:9269771356270099311432765354522635185291064175409115041569" }
    },
    {
      modes: [20711],
      names: ["authme-sha256"],
      isFast: true,
      validate: (h) => /^\$SHA\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        if (q.length < 4) return false;
        return _sha256s(_sha256s(String(p)) + q[2]) === q[3].toLowerCase();
      },
      example: { password: "hashcat", hash: "$SHA$7218532375810603$bfede293ecf6539211a7305ea218b9f3f608953130405cda9eaba6fb6250f824" }
    },
    // ----- Easy tier: simple app hashes -----
    {
      modes: [2612],
      names: ["phps"],
      isFast: true,
      validate: (h) => /^\$PHPS\$[0-9a-fA-F]+\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var salt = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1);
        return _md5s(_md5s(String(p)) + salt) === q[3].toLowerCase();
      },
      example: { password: "hashcat", hash: "$PHPS$30353031383437363132$f02b0b2f25e5754edb04522c346ba243" }
    },
    {
      modes: [124],
      names: ["django-sha1"],
      isFast: true,
      validate: (h) => /^sha1\$[^$]*\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        return _sha1s(q[1] + String(p)) === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "sha1$fe76b$02d5916550edf7fc8c886f044887f4b1abf9b013" }
    },
    {
      modes: [131],
      names: ["mssql-2000"],
      isFast: true,
      validate: (h) => /^0x0100[0-9a-fA-F]{88}$/.test(h),
      verify: (p, h) => {
        var salt = h.substr(6, 8), digest = h.substr(54).toLowerCase();
        return CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p).toUpperCase()).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest;
      },
      example: { password: "hashcat", hash: "0x0100778883860000000000000000000000000000000000000000eda3604e067a06f2732b05b9cb90b8a710996939" }
    },
    {
      modes: [132],
      names: ["mssql-2005"],
      isFast: true,
      validate: (h) => /^0x0100[0-9a-fA-F]{48}$/.test(h),
      verify: (p, h) => {
        var salt = h.substr(6, 8), digest = h.substr(14).toLowerCase();
        return CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p)).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest;
      },
      example: { password: "hashcat", hash: "0x010045083578bf13a6e30ca29c40e540813772754d54a5ffd325" }
    },
    {
      modes: [1731],
      names: ["mssql-2012"],
      isFast: true,
      validate: (h) => /^0x0200[0-9a-fA-F]{136}$/.test(h),
      verify: (p, h) => {
        var salt = h.substr(6, 8), digest = h.substr(14).toLowerCase();
        return CryptoJS.SHA512(CryptoJS.enc.Utf16LE.parse(String(p)).concat(CryptoJS.enc.Hex.parse(salt))).toString() === digest;
      },
      example: { password: "hashcat", hash: "0x02003788006711b2e74e7d8cb4be96b1d187c962c5591a02d5a6ae81b3a4a094b26b7877958b26733e45016d929a756ed30d0a5ee65d3ce1970f9b7bf946e705c595f07625b1" }
    },
    {
      modes: [133],
      names: ["peoplesoft"],
      isFast: true,
      validate: (h) => /^[A-Za-z0-9+/]{27}=$/.test(h),
      verify: (p, h) => CryptoJS.SHA1(CryptoJS.enc.Utf16LE.parse(String(p))).toString(CryptoJS.enc.Base64) === String(h),
      example: { password: "hashcat", hash: "uXmFVrdBvv293L9kDR3VnRmx4ZM=" }
    },
    {
      modes: [4521],
      names: ["redmine"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _sha1s(h.slice(i + 1) + _sha1s(String(p))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "c18e826af2a78c7b9b7261452613233417e65817:28246535720688452723483475753333" }
    },
    {
      modes: [4522],
      names: ["punbb"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _sha1s(h.slice(i + 1) + _sha1s(String(p))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "9038129c474caa3f0de56f38db84033d0fe1d4b8:365563602032" }
    },
    {
      modes: [8100],
      names: ["citrix-netscaler-sha1"],
      isFast: true,
      validate: (h) => /^1[0-9a-fA-F]{48,}$/.test(h),
      verify: (p, h) => {
        var digest = h.slice(-40).toLowerCase(), salt = h.slice(1, -40);
        return _sha1s(salt + String(p) + "\0") === digest;
      },
      example: { password: "hashcat", hash: "1130725275da09ca13254957f2314a639818d44c37ef6d558" }
    },
    {
      modes: [22200],
      names: ["citrix-netscaler-sha512"],
      isFast: true,
      validate: (h) => /^2[0-9a-fA-F]{136,}$/.test(h),
      verify: (p, h) => {
        var digest = h.slice(-128).toLowerCase(), salt = h.slice(1, -128);
        return _sha512s(salt + String(p) + "\0") === digest;
      },
      example: { password: "hashcat", hash: "2f9282ade42ce148175dc3b4d8b5916dae5211eee49886c3f7cc768f6b9f2eb982a5ac2f2672a0223999bfd15349093278adf12f6276e8b61dacf5572b3f93d0b4fa886ce" }
    },
    {
      modes: [9900],
      names: ["radmin2"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var s = String(p);
        while (s.length < 100) s += "\0";
        return _md5s(s.substring(0, 100)) === String(h).toLowerCase();
      },
      example: { password: "hashcat", hash: "22527bee5c29ce95373c4e0f359f079b" }
    },
    {
      modes: [11e3],
      names: ["prestashop"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _md5s(h.slice(i + 1) + String(p)) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "f22cade043e7214200206dbffca49fd9:27167508161455764247627144160038845437138252877014827848" }
    },
    {
      modes: [3711],
      names: ["mediawiki-b"],
      isFast: true,
      validate: (h) => /^\$B\$[^$]*\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        return _md5s(q[2] + "-" + _md5s(String(p))) === q[3].toLowerCase();
      },
      example: { password: "hashcat", hash: "$B$2152187716$8c8b39c3602b194eeeb6cac78eea2742" }
    },
    {
      modes: [20712],
      names: ["netwitness-sha256"],
      isFast: true,
      validate: (h) => /^[A-Fa-f0-9]{64}:[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var salt = CryptoJS.enc.Base64.parse(h.slice(i + 1)).toString(CryptoJS.enc.Latin1);
        return _sha256s(_sha256s(String(p)).toUpperCase() + salt) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "6F48F44C46F5ADC534597687B086278F0AAF7D262ADDB3978562A7D55BBDF467:MDAwMzY1NzYwODI4MQ==" }
    },
    {
      modes: [3e4],
      names: ["werkzeug-md5"],
      isFast: true,
      validate: (h) => /^md5\$[^$]+\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        return CryptoJS.HmacMD5(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(q[1])).toString() === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "md5$84143$7f51edecfa6fb401a0b5e63d33fc8c0e" }
    },
    {
      modes: [30120],
      names: ["werkzeug-sha256"],
      isFast: true,
      validate: (h) => /^sha256\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        return CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(q[1])).toString() === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "sha256$70108387805$8b9472281c36c3a693703de0e0f1ffab8fc0ecdd3bc5ead04c76dd74ef431e49" }
    },
    {
      modes: [5700],
      names: ["cisco-ios-sha256"],
      isFast: true,
      validate: (h) => /^[.\/0-9A-Za-z]{43}$/.test(h),
      verify: _kdf.verifyCiscoIos4,
      example: { password: "hashcat", hash: "2btjjy78REtmYkkW0csHUbJZOstRXoWdX1mGrmmfeHI" }
    },
    {
      modes: [24800],
      names: ["umbraco-hmac-sha1"],
      isFast: true,
      validate: (h) => /^[A-Za-z0-9+/]{27}=$/.test(h),
      verify: (p, h) => CryptoJS.HmacSHA1(CryptoJS.enc.Utf16LE.parse(String(p)), CryptoJS.enc.Utf16LE.parse(String(p))).toString(CryptoJS.enc.Base64) === String(h),
      example: { password: "hashcat", hash: "8uigXlGMNI7BzwLCJlDbcKR2FP4=" }
    },
    {
      modes: [8400],
      names: ["wbb3"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var s = h.slice(i + 1);
        return _sha1s(s + _sha1s(s + _sha1s(String(p)))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "7f8d1951fe48ae3266980c2979c141f60e4415e5:5037864764153886517871426607441768004150" }
    },
    {
      modes: [13900],
      names: ["opencart"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var s = h.slice(i + 1);
        return _sha1s(s + _sha1s(s + _sha1s(String(p)))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "058c1c3773340c8563421e2b17e60eb7c916787e:827500576" }
    },
    {
      modes: [27200],
      names: ["rails-restful-auth-1round"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var s = h.slice(i + 1);
        return _sha1s("--" + s + "--" + String(p) + "--") === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "3999d08db95797891ec77f07223ca81bf43e1be2:5dcc47b04c49d3c8e1b9e4ec367fddeed21b7b85" }
    },
    {
      modes: [19500],
      names: ["rails-restful-auth"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:[^:]*:.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        var s = q[1], k = q[2];
        var d = _sha1s(k + "--" + s + "--" + String(p) + "--" + k);
        for (var i = 0; i < 9; i++) d = _sha1s(d + "--" + s + "--" + String(p) + "--" + k);
        return d === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "d7d5ea3e09391da412b653ae6c8d7431ec273ea2:238769868762:8962783556527653675" }
    },
    {
      modes: [112],
      names: ["oracle-11-sha1"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:[0-9a-fA-F]{20}$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(String(p)).concat(CryptoJS.enc.Hex.parse(h.slice(i + 1)))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "63ec5f6113843f5d229e2d49c068d983a9670d02:57677783202322766743" }
    },
    {
      modes: [5720],
      names: ["cisco-ise-sha256"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{64}[0-9a-fA-F]*$/.test(h),
      verify: (p, h) => {
        var digest = h.substr(0, 64).toLowerCase(), salt = h.substr(64);
        var d = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(salt).concat(CryptoJS.enc.Latin1.parse(String(p))));
        for (var i = 0; i < 128; i++) d = CryptoJS.SHA256(d);
        return d.toString() === digest;
      },
      example: { password: "hashcat", hash: "465865d4226c4d9696e601f2c99b25ae2c194ec01806bafc93933331acfc1a60e8bdcca8be9fa245a5fa16029bb52480915746f47d1c539d01da7ec6f37468d1" }
    },
    {
      modes: [4800],
      names: ["iscsi-chap-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[0-9a-fA-F]+:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        if (q.length < 3) return false;
        var chal = CryptoJS.enc.Hex.parse(q[1]).toString(CryptoJS.enc.Latin1), id = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1);
        return _md5s(id + String(p) + chal) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "aa4aaa1d52319525023c06a4873f4c51:35343534373533343633383832343736:dc" }
    },
    {
      modes: [7e3],
      names: ["fortigate"],
      isFast: true,
      validate: (h) => /^AK1[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => {
        var raw = CryptoJS.enc.Base64.parse(h.slice(3)).toString(CryptoJS.enc.Latin1);
        var salt = raw.substr(0, 12), want = raw.substr(12, 20);
        var magic = CryptoJS.enc.Hex.parse("a388ba2e424cb04a537930c13107cc3fa1329029a9815b70").toString(CryptoJS.enc.Latin1);
        return CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(salt + String(p) + magic)).toString(CryptoJS.enc.Latin1) === want;
      },
      example: { password: "hashcat", hash: "AK1FCIhM0IUIQVFJgcDFwLCMi7GppdwtRzMyDpFOFxdpH8=" }
    },
    {
      modes: [26300],
      names: ["fortigate256"],
      isFast: true,
      validate: (h) => /^SH2[A-Za-z0-9+/]+=*$/.test(h),
      verify: (p, h) => {
        var raw = CryptoJS.enc.Base64.parse(h.slice(3)).toString(CryptoJS.enc.Latin1);
        var salt = raw.substr(0, 12), want = raw.substr(12, 32);
        var magic = CryptoJS.enc.Hex.parse("a388ba2e424cb04a537930c13107cc3fa1329029a9815b70").toString(CryptoJS.enc.Latin1);
        return CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(salt + String(p) + magic)).toString(CryptoJS.enc.Latin1) === want;
      },
      example: { password: "hashcat", hash: "SH2lpcpFXM5QRlWYwY5vL9+5svfYyb+c79qENpxEoB3NtZpVxKwHjuq/9TH88U=" }
    },
    {
      modes: [8e3],
      names: ["sybase-ase"],
      isFast: true,
      validate: (h) => /^0xc007[0-9a-fA-F]{80}$/.test(h),
      verify: (p, h) => {
        var salt = h.substr(6, 16), want = h.substr(22).toLowerCase();
        var pw = CryptoJS.enc.Utf16.parse(String(p));
        var pad = CryptoJS.enc.Latin1.parse("\0".repeat(510 - String(p).length * 2));
        return CryptoJS.SHA256(pw.concat(pad).concat(CryptoJS.enc.Hex.parse(salt))).toString() === want;
      },
      example: { password: "hashcat", hash: "0xc0071808773188715731b69bd4e310b4129913aaf657356c5bdf3c46f249ed42477b5c74af6eaac4d15a" }
    },
    {
      modes: [15e3],
      names: ["filezilla-server"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{128}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _sha512s(String(p) + h.slice(i + 1)) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "bfa9fe5a404faff8b0d200385e26b783a163e475869336029d3ebaccaf02b5f16e4949279e8a33b942ab647f8f19a83dbe89a6d39dd6d8f84812de7d2e556767:6422386434050716105781561510557063652302782465168686858312232148" }
    },
    {
      modes: [32e3],
      names: ["netiq-sspr-md5"],
      isFast: false,
      validate: (h) => /^\$sspr\$0\$\d+\$NONE\$[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.MD5(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$0$100000$NONE$2c8586ef492e3c3dd3795395507dc14f" }
    },
    {
      modes: [32010],
      names: ["netiq-sspr-sha1"],
      isFast: false,
      validate: (h) => /^\$sspr\$1\$\d+\$NONE\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA1(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$1$100000$NONE$b3485214dfa55b038a606a183a560dab7db4ecf1" }
    },
    {
      modes: [32020],
      names: ["netiq-sspr-sha1-salt"],
      isFast: false,
      validate: (h) => /^\$sspr\$2\$\d+\$[^$]+\$[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(q[4] + String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA1(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$2$100000$CxCpGqosk9PkCBcoRFp6DLjjRhVEJKK8$a33283d71c2ecaf4f3017b0a89feca2fc879221c" }
    },
    {
      modes: [32030],
      names: ["netiq-sspr-sha256-salt"],
      isFast: false,
      validate: (h) => /^\$sspr\$3\$\d+\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(q[4] + String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA256(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$3$100000$ODk2NDA5Mjc2NDIwMjMwMjQyMTQ1NzMz$7195873d47c7e3627510862e37fe7cab9bc83b91feecb9864841bf80cff92419" }
    },
    {
      modes: [610],
      names: ["blake2b-512-pass-salt"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeBlake2bVerifier(64, "ps"),
      example: { password: "hashcat", hash: "$BLAKE2$41fcd44c789c735c08b43a871b81c8f617ca43918d38aee6cf8291c58a0b00a03115857425e5ff6f044be7a5bec8536b52d6c9992e21cd43cdca8a55bbf1f5c1:1033" }
    },
    {
      modes: [620],
      names: ["blake2b-512-salt-pass"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{128}:.+$/.test(h),
      verify: makeBlake2bVerifier(64, "sp"),
      example: { password: "hashcat", hash: "$BLAKE2$f0325fdfc3f82a014935442f7adbc069d4636d67276a85b09f8de368f122cf5195a0b780d7fee709fbf1dcd02ddcb581df84508cf1fb0f3393af1be0565491c6:3301" }
    },
    {
      modes: [34800],
      names: ["blake2b-256"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}$/.test(h),
      verify: makeBlake2bVerifier(32, null),
      example: { password: "hashcat", hash: "$BLAKE2$68b163391b3e779dcddba4e6d8fa03e962c29569b430efa5ba014303358557e1" }
    },
    {
      modes: [34810],
      names: ["blake2b-256-pass-salt"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeBlake2bVerifier(32, "ps"),
      example: { password: "hashcat", hash: "$BLAKE2$2b51353016a512b60e587bea98d799c2de243468085ca6cd67f983b2e55bfb67:2353288289" }
    },
    {
      modes: [34820],
      names: ["blake2b-256-salt-pass"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}:.+$/.test(h),
      verify: makeBlake2bVerifier(32, "sp"),
      example: { password: "hashcat", hash: "$BLAKE2$a4cad0b026ed24adf13fb70ec31d35b02751dcb33354e2c9d20ef3f968748501:3601" }
    },
    {
      modes: [6300],
      names: ["aix-smd5"],
      isFast: false,
      validate: (h) => /^\{smd5\}.+\$.+$/.test(h),
      verify: verifyAixSmd5,
      example: { password: "hashcat", hash: "{smd5}17800721$WkGka7tXcrfpUQS6WOQyw/" }
    },
    {
      modes: [32031],
      names: ["adobe-aem-sspr-sha256"],
      isFast: false,
      validate: (h) => /^\$sspr\$3\$\d+\$[^$]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(q[4] + String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA256(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$3$1000$f9bbf1381f481427$a1b45fd7eb190cc7f0bf831698cb777207eebbb4b7ea2abd6fff84be539aae62" }
    },
    {
      modes: [32040],
      names: ["netiq-sspr-sha512-salt"],
      isFast: false,
      validate: (h) => /^\$sspr\$4\$\d+\$[^$]+\$[a-fA-F0-9]{128}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(q[4] + String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA512(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$4$100000$NzYwNjMyNDc2MTQ2OTE4NTUzODAyODE3$0ce2e8b8efa4280e6e003d77cb45d45300dff3960c5c073f68303565fe62fe4ff3ada8cee7d3b87d0457335ab0df73c5c64ee1f71ccf6b8bd43a316ecb42ecd4" }
    },
    {
      modes: [32041],
      names: ["adobe-aem-sspr-sha512"],
      isFast: false,
      validate: (h) => /^\$sspr\$4\$\d+\$[^$]+\$[a-fA-F0-9]{128}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var it = parseInt(q[3], 10);
        var d = CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(q[4] + String(p)));
        for (var i = 1; i < it; i++) d = CryptoJS.SHA512(d);
        return d.toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sspr$4$1000$9ad596c50a5c9acd$d4cdc3c7d227e3cc57a9c9014b1eff1684808ef40191482cd8ae6e9d7b66211a5f04e4b34f494b0513a5f67b9614c5ff16e95e624a60f41b16b90533f305146e" }
    },
    {
      modes: [2400],
      names: ["cisco-pix-md5"],
      isFast: true,
      validate: (h) => /^[.\/0-9A-Za-z]{16}$/.test(h),
      verify: (p, h) => {
        var s = String(p);
        var pad = Math.ceil(s.length / 16) * 16;
        while (s.length < pad) s += "\0";
        return _pixB64(CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1)) === String(h);
      },
      example: { password: "hashcat", hash: "dRRVnUmUHXOTt9nk" }
    },
    {
      modes: [2410],
      names: ["cisco-asa-md5"],
      isFast: true,
      validate: (h) => /^[.\/0-9A-Za-z]{16}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var s = String(p) + h.slice(i + 1);
        var pad = Math.ceil(s.length / 16) * 16;
        while (s.length < pad) s += "\0";
        return _pixB64(CryptoJS.MD5(CryptoJS.enc.Latin1.parse(s)).toString(CryptoJS.enc.Latin1)) === h.slice(0, i);
      },
      example: { password: "hashcat", hash: "YjDBNr.A0AN7DA8s:4684" }
    },
    // ----- non-cryptographic hashes -----
    {
      modes: [18700],
      names: ["java-object-hashcode"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => _nc.javaHashCode(String(p)).toString(16).padStart(8, "0") === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "29937c08" }
    },
    {
      modes: [25700],
      names: ["murmurhash"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var seed = parseInt(q[1], 16) >>> 0;
        return _nc.murmur2(_nc._bytes(String(p)), seed).toString(16).padStart(8, "0") === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "b69e7687:05094309" }
    },
    {
      modes: [27800],
      names: ["murmurhash3"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var seed = parseInt(q[1], 16) >>> 0;
        return _nc.murmur3(_nc._bytes(String(p)), seed).toString(16).padStart(8, "0") === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "23e93f65:00000000" }
    },
    {
      modes: [34200],
      names: ["murmurhash64a"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        return _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), BigInt("0x" + q[1]))) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "ef3014941bf1102d:837163b2348dfae1" }
    },
    {
      modes: [34201],
      names: ["murmurhash64a-zero"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n)) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "73f8142b4326d36a" }
    },
    {
      modes: [34211],
      names: ["murmurhash64a-truncated-zero"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => _nc._hex64(_nc.murmur64a(_nc._bytes(String(p)), 0n)).substring(0, 8) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "73f8142b" }
    },
    // ----- DES / AES-ECB / HMAC-RIPEMD160 / iterated-digest apps -----
    {
      modes: [14e3],
      names: ["des-ecb"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var key = _sb(String(p));
        if (key.length !== 8) return false;
        return _bh(_des.desEncryptBlock(key, _hb(q[1]))) === q[0].toLowerCase();
      },
      example: { password: "hashcat1", hash: "53b325182924b356:1412781058343178" }
    },
    {
      modes: [3e3],
      names: ["lm"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => _bh(_des.lmHashHalf(_sb(String(p).toUpperCase()))) === String(h).toLowerCase(),
      example: { password: "HASHCAT", hash: "299bd128c1101fd6" }
    },
    {
      modes: [16e3],
      names: ["tripcode"],
      isFast: true,
      validate: (h) => /^[.\/0-9A-Za-z]{10}$/.test(h),
      verify: (p, h) => {
        var w = String(p);
        var salt = _tripTr((w + "..").substr(1, 2).replace(/[^.-z]/g, "."));
        return _des.descryptCompute(w, salt).slice(-10) === String(h);
      },
      example: { password: "hashcat", hash: "pfaRCwDe0U" }
    },
    {
      modes: [26401],
      names: ["aes-128-ecb-nokdf"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var k = String(p);
        while (k.length < 16) k += "\0";
        return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 16)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "e7a32f3210455cc044f26117c4612aab:86046627772965328523223752173724" }
    },
    {
      modes: [26402],
      names: ["aes-192-ecb-nokdf"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var k = String(p);
        while (k.length < 24) k += "\0";
        return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 24)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "2995e91b798ef51232a91579edb1d176:49869364034411376791729962721320" }
    },
    {
      modes: [26403],
      names: ["aes-256-ecb-nokdf"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var k = String(p);
        while (k.length < 32) k += "\0";
        return CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(q[1]), CryptoJS.enc.Latin1.parse(k.substring(0, 32)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding }).ciphertext.toString() === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "264a4248c9522cb74d33fe26cb596895:61270210011294880287232432636227" }
    },
    {
      modes: [6050],
      names: ["hmac-ripemd160-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(h.slice(i + 1)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "4f5edca01734e03dd7e735362625a76e6bcb61b2:52355614946067" }
    },
    {
      modes: [6060],
      names: ["hmac-ripemd160-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return CryptoJS.HmacRIPEMD160(CryptoJS.enc.Latin1.parse(String(p)), CryptoJS.enc.Latin1.parse(h.slice(i + 1))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "34d8e55a2ae1e9549a291326ce2f0a8dcdc75c5c:08523202563542341" }
    },
    {
      modes: [19e3],
      names: ["qnx-md5"],
      isFast: true,
      validate: (h) => /^@m@[a-fA-F0-9]{32}@.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("@");
        return _md5s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "@m@75f6f129f9c9e77b6b1b78f791ed764a@8741857532330050" }
    },
    {
      modes: [19100],
      names: ["qnx-sha256"],
      isFast: true,
      validate: (h) => /^@s@[a-fA-F0-9]{64}@.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("@");
        return _sha256s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "@s@0b365cab7e17ee1e7e1a90078501cc1aa85888d6da34e2f5b04f5c614b882a93@5498317092471604" }
    },
    {
      modes: [19200],
      names: ["qnx-sha512"],
      isFast: true,
      validate: (h) => /^@S@[a-fA-F0-9]{128}@.+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("@");
        return _sha512s(q[3] + String(p).repeat(1001)) === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "@S@715df9e94c097805dd1e13c6a40f331d02ce589765a2100ec7435e76b978d5efc364ce10870780622cee003c9951bd92ec1020c924b124cfff7e0fa1f73e3672@2257314490293159" }
    },
    {
      modes: [12600],
      names: ["coldfusion-10"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _sha256s(h.slice(i + 1) + _sha1s(String(p)).toUpperCase()) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "3f3473a071b1fb955544e80c81853ca0f1e4f9ee4ca3bf4d2a8a10b5ef5be1f6:6058321484538505215534207835727413038041028036676832416353152201" }
    },
    {
      modes: [22301],
      names: ["telegram-passcode"],
      isFast: true,
      validate: (h) => /^\$telegram\$0\*[a-fA-F0-9]{64}\*[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("*");
        var salt = CryptoJS.enc.Hex.parse(q[2]).toString(CryptoJS.enc.Latin1);
        return _sha256s(salt + String(p) + salt) === q[1].toLowerCase();
      },
      example: { password: "hashcat", hash: "$telegram$0*518c001aeb3b4ae96c6173be4cebe60a85f67b1e087b045935849e2f815b5e41*25184098058621950709328221838128" }
    },
    {
      modes: [30420],
      names: ["dane-tlsa-sha256"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{56}$/.test(h),
      verify: (p, h) => _sha256s(String(p)).substring(0, 56) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "127e6fbfe24a750e72930c220a8e138275656b8e5d8f48a98c3c92df" }
    },
    {
      modes: [11100],
      names: ["postgresql-cram-md5"],
      isFast: true,
      validate: (h) => /^\$postgres\$[^*]*\*[0-9a-fA-F]{8}\*[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("*");
        var user = q[0].slice(10);
        var salt = CryptoJS.enc.Hex.parse(q[1]).toString(CryptoJS.enc.Latin1);
        return _md5s(_md5s(String(p) + user) + salt) === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "$postgres$postgres*74402844*4e7fabaaf34d780c4a5822d28ee1c83e" }
    },
    {
      modes: [11200],
      names: ["mysql-cram-sha1"],
      isFast: true,
      validate: (h) => /^\$mysqlna\$[0-9a-fA-F]+\*[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var q = String(h).slice(9).split("*");
        var chal = CryptoJS.enc.Hex.parse(q[0]).toString(CryptoJS.enc.Latin1);
        var sp = _sha1raw(String(p)), x = _sha1raw(chal + _sha1raw(sp)), out = "";
        for (var i = 0; i < 20; i++) {
          var b = (sp.charCodeAt(i) ^ x.charCodeAt(i)) & 255, c = b.toString(16);
          out += c.length < 2 ? "0" + c : c;
        }
        return out === q[1].toLowerCase();
      },
      example: { password: "hashcat", hash: "$mysqlna$2576670568531371763643101056213751754328*5e4be686a3149a12847caa9898247dcc05739601" }
    },
    {
      modes: [10200],
      names: ["cram-md5"],
      isFast: true,
      validate: (h) => /^\$cram_md5\$[^$]+\$[^$]+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var chal = CryptoJS.enc.Base64.parse(q[2]).toString(CryptoJS.enc.Latin1);
        var resp = CryptoJS.enc.Base64.parse(q[3]).toString(CryptoJS.enc.Latin1);
        var hex = resp.slice(resp.lastIndexOf(" ") + 1);
        return CryptoJS.HmacMD5(CryptoJS.enc.Latin1.parse(chal), CryptoJS.enc.Latin1.parse(String(p))).toString() === hex.toLowerCase();
      },
      example: { password: "hashcat", hash: "$cram_md5$MTI=$dXNlciBiOGYwNjk5MTE0YjA1Nzg4OTIyM2RmMDg0ZjgyMjQ2Zg==" }
    },
    {
      modes: [12150],
      names: ["apache-shiro1-sha512"],
      isFast: false,
      validate: (h) => /^\$shiro1\$SHA-512\$\d+\$[^$]*\$[^$]+$/.test(h),
      verify: (p, h) => {
        var q = String(h).split("$");
        var iter = parseInt(q[3], 10);
        var d = CryptoJS.SHA512(CryptoJS.enc.Base64.parse(q[4]).concat(CryptoJS.enc.Latin1.parse(String(p))));
        for (var i = 1; i < iter; i++) d = CryptoJS.SHA512(d);
        return d.toString(CryptoJS.enc.Base64) === q[5];
      },
      example: { password: "hashcat", hash: "$shiro1$SHA-512$1024$WobJGSjbUhsMdaILomMOdw==$9uptGJ24vzZCqZI55F77N7xjUxGlVrK5aCmAwIrV1vwDmFM4akE6Hmd23Aj8ANLSUdIEkHLZ6SnoitZbOsoQNQ==" }
    },
    {
      modes: [12300],
      names: ["oracle-t-pbkdf2"],
      isFast: false,
      validate: (h) => /^[A-Fa-f0-9]{160,}$/.test(h),
      verify: (p, h) => {
        var salt = h.slice(128);
        var saltbin = CryptoJS.enc.Hex.parse(salt);
        var key = CryptoJS.PBKDF2(String(p), saltbin.clone().concat(CryptoJS.enc.Latin1.parse("AUTH_PBKDF2_SPEEDY_KEY")), { keySize: 16, iterations: 4096, hasher: CryptoJS.algo.SHA512 });
        return CryptoJS.SHA512(key.clone().concat(saltbin)).toString().toUpperCase() === h.slice(0, 128).toUpperCase();
      },
      example: { password: "hashcat", hash: "8F75FBD166AFDB6D7587DAB89C2F15672AAC031C5B0B5E65C0835FB130555F6FF4E0E5764976755558112246FFF306450C22F6B7746B9E9831ED97B373992F9157436180438417080374881414745255" }
    },
    {
      modes: [10100],
      names: ["siphash"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}:2:4:[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        var r = _nc.siphash24(_nc._bytes(String(p)), _hb(q[3]));
        var hi = Number(r >> 32n & 0xffffffffn) >>> 0, lo = Number(r & 0xffffffffn) >>> 0;
        var sw = (x) => ((x & 255) << 24 | (x & 65280) << 8 | x >>> 8 & 65280 | x >>> 24 & 255) >>> 0;
        return sw(lo).toString(16).padStart(8, "0") + sw(hi).toString(16).padStart(8, "0") === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "583e6f51e52ba296:2:4:47356410265714355482333327356688" }
    },
    {
      modes: [27900],
      names: ["crc32c"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}:[a-fA-F0-9]{8}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        return _nc.crc32c(_nc._bytes(String(p)), parseInt(q[1], 16) >>> 0).toString(16).padStart(8, "0") === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "5e23d60f:00000000" }
    },
    {
      modes: [28e3],
      names: ["crc64jones"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => {
        var q = String(h).split(":");
        return _nc._hex64(_nc.crc64jones(_nc._bytes(String(p)), BigInt("0x" + q[1]))) === q[0].toLowerCase();
      },
      example: { password: "hashcat", hash: "65c1f848fe38cce6:4260950400318054" }
    },
    {
      modes: [31e3],
      names: ["blake2s-256"],
      isFast: true,
      validate: (h) => /^\$BLAKE2\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => _bh(_blake2s.blake2s(_sb(String(p)), 32)) === h.slice(8).toLowerCase(),
      example: { password: "hashcat", hash: "$BLAKE2$2c719b484789ad5f6fc1739012182169b25484af156adc91d4f64f72400e574a" }
    },
    {
      modes: [33300],
      names: ["hmac-blake2s-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{64}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _bh(_blake2s.hmacBlake2s(_sb(String(p)), _sb(h.slice(i + 1)))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "0d541ae24d30aff2627c4d1a910f766088a64809edb46a05d29649a9b944da6c:1234" }
    },
    {
      modes: [33600],
      names: ["ripemd-320"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{80}$/.test(h),
      verify: (p, h) => _bh(_rmd320.ripemd320(_sb(String(p)))) === String(h).toLowerCase(),
      example: { password: "hashcat", hash: "8339009b816d4e4c2a6be3c6e1daac6aca69a7670ecdc583adfca0db17cc8f08ce35d6c759b038ab" }
    },
    {
      modes: [33650],
      names: ["hmac-ripemd320-pass"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{80}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _bh(_rmd320.hmacRipemd320(_sb(String(p)), _sb(h.slice(i + 1)))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "e740440e7bd65056a90f1aa4eb00e00308a9f1788866b4eacbd46cfc8032301d4e5b3a9d179be044:95454599772294521162217" }
    },
    {
      modes: [33660],
      names: ["hmac-ripemd320-salt"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{80}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return _bh(_rmd320.hmacRipemd320(_sb(h.slice(i + 1)), _sb(String(p)))) === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "345136b13b3a6e52901e2a414efa0cf5fca2fecf8b03279656d3b0f42c30df3006c5ad186494996b:2436077107013929602" }
    },
    {
      modes: [1100],
      names: ["dcc", "ms-cache"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var inner = CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p)));
        return CryptoJS.MD4(inner.clone().concat(CryptoJS.enc.Utf16LE.parse(h.slice(i + 1).toLowerCase()))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "c896b3c6963e03c86ade3a38370bbb09:54161084332" }
    },
    {
      modes: [2100],
      names: ["dcc2", "ms-cache-2"],
      isFast: false,
      validate: (h) => /^\$DCC2\$\d+#[^#]*#[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var m = /^\$DCC2\$(\d+)#([^#]*)#([a-fA-F0-9]{32})$/.exec(h);
        if (!m) return false;
        var saltbin = CryptoJS.enc.Utf16LE.parse(m[2].toLowerCase());
        var dcc = CryptoJS.MD4(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).clone().concat(saltbin));
        return CryptoJS.PBKDF2(dcc, saltbin, { keySize: 4, iterations: parseInt(m[1], 10), hasher: CryptoJS.algo.SHA1 }).toString() === m[3].toLowerCase();
      },
      example: { password: "hashcat", hash: "$DCC2$10240#6848#e2829c8af2232fa53797e2f0e35e4626" }
    },
    {
      modes: [7100],
      names: ["macos-pbkdf2-sha512"],
      isFast: false,
      validate: (h) => /^\$ml\$\d+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        return CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(q[3]), { keySize: 16, iterations: parseInt(q[2], 10), hasher: CryptoJS.algo.SHA512 }).toString() === q[4].toLowerCase();
      },
      example: { password: "hashcat", hash: "$ml$1024$2484380731132131624506271467162123576077004878124365203837706482$89a3a979ee186c0c837ca4551f32e951e6564c7ac6798aa35baf4427fbf6bd1d630642c12cfd5c236c7b0104782237db95e895f7c0e372cd81d58f0448daf958" }
    },
    {
      modes: [7200],
      names: ["grub2-pbkdf2-sha512"],
      isFast: false,
      validate: (h) => /^grub\.pbkdf2\.sha512\.\d+\.[0-9a-fA-F]+\.[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var q = h.split(".");
        return CryptoJS.PBKDF2(String(p), CryptoJS.enc.Hex.parse(q[4]), { keySize: 16, iterations: parseInt(q[3], 10), hasher: CryptoJS.algo.SHA512 }).toString() === q[5].toLowerCase();
      },
      example: { password: "hashcat", hash: "grub.pbkdf2.sha512.1024.03510507805003756325721848020561235456073188241051876082416068104377357018503082587026352628170170411053726157658716047762755750.aac26b18c2b0c44bcf56514d46aabd52eea097d9c95122722087829982e9dd957b2b641cb1e015d4df16a84d0571e96cf6d3de6361431bdeed4ddb0940f2425b" }
    },
    {
      modes: [7300],
      names: ["ipmi2-rakp-sha1"],
      isFast: true,
      validate: (h) => /^[0-9a-fA-F]+:[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var i = h.lastIndexOf(":");
        return CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(h.slice(0, i)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(i + 1).toLowerCase();
      },
      example: { password: "hashcat", hash: "3437343735333336383831353232323433383333303236303337333338363232303135383237333638363532373231343030313131333838323734373138363632343133333335353030353633373533333133313530363533303738343334313330303630343633333237373037383537333630303233303830303437323838333237313438363238343434383831363634323431333430383735323038:f4b376e25868751fc0264f573ff1fe50b65ce5a2" }
    },
    {
      modes: [7350],
      names: ["ipmi2-rakp-md5"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{32}:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(h.slice(i + 1)), CryptoJS.enc.Latin1.parse(String(p))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "admin", hash: "08b017f3628b9835c748521e412429c9:f3450000df540000cdd981b0b3441be8774a61e69321291891a29a0c5fdac3f06194bd2c29fa5246000000000000000000000000000000001400" }
    },
    {
      modes: [5400],
      names: ["ike-psk-sha1"],
      isFast: true,
      validate: (h) => /^([0-9a-fA-F]+:){8}[a-fA-F0-9]{40}$/.test(h),
      verify: (p, h) => {
        var q = h.split(":");
        if (q.length < 9) return false;
        var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(q[6] + q[7]), CryptoJS.enc.Latin1.parse(String(p)));
        return CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(q[0] + q[1] + q[2] + q[3] + q[4] + q[5]), d1).toString() === q[8].toLowerCase();
      },
      example: { password: "hashcat", hash: "266b43c54636c062b6696b71f24b30999c98bd4c3ba57e2de56a7ae50bb17ebcbca1abcd33e9ad466d4df6e6f2a407600f0c5a983f79d493b0a3694080a81143d4bac7a8b7b008ae5364a04688b3cfae44824885ca96ade1e395936567ecad519b502c3a786c72847f79c67b777feb8ba4f747303eb985709e92b3a5634f6513:60f861c6209c9c996ac0dcb49d6f6809faaaf0e8eb8041fe603a918170a801e94ab8ab10c5906d850f4282c0668029fa69dbc8576f7d86633dc2b21f0d79aa06342b02a4d2732841cd3266b84a7eb49ac489b307ba55562a17741142bac7712025f0a8cad59b11f19d9b756ce998176fd6b063df556957b257b3645549a138c2:f4dd079ed2b60e77:f1f8da1f38f76923:fd862602549f6949b33870f186d96cb8926a19d78442c02af823460740be719eba41a79388aeefb072e1ec7cb46b2f0b72e21fb30bd3a6568d2b041af7f9dc0c9cce27ed577e5aabb9ab6c405f1c4b189adbee8c9fb6abf4788b63a3ae05a02c192187b9d7246efe5e46db9b01bf8f4be05f7599ae52bf137743e41d90dceb85bd6ae07397dcc168bbc904adfebb08e6bc67e653edeee97a7e4ab9dab5e63fec:56e3f0d49ea70514:e754055008febe970053d795d26bfe609f42eda8:0c3283efd6396e7a2ecb008e1933fccb694a4ac0:8f79167724f4bdb2d76ee5d5e502b665e3445ea6" }
    },
    {
      modes: [14100],
      names: ["3des-ede-ecb"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{16}:[a-fA-F0-9]{16}$/.test(h),
      verify: (p, h) => {
        var q = h.split(":");
        var w = String(p);
        if (w.length !== 24) return false;
        var ct = _des.desEncryptBlock(_sb(w.slice(0, 8)), _hb(q[1]));
        ct = _des.desDecryptBlock(_sb(w.slice(8, 16)), ct);
        ct = _des.desEncryptBlock(_sb(w.slice(16, 24)), ct);
        return _bh(ct) === q[0].toLowerCase();
      },
      example: { password: "hashcat1hashcat1hashcat1", hash: "4c29eea59d8db1e7:7428288455525516" }
    },
    {
      modes: [33500],
      names: ["rc4-40-dropn"],
      isFast: true,
      validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4]));
        var off = parseInt(q[5], 10), known = _hb(q[6]);
        for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false;
        return true;
      },
      example: { password: "hashc", hash: "$rc4$40$0$e9a41693b759cf88929ca31203694f$0$48656c6c6f" }
    },
    {
      modes: [33501],
      names: ["rc4-72-dropn"],
      isFast: true,
      validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4]));
        var off = parseInt(q[5], 10), known = _hb(q[6]);
        for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false;
        return true;
      },
      example: { password: "hashcat12", hash: "$rc4$72$0$90eaa8d71c$0$48656c6c6f" }
    },
    {
      modes: [33502],
      names: ["rc4-104-dropn"],
      isFast: true,
      validate: (h) => /^\$rc4\$\d+\$\d+\$[a-fA-F0-9]+\$\d+\$[a-fA-F0-9]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var dec = _nc.rc4drop(_sb(String(p)), parseInt(q[3], 10), _hb(q[4]));
        var off = parseInt(q[5], 10), known = _hb(q[6]);
        for (var i = 0; i < known.length; i++) if (dec[off + i] !== known[i]) return false;
        return true;
      },
      example: { password: "hashcat123456", hash: "$rc4$104$0$a04245c3d7$0$48656c6c6f" }
    },
    {
      modes: [21500],
      names: ["solarwinds-orion"],
      isFast: false,
      validate: (h) => /^\$solarwinds\$0\$[^$]*\$[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var u = q[3];
        var cs = u.length >= 8 ? u.substring(0, 8) : (u + "1244352345234").substring(0, 8);
        var key = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Latin1.parse(cs), { keySize: 256, iterations: 1e3, hasher: CryptoJS.algo.SHA1 });
        return CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64) === q[4];
      },
      example: { password: "hashcat", hash: "$solarwinds$0$admin$fj4EBQewCQUZ7IYHl0qL8uj9kQSBb3m7N4u0crkKK0Uj9rbbAnSrBZMXO7oWx9KqL3sCzwncvPZ9hyDV9QCFTg==" }
    },
    {
      modes: [21501],
      names: ["solarwinds-orion-v2"],
      isFast: false,
      validate: (h) => /^\$solarwinds\$1\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var key = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Base64.parse(q[3]), { keySize: 256, iterations: 1e3, hasher: CryptoJS.algo.SHA1 });
        return CryptoJS.SHA512(key).toString(CryptoJS.enc.Base64) === q[4];
      },
      example: { password: "hashcat", hash: "$solarwinds$1$3pHkk55NTYpAeV3EJjcAww==$N4Ii2PxXX/bTZZwslQLIKrp0wvfZ5aN9hpyiR896ozJMJTPO1Q7BK1Eht8Vhl4kXq/42Vn2zp3qYeAkRuqsuEw==" }
    },
    {
      modes: [22400],
      names: ["aescrypt-sha256"],
      isFast: false,
      validate: (h) => /^\$aescrypt\$1\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[0-9a-fA-F]+\*[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = h.split("*");
        var key = CryptoJS.enc.Hex.parse(q[1]).concat(CryptoJS.enc.Latin1.parse("\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"));
        var w = CryptoJS.enc.Utf16LE.parse(String(p));
        for (var i = 0; i < 8192; i++) key = CryptoJS.SHA256(key.clone().concat(w));
        return CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(q[2]).concat(CryptoJS.enc.Hex.parse(q[3])), key).toString() === q[4].toLowerCase();
      },
      example: { password: "hashcat", hash: "$aescrypt$1*efc648908ca7ec727f37f3316dfd885c*eff5c87a35545406a57b56de57bd0554*3a66401271aec08cbd10cf2070332214093a33f36bd0dced4a4bb09fab817184*6a3c49fea0cafb19190dc4bdadb787e73b1df244c51780beef912598bd3bdf7e" }
    },
    {
      modes: [23400],
      names: ["bitwarden"],
      isFast: false,
      validate: (h) => /^\$bitwarden\$2\*\d+\*\d+\*[A-Za-z0-9+/=]+\*[A-Za-z0-9+/=]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("*");
        var d1 = CryptoJS.PBKDF2(String(p), CryptoJS.enc.Base64.parse(q[3]), { keySize: 8, iterations: parseInt(q[1], 10), hasher: CryptoJS.algo.SHA256 });
        var d2 = CryptoJS.PBKDF2(d1, CryptoJS.enc.Latin1.parse(String(p)), { keySize: 8, iterations: parseInt(q[2], 10), hasher: CryptoJS.algo.SHA256 });
        return d2.toString(CryptoJS.enc.Base64) === q[4];
      },
      example: { password: "hashcat", hash: "$bitwarden$2*100000*2*bm9yZXBseUBoYXNoY2F0Lm5ldA==*+v5rHxYydSRUDlan+4pSoiYQwAgEhdmivlb+exQX+fg=" }
    },
    {
      modes: [31300],
      names: ["ms-sntp"],
      isFast: true,
      validate: (h) => /^\$sntp-ms\$[a-fA-F0-9]{32}\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        return CryptoJS.MD5(CryptoJS.MD4(CryptoJS.enc.Utf16LE.parse(String(p))).concat(CryptoJS.enc.Hex.parse(q[3]))).toString() === q[2].toLowerCase();
      },
      example: { password: "hashcat", hash: "$sntp-ms$cfc7023381cf6bb474cdcbeb0a67bdb3$907733697536811342962140955567108526489624716566696971338784438986103976327367763739445744705380" }
    },
    {
      modes: [13500],
      names: ["peoplesoft-ps-token"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{40}:[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        return CryptoJS.SHA1(CryptoJS.enc.Hex.parse(h.slice(i + 1)).concat(CryptoJS.enc.Utf16LE.parse(String(p)))).toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "24eea51b53d02b4c5ff99bcb05a6847fdb2d9308:4f10a0de76e242040c28e9d3dd15c903343489c79765f9118c098c266b9ff505c95bd75bbe406ff3404849eea73930ad17937c0ba6fc3e7bb6d37362941318938b8af96d1292a310b3fd29a67e411ecb10d30247c99183a16951b3859054d4eba9dcd50709c7b21dee836d7ed195cc6b33317aeb557cc56392dc551faa8d5a0fb42212" }
    },
    {
      modes: [29100],
      names: ["flask-session-cookie"],
      isFast: true,
      validate: (h) => /^[^.]+\.[^.]+\.[A-Za-z0-9_-]+$/.test(h),
      verify: (p, h) => {
        var i = h.lastIndexOf(".");
        var salt = h.slice(0, i), dg = h.slice(i + 1);
        var d1 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse("cookie-session"), CryptoJS.enc.Latin1.parse(String(p)));
        var d2 = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(salt), d1);
        return d2.toString(CryptoJS.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") === dg;
      },
      example: { password: "hashcat", hash: "eyJ1c2VybmFtZSI6ImFkbWluIn0.YjdgRQ.1OTlf1PD0H9wXsu_qS0aywAJVD8" }
    },
    {
      modes: [28700],
      names: ["aws-sig-v4"],
      isFast: true,
      validate: (h) => /^\$AWS-Sig-v4\$0\$[^$]+\$[^$]+\$[^$]+\$[0-9a-fA-F]+\$[a-fA-F0-9]{64}$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var longdate = q[3], region = q[4], service = q[5], canonical = q[6];
        var date = longdate.substring(0, 8), L = CryptoJS.enc.Latin1;
        var kDate = CryptoJS.HmacSHA256(L.parse(date), L.parse("AWS4" + String(p)));
        var kRegion = CryptoJS.HmacSHA256(L.parse(region), kDate);
        var kService = CryptoJS.HmacSHA256(L.parse(service), kRegion);
        var kSigning = CryptoJS.HmacSHA256(L.parse("aws4_request"), kService);
        var sts = "AWS4-HMAC-SHA256\n" + longdate + "\n" + date + "/" + region + "/" + service + "/aws4_request\n" + canonical;
        return CryptoJS.HmacSHA256(L.parse(sts), kSigning).toString() === q[7].toLowerCase();
      },
      example: { password: "hashcat", hash: "$AWS-Sig-v4$0$20220221T000000Z$us-east-1$s3$421ab6e4af9f49fa30fa9c253fcfeb2ce91668e139e6b23303c5f75b04f8a3c4$3755ed2bc1b2346e003ccaa7d02ae8b73c72bcbe9f452ccf066c78504d786bbb" }
    },
    {
      modes: [5800],
      names: ["samsung-android-pin"],
      isFast: false,
      validate: (h) => /^[a-fA-F0-9]{40}:.+$/.test(h),
      verify: (p, h) => {
        var i = h.indexOf(":");
        var salt = h.slice(i + 1), L = CryptoJS.enc.Latin1;
        var d = CryptoJS.SHA1(L.parse("0" + String(p) + salt));
        for (var k = 1; k < 1024; k++) d = CryptoJS.SHA1(L.parse(d.toString(L) + (k + String(p) + salt)));
        return d.toString() === h.slice(0, i).toLowerCase();
      },
      example: { password: "hashcat", hash: "3edde1eb9e6679ccbc1ff3c417e8a475a2d2e279:7724368582277760" }
    },
    {
      modes: [15400],
      names: ["chacha20"],
      isFast: true,
      validate: (h) => /^\$chacha20\$\*[0-9a-fA-F]{16}\*\d+\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{16}\*[0-9a-fA-F]{16}$/.test(h),
      verify: (p, h) => {
        var q = h.split("*");
        var offset = parseInt(q[2], 10), pt = _hb(q[4]), ct = _hb(q[5]);
        var key = _sb(String(p));
        if (key.length !== 32) return false;
        var ks = _nc.chacha20ks(key, _hb(q[3]), _hb(q[1]), offset + 8);
        for (var i = 0; i < 8; i++) if ((ks[offset + i] ^ pt[i]) !== ct[i]) return false;
        return true;
      },
      example: { password: "hashcat_hashcat_hashcat_hashcat_", hash: "$chacha20$*0400000000000003*16*0200000000000001*5152535455565758*6b05fe554b0bc3b3" }
    },
    {
      modes: [8300],
      names: ["dnssec-nsec3"],
      isFast: true,
      validate: (h) => /^[0-9a-v]{32}:[^:]*:[0-9a-fA-F]*:\d+$/.test(h),
      verify: (p, h) => {
        var q = h.split(":");
        var domain = q[1], saltHex = q[2], iter = parseInt(q[3], 10);
        var name = (String(p) + domain).toLowerCase();
        var saltWA = CryptoJS.enc.Hex.parse(saltHex);
        var hh = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(_bh(_nc.dnsWire(name))).concat(saltWA));
        for (var i = 0; i < iter; i++) hh = CryptoJS.SHA1(hh.clone().concat(saltWA));
        return _nc.base32hex(_hb(hh.toString())) === q[0];
      },
      example: { password: "hashcat", hash: "pi6a89u8tca930h8mvolklmesefc5gmn:.fnmlbsik.net:35537886:1" }
    },
    {
      modes: [14900],
      names: ["skip32"],
      isFast: true,
      validate: (h) => /^[a-fA-F0-9]{8}:[0-9a-fA-F]{8}$/.test(h),
      verify: (p, h) => {
        var q = h.split(":");
        var key = _sb(String(p));
        if (key.length !== 10) return false;
        return _bh(_nc.skip32(key, _hb(q[1]), true)) === q[0].toLowerCase();
      },
      example: { password: "hashcat!!!", hash: "7090b6b9:04223875" }
    },
    {
      modes: [16100],
      names: ["tacacs-plus"],
      isFast: true,
      validate: (h) => /^\$tacacs-plus\$0\$[0-9a-fA-F]+\$[0-9a-fA-F]+\$[0-9a-fA-F]+$/.test(h),
      verify: (p, h) => {
        var q = h.split("$");
        var kb = _hb(CryptoJS.MD5(CryptoJS.enc.Hex.parse(q[3]).concat(CryptoJS.enc.Latin1.parse(String(p))).concat(CryptoJS.enc.Hex.parse(q[5]))).toString());
        var eb = _hb(q[4]);
        if (eb.length < 6) return false;
        var st = eb[0] ^ kb[0], fl = eb[1] ^ kb[1], sml = (eb[2] ^ kb[2]) << 8 | eb[3] ^ kb[3], dl = (eb[4] ^ kb[4]) << 8 | eb[5] ^ kb[5];
        return (st >= 1 && st <= 7 || st === 33) && (fl === 0 || fl === 1) && 6 + sml + dl === eb.length;
      },
      example: { password: "hashcat", hash: "$tacacs-plus$0$5fde8e68$4e13e8fb33df$c006" }
    },
    {
      modes: [5300],
      names: ["ike-psk-md5"],
      isFast: true,
      validate: (h) => /^([0-9a-fA-F]+:){8}[a-fA-F0-9]{32}$/.test(h),
      verify: (p, h) => {
        var q = h.split(":");
        if (q.length < 9) return false;
        var d1 = CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(q[6] + q[7]), CryptoJS.enc.Latin1.parse(String(p)));
        return CryptoJS.HmacMD5(CryptoJS.enc.Hex.parse(q[0] + q[1] + q[2] + q[3] + q[4] + q[5]), d1).toString() === q[8].toLowerCase();
      },
      example: { password: "hashcat", hash: "50503326cac6e4bd892b8257805b5a59a285f464ad3f63dc01bd0335f8341ef52e00be0b8cb205422a3788f021e4e6e8ccbe34784bc85abe42f62545bac64888426a2f1264fa28cf384ff00b14cfa5eff562dda4fad2a31fd7a6715218cff959916deed856feea5bee2e773241c5fbebf202958f0ce0c432955e0f1f6d1259da:688a7bfa8d5819630a970ed6d27018021a15fbb3e2fdcc36ce9b563d8ff95f510c4b3236c014d1cde9c2f1a999b121bc3ab1bc8049c8ac1e8c167a84f53c867492723eb01ab4b38074b38f4297d6fea8f44e01ea828fce33c433430938b1551f60673ce8088e7d2f41e3b49315344046fefee1e3860064331417562761db3ba4:c66606d691eaade4:8bdc88a2cdb4a1cf:c3b13137fae9f66684d98709939e5c3454ee31a98c80a1c76427d805b5dea866eff045515e8fb42dd259b9448caba9d937f4b3b75ec1b092a92232b4c8c1e70a60a52076e907f887b731d0f66e19e09b535238169c74c04a4b393f9b815c54eef4558cd8a22c9018bb4f24ee6db0e32979f9a353361cdba948f9027551ee40b1c96ba81c28aa3e1a0fac105dc469efa83f6d3ee281b945c6fa8b4677bac26dda:53f757c5b08afad6:aa02d9289e1702e5d7ed1e4ebf35ab31c2688e00:aab8580015cf545ac0b7291d15a4f2c79e06defd:944a0df3939f3bd281c9d05fbc0e3d30" }
    }
  ];
  var _typeByName = /* @__PURE__ */ new Map();
  var _typeByMode = /* @__PURE__ */ new Map();
  for (const _entry of HASH_REGISTRY) {
    for (const _n of _entry.names) _typeByName.set(String(_n).toLowerCase(), _entry);
    for (const _m of _entry.modes || []) _typeByMode.set(String(_m), _entry);
  }
  function resolveHashType(type) {
    if (type === null || type === void 0) return null;
    const key = String(type).trim().toLowerCase();
    return _typeByName.get(key) || _typeByMode.get(key) || null;
  }
  function verifyHash(password, hash, hashType) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    return entry.verify(password, hash);
  }
  function generateHash(hashType, password, params) {
    const entry = resolveHashType(hashType);
    const mode = entry ? entry.modes[0] : parseInt(hashType, 10);
    return _gen.generate(mode, password, params || {});
  }
  var generatableModes = Object.keys(_gen.G).map(function(k) {
    return parseInt(k, 10);
  });
  var modeInfo = HASH_REGISTRY.reduce(function(acc, e) {
    e.modes.forEach(function(m) {
      acc[m] = e.names[0];
    });
    return acc;
  }, {});
  function isValidHash(hash, hashType) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    return entry.validate(hash);
  }
  function isFast(hashType) {
    const entry = resolveHashType(hashType);
    return entry ? !!entry.isFast : false;
  }
  function measureSpeed(hashType, durationMs) {
    const entry = resolveHashType(hashType);
    if (!entry) throw new Error(`Unsupported hash type: ${hashType}`);
    const password = entry.example.password;
    const hash = entry.example.hash;
    const duration = typeof durationMs === "number" && durationMs > 0 ? durationMs : 5e3;
    const startTime = Date.now();
    let count = 0;
    while (Date.now() - startTime < duration) {
      entry.verify(password, hash);
      count++;
    }
    return Math.floor(count / (duration / 1e3));
  }
  function getExample(hashType) {
    const entry = resolveHashType(hashType);
    return entry ? { password: entry.example.password, hash: entry.example.hash } : null;
  }
  function getPossibleHashTypes(hash) {
    const possibleHashTypes = [];
    for (const entry of HASH_REGISTRY) {
      try {
        if (entry.validate(hash)) possibleHashTypes.push(entry.names[0]);
      } catch (_) {
      }
    }
    return possibleHashTypes;
  }
  var availableHashTypes = HASH_REGISTRY.map((entry) => entry.names[0]);
  var extract = _extract.extract;
  var detectFileType = _extract.detect;
  var hashTypes = HASH_REGISTRY.map(function(entry) {
    return {
      mode: entry.modes[0],
      modes: entry.modes.slice(),
      name: entry.names[0],
      names: entry.names.slice(),
      fast: !!entry.isFast,
      generatable: entry.modes.some(function(m) {
        return _gen.G[m] != null;
      })
    };
  });
  var parseMask = _attack.parseMask;
  var maskKeyspace = _attack.maskKeyspace;
  var bruteforceKeyspace = _attack.bruteforceKeyspace;
  var maskCandidates = _attack.maskCandidates;
  var bruteforceCandidates = _attack.bruteforceCandidates;
  var keyspace = _attack.keyspace;
  var candidateAt = _attack.candidateAt;
  var attackCandidates = _attack.candidates;
  var partition = _attack.partition;
  function runAttack(candidateIter, hash, type, opts) {
    opts = opts || {};
    const every = typeof opts.progressEvery === "number" && opts.progressEvery > 0 ? opts.progressEvery : 5e4;
    let n = 0;
    for (const cand of candidateIter) {
      n++;
      if (verifyHash(cand, hash, type)) return cand;
      if (opts.onProgress && n % every === 0) opts.onProgress(n, cand);
    }
    return null;
  }
  function crackMask(hash, type, mask, customs, opts) {
    return runAttack(_attack.candidates({ type: "mask", mask, customs }, opts), hash, type, opts);
  }
  function crackBruteforce(hash, type, charset, min, max, opts) {
    return runAttack(_attack.candidates({ type: "bruteforce", charset, min, max }, opts), hash, type, opts);
  }
  function crackWordlist(hash, type, words, opts) {
    return runAttack(_attack.candidates({ type: "wordlist", words: words || [] }, opts), hash, type, opts);
  }
  function crackRules(hash, type, words, rules, apply, opts) {
    if (typeof apply !== "function") throw new Error("crackRules: an apply(word, rule) => string function is required (e.g. hashcat-rules-js applyRule)");
    return runAttack(_attack.candidates({ type: "rules", words: words || [], rules: rules || [], apply }, opts), hash, type, opts);
  }
  return __toCommonJS(crack_js_exports);
})();
/*! Bundled license information:

crypto-js/ripemd160.js:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)

crypto-js/mode-ctr-gladman.js:
  (** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   *)
*/
if(typeof module!=='undefined')module.exports=crack;
