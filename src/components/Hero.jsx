import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  BUSINESS,
  CALL_LABEL,
  HERO_IMAGE,
  REQUEST_LABEL,
  SMS_HREF,
} from '../data/business'
import { resolveTextHref, useSmsCapable } from '../hooks/useSmsCapable'
import CtaButton from './CtaButton'
import './Hero.css'

const EASE = [0.22, 0.61, 0.36, 1]

// Controlled, one-shot entrance. Transform/opacity only, so nothing reflows.
const panel = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function Hero() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const smsCapable = useSmsCapable()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Very restrained parallax. The image is 112% tall inside an overflow-hidden
  // frame, so a 4% drift never exposes an edge.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-heading">
      <div className="hero__grid">
        <motion.div
          className="hero__panel"
          variants={panel}
          initial={reduceMotion ? false : 'hidden'}
          animate="shown"
        >
          {/* Three spans so the desktop break points are deterministic.
              They stay inline below 1024px, preserving the mobile wrap. */}
          <motion.h1 className="hero__headline" id="hero-heading" variants={rise}>
            <span className="hero__headline-line">Mobile Brake &amp;</span>{' '}
            <span className="hero__headline-line">
              Tire Service <span className="hero__em-dash">—</span>
            </span>{' '}
            <span className="hero__headline-line">Wherever You Are</span>
          </motion.h1>

          <motion.p className="hero__copy" variants={rise}>
            Professional brake and tire service brought to your home, workplace,
            or roadside location.
          </motion.p>

          <motion.div className="hero__actions" variants={rise}>
            <CtaButton
              variant="call"
              tone="dark"
              href={BUSINESS.phoneHref}
              aria-label={CALL_LABEL}
            >
              Call {BUSINESS.phoneDisplay}
            </CtaButton>
            <CtaButton
              variant="request"
              tone="dark"
              href={resolveTextHref(SMS_HREF, smsCapable)}
              aria-label={
                smsCapable ? REQUEST_LABEL : 'Text for Service — go to the request form'
              }
              title={
                smsCapable ? REQUEST_LABEL : 'Text for Service — go to the request form'
              }
            >
              Text for Service
            </CtaButton>
          </motion.div>

          <motion.p className="hero__availability" variants={rise}>
            <span className="hero__availability-dot" aria-hidden="true" />
            {BUSINESS.hours}
          </motion.p>
        </motion.div>

        <div className="hero__media">
          <motion.img
            className="hero__image"
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            alt={HERO_IMAGE.alt}
            fetchPriority="high"
            decoding="async"
            style={reduceMotion ? undefined : { y: imageY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
