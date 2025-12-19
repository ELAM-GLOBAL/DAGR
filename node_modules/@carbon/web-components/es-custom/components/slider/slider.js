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
import throttle from 'lodash-es/throttle';
import { prefix } from '../../globals/settings.js';
import FocusMixin from '../../globals/mixins/focus.js';
import FormMixin from '../../globals/mixins/form.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import HostListener from '../../globals/decorators/host-listener.js';
import styles from './slider.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The direction to move the thumb, associated with key symbols.
 */
const THUMB_DIRECTION = {
    Left: -1,
    ArrowLeft: -1,
    Up: -1,
    ArrowUp: -1,
    Right: 1,
    ArrowRight: 1,
    Down: 1,
    ArrowDown: 1,
};
/**
 * Minimum time between processed "drag" events.
 */
const EVENT_THROTTLE = 16; // ms
/**
 * Slider.
 *
 * @element cds-custom-slider
 * @fires cds-custom-slider-input-changed
 *   The name of the custom event fired after the value is changed in `<cds-custom-slider-input>` by user gesture.
 * @slot label-text - The label text.
 * @slot max-text - The text for maximum value.
 * @slot min-text - The text for minimum value.
 * @fires cds-custom-slider-changed - The custom event fired after the value is changed by user gesture.
 */
