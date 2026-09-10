import { Reveal } from '../ui/Reveal'
import { services } from '../../content/services'

/**
 * Oferta — siatka editorialna rozdzielona hairline'ami.
 * Kafle nie mają własnych ramek: linie tworzy 1px odstępu na tle koloru linii.
 *
 * Raster na desktopie ma 6 kolumn i zamyka się dokładnie w trzech wierszach:
 * 6 / 3+3 / 2+2+2. Każdy wiersz jest pełny, więc nie ma dziur, a kafle maleją
 * schodkowo — hierarchia wynika z szerokości, nie z pustej przestrzeni.
 * Kafle szersze łamią treść w poziomie (opis obok etykiet), dlatego ich
 * wysokość wynika z treści, a nie z rozpiętości komórki.
 */
type CellRole = 'lead' | 'half' | 'std'

const cellRole = (i: number): CellRole => {
  if (i === 0) return 'lead'
  if (i <= 2) return 'half'
  return 'std'
}

export function Services() {
  return (
    <section id="oferta" className="section services">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Oferta</p>
          <h2>
            Sześć sposobów, żeby Twoja firma była <em>widoczna</em>
          </h2>
          <p className="lead">
            Od wizytówki w dłoni po billboard przy trasie. Dobieramy materiał i
            format do miejsca, w którym reklama ma pracować.
          </p>
        </header>

        {/* TODO (weryfikacja): potwierdź pełną listę usług przed publikacją */}
        <ul className="services__grid">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              as="li"
              direction="none"
              delay={i * 0.06}
              amount={0.1}
              className={`services__cell services__cell--${cellRole(i)}`}
            >
              <a className="services__card" href="#kontakt">
                <span className="services__num" aria-hidden="true">
                  {service.index}
                </span>

                <div className="services__head">
                  <h3 className="services__title">{service.title}</h3>
                  <p className="services__lead">{service.lead}</p>
                </div>

                <div className="services__meta">
                  <ul className="services__tags">
                    {service.items.map((item) => (
                      <li key={item} className="services__tag">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="services__benefit">{service.benefit}</p>
                </div>

                <span className="services__cta">
                  Wyceń
                  <span className="services__arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="visually-hidden">
                    {' '}
                    usługę {service.title}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
