import { GAME_FORM_NAMES } from '@/constants'
import { fromCurrentTimezone } from '@/utils'

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

    this.formData.set(
      GAME_FORM_NAMES.PUBLISHED_AT,
      fromCurrentTimezone(this.publishedAt as string).toISOString(),
    )
  }

  public deleteEmptyBannerImage() {
    if (this.bannerImage?.size) return

    this.formData.delete(GAME_FORM_NAMES.BANNER_IMAGE)
  }

  private get bannerImage() {
    return this.formData.get(GAME_FORM_NAMES.BANNER_IMAGE) as File | null
  }

  private get publishedAt() {
    return this.formData.get(GAME_FORM_NAMES.PUBLISHED_AT)
  }
}
