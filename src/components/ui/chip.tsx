import type { ReactNode } from 'react';
import styles from './chip.module.css';

interface ChipProps {
  readonly children: ReactNode;
  readonly tone?: 'neutral' | 'accent';
}

export function Chip({ children, tone = 'neutral' }: ChipProps) {
  return (
    <span className={styles.chip} data-tone={tone}>
      {children}
    </span>
  );
}
