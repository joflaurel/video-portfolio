import { describe, expect, it } from 'vitest';
import { computeScaledFrame } from './frame';

describe('computeScaledFrame', () => {
  it('enlarges narrow boxes to the minimum width and scales them back down', () => {
    const frame = computeScaledFrame(180, 320);
    expect(frame).not.toBeNull();
    expect(frame?.width).toBe(360);
    expect(frame?.scale).toBeCloseTo(0.5);
    expect(frame?.height).toBeCloseTo(640);
  });

  it('keeps the visible size identical to the box after scaling', () => {
    const frame = computeScaledFrame(247, 439);
    expect(frame).not.toBeNull();
    if (!frame) return;
    expect(frame.width * frame.scale).toBeCloseTo(247);
    expect(frame.height * frame.scale).toBeCloseTo(439);
  });

  it('leaves boxes at least as wide as the minimum unscaled', () => {
    expect(computeScaledFrame(640, 360)).toEqual({ width: 640, height: 360, scale: 1 });
  });

  it('returns null while the box has no size yet', () => {
    expect(computeScaledFrame(0, 100)).toBeNull();
    expect(computeScaledFrame(100, 0)).toBeNull();
  });
});
