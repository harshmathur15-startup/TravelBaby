import { describe, it, expect, vi } from 'vitest'

// vi.hoisted runs before vi.mock hoisting — safe to reference in factory
const MOCK_HERO_CONTENT = vi.hoisted(() => ({
  badge: 'Default Badge',
  heading: 'Default Heading',
  subtext: 'Default subtext',
  primaryCta: { label: 'Get Started', href: '/get-started' },
  secondaryCta: { label: 'Learn More', href: '/features' },
  trustLine: 'Trusted by teams everywhere',
  trustLogos: ['LogoA', 'LogoB'],
}))

vi.mock('@config', () => ({
  HERO_CONTENT: MOCK_HERO_CONTENT,
}))

import { resolveHeroProps } from './hero-utils'

describe('resolveHeroProps', () => {
  it('should return all defaults when props are empty', () => {
    const result = resolveHeroProps({})
    expect(result.badge).toBe(MOCK_HERO_CONTENT.badge)
    expect(result.heading).toBe(MOCK_HERO_CONTENT.heading)
    expect(result.subtext).toBe(MOCK_HERO_CONTENT.subtext)
    expect(result.ctaText).toBe(MOCK_HERO_CONTENT.primaryCta.label)
    expect(result.ctaLink).toBe(MOCK_HERO_CONTENT.primaryCta.href)
    expect(result.secondaryCtaText).toBe(MOCK_HERO_CONTENT.secondaryCta.label)
    expect(result.secondaryCtaLink).toBe(MOCK_HERO_CONTENT.secondaryCta.href)
    expect(result.trustLine).toBe(MOCK_HERO_CONTENT.trustLine)
    expect(result.trustLogos).toEqual([...MOCK_HERO_CONTENT.trustLogos])
  })

  it('should override only the provided props', () => {
    const result = resolveHeroProps({ badge: 'Custom Badge' })
    expect(result.badge).toBe('Custom Badge')
    expect(result.heading).toBe(MOCK_HERO_CONTENT.heading)
  })

  it('should override all props when all are provided', () => {
    const full = {
      badge: 'B',
      heading: 'H',
      subtext: 'S',
      ctaText: 'CT',
      ctaLink: '/ct',
      secondaryCtaText: 'SC',
      secondaryCtaLink: '/sc',
      trustLine: 'TL',
      trustLogos: ['Logo1'],
    }
    const result = resolveHeroProps(full)
    expect(result).toEqual(full)
  })

  it('should not mutate the default trustLogos', () => {
    const result = resolveHeroProps({})
    result.trustLogos.push('Extra')
    const fresh = resolveHeroProps({})
    expect(fresh.trustLogos).not.toContain('Extra')
  })
})
