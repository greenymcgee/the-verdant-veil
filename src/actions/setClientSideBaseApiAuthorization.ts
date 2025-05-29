import { baseApi } from '@/modules'

import { getVerifiedJwtToken } from './getVerifiedJwtToken'

/**
 * This will set the token in the auth header only when it is verified. Not
 * technically a server action, but this is the best way to avoid dependency
 * cycles right now.
 */
export async function setClientSideBaseApiAuthorization() {
  const token = await getVerifiedJwtToken()
  if (!token) return false

  baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return true
}
