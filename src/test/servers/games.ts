import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  DARK_SOULS,
  GET_GAME_FILTERS_RESPONSE_DATA,
  GET_GAMES_RESPONSE_DATA,
  GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA,
  NEW_GAME,
  SUPER_METROID,
} from '../fixtures'
import { getApiUrl } from '../helpers'

const handlers = [
  http.get(getApiUrl('games'), (request) => {
    const { page } = request.params

    if (page)
      return HttpResponse.json(GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA)

    return HttpResponse.json(GET_GAMES_RESPONSE_DATA)
  }),
  http.post(getApiUrl('games'), () => HttpResponse.json({ game: NEW_GAME })),
  http.get(getApiUrl('game', [SUPER_METROID.slug]), () =>
    HttpResponse.json({ game: SUPER_METROID }),
  ),
  http.get(getApiUrl('game', [DARK_SOULS.slug]), () =>
    HttpResponse.json({ game: DARK_SOULS }),
  ),
  http.patch(getApiUrl('game', [SUPER_METROID.slug]), () =>
    HttpResponse.json({ game: SUPER_METROID }),
  ),
  http.delete(getApiUrl('game', [SUPER_METROID.slug]), () =>
    HttpResponse.json(),
  ),
  http.get(getApiUrl('gameFilters'), () =>
    HttpResponse.json(GET_GAME_FILTERS_RESPONSE_DATA),
  ),
]

export const gamesServer = setupServer(...handlers)

export function mockGamesRequestFailure() {
  const message = 'Server Error'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 500 })
  gamesServer.use(http.get(getApiUrl('games'), response))
  return { message, response }
}

export function mockGameRequestFailure(status = 404) {
  const message = `No games found matching ${SUPER_METROID.slug}`
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status })
  gamesServer.use(http.get(getApiUrl('game', [SUPER_METROID.slug]), response))
  return { message, response }
}

export function mockGameUpdateRequestFailure() {
  const message = 'Bad request'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 422 })
  gamesServer.use(http.patch(getApiUrl('game', [SUPER_METROID.slug]), response))
  return { message, response }
}

export function mockGameCreateRequestFailure() {
  const message = 'Bad request'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 422 })
  gamesServer.use(http.post(getApiUrl('games'), response))
  return { message, response }
}

export function mockGameDeleteRequestFailure() {
  const message = 'Bad request'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 422 })
  gamesServer.use(
    http.delete(getApiUrl('game', [SUPER_METROID.slug]), response),
  )
  return { message, response }
}

export function mockGamesWithoutDeletedGameRequest() {
  gamesServer.use(
    http.get(getApiUrl('games'), () =>
      HttpResponse.json({ games: [DARK_SOULS] }),
    ),
  )
}

export function mockGameFiltersRequestFailure() {
  const message = 'Server Error'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 500 })
  gamesServer.use(http.get(getApiUrl('gameFilters'), response))
  return { message, response }
}
