import { useEffect, useId, useRef, useState } from 'react'
import { BUSINESS, CALL_LABEL } from '../data/business'
import { checkZip } from '../data/serviceArea'
import './ZipChecker.css'

function ZipChecker() {
  const inputId = useId()
  const statusId = useId()
  const resultRef = useRef(null)
  const [zip, setZip] = useState('')
  const [result, setResult] = useState(null)

  function onSubmit(event) {
    event.preventDefault()
    setResult(checkZip(zip))
  }

  useEffect(() => {
    if (!result) return
    resultRef.current?.scrollIntoView({ block: 'nearest' })
  }, [result])

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

      {result && (
        <div
          className={`zip__result zip__result--${result.state}`}
          id={statusId}
          ref={resultRef}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <p className="zip__result-title">
            {isInvalid ? 'Check the ZIP' : result.title}
          </p>
          <p className="zip__result-copy">{result.message}</p>
          {!isInvalid && (
            <a className="zip__call" href={BUSINESS.phoneHref} aria-label={CALL_LABEL}>
              Call {BUSINESS.phoneDisplay}
            </a>
          )}
        </div>
      )}
    </form>
  )
}

export default ZipChecker
