'use server'
import { redirect } from 'next/navigation'
import { any, boolean, number, object, string } from 'zod'

import { API_ROUTES, GAME_FORM_NAMES, ROUTES } from '@/constants'
import { ErrorFacade, UpdateGameDataFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface UpdateGameState {
  bannerImage?: FormDataEntryValue
  currentlyPlaying?: Game['currentlyPlaying']
  estimatedFirstPlayedDate?: Game['estimatedFirstPlayedDate']
  featuredVideoId?: Game['featuredVideoId']
  lastPlayedDate?: Game['lastPlayedDate']
  message?: string
  publishedAt?: Game['publishedAt']
  rating?: Game['rating']
  review?: Game['review']
  slug: Game['slug']
}

const schema = object({
  game: object({
    bannerImage: any().optional(),
    currentlyPlaying: boolean().optional(),
    estimatedFirstPlayedDate: string().optional().nullable(),
    featuredVideoId: string().optional(),
    lastPlayedDate: string().optional().nullable(),
    publishedAt: string().optional().nullable(),
    rating: number().optional(),
    review: string().optional(),
  }),
})

function getFormDataValues(formData: FormData) {
  return {
    game: {
      bannerImage: formData.get(GAME_FORM_NAMES.BANNER_IMAGE),
      currentlyPlaying:
        formData.get(GAME_FORM_NAMES.CURRENTLY_PLAYING) === 'true',
      estimatedFirstPlayedDate: formData.get(
        GAME_FORM_NAMES.ESTIMATED_FIRST_PLAYED_DATE,
      ),
      featuredVideoId: formData.get(GAME_FORM_NAMES.FEATURED_VIDEO_ID),
      lastPlayedDate: formData.get(GAME_FORM_NAMES.LAST_PLAYED_DATE),
      publishedAt: formData.get(GAME_FORM_NAMES.PUBLISHED_AT),
      rating: Number(formData.get(GAME_FORM_NAMES.RATING)),
      review: formData.get(GAME_FORM_NAMES.REVIEW),
    },
  }
}

function validateUpdateData(formData: FormData) {
  return schema.parse(getFormDataValues(formData))
}

export async function updateGame(
  { slug }: UpdateGameState,
  formData: FormData,
) {
  await setBaseApiAuthorization()
  try {
    const facade = new UpdateGameDataFacade(formData)
    facade.convertPublishedAtToUTCEquivalent()
    facade.deleteEmptyBannerImage()
    facade.translateCurrentlyPlaying()
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
    } as UpdateGameState
  }

  redirect(`${ROUTES.adminGame(slug)}?updated=true`)
}
