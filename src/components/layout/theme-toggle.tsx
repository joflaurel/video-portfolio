'use client';

import { useSyncExternalStore } from 'react';
import {
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  oppositeTheme,
  resolveTheme,
  type Theme,
} from '@/lib/theme';
import { Icon } from '@/components/ui/icon';
import styles from './theme-toggle.module.css';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener('change', onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

function getTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  return resolveTheme(applied, window.matchMedia(DARK_QUERY).matches);
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts until the page closes.
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, (): Theme => 'light');
  const target = oppositeTheme(theme);

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={`Switch to ${target} mode`}
      onClick={() => applyTheme(target)}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
