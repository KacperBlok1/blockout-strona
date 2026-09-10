import { useRef } from 'react'
import type { ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { site } from '../../content/site'
import { useScrollState } from '../../hooks/useScrollState'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type LineProps = {
  children: ReactNode
  delay: number
  reduced: boolean
}

/**
 * Jedna linia nagłówka: maska + wjazd całego wiersza od dołu.
 * Świadomie NIE dzielimy tekstu na znaki — czytnik ekranu ma dostać
 * jeden spójny węzeł tekstowy, a przeglądarka jeden element do animowania.
 */
function Line({ children, delay, reduced }: LineProps) {
  return (
    <span className="hero__line">
      <motion.span
        className="hero__line-inner"
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const scrolled = useScrollState(120)
  const visualRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })

  /* Paralaksa: trzy tempa, maksymalnie 40 px przesunięcia. */
  const yBillboard = useTransform(scrollYProgress, [0, 1], [28, -40])
  const yPoster = useTransform(scrollYProgress, [0, 1], [12, -18])
  const yBanner = useTransform(scrollYProgress, [0, 1], [-14, 34])

  /** Wspólne wejście dla elementów pod nagłówkiem. */
  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.7,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  })

  return (
    <section className="hero" id="start">
      <div className="hero__bg" aria-hidden="true" />

      <div className="container hero__inner">
        <motion.p className="eyebrow hero__eyebrow" {...rise(0.05)}>
          <span className="eyebrow-text">
            Druk wielkoformatowy · {site.address.city}
          </span>
        </motion.p>

        <h1 className="hero__title">
          <Line delay={0.12} reduced={Boolean(reduced)}>
            Materiały reklamowe,
          </Line>
          <Line delay={0.21} reduced={Boolean(reduced)}>
            których nie da się <em>przeoczyć.</em>
          </Line>
        </h1>

        <div className="hero__copy">
          <motion.p className="lead hero__lead" {...rise(0.44)}>
            Projektujemy i produkujemy banery, billboardy, szyldy, roll-upy i
            druk wielkoformatowy — od pliku po materiał gotowy do montażu. Opisz
            swój projekt, a odpowiemy konkretną propozycją zamiast widełek
            cenowych.
          </motion.p>

          <motion.div className="hero__actions" {...rise(0.54)}>
            <a className="btn btn--primary" href="#kontakt">
              Wyceń swoją realizację
            </a>
            <a className="btn btn--outline" href="#realizacje">
              Zobacz realizacje
            </a>
          </motion.div>

          <motion.div className="hero__trust" {...rise(0.62)}>
            <p className="hero__trust-text">
              Od projektu po gotowy materiał · {site.address.city} i okolice
            </p>
            <a className="hero__trust-phone" href={`tel:${site.phoneHref}`}>
              {site.phone}
            </a>
          </motion.div>
        </div>

        {/* TODO: docelowo podmienić na zdjęcia realizacji — patrz README */}
        <motion.div
          className="hero__visual"
          ref={visualRef}
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <div className="hero__mesh" />

          <svg
            className="hero__marks"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 6 H7 M6 0 V7" />
            <path d="M100 6 H93 M94 0 V7" />
            <path d="M0 94 H7 M6 100 V93" />
            <path d="M100 94 H93 M94 100 V93" />
          </svg>

          {/* Billboard — ciemny blok na słupach */}
          <motion.div
            className="hero__billboard"
            style={reduced ? undefined : { y: yBillboard }}
          >
            <div className="hero__billboard-face">
              <span className="hero__billboard-kicker">Kampania OOH</span>
              <span className="hero__billboard-word">
                block<i>out</i>
              </span>
            </div>
            <span className="hero__billboard-leg" />
            <span className="hero__billboard-leg" />
          </motion.div>

          {/* Arkusz plakatu */}
          <motion.div
            className="hero__poster"
            style={reduced ? undefined : { y: yPoster }}
          >
            <div className="hero__poster-top">
              <span className="hero__poster-dot" />
              <span className="hero__poster-meta">B1 · 700 × 1000</span>
            </div>
            <p className="hero__poster-type">
              MAKE
              <br />
              IT
              <br />
              VISIBLE.
            </p>
            <div className="hero__poster-foot">
              <span>Plakat</span>
              <span>{site.address.city}</span>
            </div>
          </motion.div>

          {/* Pas baneru z oczkami */}
          <motion.div
            className="hero__banner"
            style={reduced ? undefined : { y: yBanner }}
          >
            <span className="hero__banner-text">Druk wielkoformatowy</span>
            <span className="hero__banner-seam" />
          </motion.div>

          <div className="hero__swatches">
            <span />
            <span />
            <span />
          </div>
        </motion.div>
      </div>

      <div
        className={`hero__scroll${scrolled ? ' hero__scroll--hidden' : ''}`}
        aria-hidden="true"
      >
        <span className="hero__scroll-label">Przewiń</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
