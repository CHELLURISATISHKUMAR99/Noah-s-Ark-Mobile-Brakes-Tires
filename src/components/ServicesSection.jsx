import { SERVICES } from '../data/business'
import ServiceRow from './ServiceRow'
import './ServicesSection.css'

function ServicesSection() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="services__inner">
        <header className="services__head">
          <p className="services__eyebrow">What we do</p>
          <h2 className="services__heading" id="services-heading">
            Services
          </h2>
          <p className="services__dek">
            On-location brake and tire work.
          </p>
        </header>

        <ol className="services__list">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              /* Photo rows alternate. Row 06 is pinned text-left / video-right
                 rather than continuing the alternation. */
              reversed={!service.video && index % 2 === 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ServicesSection
