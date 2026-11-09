import { describe, expect, it } from 'vitest';
import { classifyOrientation } from './orientation';

describe('classifyOrientation', () => {
  it('detects vertical, horizontal and square images', () => {
    expect(classifyOrientation(450, 800)).toBe('vertical');
    expect(classifyOrientation(800, 450)).toBe('horizontal');
    expect(classifyOrientation(800, 800)).toBe('square');
  });

  it('treats near-square images as square', () => {
    expect(classifyOrientation(1000, 850)).toBe('square');
    expect(classifyOrientation(850, 1000)).toBe('square');
  });

  it('returns null for images with no size', () => {
    expect(classifyOrientation(0, 0)).toBeNull();
    expect(classifyOrientation(100, 0)).toBeNull();
    expect(classifyOrientation(Number.NaN, 100)).toBeNull();
  });
});
