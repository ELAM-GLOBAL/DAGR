/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import Copy16 from '@carbon/icons/es/copy/16.js';
import { prefix } from '../../globals/settings.js';
import FocusMixin from '../../globals/mixins/focus.js';
import styles from './copy-button.scss.js';
import { POPOVER_ALIGNMENT } from '../popover/defs.js';
import '../copy/copy.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copy button.
 *
 * @element cds-copy-button
 */
let CDSCopyButton = class CDSCopyButton extends FocusMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * `true` if the button should be disabled.
         */
        this.disabled = false;
        /**
         * Specify the string that is displayed when the button is clicked and the content is copi
         */
        this.feedback = 'Copied!';
        /**
         * How the tooltip is aligned to the trigger button.
         */
        this.align = POPOVER_ALIGNMENT.BOTTOM;
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoAlign = false;
        /**
         * The number in milliseconds to determine how long the tooltip should remain.
         */
        this.feedbackTimeout = 2000;
    }
    render() {
        const { buttonClassName, disabled, feedback, feedbackTimeout, align, autoAlign, } = this;
        let classes = `${prefix}--copy-btn`;
        if (buttonClassName) {
            classes += ` ${buttonClassName}`;
        }
        return html `
      <cds-copy
        ?disabled=${disabled}
        ?autoalign=${autoAlign}
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        button-class-name=${classes}
        exportparts="button"
        align=${align}>
        ${iconLoader(Copy16, {
            slot: 'icon',
            class: `${prefix}--snippet__icon`,
        })}
        <slot slot="tooltip-content"></slot>
      </cds-copy>
    `;
    }
};
CDSCopyButton.styles = styles;
__decorate([
    property({ reflect: true, attribute: 'button-class-name' })
], CDSCopyButton.prototype, "buttonClassName", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSCopyButton.prototype, "disabled", void 0);
__decorate([
    property()
], CDSCopyButton.prototype, "feedback", void 0);
__decorate([
    property({ reflect: true })
], CDSCopyButton.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSCopyButton.prototype, "autoAlign", void 0);
__decorate([
    property({ type: Number, attribute: 'feedback-timeout' })
], CDSCopyButton.prototype, "feedbackTimeout", void 0);
CDSCopyButton = __decorate([
    carbonElement(`${prefix}-copy-button`)
], CDSCopyButton);
var CDSCopyButton$1 = CDSCopyButton;

export { CDSCopyButton$1 as default };
//# sourceMappingURL=copy-button.js.map
