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

import{_ as e,r as s,x as t}from"./lit-element-ljyXx2IF.js";import{n as r}from"./property-CoShOfqo.js";import{c as o}from"./carbon-element-sn5DFO1t.js";import{p as l}from"./settings-BYFrjJ1N.js";import{s as a}from"./select-BLrQXy2c.js";let i=class extends s{constructor(){super(...arguments),this.hideLabel=!1}render(){const{hideLabel:e}=this;return t`
      ${!e&&t` <span class="${l}--label ${l}--skeleton"></span> `}
      <div class="${l}--select ${l}--skeleton"></div>
    `}};i.styles=a,e([r({type:Boolean,reflect:!0,attribute:"hide-label"})],i.prototype,"hideLabel",void 0),i=e([o(`${l}-select-skeleton`)],i);var n=i;export{n as C};
