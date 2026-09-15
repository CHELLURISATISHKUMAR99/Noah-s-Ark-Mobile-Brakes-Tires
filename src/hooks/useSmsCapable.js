import { useEffect, useState } from 'react'

/** Where desktop visitors go instead of an sms: URI. */
export const REQUEST_ANCHOR = '#request-service'

/**
 * Best-effort guess at whether this device can hand an `sms:` URI to a real
 * messaging app.
 *
 * LIMITATIONS — this is a heuristic, not a guarantee:
 *  - User-agent strings can be spoofed or frozen by privacy settings.
 *  - A touchscreen laptop reports a coarse pointer but may have no SMS app.
 *  - A desktop paired with a phone (Handoff, Phone Link, Google Messages for
 *    web) *can* send SMS but is deliberately treated as desktop, because the
 *    copyable request works there too.
 *  - `navigator.userAgentData.mobile` is Chromium-only.
 *  - iPadOS 13+ reports itself as "Macintosh"; touch points disambiguate.
 *
 * When the guess is wrong the failure is soft: a mobile user misread as
 * desktop still gets a copyable request and a working call button, and a
 * desktop user misread as mobile still gets the existing sms: link. No
 * functionality is lost either way.
 */
export function detectSmsCapable() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  // Chromium exposes this directly and it is the most reliable signal.
  const uaData = navigator.userAgentData
  if (uaData && typeof uaData.mobile === 'boolean') {
    return uaData.mobile
  }

  const ua = navigator.userAgent || ''
  if (/Android|iPhone|iPod|iPad|IEMobile|Opera Mini|Mobile|Silk/i.test(ua)) {
    return true
  }

  // iPadOS 13+ masquerades as macOS.
  if (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1) {
    return true
  }

  // Fall back to input capability rather than screen width: a narrow desktop
  // window is still a desktop.
  if (typeof window.matchMedia !== 'function') return false
  return (
    window.matchMedia('(pointer: coarse)').matches &&
    window.matchMedia('(hover: none)').matches
  )
}

export function useSmsCapable() {
  // The initialiser runs in the browser for this client-only app, and is
  // guarded so a non-DOM build environment resolves to `false`.
  const [capable, setCapable] = useState(detectSmsCapable)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined
    const query = window.matchMedia('(pointer: coarse)')
    const onChange = () => setCapable(detectSmsCapable())
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return capable
}

/**
 * Rewrites an `sms:` destination to the on-page request form on devices that
 * cannot usefully open one. Any other href is returned untouched.
 */
export function resolveTextHref(href, smsCapable) {
  if (typeof href !== 'string' || !href.startsWith('sms:')) return href
  return smsCapable ? href : REQUEST_ANCHOR
}
