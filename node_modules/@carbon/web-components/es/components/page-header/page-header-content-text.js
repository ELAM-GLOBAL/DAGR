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
import styles from './page-header.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Page header Content Text.
 * @element cds-page-header-content-text
 */
let CDSPageHeaderContentText = class CDSPageHeaderContentText extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Subtitle text of the page-header-content
         */
        this.subtitle = '';
    }
    render() {
        const { subtitle } = this;
        return html `
      ${subtitle &&
            html `<h3 class="${prefix}--page-header__content__subtitle">
        ${subtitle}
      </h3>`}
      <slot></slot>
    `;
    }
};
CDSPageHeaderContentText.styles = styles;
__decorate([
    property()
], CDSPageHeaderContentText.prototype, "subtitle", void 0);
CDSPageHeaderContentText = __decorate([
    carbonElement(`${prefix}-page-header-content-text`)
], CDSPageHeaderContentText);
var CDSPageHeaderContentText$1 = CDSPageHeaderContentText;

export { CDSPageHeaderContentText$1 as default };
//# sourceMappingURL=page-header-content-text.js.map
