import { describe, expect, it } from 'vitest';
import { absoluteUrl, buildPersonJsonLd, serializeJsonLd } from './seo';

describe('absoluteUrl', () => {
  it('joins the site address and a path without double slashes', () => {
    expect(absoluteUrl('/')).not.toMatch(/\/$/);
    expect(absoluteUrl('/about')).toMatch(/^https?:\/\/[^/]+\/about$/);
  });
});

describe('serializeJsonLd', () => {
  it('escapes < so the data cannot close the script tag', () => {
    const json = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual({ name: '</script><script>alert(1)</script>' });
  });
});

describe('buildPersonJsonLd', () => {
  it('describes a schema.org Person', () => {
    const person = buildPersonJsonLd();
    expect(person['@type']).toBe('Person');
    expect(person.name.length).toBeGreaterThan(0);
  });
});
