"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobileDevice = void 0;
function isMobileDevice() {
    return screen.width <= 480 || window.matchMedia("only screen and (max-width: 760px)").matches;
}
exports.isMobileDevice = isMobileDevice;
