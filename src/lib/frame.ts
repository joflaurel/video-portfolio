export interface ScaledFrame {
  /** Layout width of the iframe, in CSS pixels. */
  readonly width: number;
  /** Layout height of the iframe, in CSS pixels. */
  readonly height: number;
  /** Factor the iframe is shrunk by so it fits the visible box. */
  readonly scale: number;
}

/**
 * Google Drive's player crops the video when its frame is narrower than about 300px, which a
 * phone-sized 9:16 box is. So the iframe is given at least `minWidth` pixels and then scaled
 * down with a CSS transform to exactly fill the visible box.
 */
export function computeScaledFrame(
  boxWidth: number,
  boxHeight: number,
  minWidth = 360,
): ScaledFrame | null {
  if (!(boxWidth > 0) || !(boxHeight > 0)) return null;
  const width = Math.max(minWidth, boxWidth);
  const scale = boxWidth / width;
  return { width, height: boxHeight / scale, scale };
}
