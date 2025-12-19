/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import styles from './password-input.scss.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @element cds-password-input-skeleton
 *
 * Skeleton of password input.
 */
let CDSPasswordInputSkeleton = class CDSPasswordInputSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify whether the label should be hidden, or not
         */
        this.hideLabel = false;
    }
    render() {
        const { hideLabel } = this;
        return html `
      ${!hideLabel &&
            html ` <span class="${prefix}--label ${prefix}--skeleton"></span> `}
      <div class="${prefix}--text-input ${prefix}--skeleton"></div>
    `;
    }
};
CDSPasswordInputSkeleton.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-label' })
], CDSPasswordInputSkeleton.prototype, "hideLabel", void 0);
CDSPasswordInputSkeleton = __decorate([
    carbonElement(`${prefix}-password-input-skeleton`)
], CDSPasswordInputSkeleton);
var CDSPasswordInputSkeleton$1 = CDSPasswordInputSkeleton;

export { CDSPasswordInputSkeleton$1 as default };
//# sourceMappingURL=password-input-skeleton.js.map
