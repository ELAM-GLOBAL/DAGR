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
import { iconLoader } from '../../globals/internal/icon-loader.js';
import Checkmark16 from '@carbon/icons/es/checkmark/16.js';
import './dropdown.js';
import styles from './dropdown.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { DROPDOWN_SIZE } from './defs.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Dropdown item.
 *
 * @element cds-dropdown-item
 * @csspart selected-icon The selected icon.
 */
let CDSDropdownItem = class CDSDropdownItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * `true` if this dropdown item should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if this dropdown item should be highlighted.
         * If `true`, parent `<dropdown>` selects/deselects this dropdown item upon keyboard interaction.
         *
         * @private
         */
        this.highlighted = false;
        /**
         * `true` if this dropdown item should be selected.
         *
         * @private
         */
        this.selected = false;
        /**
         * Dropdown size.
         */
        this.size = DROPDOWN_SIZE.MEDIUM;
        /**
         * The `value` attribute that is set to the parent `<cds-dropdown>` when this dropdown item is selected.
         */
        this.value = '';
        /**
         * true if menu item has ellipsis applied
         */
        this._hasEllipsisApplied = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'option');
        }
        if (!this.hasAttribute('id')) {
            this.setAttribute('id', `${prefix}-dropdown-item-${this.constructor
                .id++}`);
        }
        this.setAttribute('aria-selected', String(this.selected));
    }
    /**
     * Handles `slotchange` event.
     *
     * Adds the `title` property to its parent element so the native
     * browser tooltip appears for menu items that result in ellipsis
     */
    _handleSlotChange({ target }) {
        var _a;
        const text = target.assignedNodes().filter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        (node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        const textContainer = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--list-box__menu-item__option`);
        if (!textContainer || this._hasEllipsisApplied === true)
            return;
        const observer = new ResizeObserver(() => {
            var _a;
            this._hasEllipsisApplied =
                textContainer.scrollWidth > textContainer.clientWidth;
            if (this._hasEllipsisApplied) {
                textContainer.setAttribute('title', (_a = text[0].textContent) !== null && _a !== void 0 ? _a : '');
            }
        });
        observer.observe(textContainer);
    }
    render() {
        const { selected, _handleSlotChange: handleSlotChange } = this;
        return html `
      <div class="${prefix}--list-box__menu-item__option" part="menu-item">
        <slot @slotchange=${handleSlotChange}></slot>
        ${!selected
            ? undefined
            : iconLoader(Checkmark16, {
                part: 'selected-icon',
                class: `${prefix}--list-box__menu-item__selected-icon`,
            })}
      </div>
    `;
    }
};
/**
 * Store an identifier for use in composing this item's id.
 *
 * Auto-increments anytime a new dropdown-item appears.
 */
CDSDropdownItem.id = 0;
CDSDropdownItem.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDropdownItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDropdownItem.prototype, "highlighted", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDropdownItem.prototype, "selected", void 0);
__decorate([
    property({ reflect: true })
], CDSDropdownItem.prototype, "size", void 0);
__decorate([
    property()
], CDSDropdownItem.prototype, "value", void 0);
__decorate([
    state()
], CDSDropdownItem.prototype, "_hasEllipsisApplied", void 0);
CDSDropdownItem = __decorate([
    carbonElement(`${prefix}-dropdown-item`)
], CDSDropdownItem);
var CDSDropdownItem$1 = CDSDropdownItem;

export { CDSDropdownItem$1 as default };
//# sourceMappingURL=dropdown-item.js.map
