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
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ValidityMixin from '../../globals/mixins/validity.js';
import FormMixin from '../../globals/mixins/form.js';
import { prefix } from '../../globals/settings.js';
import styles from './time-picker.scss.js';
import ifNonEmpty from '../../globals/directives/if-non-empty.js';
import { TIME_PICKER_SIZE } from './defs.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Time Picker component.
 * @element cds-time-picker
 * @slot label-text - The label text.
 * @slot time-picker-select - Slot for time picker select components.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
let CDSTimePicker = class CDSTimePicker extends ValidityMixin(FormMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * The internal value.
         */
        this._value = '';
        /**
         * Specify whether the control is disabled
         */
        this.disabled = false;
        /**
         * Specify whether the control is currently invalid
         */
        this.invalid = false;
        /**
         * Provide the text that is displayed when the control is in an invalid state
         */
        this.invalidText = 'Invalid time format.';
        /**
         * Specify whether the control is in warning state
         */
        this.warning = false;
        /**
         * Provide the text that is displayed when the control is in a warning state
         */
        this.warningText = 'Warning message.';
        /**
         * Specify whether the label should be hidden
         */
        this.hideLabel = false;
        /**
         * Name for the input in FormData
         */
        this.name = '';
        /**
         * Provide label text to be read by screen readers
         */
        this.labelText = 'Select a time';
        /**
         * Placeholder text for the input
         */
        this.placeholder = 'hh:mm';
        /**
         * Specify whether the control should be read-only
         */
        this.readOnly = false;
        /**
         * Specify the maximum length of the input value
         */
        this.maxLength = 5;
        /**
         * Pattern for input validation
         */
        this.pattern = '(1[012]|[1-9]):[0-5][0-9](\\s)?';
        /**
         * Size of the time picker
         */
        this.size = TIME_PICKER_SIZE.MEDIUM;
        /**
         * Input type
         */
        this.type = 'text';
        /**
         * Validity message
         */
        this.validityMessage = '';
        /**
         * Whether the input is required
         */
        this.required = false;
        /**
         * Custom message for required validation
         */
        this.requiredValidityMessage = 'Please fill out this field.';
    }
    _handleInput({ target }) {
        this.value = target.value;
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { value: this.value },
        }));
    }
    /**
     * Handle slotchange event for time-picker-select slot
     * to propagate properties to child elements
     */
    _handleSlotChange() {
        this.requestUpdate();
    }
    _handleFormdata(event) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        const { formData } = event;
        const { disabled, name, value } = this;
        if (!disabled) {
            formData.append(name, value);
        }
    }
    /**
     * Value of the input
     */
    get value() {
        return this._input ? this._input.value : this._value;
    }
    set value(value) {
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
        if (this._input) {
            this._input.value = value;
        }
    }
    render() {
        const { className, disabled, hideLabel, invalid, invalidText, warning, warningText, labelText, placeholder, readOnly, maxLength, pattern, size, type, value, _handleInput: handleInput, _handleSlotChange: handleSlotChange, } = this;
        const normalizedProps = {
            disabled: !readOnly && disabled,
            invalid: !readOnly && !disabled && invalid,
            warn: !readOnly && !invalid && !disabled && warning,
        };
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--visually-hidden`]: hideLabel,
            [`${prefix}--label--disabled`]: disabled,
        });
        const timePickerClasses = classMap(Object.assign({ [`${prefix}--time-picker`]: true, [`${prefix}--time-picker--invalid`]: normalizedProps.invalid, [`${prefix}--time-picker--warning`]: normalizedProps.warn, [`${prefix}--time-picker--readonly`]: readOnly, [`${prefix}--time-picker--${size}`]: size }, (className && { [className]: true })));
        const inputClasses = classMap(Object.assign({ [`${prefix}--time-picker__input-field`]: true, [`${prefix}--text-input`]: true, [`${prefix}--time-picker__input-field-error`]: normalizedProps.invalid || normalizedProps.warn }, (className && { [className]: true })));
        const label = labelText
            ? html `<label class="${labelClasses}">${labelText}</label>`
            : null;
        return html `
      <div class="${prefix}--form-item ">
        ${label}
        <div class="${timePickerClasses}">
          <div class="${prefix}--time-picker__input">
            <input
              class="${inputClasses}"
              ?data-invalid="${normalizedProps.invalid}"
              ?disabled="${normalizedProps.disabled}"
              maxlength="${ifNonEmpty(maxLength)}"
              name="${ifNonEmpty(this.name)}"
              pattern="${ifNonEmpty(pattern)}"
              placeholder="${ifNonEmpty(placeholder)}"
              ?readonly="${readOnly}"
              type="${ifNonEmpty(type)}"
              .value="${value}"
              @input="${handleInput}" />
            ${normalizedProps.invalid || normalizedProps.warn
            ? html `
                  <div class="${prefix}--time-picker__error__icon">
                    ${normalizedProps.invalid
                ? iconLoader(WarningFilled16, {
                    class: `${prefix}--checkbox__invalid-icon`,
                })
                : iconLoader(WarningAltFilled16, {
                    class: `${prefix}--text-input__invalid-icon--warning`,
                })}
                  </div>
                `
            : null}
          </div>
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
        ${normalizedProps.invalid || normalizedProps.warn
            ? html `
              <div class="${prefix}--form-requirement">
                ${normalizedProps.invalid ? invalidText : warningText}
              </div>
            `
            : null}
      </div>
    `;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const { selectorTimePickerSelect } = this
            .constructor;
        const timePickerSelects = this.querySelectorAll(selectorTimePickerSelect);
        ['disabled', 'readOnly', 'size'].forEach((name) => {
            if (changedProperties.has(name)) {
                const { [name]: value } = this;
                // Propagate the property to descendants
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                timePickerSelects.forEach((elem) => {
                    elem[name] = value;
                });
            }
        });
    }
    static get selectorTimePickerSelect() {
        return `${prefix}-time-picker-select`;
    }
};
CDSTimePicker.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSTimePicker.styles = styles;
__decorate([
    query('input')
], CDSTimePicker.prototype, "_input", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePicker.prototype, "invalid", void 0);
__decorate([
    property({ attribute: 'invalid-text' })
], CDSTimePicker.prototype, "invalidText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePicker.prototype, "warning", void 0);
__decorate([
    property({ attribute: 'warning-text' })
], CDSTimePicker.prototype, "warningText", void 0);
__decorate([
    property({ attribute: 'hide-label', type: Boolean, reflect: true })
], CDSTimePicker.prototype, "hideLabel", void 0);
__decorate([
    property()
], CDSTimePicker.prototype, "name", void 0);
__decorate([
    property({ attribute: 'label-text' })
], CDSTimePicker.prototype, "labelText", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePicker.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePicker.prototype, "readOnly", void 0);
__decorate([
    property({ type: Number, attribute: 'max-length', reflect: true })
], CDSTimePicker.prototype, "maxLength", void 0);
__decorate([
    property()
], CDSTimePicker.prototype, "pattern", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePicker.prototype, "size", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePicker.prototype, "type", void 0);
__decorate([
    property({ attribute: 'validity-message' })
], CDSTimePicker.prototype, "validityMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTimePicker.prototype, "required", void 0);
__decorate([
    property({ attribute: 'required-validity-message' })
], CDSTimePicker.prototype, "requiredValidityMessage", void 0);
__decorate([
    property({ reflect: true })
], CDSTimePicker.prototype, "value", null);
CDSTimePicker = __decorate([
    carbonElement(`${prefix}-time-picker`)
], CDSTimePicker);
var CDSTimePicker$1 = CDSTimePicker;

export { CDSTimePicker$1 as default };
//# sourceMappingURL=time-picker.js.map
