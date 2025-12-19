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

import{e}from"./query-BpyCOA3I.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return(r,o)=>{const{slot:n,selector:s}=t??{},c="slot"+(n?`[name=${n}]`:":not([name])");return e(r,o,{get(){const e=this.renderRoot?.querySelector(c),r=e?.assignedElements(t)??[];return void 0===s?r:r.filter((e=>e.matches(s)))}})}}export{t as o};
