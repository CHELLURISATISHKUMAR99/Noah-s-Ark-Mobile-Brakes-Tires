import { useEffect, useRef, useState } from 'react'
import { BUSINESS, CALL_LABEL } from '../data/business'
import {
  EMPTY_REQUEST,
  REQUEST_FIELDS,
  SERVICE_OPTIONS,
  buildRequestBody,
  buildRequestSmsHref,
  validateRequest,
} from '../data/requestService'
import { useSmsCapable } from '../hooks/useSmsCapable'
import CtaButton from './CtaButton'
import './RequestForm.css'

const COPY_PROMPT = `This website is not sending your request. Copy it and call or text ${BUSINESS.phoneDisplay}.`
const COPIED = `Request copied. Call ${BUSINESS.phoneDisplay} or text it from your phone.`
const COPY_FALLBACK = 'Clipboard access is unavailable, so the request is selected for you — press Ctrl+C (or Cmd+C) to copy it.'

/**
 * No backend. A valid submission opens the visitor's messaging app with a
 * prepared message; nothing is sent, stored, or transmitted anywhere. Values
 * live in component state only — never localStorage, cookies, or a network.
 */
function RequestForm({ idPrefix }) {
  const [values, setValues] = useState(EMPTY_REQUEST)
  const [errors, setErrors] = useState({})
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [status, setStatus] = useState('')
  const [prepared, setPrepared] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const fieldRefs = useRef({})
  const resultRef = useRef(null)
  const preparedRef = useRef(null)
  const smsCapable = useSmsCapable()

  const fieldId = (name) => `${idPrefix}-${name}`
  const errorId = (name) => `${idPrefix}-${name}-error`

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    // Clear an error as soon as the visitor fixes it, but never re-validate
    // mid-typing before the first submit.
    if (wasSubmitted) {
      setErrors((current) => {
        if (!current[name]) return current
        const next = validateRequest({ ...values, [name]: value })
        const copy = { ...current }
        if (next[name]) copy[name] = next[name]
        else delete copy[name]
        return copy
      })
    }
  }

  function onBlur(name) {
    if (!wasSubmitted) return
    const next = validateRequest(values)
    setErrors((current) => {
      const copy = { ...current }
      if (next[name]) copy[name] = next[name]
      else delete copy[name]
      return copy
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    setWasSubmitted(true)

    const found = validateRequest(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('')
      // Entered values are deliberately left intact.
      const firstInvalid = REQUEST_FIELDS.find((field) => found[field.name])
      if (firstInvalid) fieldRefs.current[firstInvalid.name]?.focus()
      return
    }

    if (smsCapable) {
      setPrepared('')
      setStatus(
        'Your messaging app should now open with your request prepared. Nothing is sent until you send the message yourself.',
      )
      window.location.href = buildRequestSmsHref(values)
      return
    }

    // Desktop: never hand an sms: URI to the OS app picker. Show the prepared
    // text so it can be copied, called in, or sent from a phone.
    setStatus('')
    setCopyStatus('')
    setPrepared(buildRequestBody(values))
  }

  // Focus the result once it exists so keyboard and screen-reader users land
  // on it rather than being left at the submit button.
  useEffect(() => {
    if (prepared) resultRef.current?.focus()
  }, [prepared])

  async function onCopy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(prepared)
      setCopyStatus(COPIED)
    } catch {
      const node = preparedRef.current
      if (node) {
        node.focus()
        node.select()
      }
      setCopyStatus(COPY_FALLBACK)
    }
  }

  const errorCount = Object.keys(errors).length

  return (
    <form className="request-form" onSubmit={onSubmit} noValidate>
      <p className="request-form__legend">
        All fields marked <span className="request-form__req">required</span>{' '}
        must be completed.
      </p>

      {REQUEST_FIELDS.map((field) => {
        const invalid = Boolean(errors[field.name])
        const shared = {
          id: fieldId(field.name),
          name: field.name,
          value: values[field.name],
          onChange: (event) => update(field.name, event.target.value),
          onBlur: () => onBlur(field.name),
          ref: (node) => {
            fieldRefs.current[field.name] = node
          },
          'aria-invalid': invalid || undefined,
          'aria-describedby': invalid ? errorId(field.name) : undefined,
          className: `request-form__control${invalid ? ' request-form__control--invalid' : ''}`,
        }

        return (
          <div className="request-form__row" key={field.name}>
            <label className="request-form__label" htmlFor={fieldId(field.name)}>
              {field.label}{' '}
              {field.required ? (
                <span className="request-form__req">required</span>
              ) : (
                <span className="request-form__opt">optional</span>
              )}
            </label>

            {field.control === 'select' && (
              <div className="request-form__select-wrap">
                <select {...shared}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  className="request-form__chevron"
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path fill="currentColor" d="M2 5h12l-6 7z" />
                </svg>
              </div>
            )}

            {field.control === 'input' && (
              <input
                {...shared}
                type={field.type}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
              />
            )}

            {field.control === 'textarea' && (
              <textarea {...shared} rows={3} />
            )}

            {invalid && (
              <p className="request-form__error" id={errorId(field.name)}>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M8 1 15 14H1zm-.85 4.6v4.1h1.7V5.6zM8 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                  />
                </svg>
                <span className="request-form__error-prefix">Error:</span>{' '}
                {errors[field.name]}
              </p>
            )}
          </div>
        )
      })}

      <div className="request-form__actions">
        <button className="request-form__submit" type="submit">
          Prepare Service Text
        </button>
      </div>

      <p className="request-form__disclosure">
        {smsCapable
          ? 'Submitting opens your messaging app. Your request is not sent until you send the message. Message and data rates may apply.'
          : 'Submitting prepares your request on this page for you to copy. Your request is not sent until you call or text it yourself. Message and data rates may apply.'}
      </p>

      {prepared && (
        <section
          className="request-form__result"
          ref={resultRef}
          tabIndex={-1}
          aria-labelledby="prepared-heading"
        >
          <h3 className="request-form__result-title" id="prepared-heading">
            Your prepared request
          </h3>
          <p className="request-form__result-copy">{COPY_PROMPT}</p>

          <textarea
            className="request-form__prepared"
            ref={preparedRef}
            value={prepared}
            readOnly
            rows={8}
            aria-label="Prepared service request text"
          />

          <div className="request-form__result-actions">
            <button
              className="request-form__copy"
              type="button"
              onClick={onCopy}
            >
              Copy Request
            </button>
            <CtaButton
              variant="call"
              tone="dark"
              href={BUSINESS.phoneHref}
              aria-label={CALL_LABEL}
            >
              Call {BUSINESS.phoneDisplay}
            </CtaButton>
          </div>

          <p className="request-form__copy-status" role="status" aria-live="polite">
            {copyStatus}
          </p>
        </section>
      )}

      {/* One live region for both the error count and the prepared state. */}
      <p className="request-form__status" role="status" aria-live="polite">
        {errorCount > 0 &&
          `${errorCount} field${errorCount === 1 ? '' : 's'} need${errorCount === 1 ? 's' : ''} attention before your message can be prepared.`}
        {status}
      </p>
    </form>
  )
}

export default RequestForm
