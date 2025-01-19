import toast from 'react-hot-toast'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { baseApi, logger } from '@/modules'

async function getGames(url: string) {
  return await baseApi.get<GamesIndexJson>(url).then(({ data }) => data)
}

export function useGetGamesQuery() {
  const query = useSWR(API_ROUTES.games, getGames, {
    onError(error) {
      logger.error(error)
      toast.error('Something went wrong while retrieving games')
    },
  })
  return { ...query, games: query.data?.games ?? [] }
}
