/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import styles from './toggle.scss.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @element cds-toggle-skeleton
 *
 * Skeleton of toggle.
 */
let CDSToggleSkeleton = class CDSToggleSkeleton extends LitElement {
    render() {
        const skeletonClasses = classMap({
            [`${prefix}--toggle`]: true,
            [`${prefix}--toggle--skeleton`]: true,
        });
        return html `
      <div class=${skeletonClasses}>
        <div class="${prefix}--toggle__skeleton-circle"></div>
        <div class="${prefix}--toggle__skeleton-rectangle"></div>
      </div>
    `;
    }
};
CDSToggleSkeleton.styles = styles;
CDSToggleSkeleton = __decorate([
    carbonElement(`${prefix}-toggle-skeleton`)
], CDSToggleSkeleton);
var CDSToggleSkeleton$1 = CDSToggleSkeleton;

export { CDSToggleSkeleton$1 as default };
//# sourceMappingURL=toggle-skeleton.js.map
