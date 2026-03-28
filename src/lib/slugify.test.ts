import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('handles basic Latin text', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips diacritics from Latin characters', () => {
    expect(slugify('Über die Brücke')).toBe('uber-die-brucke')
    expect(slugify('café résumé')).toBe('cafe-resume')
  })

  it('preserves CJK characters', () => {
    expect(slugify('日本語のタイトル')).toBe('日本語のタイトル')
  })

  it('preserves Arabic characters', () => {
    expect(slugify('مرحبا بالعالم')).toBe('مرحبا-بالعالم')
  })

  it('preserves Cyrillic characters', () => {
    expect(slugify('Привет мир')).toBe('привет-мир')
  })

  it('collapses multiple spaces and hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world')
    expect(slugify('hello---world')).toBe('hello-world')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify(' -hello world- ')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('hello! @world# $test')).toBe('hello-world-test')
  })

  it('handles mixed Latin and non-Latin', () => {
    expect(slugify('SEO tips for 日本語')).toBe('seo-tips-for-日本語')
  })

  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})
