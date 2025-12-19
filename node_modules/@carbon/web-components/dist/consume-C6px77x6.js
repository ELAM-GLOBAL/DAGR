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

let t=class extends Event{constructor(t,s,e,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=s,this.callback=e,this.subscribe=i??!1}};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function s(t){return t}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e=class{constructor(t,s,e,i){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,s)=>{this.unsubscribe&&(this.unsubscribe!==s&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,s)),this.unsubscribe=s},this.host=t,void 0!==s.context){const t=s;this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1}else this.context=s,this.callback=e,this.subscribe=i??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new t(this.context,this.host,this.t,this.subscribe))}};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class i{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,s=!1){const e=s||!Object.is(t,this.o);this.o=t,e&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:s}]of this.subscriptions)t(this.o,s)},void 0!==t&&(this.value=t)}addCallback(t,s,e){if(!e)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:s});const{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let o=class extends Event{constructor(t,s){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=s}};class c extends i{constructor(s,e,i){super(void 0!==e.context?e.initialValue:i),this.onContextRequest=t=>{if(t.context!==this.context)return;const s=t.contextTarget??t.composedPath()[0];s!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,s,t.subscribe))},this.onProviderRequest=s=>{if(s.context!==this.context)return;if((s.contextTarget??s.composedPath()[0])===this.host)return;const e=new Set;for(const[s,{consumerHost:i}]of this.subscriptions)e.has(s)||(e.add(s),i.dispatchEvent(new t(this.context,i,s,!0)));s.stopPropagation()},this.host=s,void 0!==e.context?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new o(this.context,this.host))}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n({context:t}){return(s,e)=>{const i=new WeakMap;if("object"==typeof e)return{get(){return s.get.call(this)},set(t){return i.get(this).setValue(t),s.set.call(this,t)},init(s){return i.set(this,new c(this,{context:t,initialValue:s})),s}};{s.constructor.addInitializer((s=>{i.set(s,new c(s,{context:t}))}));const o=Object.getOwnPropertyDescriptor(s,e);let n;if(void 0===o){const t=new WeakMap;n={get(){return t.get(this)},set(s){i.get(this).setValue(s),t.set(this,s)},configurable:!0,enumerable:!0}}else{const t=o.set;n={...o,set(s){i.get(this).setValue(s),t?.call(this,s)}}}return void Object.defineProperty(s,e,n)}}}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r({context:t,subscribe:s}){return(i,o)=>{"object"==typeof o?o.addInitializer((function(){new e(this,{context:t,callback:t=>{i.set.call(this,t)},subscribe:s})})):i.constructor.addInitializer((i=>{new e(i,{context:t,callback:t=>{i[o]=t},subscribe:s})}))}}export{r as c,n as e,s as n};
