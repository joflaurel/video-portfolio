import type { IconName } from '@/components/ui/icon-names';

export interface AppRoute {
  readonly path: '/' | '/about' | '/services' | '/resume' | '/contact';
  readonly label: string;
  readonly icon: IconName;
}

/** The five pages, in tab-bar order. */
export const ROUTES: readonly AppRoute[] = [
  { path: '/', label: 'Work', icon: 'film' },
  { path: '/about', label: 'About', icon: 'user' },
  { path: '/services', label: 'Services', icon: 'slider' },
  { path: '/resume', label: 'Resume', icon: 'doc' },
  { path: '/contact', label: 'Contact', icon: 'mail' },
];

export type RoutePath = AppRoute['path'];

export function isRouteActive(pathname: string, routePath: RoutePath): boolean {
  if (routePath === '/') return pathname === '/';
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

export function routeLabelForPath(pathname: string): string {
  return ROUTES.find((route) => isRouteActive(pathname, route.path))?.label ?? '';
}

/** The old single-page site used `/#about`, `/#contact`, …; maps those to the real pages. */
export function legacyHashToPath(hash: string): RoutePath | null {
  const id = hash.replace(/^#/, '').toLowerCase();
  if (id === '' || id === 'work') return null;
  return ROUTES.find((route) => route.path === `/${id}`)?.path ?? null;
}
