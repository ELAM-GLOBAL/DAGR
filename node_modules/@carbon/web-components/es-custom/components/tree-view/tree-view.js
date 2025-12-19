/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { TREE_SIZE } from './defs.js';
import HostListener from '../../globals/decorators/host-listener.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
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
var CDSTreeView_1;
/**
 * Tree view.
 *
 * @element cds-custom-tree-view
 */
let CDSTreeView = CDSTreeView_1 = class CDSTreeView extends HostListenerMixin(LitElement) {
    constructor() {
        super(...arguments);
        /**
         * Specify whether or not the label should be hidden
         */
        this.hideLabel = false;
        /**
         * Specify the size of the tree from a list of available sizes.
         */
        this.size = TREE_SIZE.SMALL;
        this._click = ({ target }) => {
            if (target.disabled)
                return;
            const nodes = this.querySelectorAll(CDSTreeView_1.selectorTreeNode);
            nodes.forEach((node) => {
                var _a;
                const isTarget = node === target;
                const isLink = node.hasAttribute('href');
                const element = isLink ? (_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('a') : node;
                node.selected = isTarget;
                node.active = isTarget;
                if (!isTarget) {
                    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                    isLink
                        ? element.setAttribute('tabindex', '-1')
                        : element.removeAttribute('tabindex');
                }
                else
                    element.setAttribute('tabindex', '0');
            });
        };
        this._handleKeyDown = (event) => {
            const { key } = event;
            const nodes = Array.from(this.querySelectorAll(CDSTreeView_1.selectorTreeNode)).filter((node) => node.checkVisibility() && !node.hasAttribute('disabled'));
            const allNodes = Array.from(this.querySelectorAll(CDSTreeView_1.selectorTreeNode)).filter((node) => !node.hasAttribute('disabled'));
            const withLinks = nodes[0].href;
            const currentIndex = nodes.findIndex((node) => {
                var _a;
                return withLinks
                    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                        ((_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('a').getAttribute('tabindex')) === '0'
                    : node.getAttribute('tabindex') === '0';
            });
            let nextIndex = currentIndex;
            switch (key) {
                case 'ArrowDown':
                    nextIndex = Math.min(currentIndex + 1, nodes.length - 1);
                    break;
                case 'ArrowUp':
                    nextIndex = Math.max(currentIndex - 1, 0);
                    break;
                case 'Home':
                    nextIndex = 0;
                    break;
                case 'End':
                    nextIndex = nodes.length - 1;
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    allNodes.forEach((node) => {
                        node.selected = false;
                        node.active = false;
                    });
                    nodes[currentIndex].selected = true;
                    nodes[currentIndex].active = true;
                    break;
                case 'ArrowRight':
                    if (nodes[currentIndex].hasAttribute('parent')) {
                        nodes[currentIndex].isExpanded = true;
                        nodes[currentIndex].setAttribute('aria-expanded', 'true');
                    }
                    break;
                case 'ArrowLeft':
                    if (!nodes[currentIndex].hasAttribute('parent')) {
                        const temp = nodes.findIndex((node) => node === nodes[currentIndex].parentElement);
                        nextIndex = temp === -1 ? currentIndex : temp;
                    }
                    else {
                        nodes[currentIndex].isExpanded = false;
                        nodes[currentIndex].setAttribute('aria-expanded', 'false');
                    }
                    break;
            }
            if (nextIndex !== currentIndex) {
                nodes.forEach((node) => {
                    var _a;
                    if (!withLinks) {
                        node.removeAttribute('tabindex');
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                        (_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('a').setAttribute('tabindex', '-1');
                    }
                });
                const element = withLinks
                    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                        nodes[nextIndex].shadowRoot.querySelector('a')
                    : nodes[nextIndex];
                element.setAttribute('tabindex', '0');
                element.focus();
                event.preventDefault();
            }
        };
    }
    async _setInitialFocus() {
        await this.updateComplete;
        const nodes = this.querySelectorAll(CDSTreeView_1.selectorTreeNode);
        if (nodes.length > 0) {
            const selectedNode = Array.from(nodes).find((node) => node.selected) ||
                nodes[0];
            const element = selectedNode.href
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
                    selectedNode.shadowRoot.querySelector('a')
                : selectedNode;
            element.setAttribute('tabindex', '0');
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'tree');
        }
        if (!this.hasAttribute('aria-label')) {
            this.setAttribute('aria-label', this.label);
        }
    }
    updated(changedProperties) {
        this._setInitialFocus();
        if (changedProperties.has('size')) {
            const items = this.querySelectorAll(CDSTreeView_1.selectorTreeNode);
            items.forEach((item) => {
                item.setAttribute('size', this.size);
            });
        }
    }
    render() {
        const { hideLabel, label, size } = this;
        const labelId = 'tree-view__label';
        const treeClasses = classMap({
            [`${prefix}--tree`]: true,
            [`${prefix}--tree--${size}`]: size,
        });
        return html `
      ${!hideLabel
            ? html `<label id=${labelId} class=${`${prefix}--label`}
              >${label}
            </label>`
            : null}
      <ul
        aria-label=${hideLabel ? label : undefined}
        aria-labelledby=${!hideLabel ? labelId : undefined}
        class=${treeClasses}
        role="tree">
        <slot><slot>
      </ul>
    `;
    }
    static get selectorTreeNode() {
        return `${prefix}-tree-node`;
    }
};
CDSTreeView.styles = styles;
__decorate([
    property({ type: Boolean, attribute: 'hide-label' })
], CDSTreeView.prototype, "hideLabel", void 0);
__decorate([
    property()
], CDSTreeView.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], CDSTreeView.prototype, "size", void 0);
__decorate([
    HostListener('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSTreeView.prototype, "_click", void 0);
__decorate([
    HostListener('keydown')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSTreeView.prototype, "_handleKeyDown", void 0);
CDSTreeView = CDSTreeView_1 = __decorate([
    carbonElement(`${prefix}-tree-view`)
], CDSTreeView);
var CDSTreeView$1 = CDSTreeView;

export { TREE_SIZE, CDSTreeView$1 as default };
//# sourceMappingURL=tree-view.js.map
