import { motion, useReducedMotion } from 'motion/react'
import {
  LABEL_COLUMN_X,
  LABEL_LAYOUT,
  LEADER_END_X,
  MAP_VIEW,
  projectAreas,
  scaleBarLength,
} from '../data/serviceArea'
import './CoverageMap.css'

const EASE = [0.22, 0.61, 0.36, 1]

const { points, unitsPerMile, centroid } = projectAreas()
const BAR_MILES = 2
const BAR_LENGTH = scaleBarLength(BAR_MILES, unitsPerMile)

const group = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const mark = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
}

/**
 * Dependency-free coverage diagram.
 *
 * The five approved primary areas are plotted at true relative scale (verified
 * to ~0.1% against great-circle distance). The radiating arcs are unlabelled on
 * purpose: they show that coverage extends outward without asserting a
 * boundary distance the business has not published. Everything shown here is
 * also stated in text beside the diagram.
 */
function CoverageMap() {
  const reduceMotion = useReducedMotion()
  const gridLines = []
  for (let x = 50; x < MAP_VIEW.width; x += 50) gridLines.push({ x })
  for (let y = 50; y < MAP_VIEW.height; y += 50) gridLines.push({ y })

  const corridor = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <motion.svg
      className="coverage"
      viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Diagram of the five primary service areas — Plainfield, North Plainfield, South Plainfield, Edison and Piscataway — plotted to relative scale, with coverage extending outward beyond them."
      variants={group}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <rect
        width={MAP_VIEW.width}
        height={MAP_VIEW.height}
        className="coverage__ground"
      />

      {gridLines.map((line, i) =>
        line.x !== undefined ? (
          <line
            key={`gx-${i}`}
            className="coverage__grid"
            x1={line.x}
            y1="0"
            x2={line.x}
            y2={MAP_VIEW.height}
          />
        ) : (
          <line
            key={`gy-${i}`}
            className="coverage__grid"
            x1="0"
            y1={line.y}
            x2={MAP_VIEW.width}
            y2={line.y}
          />
        ),
      )}

      {/* Coverage radiating outward — deliberately unlabelled and cropped. */}
      {[190, 275, 360].map((r) => (
        <circle
          key={r}
          className="coverage__reach"
          cx={centroid.x}
          cy={centroid.y}
          r={r}
        />
      ))}

      {/* Soft corridor through the primary areas. */}
      <polyline className="coverage__zone" points={corridor} />
      <polyline className="coverage__spine" points={corridor} />

      {points.map((p) => {
        const labelY = LABEL_LAYOUT[p.name].y
        return (
          <motion.g key={p.name} variants={mark}>
            <line
              className="coverage__leader"
              x1={p.x + 9}
              y1={p.y}
              x2={LEADER_END_X}
              y2={labelY}
            />
            <rect
              className="coverage__marker"
              x={p.x - 4}
              y={p.y - 4}
              width="8"
              height="8"
            />
            <text
              className="coverage__label"
              x={LABEL_COLUMN_X}
              y={labelY + 5}
            >
              {p.name}
            </text>
          </motion.g>
        )
      })}

      {/* North indicator */}
      <g className="coverage__north">
        <line x1="374" y1="32" x2="374" y2="52" />
        <text className="coverage__meta" x="374" y="24" textAnchor="middle">
          N
        </text>
      </g>

      {/* Scale bar — real distance, derived from the same projection. */}
      <g className="coverage__scale">
        <line x1="60" y1="466" x2={60 + BAR_LENGTH} y2="466" />
        <line x1="60" y1="461" x2="60" y2="471" />
        <line x1={60 + BAR_LENGTH} y1="461" x2={60 + BAR_LENGTH} y2="471" />
        <text className="coverage__meta" x="60" y="482">
          {BAR_MILES} mi
        </text>
      </g>
    </motion.svg>
  )
}

export default CoverageMap
