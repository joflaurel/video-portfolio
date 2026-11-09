'use client';

import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import type { Orientation } from '@/content/types';
import { cssVars } from '@/lib/css';
import type { ResolvedProject } from '@/lib/projects';
import { ThumbnailImage } from './thumbnail-image';
import styles from './video-card.module.css';

interface VideoCardProps {
  readonly project: ResolvedProject;
  /** The shape currently known for this video (may be corrected after its image loads). */
  readonly orientation: Orientation;
  readonly onOpen: (id: string) => void;
  readonly onOrientation: (id: string, orientation: Orientation) => void;
}

function VideoCardBase({ project, orientation, onOpen, onOrientation }: VideoCardProps) {
  const { id } = project;
  const handleOrientation = useCallback(
    (detected: Orientation) => onOrientation(id, detected),
    [id, onOrientation],
  );

  return (
    <button
      type="button"
      className={styles.card}
      aria-label={`Play ${project.title}`}
      onClick={() => onOpen(id)}
    >
      <span
        className={styles.thumb}
        data-orientation={orientation}
        style={cssVars({ '--h': project.hue })}
      >
        <ThumbnailImage
          className={styles.image}
          src={project.thumbnailUrl}
          onOrientation={handleOrientation}
        />
        <span className={styles.play}>
          <Icon name="play" />
        </span>
      </span>
      <span className={styles.title}>{project.title}</span>
      <span className={styles.meta}>{project.client ?? project.categoryLabel}</span>
    </button>
  );
}

export const VideoCard = memo(VideoCardBase);
