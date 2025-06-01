'use server'

import { revalidatePath } from 'next/cache'

import { API_ROUTES, ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State extends ActionState {
  game: Game
  message: string
  responseStatus?: number
}

export async function refreshGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  logger.info({ slug: state.game.slug }, 'REFRESHING GAME')
  try {
    const { status } = await baseApi.post(
      API_ROUTES.refreshGame(state.game.slug),
    )
    state.responseStatus = status
  } catch (error) {
    const { data, message, status } = new ErrorFacade(error)
    logger.error({ data, error }, message)
    return { ...state, message, responseStatus: status, status: 'failure' }
  }

  revalidatePath(ROUTES.gamePreview(state.game.slug))
  return { ...state, status: 'success' }
}
