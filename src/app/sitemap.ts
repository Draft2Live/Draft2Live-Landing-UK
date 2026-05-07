import type { MetadataRoute } from 'next';

/**
 * Static sitemap.xml for Draft2Live (EN-only after next-intl removal).
 *
 * One entry per public page at the root path. No locale prefixes.
 */

// Required for Next.js 16 with `output: 'export'` — without this, the build
// fails with "export const dynamic = 'force-static' not configured" error.
export const dynamic = 'force-static';

const baseUrl = 'https://uk.draft2live.com';

// Public routes. Add new public routes here when we publish new pages
// (e.g. /case-study, /vs/surfer-seo).
const publicRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'privacy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'terms/', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'cookies/', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${baseUrl}/${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
