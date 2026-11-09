import { parseDriveFileId } from '@/lib/drive';
import type { Media } from './types';

/**
 * A Google Drive video. Accepts a bare file id or any Drive share link
 * (the file must be shared as "Anyone with the link → Viewer").
 * Fails the build immediately if the id cannot be understood.
 */
export function drive(fileIdOrUrl: string): Media {
  const fileId = parseDriveFileId(fileIdOrUrl);
  if (!fileId) {
    throw new Error(`Not a valid Google Drive file id or link: "${fileIdOrUrl}"`);
  }
  return { kind: 'drive', fileId };
}

/** A YouTube video — the part after `v=` in the link. */
export function youtube(videoId: string): Media {
  return { kind: 'youtube', videoId };
}

/** A Vimeo video — the number at the end of the link. */
export function vimeo(videoId: string): Media {
  return { kind: 'vimeo', videoId };
}

/** A video file served from this site, e.g. `/videos/my-edit.mp4` (put it in /public/videos). */
export function file(src: string): Media {
  return { kind: 'file', src };
}
