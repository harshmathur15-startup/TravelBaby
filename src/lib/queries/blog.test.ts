import { describe, it, expect } from 'vitest'
import {
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  ALL_BLOG_SLUGS_QUERY,
  RELATED_BLOG_POSTS_QUERY,
} from './blog'

describe('ALL_BLOG_POSTS_QUERY', () => {
  it('should filter by blogPost type with publish date check', () => {
    expect(ALL_BLOG_POSTS_QUERY).toContain('_type == "blogPost"')
    expect(ALL_BLOG_POSTS_QUERY).toContain('publishedAt <= now()')
  })

  it('should order by publishedAt descending', () => {
    expect(ALL_BLOG_POSTS_QUERY).toContain('order(publishedAt desc)')
  })

  it('should dereference author', () => {
    expect(ALL_BLOG_POSTS_QUERY).toContain('author->')
  })
})

describe('BLOG_POST_BY_SLUG_QUERY', () => {
  it('should filter by slug parameter', () => {
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('slug.current == $slug')
  })

  it('should select as singleton with [0]', () => {
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('[0]')
  })

  it('should project body with image asset dereferencing', () => {
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('body[]')
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('asset->')
  })

  it('should include SEO fields', () => {
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('seo')
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('metaTitle')
    expect(BLOG_POST_BY_SLUG_QUERY).toContain('metaDescription')
  })
})

describe('ALL_BLOG_SLUGS_QUERY', () => {
  it('should filter for posts with defined slugs', () => {
    expect(ALL_BLOG_SLUGS_QUERY).toContain('defined(slug.current)')
  })

  it('should project slug as string', () => {
    expect(ALL_BLOG_SLUGS_QUERY).toContain('"slug": slug.current')
  })
})

describe('RELATED_BLOG_POSTS_QUERY', () => {
  it('should exclude current post by slug', () => {
    expect(RELATED_BLOG_POSTS_QUERY).toContain('$currentSlug')
  })

  it('should match by shared categories', () => {
    expect(RELATED_BLOG_POSTS_QUERY).toContain('$categories')
  })

  it('should limit to 3 results', () => {
    expect(RELATED_BLOG_POSTS_QUERY).toContain('[0...3]')
  })
})
