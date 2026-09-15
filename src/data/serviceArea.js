/**
 * Service-area configuration, kept separate from the approved content in
 * business.js so that file stays untouched.
 *
 * The five towns are the approved primary areas. Their coordinates are real
 * published values, projected to true relative scale — the visualisation never
 * asserts a boundary the business has not stated.
 *
 * There is no ZIP coverage dataset yet. `checkZip` therefore validates format
 * only and always returns the same neutral answer. Replace `COVERAGE_LOOKUP`
 * with a real implementation when that data exists.
 */

export const PRIMARY_AREAS = [
  { name: 'Plainfield', lat: 40.6337, lon: -74.4074 },
  { name: 'North Plainfield', lat: 40.6298, lon: -74.4288 },
  { name: 'South Plainfield', lat: 40.5793, lon: -74.4118 },
  { name: 'Edison', lat: 40.5187, lon: -74.4121 },
  { name: 'Piscataway', lat: 40.4993, lon: -74.3899 },
]

const MILES_PER_DEGREE_LAT = 69.05

export const MAP_VIEW = {
  width: 400,
  height: 500,
  plotLeft: 60,
  plotRight: 200,
  plotTop: 70,
  plotBottom: 430,
}

/**
 * Equirectangular projection with a cos(lat) correction on longitude, scaled
 * uniformly on both axes so the plotted spacing is geographically true.
 */
export function projectAreas(points = PRIMARY_AREAS, view = MAP_VIEW) {
  const lat0 = points.reduce((sum, p) => sum + p.lat, 0) / points.length
  const lon0 = points.reduce((sum, p) => sum + p.lon, 0) / points.length
  const k = Math.cos((lat0 * Math.PI) / 180)

  const raw = points.map((p) => ({
    name: p.name,
    x: (p.lon - lon0) * k,
    y: -(p.lat - lat0),
  }))

  const xs = raw.map((p) => p.x)
  const ys = raw.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)

  const plotWidth = view.plotRight - view.plotLeft
  const plotHeight = view.plotBottom - view.plotTop
  // One scale for both axes keeps the relative distances honest.
  const scale = Math.min(
    plotWidth / (xMax - xMin || 1),
    plotHeight / (yMax - yMin || 1),
  )

  const centreX = (view.plotLeft + view.plotRight) / 2
  const midX = (xMin + xMax) / 2

  const plotted = raw.map((p) => ({
    name: p.name,
    x: Number((centreX + (p.x - midX) * scale).toFixed(2)),
    y: Number((view.plotTop + (p.y - yMin) * scale).toFixed(2)),
  }))

  const unitsPerMile = scale / MILES_PER_DEGREE_LAT

  return {
    points: plotted,
    unitsPerMile: Number(unitsPerMile.toFixed(3)),
    centroid: {
      x: Number(
        (plotted.reduce((s, p) => s + p.x, 0) / plotted.length).toFixed(2),
      ),
      y: Number(
        (plotted.reduce((s, p) => s + p.y, 0) / plotted.length).toFixed(2),
      ),
    },
  }
}

/** Scale bar length in view units, for a given distance in miles. */
export function scaleBarLength(miles, unitsPerMile) {
  return Number((miles * unitsPerMile).toFixed(2))
}

export const ZIP_PATTERN = /^\d{5}(-\d{4})?$/

/**
 * Placeholder for a real coverage dataset. Deliberately returns `unknown` for
 * every ZIP — the UI must never claim a ZIP is inside or outside the area.
 */
const COVERAGE_LOOKUP = () => 'unknown'

export function checkZip(input) {
  const value = String(input ?? '').trim()

  if (!value) {
    return {
      state: 'invalid',
      message: 'Enter a ZIP code to check availability.',
    }
  }

  if (!ZIP_PATTERN.test(value)) {
    return {
      state: 'invalid',
      message: 'Enter a valid 5-digit US ZIP code.',
    }
  }

  const coverage = COVERAGE_LOOKUP(value)
  if (coverage !== 'unknown') {
    // Reserved for real data. Not reachable today.
    return { state: coverage, zip: value, message: '' }
  }

  return {
    state: 'pending',
    zip: value,
    message: `Service availability for ZIP ${value} will be confirmed by dispatch.`,
  }
}

/**
 * Label placement for the coverage diagram.
 *
 * Markers stay at their projected coordinates; only the labels move. They are
 * pulled out to a single right-hand callout column with short leader lines,
 * which removes the Plainfield / North Plainfield collision and guarantees a
 * fixed vertical rhythm no matter how the towns sit.
 *
 * `y` is the leader end and the vertical centre of the label.
 */
export const LABEL_COLUMN_X = 212
export const LEADER_END_X = 204
export const LABEL_FONT_SIZE = 15

export const LABEL_LAYOUT = {
  Plainfield: { y: 70 },
  'North Plainfield': { y: 96 },
  'South Plainfield': { y: 216 },
  Edison: { y: 374 },
  Piscataway: { y: 430 },
}

/** Approximate glyph advance for the mono label face, in view units. */
const MONO_ADVANCE = 0.6

/** Bounding boxes for every drawn text run — used by the collision test. */
export function labelBoxes(points = projectAreas().points) {
  return points.map((p) => {
    const { y } = LABEL_LAYOUT[p.name]
    const width = p.name.length * LABEL_FONT_SIZE * MONO_ADVANCE
    return {
      name: p.name,
      x1: LABEL_COLUMN_X,
      x2: LABEL_COLUMN_X + width,
      y1: y - 6,
      y2: y + 9,
    }
  })
}
