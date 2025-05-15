import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { HTML_STATUSES } from '@/constants'

import {
  DARK_SOULS,
  GET_GAME_FILTERS_RESPONSE_DATA,
  GET_GAMES_RESPONSE_DATA,
  GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA,
  GET_PUBLISHED_GAMES_RESPONSE_DATA,
  NEW_GAME,
  SUPER_METROID,
} from '../fixtures'
import { getApiUrl } from '../helpers'

const handlers = [
  http.get(getApiUrl('games'), ({ request: { url } }) => {
    const params = new URL(url).searchParams
    const page = params.get('page')
    const published = params.get('published')

    if (page)
      return HttpResponse.json(GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA)

    if (published) return HttpResponse.json(GET_PUBLISHED_GAMES_RESPONSE_DATA)

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
  http.post(getApiUrl('publishGame', [SUPER_METROID.slug]), () =>
    HttpResponse.json(),
  ),
  http.post(getApiUrl('publishGame', [DARK_SOULS.slug]), () =>
    HttpResponse.json(),
  ),
  http.delete(getApiUrl('publishGame', [SUPER_METROID.slug]), () =>
    HttpResponse.json(),
  ),
  http.post(getApiUrl('refreshGame', [SUPER_METROID.slug]), () =>
    HttpResponse.json(),
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

export function mockGameUpdateRequestFailure(withReasons = false) {
  const message = 'Game could not be updated'
  const reasons = ['You did bad', 'Try again']
  const response = () =>
    new HttpResponse(
      JSON.stringify({
        message,
        reasons: withReasons ? reasons : undefined,
      }),
      { status: 422 },
    )
  gamesServer.use(http.patch(getApiUrl('game', [SUPER_METROID.slug]), response))
  return { message, reasons, response }
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

export function mockUnpublishableGameFailure(slug: string) {
  const unpublishableReasons = [
    "Featured video id can't be blank",
    "Banner image can't be blank",
  ]
  const response = () =>
    new HttpResponse(JSON.stringify({ unpublishableReasons }), { status: 422 })
  gamesServer.use(http.post(getApiUrl('publishGame', [slug]), response))
  return unpublishableReasons
}

export function mockUnpublishGameFailure(slug: string) {
  const response = () => new HttpResponse(JSON.stringify({}), { status: 500 })
  gamesServer.use(http.delete(getApiUrl('publishGame', [slug]), response))
}

export function mockPartialGameRefreshResponse(slug: string) {
  const response = () => new HttpResponse(JSON.stringify({}), { status: 207 })
  gamesServer.use(http.post(getApiUrl('refreshGame', [slug]), response))
  return { response }
}

export function mockRefreshGameFailure(slug: string) {
  const message = 'Bad request'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 422 })
  gamesServer.use(http.post(getApiUrl('refreshGame', [slug]), response))
  return { message, response }
}

export function mockMultiStatusCreateResponse() {
  gamesServer.use(
    http.post(
      getApiUrl('games'),
      () =>
        new HttpResponse(JSON.stringify({ game: NEW_GAME }), {
          status: HTML_STATUSES.MULTI_STATUS,
        }),
    ),
  )
}
