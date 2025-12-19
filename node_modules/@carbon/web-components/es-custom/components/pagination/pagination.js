/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { __decorate } from 'tslib';
import { LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings.js';
import CaretLeft16 from '@carbon/icons/es/caret--left/16.js';
import CaretRight16 from '@carbon/icons/es/caret--right/16.js';
import FocusMixin from '../../globals/mixins/focus.js';
import HostListenerMixin from '../../globals/mixins/host-listener.js';
import HostListener from '../../globals/decorators/host-listener.js';
import styles from './pagination.scss.js';
import { PAGINATION_SIZE } from './defs.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';
import '../button/button.js';
import '../button/button-set.js';
import '../button/button-skeleton.js';
import { carbonElement } from '../../globals/decorators/carbon-element.js';

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Pagination UI.
 *
 * @element cds-custom-pagination
 * @slot page-sizes-select - Where to put in the `<page-sizes-select>`.
 * @fires cds-custom-pagination-changed-current - The custom event fired after the current page is changed from `<cds-custom-pages-select>`.
 * @fires cds-custom-page-sizes-select-changed - The custom event fired after the number of rows per page is changed from `<cds-custom-page-sizes-select>`.
 */
let CDSPagination = class CDSPagination extends FocusMixin(HostListenerMixin(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * The assistive text for the button to go to previous page.
         */
        this.backwardText = 'Previous page';
        /**
         * The current page
         */
        this.page = 1;
        /**
         * The formatter for the assistive text for screen readers to announce.
         * Should be changed upon the locale the UI is rendered with.
         */
        this.formatLabelText = ({ count }) => `Page of ${count} page${count <= 1 ? '' : 's'}`;
        /**
         * The formatter, used with determinate the total pages. Should be changed upon the locale the UI is rendered with.
         */
        this.formatStatusWithDeterminateTotal = ({ start, end, count }) => `${start}–${end} of ${count} item${count <= 1 ? '' : 's'}`;
        /**
         * The formatter, used with indeterminate the total pages. Should be changed upon the locale the UI is rendered with.
         */
        this.formatStatusWithIndeterminateTotal = ({ start, end, count }) => end == null
            ? `Item ${start}–`
            : `${start}–${end} item${count <= 1 ? '' : 's'}`;
        /**
         * The formatter for the text next to the select box. Should be changed upon the locale the UI is rendered with.
         */
        this.formatSupplementalText = ({ count }) => this.pagesUnknown || !this.totalItems
            ? `page`
            : `of ${count} page${count <= 1 ? '' : 's'}`;
        /**
         * The translatable text indicating the number of items per page.
         */
        this.itemsPerPageText = 'Items per page:';
        /**
         * `true` if the pagination UI should be disabled.
         */
        this.disabled = false;
        /**
         * The assistive text for the button to go to next page.
         */
        this.forwardText = 'Next page';
        /**
         * true if the select box to change the page should be disabled.
         */
        this.pageInputDisabled = false;
        /**
         * Number of items per page.
         */
        this.pageSize = 10;
        /**
         * true if the total number of items is unknown.
         */
        this.pagesUnknown = false;
        /**
         * Specify the size of the Pagination.
         */
        this.size = PAGINATION_SIZE.MEDIUM;
        /**
         * The row number where current page start with, index that starts with zero.
         */
        this.start = 0;
        /**
         * The number of total pages.
         */
        this.totalPages = 1;
    }
    _handleSlotChange({ target }) {
        const content = target.assignedNodes().filter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        (node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        content.forEach((item) => {
            this._pageSizeSelect.appendChild(item);
        });
    }
    /**
     * @returns Page status text.
     */
    _renderStatusText() {
        const { start, pageSize, totalItems, pagesUnknown, formatStatusWithDeterminateTotal, formatStatusWithIndeterminateTotal, } = this;
        const min = totalItems === 0 ? 0 : start + 1;
        if (pagesUnknown || totalItems == null) {
            // * Indeterminate total:
            //   - totalItems === 0 → "0–0 of 0 items"
            //   - else → closed range "1–10 items", "11–20 items", etc.
            if (totalItems === 0) {
                return formatStatusWithDeterminateTotal({ start: 0, end: 0, count: 0 });
            }
            const end = start + pageSize;
            return formatStatusWithIndeterminateTotal({
                start: min,
                end,
                // Use visible range for pluralization, so we get "items" not "item"
                count: Math.max(0, end - start),
            });
        }
        // * Determinate total:
        //   - Regular: "1–10 of 100 items"
        //   - When totalItems === 0 → "0–0 of 0 item"
        return formatStatusWithDeterminateTotal({
            start: min,
            end: Math.min(start + pageSize, totalItems),
            count: totalItems,
        });
    }
    /**
     * Calculates the start value based on `page`, `pageSize`, and `totalItems`
     */
    _calculateStart(page, pageSize, totalItems, pagesUnknown) {
        if (!pagesUnknown && totalItems === 0)
            return 0;
        const safePageSize = pageSize > 0 ? pageSize : 1;
        const calculatedStart = (Math.max(1, page) - 1) * safePageSize;
        // Only clamp to the last page when the total is determinate
        if (!pagesUnknown && Number.isFinite(totalItems)) {
            const maxStart = (Math.ceil(totalItems / safePageSize) - 1) * safePageSize;
            return Math.max(0, Math.min(calculatedStart, maxStart));
        }
        return Math.max(0, calculatedStart);
    }
    /**
     * Handles user-initiated change in the row number the current page starts with.
     *
     * @param start The new current row number, index that starts with zero.
     */
    _handleUserInitiatedChangeStart(start) {
        this.start = start;
        this.dispatchEvent(new CustomEvent(this.constructor.eventChangeCurrent, {
            bubbles: true,
            composed: true,
            detail: {
                page: this.page,
                pageSize: this.pageSize,
            },
        }));
    }
    /**
     * Handles user-initiated change in the size of the page.
     */
    _handleUserInitiatedPageSizeChange() {
        this.dispatchEvent(new CustomEvent(this.constructor.eventPageSizeChanged, {
            bubbles: true,
            composed: true,
            detail: {
                page: this.page,
                pageSize: this.pageSize,
            },
        }));
    }
    /**
     * Handles `click` event on the previous button.
     */
    _handleClickPrevButton() {
        var _a;
        const { start: oldStart, pageSize } = this;
        this.page--;
        const newStart = Math.max(oldStart - pageSize, 0);
        if (newStart !== oldStart) {
            this._handleUserInitiatedChangeStart(newStart);
        }
        // reset focus to forward button if it reaches the beginning
        if (this.page === 1) {
            const { selectorForwardButton } = this
                .constructor;
            ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`[button-class-name*=${selectorForwardButton}]`)).focus();
        }
    }
    /**
     * Handles `click` event on the next button.
     */
    _handleClickNextButton() {
        var _a;
        const { start: oldStart, pageSize, totalItems, pagesUnknown } = this;
        this.page++;
        const newStart = oldStart + pageSize;
        if (newStart < (totalItems == null ? Infinity : totalItems) ||
            pagesUnknown) {
            this._handleUserInitiatedChangeStart(newStart);
        }
        // reset focus to previous button if it reaches the end and `pagesUnknown` is not true
        if (!pagesUnknown && this.page === this.totalPages) {
            const { selectorPreviousButton } = this
                .constructor;
            ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`[button-class-name*=${selectorPreviousButton}]`)).focus();
        }
    }
    /**
     * Handles user-initiated change in number of rows per page.
     *
     * @param event The event.
     */
    _handleChangeSelector(event) {
        const { value } = event.detail;
        const { totalItems, pageSize, pagesUnknown } = this;
        if (event.composedPath()[0] === this._pageSizeSelect) {
            this.pageSize = parseInt(value);
            // Default pageSize to effectively be 1 when we have a value of 0 to avoid
            // division by 0.
            this.totalPages =
                pageSize > 0 ? Math.ceil(totalItems / pageSize) : totalItems;
            this.page = 1;
            this.start = 0;
            this._handleUserInitiatedPageSizeChange();
        }
        else {
            this.page = value;
            const newStart = this._calculateStart(value, pageSize, totalItems, pagesUnknown);
            this._handleUserInitiatedChangeStart(newStart);
        }
    }
    updated(changedProperties) {
        var _a, _b;
        const { page, pageSize, totalItems, pagesUnknown } = this;
        const { selectorPageSizesSelect, selectorPagesSelect } = this
            .constructor;
        if (changedProperties.has('pageSize')) {
            const pageSizeSelect = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selectorPageSizesSelect);
            if (pageSizeSelect) {
                pageSizeSelect.value = String(pageSize !== null && pageSize !== void 0 ? pageSize : '');
            }
        }
        // Recompute total pages and clamp the visible page whenever any relevant input changes
        if (changedProperties.has('pageSize') ||
            changedProperties.has('start') ||
            changedProperties.has('totalItems') ||
            changedProperties.has('page')) {
            const computedTotalPages = pageSize > 0
                ? Math.ceil((totalItems !== null && totalItems !== void 0 ? totalItems : 0) / pageSize)
                : (totalItems !== null && totalItems !== void 0 ? totalItems : 0);
            // Only assign if it actually changed to avoid unnecessary updates
            if (this.totalPages !== computedTotalPages) {
                this.updateComplete.then(() => {
                    this.totalPages = computedTotalPages;
                });
            }
            const totalPagesSafe = Math.max(1, computedTotalPages || 1);
            const requestedPage = Math.max(1, Math.floor(this.page || 1));
            const displayPage = Math.min(requestedPage, totalPagesSafe);
            const pagesSelect = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(selectorPagesSelect);
            if (pagesSelect) {
                pagesSelect.value = displayPage.toString();
            }
        }
        if (changedProperties.has('page')) {
            const newStart = this._calculateStart(page, pageSize, totalItems, pagesUnknown);
            this._handleUserInitiatedChangeStart(newStart);
        }
    }
    render() {
        const { page, disabled, forwardText, backwardText, itemsPerPageText, pageInputDisabled, pageSize, pageSizeInputDisabled, pagesUnknown, size, start, totalItems, totalPages, _handleClickPrevButton: handleClickPrevButton, _handleClickNextButton: handleClickNextButton, _handleSlotChange: handleSlotChange, formatLabelText, formatSupplementalText, } = this;
        const { isLastPage = start + pageSize >= totalItems } = this;
        const prevButtonDisabled = disabled || start === 0;
        const nextButtonDisabled = disabled || (!pagesUnknown && isLastPage);
        const prevButtonClassMap = {
            [`${prefix}--btn`]: true,
            [`${prefix}--btn--icon-only`]: true,
            [`${prefix}--pagination__button`]: true,
            [`${prefix}--pagination__button--backward`]: true,
            [`${prefix}--pagination__button--no-index`]: prevButtonDisabled,
            [`${prefix}--btn--${size}`]: true,
            [`${prefix}--btn--ghost`]: true,
        };
        const nextButtonClassMap = {
            [`${prefix}--btn`]: true,
            [`${prefix}--btn--icon-only`]: true,
            [`${prefix}--pagination__button`]: true,
            [`${prefix}--pagination__button--forward`]: true,
            [`${prefix}--pagination__button--no-index`]: nextButtonDisabled,
            [`${prefix}--btn--${size}`]: true,
            [`${prefix}--btn--ghost`]: true,
        };
        const prevButtonClasses = Object.entries(prevButtonClassMap)
            .filter(([, value]) => value === true)
            .map(([key]) => key)
            .join(' ');
        const nextButtonClasses = Object.entries(nextButtonClassMap)
            .filter(([, value]) => value === true)
            .map(([key]) => key)
            .join(' ');
        const totalPagesSafe = Number.isFinite(totalPages) && totalPages > 0
            ? totalPages
            : Math.max(1, page || 1);
        return html `
      <div class="${prefix}--pagination__left">
        <label for="select" class="${prefix}--pagination__text"
          ><slot name="label-text">${itemsPerPageText}</slot></label
        >
        <cds-custom-select
          ?disabled=${disabled || pageSizeInputDisabled}
          id="page-size-select"
          left-select
          pagination
          size="${size}"
          inline
          value="${pageSize}">
          <slot @slotchange=${handleSlotChange}></slot>
        </cds-custom-select>
        <span
          class="${prefix}--pagination__text ${prefix}--pagination__items-count"
          >${this._renderStatusText()}</span
        >
      </div>
      <div class="${prefix}--pagination__right">
        ${!pagesUnknown || totalItems
            ? html `
              <label
                for="select"
                class="${prefix}--label ${prefix}--visually-hidden">
                ${formatLabelText({ count: totalPages })}
              </label>
            `
            : null}
        ${pagesUnknown || !totalItems
            ? html `
              <span
                class="${prefix}--pagination__text ${prefix}--pagination__page-text ${prefix}--pagination__unknown-pages-text"
                >${formatSupplementalText({ count: totalPages })} ${page}</span
              >
            `
            : html `
              <cds-custom-select
                ?disabled=${disabled || pageInputDisabled}
                id="pages-select"
                pagination
                size="${size}"
                inline
                value="${page}">
                ${Array.from(new Array(totalPagesSafe)).map((_item, index) => html `
                    <cds-custom-select-item
                      value="${index + 1}"
                      ?selected=${page === index + 1}>
                      ${index + 1}
                    </cds-custom-select-item>
                  `)}
              </cds-custom-select>
              <span class="${prefix}--pagination__text"
                >${formatSupplementalText({ count: totalPages })}</span
              >
            `}

        <div class="${prefix}--pagination__control-buttons">
          <cds-custom-button
            pagination
            size="${size}"
            ?disabled="${prevButtonDisabled}"
            button-class-name="${prevButtonClasses}"
            tooltip-text="${backwardText}"
            @click="${handleClickPrevButton}">
            ${iconLoader(CaretLeft16, { slot: 'icon' })}
          </cds-custom-button>
          <cds-custom-button
            tooltip-position="top-right"
            pagination
            size="${size}"
            ?disabled="${nextButtonDisabled}"
            button-class-name="${nextButtonClasses}"
            tooltip-text="${forwardText}"
            @click="${handleClickNextButton}">
            ${iconLoader(CaretRight16, { slot: 'icon' })}
          </cds-custom-button>
        </div>
      </div>
    `;
    }
    /**
     * A selector that will return the select box for the current page.
     */
    static get selectorPagesSelect() {
        return `${prefix}-select#pages-select`;
    }
    /**
     * A selector that will return the select box for page sizes.
     */
    static get selectorPageSizesSelect() {
        return `${prefix}-select`;
    }
    /**
     * A selector that will return the previous button.
     */
    static get selectorPreviousButton() {
        return `${prefix}--pagination__button--backward`;
    }
    /**
     * A selector that will return the forward button.
     */
    static get selectorForwardButton() {
        return `${prefix}--pagination__button--forward`;
    }
    /**
     * The name of the custom event fired after the current row number is changed.
     */
    static get eventChangeCurrent() {
        return `${prefix}-pagination-changed-current`;
    }
    /**
     * The name of the custom event fired after the number of rows per page is changed from `<cds-custom-page-sizes-select>`.
     */
    static get eventPageSizeChanged() {
        return `${prefix}-page-sizes-select-changed`;
    }
};
CDSPagination.shadowRootOptions = Object.assign(Object.assign({}, LitElement.shadowRootOptions), { delegatesFocus: true });
CDSPagination.styles = styles;
__decorate([
    query(`${prefix}-select`)
], CDSPagination.prototype, "_pageSizeSelect", void 0);
__decorate([
    HostListener(`${prefix}-select-selected`)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
], CDSPagination.prototype, "_handleChangeSelector", null);
__decorate([
    property({ attribute: 'backward-text' })
], CDSPagination.prototype, "backwardText", void 0);
__decorate([
    property({ type: Number, reflect: true })
], CDSPagination.prototype, "page", void 0);
__decorate([
    property({ attribute: false })
], CDSPagination.prototype, "formatLabelText", void 0);
__decorate([
    property({ attribute: false })
], CDSPagination.prototype, "formatStatusWithDeterminateTotal", void 0);
__decorate([
    property({ attribute: false })
], CDSPagination.prototype, "formatStatusWithIndeterminateTotal", void 0);
__decorate([
    property({ attribute: false })
], CDSPagination.prototype, "formatSupplementalText", void 0);
__decorate([
    property({ type: Boolean, attribute: 'is-last-page' })
], CDSPagination.prototype, "isLastPage", void 0);
__decorate([
    property({ attribute: 'items-per-page-text' })
], CDSPagination.prototype, "itemsPerPageText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], CDSPagination.prototype, "disabled", void 0);
__decorate([
    property({ attribute: 'forward-text' })
], CDSPagination.prototype, "forwardText", void 0);
__decorate([
    property({ type: Boolean, attribute: 'page-input-disabled' })
], CDSPagination.prototype, "pageInputDisabled", void 0);
__decorate([
    property({ type: Number, attribute: 'page-size', reflect: true })
], CDSPagination.prototype, "pageSize", void 0);
__decorate([
    property({ type: Boolean, attribute: 'page-size-input-disabled' })
], CDSPagination.prototype, "pageSizeInputDisabled", void 0);
__decorate([
    property({ attribute: 'page-size-label-text' })
], CDSPagination.prototype, "pageSizeLabelText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'pages-unknown' })
], CDSPagination.prototype, "pagesUnknown", void 0);
__decorate([
    property({ reflect: true })
], CDSPagination.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], CDSPagination.prototype, "start", void 0);
__decorate([
    property({
        type: Number,
        attribute: 'total-items',
        converter: {
            fromAttribute: (value) => value === null || value === '' ? undefined : Number(value),
        },
    })
], CDSPagination.prototype, "totalItems", void 0);
__decorate([
    property({ type: Number })
], CDSPagination.prototype, "totalPages", void 0);
CDSPagination = __decorate([
    carbonElement(`${prefix}-pagination`)
], CDSPagination);
var CDSPagination$1 = CDSPagination;

export { CDSPagination$1 as default };
//# sourceMappingURL=pagination.js.map
