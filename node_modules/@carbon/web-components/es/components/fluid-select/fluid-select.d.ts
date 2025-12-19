/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CDSSelect from '../select/select';
/**
 * Fluid text select.
 *
 * @element cds-fluid-select
 */
declare class CDSFluidSelect extends CDSSelect {
    connectedCallback(): void;
    updated(changedProperties: any): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: any[];
}
export default CDSFluidSelect;
