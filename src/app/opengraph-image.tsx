import { ImageResponse } from 'next/og';
import { SITE } from '@/content/site';

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The preview card shown when the site is shared in a chat or on social media. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#ffffff',
        background: 'linear-gradient(150deg, #5ac8fa, #007aff 55%, #5856d6)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, opacity: 0.9 }}>
        Video portfolio
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 112, fontWeight: 800, letterSpacing: -3 }}>
          {SITE.name}
        </div>
        <div style={{ display: 'flex', fontSize: 46, fontWeight: 600, marginTop: 8 }}>
          {`${SITE.role} · ${SITE.location}`}
        </div>
        <div style={{ display: 'flex', fontSize: 34, marginTop: 20, opacity: 0.88 }}>
          {SITE.tagline}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
