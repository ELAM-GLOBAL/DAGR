/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import { prefix } from '../../globals/settings.js';
import CDSLink from '../link/link.js';
import styles from './breadcrumb.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Link in breadcrumb.
 *
 * @element cds-custom-breadcrumb-link
 */
let CDSBreadcrumbLink = class CDSBreadcrumbLink extends CDSLink {
    constructor() {
        super(...arguments);
        /**
         * Provide if this breadcrumb item represents the current page
         */
        this.isCurrentPage = false;
    }
    render() {
        const { ariaCurrent, isCurrentPage } = this;
        const linkClass = classMap({
            [`${prefix}--link`]: true,
            [`${prefix}--breadcrumb-item--current`]: isCurrentPage && ariaCurrent !== 'page',
        });
        return html `
      ${this.href
            ? super.render()
            : html `<span
            class="${linkClass}"
            aria-current="${ariaCurrent || isCurrentPage}"
            ><slot></slot
          ></span>`}
    `;
    }
};
CDSBreadcrumbLink.styles = styles;
__decorate([
    property({ type: String, attribute: 'aria-current' })
], CDSBreadcrumbLink.prototype, "ariaCurrent", void 0);
__decorate([
    property({ type: Boolean, attribute: 'is-currentpage' })
], CDSBreadcrumbLink.prototype, "isCurrentPage", void 0);
CDSBreadcrumbLink = __decorate([
    carbonElement(`${prefix}-breadcrumb-link`)
], CDSBreadcrumbLink);
var CDSBreadcrumbLink$1 = CDSBreadcrumbLink;

export { CDSBreadcrumbLink$1 as default };
//# sourceMappingURL=breadcrumb-link.js.map
