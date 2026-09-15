import { useId, useState } from 'react'
import { BUSINESS, CALL_LABEL } from '../data/business'
import { checkZip } from '../data/serviceArea'
import './ZipChecker.css'

/**
 * Format-only ZIP check. There is no coverage dataset yet, so a well-formed
 * ZIP always returns the same neutral answer — the component never claims a
 * location is inside or outside the service area.
 */
function ZipChecker() {
  const inputId = useId()
  const statusId = useId()
  const [zip, setZip] = useState('')
  const [result, setResult] = useState(null)

  function onSubmit(event) {
    event.preventDefault()
    setResult(checkZip(zip))
  }

  const isInvalid = result?.state === 'invalid'

  return (
    <form className="zip" onSubmit={onSubmit} noValidate>
      <div className="zip__field">
        <label className="zip__label" htmlFor={inputId}>
          ZIP code
        </label>
        <input
          id={inputId}
          className="zip__input"
          type="text"
          name="zip"
          value={zip}
          onChange={(event) => setZip(event.target.value)}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={10}
          placeholder="00000"
          aria-invalid={isInvalid || undefined}
          aria-describedby={result ? statusId : undefined}
        />
      </div>

      <button className="zip__submit" type="submit">
        Check My ZIP
      </button>

      <p
        className={`zip__status${result ? ` zip__status--${result.state}` : ''}`}
        id={statusId}
        role="status"
        aria-live="polite"
      >
        {result && (
          <>
            <span className="zip__icon" aria-hidden="true">
              {isInvalid ? (
                <svg viewBox="0 0 16 16" width="15" height="15">
                  <path
                    fill="currentColor"
                    d="M8 1 15 14H1zm-.85 4.6v4.1h1.7V5.6zM8 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="15" height="15">
                  <path
                    fill="currentColor"
                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m.85 4.2v.9h-1.7v-.9zm-1.7 2.6h1.7v5h-1.7z"
                  />
                </svg>
              )}
            </span>
            {/* Text prefix so the state never depends on colour alone. */}
            <span className="zip__prefix">
              {isInvalid ? 'Check your entry:' : 'Pending confirmation:'}
            </span>{' '}
            {result.message}
            {result.state === 'pending' && (
              <>
                {' '}
                <a
                  className="zip__call"
                  href={BUSINESS.phoneHref}
                  aria-label={CALL_LABEL}
                >
                  Call {BUSINESS.phoneDisplay}
                </a>{' '}
                to confirm now.
              </>
            )}
          </>
        )}
      </p>
    </form>
  )
}

export default ZipChecker
