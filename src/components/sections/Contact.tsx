import { site } from '../../content/site'
import { ContactForm } from '../ContactForm'
import { Reveal } from '../ui/Reveal'

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function Contact() {
  return (
    <section
      className="section contact"
      id="kontakt"
      aria-labelledby="contact-title"
    >
      <div className="container contact__grid">
        <Reveal className="contact__head section-head">
          <p className="eyebrow">Kontakt</p>
          <h2 id="contact-title">
            Opowiedz, co ma powstać. <em>Wrócimy z konkretem.</em>
          </h2>
          <p className="lead">
            Wystarczy kilka zdań: co, w jakim formacie i gdzie ma stanąć. Resztę
            dopytamy sami — wycena jest bez zobowiązań.
          </p>
        </Reveal>

        <Reveal className="contact__form" delay={0.08}>
          <ContactForm />
        </Reveal>

        <Reveal className="contact__details" delay={0.16} as="dl">
          <div className="contact__row">
            <dt className="contact__label">
              <span className="contact__icon">
                <svg {...ICON_PROPS}>
                  <path d="M4.5 5.5a2 2 0 0 1 2-2h2l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5Z" />
                </svg>
              </span>
              <span className="contact__label-text">Telefon</span>
            </dt>
            <dd className="contact__value">
              <a className="contact__link" href={`tel:${site.phoneHref}`}>
                {site.phone}
              </a>
            </dd>
          </div>

          <div className="contact__row">
            <dt className="contact__label">
              <span className="contact__icon">
                <svg {...ICON_PROPS}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3.5 6.5 8.5 6 8.5-6" />
                </svg>
              </span>
              <span className="contact__label-text">E-mail</span>
            </dt>
            <dd className="contact__value">
              <a className="contact__link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>

          <div className="contact__row">
            <dt className="contact__label">
              <span className="contact__icon">
                <svg {...ICON_PROPS}>
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span className="contact__label-text">Adres</span>
            </dt>
            <dd className="contact__value">
              <address>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </dd>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
