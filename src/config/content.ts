/**
 * Content Configuration
 *
 * Default content for homepage sections and reusable page blocks.
 * Edit this file to customize what appears on the site.
 * When Sanity CMS is connected, CMS content overrides these defaults.
 */

export const HERO_CONTENT = {
  badge: 'AI-Powered Travel Planning',
  heading: 'Your Perfect Trip,<br />At the Best Price.',
  subtext:
    'Tell us where and when — Travel Baby\'s AI scans Skyscanner, Cleartrip, Trivago, Booking.com, and Agoda to find the best flights and stays, then assembles your ideal package.',
  primaryCta: { label: 'Plan My Trip', href: '/plan-my-trip' },
  secondaryCta: { label: 'See How It Works', href: '/#how-it-works' },
  trustLine: 'Comparing deals across 50+ platforms in real time',
  trustLogos: ['Skyscanner', 'Booking.com', 'Cleartrip', 'Agoda'],
} as const

export const FEATURES_CONTENT = {
  eyebrow: 'Why Travel Baby',
  heading: 'Smart Travel Planning, Zero Hassle',
  subtext: 'Our AI searches dozens of platforms simultaneously to find you the best deals — so you can focus on packing.',
  items: [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      title: 'AI-Powered Search',
      description:
        'Our AI scans Skyscanner, Cleartrip, Trivago, Booking.com, and Agoda simultaneously to surface the best options in seconds.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      title: 'Best Price Guarantee',
      description:
        'We compare flights and hotels across 50+ sources so you never overpay. If there is a cheaper option, we will find it.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      title: 'Personalized Packages',
      description:
        'Tell us your dates, budget, and travel style. We build a complete package tailored to exactly what you want.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      title: 'Domestic & International',
      description:
        'From weekend getaways to month-long international adventures, we cover every type of trip across every destination.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      title: 'Real-Time Deals',
      description:
        'Prices are fetched live, not cached from yesterday. You see what is actually available right now, at today\'s rates.',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      title: 'All-In-One Packages',
      description:
        'Flights, hotels, and local transport bundled and optimized. One search, one package, one price — no juggling tabs.',
    },
  ],
} as const

export const STATS_CONTENT = [
  { value: '50+', label: 'Platforms compared' },
  { value: '30s', label: 'Average search time' },
  { value: '40%', label: 'Average savings' },
  { value: '10K+', label: 'Trips planned' },
] as const

export const PRICING_CONTENT = {
  eyebrow: 'Simple Pricing',
  heading: 'One Search, Best Prices',
  subtext: 'Start free, upgrade when you need more. No hidden fees, cancel anytime.',
  trialNote: 'Quick Search is always free. No credit card required.',
  tiers: [
    {
      name: 'Quick Search',
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      description: 'Perfect for exploring options and domestic getaways.',
      cta: 'Search Free',
      ctaHref: '/plan-my-trip',
      features: [
        'Top 3 flight + hotel combos',
        'Domestic destinations only',
        'Basic price comparison',
        'Results within 60 seconds',
        'Email delivery',
      ],
    },
    {
      name: 'Smart Package',
      monthlyPrice: 499,
      annualPrice: 399,
      popular: true,
      description: 'Full-powered search for travelers who want the best deal.',
      cta: 'Get Smart Package',
      ctaHref: '/plan-my-trip',
      features: [
        'Top 10 optimized combos',
        'Domestic + international',
        'Flights, hotels, and Airbnb',
        'Multi-city routing',
        'Price drop alerts for 30 days',
        'Budget optimization',
        'Priority results in 30 seconds',
      ],
    },
    {
      name: 'Concierge',
      monthlyPrice: 1999,
      annualPrice: 1599,
      popular: false,
      description: 'White-glove travel planning with a dedicated planner.',
      cta: 'Get Concierge',
      ctaHref: '/plan-my-trip',
      features: [
        'Everything in Smart Package',
        'Dedicated travel planner',
        'Complex multi-city itineraries',
        'Rebooking if prices drop',
        'Visa and travel advisory',
        'Priority 24/7 support',
        'Group and family packages',
      ],
    },
  ],
} as const

export const TESTIMONIALS_CONTENT = {
  eyebrow: 'Traveler Stories',
  heading: 'Real Trips, Real Savings',
  subtext: 'Hear from travelers who found better deals and stress-free planning with Travel Baby.',
  items: [
    {
      quote:
        'I was planning a week in Bali and had 20 tabs open comparing flights and hotels. Travel Baby found a package that saved me over $400 — in under a minute. I am never going back to manual searching.',
      name: 'Ananya Sharma',
      role: 'Solo Traveler, Delhi',
    },
    {
      quote:
        'We needed a family trip to Europe for five people on a tight budget. Travel Baby found us flights through Istanbul that were half the price of direct routes, plus a stunning Airbnb in Barcelona. Incredible.',
      name: 'Rajesh Patel',
      role: 'Family of 5, Mumbai',
    },
    {
      quote:
        'The Concierge plan is worth every penny. My planner rebooked our flights when prices dropped two days later and saved us another $200. That kind of service does not exist anywhere else at this price.',
      name: 'Meera Krishnan',
      role: 'Frequent Traveler, Bangalore',
    },
  ],
} as const

