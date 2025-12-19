/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { css } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import CDSPopover from '../popover/popover.js';
import '../popover/popover-content.js';
import styles from './tooltip.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Trigger button of tooltip.
 *
 * @element cds-tooltip
 */
let CDSTooltip = class CDSTooltip extends HostListenerMixin(CDSPopover) {
    constructor() {
        super(...arguments);
        /**
         * Specify how the trigger should align with the tooltip
         */
        this.align = 'top';
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoalign = false;
        /**
         * `true` if this tooltip is in a data table row
         */
        this.dataTable = false;
        /**
         * Specify whether the tooltip should be closed when clicked
         */
        this.closeOnActivation = false;
        /**
         * Specify whether the tooltip should be open when it first renders
         */
        this.defaultOpen = false;
        /**
         * Specify the duration in milliseconds to delay before displaying the tooltip
         */
        this.enterDelayMs = 100;
        /**
         * Specify the duration in milliseconds to delay before hiding the tooltip
         */
        this.leaveDelayMs = 300;
        /**
         * Only open tooltip on keyboard interactions, this is used for interactive tags
         * (ie. operational-tag, selectable-tag)
         */
        this.keyboardOnly = false;
        /**
         * Specify the size of the tooltip
         */
        this.size = false;
        /**
         * Specify the timeout reference for the tooltip
         */
        this.timeoutId = 0;
        /**
         * Specify whether the tooltip should be open when it first renders
         */
        this.toolbarAction = false;
        /**
         * Track if last interaction was a keyboard interaction
         */
        this.lastInteractionWasKeyboard = false;
        /**
         * Handles opening of tooltip
         */
        this._showTooltip = async () => {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(async () => {
                var _a;
                this.open = true;
                const { open, updateComplete } = this;
                if (open) {
                    await updateComplete;
                    const { selectorTooltipContent } = this
                        .constructor;
                    (_a = this.querySelector(selectorTooltipContent)) === null || _a === void 0 ? void 0 : _a.focus();
                }
            }, this.enterDelayMs);
        };
        /**
         * Handles `mouseover` event on this element.
         */
        this._handleHover = (event) => {
            if (this.keyboardOnly) {
                if (event instanceof FocusEvent && this.lastInteractionWasKeyboard) {
                    this._showTooltip();
                }
            }
            else {
                this._showTooltip();
            }
        };
        /**
         * Handles `mouseleave` event on this element.
         */
        this._handleHoverOut = async () => {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(async () => {
                const { open } = this;
                if (open) {
                    this.open = false;
                }
            }, this.leaveDelayMs);
        };
        /**
         * Handles `click` event on this element.
         */
        this._handleClick = async () => {
            this.lastInteractionWasKeyboard = false;
            if (this.closeOnActivation) {
                this._handleHoverOut();
            }
        };
        /**
         * Handles `keydown` event on this element.
         */
        this._handleKeydown = async (event) => {
            // needed for interactive tags for when the tag is focused from tabbing into it
            // tooltip is expected to open only from keyboard interaction
            if (event.key === 'Tab') {
                this.lastInteractionWasKeyboard = true;
            }
            if (event.key === ' ' || event.key === 'Enter' || event.key === 'Escape') {
                this.lastInteractionWasKeyboard = true;
                if (this.closeOnActivation) {
                    this._handleHoverOut();
                }
            }
        };
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        const component = target.assignedNodes().filter((node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim() // eslint-disable-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        );
        if (!component[0]) {
            return;
        }
        component[0].addEventListener('focus', this._handleHover);
        component[0].addEventListener('focusout', this._handleHoverOut);
        if (!this.keyboardOnly) {
            component[0].addEventListener('mouseover', this._handleHover);
            component[0].addEventListener('mouseleave', this._handleHoverOut);
        }
        this.requestUpdate();
    }
    connectedCallback() {
        if (!this.hasAttribute('highContrast')) {
            this.setAttribute('highContrast', '');
        }
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        window.addEventListener('keydown', this._handleKeydown, true);
        super.connectedCallback();
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this._handleKeydown, true);
        super.disconnectedCallback();
    }
    updated(changedProperties) {
        var _a, _b;
        const { selectorTooltipContent } = this.constructor;
        const toolTipContent = this.querySelector(selectorTooltipContent);
        if (changedProperties.has('defaultOpen')) {
            this.open = this.defaultOpen;
        }
        if (changedProperties.has('open')) {
            // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
            this.open
                ? toolTipContent === null || toolTipContent === void 0 ? void 0 : toolTipContent.setAttribute('open', '')
                : toolTipContent === null || toolTipContent === void 0 ? void 0 : toolTipContent.removeAttribute('open');
        }
        ['align', 'caret', 'autoalign', 'dropShadow'].forEach((name) => {
            if (changedProperties.has(name)) {
                const { [name]: value } = this;
                toolTipContent[name] = value;
            }
        });
        if (this.hasAttribute('highcontrast')) {
            toolTipContent === null || toolTipContent === void 0 ? void 0 : toolTipContent.setAttribute('highcontrast', '');
        }
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--popover-container`)) === null || _b === void 0 ? void 0 : _b.classList.add(`${prefix}--tooltip`);
        super.updated(changedProperties);
    }
    /**
     * A selector that will return the CDSTooltipContent.
     */
    static get selectorTooltipContent() {
        return `${prefix}-tooltip-content`;
    }
    static get styles() {
        return css `
      ${super.styles}${styles}
    `;
    }
};
__decorate([
    property({ reflect: true, type: String })
], CDSTooltip.prototype, "align", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTooltip.prototype, "autoalign", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'data-table' })
], CDSTooltip.prototype, "dataTable", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], CDSTooltip.prototype, "closeOnActivation", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], CDSTooltip.prototype, "defaultOpen", void 0);
__decorate([
    property({ attribute: 'enter-delay-ms', type: Number })
], CDSTooltip.prototype, "enterDelayMs", void 0);
__decorate([
    property({ attribute: 'leave-delay-ms', type: Number })
], CDSTooltip.prototype, "leaveDelayMs", void 0);
__decorate([
    property({ attribute: 'keyboard-only', type: Boolean })
], CDSTooltip.prototype, "keyboardOnly", void 0);
__decorate([
    property({ reflect: true })
], CDSTooltip.prototype, "size", void 0);
__decorate([
    property({ reflect: true })
], CDSTooltip.prototype, "timeoutId", void 0);
__decorate([
    property({ reflect: true, attribute: 'toolbar-action', type: Boolean })
], CDSTooltip.prototype, "toolbarAction", void 0);
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSTooltip.prototype, "_handleClick", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSTooltip.prototype, "_handleKeydown", void 0);
CDSTooltip = __decorate([
    carbonElement(`${prefix}-tooltip`)
], CDSTooltip);
var CDSTooltip$1 = CDSTooltip;

export { CDSTooltip$1 as default };
//# sourceMappingURL=tooltip.js.map
