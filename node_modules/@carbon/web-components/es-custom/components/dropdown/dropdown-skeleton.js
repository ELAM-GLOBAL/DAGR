/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { DROPDOWN_SIZE } from './defs.js';
import styles from './dropdown.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Skeleton version of dropdown.
 */
let CDSDropdownSkeleton = class CDSDropdownSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify whether the label should be hidden, or not.
         */
        this.hideLabel = false;
        /**
         * Specify the size of the ListBox.
         */
        this.size = DROPDOWN_SIZE.MEDIUM;
    }
    render() {
        const { hideLabel, size } = this;
        const classes = classMap({
            [`${prefix}--skeleton`]: true,
            [`${prefix}--dropdown`]: true,
            [`${prefix}--list-box--${size}`]: Boolean(size),
        });
        return html `
      ${!hideLabel
            ? html `<span class="${prefix}--label ${prefix}--skeleton"></span>`
            : null}
      <div class=${classes}></div>
    `;
    }
};
CDSDropdownSkeleton.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-label' })
], CDSDropdownSkeleton.prototype, "hideLabel", void 0);
__decorate([
    property({ reflect: true })
], CDSDropdownSkeleton.prototype, "size", void 0);
CDSDropdownSkeleton = __decorate([
    carbonElement(`${prefix}-dropdown-skeleton`)
], CDSDropdownSkeleton);
var CDSDropdownSkeleton$1 = CDSDropdownSkeleton;

export { CDSDropdownSkeleton$1 as default };
//# sourceMappingURL=dropdown-skeleton.js.map
