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
import styles from './fluid-text-input.scss.js';
import CDSTextInputSkeleton from '../text-input/text-input-skeleton.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text area input.
 *
 * @element cds-fluid-text-input-skeleton
 */
let CDSFluidTextInputSkeleton = class CDSFluidTextInputSkeleton extends CDSTextInputSkeleton {
    render() {
        return html ` ${super.render()} `;
    }
};
CDSFluidTextInputSkeleton.styles = [CDSTextInputSkeleton.styles, styles];
CDSFluidTextInputSkeleton = __decorate([
    carbonElement(`${prefix}-fluid-text-input-skeleton`)
], CDSFluidTextInputSkeleton);
var CDSFluidTextInputSkeleton$1 = CDSFluidTextInputSkeleton;

export { CDSFluidTextInputSkeleton$1 as default };
//# sourceMappingURL=fluid-text-input-skeleton.js.map
