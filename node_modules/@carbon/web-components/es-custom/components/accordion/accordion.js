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
import { forEach } from '../../globals/internal/collection-helpers.js';
import { ACCORDION_SIZE, ACCORDION_ALIGNMENT } from './defs.js';
import styles from './accordion.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Accordion container.
 *
 * @element cds-custom-accordion
 */
let CDSAccordion = class CDSAccordion extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Accordion size should be sm, md, lg.
         */
        this.size = ACCORDION_SIZE.MEDIUM;
        /**
         * Specify the alignment of the accordion heading title and chevron
         */
        this.alignment = ACCORDION_ALIGNMENT.END;
        /**
         * Specify whether Accordion text should be flush, default is false, does not work with align="start"
         */
        this.isFlush = false;
        /**
         * Disable all accordion items inside this accordion.
         */
        this.disabled = false;
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        super.connectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('size')) {
            // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
            forEach(this.querySelectorAll(this.constructor.selectorAccordionItems), (elem) => {
                elem.setAttribute('size', this.size);
            });
        }
        if (changedProperties.has('alignment')) {
            // Propagate `alignment` attribute to descendants until `:host-context()` gets supported in all major browsers
            forEach(this.querySelectorAll(this.constructor.selectorAccordionItems), (elem) => {
                elem.setAttribute('alignment', this.alignment);
            });
        }
        if (changedProperties.has('isFlush') ||
            changedProperties.has('alignment')) {
            // Propagate `isFlush` attribute to descendants until `:host-context()` gets supported in all major browsers
            forEach(this.querySelectorAll(this.constructor.selectorAccordionItems), (elem) => {
                // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                this.isFlush && this.alignment !== 'start'
                    ? elem.setAttribute('isFlush', '')
                    : elem.removeAttribute('isFlush');
            });
        }
        if (changedProperties.has('disabled')) {
            forEach(this.querySelectorAll(this.constructor.selectorAccordionItems), (elem) => {
                if (this.disabled) {
                    elem.setAttribute('disabled', '');
                }
                else {
                    elem.removeAttribute('disabled');
                }
            });
        }
        // Marks the last accordion item for styling (simulates :last-child in Shadow DOM)
        const items = Array.from(this.querySelectorAll(this.constructor.selectorAccordionItems));
        items.forEach((item) => item.removeAttribute('data-last-item'));
        const lastVisible = items
            .reverse()
            .find((item) => !item.hidden);
        lastVisible === null || lastVisible === void 0 ? void 0 : lastVisible.setAttribute('data-last-item', '');
    }
    render() {
        return html ` <slot></slot> `;
    }
    static get selectorAccordionItems() {
        return `${prefix}-accordion-item`;
    }
};
CDSAccordion.styles = styles;
__decorate([
    property({ reflect: true })
], CDSAccordion.prototype, "size", void 0);
__decorate([
    property({ reflect: true })
], CDSAccordion.prototype, "alignment", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSAccordion.prototype, "isFlush", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSAccordion.prototype, "disabled", void 0);
CDSAccordion = __decorate([
    carbonElement(`${prefix}-accordion`)
], CDSAccordion);
var CDSAccordion$1 = CDSAccordion;

export { ACCORDION_ALIGNMENT, ACCORDION_SIZE, CDSAccordion$1 as default };
//# sourceMappingURL=accordion.js.map
