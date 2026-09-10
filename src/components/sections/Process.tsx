import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { process } from '../../content/process'

/**
 * Jak pracujemy — oś czasu rysowana przy przewijaniu.
 * Desktop: linia pozioma (scaleX). Mobile: pionowa (scaleY).
 * Przy `prefers-reduced-motion` linia jest narysowana od razu.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1])
  const fill = reduced ? 1 : drawn

  return (
    <section id="proces" ref={sectionRef} className="section on-ink process">
      <div className="watermark" data-word="BLOCKOUT" aria-hidden="true" />

      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Jak pracujemy</p>
          <h2>
            Pięć kroków od pomysłu do <em>gotowej</em> realizacji
          </h2>
          <p className="lead">
            Wiesz, co dzieje się na każdym etapie i kiedy podejmujesz decyzję.
            Bez niespodzianek po drodze.
          </p>
        </header>

        <div className="process__track">
          <div className="process__rail" aria-hidden="true">
            <motion.span
              className="process__rail-fill"
              style={{ scaleX: fill }}
            />
          </div>
          <div className="process__rail process__rail--v" aria-hidden="true">
            <motion.span
              className="process__rail-fill process__rail-fill--v"
              style={{ scaleY: fill }}
            />
          </div>

          <ol className="process__steps">
            {process.map((item, i) => (
              <Reveal
                key={item.step}
                as="li"
                delay={i * 0.1}
                amount={0.3}
                className="process__step"
              >
                <span className="process__marker" aria-hidden="true" />
                <span className="process__num">{item.step}</span>
                <h3 className="process__title">{item.title}</h3>
                <p className="process__text">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="process__foot">
          <p className="process__foot-text">
            Najprościej zacząć od krótkiej wiadomości - resztę ustalimy w
            rozmowie.
          </p>
          <a className="btn btn--light" href="#kontakt">
            Zacznij od wyceny
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
