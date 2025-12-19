/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import HostListener from '../../globals/decorators/host-listener.js';
import FocusMixin from '../../globals/mixins/focus.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import RadioGroupManager, { NAVIGATION_DIRECTION } from '../../globals/internal/radio-group-manager.js';
import { RADIO_BUTTON_ORIENTATION, RADIO_BUTTON_LABEL_POSITION } from './defs.js';
import styles from './radio-button.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Map of navigation direction by key for horizontal alignment.
 */
const navigationDirectionForKeyHorizontal = {
    ArrowLeft: NAVIGATION_DIRECTION.BACKWARD,
    Left: NAVIGATION_DIRECTION.BACKWARD, // IE
    ArrowRight: NAVIGATION_DIRECTION.FORWARD,
    Right: NAVIGATION_DIRECTION.FORWARD, // IE
};
/**
 * Map of navigation direction by key for vertical alignment.
 */
const navigationDirectionForKeyVertical = {
    ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
    Up: NAVIGATION_DIRECTION.BACKWARD, // IE
    ArrowDown: NAVIGATION_DIRECTION.FORWARD,
    Down: NAVIGATION_DIRECTION.FORWARD, // IE
};
/**
 * The interface for `RadioGroupManager` for radio button.
 */
class RadioButtonDelegate {
    constructor(radio) {
        this._radio = radio;
    }
    get checked() {
        return this._radio.checked;
    }
    set checked(checked) {
        const { host } = this._radio.getRootNode();
        const { eventChange } = host.constructor;
        host.checked = checked;
        this._radio.tabIndex = checked ? 0 : -1;
        host.dispatchEvent(new CustomEvent(eventChange, {
            bubbles: true,
            composed: true,
            detail: {
                checked,
                value: this._radio.value,
                name: this._radio.name,
            },
        }));
    }
    get tabIndex() {
        return this._radio.tabIndex;
    }
    set tabIndex(tabIndex) {
        this._radio.tabIndex = tabIndex;
    }
    get name() {
        return this._radio.name;
    }
    get disabled() {
        return this._radio.disabled;
    }
    compareDocumentPosition(other) {
        return this._radio.compareDocumentPosition(other._radio);
    }
    focus() {
        this._radio.focus();
    }
}
/**
 * Radio button.
 *
 * @element cds-radio-button
 * @fires cds-radio-button-changed - The custom event fired after this radio button changes its checked state.
 */
