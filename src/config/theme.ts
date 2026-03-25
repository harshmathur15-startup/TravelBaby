/**
 * Theme Configuration
 *
 * Color palette and font definitions. These override the defaults in global.css.
 * To change the site's look: swap the color shade maps and font names below.
 *
 * Shade maps follow the Tailwind convention (50-950).
 * Get palettes from: https://tailwindcss.com/docs/customizing-colors
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export const THEME_CONFIG = {
  colors: {
    /** Primary brand color (default: Indigo) */
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    } satisfies ColorScale,

    /** Secondary color (default: Slate) */
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#0f172a',
      600: '#0c1322',
      700: '#090e19',
      800: '#060a11',
      900: '#030508',
      950: '#010204',
    } satisfies ColorScale,

    /** Accent color (default: Amber) */
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    } satisfies ColorScale,
  },

  fonts: {
    heading: '"Poppins", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
} as const;
