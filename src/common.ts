export function isMobileDevice() :boolean {
    return screen.width <= 480 || window.matchMedia("only screen and (max-width: 760px)").matches;
}

