/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var sharedEnums = require('../../globals/shared-enums.js');

/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Time picker size.
 */
exports.TIME_PICKER_SIZE = void 0;
(function (TIME_PICKER_SIZE) {
    /**
     * Small size.
     */
    TIME_PICKER_SIZE["SMALL"] = "sm";
    /**
     * Regular size.
     */
    TIME_PICKER_SIZE["MEDIUM"] = "md";
    /**
     * Large size.
     */
    TIME_PICKER_SIZE["LARGE"] = "lg";
})(exports.TIME_PICKER_SIZE || (exports.TIME_PICKER_SIZE = {}));

Object.defineProperty(exports, "TIME_PICKER_COLOR_SCHEME", {
    enumerable: true,
    get: function () { return sharedEnums.FORM_ELEMENT_COLOR_SCHEME; }
});
//# sourceMappingURL=defs.js.map
