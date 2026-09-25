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

  url: 'https://blockout.pl',
  ogImage: '/og-blockout.jpg',

  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

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
