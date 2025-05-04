'use client'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { ErrorFacade, publishedParamFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { useSearchParamsWithCorrectedPageNumber } from '..'

interface Options {
  published?: boolean
}

async function getGames(url: string) {
  return await baseApi.get<GamesIndexJson>(url).then(({ data }) => data)
}

const INITIAL_DATA = { games: [], totalPages: 0 }
const DEFAULT_OPTIONS: Options = { published: false }

export function useGetGamesQuery({ published } = DEFAULT_OPTIONS) {
  const searchParams = new URLSearchParams(
    useSearchParamsWithCorrectedPageNumber(),
  )
  publishedParamFacade.update({ published, searchParams })
  publishedParamFacade.setOrDeletePublishedParam()
  const route = searchParams.size
    ? `${API_ROUTES.games}?${searchParams}`
    : API_ROUTES.games
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
