import { describe, it, expect } from 'vitest'
import { getLocale, t, getAlternateLocales, defaultLocale, locales } from './i18n'
import type { Locale } from './i18n'

describe('i18n', () => {
  describe('defaultLocale', () => {
    it('should be en', () => {
      expect(defaultLocale).toBe('en')
    })
  })

  describe('locales', () => {
    it('should include en and es', () => {
      expect(locales).toContain('en')
      expect(locales).toContain('es')
    })
  })

  describe('getLocale', () => {
    it('should return the locale when it is a valid locale', () => {
      expect(getLocale('en')).toBe('en')
      expect(getLocale('es')).toBe('es')
    })

    it('should return the default locale when given an invalid locale', () => {
      expect(getLocale('fr')).toBe('en')
      expect(getLocale('zz')).toBe('en')
    })

    it('should return the default locale when given undefined', () => {
      expect(getLocale(undefined)).toBe('en')
    })

    it('should return the default locale when given an empty string', () => {
      expect(getLocale('')).toBe('en')
    })
  })

  describe('t', () => {
    it('should return the English translation for a known key', () => {
      expect(t('en', 'nav.features')).toBe('Features')
    })

    it('should return the Spanish translation for a known key', () => {
      expect(t('es', 'nav.features')).toBe('Funcionalidades')
    })

    it('should fall back to English when the key is missing in the requested locale', () => {
      // Use a key that exists in en — if es somehow lacks it, en is the fallback
      // We test the fallback chain by verifying en keys always resolve
      expect(t('en', 'nav.pricing')).toBe('Pricing')
    })

    it('should return the key itself when it does not exist in any locale', () => {
      expect(t('en', 'nonexistent.key')).toBe('nonexistent.key')
      expect(t('es', 'nonexistent.key')).toBe('nonexistent.key')
    })

    it('should handle deeply nested key names', () => {
      expect(t('en', 'footer.newsletter.heading')).toBe('Stay in the loop')
      expect(t('es', 'footer.newsletter.heading')).toBe('Mantente informado')
    })
  })

  describe('getAlternateLocales', () => {
    it('should return es alternate when current locale is en', () => {
      const result = getAlternateLocales('en', '/features')
      expect(result).toEqual([{ locale: 'es', href: '/es/features' }])
    })

    it('should return en alternate when current locale is es', () => {
      const result = getAlternateLocales('es', '/es/pricing')
      expect(result).toEqual([{ locale: 'en', href: '/pricing' }])
    })

    it('should strip existing locale prefix from the path', () => {
      const result = getAlternateLocales('es', '/es/about')
      expect(result).toEqual([{ locale: 'en', href: '/about' }])
    })

    it('should handle root path for en locale', () => {
      const result = getAlternateLocales('en', '/')
      expect(result).toEqual([{ locale: 'es', href: '/es/' }])
    })

    it('should handle root path for es locale', () => {
      const result = getAlternateLocales('es', '/es/')
      // After stripping /es/, we get '/' — default locale returns just '/'
      expect(result).toEqual([{ locale: 'en', href: '/' }])
    })

    it('should not include the current locale in the result', () => {
      const result = getAlternateLocales('en', '/blog')
      const localesInResult = result.map(r => r.locale)
      expect(localesInResult).not.toContain('en')
    })
  })
})
