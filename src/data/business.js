// Single source of truth for business facts used across the site.

export const BUSINESS = {
  name: 'Noah’s Ark Mobile Brakes & Tires',
  phoneDisplay: '(908) 279-2100',
  phoneHref: 'tel:+19082792100',
  hours: 'Monday–Saturday · 8 AM–7 PM',
  coverage:
    'Serving Plainfield, North Plainfield, South Plainfield, Edison & Piscataway',
  radius: 'Approximately 50-mile service area',
  availability: 'Call to confirm availability',
}

// Interim destination for "Request Service" until the form is built.
export const REQUEST_MESSAGE =
  'Hello, I need mobile brake or tire service. My location is: _____. My vehicle is: _____. The issue is: _____.'

// `?&body=` is the form that works on both iOS and Android; iOS ignores a bare
// `?body=` and Android ignores a bare `&body=`.
export const SMS_HREF = `sms:+19082792100?&body=${encodeURIComponent(
  REQUEST_MESSAGE,
)}`

/**
 * Same approved message, with the chosen service named so the reply arrives
 * with context. Falls back to the generic SMS_HREF when no service is given.
 */
export function smsHrefForService(serviceName) {
  const message =
    'Hello, I need mobile brake or tire service. ' +
    `Service needed: ${serviceName}. ` +
    'My location is: _____. My vehicle is: _____. The issue is: _____.'
  return `sms:+19082792100?&body=${encodeURIComponent(message)}`
}

export const CALL_LABEL = `Call ${BUSINESS.name} at ${BUSINESS.phoneDisplay}`
export const REQUEST_LABEL = `Request service by text message to ${BUSINESS.phoneDisplay}`

/**
 * `enabled: false` hides a link until its section exists, so no broken anchor
 * is ever visible. To restore one, flip its flag back to true once the
 * matching section id is on the page.
 *
 * Note: the label "Request Service" is deliberately reserved for the future
 * on-site form. Anything that opens the SMS composer says "Text ..." instead,
 * so the label always matches what actually happens.
 */
export const NAV_LINKS = [
  { label: 'Services', href: '#services', enabled: true },
  { label: 'How It Works', href: '#how-it-works', enabled: true },
  // #service-area is the DispatchStrip's anchor (frozen); the full section is #coverage
  { label: 'Service Area', href: '#coverage', enabled: true },
  {
    label: 'Text for Service',
    href: SMS_HREF,
    enabled: true,
    ariaLabel: REQUEST_LABEL,
  },
]

export const VISIBLE_NAV_LINKS = NAV_LINKS.filter((link) => link.enabled)

export const HERO_IMAGE = {
  src: '/assets/images/hero-mobile-tire-service-1920.webp',
  srcSet:
    '/assets/images/hero-mobile-tire-service-900.webp 900w, /assets/images/hero-mobile-tire-service-1920.webp 1920w',
  width: 1920,
  height: 3412,
  alt: 'A technician kneeling on asphalt beside a black hatchback, fitting the front wheel by hand with an impact wrench resting on the ground beside him.',
}

/**
 * Service index 01–06. Copy is the approved wording; alt text is written from
 * the photographs themselves. Entry 06 has no image and renders as a
 * deliberate typography-led row.
 */
export const SERVICES = [
  {
    number: '01',
    slug: 'brake-inspection',
    title: 'Brake inspection',
    copy: 'On-location inspection when your brakes squeal, grind, vibrate, or feel different.',
    image: {
      src: '/assets/images/service-brake-inspection-900.webp',
      width: 900,
      height: 600,
      objectPosition: '50% 50%',
      alt: 'A gloved hand lifting the brake pad assembly away from an exposed brake disc underneath a vehicle.',
    },
  },
  {
    number: '02',
    slug: 'pads-rotors',
    title: 'Pads & rotors',
    copy: 'Mobile brake pad and rotor replacement for supported passenger vehicles.',
    image: {
      src: '/assets/images/service-pads-rotors-900.webp',
      width: 900,
      height: 601,
      objectPosition: '50% 50%',
      alt: 'A cross-drilled and slotted brake rotor with its wheel hub and lug bolts exposed, the vehicle raised on a stand.',
    },
  },
  {
    number: '03',
    slug: 'caliper-service',
    title: 'Caliper service',
    copy: 'Brake caliper evaluation and service based on your vehicle’s condition.',
    image: {
      src: '/assets/images/service-caliper-900.webp',
      width: 900,
      height: 600,
      objectPosition: '50% 50%',
      alt: 'A red brake caliper gripping the disc, seen through the spokes of a silver alloy wheel.',
    },
  },
  {
    number: '04',
    slug: 'tire-installation',
    title: 'Tire installation',
    copy: 'Tire replacement and installation performed at your convenient location.',
    image: {
      src: '/assets/images/service-tire-installation-900.webp',
      width: 900,
      height: 601,
      objectPosition: '50% 45%',
      alt: 'A technician in red work gloves guiding an alloy wheel and tire into position, with the vehicle raised on stands behind.',
    },
  },
  {
    number: '05',
    slug: 'flat-tire-repair',
    title: 'Flat-tire repair',
    copy: 'Assessment and repair of eligible punctures, or help installing your spare.',
    image: {
      src: '/assets/images/service-flat-tire-900.webp',
      width: 900,
      height: 1350,
      // portrait source in a 3:2 frame — bias down to keep the wheel centred
      objectPosition: '50% 60%',
      // Source frame is dim and flat; lift it enough to read the tread and rim.
      filter: 'brightness(1.11) contrast(1.06)',
      alt: 'A fully deflated tire on the steel wheel of a brown van, resting on paving stones.',
    },
  },
  {
    number: '06',
    slug: 'rotation-roadside',
    title: 'Rotation & roadside assistance',
    copy: 'Tire rotation and emergency roadside tire help, subject to availability.',
    image: null,
    // Silent, decorative loop. The adjacent copy carries the meaning, so the
    // element is aria-hidden rather than captioned.
    video: {
      poster: '/assets/video/impact-wrench-wheel-poster.webp',
      webm: '/assets/video/impact-wrench-wheel-1080.webm',
      mp4: '/assets/video/impact-wrench-wheel-1080.mp4',
      mobile: '/assets/video/impact-wrench-wheel-720.mp4',
      width: 1920,
      height: 1080,
    },
  },
]

/**
 * "How It Works" process steps. Step 01 composes the phone number from
 * BUSINESS so the number is never written twice.
 */
export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Call or text',
    copy: `Call ${BUSINESS.phoneDisplay} or send a service text with your location and vehicle details.`,
  },
  {
    number: '02',
    title: 'Confirm availability',
    copy: 'We’ll review the request, confirm the service location, and discuss availability.',
  },
  {
    number: '03',
    title: 'We come to you',
    copy: 'Mobile service is performed at your home, workplace, or roadside location when available.',
  },
]

export const HOW_IT_WORKS_IMAGE = {
  src: '/assets/images/mechanic-component-inspection-1920.webp',
  srcSet:
    '/assets/images/mechanic-component-inspection-900.webp 900w, /assets/images/mechanic-component-inspection-1920.webp 1920w',
  sizes: '(min-width: 1024px) 42vw, 100vw',
  width: 1920,
  height: 2880,
  alt: 'A mechanic in green nitrile gloves holding a greasy automotive component up close to inspect it, in a workshop.',
}
