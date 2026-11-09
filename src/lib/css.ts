import type { CSSProperties } from 'react';

type CssVariables = Readonly<Record<`--${string}`, string | number>>;

/** Builds an inline `style` that sets CSS custom properties (React's types don't allow them). */
export function cssVars(variables: CssVariables): CSSProperties {
  return variables as CSSProperties;
}
