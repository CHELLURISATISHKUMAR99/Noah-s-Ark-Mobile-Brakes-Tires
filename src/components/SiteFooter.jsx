import { BUSINESS, REQUEST_LABEL, SMS_HREF } from '../data/business'
import { FOOTER_LINKS } from '../data/requestService'
import { PRIMARY_AREAS } from '../data/serviceArea'
import './SiteFooter.css'

/**
 * Verified information only. No address, email, or licence is shown.
 * The Google rating in the reviews section is the public total only.
 */
function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/logo/logo-horizontal-light.svg"
            alt={BUSINESS.name}
            width="284"
            height="72"
          />
          <p className="footer__radius">{BUSINESS.radius}</p>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Contact</h2>
          <a className="footer__phone" href={BUSINESS.phoneHref}>
            Call {BUSINESS.phoneDisplay}
          </a>
          <a
            className="footer__text"
            href={SMS_HREF}
            aria-label={REQUEST_LABEL}
          >
            Text {BUSINESS.phoneDisplay}
          </a>
          <p className="footer__hours">{BUSINESS.hours}</p>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Primary areas</h2>
          <ul className="footer__list">
            {PRIMARY_AREAS.map((area) => (
              <li key={area.name}>{area.name}</li>
            ))}
          </ul>
          <p className="footer__hours">New Jersey</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__title">Explore</h2>
          <ul className="footer__list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a className="footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__bar">
        <p className="footer__copyright">
          <span>
            &copy; {year} {BUSINESS.name}
          </span>
          <a className="footer__site" href={BUSINESS.siteUrl}>
            noahsarkmobilebrakes.com
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
