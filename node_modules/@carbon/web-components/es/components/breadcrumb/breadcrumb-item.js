/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './breadcrumb.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Breadcrumb item.
 *
 * @element cds-breadcrumb-item
 */
let CDSBreadcrumbItem = class CDSBreadcrumbItem extends LitElement {
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        if (this.getAttribute('size')) {
            const items = target
                .assignedNodes()
                .filter((node) => node.nodeType === Node.ELEMENT_NODE &&
                node.tagName.toLowerCase() ===
                    `${prefix}-overflow-menu`);
            items.forEach((item) => {
                item.setAttribute('breadcrumb-size', 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                this.getAttribute('size'));
            });
        }
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
        super.connectedCallback();
    }
    render() {
        return html ` <slot @slotchange=${this._handleSlotChange}></slot> `;
    }
};
CDSBreadcrumbItem.styles = styles;
CDSBreadcrumbItem = __decorate([
    carbonElement(`${prefix}-breadcrumb-item`)
], CDSBreadcrumbItem);
var CDSBreadcrumbItem$1 = CDSBreadcrumbItem;

export { CDSBreadcrumbItem$1 as default };
//# sourceMappingURL=breadcrumb-item.js.map
