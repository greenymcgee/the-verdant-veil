'use server'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State extends ActionState {
  game: Game
  message: string
  unpublishableReasons: string[]
}

interface ErrorData {
  message: string
  unpublishableReasons: string[]
}

export async function publishGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  logger.info({ slug: state.game.slug }, 'PUBLISHING GAME')
  try {
    await baseApi.post(API_ROUTES.publishGame(state.game.slug))
    return { ...state, status: 'success', unpublishableReasons: [] }
  } catch (error) {
    const { data, message } = new ErrorFacade<ErrorData>(error)
    logger.error({ data, error }, message)
    return {
      ...state,
      message,
      status: 'failure',
      unpublishableReasons: data?.unpublishableReasons ?? [],
    }
  }
}
