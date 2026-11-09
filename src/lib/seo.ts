import { SITE, SITE_URL } from '@/content/site';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

/** schema.org Person, shown to search engines. Only contains what is already public on the site. */
export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    jobTitle: SITE.role,
    url: SITE_URL,
    email: `mailto:${SITE.email}`,
    address: { '@type': 'PostalAddress', addressLocality: SITE.location },
    sameAs: SITE.links.filter((link) => link.url.includes('instagram.com')).map((link) => link.url),
  };
}

/** JSON for a <script type="application/ld+json"> tag; `<` is escaped so it cannot end the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
