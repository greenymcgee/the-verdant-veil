'use client'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

async function getGames(url: string) {
  return await baseApi.get<GamesIndexJson>(url).then(({ data }) => data)
}

const INITIAL_DATA = { games: [] }

export function useSearchGamesQuery(searchQuery: string) {
  const route = `${API_ROUTES.games}?published=true&query=${searchQuery}`
  const query = useSWR(searchQuery ? route : null, getGames, {
    onError(error) {
      const { message } = new ErrorFacade(error)
      logger.error(error, message)
    },
  })
  const { data: { games } = INITIAL_DATA } = query
  return { ...query, games }
}
