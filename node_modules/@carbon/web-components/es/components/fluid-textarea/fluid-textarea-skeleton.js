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
import CDSTextareaSkeleton from '../textarea/textarea-skeleton.js';
import styles from './fluid-textarea.scss.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text area input.
 *
 * @element cds-fluid-textarea
 */
let CDSFluidTextareaSkeleton = class CDSFluidTextareaSkeleton extends CDSTextareaSkeleton {
    render() {
        return html `
      <div class="${prefix}--text-area--fluid__skeleton ${prefix}--form-item">
        ${super.render()}
      </div>
    `;
    }
};
CDSFluidTextareaSkeleton.styles = [CDSTextareaSkeleton.styles, styles];
CDSFluidTextareaSkeleton = __decorate([
    carbonElement(`${prefix}-fluid-textarea-skeleton`)
], CDSFluidTextareaSkeleton);
var CDSFluidTextareaSkeleton$1 = CDSFluidTextareaSkeleton;

export { CDSFluidTextareaSkeleton$1 as default };
//# sourceMappingURL=fluid-textarea-skeleton.js.map
