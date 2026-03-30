/**
 * Sanity Seed Script — creates minimal demo content for new clones.
 * Idempotent: checks if documents exist before creating.
 * Requires SANITY_WRITE_TOKEN in .env (not the CDN read token).
 *
 * Run: npm run sanity:seed
 */

const { createClient } = require('@sanity/client')

const projectId = process.env.SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_WRITE_TOKEN is required. Set it in .env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-03-01',
  useCdn: false,
})

async function seedIfMissing(docId, doc) {
  const existing = await client.getDocument(docId)
  if (existing) {
    console.log(`  [skip] ${docId} already exists`)
    return false
  }
  await client.createOrReplace({ _id: docId, ...doc })
  console.log(`  [created] ${docId}`)
  return true
}

async function main() {
  let created = 0
  let skipped = 0

  function track(wasCreated) {
    if (wasCreated) created++
    else skipped++
  }

  console.log('\n--- Sanity Seed ---\n')

  // 1. Site Settings (singleton)
  console.log('Site Settings:')
  track(
    await seedIfMissing('siteSettings', {
      _type: 'siteSettings',
      companyName: 'Acme Inc',
      tagline: 'Your tagline here',
      contactEmail: 'hello@example.com',
      socialLinks: {
        twitter: 'https://x.com/example',
        linkedin: 'https://linkedin.com/company/example',
      },
    }),
  )

  // 2. Pricing Plans (3 tiers)
  console.log('Pricing Plans:')
  const plans = [
    {
      _id: 'seed-pricing-starter',
      name: 'Starter',
      slug: { _type: 'slug', current: 'starter' },
      monthlyPrice: 9,
      annualPrice: 7.5,
      description: 'Everything you need to get started.',
      features: [
        'Core features',
        'Up to 5 users',
        'Basic analytics',
        'Email support',
      ],
      isPopular: false,
      ctaText: 'Get Started',
      sortOrder: 1,
    },
    {
      _id: 'seed-pricing-professional',
      name: 'Professional',
      slug: { _type: 'slug', current: 'professional' },
      monthlyPrice: 29,
      annualPrice: 24,
      description: 'For growing teams that need more power.',
      features: [
        'Everything in Starter',
        'Up to 25 users',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
      isPopular: true,
      ctaText: 'Get Started',
      sortOrder: 2,
    },
    {
      _id: 'seed-pricing-enterprise',
      name: 'Enterprise',
      slug: { _type: 'slug', current: 'enterprise' },
      monthlyPrice: 99,
      annualPrice: 82.5,
      description: 'For large organizations with advanced needs.',
      features: [
        'Everything in Professional',
        'Unlimited users',
        'Custom reporting',
        'Dedicated account manager',
        'SLA guarantees',
        'SSO & advanced security',
      ],
      isPopular: false,
      ctaText: 'Contact Sales',
      sortOrder: 3,
    },
  ]
  for (const plan of plans) {
    const id = plan._id
    delete plan._id
    track(await seedIfMissing(id, { _type: 'pricingPlan', ...plan }))
  }

  // 3. FAQ Items (4)
  console.log('FAQ Items:')
  const faqs = [
    { question: 'How do I get started?', answer: 'Sign up for an account and follow the onboarding guide. You will be up and running in minutes.', category: 'general' },
    { question: 'Can I switch plans later?', answer: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.', category: 'pricing' },
    { question: 'Do you offer annual billing?', answer: 'Yes. Annual billing saves you approximately two months compared to monthly billing.', category: 'pricing' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and bank transfers.', category: 'pricing' },
  ]
  for (let i = 0; i < faqs.length; i++) {
    track(
      await seedIfMissing(`seed-faq-${i + 1}`, {
        _type: 'faqItem',
        ...faqs[i],
        sortOrder: i + 1,
      }),
    )
  }

  // 4. Testimonials (3)
  console.log('Testimonials:')
  const testimonials = [
    { name: 'Alex Johnson', role: 'CEO', company: 'TechCorp', quote: 'This product transformed how we work. Setup took minutes and the results were immediate.', rating: 5 },
    { name: 'Maria Garcia', role: 'Head of Operations', company: 'StartupCo', quote: 'The best tool we have adopted this year. Simple, powerful, and reliable.', rating: 5 },
    { name: 'David Kim', role: 'Founder', company: 'InnovateLab', quote: 'Finally, a product that does what it promises without the complexity.', rating: 5 },
  ]
  for (let i = 0; i < testimonials.length; i++) {
    track(
      await seedIfMissing(`seed-testimonial-${i + 1}`, {
        _type: 'testimonial',
        ...testimonials[i],
        sortOrder: i + 1,
      }),
    )
  }

  // 5. Author (1)
  console.log('Authors:')
  track(
    await seedIfMissing('seed-author-1', {
      _type: 'author',
      name: 'Editorial Team',
      slug: { _type: 'slug', current: 'editorial-team' },
      bio: 'The editorial team writes about product updates, best practices, and industry insights.',
      role: 'Content Team',
    }),
  )

  // 6. Blog Post (1 sample)
  console.log('Blog Posts:')
  track(
    await seedIfMissing('seed-blog-1', {
      _type: 'blogPost',
      title: 'Getting Started Guide',
      slug: { _type: 'slug', current: 'getting-started' },
      author: { _type: 'reference', _ref: 'seed-author-1' },
      publishedAt: '2026-01-01T00:00:00Z',
      excerpt: 'Learn how to set up your account and start using the platform in under 10 minutes.',
      categories: ['getting-started', 'guides'],
      body: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Welcome to the platform. This guide walks you through account setup, team invitations, and your first project.',
              marks: [],
            },
          ],
        },
      ],
    }),
  )

  // 7. Page (homepage)
  console.log('Pages:')
  track(
    await seedIfMissing('seed-page-home', {
      _type: 'page',
      title: 'Home',
      slug: { _type: 'slug', current: 'home' },
      sections: [
        {
          _type: 'hero',
          _key: 'section-hero',
          headline: 'Build Something Great',
          subtext: 'The modern platform for teams that move fast. Simple to start, powerful to scale.',
          ctaText: 'Get Started Free',
          ctaLink: '/pricing',
          secondaryCtaText: 'See Features',
          secondaryCtaLink: '/features',
          trustLine: 'Trusted by thousands of teams worldwide',
        },
        {
          _type: 'featureGrid',
          _key: 'section-features',
          heading: 'Everything You Need',
          features: [
            { _key: 'f1', icon: 'zap', title: 'Fast Setup', description: 'Get started in minutes, not days.' },
            { _key: 'f2', icon: 'shield', title: 'Secure', description: 'Enterprise-grade security built in.' },
            { _key: 'f3', icon: 'bar-chart', title: 'Analytics', description: 'Insights that drive decisions.' },
            { _key: 'f4', icon: 'users', title: 'Team Ready', description: 'Collaboration tools for every team size.' },
          ],
        },
        {
          _type: 'ctaBlock',
          _key: 'section-cta',
          heading: 'Ready to Get Started?',
          body: 'Join thousands of teams already using the platform.',
          buttonText: 'Start Free Trial',
          buttonLink: '/pricing',
        },
      ],
      seo: {
        metaTitle: 'Acme Inc — Build Something Great',
        metaDescription: 'The modern platform for teams that move fast. Simple to start, powerful to scale.',
      },
    }),
  )

  // 8. Rich Text Pages (Terms & Privacy)
  console.log('Rich Text Pages:')
  track(
    await seedIfMissing('seed-terms', {
      _type: 'richTextPage',
      title: 'Terms of Service',
      slug: { _type: 'slug', current: 'terms' },
      lastUpdated: '2026-01-01',
      body: [
        { _type: 'block', _key: 't1', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 'ts1', text: 'Agreement to Terms', marks: [] }] },
        { _type: 'block', _key: 't2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ts2', text: 'By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.', marks: [] }] },
        { _type: 'block', _key: 't3', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 'ts3', text: 'Use License', marks: [] }] },
        { _type: 'block', _key: 't4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ts4', text: 'Permission is granted to temporarily access this website for personal, non-commercial transitory viewing only.', marks: [] }] },
      ],
      seo: { metaTitle: 'Terms of Service', metaDescription: 'Read our Terms of Service governing use of the platform.' },
    }),
  )
  track(
    await seedIfMissing('seed-privacy', {
      _type: 'richTextPage',
      title: 'Privacy Policy',
      slug: { _type: 'slug', current: 'privacy' },
      lastUpdated: '2026-01-01',
      body: [
        { _type: 'block', _key: 'p1', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 'ps1', text: 'Information We Collect', marks: [] }] },
        { _type: 'block', _key: 'p2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ps2', text: 'We collect information you provide directly, such as your name, email address, and company details when you create an account.', marks: [] }] },
        { _type: 'block', _key: 'p3', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 'ps3', text: 'How We Use Your Information', marks: [] }] },
        { _type: 'block', _key: 'p4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 'ps4', text: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.', marks: [] }] },
      ],
      seo: { metaTitle: 'Privacy Policy', metaDescription: 'Learn how we collect, use, and protect your personal information.' },
    }),
  )

  console.log(`\n--- Done: ${created} created, ${skipped} skipped ---\n`)
}

main().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
