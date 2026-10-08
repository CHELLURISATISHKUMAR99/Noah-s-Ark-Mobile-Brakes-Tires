import {
  BUSINESS,
  CALL_LABEL,
  HERO_IMAGE,
  REQUEST_LABEL,
  SMS_HREF,
} from '../data/business'
import { PRIMARY_AREAS } from '../data/serviceArea'
import CtaButton from './CtaButton'
import './Hero.css'

const TOWN_LINE = `${PRIMARY_AREAS.map((area) => area.name).join(' · ')}, NJ`

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__grid">
        <div className="hero__panel">
          {/* Three spans so the desktop break points are deterministic.
              They stay inline below 1024px, preserving the mobile wrap. */}
          <h1 className="hero__headline" id="hero-heading">
            <span className="hero__headline-line">Mobile Brake &amp;</span>{' '}
            <span className="hero__headline-line">
              Tire Service <span className="hero__em-dash">—</span>
            </span>{' '}
            <span className="hero__headline-line">Wherever You Are</span>
          </h1>

          <p className="hero__copy">
            We come to your home, workplace, or the side of the road.
          </p>

          <p className="hero__towns">{TOWN_LINE}</p>

          <div className="hero__actions">
            <CtaButton
              variant="call"
              tone="dark"
              href={BUSINESS.phoneHref}
              aria-label={CALL_LABEL}
            >
              Call {BUSINESS.phoneDisplay}
            </CtaButton>
            <CtaButton
              variant="request"
              tone="dark"
              href={SMS_HREF}
              aria-label={REQUEST_LABEL}
            >
              Text for Service
            </CtaButton>
          </div>

          <p className="hero__availability">
            <span className="hero__availability-dot" aria-hidden="true" />
            {BUSINESS.hours}
          </p>
        </div>

        <div className="hero__media">
          <picture>
            <source media="(min-width: 1024px)" srcSet={HERO_IMAGE.src} />
            <img
              className="hero__image"
              src={HERO_IMAGE.mobileSrc}
              width={750}
              height={593}
              alt={HERO_IMAGE.alt}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}

export default Hero
