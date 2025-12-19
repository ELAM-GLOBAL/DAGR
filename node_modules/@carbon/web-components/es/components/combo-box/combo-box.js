/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import Close16 from '@carbon/icons/es/close/16.js';
import { forEach } from '../../globals/internal/collection-helpers.js';
import CDSDropdown from '../dropdown/dropdown.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import styles from './combo-box.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import ifNonEmpty from '../../globals/directives/if-non-empty.js';
import { DROPDOWN_KEYBOARD_ACTION } from '../dropdown/defs.js';
export { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from '../dropdown/defs.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Combo box.
 *
 * @element cds-combo-box
 * @fires cds-combo-box-beingselected
 *   The custom event fired before a combo box item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-combo-box-beingtoggled
 *   The custom event fired before the open state of this combo box is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-combo-box-selected - The custom event fired after a combo box item is selected upon a user gesture.
 * @fires cds-combo-box-toggled - The custom event fired after the open state of this combo box is toggled upon a user gesture.
 */
let CDSComboBox = class CDSComboBox extends CDSDropdown {
    constructor() {
        super(...arguments);
        /**
         * The text content that should be set to the `<input>` for filtering.
         */
        this._filterInputValue = '';
        this._shouldTriggerBeFocusable = false;
        /**
         * The `aria-label` attribute for the icon to clear selection.
         */
        this.clearSelectionLabel = 'Clear selection';
        /**
         * The `aria-label` attribute for the `<input>` for filtering.
         */
        this.inputLabel = '';
        /**
         * Provide custom filtering behavior.
         */
        this.shouldFilterItem = false;
    }
    /**
     * @param item A combo box item.
     * @returns `true` if the given combo box item matches the query text user types.
     */
    _testItemWithQueryText(item) {
        return (this.itemMatches || this._defaultItemMatches)(item, this._filterInputNode.value);
    }
    /**
     * The default item matching callback.
     *
     * @param item The combo box item.
     * @param queryText The query text user types.
     * @returns `true` if the given combo box item matches the given query text.
     */
    _defaultItemMatches(item, queryText) {
        return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        item.textContent.toLowerCase().indexOf(queryText.toLowerCase()) >= 0);
    }
    /**
     * Handles `input` event on the `<input>` for filtering.
     */
    _handleInput() {
        const rawQueryText = this._filterInputNode.value;
        const queryText = rawQueryText.trim().toLowerCase();
        if (rawQueryText.length !== 0) {
            this.setAttribute('isClosable', '');
        }
        else {
            this.removeAttribute('isClosable');
        }
        const items = this.querySelectorAll(this.constructor.selectorItem);
        const firstMatchIndex = this._filterItems(items, queryText, rawQueryText);
        if (firstMatchIndex !== -1) {
            const highlightedItem = items[firstMatchIndex];
            if (highlightedItem) {
                this._scrollItemIntoView(highlightedItem);
            }
        }
        this._filterInputValue = rawQueryText;
        this.open = true;
        this.requestUpdate();
    }
    // Applies filtering/highlighting to all slotted items.
    _filterItems(items, queryText, rawQueryText) {
        let firstMatchIndex = -1;
        const hasQuery = Boolean(queryText);
        forEach(items, (item, i) => {
            const comboItem = item;
            const index = i !== null && i !== void 0 ? i : -1;
            if (!hasQuery) {
                comboItem.style.display = '';
                comboItem.highlighted = false;
                return;
            }
            const matches = (comboItem.textContent || '')
                .toLowerCase()
                .includes(queryText);
            const filterFunction = typeof this.shouldFilterItem === 'function'
                ? this.shouldFilterItem
                : null;
            const shouldApplyBuiltInFilter = filterFunction === null && hasQuery && this.shouldFilterItem === true;
            const itemToString = (value) => value.textContent || '';
            const filterInputValue = rawQueryText.length === 0 ? null : rawQueryText;
            const passesFilter = filterFunction
                ? filterFunction({
                    item: comboItem,
                    itemToString,
                    inputValue: filterInputValue,
                })
                : shouldApplyBuiltInFilter
                    ? matches
                    : true;
            const highlightMatch = filterFunction !== null ? passesFilter : matches;
            if (highlightMatch && firstMatchIndex === -1) {
                firstMatchIndex = index;
            }
            if (filterFunction || shouldApplyBuiltInFilter) {
                comboItem.style.display = passesFilter ? '' : 'none';
            }
            else {
                comboItem.style.display = '';
            }
            comboItem.highlighted = index === firstMatchIndex;
        });
        return firstMatchIndex;
    }
    _scrollItemIntoView(item) {
        if (!this._itemMenu) {
            return;
        }
        const menuRect = this._itemMenu.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        if (!menuRect || !itemRect) {
            return;
        }
        const menuBottom = menuRect.top + this._itemMenu.clientHeight;
        const isWithinViewport = menuRect.top <= itemRect.top && itemRect.bottom <= menuBottom;
        if (isWithinViewport) {
            return;
        }
        const scrollTop = itemRect.top - menuRect.top;
        const scrollBottom = itemRect.bottom - menuRect.bottom;
        this._itemMenu.scrollTop +=
            Math.abs(scrollTop) < Math.abs(scrollBottom) ? scrollTop : scrollBottom;
    }
    _getSelectedItem() {
        var _a;
        if (!this.value)
            return null;
        const items = Array.from(this.querySelectorAll(this.constructor.selectorItem));
        return (_a = items.find((it) => String(it.value) === String(this.value))) !== null && _a !== void 0 ? _a : null;
    }
    _revertInputToSelected(focus = true) {
        var _a;
        const selected = this._getSelectedItem();
        const text = (_a = selected === null || selected === void 0 ? void 0 : selected.textContent) !== null && _a !== void 0 ? _a : '';
        this._filterInputValue = text;
        if (this._filterInputNode) {
            this._filterInputNode.value = text;
            if (focus) {
                try {
                    this._filterInputNode.focus();
                    const len = text.length;
                    this._filterInputNode.setSelectionRange(len, len);
                }
                catch (_b) {
                    /* ignore */
                }
            }
        }
        this._resetFilteredItems();
        this.removeAttribute('isClosable');
        this.requestUpdate();
    }
    _handleInputKeydown(event) {
        if (event.key !== 'Escape') {
            return;
        }
        if (!this._filterInputNode) {
            return;
        }
        if (this.value) {
            this._revertInputToSelected(true);
        }
        else if (this._filterInputNode.value) {
            this._clearInputWithoutSelecting(true);
        }
    }
    _handleClickInner(event) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        const { target } = event;
        if ((_a = this._selectionButtonNode) === null || _a === void 0 ? void 0 : _a.contains(target)) {
            this._handleUserInitiatedClearInput();
        }
        else {
            super._handleClickInner(event);
        }
    }
    _handleKeypressInner(event) {
        var _a;
        const { key } = event;
        const action = this.constructor.getAction(key);
        const { TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;
        if (((_a = this._selectionButtonNode) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
            // Space key should be handled by `<input>` unless "clear selection" button has focus
            (action === TRIGGERING || key === ' ')) {
            this._handleUserInitiatedClearInput();
        }
        else {
            super._handleKeypressInner(event);
        }
    }
    /**
     * Handles user-initiated clearing the `<input>` for filtering.
     */
    _handleUserInitiatedClearInput() {
        this._resetFilteredItems();
        this._filterInputValue = '';
        if (this._filterInputNode) {
            this._filterInputNode.value = '';
            this._filterInputNode.focus();
        }
        this._handleUserInitiatedSelectItem();
        this.requestUpdate();
    }
    _handleUserInitiatedSelectItem(item) {
        if (item && !this._selectionShouldChange(item)) {
            // Escape hatch for `shouldUpdate()` logic that updates `._filterInputValue()` when selection changes,
            // given we want to update the `<input>` and close the dropdown even if selection doesn't update.
            // Use case:
            // 1. Select the 2nd item in combo box drop down
            // 2. Type some text in the `<input>`
            // 3. Re-select the 2nd item in combo box drop down,
            //    the `<input>` has to updated with the 2nd item and the dropdown should be closed,
            //    even if there is no change in the selected value
            this._filterInputValue = item.textContent || '';
            this.open = false;
            this.requestUpdate();
        }
        super._handleUserInitiatedSelectItem(item);
    }
    _selectionDidChange(itemToSelect) {
        this.value = !itemToSelect ? '' : itemToSelect.value;
        forEach(this.querySelectorAll(this.constructor.selectorItemSelected), (item) => {
            item.selected = false;
            item.setAttribute('aria-selected', 'false');
        });
        if (itemToSelect) {
            itemToSelect.selected = true;
            itemToSelect.setAttribute('aria-selected', 'true');
        }
        this._handleUserInitiatedToggle(false);
        if (this._filterInputNode) {
            try {
                this._filterInputNode.focus();
                const val = this._filterInputNode.value || '';
                this._filterInputNode.setSelectionRange(val.length, val.length);
            }
            catch (_a) {
                /* ignore browsers that prevent setSelectionRange */
            }
        }
    }
    _renderLabel() {
        var _a;
        const { disabled, inputLabel, label, open, readOnly, value, _activeDescendant: activeDescendant, _filterInputValue: filterInputValue, _handleInput: handleInput, _handleInputKeydown: handleInputKeydown, } = this;
        const inputClasses = classMap({
            [`${prefix}--text-input`]: true,
            [`${prefix}--text-input--empty`]: !value,
        });
        let activeDescendantFallback;
        if (open && !activeDescendant) {
            const constructor = this.constructor;
            const items = this.querySelectorAll(constructor.selectorItem);
            activeDescendantFallback = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.id;
        }
        return html `
      <input
        id="trigger-button"
        class="${inputClasses}"
        ?disabled=${disabled}
        placeholder="${label}"
        .value=${filterInputValue}
        role="combobox"
        aria-label="${ifNonEmpty(inputLabel)}"
        aria-labelledby="dropdown-label"
        aria-controls="menu-body"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded="${String(open)}"
        aria-activedescendant="${ifDefined(open ? (activeDescendant !== null && activeDescendant !== void 0 ? activeDescendant : activeDescendantFallback) : '')}"
        ?readonly=${readOnly}
        @input=${handleInput}
        @keydown=${handleInputKeydown} />
    `;
    }
    // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
    _renderFollowingLabel() {
        const { clearSelectionLabel, _filterInputValue: filterInputValue } = this;
        if (filterInputValue.length != 0) {
            this.setAttribute('isClosable', '');
        }
        else {
            this.removeAttribute('isClosable');
        }
        return filterInputValue.length === 0
            ? undefined
            : html `
          <div
            id="selection-button"
            role="button"
            class="${prefix}--list-box__selection"
            tabindex="0"
            title="${clearSelectionLabel}">
            ${iconLoader(Close16, { 'aria-label': clearSelectionLabel })}
          </div>
        `;
    }
    _renderTitleLabel() {
        const { disabled, hideLabel, titleText, _slotTitleTextNode: slotTitleTextNode, _handleSlotchangeLabelText: handleSlotchangeLabelText, } = this;
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--label--disabled`]: disabled,
            [`${prefix}--visually-hidden`]: hideLabel,
        });
        const hasTitleText = titleText ||
            (slotTitleTextNode && slotTitleTextNode.assignedNodes().length > 0);
        return html `
      <label
        id="dropdown-label"
        part="title-text"
        class="${labelClasses}"
        ?hidden="${!hasTitleText}">
        <slot name="title-text" @slotchange="${handleSlotchangeLabelText}"
          >${titleText}</slot
        >
      </label>
    `;
    }
    shouldUpdate(changedProperties) {
        super.shouldUpdate(changedProperties);
        const { _selectedItemContent: selectedItemContent } = this;
        if (selectedItemContent && changedProperties.has('value')) {
            const selectedText = (selectedItemContent === null || selectedItemContent === void 0 ? void 0 : selectedItemContent.textContent) || '';
            if (!this._filterInputValue || this._filterInputValue === selectedText) {
                this._filterInputValue = selectedText;
            }
        }
        return true;
    }
    _clearInputWithoutSelecting(focus = true) {
        this._filterInputValue = '';
        if (this._filterInputNode) {
            this._filterInputNode.value = '';
            if (focus) {
                try {
                    this._filterInputNode.focus();
                    this._filterInputNode.setSelectionRange(0, 0);
                }
                catch (_a) {
                    /* ignore */
                }
            }
        }
        this._resetFilteredItems();
        this.removeAttribute('isClosable');
        this.requestUpdate();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            if (this.open && this._filterInputNode) {
                this._handleInput();
            }
            else if (!this.open) {
                this._resetFilteredItems();
                if (this.value) {
                    this._revertInputToSelected(false);
                    if (this._filterInputNode &&
                        document.activeElement === this._filterInputNode) {
                        this._filterInputNode.blur();
                    }
                }
                else if (this._filterInputValue &&
                    this._filterInputValue.length > 0) {
                    this._clearInputWithoutSelecting(false);
                    if (this._filterInputNode &&
                        document.activeElement === this._filterInputNode) {
                        this._filterInputNode.blur();
                    }
                }
                else ;
            }
        }
        const { _listBoxNode: listBoxNode } = this;
        if (listBoxNode) {
            listBoxNode.classList.add(`${prefix}--combo-box`);
        }
    }
    // Restores the full list when the query is cleared or the menu closes.
    _resetFilteredItems() {
        const items = this.querySelectorAll(this.constructor.selectorItem);
        forEach(items, (item) => {
            const comboItem = item;
            comboItem.style.display = '';
            comboItem.highlighted = false;
        });
    }
    /**
     * A selector that will return highlighted items.
     */
    static get selectorItemHighlighted() {
        return `${prefix}-combo-box-item[highlighted]`;
    }
    /**
     * A selector that will return combo box items.
     */
    static get selectorItem() {
        return `${prefix}-combo-box-item`;
    }
    /**
     * A selector that will return selected items.
     */
    static get selectorItemSelected() {
        return `${prefix}-combo-box-item[selected]`;
    }
    /**
     * The name of the custom event fired before this combo box item is being toggled upon a user gesture.
     * Cancellation of this event stops the user-initiated action of toggling this combo box item.
     */
    static get eventBeforeToggle() {
        return `${prefix}-combo-box-beingtoggled`;
    }
    /**
     * The name of the custom event fired after this combo box item is toggled upon a user gesture.
     */
    static get eventToggle() {
        return `${prefix}-combo-box-toggled`;
    }
    /**
     * The name of the custom event fired before a combo box item is selected upon a user gesture.
     * Cancellation of this event stops changing the user-initiated selection.
     */
    static get eventBeforeSelect() {
        return `${prefix}-combo-box-beingselected`;
    }
    /**
     * The name of the custom event fired after a a combo box item is selected upon a user gesture.
     */
    static get eventSelect() {
        return `${prefix}-combo-box-selected`;
    }
};
// For combo box, open/selection with space key is disabled given the input box should take it over
CDSComboBox.TRIGGER_KEYS = new Set(['Enter']);
CDSComboBox.styles = styles;
__decorate([
    query('input')
], CDSComboBox.prototype, "_filterInputNode", void 0);
__decorate([
    query('#menu-body')
], CDSComboBox.prototype, "_itemMenu", void 0);
__decorate([
    query('#selection-button')
], CDSComboBox.prototype, "_selectionButtonNode", void 0);
__decorate([
    property({ attribute: 'clear-selection-label' })
], CDSComboBox.prototype, "clearSelectionLabel", void 0);
__decorate([
    property({ attribute: 'input-label' })
], CDSComboBox.prototype, "inputLabel", void 0);
__decorate([
    property({ attribute: false })
], CDSComboBox.prototype, "itemMatches", void 0);
__decorate([
    property({
        attribute: 'should-filter-item',
        converter: {
            fromAttribute: (value) => value !== null,
        },
    })
], CDSComboBox.prototype, "shouldFilterItem", void 0);
CDSComboBox = __decorate([
    carbonElement(`${prefix}-combo-box`)
], CDSComboBox);
var CDSComboBox$1 = CDSComboBox;

export { CDSComboBox$1 as default };
//# sourceMappingURL=combo-box.js.map
