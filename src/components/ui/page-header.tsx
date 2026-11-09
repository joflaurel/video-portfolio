import styles from './page-header.module.css';

interface PageHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

/** The big iOS-style title at the top of every page (the page's only <h1>). */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
