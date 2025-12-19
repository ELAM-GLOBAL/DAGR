/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import CheckmarkFilled20 from '@carbon/icons/es/checkmark--filled/20.js';
import InformationFilled20 from '@carbon/icons/es/information--filled/20.js';
import InformationSquareFilled20 from '@carbon/icons/es/information--square--filled/20.js';
import WarningFilled20 from '@carbon/icons/es/warning--filled/20.js';
import WarningAltFilled20 from '@carbon/icons/es/warning--alt--filled/20.js';
import ErrorFilled20 from '@carbon/icons/es/error--filled/20.js';
import { property, query } from 'lit/decorators.js';
import { prefix, selectorTabbable } from '../../globals/settings.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { NOTIFICATION_KIND, NOTIFICATION_TYPE } from './defs.js';
import CDSInlineNotification from './inline-notification.js';
import styles from './actionable-notification.scss.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';

var CDSActionableNotification_1;
/**
 * The default icons, keyed by notification kind.
 */
const iconsForKinds = {
    [NOTIFICATION_KIND.SUCCESS]: CheckmarkFilled20,
    [NOTIFICATION_KIND.INFO]: InformationFilled20,
    [NOTIFICATION_KIND.INFO_SQUARE]: InformationSquareFilled20,
    [NOTIFICATION_KIND.WARNING]: WarningFilled20,
    [NOTIFICATION_KIND.WARNING_ALT]: WarningAltFilled20,
    [NOTIFICATION_KIND.ERROR]: ErrorFilled20,
};
const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;
/**
 * Tries to focus on the given elements and bails out if one of them is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems, reverse = false) {
    var _a, _b;
    if (!reverse) {
        for (let i = 0; i < elems.length; ++i) {
            const elem = elems[i];
            elem.focus();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            const active = elem.ownerDocument.activeElement;
            if (active === elem ||
                (active === null || active === void 0 ? void 0 : active.contains(elem)) ||
                ((_a = active === null || active === void 0 ? void 0 : active.shadowRoot) === null || _a === void 0 ? void 0 : _a.contains(elem))) {
                return true;
            }
        }
    }
    else {
        for (let i = elems.length - 1; i >= 0; --i) {
            const elem = elems[i];
            elem.focus();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            const active = elem.ownerDocument.activeElement;
            if (active === elem ||
                (active === null || active === void 0 ? void 0 : active.contains(elem)) ||
                ((_b = active === null || active === void 0 ? void 0 : active.shadowRoot) === null || _b === void 0 ? void 0 : _b.contains(elem))) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Actionable notification.
 *
 * @element cds-custom-actionable-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @fires cds-custom-notification-beingclosed
 *   The custom event fired before this notification is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this notification.
 * @fires cds-custom-notification-closed - The custom event fired after this notification is closed upon a user gesture.
 */
