/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './page-header.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Page header.
 * @element cds-custom-page-header
 */
let CDSPageHeader = class CDSPageHeader extends LitElement {
    render() {
        return html ` <slot></slot>`;
    }
};
CDSPageHeader.styles = styles;
CDSPageHeader = __decorate([
    carbonElement(`${prefix}-page-header`)
], CDSPageHeader);
var CDSPageHeader$1 = CDSPageHeader;

export { CDSPageHeader$1 as default };
//# sourceMappingURL=page-header.js.map
