'use server'

import { snakeCase } from 'change-case/keys'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State {
  game: Game
  message: string
  status: 'success' | 'failure' | 'idle'
}

export async function unpublishGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  logger.info({ slug: state.game.slug }, 'UNPUBLISHING GAME')
  try {
    await baseApi.patch(
      API_ROUTES.game(state.game.slug),
      snakeCase({ publishedAt: '' }),
    )
    return { ...state, status: 'success' }
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { ...state, message, status: 'failure' }
  }
}
