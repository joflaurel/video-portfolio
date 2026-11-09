import type { IconName } from '@/components/ui/icon-names';

export interface Service {
  readonly icon: IconName;
  readonly color: string;
  readonly title: string;
  readonly description: string;
}

export interface ServiceGroup {
  readonly title: string;
  readonly services: readonly Service[];
}

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    title: 'Editing',
    services: [
      {
        icon: 'film',
        color: '#ff375f',
        title: 'Short-form edits',
        description: 'Reels, TikToks and YouTube Shorts',
      },
      {
        icon: 'bolt',
        color: '#ff9500',
        title: 'UGC-style ads',
        description: 'Hook-first edits, including AI-generated B-roll',
      },
      {
        icon: 'scissors',
        color: '#007aff',
        title: 'Long-form edits',
        description: 'YouTube videos, talks and interviews',
      },
      {
        icon: 'film',
        color: '#5856d6',
        title: 'Highlights & repurposing',
        description: 'Long videos turned into short clips',
      },
    ],
  },
  {
    title: 'Polish',
    services: [
      {
        icon: 'text',
        color: '#34c759',
        title: 'Captions & subtitles',
        description: 'Clean, readable, on-brand',
      },
      {
        icon: 'music',
        color: '#af52de',
        title: 'Music & sound sync',
        description: 'Cuts and transitions on the beat',
      },
      {
        icon: 'wand',
        color: '#5ac8fa',
        title: 'Pacing & transitions',
        description: 'Tight cuts, no dead air',
      },
      {
        icon: 'slider',
        color: '#ff9f0a',
        title: 'Color grading & B-roll',
        description: 'Including AI-generated B-roll',
      },
    ],
  },
];
