import { Icon } from '@/components/ui/icon';
import type { IconName } from '@/components/ui/icon-names';
import { SITE } from '@/content/site';
import { cssVars } from '@/lib/css';
import styles from './widgets.module.css';

interface WidgetData {
  readonly hue: number;
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

function buildWidgets(): readonly WidgetData[] {
  const [city = SITE.location, ...rest] = SITE.location.split(',');
  return [
    { hue: 215, icon: 'pin', label: 'Based in', value: city.trim(), detail: rest.join(',').trim() },
    {
      hue: 265,
      icon: 'scissors',
      label: 'Edits in',
      value: SITE.primarySoftware,
      detail: `Also ${SITE.secondarySoftware}`,
    },
    {
      hue: 150,
      icon: 'clock',
      label: 'Time zone',
      value: SITE.timezone,
      detail: SITE.timezoneName,
    },
    { hue: 25, icon: 'bolt', label: 'Status', value: SITE.status, detail: SITE.statusNote },
  ];
}

/** Four coloured "at a glance" tiles, like iOS home-screen widgets. */
export function Widgets() {
  return (
    <ul className={styles.widgets}>
      {buildWidgets().map((widget) => (
        <li key={widget.label} className={styles.widget} style={cssVars({ '--h': widget.hue })}>
          <span className={styles.label}>
            <Icon name={widget.icon} />
            {widget.label}
          </span>
          <span>
            <b className={styles.value}>{widget.value}</b>
            <span className={styles.detail}>{widget.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
