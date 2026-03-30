import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock satori
vi.mock('satori', () => ({
  default: vi.fn().mockResolvedValue('<svg>mock</svg>'),
}))

// Mock resvg with a real class
vi.mock('@resvg/resvg-js', () => {
  return {
    Resvg: class Resvg {
      svg: string
      options: unknown
      constructor(svg: string, options: unknown) {
        this.svg = svg
        this.options = options
      }
      render() {
        return { asPng: () => new Uint8Array([137, 80, 78, 71]) }
      }
    },
  }
})

// Mock global fetch for font loading
const mockArrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(100))
const mockFetchFn = vi.fn().mockResolvedValue({ arrayBuffer: mockArrayBuffer })
vi.stubGlobal('fetch', mockFetchFn)

import { generateOgImage } from './og-image'
import satori from 'satori'

describe('generateOgImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockArrayBuffer.mockResolvedValue(new ArrayBuffer(100))
    mockFetchFn.mockResolvedValue({ arrayBuffer: mockArrayBuffer })
  })

  it('should return a Buffer', async () => {
    const result = await generateOgImage('Test Title')
    expect(Buffer.isBuffer(result)).toBe(true)
  })

  it('should call satori with the title', async () => {
    await generateOgImage('My Page Title')
    expect(satori).toHaveBeenCalled()
    const call = vi.mocked(satori).mock.calls[0]
    const rootNode = call[0] as { props: { children: Array<{ props: { children: string } }> } }
    const titleNode = rootNode.props.children[0]
    expect(titleNode.props.children).toBe('My Page Title')
  })

  it('should include description when provided', async () => {
    await generateOgImage('Title', 'A description')
    expect(satori).toHaveBeenCalled()
    const call = vi.mocked(satori).mock.calls[0]
    const rootNode = call[0] as {
      props: { children: Array<{ props: { children: string } } | null> }
    }
    const children = rootNode.props.children.filter(Boolean)
    expect(children.length).toBe(2)
  })

  it('should omit description node when not provided', async () => {
    await generateOgImage('Title Only')
    expect(satori).toHaveBeenCalled()
    const call = vi.mocked(satori).mock.calls[0]
    const rootNode = call[0] as {
      props: { children: Array<{ props: { children: string } } | null> }
    }
    const children = rootNode.props.children.filter(Boolean)
    expect(children.length).toBe(1)
  })

  it('should use 1200x630 dimensions', async () => {
    await generateOgImage('Title')
    const call = vi.mocked(satori).mock.calls[0]
    const options = call[1] as { width: number; height: number }
    expect(options.width).toBe(1200)
    expect(options.height).toBe(630)
  })

  it('should configure Inter font at weight 600', async () => {
    await generateOgImage('Title')
    const call = vi.mocked(satori).mock.calls[0]
    const options = call[1] as { fonts: Array<{ name: string; weight: number; style: string }> }
    expect(options.fonts).toHaveLength(1)
    expect(options.fonts[0].name).toBe('Inter')
    expect(options.fonts[0].weight).toBe(600)
    expect(options.fonts[0].style).toBe('normal')
  })

  it('should fetch the font and cache it across calls', async () => {
    vi.resetModules()
    vi.mock('satori', () => ({
      default: vi.fn().mockResolvedValue('<svg>mock</svg>'),
    }))
    vi.mock('@resvg/resvg-js', () => ({
      Resvg: class Resvg {
        render() {
          return { asPng: () => new Uint8Array([1]) }
        }
      },
    }))
    const localFetch = vi
      .fn()
      .mockResolvedValue({ arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(50)) })
    vi.stubGlobal('fetch', localFetch)

    const mod = await import('./og-image')
    await mod.generateOgImage('First Call')
    expect(localFetch).toHaveBeenCalledTimes(1)
    const url = localFetch.mock.calls[0][0] as string
    expect(url).toContain('inter')

    // Second call should not fetch again (cached)
    await mod.generateOgImage('Second Call')
    expect(localFetch).toHaveBeenCalledTimes(1)
  })
})
