/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { consume, provide } from '@lit/context';
import { gridContext } from './grid-context.js';
import { property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import styles from './grid.scss.js';
import { SUB_GRID_MODE } from './defs.js';
export { GRID_ALIGNMENT } from './defs.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The grid component.
 *
 * @element cds-custom-grid
 */ let CDSGrid = class CDSGrid extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Collapse the gutter to 1px. Useful for fluid layouts.
         * Rows have 1px of margin between them to match gutter.
         */
        this.condensed = false;
        /**
         * Container hangs 16px into the gutter. Useful for
         * typographic alignment with and without containers.
         */
        this.narrow = false;
        /**
         * Remove the default max width that the grid has set
         */
        this.fullWidth = false;
        this.gridContext = {
            subgrid: false,
        };
    }
    render() {
        var _a;
        this.gridContext = { subgrid: true };
        if ((_a = this.gridContextIn) === null || _a === void 0 ? void 0 : _a.subgrid) {
            let subMode = SUB_GRID_MODE.WIDE;
            if (this.narrow) {
                subMode = SUB_GRID_MODE.NARROW;
            }
            else if (this.condensed) {
                subMode = SUB_GRID_MODE.CONDENSED;
            }
            return html `<div subgrid mode=${subMode} part="grid">
        <slot></slot>
      </div> `;
        }
        else {
            // Grid styling added to contained components, allowing CSS Grid
            // to affect its own slot content.
            return html `<div grid part="grid">
        <slot></slot>
      </div> `;
        }
    }
};
CDSGrid.styles = styles;
__decorate([
    property({ reflect: true, type: String })
], CDSGrid.prototype, "align", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], CDSGrid.prototype, "condensed", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], CDSGrid.prototype, "narrow", void 0);
__decorate([
    property({ reflect: true, attribute: 'full-width', type: Boolean })
], CDSGrid.prototype, "fullWidth", void 0);
__decorate([
    consume({ context: gridContext, subscribe: true }),
    property({ attribute: false })
], CDSGrid.prototype, "gridContextIn", void 0);
__decorate([
    provide({ context: gridContext }),
    property({ attribute: false })
], CDSGrid.prototype, "gridContext", void 0);
CDSGrid = __decorate([
    carbonElement(`${prefix}-grid`)
], CDSGrid);
var CDSGrid$1 = CDSGrid;

export { CDSGrid$1 as default };
//# sourceMappingURL=grid.js.map
