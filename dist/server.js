!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="/",n(n.s=4)}([function(e,r){e.exports=require("express")},function(e,r){e.exports=require("helmet")},function(e,r){e.exports=require("heroku-ssl-redirect")},function(e,r){e.exports=require("express-static-gzip")},function(e,r,n){"use strict";n.r(r);var t=n(0),o=n.n(t),u=n(1),i=n.n(u),c=n(2),s=n.n(c),f=n(3),l=n.n(f),p=o()(),a=process.env.PORT||8080;p.use(i()()),p.use(s()()),p.use("/",l()(__dirname,{enableBrotli:!0,customCompressions:[],orderPreference:["br"]})),p.listen(a,function(){return console.log("Listening on port ".concat(a))})}]);