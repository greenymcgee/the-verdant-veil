'use server'
import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

interface GetGameFilters extends GameFiltersIndexJson {
  error?: unknown
  message?: string
  status?: number
}

const INITIAL_FILTERS: GameFiltersIndexJson = {
  filters: { companies: [], genres: [], platforms: [] },
}

export async function getGameFilters(): Promise<GetGameFilters> {
  try {
    const { data } = await baseApi.get<GameFiltersIndexJson>(
      API_ROUTES.gameFilters,
    )
    return data
  } catch (error) {
    const { message, status } = new ErrorFacade(error)
    logger.error(error, message)
    return { error, filters: INITIAL_FILTERS.filters, message, status }
  }
}
