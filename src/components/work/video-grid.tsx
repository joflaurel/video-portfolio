import type { Orientation } from '@/content/types';
import type { ResolvedProject } from '@/lib/projects';
import styles from './video-grid.module.css';
import { VideoCard } from './video-card';

interface VideoGridProps {
  readonly projects: readonly ResolvedProject[];
  readonly orientations: Readonly<Record<string, Orientation>>;
  readonly onOpen: (id: string) => void;
  readonly onOrientation: (id: string, orientation: Orientation) => void;
}

/** Masonry layout: tall, wide and square videos sit together without cropping. */
export function VideoGrid({ projects, orientations, onOpen, onOrientation }: VideoGridProps) {
  if (projects.length === 0) {
    return <p className={styles.empty}>Nothing here yet.</p>;
  }

  return (
    <ul className={styles.grid}>
      {projects.map((project) => (
        <li key={project.id} className={styles.item}>
          <VideoCard
            project={project}
            orientation={orientations[project.id] ?? project.orientation}
            onOpen={onOpen}
            onOrientation={onOrientation}
          />
        </li>
      ))}
    </ul>
  );
}
