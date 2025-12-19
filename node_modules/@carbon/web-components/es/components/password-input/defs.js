/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as INPUT_COLOR_SCHEME } from '../../globals/shared-enums.js';

/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Input size.
 */
var INPUT_SIZE;
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
})(INPUT_SIZE || (INPUT_SIZE = {}));
/**
 * Input tooltop alignment
 */
var INPUT_TOOLTIP_ALIGNMENT;
(function (INPUT_TOOLTIP_ALIGNMENT) {
    INPUT_TOOLTIP_ALIGNMENT["START"] = "start";
    INPUT_TOOLTIP_ALIGNMENT["CENTER"] = "center";
    INPUT_TOOLTIP_ALIGNMENT["END"] = "end";
})(INPUT_TOOLTIP_ALIGNMENT || (INPUT_TOOLTIP_ALIGNMENT = {}));
/**
 * Input tooltop direction
 */
var INPUT_TOOLTIP_DIRECTION;
(function (INPUT_TOOLTIP_DIRECTION) {
    INPUT_TOOLTIP_DIRECTION["TOP"] = "top";
    INPUT_TOOLTIP_DIRECTION["RIGHT"] = "right";
    INPUT_TOOLTIP_DIRECTION["BOTTOM"] = "bottom";
    INPUT_TOOLTIP_DIRECTION["LEFT"] = "left";
})(INPUT_TOOLTIP_DIRECTION || (INPUT_TOOLTIP_DIRECTION = {}));
/**
 * Supported input types.
 *
 * For this component we only support password and text
 */
var INPUT_TYPE;
(function (INPUT_TYPE) {
    INPUT_TYPE["PASSWORD"] = "password";
    INPUT_TYPE["TEXT"] = "text";
})(INPUT_TYPE || (INPUT_TYPE = {}));

export { INPUT_SIZE, INPUT_TOOLTIP_ALIGNMENT, INPUT_TOOLTIP_DIRECTION, INPUT_TYPE };
//# sourceMappingURL=defs.js.map
