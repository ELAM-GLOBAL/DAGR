/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { BUTTON_KIND } from './defs.js';
import buttonStyles from './button.scss.js';
import { prefix } from '../../globals/settings.js';
import CDSButtonSetBase from './button-set-base.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Button set.
 *
 * @element cds-custom-button-set
 */
let CDSButtonSet = class CDSButtonSet extends CDSButtonSetBase {
    constructor() {
        super(...arguments);
        /**
         * `true` if the buttons should be stacked. Only applies to the button-set variant.
         */
        this.stacked = false;
        /**
         * When a button within a button-set is focused, hide the margin on both sides
         * of the focused button, by applying the appropriate styles to its sibling
         *
         * @private
         */
        this._hideSiblingMargin = () => {
            var _a;
            const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
            if (!slot)
                return;
            const items = slot
                .assignedElements()
                .filter((el) => el.tagName.toLowerCase() === `${prefix}-button`);
            const focusedIndex = items.findIndex((el) => el.matches(':focus-within'));
            items.forEach((el, idx) => {
                const shouldHide = focusedIndex >= 0 && (idx === focusedIndex || idx === focusedIndex + 1);
                el.toggleAttribute('hide-margin', shouldHide);
            });
        };
    }
    /**
     * Handler for @slotchange, set the first cds-custom-button to kind secondary and primary for the remaining ones
     *
     * @private
     */
    _handleSlotChange(event) {
        const childItems = event.target
            .assignedNodes()
            .filter((elem) => elem.matches !== undefined
            ? elem.matches(this.constructor.selectorItem)
            : false);
        childItems.forEach((elem, index) => {
            elem.setAttribute('kind', index === 0 ? BUTTON_KIND.SECONDARY : BUTTON_KIND.PRIMARY);
        });
        const update = new CustomEvent(`${prefix}-btn-set-update`, {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        this.dispatchEvent(update);
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.addEventListener('focusin', this._hideSiblingMargin);
        this.addEventListener('focusout', this._hideSiblingMargin);
    }
    render() {
        const { stacked } = this;
        const defaultClasses = {
            [`${prefix}--btn-set--stacked`]: stacked,
            [`${prefix}--btn-set`]: true,
        };
        const classes = classMap(defaultClasses);
        return html `<slot class="${classes} @slotchange="${this._handleSlotChange}"></slot>`;
    }
    /**
     * A selector that will return the child items.
     */
    static get selectorItem() {
        return `${prefix}-button`;
    }
};
CDSButtonSet.styles = buttonStyles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSButtonSet.prototype, "stacked", void 0);
CDSButtonSet = __decorate([
    carbonElement(`${prefix}-button-set`)
], CDSButtonSet);
var CDSButtonSet$1 = CDSButtonSet;

export { CDSButtonSet$1 as default };
//# sourceMappingURL=button-set.js.map
