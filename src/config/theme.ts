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
    /** Primary brand color (Ocean Blue) */
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    } satisfies ColorScale,

    /** Secondary color (Warm Slate) */
    secondary: {
      50: '#faf9f7',
      100: '#f3f1ed',
      200: '#e8e4dd',
      300: '#d4cfc5',
      400: '#b0a898',
      500: '#3d3632',
      600: '#312b28',
      700: '#25201e',
      800: '#191614',
      900: '#0d0b0a',
      950: '#060505',
    } satisfies ColorScale,

    /** Accent color (Sunset Coral) */
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    } satisfies ColorScale,
  },

  fonts: {
    heading: '"Poppins", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
} as const;
