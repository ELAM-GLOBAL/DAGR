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
import styles from './fluid-select.scss.js';
import CDSSelectSkeleton from '../select/select-skeleton.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text area input.
 *
 * @element cds-custom-fluid-select-skeleton
 */
let CDSFluidSelectSkeleton = class CDSFluidSelectSkeleton extends CDSSelectSkeleton {
    render() {
        return html `
      <div class="${prefix}--select--fluid__skeleton">${super.render()}</div>
    `;
    }
};
CDSFluidSelectSkeleton.styles = [CDSSelectSkeleton.styles, styles];
CDSFluidSelectSkeleton = __decorate([
    carbonElement(`${prefix}-fluid-select-skeleton`)
], CDSFluidSelectSkeleton);
var CDSFluidSelectSkeleton$1 = CDSFluidSelectSkeleton;

export { CDSFluidSelectSkeleton$1 as default };
//# sourceMappingURL=fluid-select-skeleton.js.map
