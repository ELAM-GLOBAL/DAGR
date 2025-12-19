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
import styles from './combo-button.scss.js';
import '../button/button.js';
import '../button/button-set.js';
import '../button/button-skeleton.js';
import '../menu/menu.js';
import '../menu/menu-item.js';
import '../menu/menu-item-divider.js';
import '../menu/menu-item-group.js';
import '../menu/menu-item-selectable.js';
import '../menu/menu-item-radio-group.js';
import '../icon-button/icon-button.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import { COMBO_BUTTON_SIZE } from './defs.js';
export { COMBO_BUTTON_TOOLTIP_ALIGNMENT } from './defs.js';
import { POPOVER_ALIGNMENT } from '../popover/defs.js';
import { ICON_BUTTON_TOOLTIP_ALIGNMENT } from '../icon-button/defs.js';
import FloatingController from '../../globals/controllers/floating-controller.js';

/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Combo button.
 * @element cds-custom-combo-button
 */
let CDSComboButton = class CDSComboButton extends HostListenerMixin(LitElement) {
    constructor() {
        super(...arguments);
        this._menuController = new FloatingController(this);
        this._open = false;
        /**
         * Experimental property. Specify how the menu should align with the button element
         */
        this.menuAlignment = POPOVER_ALIGNMENT.TOP;
        /**
         * Specify the size of the button and menu.
         */
        this.size = COMBO_BUTTON_SIZE.LARGE;
        /**
         * Specify how the trigger tooltip should be aligned.
         */
        this.tooltipAlignment = ICON_BUTTON_TOOLTIP_ALIGNMENT.TOP;
        /**
         * Provide the tooltip content for the icon button.
         */
        this.tooltipContent = 'Additional actions';
        this._handleClick = (event) => {
            var _a;
            const path = event.composedPath();
            if (path.includes(this._triggerNode)) {
                this._open = !this._open;
            }
            else if (this._open) {
                this._open = false;
            }
            if (event.target.tagName === 'CDS-MENU-ITEM') {
                (_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this, event);
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
                    trigger: this,
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
    }
    render() {
        const { size, disabled, label, tooltipAlignment, menuAlignment, onClick } = this;
        return html `
      <cds-custom-button size=${size} ?disabled=${disabled} @click=${onClick}>
        ${label}
      </cds-custom-button>
      <cds-custom-icon-button
        size=${size}
        ?disabled=${disabled}
        align=${tooltipAlignment}
        menu-alignment=${menuAlignment}
        part="trigger">
        ${iconLoader(ChevronDown16, { slot: 'icon' })}
        <span slot="tooltip-content">${this.tooltipContent}</span>
      </cds-custom-icon-button>
      <slot></slot>
    `;
    }
};
CDSComboButton.styles = styles;
__decorate([
    query(`${prefix}-icon-button`)
], CDSComboButton.prototype, "_triggerNode", void 0);
__decorate([
    query(`${prefix}-menu`)
], CDSComboButton.prototype, "_menuNode", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSComboButton.prototype, "_open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSComboButton.prototype, "disabled", void 0);
__decorate([
    property()
], CDSComboButton.prototype, "label", void 0);
__decorate([
    property({ reflect: true, type: String, attribute: 'menu-alignment' })
], CDSComboButton.prototype, "menuAlignment", void 0);
__decorate([
    property({ type: Function })
], CDSComboButton.prototype, "onClick", void 0);
__decorate([
    property({ type: COMBO_BUTTON_SIZE, reflect: true })
], CDSComboButton.prototype, "size", void 0);
__decorate([
    property({ reflect: true, attribute: 'tooltip-alignment' })
], CDSComboButton.prototype, "tooltipAlignment", void 0);
__decorate([
    property({ type: String, attribute: 'tooltip-content' })
], CDSComboButton.prototype, "tooltipContent", void 0);
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSComboButton.prototype, "_handleClick", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSComboButton.prototype, "_handleBlur", void 0);
CDSComboButton = __decorate([
    carbonElement(`${prefix}-combo-button`)
], CDSComboButton);
var CDSComboButton$1 = CDSComboButton;

export { COMBO_BUTTON_SIZE, CDSComboButton$1 as default };
//# sourceMappingURL=combo-button.js.map
