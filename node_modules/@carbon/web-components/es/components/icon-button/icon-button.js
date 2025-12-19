/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import '../tooltip/tooltip.js';
import '../tooltip/tooltip-content.js';
import '../tooltip/definition-tooltip.js';
import CDSButton from '../button/button.js';
import '../button/button-set.js';
import '../button/button-skeleton.js';
export { ICON_BUTTON_SIZE, ICON_BUTTON_TOOLTIP_ALIGNMENT } from './defs.js';
import styles from './icon-button.scss.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Icon Button
 *
 * @element cds-icon-button
 */
let CDSIconButton = class CDSIconButton extends CDSButton {
    constructor() {
        /**
         * Checks if a badge indicator is being used with incorrect properties
         */
        super(...arguments);
        /**
         * Specify how the trigger should align with the tooltip
         */
        this.align = 'top';
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoalign = false;
        /**
         * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
         */
        this.closeOnActivation = true;
        /**
         * Specify whether the tooltip should be open when it first renders
         */
        this.defaultOpen = false;
        /**
         * Specify the duration in milliseconds to delay before displaying the tooltip
         */
        this.enterDelayMs = 100;
        /**
         * Specify the duration in milliseconds to delay before hiding the tooltip
         */
        this.leaveDelayMs = 300;
        /**
         * Specify the size of the Button. Defaults to `md`.
         */
        this.size = 'md';
    }
    updated(changedProperties) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
        if (changedProperties) {
            (_e = (_d = (_c = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`${prefix}-tooltip`)) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector(`.${prefix}--tooltip`)) === null || _e === void 0 ? void 0 : _e.classList.add(`${prefix}--icon-tooltip`);
            const tooltipContent = (_f = this.querySelector('[slot=tooltip-content]')) === null || _f === void 0 ? void 0 : _f.textContent;
            (_j = (_h = (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.querySelector(`${prefix}-tooltip`)) === null || _h === void 0 ? void 0 : _h.querySelector(`button`)) === null || _j === void 0 ? void 0 : _j.setAttribute('aria-label', String(tooltipContent));
        }
    }
    _renderTooltipContent() {
        return html `
      <cds-tooltip-content>
        <slot name="tooltip-content"></slot>
      </cds-tooltip-content>
    `;
    }
    render() {
        const { align, autoalign, closeOnActivation, defaultOpen, enterDelayMs, leaveDelayMs, } = this;
        return html `
      <cds-tooltip
        ?autoalign=${autoalign}
        align=${align}
        ?defaultOpen=${defaultOpen}
        close-on-activation="${closeOnActivation}"
        enter-delay-ms=${enterDelayMs}
        leave-delay-ms=${leaveDelayMs}>
        ${super.render()} ${this._renderTooltipContent()}
      </cds-tooltip>
    `;
    }
};
CDSIconButton.styles = styles;
__decorate([
    property({ reflect: true, type: String })
], CDSIconButton.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSIconButton.prototype, "autoalign", void 0);
__decorate([
    property({ attribute: 'close-on-activation', reflect: true, type: Boolean })
], CDSIconButton.prototype, "closeOnActivation", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], CDSIconButton.prototype, "defaultOpen", void 0);
__decorate([
    property({ attribute: 'enter-delay-ms', type: Number })
], CDSIconButton.prototype, "enterDelayMs", void 0);
__decorate([
    property({ attribute: 'leave-delay-ms', type: Number })
], CDSIconButton.prototype, "leaveDelayMs", void 0);
__decorate([
    property({ reflect: true })
], CDSIconButton.prototype, "size", void 0);
CDSIconButton = __decorate([
    carbonElement(`${prefix}-icon-button`)
], CDSIconButton);
var CDSIconButton$1 = CDSIconButton;

export { CDSIconButton$1 as default };
//# sourceMappingURL=icon-button.js.map
