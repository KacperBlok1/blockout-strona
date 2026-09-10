import { advantages } from '../../content/process'
import { Reveal } from '../ui/Reveal'

export function WhyUs() {
  return (
    <section className="section why" id="o-nas" aria-labelledby="why-title">
      <div className="container why__inner">
        <Reveal className="why__aside" direction="up">
          <div className="why__sticky">
            <div className="section-head why__head">
              <p className="eyebrow">Dlaczego Blockout</p>
              <h2 id="why-title">
                Reklama to nie plik do druku. To <em>decyzja</em>, która ma
                pracować.
              </h2>
              <p className="lead">
                Pracujemy tak, żeby gotowy materiał pasował do miejsca, w którym
                stanie - i wyglądał dobrze dłużej niż tydzień. Sześć rzeczy, po
                których to poznasz.
              </p>
            </div>

            <a className="why__note" href="#proces">
              Zobacz, jak pracujemy
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>

        <ol className="why__list">
          {advantages.map((item, index) => (
            <Reveal
              key={item.title}
              as="li"
              className="why__item"
              delay={(index % 3) * 0.08}
              amount={0.35}
            >
              <span className="why__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="why__body">
                <h3 className="why__title">{item.title}</h3>
                <p className="why__text">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
