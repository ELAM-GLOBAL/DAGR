/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import buttonStyles from './button.scss.js';
import { prefix } from '../../globals/settings.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Button set without button checks
 *
 * @element cds-custom-button-set-base
 */
let CDSButtonSetBase = class CDSButtonSetBase extends LitElement {
    render() {
        return html `<slot></slot>`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'list');
    }
};
CDSButtonSetBase.styles = buttonStyles;
CDSButtonSetBase = __decorate([
    carbonElement(`${prefix}-button-set-base`)
], CDSButtonSetBase);
var CDSButtonSetBase$1 = CDSButtonSetBase;

export { CDSButtonSetBase$1 as default };
//# sourceMappingURL=button-set-base.js.map
