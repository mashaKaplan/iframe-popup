export declare const POPUP_EVENTS: {
    OPENED: string;
    CLOSED: string;
};
export declare class IFramePopup {
    private _src;
    private _id;
    private _name;
    private _forceMobile;
    private _forceDesktop;
    private _listeners;
    constructor(src: string, id?: string, name?: string);
    addEventListener(callback: (ev: string) => void): void;
    private notify;
    set forceMobile(value: boolean);
    set forceDesktop(value: boolean);
    show(): void;
    hide(): void;
}
