import type { Site } from './types';

/** Public address of the site. Override with NEXT_PUBLIC_SITE_URL for a custom domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jofrey-igot.vercel.app'
).replace(/\/+$/, '');

export const SITE: Site = {
  name: 'Jofrey Igot',
  role: 'Video Editor',
  location: 'Cebu, Philippines',
  timezone: 'UTC+8',
  timezoneName: 'Philippine Standard Time',
  status: 'Open for work',
  statusNote: 'Taking new projects',
  tagline: 'Short-form and long-form video editing.',
  bio: 'Video editor with 1.5+ years of experience editing short-form and long-form content for YouTube, Reels and TikTok. I build every edit around a strong hook in the first 3 seconds, tight pacing and clear captions, and I handle the full process from raw footage to upload.',
  specialty: 'Short-form',
  languages: 'English',
  primarySoftware: 'CapCut',
  secondarySoftware: 'Premiere Pro',
  email: 'joflaurel@gmail.com',
  links: [
    {
      label: 'WhatsApp',
      handle: '+63 998 460 8702',
      url: 'https://wa.me/639984608702',
      icon: 'chat',
      color: '#25d366',
    },
    {
      label: 'Instagram',
      handle: '@jofreyigot',
      url: 'https://www.instagram.com/jofreyigot',
      icon: 'link',
      color: '#ff2d55',
    },
  ],
};

/** Tools listed on a video unless it sets its own `tools`. */
export const DEFAULT_TOOLS: readonly string[] = ['CapCut', 'Premiere Pro'];
