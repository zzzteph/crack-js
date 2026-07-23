/*! hashcat-rules-js v1.2.4 (github.com/zzzteph/hashcat-rules-js) — vendored browser build for the crack-js demo page (index.html). Exposes global hashcatRules.applyRule(password, rule). Not a crack-js dependency. Rebuild: npm i -D hashcat-rules-js && npx esbuild node_modules/hashcat-rules-js/dist/hashcat-rules.js --bundle --format=iife --global-name=hashcatRules --outfile=dist/hashcat-rules.js */
"use strict";
var hashcatRules = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/hashcat-rules-js/dist/hashcat-rules.js
  var require_hashcat_rules = __commonJS({
    "node_modules/hashcat-rules-js/dist/hashcat-rules.js"(exports) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      function r(e) {
        return typeof e == "number" ? e : e >= "0" && e <= "9" ? Number(e) : Number(e.toUpperCase().charCodeAt(0) - 55);
      }
      function b(e) {
        return e.toLowerCase();
      }
      function k(e) {
        return e.toUpperCase();
      }
      function A(e) {
        return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
      }
      function p(e) {
        return e.charAt(0).toLowerCase() + e.slice(1).toUpperCase();
      }
      function C(e, a) {
        if (a = r(a), e.charAt(a) === e.charAt(a).toUpperCase()) return e.slice(0, a) + e.charAt(a).toLowerCase() + e.slice(a + 1);
        if (e.charAt(a) === e.charAt(a).toLowerCase()) return e.slice(0, a) + e.charAt(a).toUpperCase() + e.slice(a + 1);
      }
      function w(e) {
        let a = "";
        for (let c of e) c === c.toLowerCase() ? a += c.toUpperCase() : a += c.toLowerCase();
        return a;
      }
      function o(e) {
        return e.split("").reverse().join("");
      }
      function L(e) {
        return e + e;
      }
      function R(e, a) {
        var c = e;
        a = r(a);
        for (var t = 0; t < a; t++) c += e;
        return c;
      }
      function l(e, a) {
        var c = "";
        a = r(a);
        for (var t = 0; t < a; t++) c += e;
        return c;
      }
      function v(e) {
        return e + o(e);
      }
      function N(e) {
        return e.slice(1) + e.charAt(0);
      }
      function S(e) {
        return e.charAt(e.length - 1) + e.slice(0, e.length - 1);
      }
      function d(e, a) {
        return e + a;
      }
      function m(e, a) {
        return a + e;
      }
      function D(e) {
        return e.slice(1);
      }
      function U(e) {
        return e.slice(0, e.length - 1);
      }
      function j(e, a) {
        return a = r(a), e.slice(0, a) + e.slice(a + 1);
      }
      function n(e, a, c) {
        return a = r(a), c = r(c), e.slice(a, a + c);
      }
      function I(e, a, c) {
        return a = r(a), c = r(c), a + c > e.length ? e : e.slice(0, a) + e.slice(a + c);
      }
      function T(e, a, c) {
        return a = r(a), a > e.length ? e : e.slice(0, a) + c + e.slice(a);
      }
      function y(e, a, c) {
        return a = r(a), a >= e.length ? e : e.slice(0, a) + c + e.slice(a + 1);
      }
      function z(e, a) {
        return a = r(a), e.slice(0, a);
      }
      function u(e, a, c) {
        return e.replaceAll(a, c);
      }
      function P(e, a) {
        return u(e, a, "");
      }
      function x(e, a) {
        return a = r(a), l(e.charAt(0), a) + e;
      }
      function O(e, a) {
        return a = r(a), e.length === 0 ? e : e + l(e.charAt(e.length - 1), a);
      }
      function B(e) {
        for (var a = "", c = e.length, t = 0; t < c; t++) a += e.charAt(t) + e.charAt(t);
        return a;
      }
      function F(e) {
        return e.length < 2 ? e : e[1] + e[0] + e.slice(2);
      }
      function E(e) {
        return e.length < 2 ? e : e.slice(0, -2) + e[e.length - 1] + e[e.length - 2];
      }
      function M(e, a, c) {
        if (a = r(a), c = r(c), a < 0 || c < 0 || a >= e.length || c >= e.length || a === c) return e;
        let t = e.split("");
        return [t[a], t[c]] = [t[c], t[a]], t.join("");
      }
      function W(e, a) {
        if (a = r(a), a < 0 || a >= e.length) return e;
        let c = e.split(""), t = c[a].charCodeAt(0);
        return c[a] = String.fromCharCode(t << 1), c.join("");
      }
      function q(e, a) {
        if (a = r(a), a < 0 || a >= e.length) return e;
        let c = e.split(""), t = c[a].charCodeAt(0);
        return c[a] = String.fromCharCode(t >> 1), c.join("");
      }
      function K(e, a) {
        if (a = r(a), a < 0 || a >= e.length) return e;
        let c = e.split("");
        return c[a] = String.fromCharCode(c[a].charCodeAt(0) + 1), c.join("");
      }
      function Y(e, a) {
        if (a = r(a), a < 0 || a >= e.length) return e;
        let c = e.split("");
        return c[a] = String.fromCharCode(c[a].charCodeAt(0) - 1), c.join("");
      }
      function Z(e, a) {
        if (a = r(a), a < 0 || a >= e.length - 1) return e;
        let c = e.split("");
        return c[a] = c[a + 1], c.join("");
      }
      function $(e, a) {
        if (a = r(a), a < 0 || a >= e.length) return e;
        let c = e.split("");
        return c[a] = c[a - 1], c.join("");
      }
      function G(e, a) {
        if (a = r(a), a <= 0 || a > e.length) return e;
        let c = e.slice(-a);
        return e.slice(0, -a) + c + c;
      }
      function H(e, a) {
        if (a = r(a), a <= 0 || a > e.length) return e;
        let c = e.slice(0, a);
        return c + c + e.slice(a);
      }
      function J(e, a) {
        e = e.toLowerCase();
        let c = "", t = true;
        for (let h = 0; h < e.length; h++) {
          let f = e[h];
          t && /[a-z]/i.test(f) ? (c += f.toUpperCase(), t = false) : c += f, f === a && (t = true);
        }
        return c;
      }
      function Q(e) {
        return e = e.toLowerCase(), e.split(" ").map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(" ");
      }
      function V(e, a) {
        if (a.trim().charAt(0) === "#" || a.trim().length === 0) return false;
        for (var c = 0; c < a.length; ) switch (a.charAt(c)) {
          case ":":
            e = e, c++;
            break;
          case "l":
            e = b(e), c++;
            break;
          case "u":
            e = k(e), c++;
            break;
          case "c":
            e = A(e), c++;
            break;
          case "C":
            e = p(e), c++;
            break;
          case "t":
            e = w(e), c++;
            break;
          case "T":
            if (c + 1 >= a.length) break;
            e = C(e, a.charAt(c + 1)), c += 2;
            break;
          case "r":
            e = o(e), c++;
            break;
          case "d":
            e = L(e), c++;
            break;
          case "p":
            if (c + 1 >= a.length) break;
            e = R(e, a.charAt(c + 1)), c += 2;
            break;
          case "f":
            e = v(e), c++;
            break;
          case "{":
            e = N(e), c++;
            break;
          case "}":
            e = S(e), c++;
            break;
          case "$":
            if (c + 1 >= a.length) break;
            e = d(e, a.charAt(c + 1)), c += 2;
            break;
          case "^":
            if (c + 1 >= a.length) break;
            e = m(e, a.charAt(c + 1)), c += 2;
            break;
          case "[":
            e = D(e), c++;
            break;
          case "]":
            e = U(e), c++;
            break;
          case "D":
            if (c + 1 >= a.length) break;
            e = j(e, a.charAt(c + 1)), c += 2;
            break;
          case "x":
            if (c + 2 >= a.length) break;
            e = n(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "O":
            if (c + 2 >= a.length) break;
            e = I(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "i":
            if (c + 2 >= a.length) break;
            e = T(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "o":
            if (c + 2 >= a.length) break;
            e = y(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "'":
            if (c + 1 >= a.length) break;
            e = z(e, a.charAt(c + 1)), c += 2;
            break;
          case "s":
            if (c + 2 >= a.length) break;
            e = u(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "@":
            if (c + 1 >= a.length) break;
            e = P(e, a.charAt(c + 1)), c += 2;
            break;
          case "z":
            if (c + 1 >= a.length) break;
            e = x(e, a.charAt(c + 1)), c += 2;
            break;
          case "Z":
            if (c + 1 >= a.length) break;
            e = O(e, a.charAt(c + 1)), c += 2;
            break;
          case "q":
            e = B(e), c++;
            break;
          case "k":
            e = F(e), c++;
            break;
          case "K":
            e = E(e), c++;
            break;
          case "*":
            if (c + 2 >= a.length) break;
            e = M(e, a.charAt(c + 1), a.charAt(c + 2)), c += 3;
            break;
          case "L":
            if (c + 1 >= a.length) break;
            e = W(e, a.charAt(c + 1)), c += 2;
            break;
          case "R":
            if (c + 1 >= a.length) break;
            e = q(e, a.charAt(c + 1)), c += 2;
            break;
          case "+":
            if (c + 1 >= a.length) break;
            e = K(e, a.charAt(c + 1)), c += 2;
            break;
          case "-":
            if (c + 1 >= a.length) break;
            e = Y(e, a.charAt(c + 1)), c += 2;
            break;
          case ".":
            e = Z(e, a.charAt(c + 1)), c += 2;
            break;
          case ",":
            e = $(e, a.charAt(c + 1)), c += 2;
            break;
          case "y":
            if (c + 1 >= a.length) break;
            e = H(e, a.charAt(c + 1)), c += 2;
            break;
          case "Y":
            if (c + 1 >= a.length) break;
            e = G(e, a.charAt(c + 1)), c += 2;
            break;
          case "e":
            if (c + 1 >= a.length) break;
            e = J(e, a.charAt(c + 1)), c += 2;
            break;
          case "E":
            e = Q(e), c++;
            break;
          default:
            c++;
            break;
        }
        return e;
      }
      exports.applyRule = V;
    }
  });
  return require_hashcat_rules();
})();
