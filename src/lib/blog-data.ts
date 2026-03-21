export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export const POSTS: Record<string, BlogPost> = {
  'building-design-system': {
    slug: 'building-design-system',
    title: 'Building a Design System from Scratch',
    description:
      'Learn how to create a scalable design system with tokens, components, and documentation that keeps your team aligned.',
    category: 'Design',
    author: 'Maria Garcia',
    date: '2025-03-15',
    readTime: '8 min read',
    image: '/blog/design-system.svg',
    content: `
      <p>A design system is more than a component library. It is the single source of truth for how your product looks and feels across every screen.</p>

      <h2>Why Build One?</h2>
      <p>Without a design system, teams end up with inconsistent spacing, mismatched colors, and duplicated components. Every new feature becomes a guessing game. A design system solves this by codifying decisions into reusable tokens and components.</p>

      <h2>Start with Tokens</h2>
      <p>Design tokens are the atomic values of your system: colors, spacing, typography, shadows, and border radii. Define them as CSS custom properties or a JSON file that feeds into your build tooling.</p>

      <h2>Build Components on Top</h2>
      <p>Once tokens are in place, build your component library. Start with the basics — buttons, inputs, cards, badges — and expand as your product grows. Each component should accept variants and sizes through props, not custom CSS.</p>

      <h2>Document Everything</h2>
      <p>A design system nobody knows about is a design system nobody uses. Set up a living documentation site (Storybook, Docusaurus, or a custom Astro site) that shows every component, its props, and usage guidelines.</p>
    `,
  },
  'seo-best-practices-2025': {
    slug: 'seo-best-practices-2025',
    title: 'SEO Best Practices for Modern Websites',
    description:
      'A practical guide to technical SEO, content structure, and performance optimizations that actually move the needle.',
    category: 'Development',
    author: 'Alex Johnson',
    date: '2025-03-10',
    readTime: '6 min read',
    image: '/blog/seo.svg',
    content: `
      <p>Search engine optimization is not a dark art. It is a set of engineering and content practices that help search engines understand, crawl, and rank your pages.</p>

      <h2>Technical Foundations</h2>
      <p>Start with the basics: semantic HTML, proper heading hierarchy, meta descriptions, and Open Graph tags. Use a sitemap and robots.txt. Make sure your site loads fast — Core Web Vitals are a ranking factor.</p>

      <h2>Content Structure</h2>
      <p>Every page should have a single H1, logical heading nesting, and descriptive alt text on images. Internal linking helps search engines discover your content and understand relationships between pages.</p>

      <h2>Performance Matters</h2>
      <p>A slow site loses visitors and rankings. Compress images, lazy-load below-the-fold content, minimize JavaScript, and use a CDN. Aim for a Lighthouse performance score above 90.</p>

      <h2>Measure and Iterate</h2>
      <p>Use Google Search Console and analytics to track impressions, click-through rates, and rankings. SEO is a long game — make small, consistent improvements and measure their impact over weeks, not days.</p>
    `,
  },
  'getting-started-with-astro': {
    slug: 'getting-started-with-astro',
    title: 'Getting Started with Astro: A Practical Guide',
    description:
      'Everything you need to know to build your first Astro site, from project setup to deployment.',
    category: 'Tutorial',
    author: 'David Lee',
    date: '2025-03-05',
    readTime: '10 min read',
    image: '/blog/astro-guide.svg',
    content: `
      <p>Astro is a modern static site generator that ships zero JavaScript by default. It is perfect for content-driven sites, marketing pages, and documentation.</p>

      <h2>Project Setup</h2>
      <p>Run <code>npm create astro@latest</code> to scaffold a new project. Choose a starter template or start from scratch. The project structure is straightforward: pages in <code>src/pages/</code>, layouts in <code>src/layouts/</code>, and components in <code>src/components/</code>.</p>

      <h2>Pages and Routing</h2>
      <p>Astro uses file-based routing. Create a file at <code>src/pages/about.astro</code> and it is available at <code>/about</code>. Dynamic routes use bracket syntax: <code>[slug].astro</code>.</p>

      <h2>Components</h2>
      <p>Astro components use a frontmatter script block (fenced with ---) for logic and a template section for HTML. You can also use React, Vue, Svelte, or Solid components alongside Astro components.</p>

      <h2>Deployment</h2>
      <p>Build your site with <code>npm run build</code> and deploy the <code>dist/</code> folder to any static host: Vercel, Netlify, Cloudflare Pages, or a simple S3 bucket. Astro also supports SSR if you need server-side rendering.</p>
    `,
  },
};

