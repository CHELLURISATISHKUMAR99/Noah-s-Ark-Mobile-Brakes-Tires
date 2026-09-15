import { motion, useReducedMotion } from 'motion/react'
import { BUSINESS } from '../data/business'
import { PRIMARY_AREAS } from '../data/serviceArea'
import CoverageMap from './CoverageMap'
import ZipChecker from './ZipChecker'
import './ServiceArea.css'

const EASE = [0.22, 0.61, 0.36, 1]

const stack = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function ServiceArea() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="area" id="coverage" aria-labelledby="area-heading">
      <div className="area__inner">
        <motion.div
          className="area__content"
          variants={stack}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="area__eyebrow" variants={rise}>
            Service Area
          </motion.p>

          <motion.h2 className="area__headline" id="area-heading" variants={rise}>
            Mobile service where you need it.
          </motion.h2>

          <motion.p className="area__copy" variants={rise}>
            Enter your ZIP code to request an availability confirmation for your
            area.
          </motion.p>

          <motion.div className="area__checker" variants={rise}>
            <ZipChecker />
          </motion.div>

          <motion.div className="area__facts" variants={rise}>
            <h3 className="area__facts-title">Primary areas</h3>
            <ul className="area__areas">
              {PRIMARY_AREAS.map((area) => (
                <li key={area.name}>{area.name}</li>
              ))}
            </ul>
            <p className="area__radius">{BUSINESS.radius}</p>
            <p className="area__note">{BUSINESS.availability}</p>
          </motion.div>
        </motion.div>

        <div className="area__map">
          <CoverageMap />
        </div>
      </div>
    </section>
  )
}

export default ServiceArea
