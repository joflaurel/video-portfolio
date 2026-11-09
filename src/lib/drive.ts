/** Helpers for Google Drive links. Pure functions — no browser or framework code. */

const FILE_ID_PATTERN = /^[\w-]{10,}$/;

/**
 * Extracts a Drive file id from a bare id or a share link
 * (`…/file/d/<id>/view`, `…/open?id=<id>`). Returns `null` if nothing usable is found.
 */
export function parseDriveFileId(input: string): string | null {
  const text = input.trim();
  const fromPath = /\/d\/([\w-]+)/.exec(text)?.[1];
  const fromQuery = /[?&]id=([\w-]+)/.exec(text)?.[1];
  const candidate = fromPath ?? fromQuery ?? text;
  return FILE_ID_PATTERN.test(candidate) ? candidate : null;
}

export function driveThumbnailUrl(fileId: string, width = 800): string {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${width}`;
}

/** `hl=en` keeps the player's menus in English instead of the visitor's Google language. */
export function driveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview?hl=en`;
}

export function driveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`;
}
