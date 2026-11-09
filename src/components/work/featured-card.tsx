import { Icon } from '@/components/ui/icon';
import { cssVars } from '@/lib/css';
import type { ResolvedProject } from '@/lib/projects';
import styles from './featured-card.module.css';
import { ThumbnailImage } from './thumbnail-image';

interface FeaturedCardProps {
  readonly project: ResolvedProject;
  readonly onOpen: (id: string) => void;
}

/** The large "Today"-style showreel card at the top of the Work page. */
export function FeaturedCard({ project, onOpen }: FeaturedCardProps) {
  return (
    <button
      type="button"
      className={styles.featured}
      style={cssVars({ '--h': project.hue })}
      aria-label={`Watch showreel: ${project.title}`}
      onClick={() => onOpen(project.id)}
    >
      <ThumbnailImage className={styles.image} src={project.thumbnailUrl} lazy={false} />
      <span className={styles.label}>Showreel</span>
      <span className={styles.bottom}>
        <span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.description}>{project.description}</span>
        </span>
        <span className={styles.watch}>
          <Icon name="play" />
          Watch
        </span>
      </span>
    </button>
  );
}