let CDSRadioButton = class CDSRadioButton extends HostListenerMixin(FocusMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * The radio group manager associated with the radio button.
         */
        this._manager = null;
        /**
         * Handles `click` event on this element.
         */
        this._handleClick = (event) => {
            var _a, _b;
            if (!event.target.matches((_a = this.constructor) === null || _a === void 0 ? void 0 : _a.aiLabelItem) &&
                !event.target.matches((_b = this.constructor) === null || _b === void 0 ? void 0 : _b.slugItem)) {
                const { disabled, _radioButtonDelegate: radioButtonDelegate, readOnly, } = this;
                if (readOnly) {
                    event.preventDefault();
                    return;
                }
                if (radioButtonDelegate && !disabled && !this.disabledItem) {
                    this.checked = true;
                    if (this._manager) {
                        this._manager.select(radioButtonDelegate, this.readOnly);
                    }
                    this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            checked: this.checked,
                            value: this.value,
                            name: this.name,
                            event,
                        },
                    }));
                }
                this.dispatchEvent(new CustomEvent(this.constructor.eventChange, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        checked: this.checked,
                        value: this.value,
                        name: this.name,
                        event,
                    },
                }));
            }
        };
        /**
         * Handles `keydown` event on this element.
         */
        this._handleKeydown = (event) => {
            var _a, _b;
            if (!event.target.matches((_a = this.constructor) === null || _a === void 0 ? void 0 : _a.aiLabelItem) &&
                !event.target.matches((_b = this.constructor) === null || _b === void 0 ? void 0 : _b.slugItem)) {
                const { orientation, _radioButtonDelegate: radioButtonDelegate, disabled, disabledItem, readOnly, } = this;
                const manager = this._manager;
                if (readOnly) {
                    event.preventDefault();
                    return;
                }
                if (radioButtonDelegate && manager && !disabled && !disabledItem) {
                    const navigationDirectionForKey = orientation === RADIO_BUTTON_ORIENTATION.HORIZONTAL
                        ? navigationDirectionForKeyHorizontal
                        : navigationDirectionForKeyVertical;
                    const navigationDirection = navigationDirectionForKey[event.key];
                    if (navigationDirection) {
                        manager.select(manager.navigate(radioButtonDelegate, navigationDirection), this.readOnly);
                    }
                    if (event.key === ' ' || event.key === 'Enter') {
                        manager.select(radioButtonDelegate, this.readOnly);
                    }
                }
            }
        };
        /**
         * `true` if there is an AI Label.
         */
        this._hasAILabel = false;
        /**
         * `true` if this radio button should be checked.
         */
        this.checked = false;
        /**
         * `true` if the radio button is used in a data table
         */
        this.dataTable = false;
        /**
         * Specify whether the `<radio-button>` should be checked by default
         */
        this.defaultChecked = false;
        /**
         * `true` if the radio button item should be disabled.
         */
        this.disabledItem = false;
        /**
         * `true` if the radio button group should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if the label should be hidden.
         */
        this.hideLabel = false;
        /**
         * Specify if the currently value is invalid.
         */
        this.invalid = false;
        /**
         * Specify whether the control is currently in warning state
         */
        this.warn = false;
        /**
         * Provide the text that is displayed when the control is in warning state
         */
        this.warnText = '';
        /**
         * The label position.
         */
        this.labelPosition = RADIO_BUTTON_LABEL_POSITION.RIGHT;
        /**
         * The label text.
         */
        this.labelText = '';
        /**
         * The orientation to lay out radio buttons.
         */
        this.orientation = RADIO_BUTTON_ORIENTATION.HORIZONTAL;
        /**
         * `true` if the radio button group should be disabled.
         */
        this.readOnly = false;
        /**
         * `true` if the radio button is required.
         */
        this.required = false;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        const hasContent = target
            .assignedNodes()
            .filter((elem) => elem.matches !== undefined
            ? elem.matches(this.constructor.aiLabelItem) ||
                // remove reference to slug in v12
                elem.matches(this.constructor.slugItem)
            : false);
        this._hasAILabel = Boolean(hasContent);
        const type = hasContent[0].getAttribute('kind');
        hasContent[0].setAttribute('size', type === 'inline' ? 'md' : 'mini');
        this.requestUpdate();
    }
    disconnectedCallback() {
        if (this._manager) {
            this._manager.delete(this._radioButtonDelegate);
        }
        super.disconnectedCallback();
    }
    firstUpdated() {
        this._radioButtonDelegate = new RadioButtonDelegate(this._inputNode);
        // If user hasn’t explicitly set `checked`, respect `defaultChecked`
        if (this.defaultChecked && this.checked === false) {
            this.checked = true;
        }
    }
    updated(changedProperties) {
        const { _hasAILabel: hasAILabel, _inputNode: inputNode, _radioButtonDelegate: radioButtonDelegate, name, disabled, disabledItem, readOnly, invalid, warn, } = this;
        // Normalize input props similar to useNormalizedInputProps in React
        const normalizedProps = {
            invalid: !readOnly && !disabled && !disabledItem && invalid,
            warn: !readOnly && !disabled && !disabledItem && !invalid && warn,
        };
        if (changedProperties.has('checked') || changedProperties.has('name')) {
            if (!this._manager) {
                this._manager = RadioGroupManager.get(this.getRootNode({ composed: true }));
            }
            const { _manager: manager } = this;
            if (changedProperties.has('name')) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                manager.delete(radioButtonDelegate, changedProperties.get('name'));
                if (name) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                    manager.add(radioButtonDelegate);
                }
            }
            // Disabled items should have tabIndex -1.
            inputNode.setAttribute('tabindex', !name ||
                !manager ||
                this.disabled ||
                this.disabledItem ||
                !manager.shouldBeFocusable(radioButtonDelegate)
                ? '-1'
                : '0');
        }
        // Handle validation states based on normalized props
        if (changedProperties.has('invalid') ||
            changedProperties.has('warn') ||
            changedProperties.has('disabled') ||
            changedProperties.has('disabledItem') ||
            changedProperties.has('readOnly')) {
            // Apply normalized validation states
            if (normalizedProps.invalid) {
                this.setAttribute('invalid', '');
                this.removeAttribute('warn');
            }
            else if (normalizedProps.warn) {
                this.setAttribute('warn', '');
                this.removeAttribute('invalid');
            }
            else {
                this.removeAttribute('invalid');
                this.removeAttribute('warn');
            }
        }
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        hasAILabel
            ? this.setAttribute('ai-label', '')
            : this.removeAttribute('ai-label');
    }
    render() {
        const { checked, hideLabel, labelText, name, value, disabled, disabledItem, readOnly, invalid, warn, } = this;
        // Normalize input props similar to useNormalizedInputProps in React
        const normalizedProps = {
            invalid: !readOnly && !disabled && !disabledItem && invalid,
            warn: !readOnly && !disabled && !disabledItem && !invalid && warn,
        };
        const innerLabelClasses = classMap({
            [`${prefix}--radio-button__label-text`]: true,
            [`${prefix}--visually-hidden`]: hideLabel,
        });
        return html `
      <input
        id="radio"
        type="radio"
        class="${prefix}--radio-button"
        .checked=${checked}
        ?disabled="${disabledItem || disabled}"
        ?required=${this.required}
        aria-readonly="${String(Boolean(readOnly))}"
        name=${ifDefined(name)}
        value=${ifDefined(value)} />
      <label
        for="input"
        class="${prefix}--radio-button__label ${normalizedProps.invalid
            ? `${prefix}--radio-button__label--invalid`
            : ''} ${normalizedProps.warn
            ? `${prefix}--radio-button__label--warn`
            : ''}">
        <span class="${prefix}--radio-button__appearance"></span>
        <span class="${innerLabelClasses}">
          <slot> ${labelText} </slot>
          <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="slug" @slotchange="${this._handleSlotChange}"></slot
        ></span>
      </label>
    `;
    }
    /**
     * A selector that will return the slug item.
     *
     * remove in v12
     */
    static get slugItem() {
        return `${prefix}-slug`;
    }
    /**
     * A selector that will return the AI Label item.
     */
    static get aiLabelItem() {
        return `${prefix}-ai-label`;
    }
    /**
     * The name of the custom event fired after this radio button changes its checked state.
     */
    static get eventChange() {
        return `${prefix}-radio-button-changed`;
    }
};
CDSRadioButton.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSRadioButton.styles = styles;
__decorate([
    query('input')
], CDSRadioButton.prototype, "_inputNode", void 0);
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSRadioButton.prototype, "_handleClick", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSRadioButton.prototype, "_handleKeydown", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'data-table' })
], CDSRadioButton.prototype, "dataTable", void 0);
__decorate([
    property({ type: Boolean, attribute: 'default-checked' })
], CDSRadioButton.prototype, "defaultChecked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "disabledItem", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-label' })
], CDSRadioButton.prototype, "hideLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "warn", void 0);
__decorate([
    property({ attribute: 'warn-text' })
], CDSRadioButton.prototype, "warnText", void 0);
__decorate([
    property({ reflect: true, attribute: 'label-position' })
], CDSRadioButton.prototype, "labelPosition", void 0);
__decorate([
    property({ attribute: 'label-text' })
], CDSRadioButton.prototype, "labelText", void 0);
__decorate([
    property()
], CDSRadioButton.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], CDSRadioButton.prototype, "orientation", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "readOnly", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSRadioButton.prototype, "required", void 0);
__decorate([
    property()
], CDSRadioButton.prototype, "value", void 0);
CDSRadioButton = __decorate([
    carbonElement(`${prefix}-radio-button`)
], CDSRadioButton);
var CDSRadioButton$1 = CDSRadioButton;

export { RADIO_BUTTON_LABEL_POSITION, CDSRadioButton$1 as default };
//# sourceMappingURL=radio-button.js.map
