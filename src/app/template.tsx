import type { ReactNode } from 'react';
import styles from './template.module.css';

/** Unlike the layout, a template is created fresh on every navigation, so each page fades in. */
export default function Template({ children }: { readonly children: ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
