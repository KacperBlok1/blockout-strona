import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { faq } from '../../content/process'
import { Reveal } from '../ui/Reveal'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Faq() {
  const reduced = useReducedMotion()
  /** Pierwsze pytanie otwarte — obniża próg pierwszej interakcji. */
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggle = (index: number) =>
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    )

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <Reveal className="faq__aside">
          <div className="section-head faq__head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">
              Pytania, które słyszymy <em>najczęściej</em>
            </h2>
            <p className="lead">
              Jeśli czegoś tu brakuje — napisz. Odpowiadamy konkretem, a nie
              ogólnikami.
            </p>
          </div>
        </Reveal>

        <div className="faq__wrap">
          <ul className="faq__list">
            {faq.map((item, index) => {
              const isOpen = openItems.includes(index)
              const panelId = `faq-panel-${index}`
              const triggerId = `faq-trigger-${index}`

              return (
                <li
                  key={item.q}
                  className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      className="faq__trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                    >
                      <span className="faq__question">{item.q}</span>
                      <span className="faq__mark" aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        className="faq__panel"
                        role="region"
                        aria-labelledby={triggerId}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.38, ease: EASE },
                                opacity: { duration: 0.26 },
                              }
                        }
                      >
                        <p className="faq__answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <p className="faq__more">
            Nie ma tu Twojego pytania?{' '}
            <a className="faq__more-link" href="#kontakt">
              Napisz do nas
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
