import { API_ROUTES } from '@/constants'
import { baseApi, logger } from '@/modules'

export async function getGame(slug: Game['slug']) {
  try {
    const { data } = await baseApi.get<GamesShowJson>(API_ROUTES.game(slug))
    return { game: data.game }
  } catch (error) {
    logger.error(error)
    throw Error(`Something went wrong while retrieving ${slug}`)
  }
}