export const FAQ_CONTENT = [
  {
    question: 'How does Travel Baby find the best deals?',
    answer:
      'Our AI simultaneously searches Skyscanner, Cleartrip, Trivago, Booking.com, Agoda, and other platforms to compare flights, hotels, and Airbnb options. It then combines the best options into optimized packages based on your dates, budget, and preferences.',
  },
  {
    question: 'Is Travel Baby free to use?',
    answer:
      'Yes — our Quick Search plan is completely free and gives you the top 3 flight and hotel combinations for domestic trips. For international travel, multi-city routing, and advanced features like price drop alerts, check out our Smart Package and Concierge plans.',
  },
  {
    question: 'How far in advance should I plan my trip?',
    answer:
      'For the best deals, we recommend searching 4 to 8 weeks before domestic trips and 8 to 12 weeks before international trips. However, Travel Baby also finds last-minute deals — sometimes the best prices appear within 2 weeks of departure.',
  },
  {
    question: 'Do you handle both domestic and international trips?',
    answer:
      'Yes. Our Quick Search covers domestic destinations, while the Smart Package and Concierge plans include full international coverage with multi-city routing, visa advisories, and local transport options.',
  },
  {
    question: 'How do you compare flight prices?',
    answer:
      'We pull real-time pricing from Skyscanner, Cleartrip, and airline direct sites. Our AI considers not just the ticket price but also baggage fees, layover times, and total travel duration to recommend the best overall value.',
  },
  {
    question: 'What accommodation types do you include?',
    answer:
      'We search hotels via Trivago, Booking.com, and Agoda, plus Airbnb and similar platforms for apartment and villa options. You can set preferences for hotel class, amenities, or accommodation type in your search.',
  },
  {
    question: 'Can I set a budget limit?',
    answer:
      'Absolutely. Tell us your total budget or per-night accommodation limit, and our AI will only surface options that fit within your range. The Smart Package plan also includes budget optimization to stretch your money further.',
  },
  {
    question: 'How do you handle multi-city trips?',
    answer:
      'The Smart Package and Concierge plans support multi-city routing. Tell us your cities and preferred order, and we will find the optimal flight path, layovers, and accommodations for each stop.',
  },
  {
    question: 'What if prices change after I receive my package?',
    answer:
      'Flight and hotel prices fluctuate constantly. Smart Package includes 30-day price drop alerts — if a better deal appears, we notify you immediately. Concierge plan goes further: your planner will rebook automatically if prices drop.',
  },
  {
    question: 'Do you book for me or just find deals?',
    answer:
      'Currently, Travel Baby finds and recommends the best deals with direct booking links. You book directly with the airline or hotel at the price we found. We are working on one-click booking for a future release.',
  },
  {
    question: 'What information do I need to provide?',
    answer:
      'At minimum: your travel dates and destination (or "surprise me" for deal-based suggestions). For better results, also share your budget, number of travelers, accommodation preferences, and trip style (adventure, relaxation, cultural, etc.).',
  },
  {
    question: 'How long does it take to get my package?',
    answer:
      'Quick Search delivers results in about 60 seconds. Smart Package results arrive in about 30 seconds with more options. Concierge packages are curated by a human planner and delivered within 4 hours.',
  },
  {
    question: 'Can I customize the package after receiving it?',
    answer:
      'Yes. Every package is a recommendation, not a locked booking. Swap out flights, change hotels, adjust dates — the package is your starting point. Concierge users can request unlimited revisions from their planner.',
  },
  {
    question: 'Do you offer group and family packages?',
    answer:
      'Yes. All plans support multiple travelers. The Smart Package optimizes for group bookings, and the Concierge plan specializes in complex family and group itineraries with coordinated flights and adjacent rooms.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'You pay the airlines and hotels directly using whatever payment methods they accept. For Travel Baby plan subscriptions (Smart Package and Concierge), we accept all major credit cards and UPI.',
  },
] as const

export const CTA_CONTENT = {
  heading: 'Stop Overpaying for Travel',
  subtext:
    'Let AI find your perfect trip at the best price. Flights, hotels, and everything in between — one search, one package.',
  buttonLabel: 'Plan My Trip',
  buttonHref: '/plan-my-trip',
} as const
