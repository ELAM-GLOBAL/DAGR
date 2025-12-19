/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import styles from './menu-item.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Menu Item.
 *
 * @element cds-menu-item
 */
let CDSmenuItemSelectable = class CDSmenuItemSelectable extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Whether the menu item is selected or not.
         */
        this.selected = false;
        this._handleClick = (e) => {
            this.selected = !this.selected;
            const init = {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    triggeredBy: e.target,
                },
            };
            if (this.dispatchEvent(new CustomEvent(this.constructor.eventOnChange, init))) {
                this.dispatchEvent(new CustomEvent(this.constructor.eventOnChange, init));
            }
        };
        this._handleKeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this._handleClick(e);
            }
        };
    }
    /**
     * The name of the custom event fired when the selection state changes.
     */
    static get eventOnChange() {
        return `${prefix}-item-changed`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this._handleKeydown);
    }
    firstUpdated() {
        var _a;
        const menuItemSelectable = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`${prefix}-menu-item`);
        if (menuItemSelectable) {
            menuItemSelectable.addEventListener('keydown', this._handleKeydown);
        }
        this.context.updateFromChild({ hasSelectableItems: true });
    }
    render() {
        const { label, selected, _handleClick: handleClick } = this;
        return html `
      <cds-menu-item
        label="${label}"
        class="${prefix}--menu-item-selectable--selected"
        role="menuitemcheckbox"
        shortcut=${this.shortcut}
        aria-checked="${selected}"
        @click="${handleClick}">
        <slot slot="render-icon" name="render-icon"></slot>
      </cds-menu-item>
    `;
    }
};
/**
 * Automatically forwards focus to the first focusable element inside the shadow root (helps with focus styles when wrapped in menu-item-group)
 */
CDSmenuItemSelectable.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSmenuItemSelectable.styles = styles;
__decorate([
    consume({ context: MenuContext })
], CDSmenuItemSelectable.prototype, "context", void 0);
__decorate([
    property({ type: String })
], CDSmenuItemSelectable.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], CDSmenuItemSelectable.prototype, "selected", void 0);
__decorate([
    property()
], CDSmenuItemSelectable.prototype, "renderIcon", void 0);
__decorate([
    property()
], CDSmenuItemSelectable.prototype, "shortcut", void 0);
CDSmenuItemSelectable = __decorate([
    carbonElement(`${prefix}-menu-item-selectable`)
], CDSmenuItemSelectable);
var CDSmenuItemSelectable$1 = CDSmenuItemSelectable;

export { CDSmenuItemSelectable$1 as default };
//# sourceMappingURL=menu-item-selectable.js.map
