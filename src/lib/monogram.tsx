import { ImageResponse } from 'next/og';
import { SITE } from '@/content/site';

/** The "J" on a blue gradient used for the favicon and home-screen icon. */
export function createMonogram(sizePx: number): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: Math.round(sizePx * 0.62),
        fontWeight: 800,
        background: 'linear-gradient(150deg, #5ac8fa, #007aff 55%, #5856d6)',
      }}
    >
      {SITE.name.trim().charAt(0)}
    </div>,
    { width: sizePx, height: sizePx },
  );
}
