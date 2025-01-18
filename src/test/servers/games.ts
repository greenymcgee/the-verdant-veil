import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { GET_GAMES_RESPONSE_DATA } from '../fixtures'
import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('games')

const handlers = [
  http.get(ROUTE, () => HttpResponse.json(GET_GAMES_RESPONSE_DATA)),
]

export const gamesServer = setupServer(...handlers)
