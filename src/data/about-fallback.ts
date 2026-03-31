/**
 * About page fallback content.
 * Used when CMS content is unavailable or not yet seeded.
 * Replace [COMPANY] placeholders with your actual company details before going live.
 */

export interface TeamMember {
  name: string
  role: string
  image?: string
}

export interface ValueItem {
  title: string
  description: string
}

export const ABOUT_FALLBACK_TEAM: TeamMember[] = [
  { name: 'Jane Smith', role: 'CEO & Co-Founder' },
  { name: 'Alex Chen', role: 'CTO' },
  { name: 'Maria Lopez', role: 'Head of Design' },
  { name: 'Sam Patel', role: 'Lead Engineer' },
]

export const ABOUT_FALLBACK_VALUES: ValueItem[] = [
  {
    title: 'Transparency First',
    description:
      'Simple pricing, honest communication, and clear documentation. No hidden fees, no surprises.',
  },
  {
    title: 'Built for Growth',
    description:
      'Scales with you from a small team to hundreds of users without breaking your budget or your workflows.',
  },
  {
    title: 'Human Where It Matters',
    description:
      'Automation handles the repetitive work. People make the decisions that affect other people.',
  },
  {
    title: 'Quality Over Speed',
    description:
      'Every feature ships tested, documented, and accessible. We move deliberately, not recklessly.',
  },
]

export const ABOUT_FALLBACK_MISSION_PARAGRAPHS: string[] = [
  '[COMPANY] was founded on a simple observation: small and mid-size teams deserve the same quality tools that enterprises take for granted — without the enterprise complexity or price tag.',
  'Most existing solutions automate individual tasks but leave the human to bridge the gaps between them. We take a different approach: connect the workflows end-to-end so your team spends time on work that matters, not on administrative overhead.',
  'Our platform is designed to grow with you. Start with the features you need today, and activate more as your team and requirements evolve. No migrations, no re-implementations — just a platform that adapts.',
]
