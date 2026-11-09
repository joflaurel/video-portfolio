import { CATEGORIES, type CategoryId } from '@/content/categories';
import { DEFAULT_TOOLS } from '@/content/site';
import type { Media, Orientation, Project } from '@/content/types';
import { driveEmbedUrl, driveThumbnailUrl, driveViewUrl } from './drive';

/** How a video is played inside the sheet. */
export type Embed =
  | {
      readonly type: 'iframe';
      readonly src: string;
      readonly allow: string;
      /** Drive's player needs the "scale down a bigger frame" treatment (see `frame.ts`). */
      readonly scaleToFit: boolean;
    }
  | { readonly type: 'video'; readonly src: string };

/** A project with every default filled in and every URL built — what the UI works with. */
export interface ResolvedProject {
  readonly id: string;
  readonly title: string;
  readonly categoryId: CategoryId;
  readonly categoryLabel: string;
  readonly client: string | null;
  readonly description: string;
  readonly tools: readonly string[];
  readonly orientation: Orientation;
  readonly hue: number;
  readonly thumbnailUrl: string | null;
  readonly embed: Embed;
  /** Link to open the video on its original site (Google Drive), if there is one. */
  readonly externalUrl: string | null;
  readonly featured: boolean;
}

export function getEmbed(media: Media): Embed {
  switch (media.kind) {
    case 'drive':
      return {
        type: 'iframe',
        src: driveEmbedUrl(media.fileId),
        allow: 'autoplay; fullscreen',
        scaleToFit: true,
      };
    case 'youtube':
      return {
        type: 'iframe',
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.videoId)}?autoplay=1&rel=0&playsinline=1`,
        allow: 'autoplay; fullscreen; encrypted-media; picture-in-picture',
        scaleToFit: false,
      };
    case 'vimeo':
      return {
        type: 'iframe',
        src: `https://player.vimeo.com/video/${encodeURIComponent(media.videoId)}?autoplay=1`,
        allow: 'autoplay; fullscreen; picture-in-picture',
        scaleToFit: false,
      };
    case 'file':
      return { type: 'video', src: media.src };
  }
}

export function getThumbnailUrl(project: Project): string | null {
  if (project.thumbnail) return project.thumbnail;
  return project.media.kind === 'drive' ? driveThumbnailUrl(project.media.fileId) : null;
}

function getExternalUrl(media: Media): string | null {
  return media.kind === 'drive' ? driveViewUrl(media.fileId) : null;
}

export function resolveProject(project: Project): ResolvedProject {
  const category = CATEGORIES[project.category];
  return {
    id: project.id,
    title: project.title,
    categoryId: project.category,
    categoryLabel: category.label,
    client: project.client ?? null,
    description: project.description ?? category.description,
    tools: project.tools ?? DEFAULT_TOOLS,
    orientation: project.orientation ?? 'vertical',
    hue: project.hue,
    thumbnailUrl: getThumbnailUrl(project),
    embed: getEmbed(project.media),
    externalUrl: getExternalUrl(project.media),
    featured: project.featured === true,
  };
}

export function resolveProjects(projects: readonly Project[]): ResolvedProject[] {
  return projects.map(resolveProject);
}

/** The video for the big card: the one marked `featured`, otherwise the first. */
export function pickFeatured(projects: readonly ResolvedProject[]): ResolvedProject | null {
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
}
