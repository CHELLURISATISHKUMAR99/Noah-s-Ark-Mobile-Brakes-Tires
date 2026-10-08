import { useEffect, useRef, useState } from 'react'
import './ServiceMap.css'

const MAP_LABEL =
  'Map of the mobile service area, centered on South Plainfield, New Jersey, with markers for Plainfield, North Plainfield, South Plainfield, Edison, and Piscataway.'

/**
 * Loads Leaflet only once this block is near the viewport, so the map library
 * and tiles stay off the first paint.
 */
function ServiceMap() {
  const hostRef = useRef(null)
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let mapHandle
    let cancelled = false
    let observer

    const start = () => {
      setStatus('loading')
      import('./serviceMapLeaflet.js')
        .then(({ mountServiceMap }) => {
          if (cancelled || !hostRef.current) return
          mapHandle = mountServiceMap(hostRef.current)
          setStatus('ready')
        })
        .catch(() => {
          if (!cancelled) setStatus('error')
        })
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer.disconnect()
          start()
        },
        { rootMargin: '240px 0px' },
      )
      observer.observe(host)
    } else {
      start()
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      mapHandle?.remove()
    }
  }, [])

  return (
    <div className="service-map">
      <div
        ref={hostRef}
        className="service-map__canvas"
        role="region"
        aria-label={MAP_LABEL}
        title={MAP_LABEL}
        aria-busy={status !== 'ready'}
      />
      {status !== 'ready' && (
        <p className="service-map__pending" role="status">
          {status === 'error'
            ? 'Map unavailable. The towns are listed beside this map.'
            : 'Loading map'}
        </p>
      )}
    </div>
  )
}

export default ServiceMap
