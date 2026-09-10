import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useReducedMotion } from 'framer-motion'
import { inquiryTopics } from '../content/process'
import { site } from '../content/site'

/**
 * TODO (podłączenie wysyłki): utwórz w katalogu głównym projektu plik `.env`
 * i wpisz w nim adres swojego formularza, np.:
 *
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/TWOJ_ID
 *
 * Działa tak samo z Web3Forms (https://api.web3forms.com/submit) — wtedy
 * dodatkowo przekaż w payloadzie swój `access_key`.
 * Dopóki zmienna nie jest ustawiona, formularz NIE udaje wysyłki —
 * pokazuje informację i alternatywne kanały kontaktu.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Minimalny czas wypełniania — poniżej tej granicy to niemal na pewno bot. */
const MIN_FILL_MS = 3000

/** Polski numer: 9 cyfr, opcjonalny prefiks +48 / 0048, dowolne spacje i myślniki. */
function isPolishPhone(value: string): boolean {
  const digits = value.replace(/[\s()–—-]/g, '')
  return /^(?:\+48|0048|48)?\d{9}$/.test(digits)
}

const schema = z.object({
  name: z.string().min(2, 'Podaj imię lub nazwę firmy — przynajmniej 2 znaki.'),
  email: z.email('Wpisz adres e-mail, na który mamy odpowiedzieć.'),
  phone: z
    .string()
    .refine(
      (value) => value.trim() === '' || isPolishPhone(value),
      'Sprawdź numer telefonu — np. 510 133 203 lub +48 510 133 203.',
    ),
  topic: z.string().min(1, 'Wybierz temat realizacji z listy.'),
  message: z
    .string()
    .min(
      10,
      'Napisz kilka słów o projekcie — przynajmniej 10 znaków wystarczy.',
    ),
  consent: z
    .boolean()
    .refine(
      (value) => value,
      'Potrzebujemy tej zgody, żeby odpowiedzieć na Twoje zapytanie.',
    ),
  /** Honeypot — pole niewidoczne dla człowieka. Zawsze puste. */
  website: z.string(),
})

type ContactValues = z.infer<typeof schema>

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

const FIELD_ORDER: (keyof ContactValues)[] = [
  'name',
  'email',
  'phone',
  'topic',
  'message',
  'consent',
]

