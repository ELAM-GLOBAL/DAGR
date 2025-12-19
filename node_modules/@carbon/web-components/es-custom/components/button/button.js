/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import FocusMixin from '../../globals/mixins/focus.js';
import { BUTTON_KIND, BUTTON_TOOLTIP_ALIGNMENT, BUTTON_TOOLTIP_POSITION, BUTTON_TYPE, BUTTON_SIZE } from './defs.js';
import buttonStyles from './button.scss.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Button.
 *
 * @element cds-custom-button
 * @csspart button The button.
 */
let CDSButton = class CDSButton extends HostListenerMixin(FocusMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * `true` if there is an icon.
         */
        this._hasIcon = false;
        this._handleOver = () => {
            this.openTooltip = true;
        };
        /**
         * Handles `keydown` event on this element.
         */
        this._handleHoverOut = async () => {
            this.openTooltip = false;
        };
        /**
         * Handles `keydown` event on this element.
         * Space & enter will toggle state, Escape will only close.
         */
        this._handleFocus = async () => {
            this.openTooltip = true;
        };
        /**
         * Handles `keydown` event on this element.
         * Space & enter will toggle state, Escape will only close.
         */
        this._handleFocusout = async () => {
            this.openTooltip = false;
        };
        /**
         * `true` if the button should have input focus when the page loads.
         */
        this.autofocus = false;
        /**
         * `true` if the button is being used within a data table batch action toolbar
         */
        this.batchAction = false;
        /**
         * `true` if the button should be disabled.
         */
        this.disabled = false;
        /**
         * `true` if there is a non-icon content.
         */
        this.hasMainContent = false;
        /**
         * `true` if expressive theme enabled.
         */
        this.isExpressive = false;
        /**
         * Specify whether the Button is currently selected.
         * Only applies to the Ghost variant.
         */
        this.isSelected = false;
        /**
         * Button kind.
         */
        this.kind = BUTTON_KIND.PRIMARY;
        /**
         * The a11y role for `<a>`.
         */
        this.linkRole = 'button';
        /**
         * Boolean to determine if tooltip is open.
         */
        this.openTooltip = false;
        /**
         * Button size.
         */
        this.size = 'lg';
        /**
         * Specify the tabIndex of the button.
         */
        this.tabIndex = 0;
        /**
         * Specify the alignment of the tooltip to the icon-only button.
         * Can be one of: start, center, or end.
         */
        this.tooltipAlignment = BUTTON_TOOLTIP_ALIGNMENT.CENTER;
        /**
         * Specify the direction of the tooltip for icon-only buttons.
         * Can be either top, right, bottom, or left.
         */
        this.tooltipPosition = BUTTON_TOOLTIP_POSITION.TOP;
        /**
         * Button type.
         */
        this.type = BUTTON_TYPE.BUTTON;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        const { name } = target;
        const hasContent = target.assignedNodes().some(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        (node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        this[name === 'icon' ? '_hasIcon' : 'hasMainContent'] = hasContent;
        this.requestUpdate();
    }
    _handleDisabledClick(event) {
        const { disabled } = this;
        if (disabled) {
            event.stopPropagation();
        }
    }
    _checkBadgeWarning() {
        const hasBadgeIndicator = this.querySelector(`${prefix}-badge-indicator`);
        if (hasBadgeIndicator &&
            (this.kind !== BUTTON_KIND.GHOST || this.size !== BUTTON_SIZE.LARGE)) {
            // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
            console.warn(`The badge indicator must be used with kind='ghost' and size='lg'`);
        }
    }
    updated(changedProperties) {
        var _a;
        (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
        this._checkBadgeWarning();
    }
    render() {
        var _a, _b, _c;
        const { autofocus, buttonClassName, dangerDescription, disabled, download, href, hreflang, kind, isExpressive, isSelected, linkRole, openTooltip, ping, rel, size, tabIndex, target, tooltipAlignment, tooltipPosition, tooltipText, type, _hasIcon: hasIcon, hasMainContent, _handleSlotChange: handleSlotChange, } = this;
        let defaultClasses = {
            [`${prefix}--btn`]: true,
            [`${prefix}--btn--${kind}`]: kind,
            [`${prefix}--btn--danger--tertiary`]: kind === BUTTON_KIND.DANGER_TERTIARY,
            [`${prefix}--btn--danger--ghost`]: kind === BUTTON_KIND.DANGER_GHOST,
            [`${prefix}--btn--disabled`]: disabled,
            [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
            [`${prefix}--btn--${size}`]: size,
            [`${prefix}--layout--size-${size}`]: size,
            [`${prefix}-ce--btn--has-icon`]: hasIcon,
            [`${prefix}--btn--expressive`]: isExpressive,
            [`${prefix}--btn--selected`]: isSelected && kind === 'ghost',
        };
        if (buttonClassName) {
            const outputObject = {};
            buttonClassName === null || buttonClassName === void 0 ? void 0 : buttonClassName.split(' ').forEach((element) => {
                outputObject[element] = true;
            });
            defaultClasses = Object.assign(Object.assign({}, defaultClasses), outputObject);
        }
        const classes = classMap(defaultClasses);
        const isDanger = kind.includes('danger');
        if (href) {
            return disabled
                ? html `
            <p id="button" part="button" class="${classes}">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </p>
          `
                : html `
            <a
              id="button"
              part="button"
              role="${ifDefined(linkRole)}"
              class="${classes}"
              download="${ifDefined(download)}"
              href="${ifDefined(href)}"
              hreflang="${ifDefined(hreflang)}"
              ping="${ifDefined(ping)}"
              rel="${ifDefined(rel)}"
              target="${ifDefined(target)}"
              type="${ifDefined(type)}"
              tabindex="${tabIndex}"
              aria-describedby="badge-indicator">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </a>
            ${(_a = html `<slot id="badge-indicator" name="badge-indicator"></slot>`) !== null && _a !== void 0 ? _a : !disabled}
          `;
        }
        const alignmentClass = tooltipAlignment &&
            (tooltipPosition === BUTTON_TOOLTIP_POSITION.TOP ||
                tooltipPosition === BUTTON_TOOLTIP_POSITION.BOTTOM)
            ? `-${tooltipAlignment}`
            : '';
        const tooltipClasses = classMap({
            [`${prefix}--popover-container`]: true,
            [`${prefix}--popover--caret`]: true,
            [`${prefix}--popover--high-contrast`]: true,
            [`${prefix}--tooltip`]: true,
            [`${prefix}--icon-tooltip`]: hasIcon,
            [`${prefix}--popover--open`]: openTooltip,
            [`${prefix}--popover--${tooltipPosition}${alignmentClass}`]: tooltipText,
        });
        return tooltipText && !disabled
            ? html `
          <span class="${tooltipClasses}">
            <button
              id="button"
              part="button"
              class="${classes}"
              ?autofocus="${autofocus}"
              ?disabled="${disabled}"
              tabindex="${tabIndex}"
              type="${ifDefined(type)}"
              aria-label="${ifDefined(tooltipText)}"
              aria-describedby="badge-indicator">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </button>
            <span class="${prefix}--popover">
              <span
                class="${prefix}--popover-content ${prefix}--tooltip-content">
                ${tooltipText}
              </span>
              <span class="${prefix}--popover-caret"></span>
            </span>
            ${(_b = html `<slot id="badge-indicator" name="badge-indicator"></slot>`) !== null && _b !== void 0 ? _b : !disabled}
          </span>
        `
            : html `
          <button
            id="button"
            part="button"
            class="${classes}"
            ?autofocus="${autofocus}"
            ?disabled="${disabled}"
            tabindex="${tabIndex}"
            type="${ifDefined(type)}"
            aria-label="${ifDefined(tooltipText)}"
            aria-describedby="badge-indicator">
            ${isDanger
                ? html `<span class="${prefix}--visually-hidden"
                  >${dangerDescription}</span
                >`
                : ``}
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </button>
          ${(_c = html `<slot id="badge-indicator" name="badge-indicator"></slot>`) !== null && _c !== void 0 ? _c : !disabled}
        `;
    }
};
CDSButton.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSButton.styles = buttonStyles;
__decorate([
    HostListener('click', { capture: true })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSButton.prototype, "_handleDisabledClick", null);
__decorate([
    HostListener('mouseover')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSButton.prototype, "_handleOver", void 0);
__decorate([
    HostListener('mouseout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSButton.prototype, "_handleHoverOut", void 0);
__decorate([
    HostListener('focus')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSButton.prototype, "_handleFocus", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSButton.prototype, "_handleFocusout", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSButton.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'batch-action' })
], CDSButton.prototype, "batchAction", void 0);
__decorate([
    property({ reflect: true, attribute: 'button-class-name' })
], CDSButton.prototype, "buttonClassName", void 0);
__decorate([
    property({ reflect: true, attribute: 'danger-description' })
], CDSButton.prototype, "dangerDescription", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSButton.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "download", void 0);
__decorate([
    property({ reflect: true, attribute: 'has-main-content', type: Boolean })
], CDSButton.prototype, "hasMainContent", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "href", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "hreflang", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSButton.prototype, "isExpressive", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSButton.prototype, "isSelected", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "kind", void 0);
__decorate([
    property({ attribute: 'link-role' })
], CDSButton.prototype, "linkRole", void 0);
__decorate([
    property({ type: Boolean })
], CDSButton.prototype, "openTooltip", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "ping", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "rel", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "size", void 0);
__decorate([
    property({ type: Number, attribute: 'tab-index', reflect: true })
], CDSButton.prototype, "tabIndex", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "target", void 0);
__decorate([
    property({ reflect: true, attribute: 'tooltip-alignment' })
], CDSButton.prototype, "tooltipAlignment", void 0);
__decorate([
    property({ reflect: true, attribute: 'tooltip-position' })
], CDSButton.prototype, "tooltipPosition", void 0);
__decorate([
    property({ reflect: true, attribute: 'tooltip-text' })
], CDSButton.prototype, "tooltipText", void 0);
__decorate([
    property({ reflect: true })
], CDSButton.prototype, "type", void 0);
CDSButton = __decorate([
    carbonElement(`${prefix}-button`)
], CDSButton);
var CDSButton$1 = CDSButton;

export { BUTTON_KIND, BUTTON_SIZE, BUTTON_TOOLTIP_ALIGNMENT, BUTTON_TOOLTIP_POSITION, BUTTON_TYPE, CDSButton$1 as default };
//# sourceMappingURL=button.js.map
