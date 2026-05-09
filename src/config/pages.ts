/**
 * Page Content Configuration
 *
 * Content for individual pages (About, Contact, Features, Pricing, Compare, Services).
 * Homepage sections live in content.ts. This file covers everything else.
 * Edit this file alongside site.ts, content.ts, and theme.ts when customizing.
 */

export const ABOUT_PAGE = {
  hero: {
    title: 'Travel Should Be Easy and Affordable',
    subtitle:
      'Travel Baby uses AI to find the best flight and hotel deals across dozens of platforms — so you get the perfect trip without the research headache.',
  },
  mission: {
    title: 'Our Mission',
    paragraphs: [
      'Planning a trip should be exciting, not exhausting. But comparing flights across Skyscanner, hunting hotels on Booking.com, cross-referencing Airbnb, checking Agoda — it takes hours and you still wonder if you missed a better deal.',
      'Travel Baby was built to solve that. Our AI searches every major platform simultaneously, compares every combination of flights and stays, and delivers the best package for your budget. One search replaces twenty browser tabs.',
    ],
  },
  values: {
    title: 'What We Stand For',
    subtitle: 'The principles behind every trip we plan.',
    items: [
      {
        icon: '&#9733;',
        title: 'Transparency',
        description:
          'Every price comes with a source link. No hidden markups, no affiliate tricks. What we show is what you pay.',
      },
      {
        icon: '&#9788;',
        title: 'Savings First',
        description: 'Our AI optimizes for value, not commissions. We succeed when you save money.',
      },
      {
        icon: '&#9829;',
        title: 'Simplicity',
        description:
          'One search, one package. No twenty tabs, no spreadsheet comparisons. Travel planning in under a minute.',
      },
      {
        icon: '&#9878;',
        title: 'Trust',
        description:
          'Real-time prices from verified platforms. No bait-and-switch. The deal you see is the deal you get.',
      },
    ],
  },
  team: {
    title: 'Meet the Team',
    subtitle: 'Travelers building tools for travelers.',
    members: [
      { name: 'Arjun Mehta', role: 'CEO & Co-Founder' },
      { name: 'Priya Nair', role: 'CTO & Co-Founder' },
      { name: 'Kavya Reddy', role: 'Head of Product' },
      { name: 'Rohan Gupta', role: 'Lead Engineer' },
      { name: 'Sneha Iyer', role: 'Head of Partnerships' },
      { name: 'Vikram Singh', role: 'Head of Growth' },
    ],
  },
} as const

export const CONTACT_PAGE = {
  hero: {
    title: 'Start Planning Your Trip',
    subtitle:
      'Tell us about your dream trip — dates, destination, budget — and we will find the best package for you.',
  },
  sidebar: {
    title: 'Get in Touch',
    text: 'Whether you have a question about our plans, need help with a search, or want to explore partnership opportunities, we are here to help.',
    locationLine: 'Based in India — planning trips worldwide.',
  },
  form: {
    actionUrl: 'https://formsubmit.co/harshmathur15@gmail.com',
    submitLabel: 'Send Message',
  },
} as const

export const FEATURES_PAGE = {
  hero: {
    title: 'Smart Travel Planning, Powered by AI',
    subtitle:
      'See how Travel Baby searches 50+ platforms to find your perfect trip at the best price.',
  },
  primaryCta: { label: 'Plan My Trip', href: '/contact' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
} as const

export const PRICING_PAGE = {
  hero: {
    title: 'Simple, Transparent Pricing',
    subtitle:
      'Start with a free search. Upgrade when you want more destinations, better deals, and personal planning.',
  },
  primaryCta: { label: 'Search Free', href: '/contact' },
  secondaryCta: { label: 'Contact Us', href: '/contact' },
} as const

export const COMPARE_PAGE = {
  hero: {
    eyebrow: 'Comparison',
    heading: 'How We Compare',
    subtext: 'See how Travel Baby stacks up against manual searching and other travel tools.',
  },
  primaryCta: { label: 'Try Free Search', href: '/contact' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  whyUs: {
    eyebrow: 'Why Travel Baby',
    heading: 'What Sets Us Apart',
    subtext: 'Four reasons travelers choose Travel Baby.',
    items: [
      {
        title: 'AI-Powered',
        description:
          'Not just a price list — our AI optimizes the complete package across flights, hotels, and transport for the lowest total cost.',
      },
      {
        title: 'Real-Time Prices',
        description:
          'No stale caches. Every search pulls live prices from 50+ platforms so you see what is actually available right now.',
      },
      {
        title: 'One Search, Full Package',
        description:
          'Stop juggling Skyscanner for flights, Booking.com for hotels, and Google Maps for transport. One search covers everything.',
      },
      {
        title: 'Transparent & Fair',
        description:
          'Every result links to the source. No hidden markups, no affiliate steering. The cheapest option wins, period.',
      },
    ],
  },
} as const

export const SERVICES_PAGE = {
  hero: {
    title: 'Travel Packages for Every Trip',
    subtitle:
      'From weekend domestic getaways to month-long international adventures — Travel Baby finds the best deals for any kind of trip.',
  },
  services: [
    {
      title: 'Domestic Trips',
      description:
        'Explore your own country with optimized flight and hotel packages. Weekend escapes, hill stations, beach getaways, cultural tours — all at the best available prices.',
      icon: '&#9968;',
      image: '/images/service-domestic-1.jpg',
    },
    {
      title: 'International Trips',
      description:
        'Dream bigger. Our AI searches global flights and accommodation across every major platform to build the most affordable international packages for your dates.',
      icon: '&#9992;',
      image: '/images/service-international-1.jpg',
    },
    {
      title: 'Weekend Getaways',
      description:
        'Short on time, not on adventure. Quick 2-3 day packages optimized for nearby destinations with the best last-minute flight and stay deals.',
      icon: '&#9728;',
      image: '/images/service-weekend-1.jpg',
    },
    {
      title: 'Custom Packages',
      description:
        'Multi-city, group travel, special occasions, specific requirements — tell us exactly what you need and our AI (or Concierge planner) will build it from scratch.',
      icon: '&#9998;',
      image: '/images/service-custom-1.jpg',
    },
  ],
} as const
