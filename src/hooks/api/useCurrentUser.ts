import useSWR from 'swr'

import { setClientSideBaseApiAuthorization } from '@/actions'
import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

async function getCurrentUser(url: string) {
  if (!(await setClientSideBaseApiAuthorization())) return

  return await baseApi.get<CurrentUsersShowJson>(url).then(({ data }) => data)
}

const INITIAL_DATA: CurrentUsersShowJson = {
  user: { admin: false, firstName: '', id: NaN, lastName: '', username: '' },
}

export function useCurrentUser() {
  const query = useSWR(API_ROUTES.currentUser, getCurrentUser, {
    onError(error) {
      const { message } = new ErrorFacade(error)
      logger.error(error, message)
    },
  })
  const { data: { user } = INITIAL_DATA } = query
  return { ...query, user }
}
