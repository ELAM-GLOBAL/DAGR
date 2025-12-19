/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { svg, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';
import CDSActionableNotification, { iconsForKinds } from './actionable-notification.js';
import { NOTIFICATION_KIND } from './defs.js';
import styles from './actionable-notification.scss.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Callout notification.
 * @element cds-custom-callout-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @slot action - The action button.
 * @slot - The default slot for additional content.
 */
let CDSCalloutNotification = class CDSCalloutNotification extends CDSActionableNotification {
    constructor() {
        super(...arguments);
        /**
         * Specify the id for the title element.
         */
        this.titleId = '';
        /**
         *  Specify the notification kind, Defaults to 'info'.
         */
        this.kind = NOTIFICATION_KIND.INFO;
    }
    _renderIcon() {
        const { statusIconDescription, kind } = this;
        const { [kind]: icon } = iconsForKinds;
        return !icon
            ? undefined
            : icon({
                class: `${prefix}--inline-notification__icon`,
                children: !statusIconDescription
                    ? undefined
                    : svg `<title>${statusIconDescription}</title>`,
            });
    }
    _renderText() {
        const { subtitle, title, titleId, _type: type } = this;
        return html `
      <div class="${prefix}--${type}-notification__text-wrapper">
        <div class="${prefix}--${type}-notification__content">
          ${title &&
            html `<div
            class="${prefix}--${type}-notification__title"
            id="${titleId}">
            ${title}<slot name="title"></slot>
          </div>`}
          ${subtitle &&
            html `<div class="${prefix}--${type}-notification__subtitle">
            ${subtitle}<slot name="subtitle"></slot>
          </div>`}
          <slot></slot>
        </div>
      </div>
    `;
    }
    _renderButton() {
        return html ``;
    }
    connectedCallback() {
        super.connectedCallback();
        this.removeAttribute('role');
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const button = this.querySelector(this.constructor.selectorActionButton);
        if (button) {
            button.setAttribute('kind', 'ghost');
            if (this.titleId) {
                button.setAttribute('aria-describedby', this.titleId);
            }
        }
    }
};
CDSCalloutNotification.styles = styles;
__decorate([
    property({ type: String, reflect: true, attribute: 'title-id' })
], CDSCalloutNotification.prototype, "titleId", void 0);
__decorate([
    property({ reflect: true })
], CDSCalloutNotification.prototype, "kind", void 0);
CDSCalloutNotification = __decorate([
    carbonElement(`${prefix}-callout-notification`)
], CDSCalloutNotification);
var CDSCalloutNotification$1 = CDSCalloutNotification;

export { CDSCalloutNotification$1 as default };
//# sourceMappingURL=callout-notification.js.map
