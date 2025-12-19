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
import styles from './fluid-search.scss.js';
import CDSSearch from '../search/search.js';

/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Fluid text input.
 *
 * @element cds-fluid-search
 */
let CDSFluidSearch = class CDSFluidSearch extends CDSSearch {
    render() {
        const { labelText, id } = this;
        return html `
      <label for="${id}" part="label-text" class="${prefix}--label"
        >${labelText}</label
      >
      ${super.render()}
    `;
    }
};
CDSFluidSearch.styles = [CDSSearch.styles, styles];
CDSFluidSearch = __decorate([
    carbonElement(`${prefix}-fluid-search`)
], CDSFluidSearch);
var CDSFluidSearch$1 = CDSFluidSearch;

export { CDSFluidSearch$1 as default };
//# sourceMappingURL=fluid-search.js.map
