import { SITE } from '@/content/site';
import styles from './profile-card.module.css';

export function ProfileCard() {
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
          {SITE.name.trim().charAt(0)}
        </div>
        <div>
          <h2 className={styles.name}>{SITE.name}</h2>
          <p className={styles.role}>
            {SITE.role} · {SITE.location}
          </p>
        </div>
      </div>
      <p className={styles.bio}>{SITE.bio}</p>
    </>
  );
}
