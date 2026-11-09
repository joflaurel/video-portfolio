import type { Orientation } from '@/content/types';

const WIDE_RATIO = 1.25;
const TALL_RATIO = 0.8;

/** Decides whether an image of the given size is tall, wide or square. */
export function classifyOrientation(width: number, height: number): Orientation | null {
  if (!(width > 0) || !(height > 0)) return null;
  const ratio = width / height;
  if (ratio > WIDE_RATIO) return 'horizontal';
  if (ratio < TALL_RATIO) return 'vertical';
  return 'square';
}
