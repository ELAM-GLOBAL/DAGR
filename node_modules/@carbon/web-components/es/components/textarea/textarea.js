/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import CDSTextInput from '../text-input/text-input.js';
import styles from './textarea.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Text area.
 *
 * @element cds-textarea
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
let CDSTextarea = class CDSTextarea extends CDSTextInput {
    constructor() {
        super(...arguments);
        /**
         * Specify whether the textarea is fluid or not
         */
        this.isFluid = false;
        /**
         * Specify the method used for calculating the counter number
         */
        this.counterMode = 'character';
        /**
         * ID to link the `label` and `textarea`
         */
        this.id = '';
        /**
         * Pattern to validate the textarea against for HTML validity checking
         */
        this.pattern = '';
        /**
         * Boolean property to set the required status
         */
        this.required = false;
        /**
         * The number of rows for the textarea to show by default
         */
        this.rows = 4;
        /**
         * The previous counterMode selected. This lets the counterMode state update
         * when the user toggles between both modes.
         */
        this._prevCounterMode = this.counterMode;
    }
    /**
     * Manually handles maxCount for counterMode = 'word'
     * @param event The keyboard event.
     */
    _onKeyDown(evt) {
        var _a, _b;
        if (!this.disabled && this.enableCounter && this.counterMode === 'word') {
            const currentWordCount = ((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.match(/\p{L}+/gu)) === null || _b === void 0 ? void 0 : _b.length) || 0;
            if ((this.maxCount &&
                currentWordCount >= this.maxCount &&
                evt.key === ' ') ||
                (this.maxCount &&
                    currentWordCount >= this.maxCount &&
                    evt.key === 'Enter')) {
                evt.preventDefault();
            }
        }
    }
    /**
     * Handles `onPaste` event on the `<input>`.
     * Manually handles maxCount for counterMode = 'word' when
     * the user is pasting text
     *
     * @param event The clipboard event.
     */
    _onPaste(evt) {
        var _a;
        if (this.counterMode === 'word' &&
            this.enableCounter &&
            typeof this.maxCount !== 'undefined') {
            const existingWords = this._textarea.value.match(/\p{L}+/gu) || [];
            const pastedWords = ((_a = evt.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('Text').match(/\p{L}+/gu)) || [];
            const totalWords = existingWords.length + pastedWords.length;
            if (totalWords > this.maxCount) {
                evt.preventDefault();
                const allowedWords = existingWords
                    .concat(pastedWords)
                    .slice(0, this.maxCount);
                this._textarea.value = allowedWords.join(' ');
                this._textarea.dispatchEvent(new InputEvent('input', {
                    inputType: 'insertFromPaste',
                    data: allowedWords.join(' '),
                    bubbles: true,
                }));
            }
        }
    }
    /**
     * Handles `oninput` event on the `<input>`.
     *
     * @param event The event.
     * @param event.target The event target.
     */
    _handleInput({ target }) {
        this.value = target.value;
    }
    render() {
        var _a, _b, _c, _d;
        const { enableCounter, maxCount } = this;
        const textCount = (_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const wordCount = ((_d = (_c = this.value) === null || _c === void 0 ? void 0 : _c.match(/\p{L}+/gu)) === null || _d === void 0 ? void 0 : _d.length) || 0;
        const invalidIcon = iconLoader(WarningFilled16, {
            class: `${prefix}--text-area__invalid-icon`,
        });
        const warnIcon = iconLoader(WarningAltFilled16, {
            class: `${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`,
        });
        const textareaClasses = classMap({
            [`${prefix}--text-area`]: true,
            [`${prefix}--text-area--warn`]: this.warn,
            [`${prefix}--text-area--invalid`]: this.invalid,
            [`${prefix}--text-area__wrapper--decorator`]: this._hasAILabel,
        });
        const textareaWrapperClasses = classMap({
            [`${prefix}--text-area__wrapper`]: true,
            [`${prefix}--text-area__wrapper--cols`]: this.cols,
            [`${prefix}--text-area__wrapper--warn`]: this.warn,
            [`${prefix}--text-area__wrapper--readonly`]: this.readonly,
        });
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--visually-hidden`]: this.hideLabel,
            [`${prefix}--label--disabled`]: this.disabled,
        });
        const counterClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--label--disabled`]: this.disabled,
            [`${prefix}--text-area__label-counter`]: true,
        });
        const helperTextClasses = classMap({
            [`${prefix}--form__helper-text`]: true,
            [`${prefix}--form__helper-text--disabled`]: this.disabled,
        });
        const counter = enableCounter && maxCount
            ? html ` <label class="${counterClasses}">
            <slot name="label-text"
              >${this.counterMode === 'word'
                ? wordCount
                : textCount}/${maxCount}</slot
            >
          </label>`
            : null;
        const icon = () => {
            if (this.invalid) {
                return invalidIcon;
            }
            else if (this.warn && !this.invalid) {
                return warnIcon;
            }
            return null;
        };
        const helper = html `
      <div class="${helperTextClasses}" id="helper-text">
        <slot name="helper-text">${this.helperText}</slot>
      </div>
    `;
        const normalizedProps = {
            invalid: this.invalid,
            warn: this.warn,
            'slot-name': this.invalid ? 'invalid-text' : 'warn-text',
            'slot-text': this.invalid ? this.invalidText : this.warnText,
        };
        const validationMessage = html `
      <div
        class="${prefix}--form-requirement"
        ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
        <slot name="${normalizedProps['slot-name']}">
          ${normalizedProps['slot-text']} ${this.isFluid ? icon() : null}
        </slot>
      </div>
    `;
        return html `
      <div class="${prefix}--text-area__label-wrapper">
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        ${counter}
      </div>
      <div class="${textareaWrapperClasses}" ?data-invalid="${this.invalid}">
        ${!this.isFluid ? icon() : null}
        <textarea
          autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${textareaClasses}"
          cols="${ifDefined(this.cols)}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${ifNonEmpty(this.name)}"
          pattern="${ifNonEmpty(this.pattern)}"
          placeholder="${ifNonEmpty(this.placeholder)}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          rows="${ifDefined(this.rows)}"
          .value="${this.value}"
          maxlength="${this.counterMode === 'character'
            ? ifNonEmpty(this.maxCount)
            : ''}"
          @keydown="${this._onKeyDown}"
          @paste="${this._onPaste}"
          @input="${this._handleInput}"></textarea>
        <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
        <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
        ${this.isFluid
            ? html `
              <hr class="${prefix}--text-area__divider" />
              ${validationMessage}
            `
            : null}
      </div>
      ${ /* Non-fluid: validation and helper outside field wrapper */''}
      ${!this.isFluid ? html ` ${helper} ${validationMessage} ` : null}
    `;
    }
    updated() {
        var _a, _b;
        (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this);
        if (this.counterMode !== this._prevCounterMode) {
            const textarea = this._textarea;
            if (textarea) {
                if (this.counterMode === 'character') {
                    textarea.setAttribute('maxlength', String(this.maxCount));
                }
                else {
                    textarea.removeAttribute('maxlength');
                }
            }
            this._prevCounterMode = this.counterMode;
        }
        const wrapper = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`.${prefix}--text-area__wrapper`);
        if (!wrapper)
            return;
        this._resizeObserver = new ResizeObserver(() => {
            this._measureWrapper();
        });
        this._resizeObserver.observe(wrapper);
    }
    /**
     * Measures the width of the wrapper and applies that to the max-width of the
     * helper-text and invalid/warn-text
     */
    _measureWrapper() {
        var _a, _b, _c;
        const wrapper = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--text-area__wrapper`);
        const wrapperWidth = wrapper === null || wrapper === void 0 ? void 0 : wrapper.scrollWidth;
        const helper = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`.${prefix}--form__helper-text`);
        const requirement = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`.${prefix}--form-requirement`);
        [helper, requirement].forEach((el) => {
            if (el) {
                el.style.maxWidth = `${wrapperWidth}px`;
                el.style.overflowWrap = 'break-word';
            }
        });
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this._resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    }
};
CDSTextarea.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSTextarea.styles = styles;
__decorate([
    property({ type: Number })
], CDSTextarea.prototype, "cols", void 0);
__decorate([
    property({ type: Boolean })
], CDSTextarea.prototype, "isFluid", void 0);
__decorate([
    property({
        type: String,
        reflect: true,
        hasChanged(newVal, oldVal) {
            if ((newVal === 'character' || newVal === 'word') && newVal !== oldVal) {
                return true;
            }
            return false;
        },
        attribute: 'counter-mode',
    })
], CDSTextarea.prototype, "counterMode", void 0);
__decorate([
    property()
], CDSTextarea.prototype, "id", void 0);
__decorate([
    property()
], CDSTextarea.prototype, "pattern", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTextarea.prototype, "required", void 0);
__decorate([
    property()
], CDSTextarea.prototype, "rows", void 0);
__decorate([
    query('textarea')
], CDSTextarea.prototype, "_textarea", void 0);
CDSTextarea = __decorate([
    carbonElement(`${prefix}-textarea`)
], CDSTextarea);
var CDSTextarea$1 = CDSTextarea;

export { CDSTextarea$1 as default };
//# sourceMappingURL=textarea.js.map
