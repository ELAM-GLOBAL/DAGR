/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
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
 * Page header Tabs Bar.
 * @element cds-custom-page-header-tabs
 */
let CDSPageHeaderTabs = class CDSPageHeaderTabs extends LitElement {
    render() {
        return html ` <div class="${prefix}--css-grid">
      <div
        class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
        <div class="${prefix}--page-header__tab-bar--tablist">
          <slot></slot>
          <slot name="tags"></slot>
        </div>
      </div>
    </div>`;
    }
};
CDSPageHeaderTabs.styles = styles;
CDSPageHeaderTabs = __decorate([
    carbonElement(`${prefix}-page-header-tabs`)
], CDSPageHeaderTabs);
var CDSPageHeaderTabs$1 = CDSPageHeaderTabs;

export { CDSPageHeaderTabs$1 as default };
//# sourceMappingURL=page-header-tabs.js.map
