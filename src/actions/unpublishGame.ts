'use server'

import type { ActionState } from '@greenymcgee/typescript-utils'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State extends ActionState {
  game: Game
  message: string
}

export async function unpublishGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  logger.info({ slug: state.game.slug }, 'UNPUBLISHING GAME')
  try {
    await baseApi.delete(API_ROUTES.publishGame(state.game.slug))
    return { ...state, status: 'SUCCESS' }
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { ...state, message, status: 'ERROR' }
  }
}
