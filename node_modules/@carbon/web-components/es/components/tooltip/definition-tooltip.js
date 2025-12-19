/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { POPOVER_ALIGNMENT } from '../popover/defs.js';
import '../popover/popover.js';
import '../popover/popover-content.js';
import styles from './tooltip.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Definition tooltip.
 *
 * @element cds-definition-tooltip
 */
let CDSDefinitionTooltip = class CDSDefinitionTooltip extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify how the trigger should align with the tooltip
         */
        this.align = 'bottom';
        /**
         * Will auto-align Definition Tooltip. This prop is currently experimental and is subject to future changes.
         */
        this.autoalign = false;
        /**
         * Specify whether the tooltip should be open when it first renders
         */
        this.defaultOpen = false;
        /**
         * Specifies whether the `DefinitionTooltip` should open on hover or not
         */
        this.openOnHover = false;
        this.open = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.hasAttribute('default-open')) {
            this.open = true;
        }
    }
    _handleBlur() {
        this.open = false;
    }
    _handleMouseDown() {
        this.open = !this.open;
    }
    _handleKeyDown(event) {
        const { key } = event;
        if (this.open && (key === 'Esc' || key === 'Escape')) {
            event.stopPropagation();
            this.open = false;
        }
    }
    _handleHover() {
        if (this.openOnHover && !this.open) {
            this.open = true;
        }
        else {
            this.open = false;
        }
    }
    _handleFocus() {
        this.open = true;
    }
    render() {
        const { align, open } = this;
        return html `
      <cds-popover
        @mouseenter=${this._handleHover}
        @mouseleave=${this._handleHover}
        highContrast
        dropShadow=${false}
        align=${align}
        .open=${open}>
        <button
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @mousedown=${this._handleMouseDown}
          @keydown=${this._handleKeyDown}
          aria-expanded=${open}
          part="definition-term"
          class="${prefix}--definition-term">
          <slot></slot>
        </button>
        <cds-popover-content>
          <slot name="definition"></slot>
        </cds-popover-content>
      </cds-popover>
    `;
    }
};
CDSDefinitionTooltip.styles = styles;
__decorate([
    property({ reflect: true, type: POPOVER_ALIGNMENT })
], CDSDefinitionTooltip.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDefinitionTooltip.prototype, "autoalign", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'default-open' })
], CDSDefinitionTooltip.prototype, "defaultOpen", void 0);
__decorate([
    property({ reflect: true, type: Boolean, attribute: 'open-on-hover' })
], CDSDefinitionTooltip.prototype, "openOnHover", void 0);
__decorate([
    state()
], CDSDefinitionTooltip.prototype, "open", void 0);
CDSDefinitionTooltip = __decorate([
    carbonElement(`${prefix}-definition-tooltip`)
], CDSDefinitionTooltip);
var CDSDefinitionTooltip$1 = CDSDefinitionTooltip;

export { CDSDefinitionTooltip$1 as default };
//# sourceMappingURL=definition-tooltip.js.map
