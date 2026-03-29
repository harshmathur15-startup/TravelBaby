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
`
