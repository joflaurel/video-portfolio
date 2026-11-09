import { describe, expect, it } from 'vitest';
import { SHEET_DISMISS_DISTANCE_PX, shouldDismissSheet } from './gestures';

describe('shouldDismissSheet', () => {
  it('only dismisses past the threshold', () => {
    expect(shouldDismissSheet(0)).toBe(false);
    expect(shouldDismissSheet(SHEET_DISMISS_DISTANCE_PX)).toBe(false);
    expect(shouldDismissSheet(SHEET_DISMISS_DISTANCE_PX + 1)).toBe(true);
  });
});
