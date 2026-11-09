'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { ROUTES, isRouteActive } from '@/lib/routes';
import styles from './tab-bar.module.css';

/** The floating iOS-style tab bar that switches between pages. */
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.tabbar} aria-label="Sections">
      {ROUTES.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={styles.tab}
          aria-current={isRouteActive(pathname, route.path) ? 'page' : undefined}
        >
          <Icon name={route.icon} />
          <span>{route.label}</span>
        </Link>
      ))}
    </nav>
  );
}
