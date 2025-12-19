/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings.js';
import '../skeleton-text/skeleton-text.js';
import '../button/button-skeleton.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { SKELETON_TEXT_TYPE } from '../skeleton-text/defs.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * The File uploader skeleton.
 *
 * @element cds-custom-file-uploader-skeleton
 */
let CDSFileUploaderSkeleton = class CDSFileUploaderSkeleton extends LitElement {
    render() {
        return html `
      <cds-custom-skeleton-text
        type="${SKELETON_TEXT_TYPE.HEADING}"
        width="100px"></cds-custom-skeleton-text>
      <cds-custom-skeleton-text width="225px"></cds-custom-skeleton-text>
      <cds-custom-button-skeleton></cds-custom-button-skeleton>
    `;
    }
};
CDSFileUploaderSkeleton = __decorate([
    carbonElement(`${prefix}-file-uploader-skeleton`)
], CDSFileUploaderSkeleton);
var CDSFileUploaderSkeleton$1 = CDSFileUploaderSkeleton;

export { CDSFileUploaderSkeleton$1 as default };
//# sourceMappingURL=file-uploader-skeleton.js.map
