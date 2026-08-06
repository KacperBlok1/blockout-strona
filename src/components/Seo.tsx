import { Helmet } from 'react-helmet-async'
import { site } from '../constants/site'

export function Seo() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.description,
    telephone: site.phoneHref,
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Fińska 43B', postalCode: '75-430', addressLocality: 'Koszalin', addressCountry: 'PL' },
  }
  return <Helmet>
    <html lang="pl" />
    <title>{site.title}</title>
    <meta name="description" content={site.description} />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content={site.title} />
    <meta property="og:description" content={site.description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <link rel="canonical" href="/" />
    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
  </Helmet>
}
