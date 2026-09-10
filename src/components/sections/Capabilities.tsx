import { capabilities, marquee } from '../../content/services'
import { Reveal } from '../ui/Reveal'

/** Pasek powielamy raz — dwie identyczne kopie dają pętlę bez szwu. */
const MARQUEE_COPIES = [0, 1]

export function Capabilities() {
  return (
    <section className="caps" aria-labelledby="caps-title">
      <h2 className="visually-hidden" id="caps-title">
        Zakres prac
      </h2>

      <div className="caps__marquee" aria-hidden="true">
        <div className="caps__track">
          {MARQUEE_COPIES.map((copy) => (
            <ul className="caps__row" key={copy}>
              {marquee.map((word) => (
                <li className="caps__word" key={word}>
                  {word}
                  <span className="caps__sep" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container">
        <ul className="caps__list">
          {capabilities.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              className="caps__item"
              delay={index * 0.09}
              amount={0.35}
            >
              <span className="caps__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="caps__title">{item.title}</h3>
              <p className="caps__text">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
