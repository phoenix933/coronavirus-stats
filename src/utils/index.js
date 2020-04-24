export const formatNumber = (num) => num.toLocaleString();

export const getFlag = (code, size = 24) => `https://www.countryflags.io/${code}/flat/${size}.png`;

export function inViewport (element, fullyVisible = false, offset = { top: 0, bottom: 0 }) {
    const rect = element && element.getBoundingClientRect()
    const height = document.documentElement.clientHeight

    if (fullyVisible) {
        return (
        !!rect &&
        rect.top >= -offset.top &&
        rect.bottom <= height + offset.bottom
        )
    }

    return (
        !!rect &&
        rect.bottom >= -offset.top &&
        rect.top <= height + offset.bottom
    )
}
  