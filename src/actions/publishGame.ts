'use server'

import { snakeCase } from 'change-case/keys'
import { fromZonedTime } from 'date-fns-tz'

import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State extends ActionState {
  game: Game
  message: string
  timezone: string
}

function getPublishedAt(timezone: string) {
  return fromZonedTime(new Date(), timezone).toISOString()
}

export async function publishGame(state: State): Promise<State> {
  await setBaseApiAuthorization()
  try {
    await baseApi.patch(
      API_ROUTES.game(state.game.slug),
      snakeCase({ publishedAt: getPublishedAt(state.timezone) }),
    )
    return { ...state, status: 'success' }
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { ...state, message, status: 'failure' }
  }
}
