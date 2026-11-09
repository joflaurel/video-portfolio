import { describe, expect, it } from 'vitest';
import { driveEmbedUrl, driveThumbnailUrl, driveViewUrl, parseDriveFileId } from './drive';

const ID = '1CgPJOXChjxAEkahP5Dp8LALx5xHxoHhH';

describe('parseDriveFileId', () => {
  it('accepts a bare file id', () => {
    expect(parseDriveFileId(ID)).toBe(ID);
  });

  it('trims whitespace around a bare id', () => {
    expect(parseDriveFileId(`  ${ID}\n`)).toBe(ID);
  });

  it('reads the id from a /file/d/ share link', () => {
    expect(parseDriveFileId(`https://drive.google.com/file/d/${ID}/view?usp=sharing`)).toBe(ID);
  });

  it('reads the id from an open?id= link', () => {
    expect(parseDriveFileId(`https://drive.google.com/open?id=${ID}`)).toBe(ID);
  });

  it('rejects text that is not an id or Drive link', () => {
    expect(parseDriveFileId('')).toBeNull();
    expect(parseDriveFileId('short')).toBeNull();
    expect(parseDriveFileId('https://example.com/video')).toBeNull();
  });
});

describe('Drive URL builders', () => {
  it('builds the thumbnail URL with a width', () => {
    expect(driveThumbnailUrl(ID)).toBe(`https://drive.google.com/thumbnail?id=${ID}&sz=w800`);
    expect(driveThumbnailUrl(ID, 400)).toContain('sz=w400');
  });

  it('builds the embed and view URLs', () => {
    expect(driveEmbedUrl(ID)).toBe(`https://drive.google.com/file/d/${ID}/preview`);
    expect(driveViewUrl(ID)).toBe(`https://drive.google.com/file/d/${ID}/view`);
  });
});
