/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The column component.
 *
 * @element cds-custom-column
 */
let CDSColumn = class CDSColumn extends LitElement {
    createRenderRoot() {
        return this;
    }
};
__decorate([
    property({ reflect: true })
], CDSColumn.prototype, "sm", void 0);
__decorate([
    property({ reflect: true })
], CDSColumn.prototype, "md", void 0);
__decorate([
    property({ reflect: true })
], CDSColumn.prototype, "lg", void 0);
__decorate([
    property({ reflect: true })
], CDSColumn.prototype, "span", void 0);
CDSColumn = __decorate([
    carbonElement(`${prefix}-column`)
], CDSColumn);
var CDSColumn$1 = CDSColumn;

export { CDSColumn$1 as default };
//# sourceMappingURL=column.js.map
