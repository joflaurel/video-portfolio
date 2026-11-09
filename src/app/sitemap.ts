import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.path === '/' ? 1 : 0.7,
  }));
}
