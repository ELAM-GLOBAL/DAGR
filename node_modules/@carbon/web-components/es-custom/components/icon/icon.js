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
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { createIconTemplate } from '../../globals/internal/icon-loader-utils.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Icon component that renders imported icons or custom SVG content.
 *
 * @element cds-custom-icon
 * @slot - The icon content (for custom SVG)
 */
let CDSIcon = class CDSIcon extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The size of the icon (16, 20, 24, 32)
         */
        this.size = 16;
        /**
         * The aria-label for the icon
         */
        this.ariaLabel = null;
    }
    render() {
        const { icon, size, class: className, ariaLabel } = this;
        // render icon descriptor if provided
        if (icon) {
            const iconTemplate = createIconTemplate(icon);
            return iconTemplate({
                class: className || '',
                'aria-label': ariaLabel || '',
                'aria-hidden': !ariaLabel ? 'true' : 'false',
                width: size,
                height: size,
            });
        }
        // slot for custom SVG content
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Object })
], CDSIcon.prototype, "icon", void 0);
__decorate([
    property({ type: Number })
], CDSIcon.prototype, "size", void 0);
__decorate([
    property({ type: String })
], CDSIcon.prototype, "class", void 0);
__decorate([
    property({ type: String, attribute: 'aria-label' })
], CDSIcon.prototype, "ariaLabel", void 0);
CDSIcon = __decorate([
    carbonElement(`${prefix}-icon`)
], CDSIcon);
var CDSIcon$1 = CDSIcon;

export { CDSIcon$1 as default };
//# sourceMappingURL=icon.js.map
