/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import FocusMixin from '../../globals/mixins/focus.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { TAG_SIZE, TAG_TYPE } from './defs.js';
import './tag.js';
import '../tooltip/tooltip.js';
import '../tooltip/tooltip-content.js';
import '../tooltip/definition-tooltip.js';
import styles from './tag.scss.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Operational tag.
 *
 * @element cds-operational-tag
 *
 * @fires cds-operational-tag-beforeselected - The custom event fired as the element is being selected
 * @fires cds-operational-tag-selected - The custom event fired after the element has been selected
 */
let CDSOperationalTag = class CDSOperationalTag extends HostListenerMixin(FocusMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * Custom events to be triggered
         *
         * @param event Event object
         */
        this.triggerEvents = (event) => {
            if (this.disabled) {
                event.stopPropagation();
            }
            else {
                const init = {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    detail: {
                        triggeredBy: event.target,
                    },
                };
                if (this.dispatchEvent(new CustomEvent(this.constructor.eventBeforeSelected, init))) {
                    this.selected = !this.selected;
                    this.dispatchEvent(new CustomEvent(this.constructor.eventSelected, init));
                }
            }
        };
        /**
         * Handles `click` event on this element.
         *
         * @param event The event.
         */
        this._handleClick = (event) => {
            this.triggerEvents(event);
        };
        this._handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                this.triggerEvents(event);
            }
        };
        /**
         * `true` if the tag should be disabled
         */
        this.disabled = false;
        /**
         * Specify the state of the selectable tag.
         */
        this.selected = false;
        /**
         * The size of the tag.
         */
        this.size = TAG_SIZE.MEDIUM;
        /**
         * Provide text to be rendered inside of a the tag.
         */
        this.text = '';
        /**
         * The type of the tag.
         */
        this.type = TAG_TYPE.GRAY;
        /**
         * true if the tag text has ellipsis applied
         */
        this._hasEllipsisApplied = false;
    }
    async updated() {
        var _a, _b, _c;
        await this.updateComplete;
        const textContainer = (_c = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`${prefix}-tag`)) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`.${prefix}--tag__label`);
        if (!textContainer)
            return;
        const hasEllipsis = textContainer.scrollWidth > textContainer.clientWidth;
        this._hasEllipsisApplied = hasEllipsis;
    }
    render() {
        const { disabled, selected, size, text, type, _hasEllipsisApplied: hasEllipsisApplied, } = this;
        return html ` ${hasEllipsisApplied
            ? html ` <cds-tooltip
          align="bottom"
          keyboard-only
          closeOnActivation
          leave-delay-ms=${0}>
          <cds-tag
            part="tag"
            ?aria-pressed="${selected}"
            size="${size}"
            ?disabled="${disabled}"
            type="${type}">
            <slot name="icon" slot="icon"></slot>
            ${text}
            <slot name="decorator" slot="decorator"></slot>
            <slot name="ai-label" slot="ai-label"></slot>
            <slot name="slug" slot="slug"></slot>
          </cds-tag>
          <cds-tooltip-content id="content"> ${text} </cds-tooltip-content>
        </cds-tooltip>`
            : html `
          <cds-tag
            part="tag"
            ?aria-pressed="${selected}"
            size="${size}"
            ?disabled="${disabled}"
            type="${type}">
            <slot name="icon" slot="icon"></slot>
            ${text}
            <slot name="decorator" slot="decorator"></slot>
            <slot name="ai-label" slot="ai-label"></slot>
            <slot name="slug" slot="slug"></slot>
          </cds-tag>
        `}`;
    }
    /**
     * The name of the custom event before this tag is selected.
     */
    static get eventBeforeSelected() {
        return `${prefix}-operational-tag-beingselected`;
    }
    /**
     * The name of the custom event fired after this tag is selected.
     */
    static get eventSelected() {
        return `${prefix}-operational-tag-selected`;
    }
};
CDSOperationalTag.styles = styles;
__decorate([
    HostListener('shadowRoot:click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSOperationalTag.prototype, "_handleClick", void 0);
__decorate([
    HostListener('shadowRoot:keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSOperationalTag.prototype, "_handleKeyDown", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOperationalTag.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSOperationalTag.prototype, "selected", void 0);
__decorate([
    property({ type: String, reflect: true })
], CDSOperationalTag.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], CDSOperationalTag.prototype, "text", void 0);
__decorate([
    property({ reflect: true })
], CDSOperationalTag.prototype, "type", void 0);
__decorate([
    state()
], CDSOperationalTag.prototype, "_hasEllipsisApplied", void 0);
CDSOperationalTag = __decorate([
    carbonElement(`${prefix}-operational-tag`)
], CDSOperationalTag);
var CDSOperationalTag$1 = CDSOperationalTag;

export { TAG_SIZE, TAG_TYPE, CDSOperationalTag$1 as default };
//# sourceMappingURL=operational-tag.js.map
