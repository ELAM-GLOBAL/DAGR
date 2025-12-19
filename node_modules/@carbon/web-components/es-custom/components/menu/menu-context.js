/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';

/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const menuDefaultState = {
    isRoot: true,
    hasSelectableItems: false,
    size: null,
    updateFromChild: () => { },
};
const MenuContext = createContext('myData');

export { MenuContext, menuDefaultState };
//# sourceMappingURL=menu-context.js.map
