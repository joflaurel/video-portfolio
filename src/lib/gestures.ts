/** How far (px) the sheet must be dragged down before releasing closes it. */
export const SHEET_DISMISS_DISTANCE_PX = 110;

export function shouldDismissSheet(dragDistancePx: number): boolean {
  return dragDistancePx > SHEET_DISMISS_DISTANCE_PX;
}
