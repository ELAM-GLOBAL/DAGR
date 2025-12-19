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

const t=(t,e,o,s)=>{const n=o._hostListeners;if(!n)throw new Error("The method `@HostListener()` is defined on has to be of a class that has `HostListerMixin`.");n[s]||(n[s]={}),n[s][t]={options:e}},e=(e,o)=>(s,n)=>void 0!==n?t(e,o,s.constructor,n):((e,o,s)=>{const{kind:n,key:i,placement:r}=s;if(!("method"===n&&"prototype"===r||"field"===n&&"own"===r))throw new Error("`@HostListener()` must be defined on instance methods, but you may have defined it on static, field, etc.");return Object.assign(Object.assign({},s),{finisher(s){t(e,o,s,i)}})})(e,o,s);export{e as H};
