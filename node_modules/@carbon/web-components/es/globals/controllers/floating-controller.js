/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { autoUpdate, offset, flip, size, arrow, hide, computePosition } from '@floating-ui/dom';

/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Controller for positioning the menu using Floating UI.
 */
class FloatingController {
    /**
     * register with host component
     * @param host host component
     */
    constructor(host) {
        this.updatePlacement = () => {
            this.computePlacement();
        };
        this.host = host;
        host.addController(this);
    }
    async setPlacement(options = this.options) {
        this.options = options;
        const { trigger, target } = options;
        this.cleanup = autoUpdate(trigger, target, this.updatePlacement);
    }
    async computePlacement() {
        var _a, _b, _c;
        const { arrowElement, alignment, caret, trigger, target, styleElement, matchWidth, open, alignmentAxisOffset, autoAlignBoundary, isTabTip, } = this.options;
        const element = styleElement !== null && styleElement !== void 0 ? styleElement : target;
        if (!element)
            return;
        let shimmedAlign;
        switch (alignment) {
            case 'top-left':
                shimmedAlign = 'top-start';
                break;
            case 'top-right':
                shimmedAlign = 'top-end';
                break;
            case 'bottom-left':
                shimmedAlign = 'bottom-start';
                break;
            case 'bottom-right':
                shimmedAlign = 'bottom-end';
                break;
            case 'left-bottom':
                shimmedAlign = 'left-end';
                break;
            case 'left-top':
                shimmedAlign = 'left-start';
                break;
            case 'right-bottom':
                shimmedAlign = 'right-end';
                break;
            case 'right-top':
                shimmedAlign = 'right-start';
                break;
            default:
                shimmedAlign = alignment;
                break;
        }
        const cs = getComputedStyle(element);
        const toPx = (val) => {
            const raw = parseFloat(val);
            return val.trim().endsWith('rem') ? raw * 16 : raw;
        };
        const offsetPx = !isTabTip
            ? ((_a = toPx(cs.getPropertyValue('--cds-popover-offset').trim())) !== null && _a !== void 0 ? _a : 10)
            : 0;
        const middleware = [
            offset(caret && !isTabTip
                ? { alignmentAxis: alignmentAxisOffset, mainAxis: offsetPx }
                : 0),
            flip({
                fallbackPlacements: isTabTip
                    ? shimmedAlign.includes('bottom')
                        ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                        : ['top-start', 'top-end', 'bottom-start', 'bottom-end']
                    : shimmedAlign.includes('bottom')
                        ? [
                            'bottom',
                            'bottom-start',
                            'bottom-end',
                            'right',
                            'right-start',
                            'right-end',
                            'left',
                            'left-start',
                            'left-end',
                            'top',
                            'top-start',
                            'top-end',
                        ]
                        : [
                            'top',
                            'top-start',
                            'top-end',
                            'left',
                            'left-start',
                            'left-end',
                            'right',
                            'right-start',
                            'right-end',
                            'bottom',
                            'bottom-start',
                            'bottom-end',
                        ],
                fallbackStrategy: 'initialPlacement',
                fallbackAxisSideDirection: 'start',
                boundary: autoAlignBoundary,
            }),
            ...(matchWidth && (shimmedAlign === 'bottom' || shimmedAlign === 'top')
                ? [
                    size({
                        apply({ rects, elements }) {
                            elements.floating.style.width = `${rects.reference.width}px`;
                        },
                    }),
                ]
                : [
                    size({
                        apply({ elements }) {
                            elements.floating.style.removeProperty('width');
                        },
                    }),
                ]),
            ...(caret && arrowElement
                ? [arrow({ element: arrowElement, padding: 15 })]
                : []),
            ...[hide()],
        ];
        if (open) {
            const { x, y, placement, middlewareData, strategy } = await computePosition(trigger, element, {
                strategy: 'fixed',
                middleware,
                placement: shimmedAlign,
            });
            element.setAttribute('align', placement);
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.position = `${strategy}`;
            element.style.visibility = ((_b = middlewareData.hide) === null || _b === void 0 ? void 0 : _b.referenceHidden)
                ? 'hidden'
                : 'visible';
            if (arrowElement) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
                // @ts-ignore
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];
                arrowElement.style.left = arrowX != null ? `${arrowX}px` : '';
                arrowElement.style.top = arrowY != null ? `${arrowY}px` : '';
                arrowElement.style.right = '';
                arrowElement.style.bottom = '';
                arrowElement.style[staticSide] = `${-arrowElement.offsetWidth / 2}px`;
            }
            // adding specific case here where the style of the caret/arrow
            // is dependent on the placement
            // TODO: remove reference to slug in v12
            if (this.host.tagName === 'CDS-AI-LABEL' ||
                this.host.tagName === 'CDS-SLUG') {
                (_c = this.host) === null || _c === void 0 ? void 0 : _c.setAttribute('alignment', placement);
            }
        }
    }
    hostUpdated() {
        var _a;
        if (!this.host.hasAttribute('open')) {
            (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
            this.cleanup = undefined;
        }
    }
    hostDisconnected() {
        var _a;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        this.cleanup = undefined;
    }
}

export { FloatingController as default };
//# sourceMappingURL=floating-controller.js.map
