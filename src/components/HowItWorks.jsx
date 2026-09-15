import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  BUSINESS,
  CALL_LABEL,
  HOW_IT_WORKS_IMAGE,
  HOW_IT_WORKS_STEPS,
  REQUEST_LABEL,
  SMS_HREF,
} from '../data/business'
import { resolveTextHref, useSmsCapable } from '../hooks/useSmsCapable'
import CtaButton from './CtaButton'
import ProcessStep from './ProcessStep'
import './HowItWorks.css'

const EASE = [0.22, 0.61, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const stack = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const stepList = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const revealImage = {
  hidden: { opacity: 0, scale: 1.03 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
}

function HowItWorks() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const smsCapable = useSmsCapable()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Very small drift inside a 106%-tall clipped frame — never exposes an edge.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <section
      className="how"
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-heading"
    >
      <div className="how__inner">
        <motion.div
          className="how__media"
          variants={revealImage}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.img
            className="how__image"
            src={HOW_IT_WORKS_IMAGE.src}
            srcSet={HOW_IT_WORKS_IMAGE.srcSet}
            sizes={HOW_IT_WORKS_IMAGE.sizes}
            width={HOW_IT_WORKS_IMAGE.width}
            height={HOW_IT_WORKS_IMAGE.height}
            alt={HOW_IT_WORKS_IMAGE.alt}
            loading="lazy"
            decoding="async"
            style={reduceMotion ? undefined : { y: imageY }}
          />
        </motion.div>

        <motion.div
          className="how__content"
          variants={stack}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="how__eyebrow" variants={rise}>
            How It Works
          </motion.p>

          <motion.h2 className="how__headline" id="how-heading" variants={rise}>
            Service brought to your location.
          </motion.h2>

          <motion.p className="how__copy" variants={rise}>
            Tell us what your vehicle needs and where you are. We’ll confirm
            availability before dispatching mobile service.
          </motion.p>

          <motion.ol className="how__steps" variants={stepList}>
            {HOW_IT_WORKS_STEPS.map((item) => (
              <ProcessStep
                key={item.number}
                number={item.number}
                title={item.title}
                copy={item.copy}
              />
            ))}
          </motion.ol>

          <motion.ul className="how__note" variants={rise}>
            <li>{BUSINESS.hours}</li>
            <li>{BUSINESS.radius}</li>
            <li>{BUSINESS.availability}</li>
          </motion.ul>

          <motion.div className="how__actions" variants={rise}>
            <CtaButton
              variant="call"
              tone="light"
              href={BUSINESS.phoneHref}
              aria-label={CALL_LABEL}
            >
              Call {BUSINESS.phoneDisplay}
            </CtaButton>
            <CtaButton
              variant="request"
              tone="light"
              href={resolveTextHref(SMS_HREF, smsCapable)}
              aria-label={
                smsCapable
                  ? REQUEST_LABEL
                  : 'Text for Service — go to the request form'
              }
              title={
                smsCapable
                  ? REQUEST_LABEL
                  : 'Text for Service — go to the request form'
              }
            >
              Text for Service
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
