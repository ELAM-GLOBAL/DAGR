/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { FeatureFlags, createScope } from '../../feature-flags/es/index.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import { LitElement, html } from 'lit';

/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * <feature-flags> provides scoped feature flags to child components.
 *
 * Usage:
 * Wrap any child components inside <feature-flags> to provide scoped feature flags like this:
 * <feature-flags enable-dialog-element="true">
 *   <component></component>
 * </feature-flags>
 *
 * Available flags:
 * - enable-dialog-element
 * - enable-treeview-controllable
 * - ... (and others listed in observedAttributes)
 *
 * How to check a Flag in your component:
 *   import { isFeatureFlagEnabled } from './feature-flags';
 *   isFeatureFlagEnabled('enable-dialog-element', this)
 *   Returns true if the flag is enabled in the nearest <feature-flags> ancestor
 */
var FeatureFlagsElement_1;
let FeatureFlagsElement = FeatureFlagsElement_1 = class FeatureFlagsElement extends LitElement {
    static get observedAttributes() {
        return Object.keys(FeatureFlagsElement_1.flagComponentMap);
    }
    constructor() {
        super();
        this.scope = FeatureFlags;
        this.flags = {};
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateScope();
    }
    attributeChangedCallback(name, _oldVal, newVal) {
        var _a;
        const value = newVal === 'true';
        this.flags[name] = value;
        // Set feature flag to top component level
        const relatedComponent = FeatureFlagsElement_1.flagComponentMap[name] || 'unknown';
        if (((_a = this.firstElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === relatedComponent) {
            this.firstElementChild.setAttribute(name, '');
        }
        this.updateScope();
    }
    getParentScope() {
        let parent = this.parentNode;
        while (parent) {
            if (parent instanceof FeatureFlagsElement_1) {
                return parent.getScope();
            }
            parent = parent.parentNode;
        }
        return null;
    }
    updateScope() {
        const newScope = createScope(this.flags);
        const parentScope = this.getParentScope() || FeatureFlags;
        if (parentScope) {
            newScope.mergeWithScope(parentScope);
        }
        this.scope = newScope;
    }
    render() {
        return html ` <slot></slot> `;
    }
    isFeatureFlagEnabled(flag) {
        return this.scope.enabled(flag);
    }
    getScope() {
        return this.scope;
    }
};
/**
 * Mapping of feature flag attributes to their related component names.
 */
FeatureFlagsElement.flagComponentMap = {
    'enable-v12-tile-default-icons': 'CDS-TILE',
    'enable-v12-tile-radio-icons': 'CDS-TILE',
    'enable-v12-overflowmenu': 'CDS-OVERFLOW-MENU',
    'enable-treeview-controllable': 'CDS-TREEVIEW',
    'enable-experimental-focus-wrap-without-sentinels': 'CDS-FOCUS-WRAP',
    'enable-focus-wrap-without-sentinels': 'CDS-FOCUS-WRAP',
    'enable-dialog-element': 'CDS-DIALOG',
    'enable-v12-dynamic-floating-styles': 'CDS-FLOATING',
    'enable-v12-toggle-reduced-label-spacing': 'CDS-TOGGLE',
};
FeatureFlagsElement = FeatureFlagsElement_1 = __decorate([
    carbonElement('feature-flags')
], FeatureFlagsElement);
var FeatureFlagsElement$1 = FeatureFlagsElement;
// Utility functions
// Function to find the nearest parent FeatureFlagsElement
function findParentFeatureFlags(el) {
    let parent = el.parentNode;
    while (parent) {
        if (parent instanceof FeatureFlagsElement) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return null;
}
// function to check if a feature flag is enabled in components
function isFeatureFlagEnabled(flag, context) {
    var _a;
    const instance = findParentFeatureFlags(context);
    return (_a = instance === null || instance === void 0 ? void 0 : instance.isFeatureFlagEnabled(flag)) !== null && _a !== void 0 ? _a : false;
}

export { FeatureFlagsElement$1 as default, findParentFeatureFlags, isFeatureFlagEnabled };
//# sourceMappingURL=index.js.map
