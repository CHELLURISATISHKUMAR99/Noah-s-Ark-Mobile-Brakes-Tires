import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PRIMARY_AREAS } from '../data/serviceArea'

const MAP_LABEL =
  'Map of the mobile service area, centered on South Plainfield, New Jersey, with markers for Plainfield, North Plainfield, South Plainfield, Edison, and Piscataway.'

const METERS_PER_MILE = 1609.344

/**
 * Which side the town name sits on, so the two Plainfields — about a mile
 * apart — don't land on the same label.
 */
const LABEL_DIRECTION = {
  Plainfield: 'right',
  'North Plainfield': 'left',
  'South Plainfield': 'right',
  Edison: 'left',
  Piscataway: 'right',
}

function milesBetween(a, b) {
  const latRad = (((a.lat + b.lat) / 2) * Math.PI) / 180
  const milesPerLon = 69.05 * Math.cos(latRad)
  const dLat = (b.lat - a.lat) * 69.05
  const dLon = (b.lon - a.lon) * milesPerLon
  return Math.hypot(dLat, dLon)
}

function accentColor() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim()
  return value || '#f05a28'
}

/**
 * Real map of the five primary towns. Tiles are CARTO's dark basemap, which
 * is rendered from OpenStreetMap data and needs no API key.
 *
 * The ring is centered on South Plainfield and sized to hold the five town
 * centers. It is not the published 50-mile service area — that sentence stays
 * in the copy beside the map. Drawing 50 miles here would shrink the towns
 * onto one dot. Markers are town centers, not a street address.
 */
export function mountServiceMap(container) {
  const centerArea =
    PRIMARY_AREAS.find((area) => area.name === 'South Plainfield') ??
    PRIMARY_AREAS[0]
  const center = [centerArea.lat, centerArea.lon]
  const farthest = Math.max(
    ...PRIMARY_AREAS.map((area) => milesBetween(centerArea, area)),
  )
  const radiusMeters = (farthest + 1.5) * METERS_PER_MILE
  const accent = accentColor()

  const map = L.map(container, {
    center,
    zoom: 11,
    scrollWheelZoom: false,
    fadeAnimation: false,
    zoomAnimation: false,
    attributionControl: true,
    zoomControl: true,
  })

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" rel="noopener noreferrer">CARTO</a>',
    },
  ).addTo(map)

  const circle = L.circle(center, {
    radius: radiusMeters,
    color: accent,
    weight: 2,
    dashArray: '6 8',
    fillColor: accent,
    fillOpacity: 0.08,
    interactive: false,
  }).addTo(map)

  const icon = L.divIcon({
    className: 'service-map__pin',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })

  for (const area of PRIMARY_AREAS) {
    const direction = LABEL_DIRECTION[area.name] ?? 'right'
    const marker = L.marker([area.lat, area.lon], {
      icon,
      keyboard: true,
      title: area.name,
      alt: `${area.name}, New Jersey`,
    }).addTo(map)

    marker.bindTooltip(area.name, {
      permanent: true,
      direction,
      offset: direction === 'left' ? [-10, 0] : [10, 0],
      className: 'service-map__label',
      opacity: 1,
    })
  }

  L.control
    .scale({ imperial: true, metric: false, position: 'bottomleft' })
    .addTo(map)

  map.fitBounds(circle.getBounds(), {
    padding: [28, 28],
    animate: false,
  })

  container.setAttribute('role', 'region')
  container.setAttribute('aria-label', MAP_LABEL)
  container.setAttribute('title', MAP_LABEL)

  const onResize = () => map.invalidateSize()
  const resize = new ResizeObserver(onResize)
  resize.observe(container)
  requestAnimationFrame(onResize)

  return {
    remove() {
      resize.disconnect()
      map.remove()
    },
  }
}
