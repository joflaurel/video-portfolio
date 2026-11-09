import { describe, expect, it } from 'vitest';
import { formatVideoCount } from './format';

describe('formatVideoCount', () => {
  it('pluralises correctly', () => {
    expect(formatVideoCount(0)).toBe('0 videos');
    expect(formatVideoCount(1)).toBe('1 video');
    expect(formatVideoCount(75)).toBe('75 videos');
  });
});
