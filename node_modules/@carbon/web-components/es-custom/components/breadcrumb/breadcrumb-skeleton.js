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
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const renderItem = () => {
    return html `
    <div class="${prefix}--breadcrumb-item">
      <span class="${prefix}--link">&nbsp;</span>
    </div>
  `;
};
/**
 * Skeleton of breadcrumb.
 */
let CDSBreadcrumbSkeleton = class CDSBreadcrumbSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify the number of items
         */
        this.items = 3;
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
    render() {
        const classes = classMap({
            [`${prefix}--breadcrumb`]: true,
            [`${prefix}--skeleton`]: true,
            [`${prefix}--breadcrumb--no-trailing-slash`]: this.noTrailingSlash,
            [`${prefix}--breadcrumb--sm`]: this.size === BREADCRUMB_SIZE.SMALL,
        });
        return html `
      <div class="${classes}">
        ${[...Array(this.items)].map(() => renderItem())}
      </div>
    `;
    }
};
CDSBreadcrumbSkeleton.styles = styles;
__decorate([
    property({ type: Number, reflect: true })
], CDSBreadcrumbSkeleton.prototype, "items", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'no-trailing-slash' })
], CDSBreadcrumbSkeleton.prototype, "noTrailingSlash", void 0);
__decorate([
    property({ type: BREADCRUMB_SIZE, reflect: true })
], CDSBreadcrumbSkeleton.prototype, "size", void 0);
CDSBreadcrumbSkeleton = __decorate([
    carbonElement(`${prefix}-breadcrumb-skeleton`)
], CDSBreadcrumbSkeleton);
var CDSBreadcrumbSkeleton$1 = CDSBreadcrumbSkeleton;

export { CDSBreadcrumbSkeleton$1 as default };
//# sourceMappingURL=breadcrumb-skeleton.js.map
