/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import CaretDown16 from '@carbon/icons/es/caret--down/16.js';
import styles from './tree-view.scss.js';
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
 * Tree node.
 *
 * @element cds-custom-tree-node
 * @fires eventSelected
 *   The name of the custom event fired when node is selected.
 * @fires eventToggled
 *   The name of the custom event fired when a node is toggled.
 */
let CDSTreeNode = class CDSTreeNode extends LitElement {
    constructor() {
        super(...arguments);
        this._hasChildren = false;
        this._hasIcon = false;
        /**
         * Handles style updates based on depth
         */
        this._handleStyles = () => {
            const { _depth: depth, _hasChildren: hasChildren, _hasIcon: hasIcon, } = this;
            const calcOffset = () => {
                if (hasChildren && hasIcon) {
                    return depth + 1 + depth * 0.5;
                }
                if (hasChildren) {
                    return depth + 1;
                }
                if (hasIcon) {
                    return depth + 2 + depth * 0.5;
                }
                return depth + 2.5;
            };
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            const label = this.shadowRoot.querySelector(`.${prefix}--tree-node__label`);
            if (label) {
                label.style.marginInlineStart = `-${calcOffset()}rem`;
                label.style.paddingInlineStart = `${calcOffset()}rem`;
            }
        };
        this._handleToggleClick = (event) => {
            const { disabled, href } = this;
            if (disabled)
                return;
            event.stopPropagation();
            if (href) {
                event.preventDefault();
            }
            this.isExpanded = !this.isExpanded;
            if (this.hasAttribute('aria-expanded')) {
                this.setAttribute('aria-expanded', String(this.isExpanded));
            }
        };
        /**
         * sets if tree node is active
         */
        this.active = false;
        /**
         * disabled property
         */
        this.disabled = false;
        /**
         * **Note:** this is controlled by the parent TreeView component, do not set manually.
         * TreeNode depth to determine spacing
         */
        this._depth = 0;
        /**
         * Specify if the TreeNode is expanded (only applicable to parent nodes)
         */
        this.isExpanded = false;
        /**
         * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active, props.selected and aria-owns
         */
        this.id = Math.random().toString(16).slice(2);
        /**
         * sets if tree node is selected
         */
        this.selected = false;
    }
    /**
     * Handles `slotchange` event.
     */
    _handleSlotChange({ target }) {
        const { _depth: depth, disabled } = this;
        const items = target
            .assignedNodes()
            .filter((node) => node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === `${prefix}-tree-node`);
        items.forEach((item) => {
            item._depth = depth + 1;
            item.disabled = disabled;
        });
        this._hasChildren = items.length > 0;
        if (this._hasChildren)
            this.setAttribute('parent', '');
        this.requestUpdate();
    }
    /**
     * Handles icon's `slotchange` event.
     */
    _handleIconSlotChange({ target }) {
        this._hasIcon = target.assignedNodes().length > 0;
        if (this._hasIcon)
            this.setAttribute('has-icon', '');
        this.requestUpdate();
    }
    connectedCallback() {
        super.connectedCallback();
        // Detect children on first render
        this._hasChildren = Array.from(this.children).some((node) => node.tagName.toLowerCase() === `${prefix}-tree-node`);
        this._hasIcon = Array.from(this.children).some((node) => node.getAttribute('slot') === 'icon');
        if (!this.hasAttribute('role') && !this.href) {
            this.setAttribute('role', 'treeitem');
        }
        if (this._hasChildren && !this.href) {
            this.setAttribute('aria-expanded', String(this.isExpanded));
        }
        if (!this.hasAttribute('aria-label')) {
            this.setAttribute('aria-label', this.label);
        }
    }
    _dispatchSelectedEvent(value) {
        const { eventSelected } = this.constructor;
        this.dispatchEvent(new CustomEvent(eventSelected, {
            bubbles: true,
            composed: true,
            detail: {
                value,
            },
        }));
    }
    _dispatchToggledEvent(value, expanded) {
        const { eventToggled } = this.constructor;
        this.dispatchEvent(new CustomEvent(eventToggled, {
            bubbles: true,
            composed: true,
            detail: {
                value,
                expanded: expanded,
            },
        }));
    }
    updated(changedProperties) {
        if (changedProperties.has('_depth')) {
            this._handleStyles();
        }
        if (changedProperties.has('selected')) {
            if (!this.href) {
                this.setAttribute('aria-selected', String(!this.href ? (this.disabled ? undefined : this.selected) : undefined));
            }
            if (this.selected) {
                this._dispatchSelectedEvent(this.label);
            }
        }
        if (changedProperties.has('active') && !this.href) {
            this.setAttribute('aria-current', String(!this.href
                ? this.active || undefined
                : this.active
                    ? 'page'
                    : undefined));
        }
        if (changedProperties.has('disabled')) {
            this.setAttribute('aria-disabled', String(this.disabled));
        }
        if (changedProperties.has('isExpanded')) {
            this._dispatchToggledEvent(this.label, this.isExpanded);
        }
    }
    render() {
        const { disabled, isExpanded, href, id, label, onClick, _hasChildren: hasChildren, _handleIconSlotChange: handleIconSlotChange, _handleSlotChange: handleSlotChange, _handleToggleClick: handleToggleClick, } = this;
        let toggleClasses = `${prefix}--tree-parent-node__toggle-icon`;
        if (isExpanded) {
            toggleClasses += `${prefix}--tree-parent-node__toggle-icon--expanded`;
        }
        const linkClasses = classMap({
            [`${prefix}--tree-node`]: true,
            [`${prefix}--tree-node--active`]: this.active,
            [`${prefix}--tree-node--disabled`]: disabled,
            [`${prefix}--tree-node--selected`]: this.selected,
            [`${prefix}--tree-node--with-icon`]: this._hasIcon,
            [`${prefix}--tree-leaf-node`]: !this._hasChildren,
            [`${prefix}--tree-parent-node`]: this._hasChildren,
        });
        const subTreeClasses = classMap({
            [`${prefix}--tree-node__children`]: true,
            [`${prefix}--tree-node__hidden`]: !isExpanded,
        });
        return html `
      ${!hasChildren
            ? html `
            ${href
                ? html `<a
                  class=${linkClasses}
                  href=${!disabled ? href : undefined}
                  role="treeitem"
                  ?aria-disabled=${disabled}
                  aria-current=${!this.href
                    ? this.active || undefined
                    : this.active
                        ? 'page'
                        : undefined}
                  tabindex=${disabled ? -1 : undefined}
                  @click=${onClick}>
                  <div id="label" class="${prefix}--tree-node__label">
                    <slot
                      name="icon"
                      @slotchange=${handleIconSlotChange}></slot>
                    ${label}
                  </div>
                </a>`
                : html ` <div id="label" class="${prefix}--tree-node__label">
                  <slot name="icon" @slotchange=${handleIconSlotChange}></slot>
                  ${label}
                </div>`}
          `
            : html `
            ${href
                ? html ` <a
                    role="treeitem"
                    class=${linkClasses}
                    aria-expanded=${!!isExpanded}
                    aria-owns="subtree-id-${id}"
                    href=${!disabled ? href : undefined}
                    tabindex=${disabled ? -1 : undefined}
                    @click=${onClick}>
                    <div id="label" class="${prefix}--tree-node__label">
                      <span
                        class="${prefix}--tree-parent-node__toggle"
                        ?disabled=${disabled}
                        @click=${handleToggleClick}>
                        ${iconLoader(CaretDown16, { class: toggleClasses })}
                      </span>
                      <span class="${prefix}--tree-node__label__details">
                        <slot
                          name="icon"
                          @slotchange=${handleIconSlotChange}></slot>
                        ${label}
                      </span>
                    </div>
                  </a>
                  <ul
                    id="subtree-id-${id}"
                    role="group"
                    class="${subTreeClasses}">
                    <slot @slotchange=${handleSlotChange}></slot>
                  </ul>`
                : html `<div id="label" class="${prefix}--tree-node__label">
                    <span
                      class="${prefix}--tree-parent-node__toggle"
                      ?disabled=${disabled}
                      @click=${handleToggleClick}>
                      ${iconLoader(CaretDown16, { class: toggleClasses })}
                    </span>
                    <span class="${prefix}--tree-node__label__details">
                      <slot
                        name="icon"
                        @slotchange=${handleIconSlotChange}></slot>
                      ${label}
                    </span>
                  </div>
                  <ul
                    id="subtree-id-${id}"
                    role="group"
                    class="${subTreeClasses}">
                    <slot @slotchange=${handleSlotChange}></slot>
                  </ul>`}
          `}
    `;
    }
    /**
     * The name of the custom event fired when node is selected.
     */
    static get eventSelected() {
        return `${prefix}-tree-node-selected`;
    }
    /**
     * The name of the custom event fired when a node is toggled
     */
    static get eventToggled() {
        return `${prefix}-tree-node-toggled`;
    }
};
CDSTreeNode.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTreeNode.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTreeNode.prototype, "disabled", void 0);
__decorate([
    state()
], CDSTreeNode.prototype, "_depth", void 0);
__decorate([
    property({ type: Boolean, attribute: 'is-expanded' })
], CDSTreeNode.prototype, "isExpanded", void 0);
__decorate([
    property({})
], CDSTreeNode.prototype, "href", void 0);
__decorate([
    property({})
], CDSTreeNode.prototype, "id", void 0);
__decorate([
    property({})
], CDSTreeNode.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSTreeNode.prototype, "selected", void 0);
__decorate([
    property({ type: Function })
], CDSTreeNode.prototype, "onClick", void 0);
CDSTreeNode = __decorate([
    carbonElement(`${prefix}-tree-node`)
], CDSTreeNode);
var CDSTreeNode$1 = CDSTreeNode;

export { CDSTreeNode$1 as default };
//# sourceMappingURL=tree-node.js.map
