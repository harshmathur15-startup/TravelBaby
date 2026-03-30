import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the sanity client — default to null (CMS unavailable)
const mockFetch = vi.fn()
vi.mock('./sanity', () => ({
  sanityClient: null,
}))

vi.mock('./queries', () => ({
  ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
  BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
}))

import {
  getAllPosts,
  getPostBySlug,
  getAllSlugs,
  getAllCategories,
  getPostsByCategory,
} from './blog-data'
import type { BlogPost } from './blog-data'

describe('blog-data (CMS unavailable — static fallback)', () => {
  describe('getAllPosts', () => {
    it('should return an array of static blog posts', async () => {
      const posts = await getAllPosts()
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
    })

    it('should return posts with required fields', async () => {
      const posts = await getAllPosts()
      for (const post of posts) {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('description')
        expect(post).toHaveProperty('category')
        expect(post).toHaveProperty('author')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('readTime')
        expect(post).toHaveProperty('image')
        expect(post).toHaveProperty('content')
      }
    })
  })

  describe('getPostBySlug', () => {
    it('should return a post for a known slug', async () => {
      const post = await getPostBySlug('building-design-system')
      expect(post).toBeDefined()
      expect(post?.slug).toBe('building-design-system')
      expect(post?.title).toBe('Building a Design System from Scratch')
    })

    it('should return undefined for an unknown slug', async () => {
      const post = await getPostBySlug('nonexistent-post')
      expect(post).toBeUndefined()
    })

    it('should return undefined for an empty slug', async () => {
      const post = await getPostBySlug('')
      expect(post).toBeUndefined()
    })
  })

  describe('getAllSlugs', () => {
    it('should return an array of slug strings', async () => {
      const slugs = await getAllSlugs()
      expect(Array.isArray(slugs)).toBe(true)
      expect(slugs.length).toBeGreaterThan(0)
      for (const slug of slugs) {
        expect(typeof slug).toBe('string')
      }
    })

    it('should include known static slugs', async () => {
      const slugs = await getAllSlugs()
      expect(slugs).toContain('building-design-system')
      expect(slugs).toContain('seo-best-practices-2025')
    })
  })

  describe('getAllCategories', () => {
    it('should return sorted unique categories', async () => {
      const categories = await getAllCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
      // Verify sorted
      const sorted = [...categories].sort()
      expect(categories).toEqual(sorted)
      // Verify unique
      const unique = [...new Set(categories)]
      expect(categories).toEqual(unique)
    })

    it('should include known categories from static data', async () => {
      const categories = await getAllCategories()
      expect(categories).toContain('Design')
      expect(categories).toContain('Development')
      expect(categories).toContain('Tutorial')
    })
  })

  describe('getPostsByCategory', () => {
    it('should return only posts matching the category', async () => {
      const posts = await getPostsByCategory('Design')
      expect(posts.length).toBeGreaterThan(0)
      for (const post of posts) {
        expect(post.category.toLowerCase()).toBe('design')
      }
    })

    it('should be case-insensitive', async () => {
      const upper = await getPostsByCategory('DESIGN')
      const lower = await getPostsByCategory('design')
      const mixed = await getPostsByCategory('Design')
      expect(upper.length).toBe(lower.length)
      expect(upper.length).toBe(mixed.length)
    })

    it('should return an empty array for a nonexistent category', async () => {
      const posts = await getPostsByCategory('Nonexistent')
      expect(posts).toEqual([])
    })
  })
})

