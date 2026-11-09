import { describe, expect, it } from 'vitest';
import { parseDriveFileId } from '@/lib/drive';
import { CATEGORIES } from './categories';
import { drive } from './media';
import { PROJECTS } from './projects';

describe('PROJECTS content', () => {
  it('has unique ids', () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no video listed twice', () => {
    const sources = PROJECTS.map((p) => JSON.stringify(p.media));
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('uses only categories that exist', () => {
    for (const project of PROJECTS) {
      expect(Object.keys(CATEGORIES), project.id).toContain(project.category);
    }
  });

  it('has a title and a valid hue on every video', () => {
    for (const project of PROJECTS) {
      expect(project.title.trim().length, project.id).toBeGreaterThan(0);
      expect(project.hue, project.id).toBeGreaterThanOrEqual(0);
      expect(project.hue, project.id).toBeLessThanOrEqual(360);
    }
  });

  it('has a usable Google Drive id on every Drive video', () => {
    for (const project of PROJECTS) {
      if (project.media.kind === 'drive') {
        expect(parseDriveFileId(project.media.fileId), project.id).toBe(project.media.fileId);
      }
    }
  });

  it('features at most one video', () => {
    expect(PROJECTS.filter((p) => p.featured).length).toBeLessThanOrEqual(1);
  });

  it('every category has at least one video', () => {
    for (const id of Object.keys(CATEGORIES)) {
      expect(
        PROJECTS.some((p) => p.category === id),
        id,
      ).toBe(true);
    }
  });
});

describe('drive() helper', () => {
  it('accepts a share link and throws on garbage so a typo fails the build', () => {
    expect(drive('https://drive.google.com/file/d/1CgPJOXChjxAEkahP5Dp8LALx5xHxoHhH/view')).toEqual(
      {
        kind: 'drive',
        fileId: '1CgPJOXChjxAEkahP5Dp8LALx5xHxoHhH',
      },
    );
    expect(() => drive('not a link')).toThrow(/valid Google Drive/);
  });
});
