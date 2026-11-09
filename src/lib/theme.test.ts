import { describe, expect, it } from 'vitest';
import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY, oppositeTheme, resolveTheme } from './theme';

describe('resolveTheme', () => {
  it('uses the saved choice', () => {
    expect(resolveTheme('light')).toBe('light');
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('defaults to dark when nothing valid is saved', () => {
    expect(resolveTheme(null)).toBe('dark');
    expect(resolveTheme(undefined)).toBe('dark');
    expect(resolveTheme('purple')).toBe('dark');
  });
});

describe('oppositeTheme', () => {
  it('flips between light and dark', () => {
    expect(oppositeTheme('light')).toBe('dark');
    expect(oppositeTheme('dark')).toBe('light');
  });
});

describe('THEME_INIT_SCRIPT', () => {
  it('reads the same key the toggle writes', () => {
    expect(THEME_INIT_SCRIPT).toContain(`'${THEME_STORAGE_KEY}'`);
  });

  it('applies only a valid saved theme', () => {
    const attributes: Record<string, string> = {};
    const fakeWindow = {
      localStorage: { getItem: () => 'dark' },
      document: { documentElement: { dataset: attributes } },
    };
    new Function('localStorage', 'document', THEME_INIT_SCRIPT)(
      fakeWindow.localStorage,
      fakeWindow.document,
    );
    expect(attributes.theme).toBe('dark');
  });

  it('does not throw when storage is unavailable', () => {
    const run = () =>
      new Function('localStorage', 'document', THEME_INIT_SCRIPT)(
        {
          getItem: () => {
            throw new Error('blocked');
          },
        },
        { documentElement: { dataset: {} } },
      );
    expect(run).not.toThrow();
  });
});
