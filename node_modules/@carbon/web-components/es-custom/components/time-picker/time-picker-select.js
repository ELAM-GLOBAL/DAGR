/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import { filter } from '../../globals/internal/collection-helpers.js';
import styles from './time-picker.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { TIME_PICKER_SIZE } from './defs.js';
import FormMixin from '../../globals/mixins/form.js';

/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Time picker select dropdown.
 *
 * @element cds-custom-time-picker-select
 */
let CDSTimePickerSelect = class CDSTimePickerSelect extends FormMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * The mutation observer for DOM mutation.
         */
        this._observerMutation = null;
        /**
         * The ARIA label for the UI control.
         */
        this.ariaLabel = 'open list of options';
        /**
         * Optionally provide the default value of the select
         */
        this.defaultValue = '';
        /**
         * Controls the readOnly state of the select
         */
        this.readOnly = false;
        /**
         * Specify whether the control is disabled
         */
        this.disabled = false;
        /**
         * Specify a custom id for the select box
         */
        this.id = '';
        /**
         * Name for the select in the `FormData`
         */
        this.name = '';
        /**
         * The value of the select.
         */
        this.value = '';
        /**
         * Size of the time picker select
         */
        this.size = TIME_PICKER_SIZE.MEDIUM;
        /**
         * Handles DOM mutation of select items
         */
        this._handleMutation = () => {
            this.requestUpdate();
        };
    }
    /**
     * Handles `oninput` event on the `<select>`.
     *
     * @param event The event.
     * @param event.target The event target.
     */
    _handleInput(event) {
        const { value } = event.target;
        this.value = value;
        const { eventSelect } = this.constructor;
        this.dispatchEvent(new CustomEvent(eventSelect, {
            bubbles: true,
            composed: true,
            detail: {
                value,
            },
        }));
    }
    /**
     * @returns The template containing child `<option>` elements from select items.
     */
    _renderItems() {
        const selectorItem = `${prefix}-select-item`;
        return filter(this.childNodes, (item) => item.nodeType === Node.ELEMENT_NODE &&
            item.matches(selectorItem)).map((item) => {
            const disabled = item.hasAttribute('disabled');
            const label = item.getAttribute('label');
            const selected = item.hasAttribute('selected');
            const value = item.getAttribute('value');
            const { textContent } = item;
            return html `
        <option
          ?disabled="${disabled}"
          label="${ifDefined(label)}"
          ?selected="${selected}"
          value="${ifDefined(value)}">
          ${textContent}
        </option>
      `;
        });
    }
    _handleFormdata(event) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        const { formData } = event; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
        const { disabled, name, value } = this;
        if (!disabled) {
            formData.append(name, value);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._observerMutation = new MutationObserver(this._handleMutation);
        this._observerMutation.observe(this, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
    disconnectedCallback() {
        if (this._observerMutation) {
            this._observerMutation.disconnect();
            this._observerMutation = null;
        }
        super.disconnectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('defaultValue') &&
            this.defaultValue &&
            !this.value) {
            this.value = this.defaultValue;
        }
        if (changedProperties.has('value')) {
            if (this._selectNode) {
                this._selectNode.value = this.value;
            }
        }
    }
    render() {
        const { ariaLabel, disabled, size, id, value, readOnly, _handleInput: handleInput, } = this;
        const inputClasses = classMap({
            [`${prefix}--select-input`]: true,
            [`${prefix}--select-input--${size}`]: size,
        });
        return html `
      <select
        id="${ifDefined(id)}"
        class="${inputClasses}"
        aria-readonly="${String(Boolean(readOnly))}"
        ?disabled="${disabled}"
        aria-label="${ifDefined(ariaLabel)}"
        .value="${ifDefined(value)}"
        @input="${handleInput}">
        ${this._renderItems()}
      </select>
      ${iconLoader(ChevronDown16, {
            class: `${prefix}--select__arrow`,
            'aria-hidden': 'true',
        })}
    `;
    }
    static get eventSelect() {
        return `${prefix}-select-selected`;
    }
};
CDSTimePickerSelect.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSTimePickerSelect.styles = styles;
__decorate([
    query('select')
], CDSTimePickerSelect.prototype, "_selectNode", void 0);
__decorate([
    property({ attribute: 'aria-label' })
], CDSTimePickerSelect.prototype, "ariaLabel", void 0);
__decorate([
    property({ attribute: 'default-value' })
], CDSTimePickerSelect.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePickerSelect.prototype, "readOnly", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePickerSelect.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePickerSelect.prototype, "id", void 0);
__decorate([
    property()
], CDSTimePickerSelect.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePickerSelect.prototype, "value", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePickerSelect.prototype, "size", void 0);
CDSTimePickerSelect = __decorate([
    carbonElement(`${prefix}-time-picker-select`)
], CDSTimePickerSelect);
var CDSTimePickerSelect$1 = CDSTimePickerSelect;

export { CDSTimePickerSelect$1 as default };
//# sourceMappingURL=time-picker-select.js.map
