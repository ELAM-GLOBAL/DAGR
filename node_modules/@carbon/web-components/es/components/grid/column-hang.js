/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import styles from './column-hang.scss.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The column component.
 *
 * @element cds-column-hang
 */
let CDSColumnHang = class CDSColumnHang extends LitElement {
    render() {
        // Grid styling added to contained components, allowing CSS Grid
        // to affect its own slot content.
        return html `<div part="column-hang">
      <slot></slot>
    </div>`;
    }
};
CDSColumnHang.styles = styles;
CDSColumnHang = __decorate([
    carbonElement(`${prefix}-column-hang`)
], CDSColumnHang);
var CDSColumnHang$1 = CDSColumnHang;

export { CDSColumnHang$1 as default };
//# sourceMappingURL=column-hang.js.map
