/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './modal.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Modal body.
 *
 * @element cds-custom-modal-body
 */
let CDSModalBody = class CDSModalBody extends LitElement {
    constructor() {
        super(...arguments);
        this.userDefinedTabindex = null;
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        // Store the tabindex if user set it initially
        if (this.hasAttribute('tabindex')) {
            this.userDefinedTabindex = this.getAttribute('tabindex');
        }
    }
    checkScroll() {
        const hasScroll = this.scrollHeight > this.clientHeight;
        // Respect user-defined tabindex
        if (this.userDefinedTabindex !== null)
            return;
        if (hasScroll) {
            this.setAttribute('tabindex', '0');
        }
        else {
            this.removeAttribute('tabindex');
        }
    }
    render() {
        return html ` <slot @slotchange=${this.checkScroll}></slot> `;
    }
};
CDSModalBody.styles = styles;
CDSModalBody = __decorate([
    carbonElement(`${prefix}-modal-body`)
], CDSModalBody);
var CDSModalBody$1 = CDSModalBody;

export { CDSModalBody$1 as default };
//# sourceMappingURL=modal-body.js.map
