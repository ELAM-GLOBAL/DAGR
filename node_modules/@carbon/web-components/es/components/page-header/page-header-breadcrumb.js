/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings.js';
import { property } from 'lit/decorators.js';
import styles from './page-header.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Page header Breadcrumb Bar.
 * @element cds-page-header-breadcrumb
 */
let CDSPageHeaderBreadcrumb = class CDSPageHeaderBreadcrumb extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify if breadcrumb bar has bottom border.
         */
        this.border = true;
        /**
         * Set to `true` if the breadcrumb bar is sitting within a grid
         * (ie. when used in tandem with page-header-hero-image)
         */
        this.withinGrid = false;
        /**
         * Set to `true` if page actions should be flush (no padding)
         */
        this.pageActionsFlush = false;
        /**
         * Set to `true` if content actions should be flush (no padding)
         */
        this.contentActionsFlush = false;
    }
    render() {
        const { withinGrid } = this;
        const gridClasses = classMap({
            [`${prefix}--css-grid`]: !withinGrid,
            [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
        });
        return html `
      <div class="${prefix}--page-header__breadcrumb-bar">
        <div class="${gridClasses}">
          <div
            class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
            <div class="${prefix}--page-header__breadcrumb-container">
              <div class="${prefix}--page-header__breadcrumb-wrapper">
                <slot name="icon"></slot>
                <slot></slot>
              </div>
              <div class="${prefix}--page-header__breadcrumb__actions">
                <slot name="content-actions"></slot>
                <slot name="page-actions"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};
CDSPageHeaderBreadcrumb.styles = styles;
__decorate([
    property({ reflect: true })
], CDSPageHeaderBreadcrumb.prototype, "border", void 0);
__decorate([
    property({ attribute: 'within-grid', type: Boolean })
], CDSPageHeaderBreadcrumb.prototype, "withinGrid", void 0);
__decorate([
    property({ attribute: 'page-actions-flush', type: Boolean })
], CDSPageHeaderBreadcrumb.prototype, "pageActionsFlush", void 0);
__decorate([
    property({ attribute: 'content-actions-flush', type: Boolean })
], CDSPageHeaderBreadcrumb.prototype, "contentActionsFlush", void 0);
CDSPageHeaderBreadcrumb = __decorate([
    carbonElement(`${prefix}-page-header-breadcrumb`)
], CDSPageHeaderBreadcrumb);
var CDSPageHeaderBreadcrumb$1 = CDSPageHeaderBreadcrumb;

export { CDSPageHeaderBreadcrumb$1 as default };
//# sourceMappingURL=page-header-breadcrumb.js.map
