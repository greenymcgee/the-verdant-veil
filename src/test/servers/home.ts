import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { GET_HOME_CAROUSEL_RESPONSE_DATA } from '../fixtures'
import { getApiUrl } from '../helpers'

const handlers = [
  http.get(getApiUrl('homeCarousel', ['snes']), () =>
    HttpResponse.json(GET_HOME_CAROUSEL_RESPONSE_DATA),
  ),
]

export const homeServer = setupServer(...handlers)

export function mockHomeCarouselRequestFailure() {
  const message = 'Server Error'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 500 })
  homeServer.use(http.get(getApiUrl('homeCarousel', ['snes']), response))
  return { message, response }
}
