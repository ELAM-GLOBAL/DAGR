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

var e;!function(e){e[e.BACKWARD=-1]="BACKWARD",e[e.FORWARD=1]="FORWARD"}(e||(e={}));class t{constructor(e){this._groups={},this.constructor._instances.set(e,this)}shouldBeFocusable(e){if(e.checked)return!0;const{name:t}=e,s=this._groups[t];if(s&&Array.from(s).some((e=>e.checked)))return!1;return!s||1===s.size||this.getSortedGroup(e)[0]===e}getSortedGroup(e){const t=this._groups[e.name];return t&&Array.from(t).sort(((e,t)=>{const s=e.compareDocumentPosition(t);return s&Node.DOCUMENT_POSITION_FOLLOWING||s&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:s&Node.DOCUMENT_POSITION_PRECEDING||s&Node.DOCUMENT_POSITION_CONTAINS?1:0}))}add(e){const{name:t}=e;if(t){const s=this._groups;s[t]||(s[t]=new Set),s[t].add(e)}return this}delete(e,t=e.name){const s=this._groups[t];return!!s&&s.delete(e)}select(e,t){const s=this._groups[e.name];if(s){if(e.disabled)return;e.checked=!t||!0,e.tabIndex=0,e.focus(),s.forEach((s=>{e!==s&&(s.checked=t||!1,s.tabIndex=-1)}))}}navigate(e,t){const s=this.getSortedGroup(e),r=s.length;let n=s.indexOf(e);for(let e=0;e<r;e++){n=(n+t+r)%r;const e=s[n];if(!e.disabled)return e}return e}static get(e){return this._instances.get(e)||new t(e)}}t._instances=new WeakMap;export{e as N,t as R};
