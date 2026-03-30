import { describe, it, expect } from 'vitest'
import { portableTextToPlainText } from './portable-text-utils'

describe('portableTextToPlainText', () => {
  it('should return empty string for empty array', () => {
    expect(portableTextToPlainText([])).toBe('')
  })

  it('should return empty string for undefined-like input', () => {
    expect(portableTextToPlainText(undefined as never)).toBe('')
    expect(portableTextToPlainText(null as never)).toBe('')
  })

  it('should extract text from a single block with one span', () => {
    const blocks = [{ _type: 'block', children: [{ _type: 'span', text: 'Hello world' }] }]
    expect(portableTextToPlainText(blocks)).toBe('Hello world')
  })

  it('should concatenate multiple spans in one block', () => {
    const blocks = [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Hello ' },
          { _type: 'span', text: 'world' },
        ],
      },
    ]
    expect(portableTextToPlainText(blocks)).toBe('Hello world')
  })

  it('should join multiple blocks with double newline', () => {
    const blocks = [
      { _type: 'block', children: [{ _type: 'span', text: 'First paragraph' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Second paragraph' }] },
    ]
    expect(portableTextToPlainText(blocks)).toBe('First paragraph\n\nSecond paragraph')
  })

  it('should ignore non-block type items', () => {
    const blocks = [
      { _type: 'block', children: [{ _type: 'span', text: 'Text' }] },
      { _type: 'image', children: [] },
    ]
    expect(portableTextToPlainText(blocks)).toBe('Text')
  })

  it('should handle blocks with no children gracefully', () => {
    const blocks = [
      { _type: 'block' },
      { _type: 'block', children: [{ _type: 'span', text: 'After empty' }] },
    ]
    expect(portableTextToPlainText(blocks as never)).toBe('After empty')
  })

  it('should handle spans with undefined text', () => {
    const blocks = [
      {
        _type: 'block',
        children: [{ _type: 'span' }, { _type: 'span', text: 'visible' }],
      },
    ]
    expect(portableTextToPlainText(blocks)).toBe('visible')
  })
})
