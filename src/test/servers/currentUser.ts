import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ADMIN_USER, BASIC_USER } from '../fixtures'
import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('currentUser')
const handlers = [
  http.get(ROUTE, () => HttpResponse.json({ user: ADMIN_USER })),
]

export const currentUserServer = setupServer(...handlers)

export function mockCurrentUserRequestFailure() {
  const message = 'Server error'
  const response = () =>
    new HttpResponse(JSON.stringify({ message }), { status: 500 })
  currentUserServer.use(http.get(ROUTE, response))
  return { message, response }
}

export function mockNonAdminUser() {
  currentUserServer.use(
    http.get(ROUTE, () => HttpResponse.json({ user: BASIC_USER })),
  )
}
