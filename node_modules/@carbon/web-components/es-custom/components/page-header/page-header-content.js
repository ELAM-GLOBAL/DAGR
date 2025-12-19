/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
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
 * Page header content.
 * @element cds-custom-page-header-content
 */
let CDSPageHeaderContent = class CDSPageHeaderContent extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Set to `true` if there are contextual actions
         */
        this._hasContextualActions = false;
        /**
         * Title text of the page-header-content
         */
        this.title = '';
        /**
         * Set to `true` if the tag text has ellipsis applied
         */
        this._hasEllipsisApplied = false;
        /**
         * Set to `true` if the breadcrumb bar is sitting within a grid
         * (ie. when used in tandem with page-header-hero-image)
         */
        this.withinGrid = false;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        this._hasContextualActions = Boolean(target.assignedNodes());
        if (this._hasContextualActions) {
            this.setAttribute('contextual-actions', 'true');
        }
        else {
            this.removeAttribute('contextual-actions');
        }
        this.requestUpdate();
    }
    updated() {
        var _a;
        const textContainer = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.${prefix}--page-header__content__title`);
        if (!textContainer || this._hasEllipsisApplied === true)
            return;
        this._hasEllipsisApplied =
            textContainer.scrollHeight > textContainer.clientHeight;
    }
    render() {
        const { title, withinGrid, _hasEllipsisApplied: hasEllipsisApplied, _handleSlotChange: handleSlotChange, } = this;
        const gridClasses = classMap({
            [`${prefix}--css-grid`]: !withinGrid,
            [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
        });
        return html ` <div class="${gridClasses}">
      <div
        class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
        <div class="${prefix}--page-header__content__title-wrapper">
          <div class="${prefix}--page-header__content__start">
            <div class="${prefix}--page-header__content__title-container">
              <slot name="icon"></slot>
              ${hasEllipsisApplied
            ? html `
                    <cds-custom-definition-tooltip>
                      <span slot="definition">${title}</span>
                      <h4 class="${prefix}--page-header__content__title">
                        ${title}
                      </h4>
                    </cds-custom-definition-tooltip>
                  `
            : html `
                    <h4 class="${prefix}--page-header__content__title">
                      ${title}
                    </h4>
                  `}
            </div>
            <slot
              name="contextual-actions"
              @slotchange=${handleSlotChange}></slot>
          </div>
          <div class="${prefix}--page-header__content__page-actions">
            <slot name="page-actions"></slot>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>`;
    }
};
CDSPageHeaderContent.styles = styles;
__decorate([
    property()
], CDSPageHeaderContent.prototype, "title", void 0);
__decorate([
    state()
], CDSPageHeaderContent.prototype, "_hasEllipsisApplied", void 0);
__decorate([
    property({ attribute: 'within-grid', type: Boolean })
], CDSPageHeaderContent.prototype, "withinGrid", void 0);
CDSPageHeaderContent = __decorate([
    carbonElement(`${prefix}-page-header-content`)
], CDSPageHeaderContent);
var CDSPageHeaderContent$1 = CDSPageHeaderContent;

export { CDSPageHeaderContent$1 as default };
//# sourceMappingURL=page-header-content.js.map
