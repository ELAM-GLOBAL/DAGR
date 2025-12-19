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
import { prefix } from '../../globals/settings.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import Add16 from '@carbon/icons/es/add/16.js';
import Subtract16 from '@carbon/icons/es/subtract/16.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty.js';
export { NUMBER_INPUT_VALIDATION_STATUS } from './defs.js';
import styles from './number-input.scss.js';
import CDSTextInput from '../text-input/text-input.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { INPUT_SIZE } from '../text-input/defs.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Number input.
 *
 * @element cds-number-input
 * @fires cds-number-input
 *   The name of the custom event fired after the value is changed upon a user gesture.
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
let CDSNumberInput = class CDSNumberInput extends CDSTextInput {
    constructor() {
        super(...arguments);
        /**
         * Prevents wheel events from changing the input value.
         */
        this._preventWheel = (event) => {
            event.preventDefault();
        };
        this._min = '';
        this._max = '';
        this._step = '1';
        /**
         * Provide a description for up/down icons that can be read by screen readers
         */
        this.iconDescription = '';
        /**
         * Aria text for the button that increments the value
         */
        this.incrementButtonAssistiveText = 'increase number input';
        /**
         * Aria text for the button that decrements the value
         */
        this.decrementButtonAssistiveText = 'decrease number input';
        /**
         * Specify whether you want the steppers to be hidden
         */
        this.hideSteppers = false;
        /**
         * `true` to allow empty string.
         */
        this.allowEmpty = false;
        /**
         * Optional starting value for uncontrolled state
         */
        this.defaultValue = '';
        /**
         * Specify if the wheel functionality for the input should be disabled, or not
         */
        this.disableWheel = false;
        /**
         * The input box size.
         */
        this.size = INPUT_SIZE.MEDIUM;
        this.getDecimalPlaces = (num) => {
            const parts = num.toString().split('.');
            return parts[1] ? parts[1].length : 0;
        };
    }
    /**
     * Handles `input` event on the `input` in the shadow DOM.
     */
    _handleInput(event) {
        const { target } = event;
        const { value } = target;
        const direction = this._value !== undefined && Number(value) > Number(this._value)
            ? 'up'
            : 'down';
        this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                value,
                direction,
            },
        }));
        this._value = value;
    }
    /**
     * Handles `click` event on the up button in the shadow DOM.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleUserInitiatedStepDown(_) {
        const { _input: input } = this;
        this.stepDown();
        this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                value: input.value,
                direction: 'down',
            },
        }));
    }
    /**
     * Handles `click` event on the down button in the shadow DOM.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleUserInitiatedStepUp(_) {
        const { _input: input } = this;
        this.stepUp();
        this.dispatchEvent(new CustomEvent(this.constructor.eventInput, {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                value: input.value,
                direction: 'up',
            },
        }));
    }
    /**
     * Handles `focus` event on the `input` in the shadow DOM.
     */
    _handleFocus(event) {
        if (this.disableWheel) {
            event.target.addEventListener('wheel', this._preventWheel, { passive: false });
        }
    }
    /**
     * Handles `blur` event on the `input` in the shadow DOM.
     */
    _handleBlur(event) {
        if (this.disableWheel) {
            event.target.removeEventListener('wheel', this._preventWheel);
        }
    }
    _getInputValidity() {
        var _a, _b;
        if (this.invalid) {
            return false;
        }
        if (this.value === '') {
            return this.allowEmpty;
        }
        if (((_a = this._input) === null || _a === void 0 ? void 0 : _a.valueAsNumber) > Number(this.max) ||
            ((_b = this._input) === null || _b === void 0 ? void 0 : _b.valueAsNumber) < Number(this.min)) {
            return false;
        }
        return true;
    }
    /**
     * The minimum value allowed in the input
     */
    get min() {
        return this._min.toString();
    }
    set min(value) {
        const oldValue = this.min;
        this._min = value;
        this.requestUpdate('min', oldValue);
    }
    /**
     * The maximum value allowed in the input
     */
    get max() {
        return this._max.toString();
    }
    set max(value) {
        const oldValue = this.max;
        this._max = value;
        this.requestUpdate('max', oldValue);
    }
    /**
     * The amount the value should increase or decrease by
     */
    get step() {
        return this._step.toString();
    }
    set step(value) {
        const oldValue = this.step;
        this._step = value;
        this.requestUpdate('step', oldValue);
    }
    /**
     * Handles incrementing the value in the input
     */
    stepUp() {
        const currentValue = Number(this._input.value);
        const rawValue = currentValue + Number(this.step);
        const precision = Math.max(this.getDecimalPlaces(currentValue), this.getDecimalPlaces(Number(this.step)));
        const floatValue = parseFloat(rawValue.toFixed(precision));
        this._value = String(floatValue);
        this.value = this._value;
    }
    /**
     * Handles decrementing the value in the input
     */
    stepDown() {
        const currentValue = Number(this._input.value);
        const rawValue = currentValue - Number(this.step);
        const precision = Math.max(this.getDecimalPlaces(currentValue), this.getDecimalPlaces(Number(this.step)));
        const floatValue = parseFloat(rawValue.toFixed(precision));
        this._value = String(floatValue);
        this.value = this._value;
    }
    render() {
        const { _handleInput: handleInput, _handleUserInitiatedStepDown: handleUserInitiatedStepDown, _handleUserInitiatedStepUp: handleUserInitiatedStepUp, _handleFocus: handleFocus, _handleBlur: handleBlur, } = this;
        const isValid = this._getInputValidity();
        const invalidIcon = iconLoader(WarningFilled16, {
            class: `${prefix}--number__invalid`,
        });
        const warnIcon = iconLoader(WarningAltFilled16, {
            class: `${prefix}--number__invalid ${prefix}--number__invalid--warning`,
        });
        const normalizedProps = {
            disabled: !this.readonly && this.disabled,
            invalid: !this.readonly && !isValid,
            warn: !this.readonly && isValid && this.warn,
            'slot-name': '',
            'slot-text': '',
            icon: null,
        };
        const wrapperClasses = classMap({
            [`${prefix}--number`]: true,
            [`${prefix}--number--${this.size}`]: this.size,
            [`${prefix}--number--nosteppers`]: this.hideSteppers,
            [`${prefix}--number--readonly`]: this.readonly,
        });
        const inputWrapperClasses = classMap({
            [`${prefix}--number__input-wrapper`]: true,
            [`${prefix}--number__input-wrapper--warning`]: normalizedProps.warn,
            [`${prefix}--number__input-wrapper--decorator`]: this._hasAILabel,
        });
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--label--disabled`]: normalizedProps.disabled,
            [`${prefix}--visually-hidden`]: this.hideLabel,
        });
        const helperTextClasses = classMap({
            [`${prefix}--form__helper-text`]: true,
            [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
        });
        // Use defaultValue when value is not set
        const inputValue = this.hasAttribute('value')
            ? this._value
            : this.defaultValue || this._value;
        const incrementButton = html `
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.iconDescription ||
            this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepUp}>
        ${iconLoader(Add16)}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;
        const decrementButton = html `
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.iconDescription ||
            this.decrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${normalizedProps.disabled}
        @click=${handleUserInitiatedStepDown}>
        ${iconLoader(Subtract16)}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;
        const input = html `
      <input
        autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${normalizedProps.invalid}"
        ?disabled="${normalizedProps.disabled}"
        id="input"
        name="${ifNonEmpty(this.name)}"
        pattern="${ifNonEmpty(this.pattern)}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${inputValue}"
        @input="${handleInput}"
        @focus="${handleFocus}"
        @blur="${handleBlur}"
        min="${ifNonEmpty(this.min)}"
        max="${ifNonEmpty(this.max)}"
        step="${ifNonEmpty(this.step)}"
        role="alert"
        aria-atomic="true" />
    `;
        if (normalizedProps.invalid) {
            normalizedProps.icon = invalidIcon;
            normalizedProps['slot-name'] = 'invalid-text';
            normalizedProps['slot-text'] = this.invalidText;
        }
        else if (normalizedProps.warn) {
            normalizedProps.icon = warnIcon;
            normalizedProps['slot-name'] = 'warn-text';
            normalizedProps['slot-text'] = this.warnText;
        }
        return html `
      <div class="${wrapperClasses}" ?data-invalid=${normalizedProps.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        <div class="${inputWrapperClasses}">
          ${normalizedProps.icon} ${input}
          <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
          <div class="${prefix}--number__controls">
            ${!this.hideSteppers
            ? html `${decrementButton} ${incrementButton}`
            : null}
          </div>
        </div>
        <div
          class="${helperTextClasses}"
          ?hidden="${normalizedProps.invalid || normalizedProps.warn}">
          <slot name="helper-text"> ${this.helperText} </slot>
        </div>
        <div
          class="${prefix}--form-requirement"
          ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
          <slot name="${normalizedProps['slot-name']}">
            ${normalizedProps['slot-text']}
          </slot>
        </div>
      </div>
    `;
    }
    /**
     * The name of the custom event fired after the value is changed upon a user gesture.
     */
    static get eventInput() {
        return `${prefix}-number-input`;
    }
};
CDSNumberInput.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSNumberInput.styles = styles;
__decorate([
    query('input')
], CDSNumberInput.prototype, "_input", void 0);
__decorate([
    property({ reflect: true })
], CDSNumberInput.prototype, "min", null);
__decorate([
    property({ reflect: true })
], CDSNumberInput.prototype, "max", null);
__decorate([
    property({ reflect: true })
], CDSNumberInput.prototype, "step", null);
__decorate([
    property({ attribute: 'icon-description' })
], CDSNumberInput.prototype, "iconDescription", void 0);
__decorate([
    property({ attribute: 'increment-button-assistive-text' })
], CDSNumberInput.prototype, "incrementButtonAssistiveText", void 0);
__decorate([
    property({ attribute: 'decrement-button-assistive-text' })
], CDSNumberInput.prototype, "decrementButtonAssistiveText", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-steppers', reflect: true })
], CDSNumberInput.prototype, "hideSteppers", void 0);
__decorate([
    property({ type: Boolean, attribute: 'allow-empty', reflect: true })
], CDSNumberInput.prototype, "allowEmpty", void 0);
__decorate([
    property({ attribute: 'default-value' })
], CDSNumberInput.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Boolean, attribute: 'disable-wheel', reflect: true })
], CDSNumberInput.prototype, "disableWheel", void 0);
__decorate([
    property({ reflect: true })
], CDSNumberInput.prototype, "size", void 0);
CDSNumberInput = __decorate([
    carbonElement(`${prefix}-number-input`)
], CDSNumberInput);
var CDSNumberInput$1 = CDSNumberInput;

export { CDSNumberInput$1 as default };
//# sourceMappingURL=number-input.js.map
