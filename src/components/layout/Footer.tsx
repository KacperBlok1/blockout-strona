import { nav, site } from '../../content/site'

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

/** Renderujemy wyłącznie profile, które faktycznie uzupełniono w `site.social`. */
const socialLinks = Object.entries(site.social).filter(
  ([, url]) => url.length > 0,
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a
              className="footer__logo"
              href="#start"
              aria-label="Blockout — początek strony"
            >
              block<i>out</i>
            </a>
            <p className="footer__about">
              Projektujemy i produkujemy materiały reklamowe dla firm - od
              wizytówek po druk wielkoformatowy. Pracujemy w Koszalinie, przy
              Fińskiej 43B.
            </p>

            {socialLinks.length > 0 && (
              <ul
                className="footer__social"
                aria-label="Blockout w mediach społecznościowych"
              >
                {socialLinks.map(([key, url]) => (
                  <li key={key}>
                    <a
                      className="footer__social-link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {SOCIAL_LABELS[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="footer__cols">
            <nav aria-labelledby="footer-nav-title">
              <h2 className="footer__col-title" id="footer-nav-title">
                Nawigacja
              </h2>
              <ul className="footer__list">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a className="footer__link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="footer__col-title" id="footer-contact-title">
                Kontakt
              </h2>
              <ul
                className="footer__list"
                aria-labelledby="footer-contact-title"
              >
                <li>
                  <a
                    className="footer__link footer__contact-link"
                    href={`tel:${site.phoneHref}`}
                  >
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    className="footer__link footer__contact-link"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <address className="footer__address">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer__col-title" id="footer-company-title">
                Firma
              </h2>
              <ul
                className="footer__list"
                aria-labelledby="footer-company-title"
              >
                <li>
                  <a
                    className="footer__link footer__link--todo"
                    href="/polityka-prywatnosci"
                    title="Strona w przygotowaniu"
                  >
                    Polityka prywatności
                  </a>
                </li>
                <li>
                  <a
                    className="footer__link footer__link--todo"
                    href="/cookies"
                    title="Strona w przygotowaniu"
                  >
                    Pliki cookies
                  </a>
                </li>
                <li>
                  <a
                    className="footer__link footer__link--todo"
                    href="/dane-firmy"
                    title="Strona w przygotowaniu"
                  >
                    Dane firmy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="rule footer__rule" />

        <div className="footer__bottom">
          <p>© {year} Blockout. Wszystkie prawa zastrzeżone.</p>
          <p className="footer__made">{site.address.city}</p>
        </div>
      </div>
    </footer>
  )
}
