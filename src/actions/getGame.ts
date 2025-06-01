import { cache } from 'react'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

export const getGame = cache(async (slug: Game['slug']) => {
  try {
    const { data } = await baseApi.get<GamesShowJson>(API_ROUTES.game(slug))
    return { game: data.game }
  } catch (error) {
    const { isNotFoundError, message, status } = new ErrorFacade(error)
    logger.error(error, message)
    return {
      error,
      game: {} as Game,
      isNotFoundError,
      message,
      status,
    }
  }
})
