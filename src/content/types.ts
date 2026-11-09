import type { CategoryId } from './categories';

/** Shape of a video: tall (9:16), wide (16:9) or square (1:1). */
export type Orientation = 'vertical' | 'horizontal' | 'square';

/** Where a video plays from. Build one with the helpers in `./media`. */
export type Media =
  | { readonly kind: 'drive'; readonly fileId: string }
  | { readonly kind: 'youtube'; readonly videoId: string }
  | { readonly kind: 'vimeo'; readonly videoId: string }
  | { readonly kind: 'file'; readonly src: string };

/** One portfolio video, as written in `projects.ts`. */
export interface Project {
  /** Stable unique id. Never change it once published. */
  readonly id: string;
  readonly title: string;
  readonly category: CategoryId;
  readonly media: Media;
  /** Colour (0–360) of the gradient shown while the thumbnail loads. */
  readonly hue: number;
  /** Instagram handle or client name, shown as a tag. */
  readonly client?: string;
  /** Overrides the category's default description. */
  readonly description?: string;
  /** Starting shape; corrected automatically from the thumbnail. Defaults to `vertical`. */
  readonly orientation?: Orientation;
  /** Overrides `DEFAULT_TOOLS`. */
  readonly tools?: readonly string[];
  /** Custom cover image (path under /public or a URL). Defaults to the Drive preview image. */
  readonly thumbnail?: string;
  /** Show this video on the large card at the top of the Work page. Only one should have it. */
  readonly featured?: boolean;
}

export interface SocialLink {
  readonly label: string;
  readonly handle: string;
  readonly url: string;
  readonly icon: 'chat' | 'link';
  readonly color: string;
}

export interface Site {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly timezone: string;
  readonly timezoneName: string;
  readonly status: string;
  readonly statusNote: string;
  readonly tagline: string;
  readonly bio: string;
  readonly specialty: string;
  readonly languages: string;
  readonly primarySoftware: string;
  readonly secondarySoftware: string;
  readonly email: string;
  readonly links: readonly SocialLink[];
}

export interface ResumeEntry {
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly bullets: readonly string[];
}

export interface Resume {
  /** Path of the downloadable PDF under /public. */
  readonly file: string;
  readonly summary: string;
  readonly experience: readonly ResumeEntry[];
  readonly education: readonly ResumeEntry[];
  readonly skills: readonly string[];
}
