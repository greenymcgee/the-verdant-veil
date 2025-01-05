import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ADMIN_USER, BASIC_USER } from '../fixtures'
import { AUTH_TOKEN } from '../fixtures/authToken'
import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('currentUser')

const handlers = [
  http.get(
    ROUTE,
    () =>
      new HttpResponse(JSON.stringify({ user: ADMIN_USER }), {
        headers: { authorization: AUTH_TOKEN },
      }),
  ),
]

export const currentUserServer = setupServer(...handlers)

export function mockBasicUser() {
  currentUserServer.use(
    http.get(ROUTE, () => HttpResponse.json({ user: BASIC_USER })),
  )
}

export function mockCurrentUserFailure() {
  currentUserServer.use(
    http.get(ROUTE, () =>
      HttpResponse.text('Something went wrong', { status: 500 }),
    ),
  )
}
