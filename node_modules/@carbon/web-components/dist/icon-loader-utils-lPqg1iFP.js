/**
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license
 * 
 * This bundle contains the following third-party dependencies:
 * 
 * Also refer to the following links for the license of other third-party dependencies:
 * 
 * https://www.npmjs.com/package/tslib
 * https://www.npmjs.com/package/lit
 * https://www.npmjs.com/package/@lit/context
 * https://www.npmjs.com/package/lodash-es
 * https://www.npmjs.com/package/@floating-ui/dom
 * https://www.npmjs.com/package/flatpickr
 * https://www.npmjs.com/package/@carbon/icon-helpers
 * https://www.npmjs.com/package/lit-element
 * https://www.npmjs.com/package/lit-html
 * https://www.npmjs.com/package/@lit/reactive-element
 * https://www.npmjs.com/package/@floating-ui/core
 * https://www.npmjs.com/package/@floating-ui/utils
 */

import{e as t}from"./directive-CwtBJVHj.js";import{e}from"./unsafe-html-C26Gpb7O.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class r extends e{}r.directiveName="unsafeSVG",r.resultType=2;const n=t(r);function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e);if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}var u=["width","height","viewBox"],s=["tabindex"],f={focusable:"false",preserveAspectRatio:"xMidYMid meet"};function l(t){return Object.keys(t).reduce((function(e,r,n){var i="".concat(r,'="').concat(t[r],'"');return 0===n?i:e+" "+i}),"")}function b(t,e={}){const r=function(t){return"default"in t&&t.default?t.default:t}(t);r.attrs||(r.attrs={});const n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.width,r=t.height,n=t.viewBox,i=void 0===n?"0 0 ".concat(e," ").concat(r):n,c=a(t,u),l=c.tabindex,b=a(c,s),p=o(o(o({},f),b),{},{width:e,height:r,viewBox:i});return p["aria-label"]||p["aria-labelledby"]||p.title?(p.role="img",null!=l&&(p.focusable="true",p.tabindex=l)):p["aria-hidden"]=!0,p}(Object.assign(Object.assign({},r.attrs),e));return`<svg ${l(n)}>${(r.content||[]).map((t=>"string"==typeof t?t:p(t))).join("")}</svg>`}function p(t){if("string"==typeof t)return t;const{elem:e="svg",attrs:r={},content:n=[]}=t,i=n.map(p).join("");return`<${e} ${l(r)}>${i}</${e}>`}function v(t){return(e={})=>{const r=b(t,e);return n(r)}}export{v as c,n as o};
