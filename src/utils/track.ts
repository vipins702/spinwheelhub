type EventParams = Record<string, string | number | boolean>

// Sends a Google Analytics event. Does nothing off the live site (localhost, previews) or where the tag
// isn't loaded (embeds, blocked scripts). Never pass names or other text people typed.
export const trackEvent = (name: string, params: EventParams = {}) => {
    try {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
        if (window.location.hostname === 'spinwheelhub.org' && typeof gtag === 'function') {
            gtag('event', name, params)
        }
    } catch {
        // Analytics must never break the page
    }
}
