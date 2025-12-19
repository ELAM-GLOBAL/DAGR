/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import './date-picker-input.js';
import styles from './date-picker.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { DATE_PICKER_INPUT_KIND } from './defs.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Skeleton version of the input box for date picker.
 */
let CDSDatePickerInputSkeleton = class CDSDatePickerInputSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify whether the label should be hidden, or not
         */
        this.hideLabel = false;
        /**
         * * @deprecated use `range` instead
         * Date picker input kind. Corresponds to the attribute with the same name.
         */
        this.kind = DATE_PICKER_INPUT_KIND.SIMPLE;
        /**
         * Specify whether the skeleton should be of range date picker.
         */
        this.range = false;
    }
    render() {
        const { hideLabel, range } = this;
        return html `
      <div class="${prefix}--date-picker-input-skeleton-container">
        ${!hideLabel ? html `<span class="${prefix}--label"></span>` : null}
        <div class="${prefix}--date-picker__input ${prefix}--skeleton"></div>
      </div>
      ${range
            ? html `
            <div class="${prefix}--date-picker-input-skeleton-container">
              ${!hideLabel
                ? html `<span class="${prefix}--label"></span>`
                : null}
              <div
                class="${prefix}--date-picker__input ${prefix}--skeleton"></div>
            </div>
          `
            : null}
    `;
    }
};
CDSDatePickerInputSkeleton.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-label' })
], CDSDatePickerInputSkeleton.prototype, "hideLabel", void 0);
__decorate([
    property({ reflect: true })
], CDSDatePickerInputSkeleton.prototype, "kind", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'range' })
], CDSDatePickerInputSkeleton.prototype, "range", void 0);
CDSDatePickerInputSkeleton = __decorate([
    carbonElement(`${prefix}-date-picker-input-skeleton`)
], CDSDatePickerInputSkeleton);
var CDSDatePickerInputSkeleton$1 = CDSDatePickerInputSkeleton;

export { CDSDatePickerInputSkeleton$1 as default };
//# sourceMappingURL=date-picker-input-skeleton.js.map
