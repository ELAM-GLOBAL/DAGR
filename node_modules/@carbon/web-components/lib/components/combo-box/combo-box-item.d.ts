/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PropertyValues } from 'lit';
import CDSDropdownItem from '../dropdown/dropdown-item';
/**
 * Combo box item.
 *
 * @element cds-combo-box-item
 */
declare class CDSComboBoxItem extends CDSDropdownItem {
    private _nextSiblingRefs;
    private _handleMouseEnter;
    private _handleMouseLeave;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _getNextItem;
    private _syncNextSibling;
    protected updated(changedProperties: PropertyValues): void;
    static styles: any;
}
export default CDSComboBoxItem;
