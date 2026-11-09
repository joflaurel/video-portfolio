import { describe, expect, it } from 'vitest';
import { TESTIMONIALS } from './testimonials';

describe('TESTIMONIALS content', () => {
  it('has a quote, author and role on every entry', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
    for (const t of TESTIMONIALS) {
      expect(t.quote.trim().length, t.author).toBeGreaterThan(0);
      expect(t.author.trim().length).toBeGreaterThan(0);
      expect(t.role.trim().length, t.author).toBeGreaterThan(0);
    }
  });
});
