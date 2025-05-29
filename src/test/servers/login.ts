import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ADMIN_USER } from '../fixtures'
import { JWT_TOKEN_FIXTURE } from '../fixtures/authToken'
import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('login')
const handlers = [
  http.post(
    ROUTE,
    () =>
      new HttpResponse(JSON.stringify({ user: ADMIN_USER }), {
        headers: { authorization: `Bearer ${JWT_TOKEN_FIXTURE}` },
      }),
  ),
]

export const loginServer = setupServer(...handlers)

export function mockUnauthorizedLoginResponse() {
  const message = 'Invalid email or password'
  loginServer.use(
    http.post(
      ROUTE,
      () =>
        new HttpResponse(JSON.stringify({ error: message }), { status: 401 }),
    ),
  )
  return message
}

export function mockErrorLoginResponse() {
  loginServer.use(http.post(ROUTE, () => HttpResponse.error()))
}
