import type { ReactNode } from 'react';
import type { IconName } from './icon-names';

interface Glyph {
  readonly viewBox: string;
  readonly style: 'fill' | 'stroke';
  readonly strokeWidth?: number;
  readonly body: ReactNode;
}

const GLYPHS: Record<IconName, Glyph> = {
  play: {
    viewBox: '0 0 24 24',
    style: 'fill',
    body: (
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
    ),
  },
  film: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M8 4v16M16 4v16M3 9h5M3 15h5M16 9h5M16 15h5" />
      </>
    ),
  },
  user: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
      </>
    ),
  },
  chat: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: <path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5z" />,
  },
  doc: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <path d="M6 3h8l5 5v13H6z" />
        <path d="M14 3v5h5M9 13h7M9 17h7" />
      </>
    ),
  },
  slider: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
        <circle cx="16" cy="7" r="2.2" />
        <circle cx="8" cy="17" r="2.2" />
      </>
    ),
  },
  mail: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 8 8 6 8-6" />
      </>
    ),
  },
  pin: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  clock: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  scissors: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M8 7.5 20 17M8 16.5 20 7" />
      </>
    ),
  },
  bolt: {
    viewBox: '0 0 24 24',
    style: 'fill',
    body: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  },
  text: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: <path d="M5 7V5h14v2M12 5v14M9 19h6" />,
  },
  music: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <path d="M9 18V5l11-2v13" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="17.5" cy="16" r="2.5" />
      </>
    ),
  },
  wand: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <path d="m4 20 11-11M14 4v3M12.5 5.5h3M19 11v3M17.5 12.5h3" />
        <path d="m13 8 3 3" />
      </>
    ),
  },
  globe: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
  link: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    ),
  },
  close: {
    viewBox: '0 0 12 12',
    style: 'stroke',
    strokeWidth: 2,
    body: <path d="M2 2l8 8M10 2l-8 8" />,
  },
  sun: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  moon: {
    viewBox: '0 0 24 24',
    style: 'stroke',
    body: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />,
  },
  chevron: {
    viewBox: '0 0 8 14',
    style: 'stroke',
    strokeWidth: 2,
    body: <path d="m1 1 6 6-6 6" />,
  },
};

interface IconProps {
  readonly name: IconName;
  readonly className?: string;
}

/** Decorative icon drawn in the current text colour. Give the surrounding control a label. */
export function Icon({ name, className }: IconProps) {
  const glyph = GLYPHS[name];
  const paint =
    glyph.style === 'fill'
      ? ({ fill: 'currentColor' } as const)
      : ({
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: glyph.strokeWidth ?? 1.9,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        } as const);

  return (
    <svg
      className={className}
      viewBox={glyph.viewBox}
      aria-hidden="true"
      focusable="false"
      {...paint}
    >
      {glyph.body}
    </svg>
  );
}
