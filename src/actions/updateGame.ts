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
  failureReasons?: string[]
  featuredVideoId?: Game['featuredVideoId']
  lastPlayedDate?: Game['lastPlayedDate']
  message?: string
  rating?: Game['rating']
  review?: Game['review']
  reviewTitle?: Game['review']
  slug: Game['slug']
}

interface UpdateGameError {
  message: string
  reasons: string[] | undefined
}

const schema = object({
  game: object({
    bannerImage: any().optional(),
    currentlyPlaying: boolean().optional(),
    estimatedFirstPlayedDate: string().optional().nullable(),
    featuredVideoId: string().optional(),
    lastPlayedDate: string().optional().nullable(),
    rating: number().optional(),
    review: string().optional(),
    reviewTitle: string().optional(),
  }),
})

function getFormDataValues(formData: FormData) {
  const currentlyPlaying = formData.get(GAME_FORM_NAMES.CURRENTLY_PLAYING)
  return {
    game: {
      bannerImage: formData.get(GAME_FORM_NAMES.BANNER_IMAGE),
      currentlyPlaying:
        currentlyPlaying === 'true' || currentlyPlaying === 'on',
      estimatedFirstPlayedDate: formData.get(
        GAME_FORM_NAMES.ESTIMATED_FIRST_PLAYED_DATE,
      ),
      featuredVideoId: formData.get(GAME_FORM_NAMES.FEATURED_VIDEO_ID),
      lastPlayedDate: formData.get(GAME_FORM_NAMES.LAST_PLAYED_DATE),
      rating: Number(formData.get(GAME_FORM_NAMES.RATING)),
      review: formData.get(GAME_FORM_NAMES.REVIEW),
      reviewTitle: formData.get(GAME_FORM_NAMES.REVIEW_TITLE),
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
    const { data, message } = new ErrorFacade<UpdateGameError>(error)
    logger.error(error, message)
    return {
      ...getFormDataValues(formData).game,
      failureReasons: data?.reasons,
      message,
      slug,
    } as UpdateGameState
  }

  redirect(`${ROUTES.adminGame(slug)}?updated=true`)
}
