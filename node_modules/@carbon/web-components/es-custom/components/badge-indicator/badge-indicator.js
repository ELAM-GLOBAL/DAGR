/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import styles from './badge-indicator.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Badge Indicator.
 *
 * @element cds-custom-badge-indicator
 */
let CDSBadgeIndicator = class CDSBadgeIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The shadow slot the badge-indicator should be in.
         */
        this.slot = 'badge-indicator';
    }
    render() {
        const displayCount = this.count && this.count > 999 ? '999+' : this.count;
        return html `${displayCount}`;
    }
};
CDSBadgeIndicator.styles = styles;
__decorate([
    property({ type: Number })
], CDSBadgeIndicator.prototype, "count", void 0);
__decorate([
    property({ reflect: true })
], CDSBadgeIndicator.prototype, "slot", void 0);
CDSBadgeIndicator = __decorate([
    carbonElement(`${prefix}-badge-indicator`)
], CDSBadgeIndicator);
var CDSBadgeIndicator$1 = CDSBadgeIndicator;

export { CDSBadgeIndicator$1 as default };
//# sourceMappingURL=badge-indicator.js.map
