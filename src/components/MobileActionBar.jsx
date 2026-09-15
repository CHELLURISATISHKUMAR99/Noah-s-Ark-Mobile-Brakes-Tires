import { BUSINESS, CALL_LABEL, REQUEST_LABEL, SMS_HREF } from '../data/business'
import { resolveTextHref, useSmsCapable } from '../hooks/useSmsCapable'
import './MobileActionBar.css'

/**
 * Fixed bottom bar, mobile only. The page reserves matching bottom padding
 * (see App.css) so this never covers content.
 */
function MobileActionBar() {
  const smsCapable = useSmsCapable()

  return (
    <div className="actionbar" role="group" aria-label="Quick actions">
      <a
        className="actionbar__call"
        href={BUSINESS.phoneHref}
        aria-label={CALL_LABEL}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1z"
          />
        </svg>
        <span>Call Now</span>
      </a>
      <a
        className="actionbar__request"
        href={resolveTextHref(SMS_HREF, smsCapable)}
        aria-label={
          smsCapable ? REQUEST_LABEL : 'Text Us — go to the request form'
        }
        title={
          smsCapable ? REQUEST_LABEL : 'Text Us — go to the request form'
        }
      >
        Text Us
      </a>
    </div>
  )
}

export default MobileActionBar
