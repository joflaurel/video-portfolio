'use client';

import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { Orientation } from '@/content/types';
import {
  ALL,
  PAGE_SIZE,
  buildFilterOptions,
  filterProjects,
  filterTitle,
  remainingToReveal,
  type Filter,
} from '@/lib/gallery';
import { formatVideoCount } from '@/lib/format';
import { pickFeatured, type ResolvedProject } from '@/lib/projects';
import { FeaturedCard } from './featured-card';
import { FilterPills } from './filter-pills';
import { VideoGrid } from './video-grid';
import { VideoSheet } from './video-sheet';
import styles from './work-gallery.module.css';

interface WorkGalleryProps {
  readonly projects: readonly ResolvedProject[];
  /** Shown between the showreel card and the filters (used for client testimonials). */
  readonly afterFeatured?: ReactNode;
}

/** The interactive part of the Work page: showreel card, filters, video grid and player. */
export function WorkGallery({ projects, afterFeatured }: WorkGalleryProps) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [orientations, setOrientations] = useState<Readonly<Record<string, Orientation>>>({});

  const featured = useMemo(() => pickFeatured(projects), [projects]);
  const options = useMemo(() => buildFilterOptions(projects), [projects]);
  const filtered = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  const visible = useMemo(() => filtered.slice(0, shown), [filtered, shown]);
  const active = useMemo(
    () => projects.find((project) => project.id === activeId) ?? null,
    [projects, activeId],
  );
  const moreCount = remainingToReveal(filtered.length, shown);

  const handleSelectFilter = useCallback((next: Filter) => {
    setFilter(next);
    setShown(PAGE_SIZE);
  }, []);

  const handleOpen = useCallback((id: string) => {
    setActiveId(id);
    setSheetOpen(true);
  }, []);

  const handleClose = useCallback(() => setSheetOpen(false), []);

  const handleOrientation = useCallback((id: string, orientation: Orientation) => {
    setOrientations((current) =>
      current[id] === orientation ? current : { ...current, [id]: orientation },
    );
  }, []);

  return (
    <>
      {featured ? <FeaturedCard project={featured} onOpen={handleOpen} /> : null}

      {afterFeatured}

      <FilterPills options={options} selected={filter} onSelect={handleSelectFilter} />

      <div className={styles.head}>
        <h2 className={styles.title}>{filterTitle(filter)}</h2>
        <span className={styles.count} aria-live="polite">
          {formatVideoCount(filtered.length)}
        </span>
      </div>

      <VideoGrid
        projects={visible}
        orientations={orientations}
        onOpen={handleOpen}
        onOrientation={handleOrientation}
      />

      {moreCount > 0 ? (
        <div className={styles.more}>
          <button type="button" onClick={() => setShown((count) => count + PAGE_SIZE)}>
            Show {moreCount} more
          </button>
        </div>
      ) : null}

      <VideoSheet
        project={active}
        orientation={active ? (orientations[active.id] ?? active.orientation) : 'vertical'}
        open={sheetOpen}
        onClose={handleClose}
      />
    </>
  );
}
