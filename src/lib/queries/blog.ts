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
`

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
`

export const ALL_BLOG_SLUGS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`

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
`
