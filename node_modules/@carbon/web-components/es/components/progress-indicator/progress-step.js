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
import CheckmarkOutline16 from '@carbon/icons/es/checkmark--outline/16.js';
import CircleDash16 from '@carbon/icons/es/circle-dash/16.js';
import Warning16 from '@carbon/icons/es/warning/16.js';
import Incomplete16 from '@carbon/icons/es/incomplete/16.js';
import FocusMixin from '../../globals/mixins/focus.js';
import { PROGRESS_STEP_STAT } from './defs.js';
import styles from './progress-indicator.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Icons, keyed by state.
 */
const icons = {
    [PROGRESS_STEP_STAT.COMPLETE]: CheckmarkOutline16,
    [PROGRESS_STEP_STAT.INCOMPLETE]: CircleDash16,
    [PROGRESS_STEP_STAT.INVALID]: Warning16,
    [PROGRESS_STEP_STAT.CURRENT]: Incomplete16,
};
/**
 * Progress step.
 *
 * @element cds-progress-step
 * @slot secondary-label-text - The secondary progress label.
 */
let CDSProgressStep = class CDSProgressStep extends FocusMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * Internal flags: true if the user explicitly passed these attributes.
         */
        this._explicitComplete = false;
        this._explicitCurrent = false;
        this._explicitState = null;
        /**
         * `true` if the progress step should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if the progress step should grow equally to fill space.
         *
         * @private
         */
        this.spaceEqually = false;
        /**
         * The progress state.
         * @deprecated Use `currentIndex` instead
         */
        this.state = PROGRESS_STEP_STAT.INCOMPLETE;
        /**
         * `true` if the progress step should be vertical.
         *
         * @private
         */
        this.vertical = false;
        /**
         * Set by the parent indicator. If true, the step is interactive unless it is
         * current or disabled. This mirrors React's "onChange prop exists" semantics.
         */
        this.clickable = false;
        /**
         * Specify whether the step has been completed
         */
        this.complete = false;
        /**
         * Specify whether the step is the current step
         */
        this.current = false;
        /**
         * Specify whether the step is invalid
         */
        this.invalid = false;
        // Fire internal click only when interactive
        this._fireStepClick = () => {
            const isUnclickable = this.current ||
                this.state === PROGRESS_STEP_STAT.CURRENT ||
                this.disabled ||
                !this.clickable;
            if (isUnclickable)
                return;
            this.dispatchEvent(new CustomEvent(`${prefix}-progress-step-click`, {
                bubbles: true,
                composed: true,
                detail: {},
            }));
        };
        this._onKeyDown = (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                this._fireStepClick();
            }
        };
    }
    get hasExplicitState() {
        return (this._explicitComplete ||
            this._explicitCurrent ||
            this._explicitState !== null);
    }
    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
        // Capture which attributes were explicitly set by the user
        this._explicitComplete = this.hasAttribute('complete');
        this._explicitCurrent = this.hasAttribute('current');
        this._explicitState = this.getAttribute('state');
        super.connectedCallback();
    }
    updated(changedProperties) {
        if (changedProperties.has('disabled')) {
            this.setAttribute('aria-disabled', String(Boolean(this.disabled)));
        }
    }
    _svgIcon(invalid, current, complete) {
        if (invalid)
            return PROGRESS_STEP_STAT.INVALID;
        if (current)
            return PROGRESS_STEP_STAT.CURRENT;
        if (complete)
            return PROGRESS_STEP_STAT.COMPLETE;
        return false;
    }
    render() {
        const { description, iconLabel, label, secondaryLabelText, secondaryLabel, state, complete, current, invalid, } = this;
        const svgLabel = iconLabel || description;
        const optionalLabel = secondaryLabel || secondaryLabelText;
        // Unclickable if current OR disabled OR no onChange upstream (to match React)
        const isUnclickable = current ||
            state === PROGRESS_STEP_STAT.CURRENT ||
            this.disabled ||
            !this.clickable;
        return html `
      <div
        class="${prefix}--progress-step-button ${isUnclickable
            ? `${prefix}--progress-step-button--unclickable`
            : ''}"
        tabindex="${isUnclickable ? -1 : 0}"
        @click=${this._fireStepClick}
        @keydown=${this._onKeyDown}
        role="button"
        aria-disabled="${String(isUnclickable)}"
        title="${label}">
        ${iconLoader(icons[this._svgIcon(invalid, current, complete) || state], {
            class: invalid || state === PROGRESS_STEP_STAT.INVALID
                ? `${prefix}--progress__warning`
                : '',
            title: svgLabel,
        })}
        <slot name="label-text">
          <p
            class="${prefix}--progress-label"
            aria-describedby="label-tooltip"
            title="${label}">
            ${label}
          </p>
        </slot>
        <slot name="secondary-label-text">
          ${!optionalLabel
            ? undefined
            : html `<p class="${prefix}--progress-optional">
                ${optionalLabel}
              </p>`}
        </slot>
        <span class="${prefix}--progress-line"></span>
      </div>
    `;
    }
};
CDSProgressStep.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSProgressStep.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "disabled", void 0);
__decorate([
    property({ attribute: 'icon-label' })
], CDSProgressStep.prototype, "iconLabel", void 0);
__decorate([
    property({ reflect: true })
], CDSProgressStep.prototype, "description", void 0);
__decorate([
    property()
], CDSProgressStep.prototype, "label", void 0);
__decorate([
    property({ attribute: 'secondary-label-text' })
], CDSProgressStep.prototype, "secondaryLabelText", void 0);
__decorate([
    property({ attribute: 'secondary-label' })
], CDSProgressStep.prototype, "secondaryLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "spaceEqually", void 0);
__decorate([
    property({ reflect: true })
], CDSProgressStep.prototype, "state", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "vertical", void 0);
__decorate([
    property({ type: Boolean })
], CDSProgressStep.prototype, "clickable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "complete", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "current", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSProgressStep.prototype, "invalid", void 0);
CDSProgressStep = __decorate([
    carbonElement(`${prefix}-progress-step`)
], CDSProgressStep);
var CDSProgressStep$1 = CDSProgressStep;

export { PROGRESS_STEP_STAT, CDSProgressStep$1 as default };
//# sourceMappingURL=progress-step.js.map
