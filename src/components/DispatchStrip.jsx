import { motion, useReducedMotion } from 'motion/react'
import { BUSINESS } from '../data/business'
import './DispatchStrip.css'

const EASE = [0.22, 0.61, 0.36, 1]

const list = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

const ENTRIES = [
  { label: 'Primary areas', value: BUSINESS.coverage },
  { label: 'Service radius', value: BUSINESS.radius },
  { label: 'Availability', value: BUSINESS.availability },
]

/**
 * Compact dispatch band directly below the hero. Deliberately a definition
 * list on hairline rules rather than cards.
 */
function DispatchStrip() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="dispatch"
      id="service-area"
      aria-label="Service area and availability"
    >
      <motion.dl
        className="dispatch__list"
        variants={list}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
      >
        {ENTRIES.map((entry) => (
          <motion.div className="dispatch__item" key={entry.label} variants={item}>
            <dt className="dispatch__label">{entry.label}</dt>
            <dd className="dispatch__value">{entry.value}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  )
}

export default DispatchStrip
