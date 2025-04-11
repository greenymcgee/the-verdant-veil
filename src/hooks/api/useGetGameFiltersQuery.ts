'use client'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

async function getGameFilters(url: string) {
  return await baseApi.get<GameFiltersIndexJson>(url).then(({ data }) => data)
}

const INITIAL_DATA: GameFiltersIndexJson = {
  filters: { companies: [], genres: [], platforms: [] },
}

export function useGetGameFiltersQuery() {
  const query = useSWR(API_ROUTES.gameFilters, getGameFilters, {
    onError(error) {
      const { message } = new ErrorFacade(error)
      logger.error(error, message)
      toast.error(message)
    },
  })

  const { data: { filters } = INITIAL_DATA } = query
  return { ...query, filters }
}
