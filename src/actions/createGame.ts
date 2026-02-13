'use server'
import type { ActionState } from '@greenymcgee/typescript-utils'
import { AxiosResponse } from 'axios'
import { snakeCase } from 'change-case/keys'
import { number, object } from 'zod'

import { API_ROUTES, HTML_STATUSES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/lib'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface CreateGameState extends ActionState {
  game?: Game
  igdbId?: number
  isMultiStatus?: boolean
  message?: string
}

interface CreateGameParams {
  game: { igdbId: number }
}

const schema = object({ igdbId: number().nonnegative() })

function getFormDataValues(formData: FormData) {
  return { igdbId: Number(formData.get('igdb-id')) }
}

function validateFormData(formData: FormData) {
  return schema.parse(getFormDataValues(formData))
}

async function postGame(game: Partial<Game>) {
  return await baseApi.post<CreateGameParams, AxiosResponse<GamesShowJson>>(
    API_ROUTES.games,
    { game: snakeCase(game) },
  )
}

export async function createGame(state: CreateGameState, formData: FormData) {
  await setBaseApiAuthorization()
  try {
    const game = validateFormData(formData)
    logger.info(game, 'Creating game')
    const { data, status } = await postGame(game)
    return {
      ...state,
      game: data.game,
      isMultiStatus: status === HTML_STATUSES.MULTI_STATUS,
      status: 'SUCCESS',
    } as CreateGameState
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return {
      ...getFormDataValues(formData),
      message,
      status: 'ERROR',
    } as CreateGameState
  }
}
