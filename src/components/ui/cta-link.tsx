import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './cta-link.module.css';

interface CtaLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary';
  /** Opens in a new tab. Use for other websites and downloads. */
  readonly external?: boolean;
}

/** Full-width call-to-action button that is really a link. */
export function CtaLink({ href, children, variant = 'primary', external = false }: CtaLinkProps) {
  if (external) {
    return (
      <a
        className={styles.cta}
        data-variant={variant}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={styles.cta} data-variant={variant} href={href}>
      {children}
    </Link>
  );
}

interface CtaButtonProps {
  readonly children: ReactNode;
  readonly onClick: () => void;
}

/** Same look as `CtaLink`, for actions that do not navigate. */
export function CtaButton({ children, onClick }: CtaButtonProps) {
  return (
    <button type="button" className={styles.cta} data-variant="primary" onClick={onClick}>
      {children}
    </button>
  );
}
