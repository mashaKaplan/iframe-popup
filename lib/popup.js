"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFramePopup = exports.POPUP_EVENTS = void 0;
var common_1 = require("./common");
exports.POPUP_EVENTS = {
    OPENED: "opened",
    CLOSED: "closed"
};
var IFramePopup = /** @class */ (function () {
    function IFramePopup(src, id, name) {
        this._forceMobile = false;
        this._forceDesktop = false;
        this._listeners = [];
        this._src = src;
        this._id = id || "splitit-iframe-popup-".concat(Math.random().toString(36).substring(7));
        this._name = name || this._id;
    }
    IFramePopup.prototype.addEventListener = function (callback) {
        this._listeners.push(callback);
    };
    IFramePopup.prototype.notify = function (ev) {
        this._listeners.forEach(function (cb) { return cb(ev); });
    };
    Object.defineProperty(IFramePopup.prototype, "forceMobile", {
        set: function (value) {
            this._forceMobile = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IFramePopup.prototype, "forceDesktop", {
        set: function (value) {
            this._forceDesktop = value;
        },
        enumerable: false,
        configurable: true
    });
    IFramePopup.prototype.show = function () {
        var showMobile = (0, common_1.isMobileDevice)();
        if (this._forceMobile) {
            showMobile = true;
        }
        if (this._forceDesktop) {
            showMobile = false;
        }
        this.notify(exports.POPUP_EVENTS.OPENED);
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
        }
        else {
            var iframe = document.createElement('iframe');
            iframe.id = this._id;
            iframe.name = this._name;
            iframe.src = this._src;
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
    };
    IFramePopup.prototype.hide = function () {
        var el = document.getElementById(this._id);
        if (el) {
            this.notify(exports.POPUP_EVENTS.CLOSED);
            el.remove();
        }
    };
    return IFramePopup;
}());
exports.IFramePopup = IFramePopup;
