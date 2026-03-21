/**
 * GROQ query helpers for fetching Sanity content in Astro pages.
 * Import { sanityClient } from './sanity' and pass these queries to client.fetch().
 */

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    companyName,
    logo,
    logoDark,
    tagline,
    navLinks[] { label, href },
    socialLinks,
    footerText,
    defaultSeo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// ---------------------------------------------------------------------------
// Pages (page builder)
// ---------------------------------------------------------------------------

export const PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    slug,
    sections[] {
      _type,
      _key,
      ...,
      backgroundImage { ..., asset-> },
      "logos": logos[] { ..., image { ..., asset-> } }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage { ..., asset-> }
    }
  }
`;

export const ALL_PAGE_SLUGS_QUERY = /* groq */ `
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ---------------------------------------------------------------------------
// Pricing Plans
// ---------------------------------------------------------------------------

export const ALL_PRICING_PLANS_QUERY = /* groq */ `
  *[_type == "pricingPlan"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    monthlyPrice,
    annualPrice,
    description,
    features,
    isPopular,
    ctaText,
    ctaLink
  }
`;

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export const ALL_BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage { ..., asset-> },
    publishedAt,
    categories,
    author-> { name, slug, image { ..., asset-> } }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage { ..., asset-> },
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    },
    publishedAt,
    categories,
    author-> { name, slug, image { ..., asset-> }, bio, role },
    seo {
      metaTitle,
      metaDescription,
      ogImage { ..., asset-> }
    }
  }
`;

export const ALL_BLOG_SLUGS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const RELATED_BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current != $currentSlug && publishedAt <= now()
    && count(categories[@ in $categories]) > 0
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage { ..., asset-> },
    publishedAt,
    categories
  }
`;

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const ALL_TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial"] | order(sortOrder asc) {
    _id,
    quote,
    name,
    role,
    company,
    avatar { ..., asset-> }
  }
`;

// ---------------------------------------------------------------------------
// FAQ Items
// ---------------------------------------------------------------------------

export const ALL_FAQ_ITEMS_QUERY = /* groq */ `
  *[_type == "faqItem"] | order(sortOrder asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const FAQ_BY_CATEGORY_QUERY = /* groq */ `
  *[_type == "faqItem" && category == $category] | order(sortOrder asc) {
    _id,
    question,
    answer,
    category
  }
`;
