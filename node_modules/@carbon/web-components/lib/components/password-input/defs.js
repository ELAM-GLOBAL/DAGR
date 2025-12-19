/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var sharedEnums = require('../../globals/shared-enums.js');

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Input size.
 */
exports.INPUT_SIZE = void 0;
(function (INPUT_SIZE) {
    /**
     * Small size.
     */
    INPUT_SIZE["SMALL"] = "sm";
    /**
     * Regular size, same as medium size.
     */
    INPUT_SIZE["MEDIUM"] = "md";
    /**
     * Large size.
     */
    INPUT_SIZE["LARGE"] = "lg";
})(exports.INPUT_SIZE || (exports.INPUT_SIZE = {}));
/**
 * Input tooltop alignment
 */
exports.INPUT_TOOLTIP_ALIGNMENT = void 0;
(function (INPUT_TOOLTIP_ALIGNMENT) {
    INPUT_TOOLTIP_ALIGNMENT["START"] = "start";
    INPUT_TOOLTIP_ALIGNMENT["CENTER"] = "center";
    INPUT_TOOLTIP_ALIGNMENT["END"] = "end";
})(exports.INPUT_TOOLTIP_ALIGNMENT || (exports.INPUT_TOOLTIP_ALIGNMENT = {}));
/**
 * Input tooltop direction
 */
exports.INPUT_TOOLTIP_DIRECTION = void 0;
(function (INPUT_TOOLTIP_DIRECTION) {
    INPUT_TOOLTIP_DIRECTION["TOP"] = "top";
    INPUT_TOOLTIP_DIRECTION["RIGHT"] = "right";
    INPUT_TOOLTIP_DIRECTION["BOTTOM"] = "bottom";
    INPUT_TOOLTIP_DIRECTION["LEFT"] = "left";
})(exports.INPUT_TOOLTIP_DIRECTION || (exports.INPUT_TOOLTIP_DIRECTION = {}));
/**
 * Supported input types.
 *
 * For this component we only support password and text
 */
exports.INPUT_TYPE = void 0;
(function (INPUT_TYPE) {
    INPUT_TYPE["PASSWORD"] = "password";
    INPUT_TYPE["TEXT"] = "text";
})(exports.INPUT_TYPE || (exports.INPUT_TYPE = {}));

Object.defineProperty(exports, "INPUT_COLOR_SCHEME", {
    enumerable: true,
    get: function () { return sharedEnums.FORM_ELEMENT_COLOR_SCHEME; }
});
//# sourceMappingURL=defs.js.map
