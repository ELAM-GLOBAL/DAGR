/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16.js';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16.js';
import { prefix } from '../../globals/settings.js';
import getLoadingIcon from '../loading/loading-icon.js';
import { INLINE_LOADING_STATE } from './defs.js';
import styles from './inline-loading.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Lnline loading spinner.
 *
 * @element cds-custom-inline-loading
 * @fires cds-custom-inline-loading-onsuccess The custom event fired when inline-loading has finished status
 */
let CDSInlineLoading = class CDSInlineLoading extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The assistive text for the spinner icon.
         */
        this.iconDescription = 'Loading';
        /**
         * Provide a delay for the setTimeout for success
         */
        this.successDelay = 1500;
        /**
         * The loading status.
         */
        this.status = INLINE_LOADING_STATE.ACTIVE;
    }
    /**
     * @deprecated The 'assistive-text' property will be deprecated in the next major release. Please use `icon-description` instead.
     */
    get assistiveText() {
        return this.iconDescription;
    }
    set assistiveText(value) {
        this.iconDescription = value;
    }
    /**
     * @returns The template for the status icon.
     */
    _renderIcon() {
        const { iconDescription, status } = this;
        if (status === INLINE_LOADING_STATE.ERROR) {
            return iconLoader(ErrorFilled16, {
                class: `${prefix}--inline-loading--error`,
                'aria-label': iconDescription,
            });
        }
        const init = {
            bubbles: true,
            cancelable: true,
            composed: true,
        };
        if (status === INLINE_LOADING_STATE.FINISHED) {
            setTimeout(() => {
                this.dispatchEvent(new CustomEvent(this.constructor.eventOnSuccess, init));
            }, this.successDelay);
            return iconLoader(CheckmarkFilled16, {
                class: `${prefix}--inline-loading__checkmark-container`,
                'aria-label': iconDescription,
            });
        }
        if (status === INLINE_LOADING_STATE.INACTIVE ||
            status === INLINE_LOADING_STATE.ACTIVE) {
            const classes = classMap({
                [`${prefix}--loading`]: true,
                [`${prefix}--loading--small`]: true,
                [`${prefix}--loading--stop`]: status === INLINE_LOADING_STATE.INACTIVE,
            });
            return html `
        <div class="${classes}">
          ${getLoadingIcon({ description: iconDescription, small: true })}
        </div>
      `;
        }
        return undefined;
    }
    static get eventOnSuccess() {
        return `${prefix}-inline-loading-onsuccess`;
    }
    connectedCallback() {
        if (!this.hasAttribute('aria-live')) {
            this.setAttribute('aria-live', 'assertive');
        }
        super.connectedCallback();
    }
    render() {
        const statusIconResult = this._renderIcon();
        const statusIconWrapperResult = !statusIconResult
            ? undefined
            : html `
          <div class="${prefix}--inline-loading__animation">
            ${statusIconResult}
          </div>
        `;
        return html `
      ${statusIconWrapperResult}
      <div class="${prefix}--inline-loading__text"><slot></slot></div>
    `;
    }
};
CDSInlineLoading.styles = styles;
__decorate([
    property({ attribute: 'assistive-text' })
], CDSInlineLoading.prototype, "assistiveText", null);
__decorate([
    property({ attribute: 'icon-description' })
], CDSInlineLoading.prototype, "iconDescription", void 0);
__decorate([
    property({ attribute: 'success-delay' })
], CDSInlineLoading.prototype, "successDelay", void 0);
__decorate([
    property({ reflect: true })
], CDSInlineLoading.prototype, "status", void 0);
CDSInlineLoading = __decorate([
    carbonElement(`${prefix}-inline-loading`)
], CDSInlineLoading);
var CDSInlineLoading$1 = CDSInlineLoading;

export { INLINE_LOADING_STATE, CDSInlineLoading$1 as default };
//# sourceMappingURL=inline-loading.js.map
