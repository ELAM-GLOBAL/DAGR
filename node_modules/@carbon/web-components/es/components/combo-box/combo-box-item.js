/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { prefix } from '../../globals/settings.js';
import CDSDropdownItem from '../dropdown/dropdown-item.js';
import styles from './combo-box.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Combo box item.
 *
 * @element cds-combo-box-item
 */
let CDSComboBoxItem = class CDSComboBoxItem extends CDSDropdownItem {
    constructor() {
        super(...arguments);
        this._nextSiblingRefs = {
            'hovered-next-sibling': null,
            'highlighted-next-sibling': null,
            'selected-next-sibling': null,
        };
        this._handleMouseEnter = () => {
            if (this.hasAttribute('disabled')) {
                return;
            }
            this._syncNextSibling('hovered-next-sibling', true);
        };
        this._handleMouseLeave = () => {
            this._syncNextSibling('hovered-next-sibling', false);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.classList.add(`${prefix}--list-box__menu-item`);
        this.addEventListener('mouseenter', this._handleMouseEnter);
        this.addEventListener('mouseleave', this._handleMouseLeave);
    }
    disconnectedCallback() {
        this.removeEventListener('mouseenter', this._handleMouseEnter);
        this.removeEventListener('mouseleave', this._handleMouseLeave);
        this._syncNextSibling('hovered-next-sibling', false);
        this._syncNextSibling('highlighted-next-sibling', false);
        this._syncNextSibling('selected-next-sibling', false);
        super.disconnectedCallback();
    }
    _getNextItem() {
        let next = this.nextElementSibling;
        while (next) {
            if (next instanceof HTMLElement &&
                next.tagName.toLowerCase() === `${prefix}-combo-box-item`) {
                return next;
            }
            next = next.nextElementSibling;
        }
        return null;
    }
    _syncNextSibling(attribute, shouldSet) {
        const currentSibling = this._nextSiblingRefs[attribute];
        currentSibling === null || currentSibling === void 0 ? void 0 : currentSibling.removeAttribute(attribute);
        if (shouldSet) {
            const next = this._getNextItem();
            if (next) {
                next.setAttribute(attribute, '');
                this._nextSiblingRefs[attribute] = next;
                return;
            }
        }
        this._nextSiblingRefs[attribute] = null;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('highlighted')) {
            this._syncNextSibling('highlighted-next-sibling', this.highlighted);
        }
        if (changedProperties.has('selected')) {
            this._syncNextSibling('selected-next-sibling', this.selected);
        }
    }
};
CDSComboBoxItem.styles = styles;
CDSComboBoxItem = __decorate([
    carbonElement(`${prefix}-combo-box-item`)
], CDSComboBoxItem);
var CDSComboBoxItem$1 = CDSComboBoxItem;

export { CDSComboBoxItem$1 as default };
//# sourceMappingURL=combo-box-item.js.map
