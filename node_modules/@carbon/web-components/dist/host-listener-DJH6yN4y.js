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

import{o as t}from"./on-CsYzs_5y.js";const e=/^((document|window|parentRoot|shadowRoot):)?([\w-]+)$/,o=o=>{class s extends o{constructor(){super(...arguments),this._handles=new Set}connectedCallback(){super.connectedCallback();const o=this.constructor._hostListeners;Object.keys(o).forEach((s=>{Object.keys(o[s]).forEach((n=>{var c;const r=e.exec(n);if(!r)throw new Error(`Could not parse the event name: ${s}`);const[,,a,h]=r,d={document:this.ownerDocument,window:this.ownerDocument.defaultView,parentRoot:this.getRootNode(),shadowRoot:this.shadowRoot}[a]||this,{options:i}=o[s][n];this._handles.add(t(d,null!==(c=this.constructor[h])&&void 0!==c?c:h,this[s],i))}))}))}disconnectedCallback(){this._handles.forEach((t=>{t.release(),this._handles.delete(t)})),super.disconnectedCallback()}}return s._hostListeners={},s};export{o as H};
