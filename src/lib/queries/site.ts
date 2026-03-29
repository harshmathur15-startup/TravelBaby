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
`
