/**
 * Content Configuration
 *
 * Default content for homepage sections and reusable page blocks.
 * Edit this file to customize what appears on the site.
 * When Sanity CMS is connected, CMS content overrides these defaults.
 */

export const HERO_CONTENT = {
  badge: 'Launch Your Product',
  heading: 'Build Something<br />People Actually Want.',
  subtext: 'A modern website boilerplate with everything you need to launch fast. Design tokens, CMS integration, SEO, and responsive components out of the box.',
  primaryCta: { label: 'Get Started Free', href: '/get-started' },
  secondaryCta: { label: 'Learn More', href: '/features' },
  trustLine: 'Trusted by growing companies',
} as const;

export const FEATURES_CONTENT = {
  eyebrow: 'Core Features',
  heading: 'Everything You Need to Ship Fast',
  subtext: 'A complete foundation so you can focus on what makes your product unique.',
  items: [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      title: 'Blazing Fast',
      description: 'Built on Astro with zero JavaScript by default. Static pages ship only HTML and CSS for instant load times.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="17" r="2"/><circle cx="6" cy="18" r="3"/><path d="M13.5 9a6.5 6.5 0 0 0-6.5 6.5"/><path d="M13.5 9a4.5 4.5 0 0 1 4.5 4.5"/></svg>',
      title: 'Design System',
      description: 'Complete design token system with CSS custom properties. Consistent spacing, typography, and color scales throughout.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      title: 'SEO Ready',
      description: 'Open Graph, Twitter cards, JSON-LD structured data, sitemaps, and canonical URLs configured out of the box.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></svg>',
      title: 'CMS Integrated',
      description: 'Sanity CMS with page builder, blog system, and content schemas. Edit content without touching code.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      title: 'Fully Responsive',
      description: 'Mobile-first design that looks great on every device and screen size. No breakpoint left behind.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      title: 'Production Ready',
      description: 'TypeScript strict mode, CI/CD pipeline, and security headers baked in. Ship to production with confidence.',
    },
  ],
} as const;

export const STATS_CONTENT = [
  { value: '<1s', label: 'First contentful paint' },
  { value: '100', label: 'Lighthouse performance' },
  { value: '0', label: 'JavaScript by default' },
  { value: '10min', label: 'Clone to running site' },
] as const;

export const PRICING_CONTENT = {
  eyebrow: 'Pricing',
  heading: 'Simple, Transparent Pricing',
  subtext: 'Choose the plan that fits your needs. Scale as you grow.',
  trialNote: 'All plans include a 14-day free trial. No credit card required.',
  tiers: [
    {
      name: 'Free', monthlyPrice: 0, annualPrice: 0, popular: false,
      description: 'Perfect for personal projects and experimentation.',
      cta: 'Get Started', ctaHref: '/get-started',
      features: ['Up to 5 pages', '10 components', 'Community support', 'Basic SEO setup', 'GitHub repository access'],
    },
    {
      name: 'Pro', monthlyPrice: 29, annualPrice: 24, popular: true,
      description: 'For teams building production websites and apps.',
      cta: 'Start Free Trial', ctaHref: '/get-started?plan=pro',
      features: ['Unlimited pages', 'All components', 'CMS integration', 'Priority email support', 'Custom design tokens', 'Analytics dashboard', 'Multiple environments'],
    },
    {
      name: 'Enterprise', monthlyPrice: null, annualPrice: null, popular: false,
      description: 'For organizations with custom requirements.',
      cta: 'Contact Us', ctaHref: '/contact',
      features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantees', 'On-premise deployment', 'Security audit', 'Team onboarding'],
    },
  ],
} as const;

export const TESTIMONIALS_CONTENT = {
  eyebrow: 'Testimonials',
  heading: 'What People Are Saying',
  subtext: 'Hear from developers who shipped faster with this boilerplate.',
  items: [
    {
      quote: 'We went from zero to a fully deployed marketing site in under a day. The design tokens and component library saved us weeks of setup work.',
      name: 'Sarah Chen',
      role: 'CTO, Launchpad Labs',
    },
    {
      quote: 'The CMS integration was the deciding factor. Our content team can update pages without filing engineering tickets. The SEO setup is excellent too.',
      name: 'Marcus Rivera',
      role: 'Lead Developer, Clearview',
    },
    {
      quote: 'Clean code, great documentation, and it actually works out of the box. No mystery configurations or broken dependencies. Just clone and build.',
      name: 'Priya Sharma',
      role: 'Founder, Nimbus Studio',
    },
  ],
} as const;

export const FAQ_CONTENT = [
  {
    question: 'How do I get started with the boilerplate?',
    answer: 'Clone the repository, run npm install, and start the dev server. The getting-started guide walks you through configuration, environment variables, and your first deployment in under 10 minutes.',
  },
  {
    question: 'Can I customize the design tokens and styling?',
    answer: 'Yes. All design decisions flow from CSS custom properties defined in the tokens file. Change colors, typography, spacing, and breakpoints in one place and the entire site updates automatically.',
  },
  {
    question: 'How does the CMS integration work?',
    answer: 'The boilerplate connects to Sanity CMS out of the box. Content schemas for pages, blog posts, and reusable blocks are pre-configured. Your content team can edit pages visually without touching code.',
  },
  {
    question: 'How do I deploy to production?',
    answer: 'The boilerplate includes CI/CD configuration for popular platforms including Vercel, Netlify, and AWS. Push to your main branch and the pipeline handles building, testing, and deploying automatically.',
  },
  {
    question: 'How do I receive updates and new features?',
    answer: 'The boilerplate uses a template inheritance model. When updates are released, you can pull them into your project selectively. Breaking changes are documented in the changelog with migration guides.',
  },
  {
    question: 'What kind of support is available?',
    answer: 'Free users get community support through GitHub discussions. Pro users receive priority email support with 24-hour response times. Enterprise customers get dedicated support with SLA guarantees.',
  },
] as const;

export const CTA_CONTENT = {
  heading: 'Ready to Launch Your Website?',
  subtext: 'Clone the boilerplate and start building in minutes. Everything you need is already set up.',
  buttonLabel: 'Get Started',
  buttonHref: '/get-started',
} as const;
