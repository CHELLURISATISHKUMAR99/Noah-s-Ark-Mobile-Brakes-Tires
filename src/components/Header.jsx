import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { BUSINESS, CALL_LABEL, VISIBLE_NAV_LINKS } from '../data/business'
import { resolveTextHref, useSmsCapable } from '../hooks/useSmsCapable'
import CtaButton from './CtaButton'
import './Header.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

function Header() {
  const [isCompact, setIsCompact] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Motion drives the compact state; the height change itself is a CSS
  // transition so we never animate layout from JS.
  const smsCapable = useSmsCapable()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsCompact(value > 24)
  })

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Resizing to desktop while the menu is open would otherwise leave the body
  // scroll-locked with no visible way to close it.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    function onChange(event) {
      if (event.matches) setIsMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Escape closes, and Tab is trapped inside the panel while it is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return

      const items = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!items || items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, closeMenu])

  return (
    <header className={`header${isCompact ? ' header--compact' : ''}`}>
      <div className="header__inner">
        <a
          className="header__brand"
          href="/"
          aria-label={`${BUSINESS.name} — home`}
        >
          <img
            className="header__logo header__logo--full"
            src="/assets/logo/logo-horizontal-dark.svg"
            alt=""
            width="284"
            height="72"
          />
          <img
            className="header__logo header__logo--mark"
            src="/assets/logo/logo-shield-color.svg"
            alt=""
            width="64"
            height="72"
          />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul className="header__nav-list">
            {VISIBLE_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="header__nav-link"
                  href={resolveTextHref(link.href, smsCapable)}
                  aria-label={
                    link.ariaLabel && !smsCapable && link.href.startsWith('sms:')
                      ? `${link.label} — go to the request form`
                      : link.ariaLabel
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <CtaButton
            className="header__call"
            variant="call"
            href={BUSINESS.phoneHref}
            aria-label={CALL_LABEL}
          >
            <span className="header__call-long">Call Now</span>
            <span className="header__call-short">Call</span>
          </CtaButton>

          <button
            ref={toggleRef}
            type="button"
            className="header__toggle"
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="header__toggle-label">
              {isMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              {isMenuOpen ? (
                <path
                  fill="currentColor"
                  d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z"
                />
              ) : (
                <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="header__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        id={panelId}
        ref={panelRef}
        className="header__panel"
        hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="header__panel-list">
            {VISIBLE_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="header__panel-link"
                  href={resolveTextHref(link.href, smsCapable)}
                  aria-label={
                    link.ariaLabel && !smsCapable && link.href.startsWith('sms:')
                      ? `${link.label} — go to the request form`
                      : link.ariaLabel
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="header__panel-hours">{BUSINESS.hours}</p>
      </div>
    </header>
  )
}

export default Header
