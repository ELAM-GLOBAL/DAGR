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
import styles from './progress-indicator.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Progress indicator.
 *
 * @element cds-progress-indicator
 */
let CDSProgressIndicator = class CDSProgressIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Determines whether or not the progress indicator should be rendered
         * vertically.
         */
        this.vertical = false;
        /**
         * Specify whether the progress steps should be split equally in size in the
         * container (horizontal only).
         */
        this.spaceEqually = false;
        /**
         * Optionally specify the current step array index.
         */
        this.currentIndex = 0;
        this._handleStepClick = (evt) => {
            var _a;
            // Steps are clickable only if onChange is a function
            const clickable = typeof this.onChange === 'function';
            if (!clickable)
                return;
            const steps = Array.from(this.querySelectorAll(this.constructor.selectorStep));
            const targetStep = (_a = (evt.composedPath
                ? evt.composedPath()[0]
                : evt.target)) === null || _a === void 0 ? void 0 : _a.closest(this.constructor.selectorStep);
            if (!targetStep)
                return;
            const index = steps.indexOf(targetStep);
            if (index < 0)
                return;
            const detail = { index };
            // Standard DOM event
            const changeEvt = new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail,
            });
            this.dispatchEvent(changeEvt);
            // Alias event name for convenience (@onChange in Lit or addEventListener('onChange', ...))
            this.dispatchEvent(new CustomEvent('onChange', { bubbles: true, composed: true, detail }));
            if (typeof this.onChange === 'function') {
                this.onChange(changeEvt);
            }
        };
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        super.connectedCallback();
        // Listen for internal step click events
        this.addEventListener(`${prefix}-progress-step-click`, this._handleStepClick);
    }
    disconnectedCallback() {
        this.removeEventListener(`${prefix}-progress-step-click`, this._handleStepClick);
        super.disconnectedCallback();
    }
    updated(changedProperties) {
        const spacingValue = this.vertical ? false : this.spaceEqually;
        const clickable = typeof this.onChange === 'function';
        const steps = this.querySelectorAll(this.constructor.selectorStep);
        if (changedProperties.has('vertical')) {
            // Propagate `vertical` attribute to descendants until
            // `:host-context()` gets supported in all major browsers
            forEach(steps, (item) => {
                item.vertical = this.vertical;
                item.spaceEqually = spacingValue;
                item.clickable = clickable;
            });
        }
        if (changedProperties.has('spaceEqually')) {
            // Propagate `spaceEqually` attribute to descendants until
            // `:host-context()` gets supported in all major browsers
            forEach(steps, (item) => {
                item.spaceEqually = spacingValue;
            });
        }
        if (changedProperties.has('onChange')) {
            // Propagate `onChange` attribute to descendants until
            // `:host-context()` gets supported in all major browsers
            forEach(steps, (item) => {
                item.clickable = clickable;
            });
        }
        if (changedProperties.has('currentIndex')) {
            steps.forEach((step, index) => {
                const progressStep = step;
                if (progressStep.hasExplicitState) {
                    return;
                }
                progressStep.complete = false;
                progressStep.current = false;
                if (index < this.currentIndex) {
                    progressStep.complete = true;
                }
                else if (index === this.currentIndex) {
                    progressStep.current = true;
                }
            });
        }
    }
    render() {
        return html `<slot></slot>`;
    }
    /**
     * A selector that will return progress steps.
     */
    static get selectorStep() {
        return `${prefix}-progress-step`;
    }
};
CDSProgressIndicator.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressIndicator.prototype, "vertical", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'space-equally' })
], CDSProgressIndicator.prototype, "spaceEqually", void 0);
__decorate([
    property({ type: Number, attribute: 'current-index' })
], CDSProgressIndicator.prototype, "currentIndex", void 0);
__decorate([
    property({ attribute: false })
], CDSProgressIndicator.prototype, "onChange", void 0);
CDSProgressIndicator = __decorate([
    carbonElement(`${prefix}-progress-indicator`)
], CDSProgressIndicator);
var CDSProgressIndicator$1 = CDSProgressIndicator;

export { CDSProgressIndicator$1 as default };
//# sourceMappingURL=progress-indicator.js.map
