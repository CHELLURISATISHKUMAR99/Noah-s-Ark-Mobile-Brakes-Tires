import { motion, useReducedMotion } from 'motion/react'
import { BUSINESS, CALL_LABEL } from '../data/business'
import CtaButton from './CtaButton'
import RequestForm from './RequestForm'
import './RequestService.css'

const EASE = [0.22, 0.61, 0.36, 1]

const stack = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function RequestService() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="request"
      id="request-service"
      aria-labelledby="request-heading"
    >
      <div className="request__inner">
        <motion.div
          className="request__intro"
          variants={stack}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="request__eyebrow" variants={rise}>
            Request Service
          </motion.p>

          <motion.h2
            className="request__headline"
            id="request-heading"
            variants={rise}
          >
            Tell us what your vehicle needs.
          </motion.h2>

          <motion.p className="request__copy" variants={rise}>
            Complete the details below. Submitting the form will open your
            messaging app with your service request prepared for{' '}
            {BUSINESS.phoneDisplay}.
          </motion.p>

          <motion.div className="request__actions" variants={rise}>
            <CtaButton
              variant="call"
              tone="dark"
              href={BUSINESS.phoneHref}
              aria-label={CALL_LABEL}
            >
              Call {BUSINESS.phoneDisplay}
            </CtaButton>
          </motion.div>

          <motion.dl className="request__facts" variants={rise}>
            <div>
              <dt>Hours</dt>
              <dd>{BUSINESS.hours}</dd>
            </div>
            <div>
              <dt>Service radius</dt>
              <dd>{BUSINESS.radius}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{BUSINESS.availability}</dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* The form itself is intentionally outside the reveal so no control
            animates while the visitor is filling it in. */}
        <div className="request__form">
          <RequestForm idPrefix="request-form" />
        </div>
      </div>
    </section>
  )
}

export default RequestService
