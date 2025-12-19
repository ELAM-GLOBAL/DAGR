/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import Close16 from '@carbon/icons/es/close/16.js';
import FocusMixin from '../../globals/mixins/focus.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { TAG_SIZE, TAG_TYPE } from './defs.js';
import CDSTag from './tag.js';
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
 * Dismissible Tag.
 *
 * @element cds-custom-dismissible-tag
 *
 * @fires cds-custom-dismissible-tag-beingclosed - The custom event fired as the element is being closed
 * @fires cds-custom-dismissible-tag-closed - The custom event fired after the element has been closed
 */
let CDSDismissibleTag = class CDSDismissibleTag extends HostListenerMixin(FocusMixin(CDSTag)) {
    constructor() {
        super(...arguments);
        /**
         * Handles `click` event on this element.
         *
         * @param event The event.
         */
        this._handleClick = (event) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            if (event.composedPath().indexOf(this._buttonNode) >= 0) {
                if (this.disabled) {
                    event.stopPropagation();
                }
                else if (this.open) {
                    const nextFocusableTag = this._findNextFocusableTag();
                    const init = {
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                        detail: {
                            triggeredBy: event.target,
                        },
                    };
                    if (this.dispatchEvent(new CustomEvent(this.constructor.eventBeforeClose, init))) {
                        this.open = false;
                        if (nextFocusableTag) {
                            const nextCloseIcon = nextFocusableTag
                                ._buttonNode;
                            if (nextCloseIcon) {
                                nextCloseIcon.focus();
                            }
                        }
                        this.dispatchEvent(new CustomEvent(this.constructor.eventClose, init));
                    }
                }
            }
        };
        /**
         * `true` if the tag should be disabled
         */
        this.disabled = false;
        /**
         * Specify the tooltip alignment for the dismiss button
         */
        this.dismissTooltipAlignment = 'bottom';
        /**
         * `true` if the tag should be open.
         */
        this.open = true;
        /**
         * The size of the tag.
         */
        this.size = TAG_SIZE.MEDIUM;
        /**
         * Provide a custom `title` to be inserted in the tag.
         */
        this.tagTitle = '';
        /**
         * Provide text to be rendered inside of a the tag.
         */
        this.text = '';
        /**
         * The type of the tag.
         */
        this.type = TAG_TYPE.GRAY;
    }
    /**
     * Finds the next focusable dismissible tag sibling
     * @returns {HTMLElement|null} The next focusable dismissible tag or null
     */
    _findNextFocusableTag() {
        let nextElement = this.nextElementSibling;
        while (nextElement) {
            if (nextElement.tagName.toLowerCase() === `${prefix}-dismissible-tag` &&
                !nextElement.hasAttribute('disabled') &&
                nextElement.getAttribute('open') !== 'false') {
                return nextElement;
            }
            nextElement = nextElement.nextElementSibling;
        }
        return null;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleAILabelSlotChange({ target }) {
        const hasContent = target
            .assignedNodes()
            .filter((elem) => elem.matches !== undefined
            ? // remove reference of slug in v12
                elem.matches(this.constructor.aiLabelItem) ||
                    // remove reference of slug in v12
                    elem.matches(this.constructor.slugItem)
            : false);
        if (hasContent.length > 0) {
            hasContent[0].setAttribute('tag', `${this.type}`);
            hasContent[0].setAttribute('size', 'sm');
            hasContent[0].setAttribute('kind', 'inline');
        }
        this.requestUpdate();
    }
    render() {
        const { disabled, _handleAILabelSlotChange: handleAILabelSlotChange, _handleIconSlotChange: handleIconSlotChange, _hasEllipsisApplied: hasEllipsisApplied, size, tagTitle, text, dismissTooltipLabel, dismissTooltipAlignment, } = this;
        const dismissLabel = `Dismiss "${text}"`;
        const dismissActionLabel = dismissTooltipLabel || (hasEllipsisApplied ? dismissLabel : 'Dismiss');
        return html `
      ${size !== TAG_SIZE.SMALL
            ? html `<slot name="icon" @slotchange="${handleIconSlotChange}"></slot>`
            : ''}
      <div class="${prefix}--interactive--tag-children">
        <span
          title="${tagTitle ? tagTitle : text}"
          class="${prefix}--tag__label">
          ${text}
        </span>
        <slot name="decorator" @slotchange="${handleAILabelSlotChange}"></slot>
        <slot name="ai-label" @slotchange="${handleAILabelSlotChange}"></slot>
        <slot name="slug" @slotchange="${handleAILabelSlotChange}"></slot>
        <cds-custom-tooltip align=${dismissTooltipAlignment} enter-delay-ms=${0}>
          <button
            class="sb-tooltip-trigger"
            role="button"
            aria-labelledby="content"
            class="${prefix}--tag__close-icon"
            ?disabled=${disabled}>
            ${iconLoader(Close16)}
          </button>
          <cds-custom-tooltip-content id="content">
            ${dismissActionLabel}
          </cds-custom-tooltip-content>
        </cds-custom-tooltip>
      </div>
    `;
    }
    /**
     * A selector that will return the slug item.
     *
     * remove in v12
     */
    static get slugItem() {
        return `${prefix}-slug`;
    }
    /**
     * A selector that will return the AI Label item.
     */
    static get aiLabelItem() {
        return `${prefix}-ai-label`;
    }
    /**
     * The name of the custom event fired before this tag is being closed upon a user gesture.
     * Cancellation of this event stops the user-initiated action of closing this tag.
     */
    static get eventBeforeClose() {
        return `${prefix}-dismissible-tag-beingclosed`;
    }
    /**
     * The name of the custom event fired after this tag is closed upon a user gesture.
     */
    static get eventClose() {
        return `${prefix}-dismissible-tag-closed`;
    }
};
CDSDismissibleTag.styles = styles;
__decorate([
    query('button')
], CDSDismissibleTag.prototype, "_buttonNode", void 0);
__decorate([
    HostListener('shadowRoot:click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSDismissibleTag.prototype, "_handleClick", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDismissibleTag.prototype, "disabled", void 0);
__decorate([
    property({
        type: String,
        attribute: 'dismiss-tooltip-alignment',
        reflect: true,
    })
], CDSDismissibleTag.prototype, "dismissTooltipAlignment", void 0);
__decorate([
    property({ type: String, attribute: 'dismiss-tooltip-label', reflect: true })
], CDSDismissibleTag.prototype, "dismissTooltipLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSDismissibleTag.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], CDSDismissibleTag.prototype, "size", void 0);
__decorate([
    property({ type: String, attribute: 'tag-title', reflect: true })
], CDSDismissibleTag.prototype, "tagTitle", void 0);
__decorate([
    property({ type: String, reflect: true })
], CDSDismissibleTag.prototype, "text", void 0);
__decorate([
    property({ reflect: true })
], CDSDismissibleTag.prototype, "type", void 0);
CDSDismissibleTag = __decorate([
    carbonElement(`${prefix}-dismissible-tag`)
], CDSDismissibleTag);
var CDSDismissibleTag$1 = CDSDismissibleTag;

export { TAG_SIZE, TAG_TYPE, CDSDismissibleTag$1 as default };
//# sourceMappingURL=dismissible-tag.js.map
