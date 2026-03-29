import { HERO_CONTENT } from '@config'

export interface HeroProps {
  badge?: string
  heading?: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  trustLine?: string
  trustLogos?: string[]
}

export interface ResolvedHero {
  badge: string
  heading: string
  subtext: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  trustLine: string
  trustLogos: string[]
}

export function resolveHeroProps(props: HeroProps): ResolvedHero {
  return {
    badge: props.badge ?? HERO_CONTENT.badge,
    heading: props.heading ?? HERO_CONTENT.heading,
    subtext: props.subtext ?? HERO_CONTENT.subtext,
    ctaText: props.ctaText ?? HERO_CONTENT.primaryCta.label,
    ctaLink: props.ctaLink ?? HERO_CONTENT.primaryCta.href,
    secondaryCtaText: props.secondaryCtaText ?? HERO_CONTENT.secondaryCta.label,
    secondaryCtaLink: props.secondaryCtaLink ?? HERO_CONTENT.secondaryCta.href,
    trustLine: props.trustLine ?? HERO_CONTENT.trustLine,
    trustLogos: props.trustLogos ?? [...HERO_CONTENT.trustLogos],
  }
}
