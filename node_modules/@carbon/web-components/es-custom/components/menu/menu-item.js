/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import styles from './menu-item.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context.js';
import Checkmark16 from '@carbon/icons/es/checkmark/16.js';
import CaretLeft16 from '@carbon/icons/es/caret--left/16.js';
import CaretRight16 from '@carbon/icons/es/caret--right/16.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { MENU_ITEM_KIND, MENU_SIZE } from './defs.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Menu Item.
 *
 * @element cds-custom-menu-item
 */
let CDSmenuItem = class CDSmenuItem extends HostListenerMixin(HostListenerMixin(LitElement)) {
    constructor() {
        var _a;
        super(...arguments);
        this.hoverIntentDelay = 150; // in ms
        /**
         * Whether the menu submen for an item is open or not.
         */
        this.submenuOpen = false;
        this.kind = MENU_ITEM_KIND.DEFAULT;
        /**
         * Menu boundaries.
         */
        this.boundaries = { x: -1, y: -1 };
        this.ariaChecked = (_a = this.getAttribute('selected')) !== null && _a !== void 0 ? _a : 'false';
        /**
         * Checks if document direction is rtl.
         */
        this.isRtl = false;
        /**
         * Checks if document direction is rtl.
         */
        this.hasSubmenu = false;
        this._handleClick = (e) => {
            if (this.hasSubmenu) {
                this._openSubmenu();
            }
            else if (e.type === 'keydown') {
                this.click();
            }
        };
        this._handleMouseEnter = () => {
            this.hoverIntentTimeout = setTimeout(() => {
                this._openSubmenu();
            }, this.hoverIntentDelay);
        };
        this._handleMouseLeave = () => {
            if (this.hoverIntentTimeout) {
                clearTimeout(this.hoverIntentTimeout);
                this._closeSubmenu();
                this.focus();
            }
        };
        this._openSubmenu = () => {
            const { x, y, width, height } = this.getBoundingClientRect();
            if (this.isRtl) {
                this.boundaries = {
                    x: [-x, x - width],
                    y: [y, y + height],
                };
            }
            else {
                this.boundaries = {
                    x: [x, x + width],
                    y: [y, y + height],
                };
            }
            this.submenuOpen = true;
        };
        this._registerSubMenuItems = () => {
            const observer = new MutationObserver((mutationsList) => {
                var _a, _b, _c, _d, _e;
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const submenuSlot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot[name="submenu"]');
                        const item = (_c = (_b = submenuSlot === null || submenuSlot === void 0 ? void 0 : submenuSlot.assignedElements) === null || _b === void 0 ? void 0 : _b.call(submenuSlot)) === null || _c === void 0 ? void 0 : _c[0];
                        if (item) {
                            switch (item.tagName) {
                                case 'CDS-MENU-ITEM-RADIO-GROUP':
                                    this.submenuEntry = item.querySelector(`${prefix}-menu-item`);
                                    break;
                                case 'CDS-MENU-ITEM-GROUP': {
                                    const slotElements = (_e = (_d = item.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('slot')) === null || _e === void 0 ? void 0 : _e.assignedElements();
                                    const firstElement = (slotElements === null || slotElements === void 0 ? void 0 : slotElements.length) && slotElements[0];
                                    this.submenuEntry = firstElement;
                                    break;
                                }
                                case 'CDS-MENU-ITEM':
                                    this.submenuEntry = item;
                                    break;
                            }
                        }
                    }
                }
            });
            observer.observe(this.shadowRoot, {
                childList: true,
                subtree: true,
            });
        };
        this._closeSubmenu = () => {
            var _a, _b;
            this.boundaries = {
                x: -1,
                y: -1,
            };
            this.submenuOpen = false;
            (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--menu-item`)) === null || _b === void 0 ? void 0 : _b.focus();
        };
        this._handleKeyDown = (e) => {
            if (this.hasSubmenu && ['ArrowRight', 'Enter', ' '].includes(e.key)) {
                this._openSubmenu();
                setTimeout(() => {
                    this.submenuEntry.focus();
                });
                e.stopPropagation();
            }
            else if (e.key === 'Enter' || e.key === ' ') {
                this._handleClick(e);
            }
        };
    }
    async dispatchIconDetect() {
        const hasRenderIcon = !!this.querySelector('[slot="render-icon"]');
        if (hasRenderIcon) {
            await undefined; // this is used to replace setTimeout with 0 time out, which is much fater.
            this.dispatchEvent(new CustomEvent('icon-detect', {
                bubbles: true, // Allows event to bubble up the DOM
                composed: true, // Allows event to cross shadow DOM boundary
            }));
        }
    }
    _updateAttributes() {
        if (this.disabled && !this.hasSubmenu) {
            this.setAttribute('aria-disabled', this.disabled);
            this.setAttribute('tabindex', '-1');
        }
        else {
            this.removeAttribute('aria-disabled');
            this.setAttribute('tabindex', '0');
        }
        if (this.hasSubmenu) {
            this.setAttribute('aria-haspopup', this.hasSubmenu + '');
        }
        else {
            this.removeAttribute('aria-haspopup');
        }
        if (this.closest(`${prefix}-menu-item-radio-group`)) {
            this.setAttribute('role', 'menuitemradio');
            this.setAttribute('aria-checked', this.ariaChecked + '');
        }
        else if (!this.getAttribute('role')) {
            this.setAttribute('role', 'menuitem');
        }
    }
    firstUpdated() {
        this.hasSubmenu = !!this.querySelector('[slot="submenu"]');
        this.dispatchIconDetect();
        this.isRtl = document.dir === 'rtl';
        this._registerSubMenuItems();
        this._updateAttributes();
        this.addEventListener(`${prefix}-menu-closed`, () => {
            this.focus();
            this._closeSubmenu();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    updated(_changedProperties) {
        if (this.hasSubmenu) {
            this.setAttribute('aria-expanded', this.hasSubmenu + '');
        }
        else {
            this.removeAttribute('aria-expanded');
        }
        if (this.kind === MENU_ITEM_KIND.DANGER)
            this.classList.toggle(`${prefix}--menu-item--danger`);
    }
    handleClick(event) {
        this._handleClick(event);
    }
    handleMouseEnter() {
        if (this.hasSubmenu) {
            this._handleMouseEnter();
        }
    }
    handleMouseLeave() {
        if (this.hasSubmenu) {
            this._handleMouseLeave();
        }
    }
    handleKeyDown(event) {
        this._handleKeyDown(event);
    }
    render() {
        var _a, _b, _c;
        const { label, shortcut, submenuOpen, boundaries, isRtl } = this;
        const menuClassName = ((_a = this.context) === null || _a === void 0 ? void 0 : _a.hasSelectableItems)
            ? `${prefix}--menu--with-selectable-items`
            : '';
        return html `
      <div class="${prefix}--menu-item__selection-icon">
        ${this.ariaChecked === 'true' ? iconLoader(Checkmark16) : undefined}
      </div>

      <div class="${prefix}--menu-item__icon">
        <slot name="render-icon"></slot>
      </div>
      <div class="${prefix}--menu-item__label">${label}</div>
      ${shortcut && !this.hasSubmenu
            ? html ` <div class="${prefix}--menu-item__shortcut">${shortcut}</div> `
            : html ``}
      ${this.hasSubmenu
            ? html `
            <div class="${prefix}--menu-item__shortcut">
              ${isRtl ? iconLoader(CaretLeft16) : iconLoader(CaretRight16)}
            </div>
            <cds-custom-menu
              className=${menuClassName}
              size=${(_c = (_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('size')) !== null && _c !== void 0 ? _c : MENU_SIZE.LARGE}
              ?isChild="${this.hasSubmenu}"
              label="${label}"
              .open="${submenuOpen}"
              .x="${boundaries.x}"
              .y="${boundaries.y}">
              <slot name="submenu"></slot>
            </cds-custom-menu>
          `
            : html ``}
    `;
    }
};
CDSmenuItem.styles = styles;
__decorate([
    consume({ context: MenuContext })
], CDSmenuItem.prototype, "context", void 0);
__decorate([
    property({ type: String })
], CDSmenuItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], CDSmenuItem.prototype, "shortcut", void 0);
__decorate([
    property({ type: Boolean })
], CDSmenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], CDSmenuItem.prototype, "submenuOpen", void 0);
__decorate([
    property()
], CDSmenuItem.prototype, "kind", void 0);
__decorate([
    property()
], CDSmenuItem.prototype, "boundaries", void 0);
__decorate([
    property({ attribute: 'aria-checked' })
], CDSmenuItem.prototype, "ariaChecked", void 0);
__decorate([
    state()
], CDSmenuItem.prototype, "submenuEntry", void 0);
__decorate([
    state()
], CDSmenuItem.prototype, "isRtl", void 0);
__decorate([
    state()
], CDSmenuItem.prototype, "hasSubmenu", void 0);
__decorate([
    HostListener('click', { capture: true })
], CDSmenuItem.prototype, "handleClick", null);
__decorate([
    HostListener('mouseenter')
], CDSmenuItem.prototype, "handleMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], CDSmenuItem.prototype, "handleMouseLeave", null);
__decorate([
    HostListener('keydown')
], CDSmenuItem.prototype, "handleKeyDown", null);
CDSmenuItem = __decorate([
    carbonElement(`${prefix}-menu-item`)
], CDSmenuItem);
var CDSmenuItem$1 = CDSmenuItem;

export { MENU_ITEM_KIND, MENU_SIZE, CDSmenuItem$1 as default };
//# sourceMappingURL=menu-item.js.map
