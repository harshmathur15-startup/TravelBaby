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
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', href: '/#faq' },
        { label: 'Travel Tips', href: '/blog' },
        { label: 'Vietnam', href: '/destinations/vietnam' },
        { label: 'Help Center', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
  ] as FooterColumn[],

  /** Social media links with inline SVG icons */
  socialLinks: [
    {
      label: 'LinkedIn',
      href: '#',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    },
    {
      label: 'X',
      href: '#',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    },
    {
      label: 'Instagram',
      href: '#',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    },
  ] as SocialLink[],

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
