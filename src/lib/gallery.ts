import { CATEGORIES, CATEGORY_IDS, type CategoryId } from '@/content/categories';
import type { ResolvedProject } from './projects';

export const ALL = 'all';
export type Filter = typeof ALL | CategoryId;

/** Videos shown at first, and added by each "Show more" press. */
export const PAGE_SIZE = 24;

export interface FilterOption {
  readonly id: Filter;
  readonly label: string;
  readonly count: number;
}

export function filterProjects(
  projects: readonly ResolvedProject[],
  filter: Filter,
): ResolvedProject[] {
  return filter === ALL ? [...projects] : projects.filter((p) => p.categoryId === filter);
}

/** "All" plus one option per category that has at least one video, in category order. */
export function buildFilterOptions(projects: readonly ResolvedProject[]): FilterOption[] {
  const categories = CATEGORY_IDS.map((id) => ({
    id,
    label: CATEGORIES[id].label,
    count: projects.filter((p) => p.categoryId === id).length,
  })).filter((option) => option.count > 0);
  return [{ id: ALL, label: 'All', count: projects.length }, ...categories];
}

export function filterTitle(filter: Filter): string {
  return filter === ALL ? 'All videos' : CATEGORIES[filter].label;
}

/** How many more videos the next "Show more" press reveals (0 when everything is visible). */
export function remainingToReveal(total: number, shown: number, pageSize = PAGE_SIZE): number {
  return Math.max(0, Math.min(pageSize, total - shown));
}
