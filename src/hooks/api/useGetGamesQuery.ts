'use client'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { useSearchParamsWithCorrectedPageNumber } from '..'

async function getGames(url: string) {
  return await baseApi.get<GamesIndexJson>(url).then(({ data }) => data)
}

const INITIAL_DATA = { games: [], totalPages: 0 }

export function useGetGamesQuery() {
  const params = useSearchParamsWithCorrectedPageNumber()
  const route = params.size ? `${API_ROUTES.games}?${params}` : API_ROUTES.games
  const query = useSWR(route, getGames, {
    onError(error) {
      const { message } = new ErrorFacade(error)
      logger.error(error, message)
      toast.error(message)
    },
  })
  const { data: { games, totalPages } = INITIAL_DATA } = query
  return { ...query, games, totalPages }
}
