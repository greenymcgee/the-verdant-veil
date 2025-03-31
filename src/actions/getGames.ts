'use server'
import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

interface GetGames extends GamesIndexJson {
  error?: unknown
  message?: string
  status?: number
}

export async function getGames(): Promise<GetGames> {
  try {
    const { data } = await baseApi.get<GamesIndexJson>(API_ROUTES.games)
    return data
  } catch (error) {
    const { message, status } = new ErrorFacade(error)
    logger.error(error, message)
    return { error, games: [], message, status, totalPages: 0 }
  }
}
