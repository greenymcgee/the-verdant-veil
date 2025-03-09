'use server'
import { redirect } from 'next/navigation'
import { any, number, object, string } from 'zod'

import { API_ROUTES, GAME_FORM_NAMES, ROUTES } from '@/constants'
import { ErrorFacade, UpdateGameDataFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface GameState {
  bannerImage?: FormDataEntryValue
  featuredVideoId?: Game['featuredVideoId']
  message?: string
  publishedAt?: Game['publishedAt']
  rating?: Game['rating']
  review?: Game['review']
  slug: Game['slug']
}

const schema = object({
  game: object({
    bannerImage: any().optional(),
    featuredVideoId: string().optional(),
    publishedAt: string().optional(),
    rating: number().optional(),
    review: string().optional(),
  }),
})

function getFormDataValues(formData: FormData) {
  return {
    game: {
      bannerImage: formData.get(GAME_FORM_NAMES.BANNER_IMAGE),
      featuredVideoId: formData.get(GAME_FORM_NAMES.FEATURED_VIDEO_ID),
      publishedAt: formData.get(GAME_FORM_NAMES.PUBLISHED_AT),
      rating: Number(formData.get(GAME_FORM_NAMES.RATING)),
      review: formData.get(GAME_FORM_NAMES.REVIEW),
    },
  }
}

function validateUpdateData(formData: FormData) {
  return schema.parse(getFormDataValues(formData))
}

export async function updateGame({ slug }: GameState, formData: FormData) {
  await setBaseApiAuthorization()
  try {
    const facade = new UpdateGameDataFacade(formData)
    facade.convertPublishedAtToUTCEquivalent()
    facade.deleteEmptyBannerImage()
    const { game } = validateUpdateData(facade.formData)
    logger.info({ ...game, slug }, 'UPDATING GAME')
    await baseApi.patch(API_ROUTES.game(slug), facade.formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return {
      ...getFormDataValues(formData).game,
      message,
      slug,
    } as GameState
  }

  redirect(`${ROUTES.adminGame(slug)}?updated=true`)
}
