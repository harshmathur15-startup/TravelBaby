import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@sanity/client', () => ({
  createClient: vi.fn(() => ({
    fetch: vi.fn(),
  })),
}))

vi.mock('@sanity/image-url', () => ({
  default: () => ({
    image: (source: unknown) => ({ url: () => `https://cdn.sanity.io/${source}` }),
  }),
}))

describe('sanityClient', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should be null when SANITY_PROJECT_ID is missing', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', '')
    const { sanityClient } = await import('./sanity')
    expect(sanityClient).toBeNull()
    vi.unstubAllEnvs()
  })

  it('should be a client instance when SANITY_PROJECT_ID is set', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', 'test-project')
    const { sanityClient } = await import('./sanity')
    expect(sanityClient).not.toBeNull()
    expect(sanityClient).toHaveProperty('fetch')
    vi.unstubAllEnvs()
  })
})

describe('urlFor', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should be a function', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', 'test-project')
    const { urlFor } = await import('./sanity')
    expect(typeof urlFor).toBe('function')
    vi.unstubAllEnvs()
  })

  it('should throw when sanityClient is null', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', '')
    const { urlFor } = await import('./sanity')
    expect(() => urlFor('some-image')).toThrow('Sanity client not configured')
    vi.unstubAllEnvs()
  })
})