describe('blog-data (CMS available)', () => {
  const makeSanityPost = (overrides: Record<string, unknown> = {}) => ({
    _id: 'post-1',
    title: 'CMS Post Title',
    slug: { current: 'cms-post' },
    excerpt: 'A CMS excerpt',
    coverImage: { asset: { url: 'https://cdn.sanity.io/images/test.jpg' } },
    publishedAt: '2025-04-01',
    categories: ['Tech'],
    author: { name: 'CMS Author' },
    body: [
      { _type: 'block', style: 'h2', children: [{ text: 'Heading' }] },
      {
        _type: 'block',
        children: [{ text: 'Paragraph text here with enough words to test read time estimation' }],
      },
    ],
    ...overrides,
  })

  beforeEach(() => {
    vi.resetModules()
    mockFetch.mockReset()
  })

  it('should map Sanity posts when CMS returns data', async () => {
    const sanityPost = makeSanityPost()

    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue([sanityPost])

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    expect(posts.length).toBe(1)
    expect(posts[0].slug).toBe('cms-post')
    expect(posts[0].title).toBe('CMS Post Title')
    expect(posts[0].category).toBe('Tech')
    expect(posts[0].author).toBe('CMS Author')
    expect(posts[0].image).toBe('https://cdn.sanity.io/images/test.jpg')
  })

  it('should fall back to static data when CMS fetch throws', async () => {
    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockRejectedValue(new Error('Network error'))

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    // Should fall back to static posts
    expect(posts.length).toBeGreaterThan(0)
    expect(posts[0].slug).toBe('building-design-system')
  })

  it('should fall back to static when CMS returns empty array', async () => {
    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue([])

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
  })

  it('should map post with missing optional fields using defaults', async () => {
    const minimalPost = makeSanityPost({
      coverImage: undefined,
      categories: undefined,
      author: undefined,
      body: undefined,
    })

    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue([minimalPost])

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    expect(posts[0].category).toBe('General')
    expect(posts[0].author).toBe('Team')
    expect(posts[0].image).toBe('')
    expect(posts[0].content).toBe('')
    expect(posts[0].readTime).toBe('1 min read')
  })

  it('should return a single post by slug from CMS', async () => {
    const sanityPost = makeSanityPost()

    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue(sanityPost)

    const mod = await import('./blog-data')
    const post = await mod.getPostBySlug('cms-post')
    expect(post).toBeDefined()
    expect(post?.slug).toBe('cms-post')
  })

  it('should fall back to static data when getPostBySlug CMS returns null', async () => {
    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue(null)

    const mod = await import('./blog-data')
    const post = await mod.getPostBySlug('building-design-system')
    expect(post).toBeDefined()
    expect(post?.slug).toBe('building-design-system')
  })

  it('should generate correct read time estimate', async () => {
    // 400 words = 2 min read (400/200 = 2)
    const longBody = Array(400).fill('word').join(' ')
    const sanityPost = makeSanityPost({
      body: [{ _type: 'block', children: [{ text: longBody }] }],
    })

    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue([sanityPost])

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    expect(posts[0].readTime).toBe('2 min read')
  })

  it('should convert portable text blocks to HTML', async () => {
    const sanityPost = makeSanityPost({
      body: [
        { _type: 'block', style: 'h2', children: [{ text: 'Heading Two' }] },
        { _type: 'block', style: 'h3', children: [{ text: 'Heading Three' }] },
        { _type: 'block', children: [{ text: 'A paragraph.' }] },
        { _type: 'image', children: [] }, // non-block type should be filtered out
      ],
    })

    vi.doMock('./sanity', () => ({
      sanityClient: { fetch: mockFetch },
    }))
    vi.doMock('./queries', () => ({
      ALL_BLOG_POSTS_QUERY: 'mock-all-posts-query',
      BLOG_POST_BY_SLUG_QUERY: 'mock-post-by-slug-query',
    }))

    mockFetch.mockResolvedValue([sanityPost])

    const mod = await import('./blog-data')
    const posts = await mod.getAllPosts()
    expect(posts[0].content).toContain('<h2>Heading Two</h2>')
    expect(posts[0].content).toContain('<h3>Heading Three</h3>')
    expect(posts[0].content).toContain('<p>A paragraph.</p>')
    expect(posts[0].content).not.toContain('image')
  })
})
