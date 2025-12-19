/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import CDSButton from '../button/button.js';
import HostListener from '../../globals/decorators/host-listener.js';
import styles from './header.scss.js';
import { prefix } from '../../globals/settings.js';
import { BUTTON_TOOLTIP_POSITION, BUTTON_KIND, BUTTON_SIZE } from '../button/defs.js';

/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Header global action button
 *
 * @element cds-custom-header-global-action
 */
let CDSHeaderGlobalAction = class CDSHeaderGlobalAction extends CDSButton {
    constructor() {
        super(...arguments);
        this._handleDocumentClick = (event) => {
            const path = event.composedPath();
            this._handlePanelCloseIfFocusOutside(path);
        };
        this._handleDocumentFocusIn = (event) => {
            const path = event.composedPath();
            this._handlePanelCloseIfFocusOutside(path);
        };
    }
    connectedCallback() {
        this.tooltipPosition = BUTTON_TOOLTIP_POSITION.BOTTOM;
        this.kind = BUTTON_KIND.GHOST;
        this.size = BUTTON_SIZE.LARGE;
        super.connectedCallback();
    }
    firstUpdated() {
        document.addEventListener('click', this._handleDocumentClick, true);
        document.addEventListener('focusin', this._handleDocumentFocusIn, true);
    }
    disconnectedCallback() {
        document.removeEventListener('click', this._handleDocumentClick, true);
        document.removeEventListener('focusin', this._handleDocumentFocusIn, true);
        super.disconnectedCallback();
    }
    _handlePanelCloseIfFocusOutside(path) {
        var _a;
        const panel = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.panelId}`);
        const isInside = path.some((el) => el instanceof HTMLElement && ((panel === null || panel === void 0 ? void 0 : panel.contains(el)) || this.contains(el)));
        if (panel && !isInside) {
            panel.removeAttribute('expanded');
            this.active = false;
        }
    }
    _handleFocusOut(event) {
        var _a;
        const panel = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.panelId}`);
        const relatedTarget = event.relatedTarget;
        if (panel &&
            relatedTarget &&
            !this.contains(relatedTarget) &&
            !panel.contains(relatedTarget)) {
            panel.removeAttribute('expanded');
            this.active = false;
        }
    }
    _handleClick(event) {
        var _a;
        const { disabled } = this;
        if (disabled) {
            event.stopPropagation();
        }
        else {
            const panel = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.panelId}`);
            // see if there is related panel for header-global-action button first
            // and then set the expanded attr of it accordingly
            if (panel) {
                const expanded = panel.getAttribute('expanded');
                if (expanded) {
                    panel.removeAttribute('expanded');
                }
                else {
                    panel.setAttribute('expanded', 'true');
                }
                const active = !this.active;
                this.active = active;
            }
        }
    }
    _handleKeyDown(event) {
        var _a;
        const { key } = event;
        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            this._handleClick(event);
        }
        else if (key === 'Escape') {
            const panel = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.panelId}`);
            if (panel) {
                panel.removeAttribute('expanded');
            }
            this.active = false;
        }
    }
    updated() {
        if (this._buttonNode) {
            this._buttonNode.classList.add(`${prefix}--header__action`);
        }
    }
    shouldUpdate(changedProperties) {
        if (changedProperties.has('active')) {
            if (this.active) {
                this._buttonNode.classList.add(`${prefix}--header__action--active`);
                if (this.buttonLabelActive) {
                    this.tooltipText = this.buttonLabelActive;
                }
            }
            else {
                this._buttonNode.classList.remove(`${prefix}--header__action--active`);
                if (this.buttonLabelInactive) {
                    this.tooltipText = this.buttonLabelInactive;
                }
            }
        }
        return true;
    }
};
CDSHeaderGlobalAction.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSHeaderGlobalAction.styles = styles;
__decorate([
    query('button')
], CDSHeaderGlobalAction.prototype, "_buttonNode", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSHeaderGlobalAction.prototype, "active", void 0);
__decorate([
    property({ type: String, attribute: 'panel-id', reflect: true })
], CDSHeaderGlobalAction.prototype, "panelId", void 0);
__decorate([
    property({ attribute: 'button-label-active' })
], CDSHeaderGlobalAction.prototype, "buttonLabelActive", void 0);
__decorate([
    property({ attribute: 'button-label-inactive' })
], CDSHeaderGlobalAction.prototype, "buttonLabelInactive", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSHeaderGlobalAction.prototype, "_handleFocusOut", null);
__decorate([
    HostListener('click', { capture: true })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSHeaderGlobalAction.prototype, "_handleClick", null);
__decorate([
    HostListener('keydown', { capture: true })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSHeaderGlobalAction.prototype, "_handleKeyDown", null);
CDSHeaderGlobalAction = __decorate([
    carbonElement(`${prefix}-header-global-action`)
], CDSHeaderGlobalAction);
var CDSHeaderGlobalAction$1 = CDSHeaderGlobalAction;

export { CDSHeaderGlobalAction$1 as default };
//# sourceMappingURL=header-global-action.js.map
