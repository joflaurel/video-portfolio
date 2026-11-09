import type { ReactNode } from 'react';
import styles from './page-container.module.css';

export function PageContainer({ children }: { readonly children: ReactNode }) {
  return (
    <main id="main" className={styles.main}>
      {children}
    </main>
  );
}
