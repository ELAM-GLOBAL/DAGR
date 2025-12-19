/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './menu-item.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Menu Item.
 *
 * @element cds-menu-item-divider
 */
let CDSmenuItemDivider = class CDSmenuItemDivider extends LitElement {
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'separator');
        }
        super.connectedCallback();
    }
};
CDSmenuItemDivider.styles = styles;
CDSmenuItemDivider = __decorate([
    carbonElement(`${prefix}-menu-item-divider`)
], CDSmenuItemDivider);
var CDSmenuItemDivider$1 = CDSmenuItemDivider;

export { CDSmenuItemDivider$1 as default };
//# sourceMappingURL=menu-item-divider.js.map
