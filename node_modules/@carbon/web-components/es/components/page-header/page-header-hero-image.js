/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
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
 * Page header Hero Image.
 * @element cds-page-header-hero-image
 */
let CDSPageHeaderHeroImage = class CDSPageHeaderHeroImage extends LitElement {
    render() {
        return html `<slot></slot> `;
    }
};
CDSPageHeaderHeroImage.styles = styles;
CDSPageHeaderHeroImage = __decorate([
    carbonElement(`${prefix}-page-header-hero-image`)
], CDSPageHeaderHeroImage);
var CDSPageHeaderHeroImage$1 = CDSPageHeaderHeroImage;

export { CDSPageHeaderHeroImage$1 as default };
//# sourceMappingURL=page-header-hero-image.js.map
