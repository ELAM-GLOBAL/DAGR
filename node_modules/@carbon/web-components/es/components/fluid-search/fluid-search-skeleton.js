/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { prefix } from '../../globals/settings.js';
import { html } from 'lit';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import styles from './fluid-search.scss.js';
import CDSSearchSkeleton from '../search/search-skeleton.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid Search.
 *
 * @element cds-fluid-search-skeleton
 */
let CDSFluidSearchSkeleton = class CDSFluidSearchSkeleton extends CDSSearchSkeleton {
    render() {
        return html `${super.render()}`;
    }
};
CDSFluidSearchSkeleton.styles = [CDSSearchSkeleton.styles, styles];
CDSFluidSearchSkeleton = __decorate([
    carbonElement(`${prefix}-fluid-search-skeleton`)
], CDSFluidSearchSkeleton);
var CDSFluidSearchSkeleton$1 = CDSFluidSearchSkeleton;

export { CDSFluidSearchSkeleton$1 as default };
//# sourceMappingURL=fluid-search-skeleton.js.map