let CDSSlider = class CDSSlider extends HostListenerMixin(FormMixin(FocusMixin(LitElement))) {
    constructor() {
        super(...arguments);
        this._cachedRateUpper = 1;
        this._cachedRate = 0;
        this.dragCooldownTimeout = null;
        this.dragCoolDown = false;
        /**
         * The internal value of `max` property.
         */
        this._max = '100';
        /**
         * The internal value of `min` property.
         */
        this._min = '0';
        /**
         * The internal value of `step` property.
         */
        this._step = '1';
        /**
         * The internal value of `stepMultiplier` property.
         */
        this._stepMultiplier = '4';
        /**
         * The handle for the throttled listener of `pointermove` event.
         */
        this._throttledHandlePointermoveImpl = null;
        /**
         * `true` if dragging of thumb is in progress.
         */
        this._dragging = false;
        /**
         * `true` if dragging of thumb upper is in progress.
         */
        this._draggingUpper = false;
        /**
         * Throttles calls to `this._onDrag` by limiting events to being processed at
         * most once every `EVENT_THROTTLE` milliseconds.
         */
        this.onDrag = throttle(this._startDrag, EVENT_THROTTLE, {
            leading: true,
            trailing: false,
        });
        /**
         * Handles `pointermove` to update the thumb position and the value as necessary.
         *
         * @param event The event.
         */
        this._handlePointermove = (event) => {
            const { disabled, _dragging: dragging, _draggingUpper: draggingUpper, } = this;
            if (!disabled && (dragging || draggingUpper)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                this._throttledHandlePointermoveImpl(event);
            }
        };
        /**
         * Handles `pointerup` and `pointerleave` event to finishing dragging.
         */
        this._endDrag = () => {
            if (this._dragging || this._draggingUpper) {
                this.dragCoolDown = true;
            }
            else {
                this.dragCoolDown = false;
            }
            if (this._dragging) {
                this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: this.value,
                    },
                }));
                this._dragging = false;
                this._thumbNode.style.touchAction = '';
            }
            else if (this._draggingUpper) {
                this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: this.unstable_valueUpper,
                    },
                }));
                this._draggingUpper = false;
                this._thumbNodeUpper.style.touchAction = '';
            }
            if (this._dragging || this._draggingUpper) {
                this.dragCooldownTimeout = window.setTimeout(() => {
                    this.dragCoolDown = false;
                }, 100);
            }
        };
        /**
         * Handles `${prefix}-slider-input-changed` event to update the value.
         */
        this._handleChangeInput = (event) => {
            var _a;
            const input = event.target;
            const inputElement = (_a = input.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input');
            this.isValid =
                input.tagName === 'CDS-SLIDER-INPUT'
                    ? this._getInputValidity(input)
                    : this.isValid;
            this.warn = this._getInputWarnigState(inputElement);
            const eventContainer = event.target.id;
            const { detail } = event;
            const { intermediate, value } = detail;
            this.warnText = intermediate
                ? `The inputted value ${intermediate} was corrected to the nearest allowed digit`
                : '';
            if (intermediate !== value) {
                if (eventContainer === 'upper') {
                    this.unstable_valueUpper = value;
                }
                else {
                    this.value = value;
                }
            }
            const valueMain = eventContainer === 'upper' ? this.unstable_valueUpper : this.value;
            // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
            valueMain !== '' &&
                this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: valueMain,
                        intermediate,
                    },
                }));
        };
        /**
         * `true` if the check box should be disabled.
         */
        this.disabled = false;
        /**
         * 	true to specify if the control is required.
         */
        this.required = false;
        /**
         * 	Whether the slider should be read-only
         */
        this.readonly = false;
        /**
         * The label text.
         */
        this.labelText = '';
        /**
         * The label associated with the maximum value.
         */
        this.maxLabel = '';
        /**
         * The label associated with the minimum value.
         */
        this.minLabel = '';
        /**
         * Specify whether you want the underlying label to be visually hidden
         */
        this.hideLabel = false;
        /**
         * The formatter for the text for maximum value.
         * Should be changed upon the locale the UI is rendered with.
         */
        this.formatMaxText = (max, maxLabel) => `${max}${maxLabel}`;
        /**
         * The formatter for the text for min/max value.
         * Should be changed upon the locale the UI is rendered with.
         */
        this.formatMinText = (min, minLabel) => `${min}${minLabel}`;
        /**
         * true to specify if the control is invalid.
         */
        this.invalid = false;
        /**
         * Message which is displayed if the value is invalid.
         */
        this.invalidText = '';
        /**
         * true to specify if the control should display warn icon and text.
         */
        this.warn = false;
        /**
         * Provide the text that is displayed when the control is in warning state
         */
        this.warnText = '';
        /**
         * Checks whether the input field is hidden or not
         */
        this.hideTextInput = false;
    }
    /**
     * The rate of the thumb position in the track.
     * When we try to set a new value, we adjust the value considering `step` property.
     */
    get _rate() {
        const { max, min, value } = this;
        // Copes with out-of-range value coming programmatically or from `<cds-custom-slider-input>`
        if (value) {
            const rate = (Math.min(Number(max), Math.max(Number(min), value)) - Number(min)) /
                (Number(max) - Number(min));
            this._cachedRate = rate;
            return rate;
        }
        else {
            return this._cachedRate;
        }
    }
    set _rate(rate) {
        const { max, min, step } = this;
        this.value =
            Number(min) +
                Math.round(((Number(max) - Number(min)) * Math.min(1, Math.max(0, rate))) /
                    Number(step)) *
                    Number(step);
    }
    /**
     * The rate of the upper thumb position in the track.
     * When we try to set a new value for upper input, we adjust the value considering `step` property.
     */
    get _rateUpper() {
        const { max, min, unstable_valueUpper } = this;
        // Copes with out-of-range value coming programmatically or from `<cds-custom-slider-input>`
        if (unstable_valueUpper) {
            const rateUpper = (Math.min(Number(max), Math.max(Number(min), unstable_valueUpper)) -
                Number(min)) /
                (Number(max) - Number(min));
            this._cachedRateUpper = rateUpper;
            return rateUpper;
        }
        else {
            return this._cachedRateUpper;
        }
    }
    set _rateUpper(rateUpper) {
        const { max, min, step } = this;
        this.unstable_valueUpper =
            Number(min) +
                Math.round(((Number(max) - Number(min)) * Math.min(1, Math.max(0, rateUpper))) /
                    Number(step)) *
                    Number(step);
    }
    /**
     * Handles `click` event on the `<label>` to focus on the thumb.
     */
    _handleClickLabel() {
        var _a;
        (_a = this._thumbNode) === null || _a === void 0 ? void 0 : _a.focus();
    }
    _handleFormdata(event) {
        const { formData } = event;
        const { disabled, name, value } = this;
        if (!disabled) {
            formData.append(name, String(value));
        }
    }
    /**
     * Handles `keydown` event on the thumb to increase/decrease the value.
     */
    _handleKeydown(event) {
        const eventContainer = event.target.id;
        const { key, shiftKey } = event;
        if (!this.disabled && !this.readonly) {
            if (key in THUMB_DIRECTION) {
                const { max: rawMax, min: rawMin, step: rawStep, stepMultiplier: rawstepMultiplier, value, unstable_valueUpper, } = this;
                const max = Number(rawMax);
                const min = Number(rawMin);
                const step = Number(rawStep);
                const stepMultiplier = Number(rawstepMultiplier);
                const diff = (!shiftKey ? step : (max - min) / stepMultiplier) *
                    THUMB_DIRECTION[key];
                // Snaps to next
                if (eventContainer == 'thumb-upper') {
                    const stepCount = (unstable_valueUpper + diff) / step;
                    const position = Math.min(max, Math.max(min, (diff >= 0 ? Math.floor(stepCount) : Math.ceil(stepCount)) * step));
                    if (position >= this.value) {
                        this.unstable_valueUpper = position;
                    }
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            value: this.unstable_valueUpper,
                            intermediate: false,
                        },
                    }));
                }
                else {
                    const stepCount = (value + diff) / step;
                    const position = Math.min(max, Math.max(min, (diff >= 0 ? Math.floor(stepCount) : Math.ceil(stepCount)) * step));
                    if (!this.unstable_valueUpper ||
                        position <= this.unstable_valueUpper) {
                        this.value = position;
                    }
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            value: this.value,
                            intermediate: false,
                        },
                    }));
                }
            }
        }
    }
    /**
     * Handles `pointerdown` event on the thumb to start dragging.
     */
    _startDrag(event) {
        if (!this.readonly && !this.disabled) {
            let eventContainer = event.target.id;
            if (!eventContainer) {
                const element = event.target.nodeName;
                if (element == 'path' || element == 'svg') {
                    eventContainer = event.target.parentElement.closest('.cds-custom--slider__thumb-wrapper').id;
                }
            }
            if (eventContainer === 'thumb') {
                this._dragging = true;
                this._thumbNode.style.touchAction = 'none';
            }
            else {
                this._draggingUpper = true;
                this._thumbNodeUpper.style.touchAction = 'none';
            }
        }
    }
    /**
     * Handles `pointerdown` event on the track to update the thumb position and the value as necessary.
     */
    _handleClick(event) {
        let eventContainer = event.target.id;
        if (!eventContainer) {
            const element = event.target.nodeName;
            if (element == 'path' || element == 'svg') {
                eventContainer = event.target.parentElement.closest('.cds-custom--slider__thumb-wrapper').id;
            }
        }
        if (!this.disabled && !this.readonly) {
            const { _trackNode: trackNode } = this;
            const isRtl = 
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            trackNode
                .ownerDocument.defaultView.getComputedStyle(trackNode)
                .getPropertyValue('direction') === 'rtl';
            const thumbPosition = event.clientX;
            const { left: trackLeft, width: trackWidth } = trackNode.getBoundingClientRect();
            if (eventContainer === 'thumb-upper') {
                this._rateUpper =
                    (isRtl
                        ? trackLeft + trackWidth - thumbPosition
                        : thumbPosition - trackLeft) / trackWidth;
                this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: this.unstable_valueUpper,
                    },
                }));
            }
            else {
                if (!this.unstable_valueUpper) {
                    this._rate =
                        (isRtl
                            ? trackLeft + trackWidth - thumbPosition
                            : thumbPosition - trackLeft) / trackWidth;
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            value: this.value,
                        },
                    }));
                }
                else {
                    if (!this.dragCoolDown) {
                        const position = ((isRtl
                            ? trackLeft + trackWidth - thumbPosition
                            : thumbPosition - trackLeft) /
                            trackWidth) *
                            100;
                        const differenceValue = position > this.value
                            ? position - this.value
                            : this.value - position;
                        const differenceValueUpper = position > this.unstable_valueUpper
                            ? position - this.unstable_valueUpper
                            : this.unstable_valueUpper - position;
                        if (differenceValue > differenceValueUpper) {
                            this._rateUpper = position / 100;
                        }
                        else if (differenceValue < differenceValueUpper) {
                            this._rate = position / 100;
                        }
                        else if (!this._dragging &&
                            !this._draggingUpper &&
                            differenceValue === differenceValueUpper) {
                            // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                            Math.round(position) > this.unstable_valueUpper
                                ? (this._rateUpper = position / 100)
                                : (this._rate = position / 100);
                        }
                        this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                            bubbles: true,
                            composed: true,
                            detail: {
                                value: this.value,
                            },
                        }));
                    }
                }
            }
        }
    }
    /**
     * Updates thumb position and value upon user's `pointermove` gesture.
     *
     * @param event The event.
     */
    _handlePointermoveImpl(event) {
        const { disabled, _dragging: dragging, _trackNode: trackNode, _draggingUpper: draggingUpper, } = this;
        if (!disabled) {
            const isRtl = 
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            trackNode
                .ownerDocument.defaultView.getComputedStyle(trackNode)
                .getPropertyValue('direction') === 'rtl';
            const thumbPosition = event.clientX;
            const { left: trackLeft, width: trackWidth } = this._trackNode.getBoundingClientRect();
            if (dragging) {
                const position = (isRtl
                    ? trackLeft + trackWidth - thumbPosition
                    : thumbPosition - trackLeft) / trackWidth;
                if (!this.unstable_valueUpper ||
                    position * 100 <= this.unstable_valueUpper) {
                    this._rate = position;
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            value: this.value,
                            intermediate: true,
                        },
                    }));
                }
            }
            else if (draggingUpper) {
                const position = (isRtl
                    ? trackLeft + trackWidth - thumbPosition
                    : thumbPosition - trackLeft) / trackWidth;
                if (position * 100 >= this.value) {
                    this._rateUpper = position;
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            value: this.unstable_valueUpper,
                            intermediate: true,
                        },
                    }));
                }
            }
        }
    }
    /**
     * The maximum value.
     */
    get max() {
        return this._max.toString();
    }
    set max(value) {
        const { max: oldMax } = this;
        this._max = value;
        this.requestUpdate('max', oldMax);
    }
    /**
     * The minimum value.
     */
    get min() {
        return this._min.toString();
    }
    set min(value) {
        const { min: oldMin } = this;
        this._min = value;
        this.requestUpdate('min', oldMin);
    }
    /**
     * The snapping step of the value.
     */
    get step() {
        return this._step.toString();
    }
    set step(value) {
        const { step: oldStep } = this;
        this._step = value;
        this.requestUpdate('step', oldStep);
    }
    /**
     * A value determining how much the value should increase/decrease by Shift+arrow keys,
     * which will be `(max - min) / stepMultiplier`.
     */
    get stepMultiplier() {
        return this._stepMultiplier.toString();
    }
    set stepMultiplier(value) {
        const { stepMultiplier: oldstepMultiplier } = this;
        this._stepMultiplier = value;
        this.requestUpdate('stepMultiplier', oldstepMultiplier);
    }
    _getInputValidity(input) {
        var _a;
        const inputElement = (_a = input === null || input === void 0 ? void 0 : input.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input');
        if (this.invalid) {
            return false;
        }
        if (input === null || input === void 0 ? void 0 : input.invalid) {
            return false;
        }
        if ((inputElement === null || inputElement === void 0 ? void 0 : inputElement.valueAsNumber) > Number(this.max) ||
            (inputElement === null || inputElement === void 0 ? void 0 : inputElement.valueAsNumber) < Number(this.min)) {
            return false;
        }
        return true;
    }
    _getInputWarnigState(input) {
        if ((input === null || input === void 0 ? void 0 : input.valueAsNumber) > Number(input.max) ||
            (input === null || input === void 0 ? void 0 : input.valueAsNumber) < Number(input.min)) {
            return true;
        }
        return false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this._throttledHandlePointermoveImpl) {
            this._throttledHandlePointermoveImpl = throttle(this._handlePointermoveImpl, 10);
        }
    }
    disconnectedCallback() {
        if (this._throttledHandlePointermoveImpl) {
            this._throttledHandlePointermoveImpl.cancel();
            this._throttledHandlePointermoveImpl = null;
        }
        clearTimeout(this.dragCooldownTimeout);
        super.disconnectedCallback();
    }
    updated() {
        var _a;
        const sliderfilledTrack = (_a = this === null || this === void 0 ? void 0 : this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--slider__filled-track`);
        if (sliderfilledTrack) {
            if (this.unstable_valueUpper || this.unstable_valueUpper === '') {
                sliderfilledTrack.style.transform = this.unstable_valueUpper
                    ? `translate(${this._rate * 100}%, -50%) scaleX(${this._rateUpper - this._rate})`
                    : `translate(0%, -50%) scaleX(${this._rate})`;
            }
            else {
                sliderfilledTrack.style.transform = this.unstable_valueUpper
                    ? `translate(${this._rate * 100}%, -50%) scaleX(${this._rateUpper - this._rate})`
                    : `translate(0%, -50%) scaleX(${this._rate})`;
            }
        }
    }
    shouldUpdate(changedProperties) {
        const inputs = this.querySelectorAll(this.constructor.selectorInput);
        inputs.forEach((input, index) => {
            if (changedProperties.has('disabled')) {
                if (input) {
                    input.disabled = this.disabled;
                }
                if (this.disabled) {
                    this._dragging = false;
                }
            }
            if (changedProperties.has('readonly')) {
                if (input) {
                    input.readonly = this.readonly;
                }
                if (this.readonly) {
                    this._dragging = false;
                }
            }
            if (changedProperties.has('invalid')) {
                input.invalid = this.invalid;
            }
            if (changedProperties.has('hideTextInput')) {
                input.hideTextInput = this.hideTextInput;
            }
            if (input) {
                if ((this.unstable_valueUpper || this.unstable_valueUpper === '') &&
                    index > 0) {
                    ['max', 'min', 'step', 'unstable_valueUpper'].forEach((name) => {
                        if (name === 'unstable_valueUpper') {
                            input.value = this.unstable_valueUpper;
                        }
                        else if (name === 'min') {
                            input[name] = this.value;
                        }
                        else {
                            input[name] = this[name];
                        }
                    });
                }
                else {
                    ['max', 'min', 'step', 'value'].forEach((name) => {
                        if (this.unstable_valueUpper && name === 'max') {
                            input[name] = this.unstable_valueUpper;
                        }
                        else {
                            input[name] = this[name];
                        }
                    });
                }
                if (changedProperties.has('value') ||
                    changedProperties.has('invalid') ||
                    changedProperties.has('warn') ||
                    changedProperties.has('readonly')) {
                    this.isValid = this._getInputValidity(input);
                    if (!this.readonly && !this.isValid) {
                        input.invalid = true;
                    }
                    else {
                        input.invalid = false;
                    }
                }
            }
        });
        return true;
    }
    render() {
        const { disabled, formatMaxText, formatMinText, labelText, hideLabel, max, min, maxLabel, minLabel, readonly, invalidText, isValid, warn, warnText, value, unstable_valueUpper, _rate: rate, _rateUpper: rateUpper, _handleClickLabel: handleClickLabel, _handleKeydown: handleKeydown, _handleClick: handleClick, onDrag, _endDrag: endDrag, } = this;
        const isInteractive = !readonly && !disabled;
        const normalizedProps = {
            invalid: isInteractive && !isValid,
            warn: isInteractive && isValid && warn,
        };
        const labelClasses = classMap({
            [`${prefix}--label`]: true,
            [`${prefix}--visually-hidden`]: hideLabel,
            [`${prefix}--label--disabled`]: disabled,
        });
        const sliderClasses = classMap({
            [`${prefix}--slider`]: true,
            [`${prefix}--slider--disabled`]: disabled,
            [`${prefix}--slider--readonly`]: readonly,
        });
        const thumbLowerClasses = classMap({
            [`${prefix}--icon-tooltip`]: unstable_valueUpper || unstable_valueUpper === '',
            [`${prefix}--slider__thumb-wrapper`]: unstable_valueUpper || unstable_valueUpper === '',
            [`${prefix}--slider__thumb-wrapper--lower`]: unstable_valueUpper || unstable_valueUpper === '',
            [`${prefix}--slider__thumb`]: !(unstable_valueUpper || unstable_valueUpper === ''),
            [`${prefix}--slider__thumb-disabled`]: disabled,
        });
        const thumbUpperClasses = classMap({
            [`${prefix}--icon-tooltip`]: true,
            [`${prefix}--slider__thumb-wrapper`]: true,
            [`${prefix}--slider__thumb-wrapper--upper`]: true,
            [`${prefix}--slider__thumb-disabled`]: disabled,
        });
        return html `
      <label class="${labelClasses}" @click="${handleClickLabel}">
        <slot name="label-text">${labelText}</slot>
      </label>
      <div class="${prefix}--slider-container">
        ${unstable_valueUpper || unstable_valueUpper === ''
            ? html ` <slot name="lower-input"></slot>`
            : ''}
        <span class="${prefix}--slider__range-label">
          <slot name="min-text">${formatMinText(min, minLabel)}</slot>
        </span>
        <div
          @keydown="${handleKeydown}"
          @click="${handleClick}"
          @pointerup="${endDrag}"
          @pointerleave="${endDrag}"
          class="${sliderClasses}"
          tabindex="-1"
          role="presentation">
          <div
            id="thumb"
            class="${thumbLowerClasses}"
            role="slider"
            tabindex="${!readonly ? 0 : -1}"
            aria-valuemax="${max}"
            aria-valuemin="${min}"
            aria-valuenow="${value}"
            style="left: ${rate * 100}%"
            @pointerdown="${onDrag}">
            ${(unstable_valueUpper || unstable_valueUpper === '') && !readonly
            ? html `
                  <div class="${prefix}--slider__thumb--lower">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 24"
                      class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower">
                      <path
                        d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z"></path>
                      <path fill="none" d="M-4 0h24v24H-4z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 24"
                      class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower cds-custom--slider__thumb-icon--focus">
                      <path
                        d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z"></path>
                      <path fill="none" d="M-4 0h24v24H-4z"></path>
                      <path d="M15.08 0H16v6.46h-.92z"></path>
                      <path d="M0 0h.92v24H0zM15.08 0H16v24h-.92z"></path>
                      <path d="M0 .92V0h16v.92zM0 24v-.92h16V24z"></path>
                    </svg>
                  </div>
                `
            : ``}
          </div>
          ${(unstable_valueUpper || unstable_valueUpper === '') && !readonly
            ? html `
                <div
                  id="thumb-upper"
                  class="${thumbUpperClasses}"
                  role="slider"
                  tabindex="${!readonly ? 0 : -1}"
                  aria-valuemax="${max}"
                  aria-valuemin="${min}"
                  aria-valuenow="${unstable_valueUpper}"
                  style="left: ${rateUpper * 100}%"
                  @pointerdown="${onDrag}">
                  <div class="${prefix}--slider__thumb--upper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 24"
                      class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper">
                      <path
                        d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z"></path>
                      <path fill="none" d="M-4 0h24v24H-4z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 24"
                      class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper cds-custom--slider__thumb-icon--focus">
                      <path
                        d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z"></path>
                      <path fill="none" d="M-4 0h24v24H-4z"></path>
                      <path d="M.92 24H0v-6.46h.92z"></path>
                      <path d="M16 24h-.92V0H16zM.92 24H0V0h.92z"></path>
                      <path d="M16 23.08V24H0v-.92zM16 0v.92H0V0z"></path>
                    </svg>
                  </div>
                </div>
              `
            : html ``}
          <div id="track" class="${prefix}--slider__track"></div>
          ${unstable_valueUpper || unstable_valueUpper === ''
            ? html ` <div class="${prefix}--slider__filled-track"></div> `
            : html ` <div class="${prefix}-ce--slider__filled-track-container">
                <div class="${prefix}--slider__filled-track"></div>
              </div>`}
        </div>
        <span class="${prefix}--slider__range-label">
          <slot name="max-text">${formatMaxText(max, maxLabel)}</slot>
        </span>
        <slot></slot>
      </div>

      ${normalizedProps.invalid
            ? html `
            <div
              class="${prefix}--slider__validation-msg ${prefix}--slider__validation-msg--invalid ${prefix}--form-requirement">
              ${invalidText}
            </div>
          `
            : null}
      ${normalizedProps.warn
            ? html `<div
            class="${prefix}--slider__validation-msg ${prefix}--form-requirement">
            ${warnText}
          </div>`
            : null}
    `;
    }
    /**
     * A selector that will return the `<input>` box got entering the value directly.
     */
    static get selectorInput() {
        return `${prefix}-slider-input`;
    }
    /**
     * The name of the custom event fired after the value is changed by user gesture.
     */
    static get eventChange() {
        return `${prefix}-slider-changed`;
    }
    /**
     * The name of the custom event fired after the value is changed in `<cds-custom-slider-input>` by user gesture.
     */
    static get eventChangeInput() {
        return `${prefix}-slider-input-changed`;
    }
};
CDSSlider.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSSlider.styles = styles;
__decorate([
    property({ type: Number, attribute: 'value-upper' })
], CDSSlider.prototype, "unstable_valueUpper", void 0);
__decorate([
    query('#thumb')
], CDSSlider.prototype, "_thumbNode", void 0);
__decorate([
    query('#thumb-upper')
], CDSSlider.prototype, "_thumbNodeUpper", void 0);
__decorate([
    query('#track')
], CDSSlider.prototype, "_trackNode", void 0);
__decorate([
    HostListener('document:pointermove')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSSlider.prototype, "_handlePointermove", void 0);
__decorate([
    HostListener('eventChangeInput')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSSlider.prototype, "_handleChangeInput", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSlider.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSlider.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSlider.prototype, "readonly", void 0);
__decorate([
    property({ attribute: 'label-text' })
], CDSSlider.prototype, "labelText", void 0);
__decorate([
    property({ attribute: 'max-label', reflect: true })
], CDSSlider.prototype, "maxLabel", void 0);
__decorate([
    property({ attribute: 'min-label', reflect: true })
], CDSSlider.prototype, "minLabel", void 0);
__decorate([
    property({ attribute: 'hide-label', type: Boolean, reflect: true })
], CDSSlider.prototype, "hideLabel", void 0);
__decorate([
    property({ attribute: false })
], CDSSlider.prototype, "formatMaxText", void 0);
__decorate([
    property({ attribute: false })
], CDSSlider.prototype, "formatMinText", void 0);
__decorate([
    property({ type: Number, reflect: true })
], CDSSlider.prototype, "max", null);
__decorate([
    property({ type: Number, reflect: true })
], CDSSlider.prototype, "min", null);
__decorate([
    property()
], CDSSlider.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSlider.prototype, "invalid", void 0);
__decorate([
    property({ attribute: 'invalid-text' })
], CDSSlider.prototype, "invalidText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSSlider.prototype, "warn", void 0);
__decorate([
    property({ attribute: 'warn-text' })
], CDSSlider.prototype, "warnText", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-text-input', reflect: true })
], CDSSlider.prototype, "hideTextInput", void 0);
__decorate([
    property({ type: Number, reflect: true })
], CDSSlider.prototype, "step", null);
__decorate([
    property({ type: Number, reflect: true, attribute: 'step-multiplier' })
], CDSSlider.prototype, "stepMultiplier", null);
__decorate([
    property({ type: Number })
], CDSSlider.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], CDSSlider.prototype, "isValid", void 0);
CDSSlider = __decorate([
    carbonElement(`${prefix}-slider`)
], CDSSlider);
var CDSSlider$1 = CDSSlider;

export { CDSSlider$1 as default };
//# sourceMappingURL=slider.js.map
