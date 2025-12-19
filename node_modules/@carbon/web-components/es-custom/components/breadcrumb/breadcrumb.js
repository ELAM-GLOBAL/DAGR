/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { BREADCRUMB_SIZE } from './defs.js';
import styles from './breadcrumb.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Breadcrumb.
 *
 * @element cds-custom-breadcrumb
 */
let CDSBreadcrumb = class CDSBreadcrumb extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Optional prop to omit the trailing slash for the breadcrumbs
         */
        this.noTrailingSlash = false;
        /**
         * Specify the size of the Breadcrumb. Currently
         * supports the following: `sm` & `md` (default: 'md')
         */
        this.size = BREADCRUMB_SIZE.MEDIUM;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        const items = target.assignedNodes().filter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        (node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        items.forEach((item) => {
            item.setAttribute('size', this.size);
        });
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'navigation');
        }
        if (!this.hasAttribute('aria-label')) {
            this.setAttribute('aria-label', 'Breadcrumb');
        }
        super.connectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('size')) {
            const items = this.querySelectorAll(`${prefix}-breadcrumb-item`);
            items === null || items === void 0 ? void 0 : items.forEach((item) => {
                const link = item.querySelector(`${prefix}-breadcrumb-link`);
                link === null || link === void 0 ? void 0 : link.setAttribute('size', this.size);
            });
        }
    }
    render() {
        const classes = classMap({
            [`${prefix}--breadcrumb`]: true,
            [`${prefix}--breadcrumb--no-trailing-slash`]: this.noTrailingSlash,
            [`${prefix}--breadcrumb--sm`]: this.size === BREADCRUMB_SIZE.SMALL,
        });
        return html `
      <ol class="${classes}">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </ol>
    `;
    }
};
CDSBreadcrumb.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'no-trailing-slash' })
], CDSBreadcrumb.prototype, "noTrailingSlash", void 0);
__decorate([
    property({ type: BREADCRUMB_SIZE, reflect: true })
], CDSBreadcrumb.prototype, "size", void 0);
CDSBreadcrumb = __decorate([
    carbonElement(`${prefix}-breadcrumb`)
], CDSBreadcrumb);
var CDSBreadcrumb$1 = CDSBreadcrumb;

export { CDSBreadcrumb$1 as default };
//# sourceMappingURL=breadcrumb.js.map
