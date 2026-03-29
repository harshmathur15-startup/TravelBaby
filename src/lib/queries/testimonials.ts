export const ALL_TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial"] | order(sortOrder asc) {
    _id,
    quote,
    name,
    role,
    company,
    avatar { ..., asset-> }
  }
`
