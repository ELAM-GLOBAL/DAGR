/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import CDSFloatingMenu from '../floating-menu/floating-menu.js';
import { OVERFLOW_MENU_SIZE, NAVIGATION_DIRECTION } from './defs.js';
import HostListener from '../../globals/decorators/host-listener.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { html } from 'lit';
import { indexOf } from '../../globals/internal/collection-helpers.js';
import { prefix } from '../../globals/settings.js';
import { property } from 'lit/decorators.js';
import styles from './overflow-menu.scss.js';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/defs.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var CDSOverflowMenuBody_1;
/**
 * @param index The index
 * @param length The length of the array.
 * @returns The new index, adjusting overflow/underflow.
 */
const capIndex = (index, length) => {
    if (index < 0) {
        return length - 1;
    }
    if (index >= length) {
        return 0;
    }
    return index;
};
/**
 * Overflow menu body.
 *
 * @element cds-custom-overflow-menu-body
 */
let CDSOverflowMenuBody = CDSOverflowMenuBody_1 = class CDSOverflowMenuBody extends CDSFloatingMenu {
    constructor() {
        super(...arguments);
        /**
         * The menu direction.
         */
        this.direction = FLOATING_MENU_DIRECTION.BOTTOM;
        /**
         * How the menu is aligned to the trigger button.
         */
        this.flipped = false;
        /**
         * `true` if the menu should be open.
         *
         * @private
         */
        this.open = false;
        this.selected = null;
        /**
         * The overflow menu size.
         */
        this.size = OVERFLOW_MENU_SIZE.MEDIUM;
        /**
         * Handles `keydown` event on the menu body.
         */
        this._handleKeydown = async (event) => {
            const { key } = event;
            if (this.open) {
                /**
                 * sets this.selected to focused menu item. the menu item is focused
                 * automatically due to FocusMixin
                 */
                if (this.contains(document.activeElement)) {
                    this.selected = document.activeElement;
                }
                if (key in NAVIGATION_DIRECTION) {
                    event.preventDefault();
                    this._navigate(NAVIGATION_DIRECTION[key]);
                    return;
                }
                if (key === 'Escape') {
                    event.preventDefault();
                    const menuTrigger = this.parent;
                    this.open = false;
                    if (menuTrigger && 'open' in menuTrigger) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        menuTrigger.open = false;
                    }
                    requestAnimationFrame(() => {
                        var _a;
                        const triggerButton = ((_a = menuTrigger === null || menuTrigger === void 0 ? void 0 : menuTrigger.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`button.${prefix}--overflow-menu`)) || (menuTrigger === null || menuTrigger === void 0 ? void 0 : menuTrigger.querySelector(`button.${prefix}--overflow-menu`));
                        if (triggerButton) {
                            triggerButton.focus();
                        }
                    });
                    return;
                }
                const items = this.querySelectorAll(CDSOverflowMenuBody_1.selectorItemEnabled);
                const isInsideMenu = Array.from(items).some((item) => item.contains(document.activeElement));
                if (isInsideMenu) {
                    event.preventDefault();
                    const menuTrigger = this.parent;
                    this.open = false;
                    if (menuTrigger && 'open' in menuTrigger) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        menuTrigger.open = false;
                    }
                    requestAnimationFrame(() => {
                        var _a;
                        const triggerButton = ((_a = menuTrigger === null || menuTrigger === void 0 ? void 0 : menuTrigger.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`button.${prefix}--overflow-menu`)) || (menuTrigger === null || menuTrigger === void 0 ? void 0 : menuTrigger.querySelector(`button.${prefix}--overflow-menu`));
                        if (triggerButton) {
                            triggerButton.focus();
                        }
                    });
                }
            }
        };
    }
    /**
     * @param currentItem The currently selected item.
     * @param direction The navigation direction.
     * @returns The item to be selected.
     */
    _getNextItem(currentItem, direction) {
        const { selectorItemEnabled } = this
            .constructor;
        const menuItems = this.querySelectorAll(selectorItemEnabled);
        const currentIndex = indexOf(menuItems, currentItem);
        const nextIndex = capIndex(currentIndex + direction, menuItems.length);
        return nextIndex === currentIndex ? null : menuItems[nextIndex];
    }
    /**
     * Navigates through overflow menu items.
     *
     * @param direction `-1` to navigate backward, `1` to navigate forward.
     */
    _navigate(direction) {
        if (this.selected) {
            const nextItem = this._getNextItem(this.selected, direction);
            nextItem === null || nextItem === void 0 ? void 0 : nextItem.focus();
        }
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'menu');
        }
        if (!this.hasAttribute('tabindex')) {
            // TODO: Should we use a property?
            this.setAttribute('tabindex', '-1');
        }
        super.connectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('size')) {
            const { selectorMenuItem } = this
                .constructor;
            const menuItems = this.querySelectorAll(selectorMenuItem);
            menuItems.forEach((item) => {
                item.setAttribute('size', this.size);
            });
        }
        super.updated(changedProperties);
    }
    render() {
        return html ` <slot></slot> `;
    }
    /**
     * A selector that will return menu items.
     */
    static get selectorMenuItem() {
        return `${prefix}-overflow-menu-item`;
    }
    /**
     * A selector that will return enabled menu items.
     */
    static get selectorItemEnabled() {
        return `${prefix}-overflow-menu-item:not([disabled])`;
    }
};
CDSOverflowMenuBody.styles = styles;
__decorate([
    property()
], CDSOverflowMenuBody.prototype, "direction", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOverflowMenuBody.prototype, "flipped", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOverflowMenuBody.prototype, "open", void 0);
__decorate([
    property({ reflect: true })
], CDSOverflowMenuBody.prototype, "size", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSOverflowMenuBody.prototype, "_handleKeydown", void 0);
CDSOverflowMenuBody = CDSOverflowMenuBody_1 = __decorate([
    carbonElement(`${prefix}-overflow-menu-body`)
], CDSOverflowMenuBody);
var CDSOverflowMenuBody$1 = CDSOverflowMenuBody;

export { CDSOverflowMenuBody$1 as default };
//# sourceMappingURL=overflow-menu-body.js.map
