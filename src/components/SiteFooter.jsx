import { BUSINESS } from '../data/business'
import { FOOTER_LINKS } from '../data/requestService'
import { PRIMARY_AREAS } from '../data/serviceArea'
import './SiteFooter.css'

/**
 * Verified information only. No address, email, social profiles, licences,
 * certifications, reviews, or policy links exist for this business, so none
 * are shown.
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
          <p className="footer__note">{BUSINESS.availability}</p>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">Contact</h2>
          <a className="footer__phone" href={BUSINESS.phoneHref}>
            {BUSINESS.phoneDisplay}
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
          &copy; {year} {BUSINESS.name}
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
