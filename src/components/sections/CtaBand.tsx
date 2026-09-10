import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../../content/site'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CtaBand() {
  const reduced = useReducedMotion()

  return (
    <section className="section on-ink cta" aria-labelledby="cta-title">
      <motion.div
        className="cta__grid"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE }}
      />

      <span
        className="watermark cta__watermark"
        data-word="blockout"
        aria-hidden="true"
      />

      <div className="container cta__inner">
        <motion.h2
          id="cta-title"
          className="cta__title"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          Masz pomysł? Zamienimy go w reklamę, <em>którą widać.</em>
        </motion.h2>

        <motion.p
          className="lead cta__lead"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        >
          Masz gotowy projekt, luźny pomysł albo tylko firmę, której nikt nie
          zauważa po drugiej stronie ulicy? Napisz, co ma powstać - wrócimy z
          konkretną propozycją i wyceną.
        </motion.p>

        <motion.div
          className="cta__actions"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
        >
          <a className="btn btn--light" href="#kontakt">
            Poproś o wycenę
          </a>
          <a className="btn btn--outline" href={`tel:${site.phoneHref}`}>
            Zadzwoń: {site.phone}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
