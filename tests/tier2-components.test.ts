import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve(import.meta.dirname, '..', 'dist')

function readPage(pagePath: string): string {
  return readFileSync(resolve(DIST, pagePath), 'utf-8')
}

describe('PreferenceToggles', () => {
  const html = readPage('index.html')

  it('renders preference toggle group', () => {
    expect(html).toMatch(/role="group"[^>]*aria-label="Accessibility preferences"/)
  })

  it('renders contrast toggle with aria-pressed', () => {
    expect(html).toMatch(/id="contrast-toggle"[^>]*aria-pressed/)
  })

  it('renders motion toggle with aria-pressed', () => {
    expect(html).toMatch(/id="motion-toggle"[^>]*aria-pressed/)
  })
})

describe('CommandLauncher', () => {
  const html = readPage('index.html')

  it('renders dialog with aria-modal', () => {
    expect(html).toMatch(/id="cmd-launcher"[^>]*role="dialog"[^>]*aria-modal="true"/)
  })

  it('starts hidden', () => {
    expect(html).toMatch(/id="cmd-launcher"[^>]*aria-hidden="true"/)
  })

  it('has search input with aria-label', () => {
    expect(html).toMatch(/id="cmd-launcher-input"[^>]*aria-label="Search"/)
  })

  it('has keyboard shortcut footer', () => {
    expect(html).toContain('Navigate')
    expect(html).toContain('Esc')
  })

  it('renders quick links from nav config', () => {
    expect(html).toContain('cmd-launcher__quick-links')
  })
})

describe('LanguagePicker', () => {
  const html = readPage('index.html')

  it('renders current locale indicator', () => {
    expect(html).toContain('lang-picker__current')
    expect(html).toMatch(/aria-label="Current language"/)
  })

  it('renders alternate locale link with hreflang', () => {
    expect(html).toMatch(/lang-picker__link[^>]*hreflang="es"/)
  })
})

describe('hreflang tags', () => {
  const html = readPage('index.html')

  it('has hreflang for alternate locale', () => {
    expect(html).toMatch(/hreflang="es"/)
  })

  it('has hreflang for current locale', () => {
    expect(html).toMatch(/hreflang="en"/)
  })

  it('has x-default hreflang', () => {
    expect(html).toMatch(/hreflang="x-default"/)
  })
})

describe('Accessibility preferences', () => {
  const html = readPage('index.html')

  it('has contrast toggle that persists to localStorage', () => {
    expect(html).toContain('high-contrast')
    expect(html).toContain('localStorage')
  })

  it('has motion toggle that checks system preference', () => {
    expect(html).toContain('reduce-motion')
    expect(html).toContain('prefers-reduced-motion')
  })
})

describe('RTL support', () => {
  const html = readPage('index.html')

  it('has dir attribute on html', () => {
    expect(html).toMatch(/<html[^>]*dir="ltr"/)
  })
})
