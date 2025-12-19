/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings.js';
import { TAG_SIZE } from './defs.js';
import styles from './tag.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Skeleton of tag.
 *
 * @element cds-tag-skeleton
 */
let CDSTagSkeleton = class CDSTagSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify the size of the Tag. Currently supports either `sm`,
         * `md` (default) or `lg` sizes.
         */
        this.size = TAG_SIZE.SMALL;
    }
    render() {
        const tagClasses = classMap({
            [`${prefix}--tag`]: true,
            [`${prefix}--skeleton`]: true,
            [`${prefix}--layout--size-${this.size}`]: this.size,
        });
        return html ` <span class="${tagClasses}"></span> `;
    }
};
CDSTagSkeleton.styles = styles;
__decorate([
    property({ reflect: true, type: String })
], CDSTagSkeleton.prototype, "size", void 0);
CDSTagSkeleton = __decorate([
    carbonElement(`${prefix}-tag-skeleton`)
], CDSTagSkeleton);
var CDSTagSkeleton$1 = CDSTagSkeleton;

export { CDSTagSkeleton$1 as default };
//# sourceMappingURL=tag-skeleton.js.map
