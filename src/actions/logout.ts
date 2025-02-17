'use server'
import { redirect } from 'next/navigation'

import { API_ROUTES, ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { deleteSessionStorage } from './deleteSessionStorage'
import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface LogoutState {
  message?: string
}

export async function logout(): Promise<LogoutState> {
  logger.info('Logging out')
  await setBaseApiAuthorization()
  try {
    await baseApi.delete(API_ROUTES.logout)
    await deleteSessionStorage()
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { message }
  }

  redirect(ROUTES.login)
}
