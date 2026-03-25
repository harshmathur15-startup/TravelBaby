/**
 * Page Content Configuration
 *
 * Content for individual pages (About, Contact, Features, Pricing, Compare).
 * Homepage sections live in content.ts. This file covers everything else.
 * Edit this file alongside site.ts, content.ts, and theme.ts when customizing.
 */

export const ABOUT_PAGE = {
  hero: {
    title: 'Building Tools That Matter',
    subtitle: 'We are a team of builders, designers, and problem-solvers on a mission to help businesses launch faster and scale smarter.',
  },
  mission: {
    title: 'Our Mission',
    paragraphs: [
      'Great software should be accessible to every business, not just the ones with unlimited budgets and large engineering teams. We build tools that give startups and growing companies the same foundation that enterprise teams take for granted.',
      'Our platform combines modern design, solid architecture, and developer experience into a single starting point. Whether you are launching your first product or scaling your tenth, we provide the groundwork so you can focus on what makes your business unique.',
    ],
  },
  values: {
    title: 'What We Stand For',
    subtitle: 'The principles that guide every decision we make.',
    items: [
      { icon: '&#9733;', title: 'Quality First', description: 'We ship when it is ready, not when it is due. Every detail matters.' },
      { icon: '&#9788;', title: 'Open & Transparent', description: 'Honest communication with our team, our customers, and ourselves.' },
      { icon: '&#9829;', title: 'Customer Focused', description: 'Every decision starts with the question: does this help our users?' },
      { icon: '&#9878;', title: 'Built to Scale', description: 'We architect for growth from day one, so our tools grow with you.' },
    ],
  },
  team: {
    title: 'Meet the Team',
    subtitle: 'The people making it happen.',
    members: [
      { name: 'Jane Smith', role: 'CEO & Co-Founder' },
      { name: 'Alex Johnson', role: 'CTO & Co-Founder' },
      { name: 'Maria Garcia', role: 'Head of Design' },
      { name: 'David Lee', role: 'Lead Engineer' },
      { name: 'Sarah Chen', role: 'Head of Marketing' },
      { name: 'James Wilson', role: 'Head of Sales' },
    ],
  },
} as const;

export const CONTACT_PAGE = {
  hero: {
    title: 'Contact Us',
    subtitle: 'Have a question, feedback, or just want to say hello? We would love to hear from you.',
  },
  sidebar: {
    title: 'Get in Touch',
    text: 'Whether you have a question about features, pricing, or anything else, our team is ready to answer.',
    locationLine: 'Based in Your City — serving customers everywhere.',
  },
  form: {
    actionUrl: 'https://formspree.io/f/your-form-id',
    submitLabel: 'Send Message',
  },
} as const;

export const FEATURES_PAGE = {
  hero: {
    title: 'Everything You Need to Ship Fast',
    subtitle: 'A complete foundation with design system, CMS, SEO, and responsive components.',
  },
  primaryCta: { label: 'Get Started', href: '/get-started' },
  secondaryCta: { label: 'Explore Features', href: '#features' },
} as const;

export const PRICING_PAGE = {
  hero: {
    title: 'Simple, Transparent Pricing',
    subtitle: 'No hidden fees. No surprises. Pick the plan that fits your needs.',
  },
  primaryCta: { label: 'View Plans', href: '#plans' },
  secondaryCta: { label: 'Contact Sales', href: '/contact' },
} as const;

export const COMPARE_PAGE = {
  hero: {
    eyebrow: 'Comparison',
    heading: 'How We Compare',
    subtext: 'See how our platform stacks up against the competition.',
  },
  primaryCta: { label: 'Start Free Trial', href: '/get-started' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  whyUs: {
    eyebrow: 'Why Us',
    heading: 'What Sets Us Apart',
    subtext: 'Four reasons teams make the switch.',
    items: [
      { title: 'Built for Speed', description: 'Get up and running in minutes, not months. Our guided setup adapts to your team size and workflow.' },
      { title: 'Transparent Pricing', description: 'No hidden fees, no custom quotes. What you see is what you pay. Start free, upgrade when ready.' },
      { title: 'Automation First', description: 'Automate repetitive tasks out of the box. Focus on strategy while the platform handles operations.' },
      { title: 'Purpose-Built', description: 'Not a stripped-down enterprise tool. Designed from the ground up for teams that need power without complexity.' },
    ],
  },
} as const;
