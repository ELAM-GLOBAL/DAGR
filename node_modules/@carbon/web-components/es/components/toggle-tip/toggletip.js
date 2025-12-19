/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import Information16 from '@carbon/icons/es/information/16.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import FocusMixin from '../../globals/mixins/focus.js';
import { POPOVER_ALIGNMENT } from '../popover/defs.js';
import FloatingController from '../../globals/controllers/floating-controller.js';
import styles from './toggletip.scss.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var CDSToggletip_1;
/**
 * Definition tooltip.
 *
 * @element cds-toggletip
 */
let CDSToggletip = CDSToggletip_1 = class CDSToggletip extends HostListenerMixin(FocusMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * Create popover controller instance
         */
        this.popoverController = new FloatingController(this);
        /**
         * How the tooltip is aligned to the trigger button.
         */
        this.alignment = POPOVER_ALIGNMENT.TOP;
        /**
         * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
         */
        this.alignmentAxisOffset = 0;
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoalign = false;
        /**
         * The label for the toggle button
         */
        this.buttonLabel = 'Show information';
        /**
         * Set whether toggletip is open
         */
        this.open = false;
        /**
         * Set whether toggletip is open by default.
         */
        this.defaultOpen = false;
        /**
         * Handles `keydown` event on this element.
         */
        this._handleKeydown = async (event) => {
            if (event.key === 'Escape') {
                this.open = false;
            }
        };
        this._renderToggleTipLabel = () => {
            return html `
      <span class="${prefix}--toggletip-label">
        <slot></slot>
      </span>
    `;
        };
        this._renderTooltipButton = () => {
            return html `
      <button
        aria-controls="${this.id}"
        aria-label="${this.buttonLabel}"
        class="${prefix}--toggletip-button"
        @click=${this._handleClick}>
        <slot name="trigger"
          >${iconLoader(Information16, { id: 'trigger' })}
        </slot>
      </button>
    `;
        };
        this._renderTooltipContent = () => {
            return this.autoalign
                ? html `
          <span class="${prefix}--popover-content">
            <div class="${prefix}--toggletip-content">
              <slot name="body-text"></slot>
              <div class="${prefix}--toggletip-actions">
                <slot
                  name="actions"
                  @slotchange="${this._handleActionsSlotChange}"></slot>
              </div>
            </div>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `
                : html `
          <span class="${prefix}--popover">
            <span class="${prefix}--popover-content">
              <div class="${prefix}--toggletip-content">
                <slot name="body-text"></slot>
                <div class="${prefix}--toggletip-actions">
                  <slot
                    name="actions"
                    @slotchange="${this._handleActionsSlotChange}"></slot>
                </div>
              </div>
            </span>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `;
        };
        this._renderInnerContent = () => {
            return html `
      ${this._renderTooltipButton()} ${this._renderTooltipContent()}
    `;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.defaultOpen && !this.hasAttribute('open')) {
            this.open = true;
        }
    }
    /**
     * Handles `slotchange` event.
     */
    _handleActionsSlotChange({ target }) {
        const hasContent = target.assignedNodes();
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        hasContent
            ? this.setAttribute('has-actions', '')
            : this.removeAttribute('has-actions');
    }
    _handleClick() {
        this.open = !this.open;
    }
    /**
     * Handles `blur` event handler on the document this element is in.
     *
     * @param event The event.
     */
    _handleFocusOut(event) {
        if (this.contains(event.relatedTarget)) {
            return;
        }
        if (this._deepShadowContains(this, event.relatedTarget)) {
            return;
        }
        this.open = false;
    }
    _deepShadowContains(root, el) {
        if (!(el instanceof Node)) {
            return false;
        }
        if (el === root) {
            return true;
        }
        return this._deepShadowContains(root, el.assignedSlot ||
            el.parentNode ||
            el.getRootNode().host ||
            null);
    }
    updated() {
        var _a, _b, _c, _d;
        if (this.autoalign) {
            // auto align functionality with @floating-ui/dom library
            const button = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(CDSToggletip_1.selectorToggletipButton);
            const tooltip = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(CDSToggletip_1.selectorToggletipContent);
            const arrowElement = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(CDSToggletip_1.selectorToggletipCaret);
            if (button && tooltip) {
                // Ensure toggletip is visible when rendered in a large scrollable container (storybook parity)
                button.scrollIntoView({ block: 'center', inline: 'center' });
                (_d = this.popoverController) === null || _d === void 0 ? void 0 : _d.setPlacement({
                    trigger: button,
                    target: tooltip,
                    arrowElement: arrowElement,
                    caret: true,
                    flipArguments: { fallbackAxisSideDirection: 'start' },
                    alignment: this.alignment,
                    open: this.open,
                    alignmentAxisOffset: this.alignmentAxisOffset,
                });
            }
        }
    }
    render() {
        const { alignment, open } = this;
        const classes = classMap({
            [`${prefix}--popover-container`]: true,
            [`${prefix}--popover--caret`]: true,
            [`${prefix}--popover--high-contrast`]: true,
            [`${prefix}--popover--open`]: open,
            [`${prefix}--popover--${alignment}`]: alignment,
            [`${prefix}--toggletip`]: true,
            [`${prefix}--toggletip--open`]: open,
        });
        return html `
      ${this._renderToggleTipLabel()}
      <span class="${classes}"> ${this._renderInnerContent()} </span>
    `;
    }
    /**
     * A selector that will return the toggletip content.
     */
    static get selectorToggletipContent() {
        return `.${prefix}--popover-content`;
    }
    /**
     * A selector that will return the toggletip caret.
     */
    static get selectorToggletipCaret() {
        return `.${prefix}--popover-caret`;
    }
    /**
     * A selector that will return the trigger element.
     */
    static get selectorToggletipButton() {
        return `.${prefix}--toggletip-button`;
    }
};
CDSToggletip.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSToggletip.styles = styles;
__decorate([
    property({ reflect: true })
], CDSToggletip.prototype, "alignment", void 0);
__decorate([
    property({ type: Number, attribute: 'alignment-axis-offset' })
], CDSToggletip.prototype, "alignmentAxisOffset", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSToggletip.prototype, "autoalign", void 0);
__decorate([
    property({ attribute: 'button-label' })
], CDSToggletip.prototype, "buttonLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSToggletip.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, attribute: 'default-open' })
], CDSToggletip.prototype, "defaultOpen", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSToggletip.prototype, "_handleKeydown", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSToggletip.prototype, "_handleFocusOut", null);
CDSToggletip = CDSToggletip_1 = __decorate([
    carbonElement(`${prefix}-toggletip`)
], CDSToggletip);
var CDSToggleTip = CDSToggletip;

export { CDSToggleTip as default };
//# sourceMappingURL=toggletip.js.map
