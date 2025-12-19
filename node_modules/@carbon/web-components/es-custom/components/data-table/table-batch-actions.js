/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, nothing, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import styles from './data-table.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var CDSTableBatchActions_1;
/**
 * Table batch actions.
 *
 * @element cds-custom-table-batch-actions
 * @fires cds-custom-table-batch-actions-cancel-clicked - The custom event fired after the Cancel button is clicked.
 * @fires cds-custom-table-batch-actions-select-all-clicked - The custom event fired after the Select all button is clicked.
 */
let CDSTableBatchActions = CDSTableBatchActions_1 = class CDSTableBatchActions extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * `true` if this batch actions bar should be active.
         */
        this.active = false;
        /**
         * The formatter for selected items. Should be changed upon the locale the UI is rendered with.
         */
        this.formatSelectedItemsCount = ({ count }) => `${count} item${count <= 1 ? '' : 's'} selected`;
        /**
         * Numeric representation of the total number of items selected in a table.
         * This number is used to derive the selection message.
         */
        this.selectedRowsCount = 0;
        /**
         * Numeric representation of the total number of items in a table.
         * This number is used in the select all button text
         * This property controls the rendering of the Select all button
         */
        this.totalRowsCount = 0;
        /**
         * The table size.
         */
        this.size = 'lg';
    }
    /**
     * Handles `click` event on the Cancel button.
     */
    _handleCancel() {
        const { eventClickCancel } = this
            .constructor;
        this.dispatchEvent(new CustomEvent(eventClickCancel, { bubbles: true, composed: true }));
    }
    /**
     * Handles `click` event on the Select all button.
     */
    _handleSelectAll() {
        this.dispatchEvent(new CustomEvent(CDSTableBatchActions_1.eventClickSelectAll, {
            bubbles: true,
            composed: true,
        }));
    }
    firstUpdated() {
        this._updateButtons();
        this._setupHoverListeners();
    }
    _setupHoverListeners() {
        var _a, _b;
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        const cancelButton = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`${prefix}-button.${prefix}--batch-summary__cancel`);
        if (slot && cancelButton) {
            const setupListeners = () => {
                const buttons = slot.assignedElements();
                const lastButton = buttons[buttons.length - 1];
                if (lastButton) {
                    const handleEnter = () => {
                        cancelButton.style.setProperty('--divider-opacity', '0');
                    };
                    const handleLeave = () => {
                        cancelButton.style.setProperty('--divider-opacity', '1');
                    };
                    lastButton.removeEventListener('mouseenter', handleEnter);
                    lastButton.removeEventListener('mouseleave', handleLeave);
                    lastButton.addEventListener('mouseenter', handleEnter);
                    lastButton.addEventListener('mouseleave', handleLeave);
                }
            };
            setupListeners();
            slot.addEventListener('slotchange', setupListeners);
        }
    }
    updated(changedProperties) {
        if (changedProperties.has('active')) {
            this.setAttribute('tabindex', `${this.active ? '' : '-1'}`);
        }
        if (changedProperties.has('size')) {
            this._updateButtons();
        }
    }
    _updateButtons() {
        this.querySelectorAll(this.constructor.selectorButtons).forEach((button) => {
            button.setAttribute('batch-action', '');
            const buttonSize = this.size === 'xs' || this.size === 'sm' ? 'sm' : 'lg';
            button.setAttribute('size', buttonSize);
        });
    }
    render() {
        const { formatSelectedItemsCount, selectedRowsCount, totalRowsCount, _handleCancel: handleCancel, _handleSelectAll: handleSelectAll, size, } = this;
        const buttonSize = size === 'xs' || size === 'sm' ? 'sm' : 'lg';
        return html `
      <div class="${prefix}--batch-summary">
        <p class="${prefix}--batch-summary__para">
          ${formatSelectedItemsCount({ count: selectedRowsCount })}
        </p>
        ${totalRowsCount > 0
            ? html `
              <span class="${prefix}--batch-summary__divider">|</span>
              <button
                class="${prefix}--btn ${prefix}--btn--primary ${prefix}--batch-summary__select-all"
                @click=${handleSelectAll}>
                <slot name="select-all-button-content"
                  >Select all (${totalRowsCount})</slot
                >
              </button>
            `
            : nothing}
      </div>

      <div class="${prefix}--action-list">
        <slot></slot>
        <cds-custom-button
          kind="primary"
          size="${buttonSize}"
          class="${prefix}--batch-summary__cancel"
          batch-action
          @click=${handleCancel}>
          <slot name="cancel-button-content">Cancel</slot>
        </cds-custom-button>
      </div>
    `;
    }
    /**
     * The CSS selector to find the action buttons.
     */
    static get selectorButtons() {
        return `${prefix}-button`;
    }
    /**
     * The name of the custom event fired after the Cancel button is clicked.
     */
    static get eventClickCancel() {
        return `${prefix}-table-batch-actions-cancel-clicked`;
    }
    /**
     * The name of the custom event fired after the Select all button is clicked.
     */
    static get eventClickSelectAll() {
        return `${prefix}-table-batch-actions-select-all-clicked`;
    }
};
CDSTableBatchActions.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTableBatchActions.prototype, "active", void 0);
__decorate([
    property({ attribute: false })
], CDSTableBatchActions.prototype, "formatSelectedItemsCount", void 0);
__decorate([
    property({ type: Number, attribute: 'selected-rows-count' })
], CDSTableBatchActions.prototype, "selectedRowsCount", void 0);
__decorate([
    property({ type: Number, attribute: 'total-rows-count' })
], CDSTableBatchActions.prototype, "totalRowsCount", void 0);
__decorate([
    property({ reflect: true })
], CDSTableBatchActions.prototype, "size", void 0);
CDSTableBatchActions = CDSTableBatchActions_1 = __decorate([
    carbonElement(`${prefix}-table-batch-actions`)
], CDSTableBatchActions);
var CDSTableBatchActions$1 = CDSTableBatchActions;

export { CDSTableBatchActions$1 as default };
//# sourceMappingURL=table-batch-actions.js.map
