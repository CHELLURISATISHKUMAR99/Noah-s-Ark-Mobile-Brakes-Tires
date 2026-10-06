import { useEffect } from 'react'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

const GA_PATTERN = /^G-[A-Z0-9]+$/
const PIXEL_PATTERN = /^\d{6,20}$/

/**
 * Loads GA4 and the Meta Pixel only when real IDs are provided at build time.
 * Empty or malformed values inject nothing.
 */
function Analytics() {
  useEffect(() => {
    if (window.__noahsArkAnalyticsLoaded) return undefined
    window.__noahsArkAnalyticsLoaded = true

    if (typeof GA_ID === 'string' && GA_PATTERN.test(GA_ID)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', GA_ID)
    }

    if (typeof PIXEL_ID === 'string' && PIXEL_PATTERN.test(PIXEL_ID)) {
      const loader = document.createElement('script')
      loader.async = true
      loader.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(loader)

      const fbq = function fbq() {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
      }
      if (!window._fbq) window._fbq = fbq
      window.fbq = fbq
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.queue = []
      fbq('init', PIXEL_ID)
      fbq('track', 'PageView')
    }
  }, [])

  return null
}

export default Analytics
