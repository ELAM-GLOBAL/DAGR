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
import CDSTextarea from '../textarea/textarea.js';
import styles from './fluid-textarea.scss.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text area input.
 *
 * @element cds-fluid-textarea
 */
let CDSFluidTextArea = class CDSFluidTextArea extends CDSTextarea {
    connectedCallback() {
        this.setAttribute('isFluid', 'true');
        super.connectedCallback();
    }
    render() {
        return html `
      <div class="${prefix}--text-area--fluid ${prefix}--form-item">
        ${super.render()}
      </div>
    `;
    }
};
CDSFluidTextArea.styles = [CDSTextarea.styles, styles];
CDSFluidTextArea = __decorate([
    carbonElement(`${prefix}-fluid-textarea`)
], CDSFluidTextArea);
var CDSFluidTextArea$1 = CDSFluidTextArea;

export { CDSFluidTextArea$1 as default };
//# sourceMappingURL=fluid-textarea.js.map
