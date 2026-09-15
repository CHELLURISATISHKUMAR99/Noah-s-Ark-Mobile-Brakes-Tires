import { BUSINESS, SERVICES } from './business.js'

/**
 * Request-service form configuration and the SMS message it prepares.
 *
 * There is no backend. A valid submission only opens the visitor's messaging
 * app with a prepared message — nothing is transmitted, stored, or recorded.
 */

/** Destination derived from the existing constant, never re-typed. */
export const SMS_TO = BUSINESS.phoneHref.replace(/^tel:/, '')

/** The approved six services are the only selectable options. */
export const SERVICE_OPTIONS = SERVICES.map((service) => service.title)

export const EMPTY_REQUEST = {
  name: '',
  phone: '',
  service: '',
  vehicle: '',
  location: '',
  details: '',
}

export const REQUEST_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    control: 'input',
    type: 'text',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'phone',
    label: 'Callback phone',
    control: 'input',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
    inputMode: 'tel',
  },
  {
    name: 'service',
    label: 'Service needed',
    control: 'select',
    required: true,
  },
  {
    name: 'vehicle',
    label: 'Vehicle year, make and model',
    control: 'input',
    type: 'text',
    required: true,
    autoComplete: 'off',
  },
  {
    name: 'location',
    label: 'Service location or ZIP code',
    control: 'input',
    type: 'text',
    required: true,
    autoComplete: 'street-address',
  },
  {
    name: 'details',
    label: 'Additional details',
    control: 'textarea',
    required: false,
  },
]

export function validateRequest(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Enter your name so we know who to ask for.'
  }

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) {
    errors.phone = 'Enter a callback phone number.'
  } else if (digits.length < 10) {
    errors.phone = 'Enter a phone number with at least 10 digits.'
  }

  // Guards against a tampered option as well as an empty one.
  if (!values.service) {
    errors.service = 'Choose the service you need.'
  } else if (!SERVICE_OPTIONS.includes(values.service)) {
    errors.service = 'Choose a service from the list.'
  }

  if (!values.vehicle.trim()) {
    errors.vehicle = 'Enter the year, make and model of your vehicle.'
  }

  if (!values.location.trim()) {
    errors.location = 'Enter the service location or ZIP code.'
  }

  return errors
}

export function buildRequestBody(values) {
  const lines = [
    'Service request from the website.',
    `Name: ${values.name.trim()}`,
    `Callback: ${values.phone.trim()}`,
    `Service: ${values.service}`,
    `Vehicle: ${values.vehicle.trim()}`,
    `Location: ${values.location.trim()}`,
  ]

  if (values.details.trim()) {
    lines.push(`Details: ${values.details.trim()}`)
  }

  return lines.join('\n')
}

/**
 * The destination is a module constant and the body is fully percent-encoded,
 * so no field value can introduce another query parameter or change the
 * recipient.
 */
export function buildRequestSmsHref(values) {
  return `sms:${SMS_TO}?&body=${encodeURIComponent(buildRequestBody(values))}`
}

export const FOOTER_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Service Area', href: '#coverage' },
  { label: 'Request Service', href: '#request-service' },
]
