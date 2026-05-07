import type { MetadataRoute } from 'next';

// Required for Next.js 16 with `output: 'export'`.
export const dynamic = 'force-static';

/**
 * Dynamic robots.txt for Draft2Live.
 *
 * Why dynamic: Next.js generates /robots.txt at build time from this file,
 * which keeps the sitemap URL in sync with our canonical domain.
 *
 * Previously /robots.txt returned 404, blocking crawlers from discovering
 * the sitemap. Fixed as part of P0 SEO remediation.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://uk.draft2live.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
