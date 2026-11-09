'use client';

import { usePathname } from 'next/navigation';
import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { SITE } from '@/content/site';
import { routeLabelForPath } from '@/lib/routes';
import styles from './nav-bar.module.css';
import { ThemeToggle } from './theme-toggle';

const SCROLL_THRESHOLD_PX = 48;

/** Top bar: the name on the left, the page title fading in on scroll, theme switch on the right. */
export function NavBar() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(SCROLL_THRESHOLD_PX);

  return (
    <header className={styles.nav} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <span className={styles.brand}>{SITE.name}</span>
        <span className={styles.title} aria-hidden="true">
          {routeLabelForPath(pathname)}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
