/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import styles from './form.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Presentational element for form
 *
 * @element cds-form
 */
let CDSForm = class CDSForm extends LitElement {
    render() {
        return html `<form class="${prefix}--form">
      <slot></slot>
    </form>`;
    }
};
CDSForm.styles = styles;
CDSForm = __decorate([
    carbonElement(`${prefix}-form`)
], CDSForm);
var CDSForm$1 = CDSForm;

export { CDSForm$1 as default };
//# sourceMappingURL=form.js.map
