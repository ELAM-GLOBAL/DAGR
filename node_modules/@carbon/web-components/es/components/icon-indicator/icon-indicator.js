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
import { ICON_INDICATOR_KIND } from './defs.js';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16.js';
import ErrorFilled20 from '@carbon/icons/es/error--filled/20.js';
import WarningAltInvertedFilled16 from '@carbon/icons/es/warning--alt-inverted--filled/16.js';
import WarningAltInvertedFilled20 from '@carbon/icons/es/warning--alt-inverted--filled/20.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import WarningAltFilled20 from '@carbon/icons/es/warning--alt--filled/20.js';
import UndefinedFilled16 from '@carbon/icons/es/undefined--filled/16.js';
import UndefinedFilled20 from '@carbon/icons/es/undefined--filled/20.js';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16.js';
import CheckmarkFilled20 from '@carbon/icons/es/checkmark--filled/20.js';
import CheckmarkOutline16 from '@carbon/icons/es/checkmark--outline/16.js';
import CheckmarkOutline20 from '@carbon/icons/es/checkmark--outline/20.js';
import InProgress16 from '@carbon/icons/es/in-progress/16.js';
import InProgress20 from '@carbon/icons/es/in-progress/20.js';
import Incomplete16 from '@carbon/icons/es/incomplete/16.js';
import Incomplete20 from '@carbon/icons/es/incomplete/20.js';
import CircleDash16 from '@carbon/icons/es/circle-dash/16.js';
import CircleDash20 from '@carbon/icons/es/circle-dash/20.js';
import PendingFilled16 from '@carbon/icons/es/pending--filled/16.js';
import PendingFilled20 from '@carbon/icons/es/pending--filled/20.js';
import UnknownFilled16 from '@carbon/icons/es/unknown--filled/16.js';
import UnknownFilled20 from '@carbon/icons/es/unknown--filled/20.js';
import WarningSquareFilled16 from '@carbon/icons/es/warning-square--filled/16.js';
import WarningSquareFilled20 from '@carbon/icons/es/warning-square--filled/20.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import styles from './icon-indicator.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const iconMap = {
    [ICON_INDICATOR_KIND.FAILED]: {
        16: ErrorFilled16,
        20: ErrorFilled20,
    },
    [ICON_INDICATOR_KIND['CAUTION-MAJOR']]: {
        16: WarningAltInvertedFilled16,
        20: WarningAltInvertedFilled20,
    },
    [ICON_INDICATOR_KIND['CAUTION-MINOR']]: {
        16: WarningAltFilled16,
        20: WarningAltFilled20,
    },
    [ICON_INDICATOR_KIND.UNDEFINED]: {
        16: UndefinedFilled16,
        20: UndefinedFilled20,
    },
    [ICON_INDICATOR_KIND.SUCCEEDED]: {
        16: CheckmarkFilled16,
        20: CheckmarkFilled20,
    },
    [ICON_INDICATOR_KIND.NORMAL]: {
        16: CheckmarkOutline16,
        20: CheckmarkOutline20,
    },
    [ICON_INDICATOR_KIND['IN-PROGRESS']]: {
        16: InProgress16,
        20: InProgress20,
    },
    [ICON_INDICATOR_KIND.INCOMPLETE]: {
        16: Incomplete16,
        20: Incomplete20,
    },
    [ICON_INDICATOR_KIND['NOT-STARTED']]: {
        16: CircleDash16,
        20: CircleDash20,
    },
    [ICON_INDICATOR_KIND.PENDING]: {
        16: PendingFilled16,
        20: PendingFilled20,
    },
    [ICON_INDICATOR_KIND.UNKNOWN]: {
        16: UnknownFilled16,
        20: UnknownFilled20,
    },
    [ICON_INDICATOR_KIND.INFORMATIVE]: {
        16: WarningSquareFilled16,
        20: WarningSquareFilled20,
    },
};
/**
 * Icon Indicator.
 *
 * @element cds-icon-indicator
 */
let CDSIconIndicator = class CDSIconIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Icon indicator should be size 16 or 20
         */
        this.size = 16;
    }
    render() {
        var _a;
        const IconComponent = (_a = iconMap[this.kind]) === null || _a === void 0 ? void 0 : _a[this.size];
        return html `${iconLoader(IconComponent, { size: this.size })}${this.label}`;
    }
};
CDSIconIndicator.styles = styles;
__decorate([
    property()
], CDSIconIndicator.prototype, "size", void 0);
__decorate([
    property()
], CDSIconIndicator.prototype, "label", void 0);
__decorate([
    property()
], CDSIconIndicator.prototype, "kind", void 0);
CDSIconIndicator = __decorate([
    carbonElement(`${prefix}-icon-indicator`)
], CDSIconIndicator);
var CDSIconIndicator$1 = CDSIconIndicator;

export { ICON_INDICATOR_KIND, CDSIconIndicator$1 as default };
//# sourceMappingURL=icon-indicator.js.map
