'use server'
import { AxiosResponse } from 'axios'
import { snakeCase } from 'change-case/keys'
import { redirect } from 'next/navigation'
import { number, object } from 'zod'

import { API_ROUTES, ROUTES } from '@/constants'
import { ErrorFacade } from '@/facades'
import { baseApi, logger } from '@/modules'

import { setBaseApiAuthorization } from './setBaseApiAuthorization'

interface CreateGameState {
  igdbId?: number
  message?: string
  slug?: string
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
    const { data } = await postGame(game)
    state.slug = data.game.slug
  } catch (error) {
    const { message } = new ErrorFacade(error)
    logger.error(error, message)
    return {
      ...getFormDataValues(formData),
      message,
    } as CreateGameState
  }

  redirect(`${ROUTES.adminEditGame(state.slug)}?created=true`)
}
