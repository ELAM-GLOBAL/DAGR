/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import { state, property } from 'lit/decorators.js';
import styles from './menu.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { classMap } from 'lit/directives/class-map.js';
import { menuDefaultState, MenuContext } from './menu-context.js';
import { provide, consume } from '@lit/context';
import { MENU_SIZE, MENU_BACKGROUND_TOKEN } from './defs.js';

/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let CDSMenu = class CDSMenu extends HostListenerMixin(LitElement) {
    constructor() {
        super(...arguments);
        this.context = Object.assign(Object.assign({}, menuDefaultState), { updateFromChild: (updatedItem) => {
                this.context = Object.assign(Object.assign({}, this.context), updatedItem);
            } });
        this.spacing = 8; // distance to keep to window edges, in px
        /**
         * Items.
         */
        this.items = [];
        /**
         * Active list Items.
         */
        this.activeitems = [];
        /**
         * Parent state.
         */
        this.isChild = false;
        /**
         * Checks if document direction is rtl.
         */
        this.isRtl = false;
        /**
         * Checks if Menu is root menu or not.
         */
        this.isRoot = true;
        /**
         * Document direction.
         */
        this.direction = 'ltr';
        /**
         * Open value for the menu .
         */
        this.open = true;
        /**
         * Position of the Menu .
         */
        this.position = [-1, -1];
        /**
         * Size attribute .
         */
        this.size = MENU_SIZE.SMALL;
        /**
         * Specify the background token to use. Default is 'layer'.
         */
        this.backgroundToken = MENU_BACKGROUND_TOKEN.LAYER;
        /**
         * Specify whether a border should be rendered on the menu
         */
        this.border = false;
        /**
         * Position of the Menu in X axis .
         */
        this.x = 0;
        /**
         * Position of the Menu in Y axis .
         */
        this.y = 0;
        this._handleBlur = (e) => {
            const { isRoot } = this.context;
            // Close the menu if all of the following are met:
            // * The menu is open
            // * The focusout event is on the root menu
            // * Focus is moving outside the menu
            if (this.open && isRoot && !this.contains(e.relatedTarget)) {
                this.dispatchCloseEvent(e);
            }
        };
        this._handleKeyDown = (e) => {
            const { isRoot } = this.context;
            e.stopPropagation();
            // if the user presses escape or this is a submenu
            // and the user presses ArrowLeft, close it
            if (e.key === 'Escape' || (!isRoot && e.key === 'ArrowLeft')) {
                this.dispatchCloseEvent(e);
            }
            else {
                // Prevent scrolling when navigating menu items
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                }
                this._focusItem(e);
            }
        };
        this._focusItem = (e) => {
            var _a, _b, _c;
            let currentItem;
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName) !== 'CDS-MENU') {
                const shadowRootActiveEl = this._findActiveElementInShadowRoot(document);
                currentItem = this.activeitems.findIndex((activeItem) => {
                    var _a;
                    return (shadowRootActiveEl == activeItem.item ||
                        ((_a = activeItem.item.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) === shadowRootActiveEl);
                });
            }
            else {
                currentItem = 0;
            }
            let indexToFocus = currentItem;
            // if currentItem is -1, no menu item is focused yet.
            // in this case, the first item should receive focus.
            if (currentItem === -1) {
                indexToFocus = 0;
            }
            else if (e) {
                if (e.key === 'ArrowUp') {
                    indexToFocus = indexToFocus - 1;
                }
                if (e.key === 'ArrowDown') {
                    indexToFocus = indexToFocus + 1;
                }
            }
            if (indexToFocus < 0) {
                indexToFocus = this.activeitems.length - 1;
            }
            if (indexToFocus >= this.activeitems.length) {
                indexToFocus = 0;
            }
            if (indexToFocus !== currentItem) {
                (_c = (_b = this.activeitems[indexToFocus]) === null || _b === void 0 ? void 0 : _b.item) === null || _c === void 0 ? void 0 : _c.focus();
            }
        };
        this._findActiveElementInShadowRoot = (shadowRoot) => {
            if (shadowRoot === null)
                return null;
            let activeElement = shadowRoot.activeElement;
            while (activeElement &&
                activeElement.shadowRoot &&
                activeElement.shadowRoot.activeElement) {
                activeElement = activeElement.shadowRoot.activeElement;
            }
            return activeElement;
        };
        this._notEmpty = (value) => {
            return value !== null && value !== undefined;
        };
        this._fitValue = (range, axis) => {
            var _a;
            const { isRoot } = this.context;
            // const isRoot =  false
            const menuElement = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--menu`);
            const { width, height } = (menuElement !== null && menuElement !== void 0 ? menuElement : this).getBoundingClientRect();
            const alignment = isRoot ? 'vertical' : 'horizontal';
            const axes = {
                x: {
                    max: window.innerWidth,
                    size: width,
                    anchor: alignment === 'horizontal' ? range[1] : range[0],
                    reversedAnchor: alignment === 'horizontal' ? range[0] : range[1],
                    offset: 0,
                },
                y: {
                    max: window.innerHeight,
                    size: height,
                    anchor: alignment === 'horizontal' ? range[0] : range[1],
                    reversedAnchor: alignment === 'horizontal' ? range[1] : range[0],
                    offset: isRoot ? 0 : 4, // top padding in menu, used to align the menu items
                },
            };
            // Avoid that the Menu render incorrectly when the postion is set in the right side of the screen
            if (this.actionButtonWidth &&
                this.actionButtonWidth < axes.x.size &&
                (this.menuAlignment === 'bottom' || this.menuAlignment === 'top')) {
                axes.x.size = this.actionButtonWidth;
            }
            // if 'axes.x.anchor' is lower than 87px dynamically switch render side
            if (this.actionButtonWidth &&
                (this.menuAlignment === 'bottom-end' ||
                    this.menuAlignment === 'top-end') &&
                axes.x.anchor >= 87 &&
                this.actionButtonWidth < axes.x.size) {
                const diff = axes.x.anchor + axes.x.reversedAnchor;
                axes.x.anchor = axes.x.anchor + diff;
            }
            const { max, size, anchor, reversedAnchor, offset } = axes[axis];
            // get values for different scenarios, set to false if they don't work
            const options = [
                // towards max (preferred)
                max - this.spacing - size - anchor >= 0 ? anchor - offset : false,
                // towards min / reversed (first fallback)
                reversedAnchor - size >= 0 ? reversedAnchor - size + offset : false,
                // align at max (second fallback)
                max - this.spacing - size,
            ];
            const topAlignment = this.menuAlignment === 'top' ||
                this.menuAlignment === 'top-end' ||
                this.menuAlignment === 'top-start';
            // If the tooltip is not visible in the top, switch to the bototm
            if (typeof options[0] === 'number' &&
                topAlignment &&
                options[0] >= 0 &&
                !options[1] &&
                axis === 'y') {
                this.style.transform = 'translate(0)';
            }
            else if (topAlignment && !options[0] && axis === 'y') {
                options[0] = anchor - offset;
            }
            // Previous array `options`, has at least one item that is a number (the last one - second fallback).
            // That guarantees that the return of `find()` will always be a number
            // and we can safely add the numeric casting `as number`.
            const bestOption = options.find((option) => option !== false);
            return bestOption >= this.spacing ? bestOption : this.spacing;
        };
        this._getPosition = (x) => {
            if (Array.isArray(x)) {
                // has to be of length 2
                const filtered = x.filter(this._notEmpty);
                if (filtered.length === 2) {
                    return filtered;
                }
                else {
                    return;
                }
            }
            else {
                return [x, x];
            }
        };
        this._calculatePosition = () => {
            var _a, _b;
            const ranges = {
                x: this._getPosition(this.x),
                y: this._getPosition(this.y),
            };
            if (!ranges.x || !ranges.y) {
                return [-1, -1];
            }
            return [
                (_a = this._fitValue(ranges.x, 'x')) !== null && _a !== void 0 ? _a : -1,
                (_b = this._fitValue(ranges.y, 'y')) !== null && _b !== void 0 ? _b : -1,
            ];
        };
        this._handleOpen = async () => {
            const pos = this._calculatePosition();
            if (this.isRtl) {
                this.style.insetInlineStart = `initial`;
                this.style.insetInlineEnd = `${pos[0]}px`;
            }
            else {
                this.style.insetInlineStart = `${pos[0]}px`;
                this.style.insetInlineEnd = `initial`;
            }
            this.style.insetBlockStart = `${pos[1]}px`;
            this.position = pos;
            await this.updateComplete;
            this._registerMenuItems();
            this._setActiveItems();
            const init = {
                bubbles: true,
                cancelable: true,
                composed: true,
            };
            if (this.dispatchEvent(new CustomEvent(this.constructor.eventOnOpen, init))) {
                this.dispatchEvent(new CustomEvent(this.constructor.eventOnOpen, init));
            }
        };
        this.dispatchCloseEvent = (e) => {
            const init = {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    triggeredBy: e.target,
                },
            };
            if (this.dispatchEvent(new CustomEvent(this.constructor.eventOnClose, init))) {
                this.dispatchEvent(new CustomEvent(this.constructor.eventOnClose, init));
            }
        };
        this._newContextCreate = () => {
            this.context = Object.assign(Object.assign({}, this.context), { isRoot: false, size: this.size });
        };
        this._registerMenuItems = () => {
            var _a, _b;
            let items;
            if (this.isChild) {
                items = this.querySelector('slot[name="submenu"]').assignedElements();
            }
            else {
                items = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot')) === null || _b === void 0 ? void 0 : _b.assignedElements();
            }
            this.items = items === null || items === void 0 ? void 0 : items.filter((item) => {
                if (item.tagName === 'CDS-MENU-ITEM') {
                    return !item.disabled;
                }
                return item.tagName !== 'CDS-MENU-ITEM-DIVIDER';
            });
        };
        this._setActiveItems = () => {
            var _a, _b, _c;
            this.activeitems = [];
            (_a = this.items) === null || _a === void 0 ? void 0 : _a.map((item) => {
                var _a, _b, _c;
                let activeItem;
                switch (item.tagName) {
                    case 'CDS-MENU-ITEM-RADIO-GROUP': {
                        const slotElements = item.querySelectorAll(`${prefix}-menu-item`);
                        if (slotElements === null || slotElements === void 0 ? void 0 : slotElements.length) {
                            for (const entry of slotElements.entries()) {
                                activeItem = {
                                    item: entry[1],
                                    parent: item,
                                };
                                this.activeitems = [...this.activeitems, activeItem];
                            }
                        }
                        break;
                    }
                    case 'CDS-MENU-ITEM-GROUP': {
                        const slotElements = (_b = (_a = item.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot')) === null || _b === void 0 ? void 0 : _b.assignedElements();
                        slotElements === null || slotElements === void 0 ? void 0 : slotElements.map((el) => {
                            activeItem = {
                                item: el,
                                parent: el,
                            };
                            this.activeitems = [...this.activeitems, activeItem];
                        });
                        break;
                    }
                    case 'CDS-MENU-ITEM-SELECTABLE': {
                        activeItem = {
                            item: (_c = item.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`${prefix}-menu-item`),
                            parent: item,
                        };
                        this.activeitems = [...this.activeitems, activeItem];
                        break;
                    }
                    default: {
                        activeItem = {
                            item: item,
                            parent: null,
                        };
                        this.activeitems = [...this.activeitems, activeItem];
                    }
                }
            });
            const activeEl = (_c = (_b = this.activeitems[0]) === null || _b === void 0 ? void 0 : _b.item) !== null && _c !== void 0 ? _c : document.activeElement;
            activeEl.focus();
        };
    }
    /**
     * The name of the custom event fired when the the Menu should be closed.
     */
    static get eventOnClose() {
        return `${prefix}-menu-closed`;
    }
    /**
     * The name of the custom event fired when the the Menu should be opened.
     */
    static get eventOnOpen() {
        return `${prefix}-menu-opened`;
    }
    updated(changedProperties) {
        if (changedProperties.has('open') && this.open) {
            this._handleOpen();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('icon-detect', () => {
            var _a, _b;
            (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.cds--menu')) === null || _b === void 0 ? void 0 : _b.classList.add(`${prefix}--menu--with-icons`);
        });
    }
    async firstUpdated() {
        var _a;
        this.isRtl = this.direction === 'rtl';
        this.isRoot = this.context.isRoot;
        if (this.isChild) {
            this._newContextCreate();
        }
        await this.updateComplete;
        this._registerMenuItems();
        this._setActiveItems();
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        slot === null || slot === void 0 ? void 0 : slot.addEventListener('slotchange', () => {
            this._registerMenuItems();
            this._setActiveItems();
        });
    }
    render() {
        const { open, menuAlignment, label, position, _handleKeyDown: handleKeyDown, } = this;
        const menuClasses = classMap({
            [`${prefix}--menu`]: true,
            [`${prefix}--menu--${this.size}`]: this.size,
            [`${prefix}--menu--box-shadow-top`]: menuAlignment && menuAlignment.slice(0, 3) === 'top',
            [`${prefix}--menu--open`]: open,
            [`${prefix}--menu--shown`]: position[0] >= 0 && position[1] >= 0,
            [`${prefix}--menu--with-selectable-items`]: this.context.hasSelectableItems,
            [`${prefix}--menu--border`]: this.border,
            [`${prefix}--menu--background-token__background`]: this.backgroundToken === MENU_BACKGROUND_TOKEN.BACKGROUND,
        });
        return html `
      <ul
        class="${menuClasses}"
        aria-label="${label}"
        tabindex="-1"
        @keydown="${handleKeyDown}"
        role="menu">
        <slot></slot>
      </ul>
    `;
    }
};
CDSMenu.styles = styles;
__decorate([
    provide({ context: MenuContext }),
    consume({ context: MenuContext })
], CDSMenu.prototype, "context", void 0);
__decorate([
    state()
], CDSMenu.prototype, "items", void 0);
__decorate([
    state()
], CDSMenu.prototype, "activeitems", void 0);
__decorate([
    property({ type: String })
], CDSMenu.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], CDSMenu.prototype, "isChild", void 0);
__decorate([
    property()
], CDSMenu.prototype, "actionButtonWidth", void 0);
__decorate([
    property({ type: Boolean })
], CDSMenu.prototype, "isRtl", void 0);
__decorate([
    property({ type: Boolean })
], CDSMenu.prototype, "isRoot", void 0);
__decorate([
    property({ type: String })
], CDSMenu.prototype, "direction", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSMenu.prototype, "open", void 0);
__decorate([
    property({ type: HTMLElement })
], CDSMenu.prototype, "focusreturn", void 0);
__decorate([
    property()
], CDSMenu.prototype, "position", void 0);
__decorate([
    property({ attribute: true })
], CDSMenu.prototype, "size", void 0);
__decorate([
    property()
], CDSMenu.prototype, "mode", void 0);
__decorate([
    property({ type: String, attribute: 'background-token' })
], CDSMenu.prototype, "backgroundToken", void 0);
__decorate([
    property({ type: Boolean })
], CDSMenu.prototype, "border", void 0);
__decorate([
    property({ type: String })
], CDSMenu.prototype, "menuAlignment", void 0);
__decorate([
    property()
], CDSMenu.prototype, "x", void 0);
__decorate([
    property()
], CDSMenu.prototype, "y", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSMenu.prototype, "_handleBlur", void 0);
CDSMenu = __decorate([
    carbonElement(`${prefix}-menu`)
], CDSMenu);
var CDSMenu$1 = CDSMenu;

export { MENU_SIZE, CDSMenu$1 as default };
//# sourceMappingURL=menu.js.map
