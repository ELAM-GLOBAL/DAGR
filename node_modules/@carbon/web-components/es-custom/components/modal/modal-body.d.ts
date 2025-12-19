/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement } from 'lit';
/**
 * Modal body.
 *
 * @element cds-custom-modal-body
 */
declare class CDSModalBody extends LitElement {
    private userDefinedTabindex;
    connectedCallback(): void;
    checkScroll(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: any;
}
export default CDSModalBody;