export function ContactForm() {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(Date.now())

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
      consent: false,
      website: '',
    },
  })

  const submitting = status === 'submitting'

  const onValid = async (values: ContactValues) => {
    /* Antyspam 1: honeypot. Bot wypełnił ukryte pole — cisza, udany ekran, zero wysyłki. */
    if (values.website.trim() !== '') {
      setStatus('success')
      return
    }

    /* Antyspam 2: time-trap. Człowiek nie wypełni tego formularza w 3 sekundy. */
    if (Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus('success')
      return
    }

    if (!endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')

    const payload = {
      imie: values.name,
      email: values.email,
      telefon: values.phone.trim() === '' ? 'nie podano' : values.phone,
      temat: values.topic,
      wiadomosc: values.message,
      zgoda: 'tak',
      _subject: `Zapytanie ze strony Blockout — ${values.topic}`,
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const onInvalid = (formErrors: FieldErrors<ContactValues>) => {
    const firstInvalid = FIELD_ORDER.find((field) => formErrors[field])
    if (firstInvalid) setFocus(firstInvalid)
  }

  const restart = () => {
    reset()
    mountedAt.current = Date.now()
    setStatus('idle')
  }

  const describedBy = (field: keyof ContactValues, extra?: string) => {
    const ids = [errors[field] ? `${field}-error` : null, extra ?? null].filter(
      Boolean,
    )
    return ids.length > 0 ? ids.join(' ') : undefined
  }

  const fallbackLinks = (
    <p className="form__status-links">
      <a className="form__status-link" href={`tel:${site.phoneHref}`}>
        {site.phone}
      </a>
      <a className="form__status-link" href={`mailto:${site.email}`}>
        {site.email}
      </a>
    </p>
  )

  if (status === 'success') {
    return (
      <div className="form form--success" role="status" aria-live="polite">
        <span className="form__check" aria-hidden="true">
          {reduced ? (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="22" cy="22" r="20" />
              <path d="m13 22.5 6 6 12-13" />
            </svg>
          ) : (
            <motion.svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <motion.path
                d="m13 22.5 6 6 12-13"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.38, ease: EASE }}
              />
            </motion.svg>
          )}
        </span>

        <p className="form__success-title">
          Dziękujemy — zapytanie do nas dotarło.
        </p>
        <p className="form__success-text">
          Odezwiemy się na podany adres e-mail. Jeśli sprawa jest pilna, zadzwoń
          — najszybciej ustalimy wszystko przez telefon.
        </p>
        {fallbackLinks}

        <div className="form__success-actions">
          <button type="button" className="btn btn--outline" onClick={restart}>
            Wyślij kolejne zapytanie
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
    >
      <p className="form__legend">
        Wypełnij krótki formularz — im więcej szczegółów, tym konkretniejsza
        wycena wróci do Ciebie.
      </p>

      <div className="form__row form__row--two">
        <div className="form__field">
          <label className="form__label" htmlFor="contact-name">
            Imię lub nazwa firmy
          </label>
          <input
            id="contact-name"
            className="form__control"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="np. Anna Kowalska"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            {...register('name')}
          />
          {errors.name && (
            <p className="form__error" id="name-error" aria-live="polite">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="contact-email">
            E-mail
          </label>
          <input
            id="contact-email"
            className="form__control"
            type="email"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            placeholder="np. biuro@firma.pl"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            {...register('email')}
          />
          {errors.email && (
            <p className="form__error" id="email-error" aria-live="polite">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="form__row form__row--two">
        <div className="form__field">
          <label className="form__label" htmlFor="contact-phone">
            Telefon <span className="form__optional">(opcjonalnie)</span>
          </label>
          <input
            id="contact-phone"
            className="form__control"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            placeholder="np. 510 133 203"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy('phone')}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="form__error" id="phone-error" aria-live="polite">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="contact-topic">
            Temat realizacji
          </label>
          <select
            id="contact-topic"
            className="form__control"
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={describedBy('topic')}
            {...register('topic')}
          >
            <option value="">Wybierz z listy…</option>
            {inquiryTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className="form__error" id="topic-error" aria-live="polite">
              {errors.topic.message}
            </p>
          )}
        </div>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="contact-message">
          Opisz projekt
        </label>
        <textarea
          id="contact-message"
          className="form__control"
          rows={5}
          placeholder="Co ma powstać, w jakim formacie i gdzie stanie?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy('message')}
          {...register('message')}
        />
        {errors.message && (
          <p className="form__error" id="message-error" aria-live="polite">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — ukryty w CSS, poza kolejnością Tab i poza drzewem dostępności. */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="contact-website">Nie wypełniaj tego pola</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="form__field">
        <div className="form__consent">
          <input
            id="contact-consent"
            className="form__checkbox"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent')}
            {...register('consent')}
          />
          <label className="form__consent-text" htmlFor="contact-consent">
            Zgadzam się na kontakt w sprawie tego zapytania.{' '}
            {/* TODO: utworzyć podstronę /polityka-prywatnosci albo podmienić link. */}
            <a
              className="form__consent-link"
              href="/polityka-prywatnosci"
              title="Strona w przygotowaniu"
            >
              Polityka prywatności
            </a>
            .
          </label>
        </div>
        {errors.consent && (
          <p className="form__error" id="consent-error" aria-live="polite">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="form__actions">
        <button
          type="submit"
          className="btn btn--primary form__submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting && <span className="form__spinner" aria-hidden="true" />}
          {submitting ? 'Wysyłamy…' : 'Wyślij zapytanie'}
        </button>
        <p className="form__hint">Wycena bez zobowiązań.</p>
      </div>

      <div role="status" aria-live="polite">
        {status === 'error' && (
          <div className="form__status form__status--error">
            <p className="form__status-title">
              Nie udało się wysłać zapytania.
            </p>
            <p>
              Spróbuj jeszcze raz za chwilę albo napisz do nas bezpośrednio —
              odbierzemy tak samo.
            </p>
            {fallbackLinks}
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="form__status form__status--info">
            <p className="form__status-title">
              Formularz nie jest jeszcze podłączony do wysyłki.
            </p>
            <p>
              Nie wysłaliśmy tego zgłoszenia i nie chcemy udawać, że wysłaliśmy.
              Skontaktuj się z nami telefonicznie lub mailowo — odpowiadamy tak
              samo szybko.
            </p>
            {fallbackLinks}
          </div>
        )}

        {status === 'idle' && !endpoint && (
          <div className="form__status form__status--info">
            <p className="form__status-title">
              Formularz nie jest jeszcze podłączony do wysyłki.
            </p>
            <p>Napisz lub zadzwoń — to zadziała od razu.</p>
            {fallbackLinks}
          </div>
        )}
      </div>
    </form>
  )
}
