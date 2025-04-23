import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  GET_CURRENTLY_PLAYING_CAROUSEL_RESPONSE_DATA,
  GET_PS1_CAROUSEL_RESPONSE_DATA,
  GET_SNES_CAROUSEL_RESPONSE_DATA,
} from '../fixtures'
import { getApiUrl } from '../helpers'

const handlers = [
  http.get(getApiUrl('homeCarousel', ['snes']), () =>
    HttpResponse.json(GET_SNES_CAROUSEL_RESPONSE_DATA),
  ),
  http.get(getApiUrl('homeCarousel', ['ps']), () =>
    HttpResponse.json(GET_PS1_CAROUSEL_RESPONSE_DATA),
  ),
  http.get(getApiUrl('homeCarousel', ['currently_playing']), () =>
    HttpResponse.json(GET_CURRENTLY_PLAYING_CAROUSEL_RESPONSE_DATA),
  ),
]

export const homeServer = setupServer(...handlers)

export function mockEmptyHomeCarouselResponse(type: HomeCarouselType) {
  homeServer.use(
    http.get(getApiUrl('homeCarousel', [type]), () =>
      HttpResponse.json({ carousel: { games: [] } }),
    ),
  )
}

export function mockHomeCarouselRequestFailure(type: HomeCarouselType) {
  const message = 'Server Error'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 500 })
  homeServer.use(http.get(getApiUrl('homeCarousel', [type]), response))
  return { message, response }
}
