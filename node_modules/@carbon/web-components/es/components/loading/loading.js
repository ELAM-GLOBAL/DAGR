/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { LOADING_TYPE } from './defs.js';
import getLoadingIcon from './loading-icon.js';
import styles from './loading.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Spinner indicating loading state.
 *
 * @element cds-loading
 */
let CDSLoading = class CDSLoading extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Specify a description that would be used to best describe the loading state
         */
        this.description = 'Loading';
        /**
         * Specify whether you would like the small variant of <Loading>
         */
        this.small = false;
        /**
         * `true` if overlay should be applied.
         */
        this.overlay = false;
        /**
         * Specify whether you want the loading indicator to be spinning or not
         */
        this.active = false;
    }
    /**
     * @deprecated
     * The 'assistive-text' property will be deprecated in the next major release. Please use `description` instead.
     */
    get assistiveText() {
        return this.description;
    }
    set assistiveText(value) {
        this.description = value;
    }
    /**
     *
     * @deprecated The 'type' property will be deprecated in the next major release. Please use `small` instead.
     */
    get type() {
        return this.small ? LOADING_TYPE.SMALL : LOADING_TYPE.REGULAR;
    }
    set type(value) {
        this.small = value == LOADING_TYPE.SMALL;
    }
    /**
     *
     * @deprecated
     * The 'inactive' property will be deprecated in the next major release. Please use `active` instead.
     */
    get inactive() {
        return !this.active;
    }
    set inactive(value) {
        this.active = !value;
    }
    render() {
        const { active, description, small, overlay } = this;
        const innerClasses = classMap({
            [`${prefix}--loading`]: true,
            [`${prefix}--loading--stop`]: !active,
            [`${prefix}--loading--small`]: small,
        });
        const icon = getLoadingIcon({ description, small });
        return overlay ? html `<div class="${innerClasses}">${icon}</div>` : icon;
    }
};
CDSLoading.styles = styles;
__decorate([
    property({ attribute: 'assistive-text' })
], CDSLoading.prototype, "assistiveText", null);
__decorate([
    property({ reflect: true })
], CDSLoading.prototype, "description", void 0);
__decorate([
    property()
], CDSLoading.prototype, "type", null);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSLoading.prototype, "small", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSLoading.prototype, "overlay", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSLoading.prototype, "inactive", null);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSLoading.prototype, "active", void 0);
CDSLoading = __decorate([
    carbonElement(`${prefix}-loading`)
], CDSLoading);
var CDSLoading$1 = CDSLoading;

export { LOADING_TYPE, CDSLoading$1 as default };
//# sourceMappingURL=loading.js.map
