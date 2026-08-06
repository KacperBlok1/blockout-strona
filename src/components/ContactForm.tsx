import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2, 'Wpisz imię (minimum 2 znaki).'),
  email: z.string().email('Wpisz poprawny adres e-mail.'),
  message: z.string().trim().min(10, 'Wiadomość powinna mieć minimum 10 znaków.'),
})
type Values = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Values>({ resolver: zodResolver(schema) })
  const submit = () => { setStatus('Dziękujemy! Wiadomość jest gotowa do wysłania.'); reset() }
  return <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
    <label htmlFor="name">Imię</label><input id="name" placeholder="Jak masz na imię?" {...register('name')} aria-invalid={!!errors.name} />
    {errors.name && <p className="form-error">{errors.name.message}</p>}
    <label htmlFor="email">E-mail</label><input id="email" type="email" placeholder="twoj@email.pl" {...register('email')} aria-invalid={!!errors.email} />
    {errors.email && <p className="form-error">{errors.email.message}</p>}
    <label htmlFor="message">Wiadomość</label><textarea id="message" placeholder="W czym możemy pomóc?" {...register('message')} aria-invalid={!!errors.message} />
    {errors.message && <p className="form-error">{errors.message.message}</p>}
    <button className="button primary" type="submit">Wyślij wiadomość <span>→</span></button>
    <p className="form-status" aria-live="polite">{status}</p>
  </form>
}
