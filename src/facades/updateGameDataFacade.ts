import { fromZonedTime } from 'date-fns-tz'

import { GAME_FORM_NAMES } from '@/constants'
import { logger } from '@/lib'

export class UpdateGameDataFacade {
  public formData: FormData

  constructor(formData: FormData) {
    this.formData = new FormData()
    formData.entries().forEach((entry) => {
      const [key, value] = entry
      this.formData.set(key, value)
    })
  }

  public convertPublishedAtToUTCEquivalent() {
    if (!this.publishedAt) return

    logger.info(`PUBLISHED AT DATE: ${this.timezone}:${this.publishedAt}`)
    logger.info(`UTC CONVERSION: ${this.convertedPublishedAt}`)
    this.formData.set(GAME_FORM_NAMES.PUBLISHED_AT, this.convertedPublishedAt)
  }

  public deleteEmptyBannerImage() {
    if (this.bannerImage?.size) return

    this.formData.delete(GAME_FORM_NAMES.BANNER_IMAGE)
  }

  public translateCurrentlyPlaying() {
    if (this.formData.get(GAME_FORM_NAMES.CURRENTLY_PLAYING) === 'on')
      return this.formData.set(GAME_FORM_NAMES.CURRENTLY_PLAYING, 'true')

    this.formData.set(GAME_FORM_NAMES.CURRENTLY_PLAYING, 'false')
  }

  private get bannerImage() {
    return this.formData.get(GAME_FORM_NAMES.BANNER_IMAGE) as File | null
  }

  private get publishedAt() {
    return this.formData.get(GAME_FORM_NAMES.PUBLISHED_AT) as string
  }

  private get timezone() {
    return this.formData.get('timezone') as string
  }

  private get convertedPublishedAt() {
    return fromZonedTime(
      new Date(this.publishedAt),
      this.timezone,
    ).toISOString()
  }
}
