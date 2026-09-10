import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { site } from './src/content/site'
import { services } from './src/content/services'
import { faq } from './src/content/process'

const esc = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Wstrzykuje meta dane wprost do `index.html` na etapie builda.
 *
 * Powód: scrapery Facebooka, LinkedIna i część robotów nie wykonują JavaScriptu.
 * Tagi dokładane w runtime (np. przez react-helmet) są dla nich niewidoczne,
 * więc udostępniony link nie miałby ani tytułu, ani obrazka.
 * Dane pochodzą z `src/content/*` — nadal jest jedno źródło prawdy.
 */
function seoHtml(): Plugin {
  const canonical = `${site.url}/`
  const image = `${site.url}${site.ogImage}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#organizacja`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    ...(site.openingHours.length
      ? { openingHoursSpecification: site.openingHours }
      : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Materiały reklamowe',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title },
      })),
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return {
    name: 'blockout-seo-html',
    transformIndexHtml(html, ctx) {
      const tags = [
        `<title>${esc(site.title)}</title>`,
        `<meta name="description" content="${esc(site.description)}" />`,
        `<meta name="robots" content="index,follow,max-image-preview:large" />`,
        `<link rel="canonical" href="${canonical}" />`,
        `<meta property="og:site_name" content="${esc(site.name)}" />`,
        `<meta property="og:locale" content="pl_PL" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:url" content="${canonical}" />`,
        `<meta property="og:title" content="${esc(site.title)}" />`,
        `<meta property="og:description" content="${esc(site.description)}" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(`${site.name} — ${site.tagline}`)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(site.title)}" />`,
        `<meta name="twitter:description" content="${esc(site.description)}" />`,
        `<meta name="twitter:image" content="${image}" />`,
        `<script type="application/ld+json">${JSON.stringify(localBusiness)}</script>`,
        `<script type="application/ld+json">${JSON.stringify(faqPage)}</script>`,
      ]

      // Preload kroju nagłówkowego: nagłówek hero jest elementem LCP,
      // więc font ma ruszyć razem z HTML, a nie dopiero po CSS.
      if (ctx.bundle) {
        const font = Object.keys(ctx.bundle).find((file) =>
          /archivo-latin-wght-normal.*\.woff2$/.test(file),
        )
        if (font) {
          tags.unshift(
            `<link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />`,
          )
        }
      }

      return html.replace('<!--seo-->', tags.join('\n    '))
    },
  }
}

export default defineConfig({
  plugins: [react(), seoHtml()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Rozdzielenie na trwałe paczki: przy kolejnym wdrożeniu przeglądarka
        // pobiera tylko to, co faktycznie się zmieniło.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client'],
          motion: ['framer-motion'],
          form: ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
        },
      },
    },
  },
})
