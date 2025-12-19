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

import{f as t,u as e}from"./lit-element-ljyXx2IF.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r={attribute:!0,type:String,converter:e,reflect:!1,hasChanged:t},o=(t=r,e,o)=>{const{kind:s,metadata:n}=o;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),"accessor"===s){const{name:r}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(r,s,t)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===s){const{name:r}=o;return function(o){const s=this[r];e.call(this,o),this.requestUpdate(r,s,t)}}throw Error("Unsupported decorator location: "+s)};function s(t){return(e,r)=>"object"==typeof r?o(t,e,r):((t,e,r)=>{const o=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),o?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}export{s as n};
