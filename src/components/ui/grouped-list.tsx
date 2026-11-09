import type { ReactNode } from 'react';
import { cssVars } from '@/lib/css';
import styles from './grouped-list.module.css';
import { Icon } from './icon';
import type { IconName } from './icon-names';

/** The small uppercase heading above a list, like the section titles in iOS Settings. */
export function GroupTitle({ children }: { readonly children: ReactNode }) {
  return <h2 className={styles.groupTitle}>{children}</h2>;
}

interface GroupProps {
  readonly title?: string;
  readonly children: ReactNode;
}

/** A rounded white list, like a section in iOS Settings, with an optional small heading. */
export function Group({ title, children }: GroupProps) {
  return (
    <>
      {title ? <GroupTitle>{title}</GroupTitle> : null}
      <div className={styles.group}>{children}</div>
    </>
  );
}

interface RowProps {
  readonly icon: IconName;
  readonly color: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly value?: string;
  /** Makes the whole row a link. `http(s)` links open in a new tab. */
  readonly href?: string;
  readonly chevron?: boolean;
}

export function Row({ icon, color, title, subtitle, value, href, chevron = false }: RowProps) {
  const content = (
    <>
      <span className={styles.icon} style={cssVars({ '--icon-bg': color })}>
        <Icon name={icon} />
      </span>
      <span className={styles.text}>
        <b>{title}</b>
        {subtitle ? <small>{subtitle}</small> : null}
      </span>
      {value ? <span className={styles.value}>{value}</span> : null}
      {chevron ? <Icon name="chevron" className={styles.chevron} /> : null}
    </>
  );

  if (!href) return <div className={styles.row}>{content}</div>;

  const isWebLink = href.startsWith('http');
  return (
    <a
      className={styles.row}
      href={href}
      {...(isWebLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

export function Footnote({ children }: { readonly children: ReactNode }) {
  return <p className={styles.footnote}>{children}</p>;
}
