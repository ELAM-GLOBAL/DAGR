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
import CDSSelect from '../select/select.js';
import styles from './fluid-select.scss.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text select.
 *
 * @element cds-fluid-select
 */
let CDSFluidSelect = class CDSFluidSelect extends CDSSelect {
    connectedCallback() {
        this.setAttribute('isFluid', 'true');
        super.connectedCallback();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('invalid') ||
            changedProperties.has('disabled') ||
            changedProperties.has('readonly') ||
            changedProperties.has('warn')) {
            this.requestUpdate();
        }
    }
    render() {
        const wrapperClasses = classMap({
            [`${prefix}--select`]: true,
            [`${prefix}--select--invalid`]: this.invalid,
            [`${prefix}--select--warning`]: this.warn && !this.invalid,
            [`${prefix}--select--disabled`]: this.disabled,
            [`${prefix}--select--readonly`]: this.readonly,
        });
        return html `<div class="${wrapperClasses}">${super.render()}</div>`;
    }
};
CDSFluidSelect.styles = [CDSSelect.styles, styles];
CDSFluidSelect = __decorate([
    carbonElement(`${prefix}-fluid-select`)
], CDSFluidSelect);
var CDSFluidSelect$1 = CDSFluidSelect;

export { CDSFluidSelect$1 as default };
//# sourceMappingURL=fluid-select.js.map
