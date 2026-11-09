import type { ResumeEntry as ResumeEntryData } from '@/content/types';
import styles from './resume-entry.module.css';

export function ResumeEntry({ entry }: { readonly entry: ResumeEntryData }) {
  return (
    <div className={styles.entry}>
      <div className={styles.top}>
        <h3 className={styles.title}>{entry.title}</h3>
        <span className={styles.period}>{entry.period}</span>
      </div>
      <div className={styles.org}>{entry.organization}</div>
      {entry.bullets.length > 0 ? (
        <ul className={styles.bullets}>
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
