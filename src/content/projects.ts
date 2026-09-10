/**
 * REALIZACJE — PLACEHOLDERY.
 *
 * ⚠️ To NIE są prawdziwe projekty. Nie ma tu nazw klientów ani opisów wykonanych
 * zleceń, bo nie zostały dostarczone materiały. Każda pozycja opisuje TYP realizacji.
 *
 * TODO przed publikacją:
 * 1. Podmień `title` na nazwę realizacji lub klienta (za jego zgodą).
 * 2. Wpisz `image` — ścieżkę do zdjęcia w /public/realizacje/ (np. '/realizacje/baner-hala.jpg').
 *    Dopóki `image` jest puste, renderuje się placeholder typograficzny.
 * 3. Uzupełnij `result` prawdziwym efektem dla klienta albo usuń to pole.
 */
export type Category = 'wielki-format' | 'oznakowanie' | 'ekspozycja' | 'druk'

export type Project = {
  id: string
  title: string
  category: Category
  categoryLabel: string
  /** Krótki opis typu realizacji. TODO: zastąp opisem prawdziwego projektu. */
  summary: string
  /** TODO: prawdziwy efekt biznesowy lub usuń. Puste = nie renderuje się. */
  result: string
  /** Ścieżka do zdjęcia w /public. Puste = placeholder. */
  image: string
  /** Alt text dla zdjęcia — uzupełnij razem z `image`. */
  alt: string
  /** Rozmiar kafla w nieregularnym gridzie. */
  size: 'tall' | 'wide' | 'std'
  /** Motyw placeholdera (1–4). Ignorowany, gdy jest zdjęcie. */
  theme: 1 | 2 | 3 | 4
}

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'wielki-format', label: 'Wielki format' },
  { id: 'oznakowanie', label: 'Oznakowanie' },
  { id: 'ekspozycja', label: 'Ekspozycja' },
  { id: 'druk', label: 'Druk' },
]

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Baner na halę produkcyjną',
    category: 'wielki-format',
    categoryLabel: 'Wielki format',
    summary:
      'Baner wielkoformatowy na elewację — format i mocowanie dobrane pod konstrukcję budynku.',
    result: '',
    image: '',
    alt: '',
    size: 'tall',
    theme: 1,
  },
  {
    id: 'p2',
    title: 'Szyld nad wejściem do lokalu',
    category: 'oznakowanie',
    categoryLabel: 'Oznakowanie',
    summary:
      'Czytelne oznakowanie punktu handlowego, widoczne z chodnika i z jezdni.',
    result: '',
    image: '',
    alt: '',
    size: 'std',
    theme: 2,
  },
  {
    id: 'p3',
    title: 'Roll-upy na targi branżowe',
    category: 'ekspozycja',
    categoryLabel: 'Ekspozycja',
    summary: 'Zestaw mobilnych roll-upów w spójnej oprawie graficznej stoiska.',
    result: '',
    image: '',
    alt: '',
    size: 'std',
    theme: 3,
  },
  {
    id: 'p4',
    title: 'Oklejenie witryny sklepu',
    category: 'oznakowanie',
    categoryLabel: 'Oznakowanie',
    summary:
      'Folia na szybę: komunikat sprzedażowy bez zabierania światła wnętrzu.',
    result: '',
    image: '',
    alt: '',
    size: 'wide',
    theme: 4,
  },
  {
    id: 'p5',
    title: 'Kampania plakatowa',
    category: 'druk',
    categoryLabel: 'Druk',
    summary:
      'Seria plakatów w kilku formatach, przygotowana pod różne miejsca ekspozycji.',
    result: '',
    image: '',
    alt: '',
    size: 'std',
    theme: 2,
  },
  {
    id: 'p6',
    title: 'Billboard przy trasie wylotowej',
    category: 'wielki-format',
    categoryLabel: 'Wielki format',
    summary:
      'Projekt czytelny przy dużej prędkości — jedno hasło, jeden komunikat.',
    result: '',
    image: '',
    alt: '',
    size: 'wide',
    theme: 1,
  },
  {
    id: 'p7',
    title: 'Wizytówki i materiały firmowe',
    category: 'druk',
    categoryLabel: 'Druk',
    summary: 'Komplet materiałów firmowych w jednym systemie graficznym.',
    result: '',
    image: '',
    alt: '',
    size: 'std',
    theme: 3,
  },
  {
    id: 'p8',
    title: 'Oznakowanie floty pojazdów',
    category: 'ekspozycja',
    categoryLabel: 'Ekspozycja',
    summary:
      'Spójne oklejenie pojazdów firmowych — reklama, która jeździ codziennie.',
    result: '',
    image: '',
    alt: '',
    size: 'std',
    theme: 4,
  },
]
