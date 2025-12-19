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
 * @element cds-custom-menu-item-group
 */
let CDSmenuItemGroup = class CDSmenuItemGroup extends LitElement {
    render() {
        const { label } = this;
        return html `
      <ul role="group" aria-label="${label}">
        <slot></slot>
      </ul>
    `;
    }
};
CDSmenuItemGroup.styles = styles;
__decorate([
    property({ type: String })
], CDSmenuItemGroup.prototype, "label", void 0);
CDSmenuItemGroup = __decorate([
    carbonElement(`${prefix}-menu-item-group`)
], CDSmenuItemGroup);
var CDSmenuItemGroup$1 = CDSmenuItemGroup;

export { CDSmenuItemGroup$1 as default };
//# sourceMappingURL=menu-item-group.js.map
