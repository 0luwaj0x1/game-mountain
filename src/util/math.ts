export function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

export function getPixelWidthBasedOnViewport(
    pixelsFor1920Viewport: number
): number {
    return (window.outerWidth / 1920.0) * pixelsFor1920Viewport;
}
