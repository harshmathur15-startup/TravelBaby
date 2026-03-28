/**
 * i18n Utilities — Type-safe translation system.
 *
 * Usage:
 *   import { t, getLocale, locales } from '@lib/i18n';
 *   const locale = getLocale(Astro.currentLocale);
 *   t(locale, 'nav.features') // "Features" or "Funcionalidades"
 *
 * Adding a language:
 *   1. Add locale to astro.config.mjs i18n.locales
 *   2. Add translations object below
 *   3. Create pages in src/pages/<locale>/
 */

export const defaultLocale = 'en' as const
export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.compare': 'Compare',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    'nav.search': 'Search the site',
    'footer.copyright': '© 2026 Your Company. All rights reserved.',
    'footer.newsletter.heading': 'Stay in the loop',
    'footer.newsletter.subtext':
      'Get product updates, tips, and resources delivered to your inbox.',
    'footer.newsletter.placeholder': 'you@example.com',
    'footer.newsletter.button': 'Subscribe',
    'a11y.skipToContent': 'Skip to main content',
    'a11y.toggleDarkMode': 'Toggle dark mode',
    'a11y.highContrast': 'Toggle high contrast mode',
    'a11y.reduceMotion': 'Toggle reduced motion',
    'search.placeholder': 'Search pages, posts, or type a URL...',
    'lang.switch': 'Language',
  },
  es: {
    'nav.features': 'Funcionalidades',
    'nav.pricing': 'Precios',
    'nav.compare': 'Comparar',
    'nav.blog': 'Blog',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.getStarted': 'Comenzar',
    'nav.search': 'Buscar en el sitio',
    'footer.copyright': '© 2026 Tu Empresa. Todos los derechos reservados.',
    'footer.newsletter.heading': 'Mantente informado',
    'footer.newsletter.subtext': 'Recibe actualizaciones, consejos y recursos en tu correo.',
    'footer.newsletter.placeholder': 'tu@ejemplo.com',
    'footer.newsletter.button': 'Suscribirse',
    'a11y.skipToContent': 'Saltar al contenido principal',
    'a11y.toggleDarkMode': 'Cambiar modo oscuro',
    'a11y.highContrast': 'Cambiar modo alto contraste',
    'a11y.reduceMotion': 'Reducir movimiento',
    'search.placeholder': 'Buscar paginas, publicaciones o escribe una URL...',
    'lang.switch': 'Idioma',
  },
}

export function getLocale(current?: string): Locale {
  if (current && locales.includes(current as Locale)) return current as Locale
  return defaultLocale
}

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key
}

export function getAlternateLocales(
  currentLocale: Locale,
  currentPath: string,
): Array<{ locale: Locale; href: string }> {
  return locales
    .filter(l => l !== currentLocale)
    .map(locale => {
      const path = currentPath.replace(/^\/(en|es)\//, '/')
      const href = locale === defaultLocale ? path : `/${locale}${path}`
      return { locale, href }
    })
}
