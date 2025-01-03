import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { API_ROUTES } from '@/constants'

import { ADMIN_USER } from '../fixtures'
import { AUTH_TOKEN } from '../fixtures/authToken'

const handlers = [
  http.post(
    API_ROUTES.login,
    () =>
      new HttpResponse(JSON.stringify({ user: ADMIN_USER }), {
        headers: { authorization: AUTH_TOKEN },
      }),
  ),
]

export const loginServer = setupServer(...handlers)

export function mockUnauthorizedLoginResponse() {
  const message = 'Invalid email or password'
  loginServer.use(
    http.post(
      API_ROUTES.login,
      () =>
        new HttpResponse(JSON.stringify({ error: message }), { status: 401 }),
    ),
  )
  return message
}

export function mockErrorLoginResponse() {
  loginServer.use(http.post(API_ROUTES.login, () => HttpResponse.error()))
}
