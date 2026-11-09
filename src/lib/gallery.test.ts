import { describe, expect, it } from 'vitest';
import type { CategoryId } from '@/content/categories';
import { drive } from '@/content/media';
import {
  ALL,
  PAGE_SIZE,
  buildFilterOptions,
  filterProjects,
  filterTitle,
  remainingToReveal,
} from './gallery';
import { resolveProjects } from './projects';

const FILE_ID = '1CgPJOXChjxAEkahP5Dp8LALx5xHxoHhH';
const make = (id: string, category: CategoryId) => ({
  id,
  title: id,
  category,
  hue: 0,
  media: drive(FILE_ID),
});

const projects = resolveProjects([
  make('a', 'food'),
  make('b', 'food'),
  make('c', 'ugc'),
  make('d', 'talk'),
]);

describe('filterProjects', () => {
  it('returns everything for "all" and only the category otherwise', () => {
    expect(filterProjects(projects, ALL)).toHaveLength(4);
    expect(filterProjects(projects, 'food').map((p) => p.id)).toEqual(['a', 'b']);
    expect(filterProjects(projects, 'kids')).toEqual([]);
  });

  it('does not change the order or mutate the input', () => {
    const copy = [...projects];
    filterProjects(projects, ALL).reverse();
    expect(projects).toEqual(copy);
  });
});

describe('buildFilterOptions', () => {
  it('starts with All and lists only categories that have videos, in category order', () => {
    const options = buildFilterOptions(projects);
    expect(options.map((o) => o.id)).toEqual([ALL, 'food', 'talk', 'ugc']);
    expect(options.map((o) => o.count)).toEqual([4, 2, 1, 1]);
  });
});

describe('filterTitle', () => {
  it('titles the section', () => {
    expect(filterTitle(ALL)).toBe('All videos');
    expect(filterTitle('food')).toBe('Food Reels');
  });
});

describe('remainingToReveal', () => {
  it('reveals a full page while more than a page remains', () => {
    expect(remainingToReveal(75, PAGE_SIZE)).toBe(PAGE_SIZE);
  });

  it('reveals only what is left on the last page', () => {
    expect(remainingToReveal(30, PAGE_SIZE)).toBe(6);
  });

  it('is zero once everything is visible', () => {
    expect(remainingToReveal(24, 24)).toBe(0);
    expect(remainingToReveal(10, 24)).toBe(0);
  });
});
