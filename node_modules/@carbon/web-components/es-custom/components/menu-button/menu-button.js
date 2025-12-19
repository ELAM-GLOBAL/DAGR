/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import styles from './menu-button.scss.js';
import '../button/button.js';
import '../button/button-set.js';
import '../button/button-skeleton.js';
import '../menu/menu.js';
import '../menu/menu-item.js';
import '../menu/menu-item-divider.js';
import '../menu/menu-item-group.js';
import '../menu/menu-item-selectable.js';
import '../menu/menu-item-radio-group.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import { POPOVER_ALIGNMENT } from '../popover/defs.js';
import { MENU_BUTTON_KIND, MENU_BUTTON_SIZE } from './defs.js';
import { MENU_BACKGROUND_TOKEN } from '../menu/defs.js';
import FloatingController from '../../globals/controllers/floating-controller.js';

/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Menu button.
 * @element cds-custom-menu-button
 */
let CDSMenuButton = class CDSMenuButton extends HostListenerMixin(LitElement) {
    constructor() {
        super(...arguments);
        this._menuController = new FloatingController(this);
        this._open = false;
        /**
         * Specify the type of button to be used as the base for the trigger button.
         */
        this.kind = MENU_BUTTON_KIND.PRIMARY;
        /**
         * Experimental property. Specify how the menu should align with the button element
         */
        this.menuAlignment = POPOVER_ALIGNMENT.BOTTOM;
        /**
         * Specify whether the menu should have a border.
         */
        this.menuBorder = false;
        /**
         * Specify the background token to use for the menu. Default is 'layer'.
         */
        this.menuBackgroundToken = MENU_BACKGROUND_TOKEN.LAYER;
        /**
         * Specify the size of the button and menu.
         */
        this.size = MENU_BUTTON_SIZE.LARGE;
        /**
         * Specify the tabIndex of the button.
         */
        this.tabIndex = 0;
        this._handleClick = (event) => {
            const path = event.composedPath();
            if (path.includes(this._triggerNode)) {
                this._open = !this._open;
            }
            else if (this._open) {
                this._open = false;
            }
        };
        this._handleBlur = ({ relatedTarget }) => {
            // Close the menu if the focus moves outside the menu button or menu
            if (!this.contains(relatedTarget)) {
                this._open = false;
            }
        };
    }
    updated(changedProperties) {
        const menu = this.querySelector(`${prefix}-menu`);
        if (changedProperties.has('_open') ||
            changedProperties.has('menuAlignment')) {
            this.updateComplete.then(() => {
                var _a;
                const styleElement = (_a = menu.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--menu`);
                menu.open = this._open;
                this._menuController.setPlacement({
                    trigger: this._triggerNode,
                    target: menu,
                    alignment: this.menuAlignment,
                    styleElement,
                    matchWidth: true,
                    open: this._open,
                });
            });
        }
        if (changedProperties.has('size')) {
            menu.setAttribute('size', this.size);
        }
        if (changedProperties.has('menuBorder')) {
            menu.toggleAttribute('border', this.menuBorder);
        }
        if (changedProperties.has('menuBackgroundToken')) {
            menu.backgroundToken = this.menuBackgroundToken;
        }
    }
    render() {
        const { kind, size, disabled, tabIndex, label } = this;
        return html `
      <cds-custom-button
        kind=${kind}
        size=${size}
        ?disabled=${disabled}
        tab-index=${tabIndex}>
        ${label} ${iconLoader(ChevronDown16, { slot: 'icon' })}
      </cds-custom-button>
      <slot></slot>
    `;
    }
};
CDSMenuButton.styles = styles;
__decorate([
    query(`${prefix}-button`)
], CDSMenuButton.prototype, "_triggerNode", void 0);
__decorate([
    query(`${prefix}-menu`)
], CDSMenuButton.prototype, "_menuNode", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSMenuButton.prototype, "_open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSMenuButton.prototype, "disabled", void 0);
__decorate([
    property({ type: MENU_BUTTON_KIND, reflect: true })
], CDSMenuButton.prototype, "kind", void 0);
__decorate([
    property({ type: String })
], CDSMenuButton.prototype, "label", void 0);
__decorate([
    property({ reflect: true, type: String, attribute: 'menu-alignment' })
], CDSMenuButton.prototype, "menuAlignment", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'menu-border' })
], CDSMenuButton.prototype, "menuBorder", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'menu-background-token' })
], CDSMenuButton.prototype, "menuBackgroundToken", void 0);
__decorate([
    property({ type: MENU_BUTTON_SIZE, reflect: true })
], CDSMenuButton.prototype, "size", void 0);
__decorate([
    property({ type: Number, attribute: 'tab-index', reflect: true })
], CDSMenuButton.prototype, "tabIndex", void 0);
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSMenuButton.prototype, "_handleClick", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSMenuButton.prototype, "_handleBlur", void 0);
CDSMenuButton = __decorate([
    carbonElement(`${prefix}-menu-button`)
], CDSMenuButton);
var CDSMenuButton$1 = CDSMenuButton;

export { MENU_BUTTON_KIND, MENU_BUTTON_SIZE, CDSMenuButton$1 as default };
//# sourceMappingURL=menu-button.js.map
