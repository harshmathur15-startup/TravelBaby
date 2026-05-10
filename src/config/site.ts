/**
 * Site Configuration
 *
 * Central source of truth for brand, navigation, footer, and metadata.
 * Edit this file to customize the site identity — all components read from here.
 */

export interface NavLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export const SITE_CONFIG = {
  /** Site name — used in Navbar, Footer, meta tags, manifest */
  name: 'Travel Baby',

  /** Production URL — used in sitemap, RSS, robots.txt, OG tags */
  url: 'https://travelbaby.in',

  /** Default meta description */
  description:
    'AI-powered travel planning — best flights, hotels, and packages for your perfect trip',

  /** Default Open Graph image path (relative to public/) */
  ogImage: '/og-default.png',

  /** Theme color for manifest and meta tag */
  themeColor: '#3b82f6',

  /** Site language */
  language: 'en',

  /** Primary navigation links */
  navLinks: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Astro Travel', href: '/astro-travel' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],

  /** Header CTA button */
  ctaButton: {
    label: 'Plan My Trip',
    href: '/plan-my-trip',
  },

  /** Footer link columns */
  footerColumns: [
    {
      title: 'Services',
      links: [
        { label: 'Domestic Trips', href: '/services' },
        { label: 'International Trips', href: '/services' },
        { label: 'Weekend Getaways', href: '/services' },
        { label: 'Custom Packages', href: '/services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', href: '/#faq' },
        { label: 'Travel Tips', href: '/blog' },
        { label: 'Vietnam', href: '/destinations/vietnam' },
        { label: 'Astro Travel', href: '/astro-travel' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ] as FooterColumn[],

  /** Social media links with inline SVG icons */
  socialLinks: [] as SocialLink[],

  /** Copyright line — {year} is replaced at render time */
  copyright: 'Travel Baby',

  /** Footer newsletter section */
  newsletter: {
    heading: 'Get the Best Travel Deals',
    subtext: 'Weekly curated deals, destination guides, and travel tips delivered to your inbox.',
    placeholder: 'you@example.com',
  },

  /** RSS feed configuration */
  rss: {
    title: 'Travel Baby Blog',
    description: 'Travel tips, destination guides, and deal alerts to help you travel smarter.',
  },

  /** Legal & contact information — used in Privacy, Terms, and Contact pages */
  legal: {
    companyName: 'Travel Baby Inc.',
    email: 'hello@travelbaby.com',
    privacyEmail: 'privacy@travelbaby.com',
    phone: '(555) 000-0000',
    address: '123 Main St, City, State 12345',
  },

  /** Analytics — leave gaId empty to disable */
  analytics: {
    gaId: '',
  },
} as const
