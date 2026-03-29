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
`

export const ALL_PAGE_SLUGS_QUERY = /* groq */ `
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current
  }
`
