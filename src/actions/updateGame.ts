'use server'
import { redirect } from 'next/navigation'
import zod from 'zod'

import { API_ROUTES, ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface GameState {
  message?: string
  rating?: Game['rating']
  review?: Game['review']
  slug: Game['slug']
}

const schema = zod.object({
  game: zod.object({
    rating: zod.number().optional(),
    review: zod.string().optional(),
  }),
})

function getFormDataValues(formData: FormData) {
  return {
    rating: Number(formData.get('rating')),
    review: String(formData.get('review')),
  }
}

function validateUpdateData(formData: FormData) {
  return schema.parse({ game: getFormDataValues(formData) })
}

export async function updateGame({ slug }: GameState, formData: FormData) {
  await setBaseApiAuthorization()
  try {
    const data = validateUpdateData(formData)
    logger.info({ data, slug }, 'Updating game')
    await baseApi.patch(API_ROUTES.game(slug), data)
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return {
      ...getFormDataValues(formData),
      message,
      slug,
    } as GameState
  }

  redirect(`${ROUTES.adminGame(slug)}?updated=true`)
}
