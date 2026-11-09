import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { BackgroundVideo } from '@/components/layout/background-video';
import { LegacyHashRedirect } from '@/components/layout/legacy-hash-redirect';
import { NavBar } from '@/components/layout/nav-bar';
import { PageContainer } from '@/components/layout/page-container';
import { SkipLink } from '@/components/layout/skip-link';
import { TabBar } from '@/components/layout/tab-bar';
import { SITE, SITE_URL } from '@/content/site';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import './globals.css';

// Fallback for devices without the San Francisco system font; self-hosted by Next.js at build time.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const title = `${SITE.name} — ${SITE.role} in the Philippines`;
const description = `Hire ${SITE.name}, a ${SITE.role.toLowerCase()} in ${SITE.location}. Hook-first Instagram Reels, TikToks, YouTube long-form videos and UGC-style ads, with fast turnaround.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${SITE.name}` },
  description,
  applicationName: `${SITE.name} — Portfolio`,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} — Portfolio`,
    title,
    description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    // The theme script below sets data-theme before React loads, hence suppressHydrationWarning.
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <BackgroundVideo />
        <SkipLink />
        <NavBar />
        <PageContainer>{children}</PageContainer>
        <TabBar />
        <LegacyHashRedirect />
      </body>
    </html>
  );
}
