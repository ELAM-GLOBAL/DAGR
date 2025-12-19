/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import Search16 from '@carbon/icons/es/search/16.js';
import Close16 from '@carbon/icons/es/close/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty.js';
import FocusMixin from '../../globals/mixins/focus.js';
import FormMixin from '../../globals/mixins/form.js';
import '../text-input/text-input.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import styles from './search.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import { INPUT_SIZE } from '../text-input/defs.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Search box.
 *
 * @element cds-custom-search
 * @csspart search-icon The search icon.
 * @csspart label-text The label text.
 * @csspart input The input box.
 * @csspart close-button The close button.
 * @csspart close-icon The close icon.
 * @fires cds-custom-search-input - The custom event fired after the search content is changed upon a user gesture.
 */
let CDSSearch = class CDSSearch extends HostListenerMixin(FocusMixin(FormMixin(LitElement))) {
    constructor() {
        super(...arguments);
        /**
         * Specify an optional value for the autocomplete property on the underlying <input>,
         * defaults to "off"
         */
        this.autoComplete = 'off';
        /**
         * Specify a label to be read by screen readers on the "close" button
         */
        this.closeButtonLabelText = '';
        /**
         * `true` if the search box should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if the search bar can be expandable
         */
        this.expandable = false;
        /**
         * `true` if the expandable search has been expanded
         */
        this.expanded = false;
        this.hasCustomIcon = false;
        /**
         * The label text.
         */
        this.labelText = '';
        /**
         * The form name in `FormData`.
         */
        this.name = '';
        /**
         * Specify the role for the underlying <input>, defaults to searchbox
         */
        this.role = '';
        /**
         * The placeholder text.
         */
        this.placeholder = 'Search';
        /**
         * The search box size.
         */
        this.size = INPUT_SIZE.MEDIUM;
        /**
         * The `<input>` name.
         */
        this.type = '';
        /**
         * The value.
         */
        this.value = '';
    }
    /**
     * Handles `input` event on the `<input>` in the shadow DOM.
     */
    _handleInput(event) {
        const { target } = event;
        const { value } = target;
        this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                value,
            },
        }));
        this.value = value;
    }
    /**
     * Handles `click` event on the button to clear search box content.
     */
    _handleClearInputButtonClick() {
        if (this.value) {
            this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    value: '',
                },
            }));
            this.value = '';
            // set focus on back to input once search is cleared
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            const input = this.shadowRoot.querySelector('input');
            input.focus();
        }
    }
    /**
     * Expand only when the magnifier icon is clicked
     */
    _handleExpand(e) {
        // Check if the click came from the magnifier area
        const path = (e.composedPath && e.composedPath()) || [];
        const isMagnifierClick = path.some((n) => { var _a; return (_a = n === null || n === void 0 ? void 0 : n.classList) === null || _a === void 0 ? void 0 : _a.contains(`${prefix}--search-magnifier`); });
        if (isMagnifierClick && this.expandable && !this.expanded) {
            this._expandAndFocus();
        }
    }
    _expandAndFocus() {
        var _a, _b;
        this.setAttribute('expanded', '');
        // Focus the input after expanding
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('input')) === null || _b === void 0 ? void 0 : _b.focus();
    }
    /**
     * Handle keyboard interactions:
     * - Enter/Space: expand when collapsed and focus the input
     * - Esc: if input has text: clear it | if empty: collapse and move focus back to magnifier
     */
    _handleKeys(event) {
        var _a, _b, _c;
        const key = event.key;
        // Esc only works when the input is the active element
        if (key === 'Escape') {
            const inputEl = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('input');
            if (((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) === inputEl) {
                event.stopPropagation();
                event.preventDefault();
                if ((_c = this.value) === null || _c === void 0 ? void 0 : _c.length) {
                    // Clear but keep focus in the input
                    this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
                        bubbles: true,
                        composed: true,
                        cancelable: false,
                        detail: { value: '' },
                    }));
                    this.value = '';
                }
                else {
                    if (this.expandable && this.expanded) {
                        this.removeAttribute('expanded');
                    }
                    this._focusMagnifier();
                }
            }
            return;
        }
        if (!this.expandable || this.expanded) {
            return;
        }
        // Enter/Space: expand if collapsed
        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            this._expandAndFocus();
        }
    }
    /**
     * Handles `focusout` event on the component to be closed after being expanded
     * Will not close if there is a value typed within.
     */
    _handleClose() {
        if (this.expandable && this.expanded && !this.value) {
            this.removeAttribute('expanded');
        }
    }
    /**
     * Handler for @slotchange, will only be ran if user sets an element under the "icon" slot.
     *
     * @private
     */
    _handleSlotChange() {
        const icon = this.querySelector('svg');
        icon === null || icon === void 0 ? void 0 : icon.setAttribute('part', 'search-icon');
        icon === null || icon === void 0 ? void 0 : icon.setAttribute('class', `${prefix}--search-magnifier-icon`);
        icon === null || icon === void 0 ? void 0 : icon.setAttribute('role', `img`);
        this.hasCustomIcon = true;
    }
    _handleFormdata(event) {
        const { formData } = event;
        const { disabled, name, value } = this;
        if (!disabled) {
            formData.append(name, value);
        }
    }
    /**
     * Move focus back to the magnifier element.
     * Adds tabindex="-1" if it is not focusable yet.
     */
    _focusMagnifier() {
        var _a;
        const magnifier = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--search-magnifier`);
        if (magnifier) {
            if (!magnifier.hasAttribute('tabindex')) {
                magnifier.tabIndex = -1;
            }
            magnifier.focus();
        }
    }
    render() {
        const { autoComplete, closeButtonLabelText, disabled, hasCustomIcon, labelText, name, placeholder, role, type, value = '', _handleInput: handleInput, _handleClearInputButtonClick: handleClearInputButtonClick, _handleSlotChange: handleSlotChange, } = this;
        const clearClasses = classMap({
            [`${prefix}--search-close`]: true,
            [`${prefix}--search-close--hidden`]: !this.value,
        });
        return html `
      <div class="${prefix}--search-magnifier">
        <slot name="icon" @slotchange=${handleSlotChange}>
          ${hasCustomIcon
            ? html ``
            : iconLoader(Search16, {
                part: 'search-icon',
                class: `${prefix}--search-magnifier-icon`,
                role: 'img',
            })}
        </slot>
      </div>
      <label for="input" part="label-text" class="${prefix}--label">
        <slot>${labelText}</slot>
      </label>
      <input
        autocomplete="${autoComplete}"
        id="input"
        part="input"
        type="${ifNonEmpty(type)}"
        class="${prefix}--search-input"
        ?disabled="${disabled}"
        name="${ifNonEmpty(name)}"
        placeholder="${ifNonEmpty(placeholder)}"
        role="${role}"
        .value="${value}"
        @input="${handleInput}" />
      <button
        part="close-button"
        ?disabled="${disabled}"
        class="${clearClasses}"
        @click="${handleClearInputButtonClick}"
        type="button"
        aria-label="${closeButtonLabelText}">
        ${iconLoader(Close16, {
            part: 'close-icon',
            'aria-label': closeButtonLabelText,
            role: 'img',
        })}
      </button>
    `;
    }
    /**
     * The name of the custom event fired after the search content is changed upon a user gesture.
     */
    static get eventInput() {
        return `${prefix}-search-input`;
    }
};
CDSSearch.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSSearch.styles = styles;
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSSearch.prototype, "_handleExpand", null);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSSearch.prototype, "_handleKeys", null);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSSearch.prototype, "_handleClose", null);
__decorate([
    property({ attribute: 'autocomplete' })
], CDSSearch.prototype, "autoComplete", void 0);
__decorate([
    property({ attribute: 'close-button-label-text' })
], CDSSearch.prototype, "closeButtonLabelText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSearch.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSearch.prototype, "expandable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSearch.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], CDSSearch.prototype, "hasCustomIcon", void 0);
__decorate([
    property({ attribute: 'label-text' })
], CDSSearch.prototype, "labelText", void 0);
__decorate([
    property()
], CDSSearch.prototype, "name", void 0);
__decorate([
    property()
], CDSSearch.prototype, "role", void 0);
__decorate([
    property()
], CDSSearch.prototype, "placeholder", void 0);
__decorate([
    property({ reflect: true })
], CDSSearch.prototype, "size", void 0);
__decorate([
    property()
], CDSSearch.prototype, "type", void 0);
__decorate([
    property({ type: String })
], CDSSearch.prototype, "value", void 0);
CDSSearch = __decorate([
    carbonElement(`${prefix}-search`)
], CDSSearch);
var CDSSearch$1 = CDSSearch;

export { CDSSearch$1 as default };
//# sourceMappingURL=search.js.map
