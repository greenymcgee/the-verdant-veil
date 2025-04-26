import { DARK_SOULS, SUPER_METROID } from '@/test/fixtures'
import { formatDatetimeInputValue, toCurrentTimezone } from '@/utils'

import { getFormDates } from '..'

describe('getFormDates', () => {
  describe('estimatedFirstPlayedDate', () => {
    it('should return state date when present', () => {
      const state = {
        estimatedFirstPlayedDate: 'date',
        slug: SUPER_METROID.slug,
      }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.estimatedFirstPlayedDate).toBe(
        state.estimatedFirstPlayedDate,
      )
    })

    it('should return game date when present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.estimatedFirstPlayedDate).toBe(
        SUPER_METROID.estimatedFirstPlayedDate,
      )
    })

    it('should return an empty string when no date present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(DARK_SOULS, state)
      expect(result.estimatedFirstPlayedDate).toBe('')
    })
  })

  describe('lastPlayedDate', () => {
    it('should return state date when present', () => {
      const state = {
        lastPlayedDate: 'date',
        slug: SUPER_METROID.slug,
      }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.lastPlayedDate).toBe(state.lastPlayedDate)
    })

    it('should return game date when present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.lastPlayedDate).toBe(SUPER_METROID.lastPlayedDate)
    })

    it('should return an empty string when no date present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(DARK_SOULS, state)
      expect(result.lastPlayedDate).toBe('')
    })
  })

  describe('publishedAt', () => {
    it('should return state date when present', () => {
      const state = {
        publishedAt: '2002-11-08T00:00:00Z',
        slug: SUPER_METROID.slug,
      }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.publishedAt).toBe(
        formatDatetimeInputValue(toCurrentTimezone(state.publishedAt)),
      )
    })

    it('should return game date when present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(SUPER_METROID, state)
      expect(result.publishedAt).toBe(
        formatDatetimeInputValue(toCurrentTimezone(SUPER_METROID.publishedAt)),
      )
    })

    it('should return an empty string when no date present', () => {
      const state = { slug: SUPER_METROID.slug }
      const result = getFormDates(DARK_SOULS, state)
      expect(result.publishedAt).toBe('')
    })
  })
})
