/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import FocusMixin from '../../globals/mixins/focus.js';
import { OVERFLOW_MENU_SIZE } from './defs.js';
import styles from './overflow-menu.scss.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Overflow menu item.
 *
 * @element cds-overflow-menu-item
 * @fires cds-overflow-menu-item-clicked - The custom event fired when an overflow menu item is clicked.
 */
let CDSOverflowMenuItem = class CDSOverflowMenuItem extends FocusMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * `true` if the action is danger.
         */
        this.danger = false;
        /**
         * `true` if the overflow menu item should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if the item has a divider
         */
        this.divider = false;
        /**
         * The link href of the overflow menu item.
         */
        this.href = '';
        /**
         * The size of the overflow menu item.
         */
        this.size = OVERFLOW_MENU_SIZE.MEDIUM;
    }
    /**
     * Handles `click` event on this element.
     */
    _handleClick(event) {
        this.dispatchEvent(new CustomEvent(this.constructor.itemClicked, {
            bubbles: true,
            composed: true,
            detail: {
                evt: event,
            },
        }));
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'menuitem');
        }
        super.connectedCallback();
    }
    render() {
        const { _handleClick: handleClick } = this;
        return this.href
            ? html `
          <a
            class="${prefix}--overflow-menu-options__btn"
            ?disabled=${this.disabled}
            href="${this.href}"
            tabindex="-1"
            @click="${handleClick}">
            <div class="${prefix}--overflow-menu-options__option-content">
              <slot></slot>
            </div>
          </a>
        `
            : html `
          <button
            class="${prefix}--overflow-menu-options__btn"
            ?disabled=${this.disabled}
            tabindex="-1"
            @click="${handleClick}">
            <div class="${prefix}--overflow-menu-options__option-content">
              <slot></slot>
            </div>
          </button>
        `;
    }
    /**
     * The name of the custom event fired when the item is clicked.
     */
    static get itemClicked() {
        return `${prefix}-overflow-menu-item-clicked`;
    }
};
CDSOverflowMenuItem.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSOverflowMenuItem.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOverflowMenuItem.prototype, "danger", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOverflowMenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOverflowMenuItem.prototype, "divider", void 0);
__decorate([
    property()
], CDSOverflowMenuItem.prototype, "href", void 0);
__decorate([
    property({ reflect: true })
], CDSOverflowMenuItem.prototype, "size", void 0);
CDSOverflowMenuItem = __decorate([
    carbonElement(`${prefix}-overflow-menu-item`)
], CDSOverflowMenuItem);
var CDSOverflowMenuItem$1 = CDSOverflowMenuItem;

export { CDSOverflowMenuItem$1 as default };
//# sourceMappingURL=overflow-menu-item.js.map
