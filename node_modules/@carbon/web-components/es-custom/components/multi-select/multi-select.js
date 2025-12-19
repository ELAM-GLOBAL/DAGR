/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings.js';
import Close16 from '@carbon/icons/es/close/16.js';
import { forEach, filter, indexOf } from '../../globals/internal/collection-helpers.js';
import CDSDropdown from '../dropdown/dropdown.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import { SELECTION_FEEDBACK_OPTION } from './defs.js';
import styles from './multi-select.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { DROPDOWN_KEYBOARD_ACTION, DROPDOWN_TYPE } from '../dropdown/defs.js';
export { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from '../dropdown/defs.js';

/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Multi select.
 *
 * @element cds-custom-multi-select
 * @fires cds-custom-multi-select-beingselected
 *   The custom event fired before a multi select item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-custom-multi-select-selected - The custom event fired after a multi select item is selected upon a user gesture.
 * @fires cds-custom-multi-select-beingtoggled
 *   The custom event fired before the open state of this multi select is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-custom-multi-select-toggled
 *   The custom event fired after the open state of this multi select is toggled upon a user gesture.
 */
let CDSMultiSelect = class CDSMultiSelect extends CDSDropdown {
    constructor() {
        super(...arguments);
        /**
         * The count of selected items.
         */
        this._selectedItemsCount = 0;
        /**
         * The `aria-label` attribute for the icon to clear selection.
         */
        this.clearSelectionLabel = '';
        /**
         * Specify the text that should be read for screen readers that describes total items selected
         */
        this.clearSelectionDescription = 'Total items selected: ';
        /**
         * Specify the text that should be read for screen readers to clear selection.
         */
        this.clearSelectionText = 'To clear selection, press Delete or Backspace.';
        /**
         * Specify the locale of the control. Used for the default compareItems used for sorting the list of items in the control.
         */
        this.locale = 'en';
        /**
         * Enables rendering of a “Select all” multi-select-item
         */
        this.selectAll = false;
        /**
         * Specify feedback (mode) of the selection.
         * `top`: selected item jumps to top
         * `fixed`: selected item stays at it's position
         * `top-after-reopen`: selected item jump to top after reopen dropdown
         */
        this.selectionFeedback = SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN;
        this.compareItems = (itemA, itemB, { locale }) => {
            itemA.localeCompare(itemB, locale, { numeric: true });
        };
        this.sortItems = (menuItems, { values, compareItems, locale = 'en' }) => {
            const menuItemsArray = Array.from(menuItems);
            const sortedArray = menuItemsArray.sort((itemA, itemB) => {
                const hasItemA = values.includes(itemA.value);
                const hasItemB = values.includes(itemB.value);
                // Prefer whichever item is in the `value` array first
                if (hasItemA && !hasItemB) {
                    return -1;
                }
                if (hasItemB && !hasItemA) {
                    return 1;
                }
                return compareItems(itemA.value, itemB.value, {
                    locale,
                });
            });
            return sortedArray;
        };
    }
    get _supportsMenuInputFiltering() {
        return Boolean(this.filterable);
    }
    willUpdate(changedProperties) {
        this._shouldTriggerBeFocusable = !this.filterable;
        super.willUpdate(changedProperties);
    }
    get _menuInputNode() {
        var _a;
        return this.filterable ? ((_a = this._filterInputNode) !== null && _a !== void 0 ? _a : null) : null;
    }
    _clearMenuInputFiltering() {
        if (this.filterable) {
            this._handleUserInitiatedClearInput();
        }
    }
    _shouldClearMenuInputOnEscape({ menuOpen, isInputTarget, }) {
        var _a;
        if (!menuOpen) {
            return true;
        }
        if (!isInputTarget) {
            return false;
        }
        return Boolean((_a = this._filterInputNode) === null || _a === void 0 ? void 0 : _a.value);
    }
    _selectionShouldChange(itemToSelect) {
        // If we are selecting an item, assumes we always toggle
        return Boolean(this.value || itemToSelect);
    }
    _selectionDidChange(itemToSelect) {
        const allItems = Array.from(this.querySelectorAll(this.constructor.selectorItem));
        // clicked "select all" when it was indeterminate
        if ((itemToSelect === null || itemToSelect === void 0 ? void 0 : itemToSelect.isSelectAll) && itemToSelect.indeterminate) {
            allItems.forEach((i) => {
                i.selected = false;
                i.indeterminate = false;
            });
            this.value = '';
            return;
        }
        if (itemToSelect) {
            // clicked select all
            if (itemToSelect.isSelectAll) {
                const items = this.filterable
                    ? Array.from(this.querySelectorAll(this.constructor.selectorItemResults))
                    : allItems;
                items.forEach((i) => {
                    if (!i.isSelectAll &&
                        !i.disabled) {
                        i.selected = !itemToSelect.selected;
                    }
                    i.indeterminate = false;
                });
                itemToSelect.selected = !itemToSelect.selected;
                // clicked regular item
            }
            else {
                itemToSelect.selected = !itemToSelect.selected;
            }
        }
        else {
            forEach(this.querySelectorAll(this.constructor.selectorItemSelected), (item) => {
                item.selected = false;
            });
            this._handleUserInitiatedToggle(false);
        }
        if (this.selectAll)
            this._computeSelectAllState();
        // Change in `.selected` hasn't been reflected to the corresponding attribute yet
        this.value = filter(this.querySelectorAll(this.constructor.selectorItem), (item) => item.selected)
            .map((item) => item.value)
            .join(',');
    }
    // Keep the menu open for individual selections, close only when clearing.
    _shouldCloseAfterSelection(item) {
        return !item;
    }
    _handleClickInner(event) {
        var _a, _b, _c, _d;
        const clickedItem = event.target.closest(`${prefix}-multi-select-item`);
        if (((_a = this._selectionButtonNode) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
            !this.readOnly) {
            this._handleUserInitiatedSelectItem();
            if (this.filterable) {
                this._filterInputNode.focus();
            }
            else {
                this._triggerNode.focus();
            }
        }
        else if (clickedItem && !clickedItem.hasAttribute('disabled')) {
            // Handle focus highlight
            const allItems = this.querySelectorAll(`${prefix}-multi-select-item`);
            allItems.forEach((el) => el.removeAttribute('highlighted'));
            clickedItem.setAttribute('highlighted', '');
            this._handleUserInitiatedSelectItem(clickedItem);
            this.setAttribute('item-clicked', '');
            if (this.filterable) {
                this._filterInputNode.focus();
            }
        }
        else if ((_b = this._clearButtonNode) === null || _b === void 0 ? void 0 : _b.contains(event.target)) {
            this._handleUserInitiatedClearInput();
        }
        else if (!((_c = event.target) === null || _c === void 0 ? void 0 : _c.matches(this.constructor.aiLabelItem)) &&
            // remove reference to slug in v12
            !((_d = event.target) === null || _d === void 0 ? void 0 : _d.matches(this.constructor.slugItem))) {
            super._handleClickInner(event);
            if (this.filterable) {
                this._filterInputNode.focus();
            }
        }
    }
    /**
     * Handler for the `keypress` event, ensures filter still works upon entering space
     */
    _handleKeypressInner(event) {
        var _a, _b;
        const { key } = event;
        const action = this.constructor.getAction(key);
        const { TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;
        if (((_a = this._clearButtonNode) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
            // Space key should be handled by `<input>` unless "clear selection" button has focus
            (action === TRIGGERING || key === ' ')) {
            this._handleUserInitiatedClearInput();
        }
        else if ((_b = this._selectionButtonNode) === null || _b === void 0 ? void 0 : _b.contains(event.target)) {
            this._handleUserInitiatedSelectItem();
            this.open = true;
            if (this.filterable) {
                this._filterInputNode.focus();
            }
            else {
                this._triggerNode.focus();
            }
        }
        else if (this.filterable) {
            this._handleKeypressInnerFlterable(event);
        }
        else {
            super._handleKeypressInner(event);
        }
    }
    _handleMouseoverInner(event) {
        var _a;
        const item = this._getDropdownItemFromEvent(event);
        const isFiltering = this.filterable && Boolean((_a = this._filterInputNode) === null || _a === void 0 ? void 0 : _a.value.length);
        if (!item ||
            isFiltering ||
            !item.hasAttribute('selected') ||
            !item.hasAttribute('highlighted')) {
            return;
        }
        super._handleMouseoverInner(event);
    }
    _handleMouseleaveInner(event) {
        var _a;
        const constructor = this.constructor;
        const isFiltering = this.filterable && Boolean((_a = this._filterInputNode) === null || _a === void 0 ? void 0 : _a.value.length);
        const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
        if (isFiltering || (highlightedItem === null || highlightedItem === void 0 ? void 0 : highlightedItem.hasAttribute('selected'))) {
            return;
        }
        super._handleMouseleaveInner(event);
    }
    /**
     * Special andler for the `keypress` event, ensures space selection for filterable
     * variation is disabled
     */
    _handleKeypressInnerFlterable(event) {
        const { key } = event;
        const action = this.constructor.getAction(key);
        if (!this.open) {
            switch (action) {
                case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
                    this._handleUserInitiatedToggle(true);
                    break;
            }
        }
        else {
            switch (key) {
                case 'Enter':
                    {
                        const constructor = this.constructor;
                        const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
                        if (highlightedItem) {
                            this._handleUserInitiatedSelectItem(highlightedItem);
                        }
                        else {
                            this._handleUserInitiatedToggle(false);
                        }
                    }
                    break;
            }
        }
    }
    _renderTitleLabel() {
        const { clearSelectionDescription, clearSelectionText, disabled, hideLabel, titleText, _selectedItemsCount: selectedItemsCount, _slotTitleTextNode: slotTitleTextNode, _handleSlotchangeLabelText: handleSlotchangeLabelText, } = this;
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--label--disabled`]: disabled,
            [`${prefix}--visually-hidden`]: hideLabel,
        });
        const hasTitleText = titleText ||
            (slotTitleTextNode && slotTitleTextNode.assignedNodes().length > 0);
        return html `
      <label
        part="title-text"
        class="${labelClasses}"
        ?hidden="${!hasTitleText}">
        <slot name="title-text" @slotchange="${handleSlotchangeLabelText}"
          >${titleText}</slot
        >
        ${selectedItemsCount > 0
            ? html `
              <span class="${prefix}--visually-hidden">
                ${clearSelectionDescription} ${selectedItemsCount},
                ${clearSelectionText}
              </span>
            `
            : null}
      </label>
    `;
    }
    _renderPrecedingLabel() {
        const { disabled, readOnly, clearSelectionLabel, _selectedItemsCount: selectedItemsCount, } = this;
        const selectionButtonClasses = classMap({
            [`${prefix}--list-box__selection`]: true,
            [`${prefix}--list-box__selection--multi`]: true,
            [`${prefix}--tag`]: true,
            [`${prefix}--tag--filter`]: true,
            [`${prefix}--tag--high-contrast`]: true,
            [`${prefix}--tag--disabled`]: disabled,
        });
        return selectedItemsCount === 0
            ? undefined
            : html `
          <div
            id="selection-button"
            role="button"
            class="${selectionButtonClasses}"
            tabindex="-1"
            aria-disabled=${readOnly}
            title="${clearSelectionLabel}">
            ${selectedItemsCount}
            ${iconLoader(Close16, {
                'aria-label': clearSelectionLabel,
                class: `${prefix}--tag__close-icon`,
            })}
          </div>
        `;
    }
    /**
      @returns The main content of the trigger button.
     */
    _renderLabel() {
        const { label, value, _selectedItemContent: selectedItemContent } = this;
        const inputClasses = classMap({
            [`${prefix}--text-input`]: true,
            [`${prefix}--text-input--empty`]: !value,
        });
        return !this.filterable
            ? html `
          <span id="trigger-label" class="${prefix}--list-box__label"
            >${selectedItemContent || label}</span
          >
        `
            : html `
          <input
            id="trigger-label"
            class="${inputClasses}"
            placeholder="${label}"
            role="combobox"
            aria-controls="menu-body"
            aria-expanded="${String(this.open)}"
            aria-autocomplete="list"
            @input="${this._handleInput}" />
        `;
    }
    // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
    _renderFollowingLabel() {
        const { clearSelectionLabel, _filterInputNode: filterInputNode } = this;
        return filterInputNode &&
            filterInputNode.value.length > 0 &&
            this.filterable
            ? html `
          <div
            id="clear-button"
            role="button"
            class="${prefix}--list-box__selection"
            tabindex="0"
            title="${clearSelectionLabel}">
            ${iconLoader(Close16, { 'aria-label': clearSelectionLabel })}
          </div>
        `
            : undefined;
    }
    /**
     * Handles `input` event on the `<input>` for filtering.
     */
    _handleInput() {
        const items = this.querySelectorAll(this.constructor.selectorItem);
        const inputValue = this._filterInputNode.value.toLocaleLowerCase();
        this.toggleAttribute('has-value', inputValue.length > 0);
        if (!this.open) {
            this.open = true;
        }
        forEach(items, (item) => {
            // always show the selectAll item
            if (item.isSelectAll) {
                item.removeAttribute('filtered');
                return;
            }
            const itemValue = item.innerText.toLocaleLowerCase();
            if (!itemValue.includes(inputValue)) {
                item.setAttribute('filtered', '');
                item.removeAttribute('highlighted');
            }
            else {
                item.removeAttribute('filtered');
            }
        });
        this.requestUpdate();
        if (this.selectAll) {
            const selectAllItem = this.querySelector(`${prefix}-multi-select-item[is-select-all]`);
            if (selectAllItem) {
                const visible = Array.from(this.querySelectorAll(this.constructor.selectorItemResults));
                const actionable = visible.filter((i) => !i.isSelectAll && !i.disabled);
                if (actionable.length === 0) {
                    selectAllItem.setAttribute('filtered', '');
                }
                else {
                    selectAllItem.removeAttribute('filtered');
                    this._computeSelectAllState();
                }
            }
        }
        const constructor = this.constructor;
        const visibleItems = Array.from(this.querySelectorAll(constructor.selectorItemResults));
        if (visibleItems.length > 0) {
            visibleItems.forEach((i) => i.removeAttribute('highlighted'));
            this.setAttribute('item-clicked', '');
            const first = visibleItems[0];
            first.setAttribute('highlighted', '');
            first.focus();
        }
        else {
            this._filterInputNode.focus();
        }
    }
    /**
     * Navigate through dropdown items.
     *
     * @param direction `-1` to navigate backward, `1` to navigate forward.
     */
    _navigate(direction) {
        var _a;
        if (!this.filterable) {
            super._navigate(direction);
            this._triggerNode.classList.add('no-focus-style');
        }
        else {
            // only navigate through remaining item
            const constructor = this.constructor;
            const items = this.querySelectorAll(constructor.selectorItemResults);
            const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            const highlightedIndex = indexOf(items, highlightedItem);
            let nextIndex = highlightedIndex + direction;
            if ((_a = items[nextIndex]) === null || _a === void 0 ? void 0 : _a.hasAttribute('disabled')) {
                nextIndex += direction;
            }
            if (nextIndex < 0) {
                nextIndex = items.length - 1;
            }
            if (nextIndex >= items.length) {
                nextIndex = 0;
            }
            forEach(items, (item, i) => {
                item.highlighted = i === nextIndex;
            });
            this.setAttribute('item-clicked', '');
        }
    }
    /**
     * Handles user-initiated clearing the `<input>` for filtering.
     */
    _handleUserInitiatedClearInput() {
        const constructor = this.constructor;
        const items = this.querySelectorAll(constructor.selectorItemFiltered);
        this._filterInputNode.value = '';
        this.open = true;
        this._filterInputNode.focus();
        forEach(items, (item) => {
            item.removeAttribute('filtered');
        });
        this._filterInputNode.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
    /**
     * The CSS class list for multi-select listbox
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    get _classes() {
        const { disabled, size, type, invalid, readOnly, open, warn, _selectedItemsCount: selectedItemsCount, } = this;
        const inline = type === DROPDOWN_TYPE.INLINE;
        return classMap({
            [`${prefix}--multi-select`]: true,
            [`${prefix}--list-box`]: true,
            [`${prefix}--list-box--disabled`]: disabled,
            [`${prefix}--list-box--inline`]: inline,
            [`${prefix}--list-box--expanded`]: open,
            [`${prefix}--list-box--${size}`]: size,
            [`${prefix}--multi-select--invalid`]: invalid,
            [`${prefix}--multi-select--warn`]: warn,
            [`${prefix}--multi-select--inline`]: inline,
            [`${prefix}--multi-select--readonly`]: readOnly,
            [`${prefix}--multi-select--selected`]: selectedItemsCount > 0,
            [`${prefix}--list-box__wrapper--decorator`]: this._hasAILabel, // inherited from CDSDropdown
            [`${prefix}--multi-select--selectall`]: this.selectAll,
        });
    }
    shouldUpdate(changedProperties) {
        const { selectorItem, aiLabelItem, slugItem } = this
            .constructor;
        const aiLabel = this.querySelector(aiLabelItem) || this.querySelector(slugItem);
        const items = this.querySelectorAll(selectorItem);
        const { value, locale } = this;
        const values = !value ? [] : value.split(',');
        if (changedProperties.has('size')) {
            forEach(this.querySelectorAll(selectorItem), (elem) => {
                elem.size = this.size;
            });
        }
        if (changedProperties.has('value')) {
            // Updates selection beforehand because our rendering logic for `<cds-custom-multi-select>` looks for selected items via `qSA()`
            forEach(items, (elem) => {
                elem.selected =
                    values.indexOf(elem.value) >= 0;
            });
            this._selectedItemsCount = filter(items, (elem) => values.indexOf(elem.value) >= 0 &&
                !elem.isSelectAll).length;
            if (this.selectionFeedback === SELECTION_FEEDBACK_OPTION.TOP) {
                const sortedMenuItems = this.sortItems(items, {
                    values,
                    compareItems: this.compareItems,
                    locale,
                });
                // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                aiLabel ? sortedMenuItems.unshift(aiLabel) : '';
                // @todo remove typecast once we've updated to Typescript.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                this.replaceChildren(...sortedMenuItems);
            }
        }
        if (changedProperties.has('open')) {
            if (this.selectionFeedback === SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN) {
                const sortedMenuItems = this.sortItems(items, {
                    values,
                    compareItems: this.compareItems,
                    locale,
                });
                // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                aiLabel ? sortedMenuItems.unshift(aiLabel) : '';
                // @todo remove typecast once we've updated to Typescript.
                sortedMenuItems.forEach((item) => {
                    this.appendChild(item);
                });
            }
        }
        return true;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('open') && this.open) {
            const selectedItems = Array.from(this.querySelectorAll(`${prefix}-multi-select-item[selected]`));
            if (selectedItems.length > 0) {
                let itemToFocus = null;
                if (this.selectAll) {
                    itemToFocus = this.querySelector(`${prefix}-multi-select-item[is-select-all]`);
                }
                if (!itemToFocus) {
                    itemToFocus = selectedItems[0];
                }
                this.setAttribute('item-clicked', '');
                itemToFocus.focus();
                itemToFocus.setAttribute('highlighted', '');
            }
            else {
                // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                this.filterable
                    ? this._filterInputNode.focus()
                    : this._triggerNode.focus();
            }
        }
        // reorder items so that select all is always at the top of the list
        if (this.selectAll && changedProperties.has('open') && this.open) {
            const items = Array.from(this.querySelectorAll('cds-custom-multi-select-item'));
            const selectAllItem = items.find((i) => i.isSelectAll);
            if (selectAllItem) {
                this.appendChild(selectAllItem);
                items
                    .filter((i) => i !== selectAllItem)
                    .forEach((i) => this.appendChild(i));
            }
        }
        // flush the top of the first element
        Array.from(this.querySelectorAll('cds-custom-multi-select-item')).forEach((item, index) => {
            if (index === 0 && !item.hasAttribute('is-select-all')) {
                item.setAttribute('flush-top', '');
            }
            else if (index === 1 && this.selectAll) {
                item.setAttribute('flush-top', '');
            }
            else {
                item.removeAttribute('flush-top');
            }
        });
        if (changedProperties.has('open') && !this.open) {
            this._triggerNode.classList.remove('no-focus-style');
            this.removeAttribute('item-clicked');
        }
    }
    firstUpdated(changedProperties) {
        var _a;
        (_a = super.firstUpdated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
        // whenever more items are added/removed, recompute the state of the select all option
        if (!this.selectAll)
            return;
        const defaultSlot = 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        this.shadowRoot.querySelector('slot:not([name])');
        defaultSlot.addEventListener('slotchange', () => this._computeSelectAllState());
    }
    /**
     * Computes the state of the select all option and sets it to either
     * 'selected' or 'indeterminate'
     */
    _computeSelectAllState() {
        if (!this.selectAll)
            return;
        const allItems = Array.from(this.querySelectorAll(this.constructor.selectorItem));
        const selectAllItem = allItems.find((i) => i.isSelectAll);
        if (!selectAllItem || selectAllItem.hasAttribute('filtered')) {
            return;
        }
        const enabledItems = allItems
            .filter((i) => !i.isSelectAll && !i.disabled)
            .filter((i) => !this.filterable || !i.hasAttribute('filtered'));
        const selectedCount = enabledItems.filter((i) => i.selected).length;
        const allSelected = selectedCount === enabledItems.length;
        selectAllItem.selected = allSelected;
        selectAllItem.indeterminate = selectedCount > 0 && !allSelected;
    }
    connectedCallback() {
        super.connectedCallback();
        /**
         * Detect if multi-select already has initially selected items
         */
        this.value = filter(this.querySelectorAll(this.constructor.selectorItem), (item) => item.hasAttribute('selected'))
            .map((item) => item.getAttribute('value'))
            .join(',');
    }
    /**
     * A selector that will return menu body.
     */
    static get selectorMenuBody() {
        return `div[part="menu-body"]`;
    }
    /**
     * A selector that will return highlighted items.
     */
    static get selectorItemHighlighted() {
        return `${prefix}-multi-select-item[highlighted]`;
    }
    /**
     * A selector that will return multi select items.
     * We use a separate property from `.itemTagName` due to the nature in difference of tag name vs. selector.
     */
    static get selectorItem() {
        return `${prefix}-multi-select-item`;
    }
    /**
     * A selector that will return remaining items after a filter.
     */
    static get selectorItemFiltered() {
        return `${prefix}-multi-select-item[filtered]`;
    }
    /**
     * A selector that will return remaining items after a filter.
     */
    static get selectorItemResults() {
        return `${prefix}-multi-select-item:not([filtered])`;
    }
    /**
     * A selector that will return selected items.
     */
    static get selectorItemSelected() {
        return `${prefix}-multi-select-item[selected]`;
    }
    /**
     * The name of the custom event fired before this multi select item is being toggled upon a user gesture.
     * Cancellation of this event stops the user-initiated action of toggling this multi select item.
     */
    static get eventBeforeToggle() {
        return `${prefix}-multi-select-beingtoggled`;
    }
    /**
     * The name of the custom event fired after this multi select item is toggled upon a user gesture.
     */
    static get eventToggle() {
        return `${prefix}-multi-select-toggled`;
    }
    /**
     * The name of the custom event fired before a multi select item is selected upon a user gesture.
     * Cancellation of this event stops changing the user-initiated selection.
     */
    static get eventBeforeSelect() {
        return `${prefix}-multi-select-beingselected`;
    }
    /**
     * The name of the custom event fired after a a multi select item is selected upon a user gesture.
     */
    static get eventSelect() {
        return `${prefix}-multi-select-selected`;
    }
};
CDSMultiSelect.styles = styles;
__decorate([
    property({ type: Boolean })
], CDSMultiSelect.prototype, "filterable", void 0);
__decorate([
    query('#clear-button')
], CDSMultiSelect.prototype, "_clearButtonNode", void 0);
__decorate([
    query('#selection-button')
], CDSMultiSelect.prototype, "_selectionButtonNode", void 0);
__decorate([
    query('input')
], CDSMultiSelect.prototype, "_filterInputNode", void 0);
__decorate([
    query(`.${prefix}--list-box__field`)
], CDSMultiSelect.prototype, "_triggerNode", void 0);
__decorate([
    property({ attribute: 'clear-selection-label' })
], CDSMultiSelect.prototype, "clearSelectionLabel", void 0);
__decorate([
    property({ attribute: 'clear-selection-description' })
], CDSMultiSelect.prototype, "clearSelectionDescription", void 0);
__decorate([
    property({ attribute: 'clear-selection-text' })
], CDSMultiSelect.prototype, "clearSelectionText", void 0);
__decorate([
    property()
], CDSMultiSelect.prototype, "locale", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'select-all' })
], CDSMultiSelect.prototype, "selectAll", void 0);
__decorate([
    property({ attribute: 'selection-feedback' })
], CDSMultiSelect.prototype, "selectionFeedback", void 0);
CDSMultiSelect = __decorate([
    carbonElement(`${prefix}-multi-select`)
], CDSMultiSelect);
var CDSMultiSelect$1 = CDSMultiSelect;

export { DROPDOWN_TYPE, SELECTION_FEEDBACK_OPTION, CDSMultiSelect$1 as default };
//# sourceMappingURL=multi-select.js.map
