/**
 * Oferta.
 * Wszystkie pozycje pochodzą z listy usług z dotychczasowej strony Blockout:
 * banery, billboardy, wizytówki, plakaty, roll-upy, naklejki, szyldy,
 * reklama wielkoformatowa.
 *
 * TODO (weryfikacja): opisy i wypunktowania to propozycje copy — potwierdź,
 * że każda wymieniona pozycja faktycznie jest w ofercie, zanim opublikujesz.
 */
export type Service = {
  id: string
  index: string
  title: string
  lead: string
  benefit: string
  items: string[]
}

export const services: Service[] = [
  {
    id: 'wielki-format',
    index: '01',
    title: 'Reklama wielkoformatowa',
    lead: 'Druk, który działa z drugiej strony ulicy. Billboardy, siatki i realizacje na duże powierzchnie.',
    benefit: 'Zasięg, którego nie kupisz w internecie',
    items: ['Billboardy', 'Siatki mesh', 'Druk na dużych powierzchniach'],
  },
  {
    id: 'banery',
    index: '02',
    title: 'Banery reklamowe',
    lead: 'Trwałe banery na hale, ogrodzenia, elewacje i wydarzenia. Dobieramy materiał i wykończenie do miejsca montażu.',
    benefit: 'Odporne na pogodę, gotowe do montażu',
    items: ['Banery PCV', 'Oczkowanie i tunele', 'Formaty nietypowe'],
  },
  {
    id: 'szyldy',
    index: '03',
    title: 'Szyldy i oznakowanie',
    lead: 'Oznakowanie, które prowadzi klienta pod Twoje drzwi — od kasetonu po tablicę informacyjną.',
    benefit: 'Twoja firma widoczna i łatwa do znalezienia',
    items: ['Szyldy', 'Oznakowanie wnętrz', 'Tablice informacyjne'],
  },
  {
    id: 'ekspozycja',
    index: '04',
    title: 'Roll-upy i ekspozycja',
    lead: 'Mobilne systemy wystawiennicze gotowe na targi, konferencje i spotkania z klientem.',
    benefit: 'Rozkładasz w minutę, wozisz w bagażniku',
    items: ['Roll-upy', 'Ścianki i systemy targowe', 'Materiały eventowe'],
  },
  {
    id: 'druk',
    index: '05',
    title: 'Druk i materiały firmowe',
    lead: 'Wizytówki, plakaty i druk, w którym widać dbałość o detal — papier, wykończenie, kolor.',
    benefit: 'Pierwsze wrażenie, które zostaje w ręce',
    items: ['Wizytówki', 'Plakaty', 'Materiały firmowe'],
  },
  {
    id: 'naklejki',
    index: '06',
    title: 'Naklejki i oklejanie',
    lead: 'Oznakowanie witryn, produktów i pojazdów. Folie dobrane do podłoża i czasu ekspozycji.',
    benefit: 'Reklama, która jeździ i pracuje codziennie',
    items: ['Naklejki', 'Oklejanie witryn', 'Oznakowanie pojazdów'],
  },
]

/**
 * Pasek kompetencji pod hero.
 * Świadomie BEZ liczb — nie mamy zweryfikowanych danych o latach działalności,
 * liczbie klientów czy realizacji. Wartości opisowe zamiast wymyślonych statystyk.
 */
export const capabilities = [
  {
    title: 'Od pomysłu do montażu',
    text: 'Projekt, produkcja i przygotowanie do montażu w jednym miejscu.',
  },
  {
    title: 'Produkcja pod markę',
    text: 'Materiał, format i wykończenie dobieramy do tego, gdzie reklama ma stanąć.',
  },
  {
    title: 'Sprawna wycena',
    text: 'Opisz projekt — odpowiadamy konkretną propozycją, nie widełkami.',
  },
  {
    title: 'Jakość widoczna z daleka',
    text: 'Kolor, ostrość i trwałość sprawdzane przed wydaniem realizacji.',
  },
]

/** Pasek przewijany w hero — hasła z realnej oferty. */
export const marquee = [
  'Banery',
  'Billboardy',
  'Szyldy',
  'Roll-upy',
  'Naklejki',
  'Plakaty',
  'Wizytówki',
  'Druk wielkoformatowy',
  'Oznakowanie firm',
  'Materiały eventowe',
]
