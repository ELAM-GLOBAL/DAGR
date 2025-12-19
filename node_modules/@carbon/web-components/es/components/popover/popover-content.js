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
import { prefix } from '../../globals/settings.js';
import styles from './popover.scss.js';
import { POPOVER_BACKGROUND_TOKEN } from './defs.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Popover.
 *
 * @element cds-popover-content
 */
let CDSPopoverContent = class CDSPopoverContent extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify the popover alignment
         */
        this.align = '';
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoalign = false;
        /**
         * Specify whether a dropShadow should be rendered
         */
        this.dropShadow = true;
        /**
         * Specify whether a border should be rendered on the popover
         */
        this.border = false;
        /**
         * Render the component using the high-contrast variant
         */
        this.highContrast = false;
        /**
         * Specify whether the component is currently open or closed
         */
        this.open = false;
        /**
         * Render the component using the tab tip variant
         */
        this.tabTip = false;
        /**
         * Specify the background token to use. Default is 'layer'.
         */
        this.backgroundToken = POPOVER_BACKGROUND_TOKEN.LAYER;
        /**
         * The shadow slot this popover content should be in.
         */
        this.slot = 'content';
    }
    render() {
        return html `
      <span class="${prefix}--popover">
        <span class="${prefix}--popover-content" part="content" tabindex="-1">
          <slot> </slot>
          ${this.autoalign
            ? html `<span
                class="${prefix}--popover-caret ${prefix}--popover--auto-align"></span>`
            : null}
        </span>
        ${!this.autoalign
            ? html `<span class="${prefix}--popover-caret"></span>`
            : null}
      </span>
    `;
    }
};
CDSPopoverContent.styles = styles;
__decorate([
    property({ reflect: true, type: String })
], CDSPopoverContent.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "autoalign", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "caret", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "dropShadow", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "border", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "highContrast", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopoverContent.prototype, "tabTip", void 0);
__decorate([
    property({ reflect: true, type: String })
], CDSPopoverContent.prototype, "backgroundToken", void 0);
__decorate([
    property({ reflect: true })
], CDSPopoverContent.prototype, "slot", void 0);
CDSPopoverContent = __decorate([
    carbonElement(`${prefix}-popover-content`)
], CDSPopoverContent);
var CDSPopoverContent$1 = CDSPopoverContent;

export { CDSPopoverContent$1 as default };
//# sourceMappingURL=popover-content.js.map
