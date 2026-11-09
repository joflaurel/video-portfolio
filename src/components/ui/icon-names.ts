/** Every icon the UI can draw. Kept separate from the drawing code so content files can use it. */
export const ICON_NAMES = [
  'play',
  'film',
  'user',
  'chat',
  'doc',
  'slider',
  'mail',
  'pin',
  'clock',
  'scissors',
  'bolt',
  'text',
  'music',
  'wand',
  'globe',
  'link',
  'close',
  'sun',
  'moon',
  'chevron',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
