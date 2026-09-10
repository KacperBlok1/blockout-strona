/**
 * Jedyne źródło prawdy dla danych firmy.
 * WSZYSTKIE dane poniżej pochodzą z dotychczasowej strony Blockout.
 * Nie dopisuj tu niczego, czego nie da się potwierdzić.
 */
export const site = {
  name: 'Blockout',
  legalName: 'Blockout',
  tagline: 'Materiały reklamowe, których nie da się przeoczyć',
  title:
    'Blockout — materiały reklamowe, druk wielkoformatowy i oznakowanie firm',
  description:
    'Blockout projektuje i produkuje materiały reklamowe dla firm: banery, billboardy, szyldy, roll-upy, naklejki i druk wielkoformatowy. Koszalin — wycena bez zobowiązań.',

  phone: '510 133 203',
  phoneHref: '+48510133203',
  email: 'kontakt@blockout.pl',

  address: {
    street: 'Fińska 43B',
    postalCode: '75-430',
    city: 'Koszalin',
    country: 'PL',
    full: 'Fińska 43B, 75-430 Koszalin',
  },

  /** TODO: podmień na docelową domenę przed publikacją (używane w canonical, OG i sitemap). */
  url: 'https://blockout.pl',
  /** TODO: wygeneruj obraz 1200×630 i wgraj do /public. */
  ogImage: '/og-blockout.jpg',

  /**
   * TODO: uzupełnij o prawdziwe profile albo usuń cały obiekt.
   * Puste wartości nie renderują się w stopce.
   */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  /**
   * TODO: potwierdź godziny pracy przed publikacją.
   * Dopóki to pusta tablica, schema.org NIE deklaruje godzin otwarcia.
   */
  openingHours: [] as string[],
} as const

export const nav = [
  { href: '#oferta', label: 'Oferta' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#proces', label: 'Jak pracujemy' },
  { href: '#o-nas', label: 'O nas' },
  { href: '#faq', label: 'FAQ' },
  { href: '#kontakt', label: 'Kontakt' },
] as const
