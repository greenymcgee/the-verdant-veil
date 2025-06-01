'use server'
import { API_ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface State {
  game: Game | GameWithoutResources
  isSuccess?: boolean
  message?: string
}

export async function deleteGame({ game }: State): Promise<State> {
  await setBaseApiAuthorization()
  try {
    await baseApi.delete(API_ROUTES.game(game.slug))
    return { game, isSuccess: true }
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return { game, isSuccess: false, message }
  }
}
