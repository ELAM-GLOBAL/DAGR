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
import { selectorTabbable, prefix } from '../../globals/settings.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { MODAL_SIZE } from './defs.js';
import styles from './modal.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Modal.
 *
 * @element cds-modal
 * @csspart dialog The dialog.
 * @fires cds-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires cds-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 */
let CDSModal = class CDSModal extends HostListenerMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * The element that had focus before this modal gets open.
         */
        this._launcher = null;
        /**
         * Handles `click` event on this element.
         *
         * @param event The event.
         */
        this._handleClick = (event) => {
            if (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            event.composedPath().indexOf(this.shadowRoot) < 0 &&
                !this.preventCloseOnClickOutside) {
                this._handleUserInitiatedClose(event.target);
            }
        };
        /**
         * Handle the keydown event.
         * Trap the focus inside the side-panel by tracking keydown.key == `Tab`
         *
         * @param {KeyboardEvent} event The keyboard event object.
         */
        this._handleHostKeydown = (event) => {
            var _a;
            if (event.key === 'Tab') {
                const { first: _firstElement, last: _lastElement } = this.getFocusable();
                if (event.shiftKey &&
                    (((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) === _firstElement ||
                        document.activeElement === _firstElement)) {
                    event.preventDefault();
                    _lastElement === null || _lastElement === void 0 ? void 0 : _lastElement.focus();
                }
                else if (!event.shiftKey && document.activeElement === _lastElement) {
                    event.preventDefault();
                    _firstElement === null || _firstElement === void 0 ? void 0 : _firstElement.focus();
                }
            }
        };
        this._handleKeydown = ({ key, target }) => {
            if (key === 'Esc' || key === 'Escape') {
                this._handleUserInitiatedClose(target);
            }
        };
        /**
         * Specify whether the Modal is displaying an alert, error or warning.
         * Should go hand in hand with the danger prop.
         */
        this.alert = false;
        /**
         * Specify text for the accessibility label of the header
         */
        this.ariaLabel = '';
        /**
         * The additional CSS class names for the container <div> of the element.
         */
        this.containerClass = '';
        /**
         * Specify whether or not the Modal content should have any inner padding.
         */
        this.fullWidth = false;
        /**
         * Specify whether the modal contains scrolling content
         */
        this.hasScrollingContent = false;
        /**
         * `true` if the modal should be open.
         */
        this.open = false;
        /**
         * Modal size.
         */
        this.size = MODAL_SIZE.MEDIUM;
        /**
         * Prevent closing on click outside of modal
         */
        this.preventCloseOnClickOutside = false;
        /**
         * Prevent the modal from closing after clicking the close button
         */
        this.preventClose = false;
    }
    /**
     * Get focusable elements.
     *
     * Querying all tabbable items.
     *
     * @returns {{first: HTMLElement, last: HTMLElement, all: HTMLElement[]}} Returns an object with various elements.
     */
    getFocusable() {
        const elements = [];
        // Add tabbable elements inside light DOM
        const tabbableItems = this.querySelectorAll(selectorTabbable);
        if (tabbableItems === null || tabbableItems === void 0 ? void 0 : tabbableItems.length) {
            elements.push(...tabbableItems);
        }
        // Flatten NodeList arrays and filter for focusable items
        const all = elements === null || elements === void 0 ? void 0 : elements.filter((el) => typeof (el === null || el === void 0 ? void 0 : el.focus) === 'function');
        return {
            first: all[0],
            last: all[all.length - 1],
            all,
        };
    }
    /**
     * Handles `click` event on the modal container.
     *
     * @param event The event.
     */
    _handleClickContainer(event) {
        if (event.target.matches(this.constructor.selectorCloseButton) &&
            !this.preventClose) {
            this._handleUserInitiatedClose(event.target);
        }
    }
    /**
     * Handles user-initiated close request of this modal.
     *
     * @param triggeredBy The element that triggered this close request.
     */
    _handleUserInitiatedClose(triggeredBy) {
        if (this.open) {
            const init = {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    triggeredBy,
                },
            };
            if (this.dispatchEvent(new CustomEvent(this.constructor.eventBeforeClose, init))) {
                this.open = false;
                this.dispatchEvent(new CustomEvent(this.constructor.eventClose, init));
            }
        }
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange() {
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        this.querySelector(`${prefix}-modal-footer`)
            ? this.setAttribute('has-footer', '')
            : this.removeAttribute('has-footer');
    }
    firstUpdated() {
        const body = this.querySelector(this.constructor.selectorModalBody);
        if (!body) {
            const bodyElement = document.createElement(this.constructor.selectorModalBody);
            this.appendChild(bodyElement);
        }
    }
    render() {
        const { alert, ariaLabel, size, hasScrollingContent } = this;
        const containerClass = this.containerClass
            .split(' ')
            .filter(Boolean)
            .reduce((acc, item) => (Object.assign(Object.assign({}, acc), { [item]: true })), {});
        const containerClasses = classMap(Object.assign({ [`${prefix}--modal-container`]: true, [`${prefix}--modal-container--${size}`]: size }, containerClass));
        return html `
      <div
        aria-label=${ariaLabel}
        part="dialog"
        class=${containerClasses}
        role="${alert ? 'alert' : 'dialog'}"
        tabindex="-1"
        @click=${this._handleClickContainer}>
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${hasScrollingContent
            ? html ` <div class="cds--modal-content--overflow-indicator"></div> `
            : ``}
      </div>
    `;
    }
    async updated(changedProperties) {
        if (changedProperties.has('open')) {
            if (this.open) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                this._launcher = this.ownerDocument.activeElement;
                const primaryFocusNode = this.querySelector(this.constructor.selectorPrimaryFocus);
                await this.constructor._delay();
                if (primaryFocusNode) {
                    // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
                    // where its first update/render cycle that makes it focusable happens after `<cds-modal>`'s first update/render cycle
                    primaryFocusNode.focus();
                }
                else {
                    const { first } = this.getFocusable();
                    first === null || first === void 0 ? void 0 : first.focus();
                }
            }
            else if (this._launcher &&
                typeof this._launcher.focus === 'function') {
                this._launcher.focus();
                this._launcher = null;
            }
        }
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
     * A selector selecting buttons that should close this modal.
     */
    static get selectorCloseButton() {
        return `[data-modal-close],${prefix}-modal-close-button`;
    }
    /**
     * A selector selecting tabbable nodes.
     */
    static get selectorTabbable() {
        return selectorTabbable;
    }
    /**
     * A selector selecting the nodes that should be focused when modal gets open.
     */
    static get selectorPrimaryFocus() {
        return `[data-modal-primary-focus],${prefix}-modal-footer ${prefix}-button[kind="primary"]`;
    }
    /**
     * A selector selecting the modal body component
     */
    static get selectorModalBody() {
        return `${prefix}-modal-body`;
    }
    /**
     * The name of the custom event fired before this modal is being closed upon a user gesture.
     * Cancellation of this event stops the user-initiated action of closing this modal.
     */
    static get eventBeforeClose() {
        return `${prefix}-modal-beingclosed`;
    }
    /**
     * The name of the custom event fired after this modal is closed upon a user gesture.
     */
    static get eventClose() {
        return `${prefix}-modal-closed`;
    }
};
CDSModal.styles = styles;
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSModal.prototype, "_handleClick", void 0);
__decorate([
    HostListener('keydown')
], CDSModal.prototype, "_handleHostKeydown", void 0);
__decorate([
    HostListener('document:keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSModal.prototype, "_handleKeydown", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSModal.prototype, "alert", void 0);
__decorate([
    property({ attribute: 'aria-label' })
], CDSModal.prototype, "ariaLabel", void 0);
__decorate([
    property({ attribute: 'container-class' })
], CDSModal.prototype, "containerClass", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'full-width' })
], CDSModal.prototype, "fullWidth", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true,
        attribute: 'has-scrolling-content',
    })
], CDSModal.prototype, "hasScrollingContent", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSModal.prototype, "open", void 0);
__decorate([
    property({ reflect: true })
], CDSModal.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
], CDSModal.prototype, "preventCloseOnClickOutside", void 0);
__decorate([
    property({ type: Boolean, attribute: 'prevent-close' })
], CDSModal.prototype, "preventClose", void 0);
CDSModal = __decorate([
    carbonElement(`${prefix}-modal`)
], CDSModal);
var CDSModal$1 = CDSModal;

export { MODAL_SIZE, CDSModal$1 as default };
//# sourceMappingURL=modal.js.map
