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
 * Modal label.
 *
 * @element cds-custom-modal-label
 */
let CDSModalLabel = class CDSModalLabel extends LitElement {
    render() {
        return html ` <slot></slot> `;
    }
};
CDSModalLabel.styles = styles;
CDSModalLabel = __decorate([
    carbonElement(`${prefix}-modal-label`)
], CDSModalLabel);
var CDSModalLabel$1 = CDSModalLabel;

export { CDSModalLabel$1 as default };
//# sourceMappingURL=modal-label.js.map
