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
import styles from './list.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * List item.
 *
 * @element cds-custom-list-item
 * @slot nested - The nested child list.
 */
let CDSListItem = class CDSListItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * `true` if this list item is a child of a nested list.
         * `<cds-custom-ordered-list>` or `<cds-custom-unordered-list>` automatically sets this property.
         */
        this.nested = false;
    }
    connectedCallback() {
        // Uses attribute for lookup from child
        this.toggleAttribute('nested', Boolean(this.closest(this.constructor.selectorNestedList)));
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
        super.connectedCallback();
    }
    render() {
        return html `
      <slot></slot>
      <slot name="nested"></slot>
    `;
    }
    /**
     * A selector that will return nested list.
     */
    static get selectorNestedList() {
        return `${prefix}-ordered-list[slot="nested"],${prefix}-unordered-list[slot="nested"]`;
    }
};
CDSListItem.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSListItem.prototype, "nested", void 0);
CDSListItem = __decorate([
    carbonElement(`${prefix}-list-item`)
], CDSListItem);
var CDSListItem$1 = CDSListItem;

export { CDSListItem$1 as default };
//# sourceMappingURL=list-item.js.map
