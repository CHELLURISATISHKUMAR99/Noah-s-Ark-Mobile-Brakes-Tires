import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './ServiceVideo.css'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

function hasSaveData() {
  if (typeof navigator === 'undefined') return false
  return Boolean(navigator.connection?.saveData)
}

/**
 * Decorative, silent background loop.
 *
 * - Nothing is fetched until the frame is within 300px of the viewport.
 * - Playback pauses once the frame is substantially out of view.
 * - Reduced-motion or Save-Data renders the poster still and no <video>.
 */
function ServiceVideo({ video }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [saveData] = useState(hasSaveData)
  const [isNear, setIsNear] = useState(false)

  const posterOnly = reduceMotion || saveData

  // Defer any network request until the frame approaches the viewport.
  useEffect(() => {
    if (posterOnly) return undefined
    const frame = frameRef.current
    if (!frame || typeof IntersectionObserver === 'undefined') {
      setIsNear(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [posterOnly])

  // <source> children added after mount need an explicit load().
  useEffect(() => {
    if (posterOnly || !isNear) return
    videoRef.current?.load()
  }, [posterOnly, isNear, isMobile])

  // Pause when substantially outside the viewport, resume when visible.
  useEffect(() => {
    if (posterOnly || !isNear) return undefined
    const frame = frameRef.current
    const element = videoRef.current
    if (!frame || !element || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          element.play()?.catch(() => {})
        } else {
          element.pause()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [posterOnly, isNear])

  if (posterOnly) {
    return (
      <div className="service-video" ref={frameRef}>
        <img
          className="service-video__media"
          src={video.poster}
          width={video.width}
          height={video.height}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className="service-video" ref={frameRef}>
      <video
        ref={videoRef}
        className="service-video__media"
        poster={video.poster}
        width={video.width}
        height={video.height}
        preload="none"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      >
        {isNear &&
          (isMobile ? (
            <source src={video.mobile} type="video/mp4" />
          ) : (
            <>
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </>
          ))}
      </video>
    </div>
  )
}

export default ServiceVideo
