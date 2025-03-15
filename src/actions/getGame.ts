import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

export async function getGame(slug: Game['slug']) {
  try {
    const { data } = await baseApi.get<GamesShowJson>(API_ROUTES.game(slug))
    logger.info(data.game, 'GAME')
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
}
