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
import styles from './data-table.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Table toolbar.
 *
 * @element cds-table-toolbar
 */
let CDSTableToolbar = class CDSTableToolbar extends LitElement {
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'toolbar');
        }
        super.connectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('size')) {
            const toolbarContent = this.querySelector(this.constructor.selectorToolbarContent);
            const batchActions = this.querySelector(this.constructor.selectorBatchActions);
            if (toolbarContent) {
                toolbarContent.setAttribute('size', this.size);
            }
            if (batchActions) {
                batchActions.setAttribute('size', this.size);
            }
        }
    }
    render() {
        return html ` <slot></slot> `;
    }
    /**
     * The CSS selector to find the toolbar contents
     */
    static get selectorToolbarContent() {
        return `${prefix}-table-toolbar-content`;
    }
    /**
     * The CSS selector to find the batch actions
     */
    static get selectorBatchActions() {
        return `${prefix}-table-batch-actions`;
    }
};
CDSTableToolbar.styles = styles;
__decorate([
    property({ reflect: true })
], CDSTableToolbar.prototype, "size", void 0);
CDSTableToolbar = __decorate([
    carbonElement(`${prefix}-table-toolbar`)
], CDSTableToolbar);
var CDSTableToolbar$1 = CDSTableToolbar;

export { CDSTableToolbar$1 as default };
//# sourceMappingURL=table-toolbar.js.map
