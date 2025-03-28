'use server'

import { snakeCase } from 'change-case/keys'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State extends ActionState {
  game: Game
  message: string
}

export async function publishGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  const publishedAt = new Date().toISOString()
  logger.info({ publishedAt, slug: state.game.slug }, 'PUBLISHING GAME')
  try {
    await baseApi.patch(
      API_ROUTES.game(state.game.slug),
      snakeCase({ publishedAt }),
    )
    return { ...state, status: 'success' }
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { ...state, message, status: 'failure' }
  }
}
