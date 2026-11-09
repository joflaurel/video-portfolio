import styles from './skip-link.module.css';

/** Lets keyboard and screen-reader users jump past the navigation. */
export function SkipLink() {
  return (
    <a className={styles.link} href="#main">
      Skip to content
    </a>
  );
}
