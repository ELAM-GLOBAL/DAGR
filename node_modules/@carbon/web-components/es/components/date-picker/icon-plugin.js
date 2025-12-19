/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import ChevronLeft16 from '@carbon/icons/es/chevron--left/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import { iconLoader } from '../../globals/internal/icon-loader.js';

/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @returns A Flatpickr plugin to set the right icons in the design system.
 */
var iconPlugin = () => (fp) => {
    /**
     * Sets the icon in the design system.
     */
    const setIcon = () => {
        const { prevMonthNav, nextMonthNav } = fp;
        render(iconLoader(ChevronLeft16), prevMonthNav);
        render(iconLoader(ChevronRight16), nextMonthNav);
    };
    /**
     * Sets empty arrow icon contents as we render those icons after initialization.
     */
    const parseConfig = () => {
        const { config } = fp;
        config.prevArrow = '';
        config.nextArrow = '';
    };
    /**
     * Registers this Flatpickr plugin.
     *
     */
    const register = () => {
        fp.loadedPlugins.push('carbonFlatpickrIconPlugin');
    };
    return {
        onParseConfig: parseConfig,
        onReady: [register, setIcon],
    };
};

export { iconPlugin as default };
//# sourceMappingURL=icon-plugin.js.map
