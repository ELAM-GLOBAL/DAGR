/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings.js';
import styles from './popover.scss.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import FloatingController from '../../globals/controllers/floating-controller.js';
import { POPOVER_BACKGROUND_TOKEN } from './defs.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var CDSPopover_1;
/**
 * Popover.
 *
 * @element cds-popover
 */
let CDSPopover = CDSPopover_1 = class CDSPopover extends HostListenerMixin(LitElement) {
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        var _a;
        if (this.tabTip) {
            const component = target
                .assignedNodes()
                .filter((node) => node.nodeType === Node.ELEMENT_NODE &&
                node.tagName === 'BUTTON');
            (_a = component[0]) === null || _a === void 0 ? void 0 : _a.classList.add(`${prefix}--popover--tab-tip__button`);
        }
        this.requestUpdate();
    }
    _handleFocusOut(event) {
        const relatedTarget = event.relatedTarget;
        if (!this.contains(relatedTarget)) {
            this.open = false;
        }
    }
    _handleOutsideClick(event) {
        var _a;
        const target = event.target;
        const composedTarget = (_a = event.composedPath) === null || _a === void 0 ? void 0 : _a.call(event)[0];
        if (this.open &&
            target &&
            !this.contains(target) &&
            !this.contains(composedTarget)) {
            this.open = false;
        }
    }
    constructor() {
        super();
        /**
         * Create popover controller instance
         */
        this.popoverController = new FloatingController(this);
        /**
         * Specify direction of alignment
         */
        this.align = '';
        /**
         * Specify whether a auto align functionality should be applied
         */
        this.autoalign = false;
        /**
         * Specify whether a caret should be rendered
         */
        this.caret = true;
        /**
         * Specify whether a dropShadow should be rendered
         */
        this.dropShadow = true;
        /**
         * Specify whether a border should be rendered on the popover
         */
        this.border = false;
        /**
         * Render the component using the high-contrast variant
         */
        this.highContrast = false;
        /**
         * Specify whether the component is currently open or closed
         */
        this.open = false;
        /**
         * Render the component using the tab tip variant
         */
        this.tabTip = false;
        /**
         * Specify the background token to use. Default is 'layer'.
         */
        this.backgroundToken = POPOVER_BACKGROUND_TOKEN.LAYER;
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleOutsideClick);
    }
    disconnectedCallback() {
        document.removeEventListener('click', this._handleOutsideClick);
    }
    /**
     * This function resolves the string passed in for `autoAlignBoundary` to either:
     * "clippingAncestors"
     * An element (found via #id)
     * An array of elements (found via #id1, #id2, #id3, separated by ",")
     * A rect, input format should be 'rect(x,y,width,height)'
     */
    _resolveAutoAlignBoundary() {
        var _a;
        const raw = ((_a = this.autoAlignBoundary) !== null && _a !== void 0 ? _a : '').trim();
        // Default to 'clippingAncestors'
        if (!raw)
            return 'clippingAncestors';
        if (raw === 'clippingAncestors')
            return 'clippingAncestors';
        // regex match for: rect(x,y,width,height)
        const rectMatch = /^rect\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/i.exec(raw);
        if (rectMatch) {
            const [, x, y, w, h] = rectMatch;
            const rect = { x: +x, y: +y, width: +w, height: +h };
            return rect;
        }
        // Get element(s)
        const ids = raw
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 1 && s.startsWith('#'))
            .map((s) => s.slice(1).trim())
            .filter(Boolean);
        if (ids.length > 0) {
            const elements = [];
            const inputted_ids = new Set();
            for (const id of ids) {
                if (inputted_ids.has(id))
                    continue;
                inputted_ids.add(id);
                const el = document.getElementById(id);
                if (el)
                    elements.push(el);
            }
            return elements.length === 1 ? elements[0] : elements;
        }
        // default fallback
        return 'clippingAncestors';
    }
    updated(changedProperties) {
        var _a, _b, _c;
        const { selectorPopoverContent } = this.constructor;
        [
            'open',
            'align',
            'autoalign',
            'caret',
            'dropShadow',
            'border',
            'tabTip',
            'highContrast',
            'backgroundToken',
        ].forEach((name) => {
            if (changedProperties.has(name)) {
                const { [name]: value } = this;
                if (this.querySelector(selectorPopoverContent)) {
                    this.querySelector(selectorPopoverContent)[name] = value;
                }
            }
        });
        if (this.autoalign && this.open) {
            // auto align functionality with @floating-ui/dom library
            const button = this._triggerSlotNode.assignedElements()[0];
            const content = this._contentSlotNode.assignedElements()[0];
            const tooltip = (_a = content === null || content === void 0 ? void 0 : content.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(CDSPopover_1.selectorPopoverContentClass);
            const arrowElement = (_b = content === null || content === void 0 ? void 0 : content.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(CDSPopover_1.selectorPopoverCaret);
            if (button && tooltip) {
                (_c = this.popoverController) === null || _c === void 0 ? void 0 : _c.setPlacement({
                    trigger: button,
                    target: tooltip,
                    arrowElement: this.caret && arrowElement
                        ? arrowElement
                        : undefined,
                    caret: this.caret,
                    flipArguments: { fallbackAxisSideDirection: 'start' },
                    alignment: this.align,
                    open: this.open,
                    alignmentAxisOffset: this.alignmentAxisOffset,
                    autoAlignBoundary: this._resolveAutoAlignBoundary(),
                    isTabTip: this.tabTip,
                });
            }
        }
    }
    render() {
        const { dropShadow, border, highContrast, open, tabTip, _handleSlotChange: handleSlotChange, } = this;
        if (tabTip) {
            this.caret = tabTip ? false : true;
        }
        if (!this.autoalign) {
            this.align = this.align ? this.align : tabTip ? 'bottom-start' : 'bottom';
        }
        if (tabTip) {
            const tabTipAlignments = [
                'bottom-start',
                'bottom-end',
                'bottom-left', // remove in v12
                'bottom-right', // remove in v12
            ];
            if (!tabTipAlignments.includes(this.align)) {
                this.align = 'bottom-start';
            }
        }
        const classes = classMap({
            [`${prefix}--popover-container`]: true,
            [`${prefix}--popover--caret`]: this.caret,
            [`${prefix}--popover--drop-shadow`]: dropShadow,
            [`${prefix}--popover--border`]: border,
            [`${prefix}--popover--high-contrast`]: highContrast,
            [`${prefix}--popover--open`]: open,
            [`${prefix}--popover--${this.align}`]: true,
            [`${prefix}--popover--tab-tip`]: tabTip,
            [`${prefix}--popover--background-token__background`]: this.backgroundToken === POPOVER_BACKGROUND_TOKEN.BACKGROUND &&
                !highContrast,
        });
        return html `
      <span class="${classes}" part="popover-container">
        <slot @slotchange="${handleSlotChange}"></slot>
        <slot name="content"></slot>
      </span>
    `;
    }
    /**
     * A selector that will return popover content element within
     * CDSPopoverContent's shadowRoot.
     */
    static get selectorPopoverContentClass() {
        return `.${prefix}--popover-content`;
    }
    /**
     * A selector that will return popover caret element within
     * CDSPopoverContent's shadowRoot.
     */
    static get selectorPopoverCaret() {
        return `.${prefix}--popover-caret`;
    }
    /**
     * A selector that will return the CDSPopoverContent.
     */
    static get selectorPopoverContent() {
        return `${prefix}-popover-content`;
    }
};
CDSPopover.styles = styles;
__decorate([
    query('slot')
], CDSPopover.prototype, "_triggerSlotNode", void 0);
__decorate([
    query('slot[name="content"]')
], CDSPopover.prototype, "_contentSlotNode", void 0);
__decorate([
    property({ reflect: true, type: String })
], CDSPopover.prototype, "align", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'alignment-axis-offset' })
], CDSPopover.prototype, "alignmentAxisOffset", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "autoalign", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "caret", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "dropShadow", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "border", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "highContrast", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPopover.prototype, "tabTip", void 0);
__decorate([
    property({ reflect: true, type: String })
], CDSPopover.prototype, "backgroundToken", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'autoalign-boundary' })
], CDSPopover.prototype, "autoAlignBoundary", void 0);
__decorate([
    HostListener('focusout')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
], CDSPopover.prototype, "_handleFocusOut", null);
CDSPopover = CDSPopover_1 = __decorate([
    carbonElement(`${prefix}-popover`)
], CDSPopover);
var CDSPopover$1 = CDSPopover;

export { CDSPopover$1 as default };
//# sourceMappingURL=popover.js.map
