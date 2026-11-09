import { describe, expect, it } from 'vitest';
import { mailtoLink, whatsappLink } from './contact';

describe('whatsappLink', () => {
  it('adds the message as an encoded text parameter', () => {
    expect(whatsappLink('https://wa.me/639000000000', "Hi, I'd like a quote")).toBe(
      "https://wa.me/639000000000?text=Hi%2C%20I'd%20like%20a%20quote",
    );
  });

  it('appends to a link that already has parameters', () => {
    expect(whatsappLink('https://wa.me/1?lang=en', 'Hi')).toBe('https://wa.me/1?lang=en&text=Hi');
  });
});

describe('mailtoLink', () => {
  it('encodes the subject', () => {
    expect(mailtoLink('me@example.com', 'Video edit & quote')).toBe(
      'mailto:me@example.com?subject=Video%20edit%20%26%20quote',
    );
  });
});
