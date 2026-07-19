import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Lightweight, privacy-conscious visit tracker.
// Logs page path, referrer, device, and time-on-page to /api/track.
// Location (country/region/city) is added server-side from Vercel geo headers.
function getSessionId(): string {
    try {
        let id = sessionStorage.getItem('swh_sid')
        if (!id) {
            id = Math.random().toString(36).slice(2) + Date.now().toString(36)
            sessionStorage.setItem('swh_sid', id)
        }
        return id
    } catch {
        return 'anon'
    }
}

const VisitTracker = () => {
    const location = useLocation()
    const startRef = useRef<number>(Date.now())
    const pathRef = useRef<string>(location.pathname)

    // Send the previous page's duration, then reset for the new page.
    const flush = (path: string) => {
        const duration = Math.round((Date.now() - startRef.current) / 1000)
        const payload = JSON.stringify({
            path,
            referrer: document.referrer || null,
            duration,
            sessionId: getSessionId(),
        })
        try {
            if (navigator.sendBeacon) {
                navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
            } else {
                fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true })
            }
        } catch {
            /* analytics must never break the app */
        }
    }

    // On route change: flush the page we're leaving, start timing the new one.
    useEffect(() => {
        if (pathRef.current !== location.pathname) {
            flush(pathRef.current)
            pathRef.current = location.pathname
            startRef.current = Date.now()
        }
    }, [location.pathname])

    // On tab close / hide: flush the current page.
    useEffect(() => {
        const onHide = () => {
            if (document.visibilityState === 'hidden') flush(pathRef.current)
        }
        window.addEventListener('visibilitychange', onHide)
        window.addEventListener('pagehide', () => flush(pathRef.current))
        return () => {
            window.removeEventListener('visibilitychange', onHide)
        }
    }, [])

    return null
}

export default VisitTracker
