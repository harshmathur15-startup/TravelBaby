/**
 * Site Configuration
 *
 * Central source of truth for brand, navigation, footer, and metadata.
 * Edit this file to customize the site identity — all components read from here.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SITE_CONFIG = {
  /** Site name — used in Navbar, Footer, meta tags, manifest */
  name: 'Brand',

  /** Production URL — used in sitemap, RSS, robots.txt, OG tags */
  url: 'https://example.com',

  /** Default meta description */
  description: 'Your website description goes here',

  /** Default Open Graph image path (relative to public/) */
  ogImage: '/og-default.png',

  /** Theme color for manifest and meta tag */
  themeColor: '#4f46e5',

  /** Site language */
  language: 'en',

  /** Primary navigation links */
  navLinks: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Compare', href: '/compare' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],

  /** Header CTA button */
  ctaButton: {
    label: 'Get Started',
    href: '/get-started',
  },

  /** Footer link columns */
  footerColumns: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
        { label: 'Get Started', href: '/get-started' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Docs', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Community', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
  ] as FooterColumn[],

  /** Social media links with inline SVG icons */
  socialLinks: [
    { label: 'LinkedIn', href: '#', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
    { label: 'X', href: '#', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { label: 'GitHub', href: '#', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' },
  ] as SocialLink[],

  /** Copyright line — {year} is replaced at render time */
  copyright: 'Your Company',

  /** Footer newsletter section */
  newsletter: {
    heading: 'Stay in the loop',
    subtext: 'Get product updates, tips, and resources delivered to your inbox.',
    placeholder: 'you@example.com',
  },

  /** RSS feed configuration */
  rss: {
    title: 'Blog',
    description: 'Articles, tutorials, and insights on web development, design, and building great products.',
  },

  /** Legal & contact information — used in Privacy, Terms, and Contact pages */
  legal: {
    companyName: 'Your Company Inc.',
    email: 'hello@example.com',
    privacyEmail: 'privacy@example.com',
    phone: '(555) 000-0000',
    address: '123 Main St, City, State 12345',
  },

  /** Analytics — leave gaId empty to disable */
  analytics: {
    gaId: '',
  },
} as const;
