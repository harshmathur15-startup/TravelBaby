import { describe, it, expect, vi, afterEach } from 'vitest'
import { logger } from './logger'

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('warn', () => {
    it('should call console.warn with the app prefix and message', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      logger.warn('something happened')
      expect(spy).toHaveBeenCalledWith('[app]', 'something happened', '')
    })

    it('should pass context when provided', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const ctx = { userId: 123 }
      logger.warn('user issue', ctx)
      expect(spy).toHaveBeenCalledWith('[app]', 'user issue', ctx)
    })

    it('should pass empty string when context is undefined', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      logger.warn('no context')
      expect(spy).toHaveBeenCalledWith('[app]', 'no context', '')
    })
  })

  describe('error', () => {
    it('should call console.error with the app prefix and message', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      logger.error('something broke')
      expect(spy).toHaveBeenCalledWith('[app]', 'something broke', '')
    })

    it('should pass context when provided', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const err = new Error('test error')
      logger.error('caught error', err)
      expect(spy).toHaveBeenCalledWith('[app]', 'caught error', err)
    })

    it('should pass empty string when context is undefined', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      logger.error('bare error')
      expect(spy).toHaveBeenCalledWith('[app]', 'bare error', '')
    })
  })
})
