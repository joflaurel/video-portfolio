import { describe, expect, it } from 'vitest';
import { CATEGORIES } from '@/content/categories';
import { drive, file, vimeo, youtube } from '@/content/media';
import { DEFAULT_TOOLS } from '@/content/site';
import type { Project } from '@/content/types';
import { getEmbed, pickFeatured, resolveProject, resolveProjects } from './projects';

const FILE_ID = '1CgPJOXChjxAEkahP5Dp8LALx5xHxoHhH';

const base: Project = {
  id: 'p1',
  title: 'Test video',
  category: 'food',
  hue: 20,
  media: drive(FILE_ID),
};

describe('resolveProject', () => {
  it('fills in defaults from the category and site', () => {
    const resolved = resolveProject(base);
    expect(resolved.description).toBe(CATEGORIES.food.description);
    expect(resolved.categoryLabel).toBe(CATEGORIES.food.label);
    expect(resolved.tools).toEqual(DEFAULT_TOOLS);
    expect(resolved.orientation).toBe('vertical');
    expect(resolved.client).toBeNull();
    expect(resolved.featured).toBe(false);
  });

  it('keeps values the project sets itself', () => {
    const resolved = resolveProject({
      ...base,
      description: 'Custom',
      tools: ['DaVinci Resolve'],
      client: '@someone',
      orientation: 'horizontal',
      featured: true,
    });
    expect(resolved.description).toBe('Custom');
    expect(resolved.tools).toEqual(['DaVinci Resolve']);
    expect(resolved.client).toBe('@someone');
    expect(resolved.orientation).toBe('horizontal');
    expect(resolved.featured).toBe(true);
  });

  it('uses the Drive preview image as thumbnail unless one is given', () => {
    expect(resolveProject(base).thumbnailUrl).toContain(`id=${FILE_ID}`);
    expect(resolveProject({ ...base, thumbnail: '/cover.jpg' }).thumbnailUrl).toBe('/cover.jpg');
    expect(resolveProject({ ...base, media: vimeo('123') }).thumbnailUrl).toBeNull();
  });

  it('uses the YouTube cover image for YouTube videos', () => {
    expect(resolveProject({ ...base, media: youtube('abc123') }).thumbnailUrl).toBe(
      'https://i.ytimg.com/vi/abc123/maxresdefault.jpg',
    );
  });

  it('links to Google Drive only for Drive videos', () => {
    expect(resolveProject(base).externalUrl).toContain(FILE_ID);
    expect(resolveProject({ ...base, media: vimeo('1') }).externalUrl).toBeNull();
  });
});

describe('getEmbed', () => {
  it('scales Drive frames and leaves other players alone', () => {
    const driveEmbed = getEmbed(drive(FILE_ID));
    expect(driveEmbed).toMatchObject({ type: 'iframe', scaleToFit: true });
    expect(getEmbed(youtube('abc'))).toMatchObject({ type: 'iframe', scaleToFit: false });
    expect(getEmbed(vimeo('42'))).toMatchObject({ type: 'iframe', scaleToFit: false });
  });

  it('plays local files with a video element', () => {
    expect(getEmbed(file('/videos/a.mp4'))).toEqual({ type: 'video', src: '/videos/a.mp4' });
  });

  it('encodes ids so they cannot break out of the URL', () => {
    const embed = getEmbed(youtube('a/b?c'));
    expect(embed.type === 'iframe' && embed.src).toContain('a%2Fb%3Fc');
  });
});

describe('pickFeatured', () => {
  const projects = resolveProjects([
    base,
    { ...base, id: 'p2', featured: true },
    { ...base, id: 'p3' },
  ]);

  it('returns the featured project', () => {
    expect(pickFeatured(projects)?.id).toBe('p2');
  });

  it('falls back to the first project, or null when empty', () => {
    expect(pickFeatured(projects.filter((p) => !p.featured))?.id).toBe('p1');
    expect(pickFeatured([])).toBeNull();
  });
});
