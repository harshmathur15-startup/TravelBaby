import { describe, it, expect } from 'vitest'
import { ICON_PATHS } from './icons'

describe('ICON_PATHS', () => {
  const EXPECTED_ICONS = [
    'check',
    'x',
    'arrowRight',
    'arrowLeft',
    'arrowDown',
    'arrowUp',
    'star',
    'starOutline',
    'search',
    'menu',
    'close',
    'info',
    'warning',
    'mail',
    'link',
    'externalLink',
    'clock',
    'chart',
    'settings',
    'user',
    'heart',
  ]

  it('should export all expected icon names', () => {
    for (const name of EXPECTED_ICONS) {
      expect(ICON_PATHS).toHaveProperty(name)
    }
  })

  it('should have non-empty string values for every icon', () => {
    for (const [name, path] of Object.entries(ICON_PATHS)) {
      expect(typeof path).toBe('string')
      expect(path.length).toBeGreaterThan(0)
    }
  })

  it('should have close as an alias for x', () => {
    expect(ICON_PATHS.close).toBe(ICON_PATHS.x)
  })

  it('should contain valid SVG path data characters', () => {
    // SVG path data uses: M, L, C, S, Q, T, A, Z, H, V and their lowercase variants, plus numbers, spaces, dots, commas, minus signs
    const validPathRegex = /^[MLCSQTAZHVmlcsqtazhv0-9\s.,\-]+$/
    for (const [name, path] of Object.entries(ICON_PATHS)) {
      expect(path).toMatch(validPathRegex)
    }
  })

  it('should not have undefined or null entries', () => {
    for (const [name, path] of Object.entries(ICON_PATHS)) {
      expect(path).toBeDefined()
      expect(path).not.toBeNull()
    }
  })
})
