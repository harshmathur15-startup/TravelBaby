/**
 * GROQ queries — Product Pages
 */

export const ALL_PRODUCT_PAGES_QUERY = /* groq */ `
  *[_type == "productPage"] | order(sortOrder asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    heroDescription,
    metaTitle,
    metaDescription,
    features[] {
      title,
      description,
      icon
    },
    benefits[] {
      stat,
      label,
      description
    },
    useCases[] {
      title,
      problem,
      solution
    },
    faq[] {
      question,
      answer
    },
    modules[] {
      title,
      description
    },
    sortOrder
  }
`

export const PRODUCT_PAGE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "productPage" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    heroDescription,
    metaTitle,
    metaDescription,
    features[] {
      title,
      description,
      icon
    },
    benefits[] {
      stat,
      label,
      description
    },
    useCases[] {
      title,
      problem,
      solution
    },
    faq[] {
      question,
      answer
    },
    modules[] {
      title,
      description
    },
    sortOrder
  }
`
