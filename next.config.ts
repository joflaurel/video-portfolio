import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Content-Security-Policy: the site loads its own code and fonts only. Videos play in iframes
 * from Google Drive (and YouTube/Vimeo if ever used); cover images come from Google.
 * Inline scripts/styles are allowed because Next.js and React emit them; every other source
 * is restricted.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://drive.google.com https://*.googleusercontent.com https://*.google.com https://i.ytimg.com",
  "font-src 'self'",
  "media-src 'self' blob:",
  "connect-src 'self'",
  'frame-src https://drive.google.com https://*.google.com https://*.googleusercontent.com https://www.youtube-nocookie.com https://player.vimeo.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  // `next dev` needs eval() for its tooling, so the policy applies to production only.
  ...(isProduction ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }] : []),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
