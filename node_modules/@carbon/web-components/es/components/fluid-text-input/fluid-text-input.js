/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { prefix } from '../../globals/settings.js';
import { html } from 'lit';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import CDSTextInput from '../text-input/text-input.js';
import styles from './fluid-text-input.scss.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text input.
 *
 * @element cds-fluid-text-input
 */
let CDSFluidTextInput = class CDSFluidTextInput extends CDSTextInput {
    connectedCallback() {
        this.setAttribute('isFluid', 'true');
        super.connectedCallback();
    }
    updated() {
        var _a;
        const formItem = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--form-item`);
        if (formItem) {
            formItem.classList.add(`${prefix}--text-input--fluid`);
        }
    }
    render() {
        return html ` ${super.render()} `;
    }
};
CDSFluidTextInput.styles = [CDSTextInput.styles, styles];
CDSFluidTextInput = __decorate([
    carbonElement(`${prefix}-fluid-text-input`)
], CDSFluidTextInput);
var CDSFluidTextInput$1 = CDSFluidTextInput;

export { CDSFluidTextInput$1 as default };
//# sourceMappingURL=fluid-text-input.js.map
