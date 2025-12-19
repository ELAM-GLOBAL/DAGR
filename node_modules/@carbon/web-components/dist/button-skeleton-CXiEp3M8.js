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

import{_ as t,x as e}from"./lit-element-ljyXx2IF.js";import{e as o}from"./class-map-warKt-hW.js";import{o as s}from"./if-defined-zhGxRN9M.js";import{p as n}from"./settings-BYFrjJ1N.js";import{b as a,C as l}from"./button-CKgb4gp4.js";import{c as r}from"./carbon-element-sn5DFO1t.js";let i=class extends l{_handleClickLinkSkeleton(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}render(){const{autofocus:t,disabled:a,download:l,href:r,hreflang:i,ping:d,rel:$,size:f,target:p,type:m}=this,b=o({[`${n}--btn`]:!0,[`${n}--skeleton`]:!0,[`${n}--btn--${f}`]:f});return r?e`
          <a
            id="button"
            role="button"
            class="${b}"
            download="${s(l)}"
            href="${s(r)}"
            hreflang="${s(i)}"
            ping="${s(d)}"
            rel="${s($)}"
            target="${s(p)}"
            type="${s(m)}"
            @click="${this._handleClickLinkSkeleton}"></a>
        `:e`
          <button
            id="button"
            class="${b}"
            ?autofocus="${t}"
            ?disabled="${a}"
            type="${s(m)}"></button>
        `}};i.styles=a,i=t([r(`${n}-button-skeleton`)],i);
