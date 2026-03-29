export const ALL_FAQ_ITEMS_QUERY = /* groq */ `
  *[_type == "faqItem"] | order(sortOrder asc) {
    _id,
    question,
    answer,
    category
  }
`

export const FAQ_BY_CATEGORY_QUERY = /* groq */ `
  *[_type == "faqItem" && category == $category] | order(sortOrder asc) {
    _id,
    question,
    answer,
    category
  }
`
