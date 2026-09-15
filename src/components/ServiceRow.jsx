import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BUSINESS, smsHrefForService } from '../data/business'
import { resolveTextHref, useSmsCapable } from '../hooks/useSmsCapable'
import ServiceVideo from './ServiceVideo'
import './ServiceRow.css'

const EASE = [0.22, 0.61, 0.36, 1]

const group = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

const drawRule = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
}

const revealImage = {
  hidden: { opacity: 0, scale: 1.03 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

function ServiceRow({ service, reversed }) {
  const rowRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const smsCapable = useSmsCapable()

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  })
  // Deliberately tiny. The frame clips at 106% height, so ±2.5% never
  // exposes an edge and nothing reflows.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%'])

  // Desktop cannot usefully open an sms: URI, so it goes to the on-page form
  // instead. Same helper the header, hero and action bar use.
  const href = resolveTextHref(smsHrefForService(service.title), smsCapable)
  const label = smsCapable
    ? `Text for service: ${service.title}, to ${BUSINESS.phoneDisplay}`
    : `Text for Service: ${service.title} — go to the request form`
  const hasVideo = Boolean(service.video)

  const classes = [
    'service-row',
    reversed ? 'service-row--reversed' : '',
    hasVideo ? 'service-row--video' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.li
      className={classes}
      ref={rowRef}
      variants={group}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="service-row__text">
        <motion.p className="service-row__number" aria-hidden="true" variants={rise}>
          {service.number}
        </motion.p>

        <motion.span
          className="service-row__rule"
          aria-hidden="true"
          variants={drawRule}
        />

        <motion.h3 className="service-row__title" variants={rise}>
          {service.title}
        </motion.h3>

        <motion.p className="service-row__copy" variants={rise}>
          {service.copy}
        </motion.p>

        <motion.p className="service-row__action" variants={rise}>
          <a className="service-row__link" href={href} aria-label={label} title={label}>
            <span>Text for Service</span>
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M10.6 3.3 9.2 4.7 13.5 9H2v2h11.5l-4.3 4.3 1.4 1.4L17.4 10z"
              />
            </svg>
          </a>
        </motion.p>
      </div>

      {hasVideo && (
        <motion.div className="service-row__videoframe" variants={revealImage}>
          <ServiceVideo video={service.video} />
        </motion.div>
      )}

      {service.image && (
        <motion.div className="service-row__media" variants={revealImage}>
          <motion.img
            className="service-row__image"
            src={service.image.src}
            width={service.image.width}
            height={service.image.height}
            alt={service.image.alt}
            loading="lazy"
            decoding="async"
            style={{
              objectPosition: service.image.objectPosition,
              ...(service.image.filter ? { filter: service.image.filter } : {}),
              ...(reduceMotion ? {} : { y: imageY }),
            }}
          />
        </motion.div>
      )}
    </motion.li>
  )
}

export default ServiceRow
