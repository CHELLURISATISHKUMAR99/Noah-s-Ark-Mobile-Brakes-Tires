import { useEffect, useState } from 'react'
import { BUSINESS, CALL_LABEL, REQUEST_LABEL, SMS_HREF } from '../data/business'
import './MobileActionBar.css'

function isTextField(node) {
  return node instanceof HTMLElement && node.matches('input, textarea, select')
}

/**
 * Fixed bottom bar, mobile only. The page reserves matching bottom padding
 * (see App.css) so this never covers content. It steps aside while a field
 * is focused so the keyboard and the form controls stay usable.
 */
function MobileActionBar() {
  const [fieldFocused, setFieldFocused] = useState(false)

  useEffect(() => {
    function onFocusIn(event) {
      if (isTextField(event.target)) setFieldFocused(true)
    }

    function onFocusOut() {
      // iOS often leaves relatedTarget null while moving between fields.
      requestAnimationFrame(() => {
        if (!isTextField(document.activeElement)) setFieldFocused(false)
      })
    }

    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <div
      className={`actionbar${fieldFocused ? ' actionbar--hidden' : ''}`}
      role="group"
      aria-label="Call or text the shop"
      inert={fieldFocused ? true : undefined}
    >
      <a className="actionbar__call" href={BUSINESS.phoneHref} aria-label={CALL_LABEL}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1z"
          />
        </svg>
        <span className="actionbar__stack">
          <span className="actionbar__kicker">Call</span>
          <span className="actionbar__number">{BUSINESS.phoneDisplay}</span>
        </span>
      </a>
      <a
        className="actionbar__request"
        href={SMS_HREF}
        aria-label={REQUEST_LABEL}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M5 4.5A2.5 2.5 0 0 1 7.5 2h9A2.5 2.5 0 0 1 19 4.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.1 3.1c-.55.42-1.4.02-1.4-.68V4.5z"
          />
        </svg>
        <span className="actionbar__stack">
          <span className="actionbar__kicker">Text</span>
          <span className="actionbar__number">{BUSINESS.phoneDisplay}</span>
        </span>
      </a>
    </div>
  )
}

export default MobileActionBar
