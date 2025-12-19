/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './tabs.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { property } from 'lit/decorators.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Skeleton of tabs.
 *
 * @element cds-custom-tabs-skeleton
 */
let CDSTabsSkeleton = class CDSTabsSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Provide the type of Tab
         */
        this.contained = false;
    }
    render() {
        return html `
      <ul class="${prefix}--tabs__nav">
        <slot></slot>
      </ul>
    `;
    }
};
CDSTabsSkeleton.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTabsSkeleton.prototype, "contained", void 0);
CDSTabsSkeleton = __decorate([
    carbonElement(`${prefix}-tabs-skeleton`)
], CDSTabsSkeleton);
var CDSTabsSkeleton$1 = CDSTabsSkeleton;

export { CDSTabsSkeleton$1 as default };
//# sourceMappingURL=tabs-skeleton.js.map
