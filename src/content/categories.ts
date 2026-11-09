/**
 * Video categories. The order here is the order of the filter pills on the Work page.
 * To add a category, add one entry; the `description` is used for any video that does not
 * have its own.
 */
export interface CategoryDefinition {
  readonly label: string;
  readonly description: string;
}

export const CATEGORIES = {
  food: {
    label: 'Food Reels',
    description: 'Short-form food reel — fast hook, tight pacing and captions built for Instagram.',
  },
  talk: {
    label: 'Talking Head',
    description: 'Talking-head edit tightened for retention, with captions and clean cuts.',
  },
  ugc: {
    label: 'UGC & AI Ads',
    description: 'UGC-style ad edit with a strong first-3-seconds hook and clear captions.',
  },
  kids: {
    label: 'Kids Content',
    description:
      "Short-form kids' content kept bright, clear and easy for young viewers to follow.",
  },
} as const satisfies Record<string, CategoryDefinition>;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as readonly CategoryId[];
