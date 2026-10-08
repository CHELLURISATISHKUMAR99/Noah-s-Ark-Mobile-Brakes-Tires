/**
 * Service-area configuration, kept separate from the approved content in
 * business.js so that file stays untouched.
 *
 * Coordinates are town centers for the five primary areas. South Plainfield,
 * Edison, and Piscataway use the OpenStreetMap place nodes the basemap labels
 * are drawn on. Plainfield and North Plainfield use separated centers inside
 * each town so the two pins do not stack. They are not a street address.
 */

export const PRIMARY_AREAS = [
  { name: 'Plainfield', lat: 40.6337, lon: -74.4074 },
  { name: 'North Plainfield', lat: 40.6301, lon: -74.4274 },
  { name: 'South Plainfield', lat: 40.5793, lon: -74.4115 },
  { name: 'Edison', lat: 40.5005, lon: -74.3984 },
  { name: 'Piscataway', lat: 40.5464, lon: -74.4661 },
]

export const ZIP_PATTERN = /^\d{5}(-\d{4})?$/

/**
 * Published ZIP codes for the five named towns. 07060 is included because
 * Plainfield and North Plainfield use it; a few nearby towns share it too.
 */
const SERVED_ZIPS = {
  '07060': 'Plainfield and North Plainfield',
  '07061': 'Plainfield',
  '07062': 'Plainfield',
  '07063': 'Plainfield',
  '07080': 'South Plainfield',
  '08817': 'Edison',
  '08818': 'Edison',
  '08820': 'Edison',
  '08837': 'Edison',
  '08854': 'Piscataway',
  '08855': 'Piscataway',
}

/** Towns that border the five. These are nearby, not the primary list. */
const NEARBY_ZIPS = {
  '07023': 'Fanwood',
  '07059': 'Warren',
  '07065': 'Rahway',
  '07066': 'Clark',
  '07067': 'Colonia',
  '07069': 'Watchung',
  '07076': 'Scotch Plains',
  '07095': 'Woodbridge',
  '08805': 'Bound Brook',
  '08812': 'Dunellen',
  '08830': 'Iselin',
  '08840': 'Metuchen',
  '08846': 'Middlesex',
  '08873': 'Somerset',
  '08901': 'New Brunswick',
  '08902': 'North Brunswick',
  '08904': 'Highland Park',
  '07008': 'Carteret',
}

const TOWN_LIST =
  'Plainfield, North Plainfield, South Plainfield, Edison, and Piscataway'

export function checkZip(input) {
  const value = String(input ?? '').trim()

  if (!value) {
    return {
      state: 'invalid',
      message: 'Enter a ZIP code.',
    }
  }

  if (!ZIP_PATTERN.test(value)) {
    return {
      state: 'invalid',
      message: 'Enter a 5-digit US ZIP code.',
    }
  }

  const zip5 = value.slice(0, 5)
  const town = SERVED_ZIPS[zip5]
  if (town) {
    return {
      state: 'served',
      zip: zip5,
      title: 'In the area',
      message: `${zip5} is in ${town}. We come there. Call to schedule.`,
    }
  }

  const nearby = NEARBY_ZIPS[zip5]
  if (nearby) {
    return {
      state: 'nearby',
      zip: zip5,
      title: 'Nearby',
      message: `${zip5} is in ${nearby}, next to the towns we serve. Call and we will schedule if we can come that day.`,
    }
  }

  return {
    state: 'outside',
    zip: zip5,
    title: 'Outside this area',
    message: `${zip5} is outside ${TOWN_LIST}. Call if you are close and we will tell you.`,
  }
}
