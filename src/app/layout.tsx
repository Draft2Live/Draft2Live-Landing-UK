import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { getTranslations } from '@/lib/translations';
import { EarlyAccessProvider } from '@/lib/EarlyAccessContext';
import EarlyAccessModal from '@/components/ui/EarlyAccessModal';

// Only 400/700/900 used in the codebase (font-normal/bold/black). Dropped 100/300/500/600/800
// to cut font payload ~60% — each weight is a separate WOFF2 per subset.
const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic'], variable: '--font-inter', weight: ['400', '700', '900'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['500', '700'] });

export function generateMetadata(): Metadata {
  const t = getTranslations('metadata');
  return {
    metadataBase: new URL('https://uk.draft2live.com'),
    icons: { icon: '/favicon.svg' },
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: 'https://uk.draft2live.com/',
      siteName: 'Draft2Live',
      locale: 'uk_UA',
      type: 'website',
      images: [{
        url: '/og-images/og-uk-v2.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Draft2Live — публікація з ШІ безпосередньо у CMS',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/og-images/og-uk-v2.png'],
    },
  };
}

// JSON-LD schemas. FAQ questions are pulled from translations so the
// structured data emitted on each page reflects the current EN copy.
function getJsonLd() {
  const t = getTranslations('jsonLd');
  const faq = getTranslations('faq.items');

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Draft2Live',
    url: 'https://uk.draft2live.com',
    logo: 'https://uk.draft2live.com/og-images/og-uk-v2.png',
    description: t('orgDescription'),
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Draft2Live',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '399', priceCurrency: 'EUR', offerCount: '4' },
    // aggregateRating removed: we don't have verified ratings from a reputable source yet.
    // Adding fake ratings to schema violates Google's structured data guidelines and can
    // result in manual action. Will be re-added once we have G2/Capterra/Trustpilot reviews.
  };

  // Read the 6 FAQ items from translations
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [0, 1, 2, 3, 4, 5].map((i) => ({
      '@type': 'Question',
      name: faq(`${i}.q`),
      acceptedAnswer: { '@type': 'Answer', text: faq(`${i}.aPlain`) },
    })),
  };

  return { orgSchema, appSchema, faqSchema };
}

// GA4 config — single property for all 4 landings (en/pl/ru/uk)
const GA4_ID = 'G-EBJ3K1VBF4';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { orgSchema, appSchema, faqSchema } = getJsonLd();

  return (
    <html lang="uk" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Google tag (gtag.js) — first thing in <head>, on every page incl. nested routes */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`,
          }}
        />
      </head>
      <body className="noise min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <EarlyAccessProvider>
          {children}
          <EarlyAccessModal />
        </EarlyAccessProvider>
      </body>
    </html>
  );
}
