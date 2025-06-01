'use client'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

async function getGames(url: string) {
  return await baseApi.get<HomeCarouselsShowJson>(url).then(({ data }) => data)
}

const INITIAL_DATA: HomeCarouselsShowJson = { carousel: { games: [] } }

export function useGetHomeCarouselQuery(carousel: HomeCarouselType) {
  const query = useSWR(API_ROUTES.homeCarousel(carousel), getGames, {
    onError(error) {
      const { message } = new ErrorFacade(error)
      logger.error(error, message)
      toast.error(message)
    },
  })
  const { data: { carousel: { games } } = INITIAL_DATA } = query
  return { ...query, games }
}
