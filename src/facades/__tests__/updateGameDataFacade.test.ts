import { fromZonedTime } from 'date-fns-tz'

import { GAME_FORM_NAMES } from '@/constants'

import { UpdateGameDataFacade } from '..'

describe('UpdateGameDataFacade', () => {
  describe('convertPublishedAtToUTCEquivalent', () => {
    it('should do nothing when published at date is blank', () => {
      const formData = new FormData()
      const facade = new UpdateGameDataFacade(formData)
      facade.convertPublishedAtToUTCEquivalent()
      expect(facade.formData.get(GAME_FORM_NAMES.PUBLISHED_AT)).toBeNull()
    })

    it('should convert when the date is present', () => {
      const date = '2025-02-27T06:54'
      const formData = new FormData()
      formData.set(GAME_FORM_NAMES.PUBLISHED_AT, date)
      formData.set('timezone', 'America/Denver')
      const facade = new UpdateGameDataFacade(formData)
      facade.convertPublishedAtToUTCEquivalent()
      expect(facade.formData.get(GAME_FORM_NAMES.PUBLISHED_AT)).toEqual(
        fromZonedTime(new Date(date), 'America/Denver').toISOString(),
      )
    })
  })

  describe('deleteEmptyBannerImage', () => {
    it('should do nothing when banner image size is present', () => {
      const file = new File(['content'], 'image.jpg', { type: 'image/jpg' })
      const formData = new FormData()
      formData.set(GAME_FORM_NAMES.BANNER_IMAGE, file)
      const facade = new UpdateGameDataFacade(formData)
      facade.deleteEmptyBannerImage()
      expect(facade.formData.get(GAME_FORM_NAMES.BANNER_IMAGE)).toBe(file)
    })

    it('should delete when banner image is blank', () => {
      const formData = new FormData()
      const facade = new UpdateGameDataFacade(formData)
      facade.deleteEmptyBannerImage()
      expect(facade.formData.get(GAME_FORM_NAMES.BANNER_IMAGE)).toBeNull()
    })

    it('should delete the banner image when the size is not present', () => {
      const file = new File([''], 'image.jpg', { type: 'image/jpg' })
      const formData = new FormData()
      formData.set(GAME_FORM_NAMES.BANNER_IMAGE, file)
      const facade = new UpdateGameDataFacade(formData)
      facade.deleteEmptyBannerImage()
      expect(facade.formData.get(GAME_FORM_NAMES.BANNER_IMAGE)).toBeNull()
    })
  })

  describe('translateCurrentlyPlaying', () => {
    it('should convert null to false', () => {
      const formData = new FormData()
      const facade = new UpdateGameDataFacade(formData)
      facade.translateCurrentlyPlaying()
      expect(facade.formData.get(GAME_FORM_NAMES.CURRENTLY_PLAYING)).toBe(
        'false',
      )
    })

    it('should convert "on" to true', () => {
      const formData = new FormData()
      formData.set(GAME_FORM_NAMES.CURRENTLY_PLAYING, 'on')
      const facade = new UpdateGameDataFacade(formData)
      facade.translateCurrentlyPlaying()
      expect(facade.formData.get(GAME_FORM_NAMES.CURRENTLY_PLAYING)).toBe(
        'true',
      )
    })
  })
})
