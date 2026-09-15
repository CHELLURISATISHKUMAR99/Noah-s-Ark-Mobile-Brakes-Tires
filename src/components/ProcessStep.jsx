import { motion } from 'motion/react'
import './ProcessStep.css'

const EASE = [0.22, 0.61, 0.36, 1]

const step = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

/**
 * One numbered step. Rendered inside an <ol>, so the ordinal is presentational
 * and the list itself carries the sequence semantics.
 */
function ProcessStep({ number, title, copy }) {
  return (
    <motion.li className="step" variants={step}>
      <p className="step__number" aria-hidden="true">
        {number}
      </p>
      <div className="step__body">
        <h3 className="step__title">{title}</h3>
        <p className="step__copy">{copy}</p>
      </div>
    </motion.li>
  )
}

export default ProcessStep
