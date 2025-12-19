/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings.js';
import CDSDropdownItem from '../dropdown/dropdown-item.js';
import styles from './multi-select.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import '../checkbox/checkbox.js';
import '../checkbox/checkbox-group.js';
import '../checkbox/checkbox-skeleton.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Multi select item.
 *
 * @element cds-multi-select-item
 */
let CDSMultiSelectItem = class CDSMultiSelectItem extends CDSDropdownItem {
    constructor() {
        super(...arguments);
        /**
         * Marks this item as the “select all” item.
         */
        this.isSelectAll = false;
        /**
         * When `true`, renders the checkbox in its indeterminate state.
         */
        this.indeterminate = false;
        /**
         * The `name` attribute for the `<input>` for selection.
         */
        this.selectionName = '';
    }
    render() {
        const { disabled, selected, selectionName, value, indeterminate } = this;
        return html `
      <div class="${prefix}--list-box__menu-item__option">
        <cds-checkbox
          tabindex="-1"
          class="${prefix}--form-item ${prefix}--checkbox-wrapper"
          .checked=${selected}
          .indeterminate=${indeterminate}
          ?disabled=${disabled}
          name=${ifDefined(selectionName || undefined)}
          value=${value}>
          <slot></slot>
        </cds-checkbox>
      </div>
    `;
    }
    /**
     * A selector that will return multi select.
     */
    static get selectorList() {
        return `${prefix}-multi-select`;
    }
};
CDSMultiSelectItem.styles = styles;
__decorate([
    property({ type: Boolean })
], CDSMultiSelectItem.prototype, "filtered", void 0);
__decorate([
    property({ type: Boolean, attribute: 'is-select-all', reflect: true })
], CDSMultiSelectItem.prototype, "isSelectAll", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSMultiSelectItem.prototype, "indeterminate", void 0);
__decorate([
    property({ attribute: 'selection-name' })
], CDSMultiSelectItem.prototype, "selectionName", void 0);
CDSMultiSelectItem = __decorate([
    carbonElement(`${prefix}-multi-select-item`)
], CDSMultiSelectItem);
var CDSMultiSelectItem$1 = CDSMultiSelectItem;

export { CDSMultiSelectItem$1 as default };
//# sourceMappingURL=multi-select-item.js.map
