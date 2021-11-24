import { isMobileDevice } from "./common";

export const POPUP_EVENTS = {
    OPENED: "opened",
    CLOSED: "closed"
};

export class IFramePopup {
    private _src: string;
    private _id: string;
    private _name: string;
    private _forceMobile: boolean = false;
    private _forceDesktop: boolean = false;

    private _listeners: Array<(ev: string) => void>;

    constructor(src: string, id?: string, name?: string){
        this._listeners = [];
        this._src = src;
        this._id = id || `splitit-iframe-popup-${Math.random().toString(36).substring(7)}`;
        this._name = name || this._id;
    }

    public addEventListener(callback: (ev:string) => void){
        this._listeners.push(callback);
    }

    private notify(ev: string){
        this._listeners.forEach(cb => cb(ev));
    }

    set forceMobile(value: boolean) {
        this._forceMobile = value;
    }

    set forceDesktop(value: boolean) {
        this._forceDesktop = value;
    }

    public show(){
        let showMobile = isMobileDevice();
        if (this._forceMobile){
            showMobile = true;
        }
        if (this._forceDesktop){
            showMobile = false;
        }

        this.notify(POPUP_EVENTS.OPENED);

        if (showMobile) {
            var divSandbox = document.createElement('div');
            divSandbox.id = this._id;
            divSandbox.classList.add('splitit-iframe-popup-wrapper');
            divSandbox.style.position = 'fixed';
            divSandbox.style.bottom = '0px';
            divSandbox.style.left = '0px';
            divSandbox.style.right = '0px';
            divSandbox.style.top = '0px';
            divSandbox.style.zIndex = "2147483647";
            divSandbox.style.margin = '0px';
            divSandbox.style.border = '0px';
            divSandbox.style.padding = '0px';
            divSandbox.style.display = 'block';
            // divSandbox.style.webkitTapHighlightColor = 'transparent';

            var divSandboxIframeContainer = document.createElement('div');
            divSandboxIframeContainer.style.position = 'fixed';
            divSandboxIframeContainer.style.overflowY = 'hidden';
            divSandboxIframeContainer.style.transform = 'translate3d(0px, 0px, 0px)';
            divSandboxIframeContainer.style.background = 'rgb(255,255,255)';
            divSandboxIframeContainer.style.height = '100%';
            divSandboxIframeContainer.style.width = '100%';
            divSandboxIframeContainer.style.margin = '0px';
            divSandboxIframeContainer.style.border = '0px';
            divSandboxIframeContainer.style.padding = '0px';

            var iframeMobile = document.createElement('iframe');
            iframeMobile.id = this._id;
            iframeMobile.name = this._name;
            iframeMobile.src = this._src;
            iframeMobile.style.overflow = 'hidden';
            iframeMobile.style.width = '100%';
            iframeMobile.style.height = '100%';
            iframeMobile.style.margin = '0px';
            iframeMobile.style.border = '0px';
            iframeMobile.style.padding = '0px';

            document.body.appendChild(divSandbox);
            divSandbox.appendChild(divSandboxIframeContainer);
            divSandboxIframeContainer.appendChild(iframeMobile);
        } else {
            var iframe:HTMLIFrameElement = document.createElement('iframe') as HTMLIFrameElement;
            iframe.id = this._id;
            iframe.name = this._name;
            iframe.src =  this._src;
            iframe.style.position = 'fixed';
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.right = "0";
            iframe.style.bottom = "0";
            iframe.style.zIndex = "2147483647";
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            // iframe['allowTransparency'] = true;
            iframe.frameBorder = "0";

            document.body.appendChild(iframe);
        }
    }

    public hide(){
        var el = document.getElementById(this._id);
        if (el){
            this.notify(POPUP_EVENTS.CLOSED);
            el.remove();
        }
    }
}