export const POSTS_LIST: BlogPost[] = Object.values(POSTS);

// Additional posts shown on the listing page (no detail page content needed)
const LISTING_ONLY_POSTS: BlogPost[] = [
  {
    slug: 'responsive-layouts-guide',
    title: 'Responsive Layouts Without the Headaches',
    description: 'Modern CSS techniques for building layouts that look great on every screen size.',
    category: 'Design',
    author: 'Sarah Chen',
    date: '2025-02-28',
    readTime: '7 min read',
    image: '/blog/responsive.svg',
    content: `
      <p>Responsive design does not have to be painful. Modern CSS gives us tools like container queries, clamp(), and subgrid that make fluid layouts straightforward.</p>

      <h2>Start Mobile-First</h2>
      <p>Write your base styles for the smallest screen, then add complexity with min-width media queries. This keeps your CSS lean and your mobile experience fast.</p>

      <h2>Use CSS Grid for Page Layouts</h2>
      <p>CSS Grid handles two-dimensional layouts better than flexbox. Define your grid template on the parent and let items flow naturally. Use auto-fit and minmax() for responsive grids without media queries.</p>

      <h2>Typography That Scales</h2>
      <p>Use clamp() for fluid typography that scales smoothly between viewport sizes. No more breakpoint-specific font sizes — one declaration covers the full range.</p>
    `,
  },
  {
    slug: 'cms-integration-tips',
    title: 'CMS Integration Tips for Static Sites',
    description: 'How to connect a headless CMS to your static site generator for the best of both worlds.',
    category: 'Development',
    author: 'James Wilson',
    date: '2025-02-20',
    readTime: '5 min read',
    image: '/blog/cms.svg',
    content: `
      <p>A headless CMS separates content management from presentation. Your marketing team edits in a visual studio while your site stays fast and static.</p>

      <h2>Choosing a CMS</h2>
      <p>Consider your team size, content complexity, and budget. Sanity offers real-time collaboration and a flexible schema. Contentful and Strapi are solid alternatives with different trade-offs.</p>

      <h2>Schema Design</h2>
      <p>Design your schemas around content types, not pages. A "hero" object type can be reused across landing pages, blog posts, and campaigns. Think in building blocks.</p>

      <h2>Preview and Drafts</h2>
      <p>Set up preview mode so editors can see changes before publishing. Most headless CMS platforms support draft/published states that map cleanly to static generation.</p>
    `,
  },
  {
    slug: 'web-performance-checklist',
    title: 'The Web Performance Checklist',
    description: 'A step-by-step checklist to audit and improve your site speed, Core Web Vitals, and user experience.',
    category: 'Tutorial',
    author: 'Alex Johnson',
    date: '2025-02-15',
    readTime: '9 min read',
    image: '/blog/performance.svg',
    content: `
      <p>Performance is not an optimization — it is a feature. Slow sites lose visitors, rankings, and revenue. Here is a checklist to audit and improve your site.</p>

      <h2>Measure First</h2>
      <p>Run Lighthouse, WebPageTest, and check Core Web Vitals in Search Console. Identify your worst metrics before making changes. Profile, do not guess.</p>

      <h2>Reduce JavaScript</h2>
      <p>Ship less JavaScript. Use static rendering where possible. Lazy-load components that are not visible on initial load. Tree-shake your imports.</p>

      <h2>Optimize Images</h2>
      <p>Use modern formats (WebP, AVIF), lazy-load below-the-fold images, and serve responsive sizes with srcset. Images are typically the largest payload on any page.</p>

      <h2>Cache and CDN</h2>
      <p>Set proper cache headers. Use a CDN for static assets. Preconnect to third-party origins. Every millisecond of network latency adds up.</p>
    `,
  },
];

// Merge for listing page and detail page routing
for (const post of LISTING_ONLY_POSTS) {
  POSTS[post.slug] = post;
}

export const RELATED_POSTS: BlogPost[] = Object.values(POSTS);
