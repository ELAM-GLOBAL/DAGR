/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright IBM Corp. 2020, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Menu size.
 */
var MENU_SIZE;
(function (MENU_SIZE) {
    /**
     * extra small size.
     */
    MENU_SIZE["EXTRA_SMALL"] = "xs";
    /**
     * Small size.
     */
    MENU_SIZE["SMALL"] = "sm";
    /**
     * Medium size.
     */
    MENU_SIZE["MEDIUM"] = "md";
    /**
     * Large size.
     */
    MENU_SIZE["LARGE"] = "lg";
})(MENU_SIZE || (MENU_SIZE = {}));
/**
 * menu item kind
 */
var MENU_ITEM_KIND;
(function (MENU_ITEM_KIND) {
    /**
     * default kind
     */
    MENU_ITEM_KIND["DEFAULT"] = "default";
    /**
     * danger kind
     */
    MENU_ITEM_KIND["DANGER"] = "danger";
})(MENU_ITEM_KIND || (MENU_ITEM_KIND = {}));
/**
 * Menu background token.
 */
var MENU_BACKGROUND_TOKEN;
(function (MENU_BACKGROUND_TOKEN) {
    /**
     * Use the layer token for the background.
     */
    MENU_BACKGROUND_TOKEN["LAYER"] = "layer";
    /**
     * Use the background token for the background.
     */
    MENU_BACKGROUND_TOKEN["BACKGROUND"] = "background";
})(MENU_BACKGROUND_TOKEN || (MENU_BACKGROUND_TOKEN = {}));

export { MENU_BACKGROUND_TOKEN, MENU_ITEM_KIND, MENU_SIZE };
//# sourceMappingURL=defs.js.map
