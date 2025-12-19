/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @param config Plugin configuration.
 * @returns A Flatpickr plugin to put the calendar dropdown in shadow DOM.
 */
var appendToPlugin = (config) => (fp) => {
    /**
     * Adjusts the floating meun position after Flatpicker sets it.
     */
    const handlePreCalendarPosition = async () => {
        await Promise.resolve();
        const { calendarContainer, config: fpConfig, _positionElement: positionElement, } = fp;
        const { appendTo } = fpConfig;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        const { top: containerTop } = appendTo.getBoundingClientRect();
        const { bottom: refBottom } = positionElement.getBoundingClientRect();
        const isRtl = 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        appendTo
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
            .ownerDocument.defaultView.getComputedStyle(appendTo)
            .getPropertyValue('direction') === 'rtl';
        calendarContainer.style.top = `${refBottom - containerTop}px`;
        calendarContainer.style.left = !isRtl ? '0' : 'auto';
        calendarContainer.style.right = !isRtl ? 'auto' : '0';
    };
    /**
     * Registers this Flatpickr plugin.
     *
     */
    const register = () => {
        fp.loadedPlugins.push('carbonFlatpickrAppendToPlugin');
    };
    return {
        appendTo: config.appendTo,
        onReady: register,
        onPreCalendarPosition: handlePreCalendarPosition,
    };
};

export { appendToPlugin as default };
//# sourceMappingURL=append-to-plugin.js.map
