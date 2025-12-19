/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement } from 'lit';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Locale as FlatpickrLocale } from 'flatpickr/dist/types/locale';
declare const CDSDatePicker_base: {
    new (...args: any[]): {
        _handles: Set<import("../../globals/internal/handle").default>;
        connectedCallback(): void;
        disconnectedCallback(): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        autocorrect: boolean;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element | null;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string | null;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        writingSuggestions: string;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(options?: boolean): boolean;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        get classList(): DOMTokenList;
        set classList(value: string);
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        readonly currentCSSZoom: number;
        id: string;
        innerHTML: string;
        readonly localName: string;
        readonly namespaceURI: string | null;
        onfullscreenchange: ((this: Element, ev: Event) => any) | null;
        onfullscreenerror: ((this: Element, ev: Event) => any) | null;
        outerHTML: string;
        readonly ownerDocument: Document;
        get part(): DOMTokenList;
        set part(value: string);
        readonly prefix: string | null;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot | null;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
        closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
        closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
        closest<E extends Element = Element>(selectors: string): E | null;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string | null;
        getAttributeNS(namespace: string | null, localName: string): string | null;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr | null;
        getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        getElementsByTagName<K extends keyof MathMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        getElementsByTagName<K extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
        getHTML(options?: GetHTMLOptions): string;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string | null, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
        insertAdjacentHTML(position: InsertPosition, string: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string | null, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(options?: PointerLockOptions): Promise<void>;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr | null;
        setAttributeNodeNS(attr: Attr): Attr | null;
        setHTMLUnsafe(html: string): void;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        get textContent(): string;
        set textContent(value: string | null);
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode | null;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode | null;
        readonly nextSibling: ChildNode | null;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string | null;
        readonly parentElement: HTMLElement | null;
        readonly parentNode: ParentNode | null;
        readonly previousSibling: ChildNode | null;
        appendChild<T extends Node>(node: T): T;
        cloneNode(subtree?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node | null): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T extends Node>(node: T, child: Node | null): T;
        isDefaultNamespace(namespace: string | null): boolean;
        isEqualNode(otherNode: Node | null): boolean;
        isSameNode(otherNode: Node | null): boolean;
        lookupNamespaceURI(prefix: string | null): string | null;
        lookupPrefix(namespace: string | null): string | null;
        normalize(): void;
        removeChild<T extends Node>(child: T): T;
        replaceChild<T extends Node>(node: Node, child: T): T;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaActiveDescendantElement: Element | null;
        ariaAtomic: string | null;
        ariaAutoComplete: string | null;
        ariaBrailleLabel: string | null;
        ariaBrailleRoleDescription: string | null;
        ariaBusy: string | null;
        ariaChecked: string | null;
        ariaColCount: string | null;
        ariaColIndex: string | null;
        ariaColIndexText: string | null;
        ariaColSpan: string | null;
        ariaControlsElements: ReadonlyArray<Element> | null;
        ariaCurrent: string | null;
        ariaDescribedByElements: ReadonlyArray<Element> | null;
        ariaDescription: string | null;
        ariaDetailsElements: ReadonlyArray<Element> | null;
        ariaDisabled: string | null;
        ariaErrorMessageElements: ReadonlyArray<Element> | null;
        ariaExpanded: string | null;
        ariaFlowToElements: ReadonlyArray<Element> | null;
        ariaHasPopup: string | null;
        ariaHidden: string | null;
        ariaInvalid: string | null;
        ariaKeyShortcuts: string | null;
        ariaLabel: string | null;
        ariaLabelledByElements: ReadonlyArray<Element> | null;
        ariaLevel: string | null;
        ariaLive: string | null;
        ariaModal: string | null;
        ariaMultiLine: string | null;
        ariaMultiSelectable: string | null;
        ariaOrientation: string | null;
        ariaOwnsElements: ReadonlyArray<Element> | null;
        ariaPlaceholder: string | null;
        ariaPosInSet: string | null;
        ariaPressed: string | null;
        ariaReadOnly: string | null;
        ariaRelevant: string | null;
        ariaRequired: string | null;
        ariaRoleDescription: string | null;
        ariaRowCount: string | null;
        ariaRowIndex: string | null;
        ariaRowIndexText: string | null;
        ariaRowSpan: string | null;
        ariaSelected: string | null;
        ariaSetSize: string | null;
        ariaSort: string | null;
        ariaValueMax: string | null;
        ariaValueMin: string | null;
        ariaValueNow: string | null;
        ariaValueText: string | null;
        role: string | null;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (Node | string)[]): void;
        before(...nodes: (Node | string)[]): void;
        remove(): void;
        replaceWith(...nodes: (Node | string)[]): void;
        readonly nextElementSibling: Element | null;
        readonly previousElementSibling: Element | null;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element | null;
        readonly lastElementChild: Element | null;
        append(...nodes: (Node | string)[]): void;
        prepend(...nodes: (Node | string)[]): void;
        querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
        querySelector<E extends Element = Element>(selectors: string): E | null;
        querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
        querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
        replaceChildren(...nodes: (Node | string)[]): void;
        readonly assignedSlot: HTMLSlotElement | null;
        readonly attributeStyleMap: StylePropertyMap;
        get style(): CSSStyleDeclaration;
        set style(cssText: string);
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
        onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onauxclick: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
        onbeforematch: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onbeforetoggle: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null;
        onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
        oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onclick: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncontextlost: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncontextmenu: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        oncontextrestored: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onerror: OnErrorEventHandler;
        onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
        onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
        ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerrawupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
        onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
        onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onscrollend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
        onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
        onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        ontoggle: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null;
        ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions): void;
    };
    _hostListeners: {
        [listenerName: string]: {
            [type: string]: {
                options?: boolean | AddEventListenerOptions;
            };
        };
    };
} & (abstract new (...args: any[]) => {
    _hFormdata: import("../../globals/internal/handle").default | null;
    _handleFormdata(event: Event): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    accessKey: string;
    readonly accessKeyLabel: string;
    autocapitalize: string;
    autocorrect: boolean;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    inert: boolean;
    innerText: string;
    lang: string;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element | null;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    outerText: string;
    popover: string | null;
    spellcheck: boolean;
    title: string;
    translate: boolean;
    writingSuggestions: string;
    attachInternals(): ElementInternals;
    click(): void;
    hidePopover(): void;
    showPopover(): void;
    togglePopover(options?: boolean): boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    readonly attributes: NamedNodeMap;
    get classList(): DOMTokenList;
    set classList(value: string);
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    readonly currentCSSZoom: number;
    id: string;
    innerHTML: string;
    readonly localName: string;
    readonly namespaceURI: string | null;
    onfullscreenchange: ((this: Element, ev: Event) => any) | null;
    onfullscreenerror: ((this: Element, ev: Event) => any) | null;
    outerHTML: string;
    readonly ownerDocument: Document;
    get part(): DOMTokenList;
    set part(value: string);
    readonly prefix: string | null;
    readonly scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    readonly shadowRoot: ShadowRoot | null;
    slot: string;
    readonly tagName: string;
    attachShadow(init: ShadowRootInit): ShadowRoot;
    checkVisibility(options?: CheckVisibilityOptions): boolean;
    closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
    closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
    closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
    closest<E extends Element = Element>(selectors: string): E | null;
    computedStyleMap(): StylePropertyMapReadOnly;
    getAttribute(qualifiedName: string): string | null;
    getAttributeNS(namespace: string | null, localName: string): string | null;
    getAttributeNames(): string[];
    getAttributeNode(qualifiedName: string): Attr | null;
    getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
    getBoundingClientRect(): DOMRect;
    getClientRects(): DOMRectList;
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof MathMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
    getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
    getHTML(options?: GetHTMLOptions): string;
    hasAttribute(qualifiedName: string): boolean;
    hasAttributeNS(namespace: string | null, localName: string): boolean;
    hasAttributes(): boolean;
    hasPointerCapture(pointerId: number): boolean;
    insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
    insertAdjacentHTML(position: InsertPosition, string: string): void;
    insertAdjacentText(where: InsertPosition, data: string): void;
    matches(selectors: string): boolean;
    releasePointerCapture(pointerId: number): void;
    removeAttribute(qualifiedName: string): void;
    removeAttributeNS(namespace: string | null, localName: string): void;
    removeAttributeNode(attr: Attr): Attr;
    requestFullscreen(options?: FullscreenOptions): Promise<void>;
    requestPointerLock(options?: PointerLockOptions): Promise<void>;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    setAttribute(qualifiedName: string, value: string): void;
    setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
    setAttributeNode(attr: Attr): Attr | null;
    setAttributeNodeNS(attr: Attr): Attr | null;
    setHTMLUnsafe(html: string): void;
    setPointerCapture(pointerId: number): void;
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
    webkitMatchesSelector(selectors: string): boolean;
    get textContent(): string;
    set textContent(value: string | null);
    readonly baseURI: string;
    readonly childNodes: NodeListOf<ChildNode>;
    readonly firstChild: ChildNode | null;
    readonly isConnected: boolean;
    readonly lastChild: ChildNode | null;
    readonly nextSibling: ChildNode | null;
    readonly nodeName: string;
    readonly nodeType: number;
    nodeValue: string | null;
    readonly parentElement: HTMLElement | null;
    readonly parentNode: ParentNode | null;
    readonly previousSibling: ChildNode | null;
    appendChild<T extends Node>(node: T): T;
    cloneNode(subtree?: boolean): Node;
    compareDocumentPosition(other: Node): number;
    contains(other: Node | null): boolean;
    getRootNode(options?: GetRootNodeOptions): Node;
    hasChildNodes(): boolean;
    insertBefore<T extends Node>(node: T, child: Node | null): T;
    isDefaultNamespace(namespace: string | null): boolean;
    isEqualNode(otherNode: Node | null): boolean;
    isSameNode(otherNode: Node | null): boolean;
    lookupNamespaceURI(prefix: string | null): string | null;
    lookupPrefix(namespace: string | null): string | null;
    normalize(): void;
    removeChild<T extends Node>(child: T): T;
    replaceChild<T extends Node>(node: Node, child: T): T;
    readonly ELEMENT_NODE: 1;
    readonly ATTRIBUTE_NODE: 2;
    readonly TEXT_NODE: 3;
    readonly CDATA_SECTION_NODE: 4;
    readonly ENTITY_REFERENCE_NODE: 5;
    readonly ENTITY_NODE: 6;
    readonly PROCESSING_INSTRUCTION_NODE: 7;
    readonly COMMENT_NODE: 8;
    readonly DOCUMENT_NODE: 9;
    readonly DOCUMENT_TYPE_NODE: 10;
    readonly DOCUMENT_FRAGMENT_NODE: 11;
    readonly NOTATION_NODE: 12;
    readonly DOCUMENT_POSITION_DISCONNECTED: 1;
    readonly DOCUMENT_POSITION_PRECEDING: 2;
    readonly DOCUMENT_POSITION_FOLLOWING: 4;
    readonly DOCUMENT_POSITION_CONTAINS: 8;
    readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
    dispatchEvent(event: Event): boolean;
    ariaActiveDescendantElement: Element | null;
    ariaAtomic: string | null;
    ariaAutoComplete: string | null;
    ariaBrailleLabel: string | null;
    ariaBrailleRoleDescription: string | null;
    ariaBusy: string | null;
    ariaChecked: string | null;
    ariaColCount: string | null;
    ariaColIndex: string | null;
    ariaColIndexText: string | null;
    ariaColSpan: string | null;
    ariaControlsElements: ReadonlyArray<Element> | null;
    ariaCurrent: string | null;
    ariaDescribedByElements: ReadonlyArray<Element> | null;
    ariaDescription: string | null;
    ariaDetailsElements: ReadonlyArray<Element> | null;
    ariaDisabled: string | null;
    ariaErrorMessageElements: ReadonlyArray<Element> | null;
    ariaExpanded: string | null;
    ariaFlowToElements: ReadonlyArray<Element> | null;
    ariaHasPopup: string | null;
    ariaHidden: string | null;
    ariaInvalid: string | null;
    ariaKeyShortcuts: string | null;
    ariaLabel: string | null;
    ariaLabelledByElements: ReadonlyArray<Element> | null;
    ariaLevel: string | null;
    ariaLive: string | null;
    ariaModal: string | null;
    ariaMultiLine: string | null;
    ariaMultiSelectable: string | null;
    ariaOrientation: string | null;
    ariaOwnsElements: ReadonlyArray<Element> | null;
    ariaPlaceholder: string | null;
    ariaPosInSet: string | null;
    ariaPressed: string | null;
    ariaReadOnly: string | null;
    ariaRelevant: string | null;
    ariaRequired: string | null;
    ariaRoleDescription: string | null;
    ariaRowCount: string | null;
    ariaRowIndex: string | null;
    ariaRowIndexText: string | null;
    ariaRowSpan: string | null;
    ariaSelected: string | null;
    ariaSetSize: string | null;
    ariaSort: string | null;
    ariaValueMax: string | null;
    ariaValueMin: string | null;
    ariaValueNow: string | null;
    ariaValueText: string | null;
    role: string | null;
    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
    getAnimations(options?: GetAnimationsOptions): Animation[];
    after(...nodes: (Node | string)[]): void;
    before(...nodes: (Node | string)[]): void;
    remove(): void;
    replaceWith(...nodes: (Node | string)[]): void;
    readonly nextElementSibling: Element | null;
    readonly previousElementSibling: Element | null;
    readonly childElementCount: number;
    readonly children: HTMLCollection;
    readonly firstElementChild: Element | null;
    readonly lastElementChild: Element | null;
    append(...nodes: (Node | string)[]): void;
    prepend(...nodes: (Node | string)[]): void;
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
    querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
    querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    replaceChildren(...nodes: (Node | string)[]): void;
    readonly assignedSlot: HTMLSlotElement | null;
    readonly attributeStyleMap: StylePropertyMap;
    get style(): CSSStyleDeclaration;
    set style(cssText: string);
    contentEditable: string;
    enterKeyHint: string;
    inputMode: string;
    readonly isContentEditable: boolean;
    onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onauxclick: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
    onbeforematch: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onbeforetoggle: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null;
    onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onclick: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncontextlost: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncontextmenu: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    oncontextrestored: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
    oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
    ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onerror: OnErrorEventHandler;
    onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
    ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
    onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerrawupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
    onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onscrollend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
    onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
    onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontoggle: ((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null;
    ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
    autofocus: boolean;
    readonly dataset: DOMStringMap;
    nonce?: string;
    tabIndex: number;
    blur(): void;
    focus(options?: FocusOptions): void;
}) & typeof LitElement;
/**
 * Date picker.
 *
 * @element cds-date-picker
 * @fires cds-date-picker-changed - The custom event fired on this element when Flatpickr updates its value.
 * @fires cds-date-picker-flatpickr-error
 *   The name of the custom event when Flatpickr throws an error.
 */
declare class CDSDatePicker extends CDSDatePicker_base {
    /**
     * The slotted `<cds-date-input kind="from">`.
     */
    private _dateInteractNode;
    /**
     * The element to put calendar dropdown in.
     */
    private _floatingMenuContainerNode;
    /**
     * The internal placeholder for the `value` property.
     */
    private _value;
    /**
     * @returns The effective date picker mode, determined by the child `<cds-date-picker-input>`.
     */
    private get _mode();
    /**
     * @returns The Flatpickr plugins to use.
     */
    private get _datePickerPlugins();
    /**
     * @returns The options to instantiate Flatpickr with.
     */
    private get _datePickerOptions();
    /**
     * Handles `${prefix}-date-picker-changed` event on this element.
     */
    private _handleChange;
    _handleFormdata(event: FormDataEvent): void;
    /**
     * Handles `slotchange` event in the `<slot>`.
     */
    private _handleSlotChange;
    /**
     * Fires a custom event to notify an error in Flatpickr.
     */
    private _handleFlatpickrError;
    /**
     * Sets calendar options
     * @param property property to set
     * @param calendar calendar object
     */
    private _setCalendar;
    /**
     * Instantiates Flatpickr.
     *
     * @returns The Flatpickr instance.
     */
    private _instantiateDatePicker;
    /**
     * Releases Flatpickr instances.
     */
    private _releaseDatePicker;
    /**
     * The Flatpickr instance.
     */
    calendar: FlatpickrInstance | null;
    /**
     * flatpickr prop passthrough. Allows the user to enter a date directly into the input field
     */
    allowInput: boolean;
    /**
     * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
     */
    closeOnSelect: boolean;
    /**
     * The date format to let Flatpickr use.
     */
    dateFormat: string;
    /**
     * Controls the disabled state of the input
     */
    disabled: boolean;
    /**
     * The date range that a user can pick in calendar dropdown.
     */
    enabledRange: string;
    /**
     * The localization data.
     */
    locale: FlatpickrLocale;
    /**
     * The maximum date that a user can start picking from.
     */
    maxDate: string;
    /**
     * The minimum date that a user can start picking from.
     */
    minDate: string;
    /**
     * Name for the input in the `FormData`
     */
    name: string;
    /**
     * `true` if the date picker should be open.
     */
    open: boolean;
    /**
     * Specify if the component should be read-only
     */
    readonly: boolean;
    /**
     * The date(s) in ISO8601 format (date portion only), for range mode, '/' is used for separate start/end dates.
     */
    get value(): string;
    set value(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: any): void;
    render(): import("lit-html").TemplateResult<1>;
    /**
     * The CSS selector for Flatpickr's month/year portion.
     */
    private static _selectorFlatpickrMonthYearContainer;
    /**
     * The CSS selector for Flatpickr's year portion.
     */
    private static _selectorFlatpickrYearContainer;
    /**
     * The CSS selector for the inner element of Flatpickr's month portion.
     */
    private static _selectorFlatpickrCurrentMonth;
    /**
     * The CSS selector for Flatpickr's month navigator.
     */
    private static _selectorFlatpickrMonth;
    /**
     * The CSS selector for Flatpickr's container of the weekdays.
     */
    private static _selectorFlatpickrWeekdays;
    /**
     * The CSS selector for Flatpickr's container of the days.
     */
    private static _selectorFlatpickrDays;
    /**
     * The CSS selector applied to Flatpickr's each weekdays.
     */
    private static _selectorFlatpickrWeekday;
    /**
     * The CSS selector applied to Flatpickr's each days.
     */
    private static _selectorFlatpickrDay;
    /**
     * The CSS class for the inner element of Flatpickr's month portion.
     */
    private static _classFlatpickrCurrentMonth;
    /**
     * The CSS class applied to Flatpickr's "today" highlight.
     */
    private static _classFlatpickrToday;
    /**
     * The CSS class for the calendar dropdown.
     */
    static get classCalendarContainer(): string;
    /**
     * The CSS class for the month navigator.
     */
    static get classMonth(): string;
    /**
     * The CSS class for the container of the weekdays.
     */
    static get classWeekdays(): string;
    /**
     * The CSS class for the container of the days.
     */
    static get classDays(): string;
    /**
     * The CSS class applied to each weekdays.
     */
    static get classWeekday(): string;
    /**
     * The CSS class applied to each days.
     */
    static get classDay(): string;
    /**
     * The CSS class applied to the "today" highlight if there are any dates selected.
     */
    static classNoBorder: string;
    /**
     * The default date format.
     */
    static defaultDateFormat: string;
    /**
     * The default localization data.
     */
    static defaultLocale: import("flatpickr/dist/types/locale").CustomLocale & FlatpickrLocale;
    /**
     * A selector that will return the `<input>` to enter starting date.
     */
    static get selectorInputFrom(): string;
    /**
     * A selector that will return the `<input>` to enter end date.
     */
    static get selectorInputTo(): string;
    /**
     * The name of the custom event when Flatpickr throws an error.
     */
    static get eventFlatpickrError(): string;
    /**
     * The name of the custom event fired on this element when Flatpickr updates its value.
     */
    static get eventChange(): string;
    static styles: any;
}
export default CDSDatePicker;
