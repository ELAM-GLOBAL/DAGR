/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './heading.scss.js';
import { prefix } from '../../globals/settings.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let CDSSection = class CDSSection extends LitElement {
    constructor() {
        super(...arguments);
        this._currentLevel = 1;
    }
    getParentLevel() {
        var _a;
        const parentSection = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.closest(`${prefix}-section`);
        return parentSection ? parentSection.getCurrentLevel() : 1;
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        const parentLevel = this.getParentLevel();
        this._currentLevel =
            (_a = this.level) !== null && _a !== void 0 ? _a : Math.min(parentLevel + 1, 6);
    }
    getCurrentLevel() {
        return this._currentLevel;
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Number })
], CDSSection.prototype, "level", void 0);
CDSSection = __decorate([
    customElement(`${prefix}-section`)
], CDSSection);
/**
 * The heading component
 *
 * @element cds-heading
 */
let CDSHeading = class CDSHeading extends LitElement {
    constructor() {
        super(...arguments);
        this._level = 1;
    }
    connectedCallback() {
        super.connectedCallback();
        const section = this.closest(`${prefix}-section`);
        this._level = section ? section.getCurrentLevel() : 1;
    }
    render() {
        const headingElement = `
      <h${this._level}>
        <slot></slot>
      </h${this._level}>
    `;
        return html `${unsafeHTML(headingElement)}`;
    }
};
CDSHeading.styles = styles;
CDSHeading = __decorate([
    customElement(`${prefix}-heading`)
], CDSHeading);
var CDSHeading$1 = CDSHeading;

export { CDSSection, CDSHeading$1 as default };
//# sourceMappingURL=heading.js.map
