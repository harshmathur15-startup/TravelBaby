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
export const locales = ['en', 'hi'] as const
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
  hi: {
    'nav.features': 'विशेषताएं',
    'nav.pricing': 'मूल्य',
    'nav.compare': 'तुलना',
    'nav.blog': 'ब्लॉग',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.getStarted': 'शुरू करें',
    'nav.search': 'साइट में खोजें',
    'footer.copyright': '© 2026 Travel Baby. सर्वाधिकार सुरक्षित।',
    'footer.newsletter.heading': 'बेहतरीन डील पाएं',
    'footer.newsletter.subtext': 'हर हफ्ते सबसे अच्छी ट्रैवल डील, गाइड और टिप्स अपने इनबॉक्स में पाएं।',
    'footer.newsletter.placeholder': 'aap@example.com',
    'footer.newsletter.button': 'सब्सक्राइब करें',
    'a11y.skipToContent': 'मुख्य सामग्री पर जाएं',
    'a11y.toggleDarkMode': 'डार्क मोड टॉगल करें',
    'a11y.highContrast': 'हाई कॉन्ट्रास्ट मोड टॉगल करें',
    'a11y.reduceMotion': 'एनिमेशन कम करें',
    'search.placeholder': 'पेज, पोस्ट या URL खोजें...',
    'lang.switch': 'भाषा',
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
      const path = currentPath.replace(/^\/(en|hi)\//, '/')
      const href = locale === defaultLocale ? path : `/${locale}${path}`
      return { locale, href }
    })
}
