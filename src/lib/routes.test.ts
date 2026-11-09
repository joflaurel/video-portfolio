import { describe, expect, it } from 'vitest';
import { ROUTES, isRouteActive, legacyHashToPath, routeLabelForPath } from './routes';

describe('isRouteActive', () => {
  it('matches the home page exactly', () => {
    expect(isRouteActive('/', '/')).toBe(true);
    expect(isRouteActive('/about', '/')).toBe(false);
  });

  it('matches a page and anything beneath it', () => {
    expect(isRouteActive('/about', '/about')).toBe(true);
    expect(isRouteActive('/about/team', '/about')).toBe(true);
    expect(isRouteActive('/aboutus', '/about')).toBe(false);
  });
});

describe('routeLabelForPath', () => {
  it('names every page and falls back to an empty label', () => {
    for (const route of ROUTES) {
      expect(routeLabelForPath(route.path)).toBe(route.label);
    }
    expect(routeLabelForPath('/nope')).toBe('');
  });
});

describe('legacyHashToPath', () => {
  it('maps old hash links to the new pages', () => {
    expect(legacyHashToPath('#about')).toBe('/about');
    expect(legacyHashToPath('#Contact')).toBe('/contact');
    expect(legacyHashToPath('#resume')).toBe('/resume');
  });

  it('ignores empty, work and unknown hashes', () => {
    expect(legacyHashToPath('')).toBeNull();
    expect(legacyHashToPath('#')).toBeNull();
    expect(legacyHashToPath('#work')).toBeNull();
    expect(legacyHashToPath('#somethingelse')).toBeNull();
  });
});
