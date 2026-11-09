export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'themechange';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/** The site looks dark unless the visitor has chosen light with the toggle. */
export function resolveTheme(stored: unknown): Theme {
  return isTheme(stored) ? stored : 'dark';
}

export function oppositeTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

/**
 * Runs in <head> before the page paints, so a saved choice is applied without a flash.
 * Without a saved choice nothing changes: the page is already rendered with `data-theme="dark"`.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