let CDSActionableNotification = CDSActionableNotification_1 = class CDSActionableNotification extends HostListenerMixin(CDSInlineNotification) {
    constructor() {
        super(...arguments);
        this._type = NOTIFICATION_TYPE.ACTIONABLE;
        /**
         * Inline notification type.
         */
        this.inline = false;
        /**
         * Pass in the action button label that will be rendered within the ActionableNotification.
         */
        this.actionButtonLabel = '';
        /**
         * Specify if pressing the escape key should close notifications
         */
        this.closeOnEscape = true;
        /**
         * Specify if focus should be moved to the component when the notification contains actions
         */
        this.hasFocus = true;
        /**
         * Handles `keydown` event on this event.
         * Escape will close the notification if `closeOnEscape` is true
         */
        this._handleKeyDown = async (event) => {
            const { key } = event;
            if (this.closeOnEscape && key === 'Escape') {
                this.open = false;
            }
        };
        this._handleBlur = async ({ target, relatedTarget }) => {
            var _a, _b;
            const { open, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode, } = this;
            const oldContains = target !== this &&
                (this.contains(target) ||
                    (((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.contains(target)) &&
                        target !== startSentinelNode &&
                        target !== endSentinelNode));
            const currentContains = relatedTarget !== this &&
                (this.contains(relatedTarget) ||
                    (((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.contains(relatedTarget)) &&
                        relatedTarget !== startSentinelNode &&
                        relatedTarget !== endSentinelNode));
            // Performs focus wrapping if _all_ of the following is met:
            // * This notification is open
            // * Notification role attribute is set to 'alertdialog'
            // * The viewport still has focus
            // * Notification body used to have focus but no longer has focus
            const { selectorTabbable: selectorTabbableForActionableNotification } = this
                .constructor;
            if (open &&
                this.getAttribute('role') === 'alertdialog' &&
                relatedTarget &&
                !(relatedTarget instanceof CDSActionableNotification_1) &&
                oldContains &&
                !currentContains) {
                const comparisonResult = target.compareDocumentPosition(relatedTarget);
                // tabbable elements in Shadow root
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                const shadowElems = this.shadowRoot.querySelectorAll(selectorTabbableForActionableNotification);
                // tabbable elements in light DOM
                const lightElems = this.querySelectorAll(selectorTabbableForActionableNotification);
                if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
                    await this.constructor._delay();
                    if (!tryFocusElems(shadowElems, true) &&
                        !tryFocusElems(lightElems, true) &&
                        relatedTarget !== this) {
                        this.focus();
                    }
                }
                else if (relatedTarget === endSentinelNode ||
                    comparisonResult & FOLLOWING) {
                    await this.constructor._delay();
                    if (!tryFocusElems(lightElems) &&
                        !tryFocusElems(shadowElems)) {
                        this.focus();
                    }
                }
            }
        };
        /**
         * The caption.
         */
        this.caption = '';
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'alertdialog');
        }
        super.connectedCallback();
    }
    _renderIcon() {
        const { kind, inline } = this;
        const IconComponent = iconsForKinds[kind];
        return !IconComponent
            ? undefined
            : iconLoader(IconComponent, {
                class: `${prefix}--${inline ? 'inline' : 'toast'}-notification__icon`,
            });
    }
    _renderText() {
        const { caption, subtitle, title, _type: type } = this;
        return html `
      <div class="${prefix}--${type}-notification__text-wrapper">
        <div class="${prefix}--${type}-notification__content">
          <div class="${prefix}--${type}-notification__title">
            ${title}<slot name="title"></slot>
          </div>
          <div class="${prefix}--${type}-notification__subtitle">
            ${subtitle}<slot name="subtitle"></slot>
          </div>
          ${caption &&
            html `<div class="${prefix}--${type}-notification__caption">
            ${caption}<slot name="caption"></slot>
          </div>`}
          <slot></slot>
        </div>
      </div>
    `;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const button = this.querySelector(this.constructor
            .selectorActionButton);
        if (changedProperties.has('inline')) {
            button === null || button === void 0 ? void 0 : button.setAttribute('kind', this.inline ? 'ghost' : 'tertiary');
        }
        if (changedProperties.has('lowContrast')) {
            if (this.lowContrast) {
                button === null || button === void 0 ? void 0 : button.setAttribute('low-contrast', 'true');
            }
            else {
                button === null || button === void 0 ? void 0 : button.removeAttribute('low-contrast');
            }
        }
        if (changedProperties.has('hideCloseButton')) {
            if (this.hideCloseButton) {
                button === null || button === void 0 ? void 0 : button.setAttribute('hide-close-button', 'true');
            }
            else {
                button === null || button === void 0 ? void 0 : button.removeAttribute('hide-close-button');
            }
        }
        if (changedProperties.has('hasFocus')) {
            if (this.hasFocus) {
                this.focus();
            }
        }
    }
    render() {
        const { _type: type } = this;
        return html `
      <a
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <div class="${prefix}--${type}-notification__details">
        ${this._renderIcon()} ${this._renderText()}
      </div>
      <slot name="action"></slot>
      ${this._renderButton()}
      <a
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
    }
    /**
     * @param ms The number of milliseconds.
     * @returns A promise that is resolves after the given milliseconds.
     */
    static _delay(ms = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    /**
     * A selector selecting tabbable nodes.
     */
    static get selectorTabbable() {
        return selectorTabbable;
    }
    /**
     * A selector that will return the action button element
     */
    static get selectorActionButton() {
        return `${prefix}-actionable-notification-button`;
    }
};
CDSActionableNotification.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSActionableNotification.prototype, "inline", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'action-button-label' })
], CDSActionableNotification.prototype, "actionButtonLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'close-on-escape' })
], CDSActionableNotification.prototype, "closeOnEscape", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-focus' })
], CDSActionableNotification.prototype, "hasFocus", void 0);
__decorate([
    query('#start-sentinel')
], CDSActionableNotification.prototype, "_startSentinelNode", void 0);
__decorate([
    query('#end-sentinel')
], CDSActionableNotification.prototype, "_endSentinelNode", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSActionableNotification.prototype, "_handleKeyDown", void 0);
__decorate([
    HostListener('shadowRoot:focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSActionableNotification.prototype, "_handleBlur", void 0);
__decorate([
    property()
], CDSActionableNotification.prototype, "caption", void 0);
CDSActionableNotification = CDSActionableNotification_1 = __decorate([
    carbonElement(`${prefix}-actionable-notification`)
], CDSActionableNotification);
var CDSActionableNotification$1 = CDSActionableNotification;

export { CDSActionableNotification$1 as default, iconsForKinds };
//# sourceMappingURL=actionable-notification.js.map
