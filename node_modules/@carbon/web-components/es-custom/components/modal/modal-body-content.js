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
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Modal body content
 *
 * @element cds-custom-modal-body-content
 */
let CDSModalBodyContent = class CDSModalBodyContent extends LitElement {
    render() {
        return html `<slot></slot>`;
    }
};
CDSModalBodyContent.styles = styles;
CDSModalBodyContent = __decorate([
    carbonElement(`${prefix}-modal-body-content`)
], CDSModalBodyContent);
var CDSModalBodyContent$1 = CDSModalBodyContent;

export { CDSModalBodyContent$1 as default };
//# sourceMappingURL=modal-body-content.js.map
