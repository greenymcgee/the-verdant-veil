import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('resetPassword')
const handlers = [
  http.post(ROUTE, () => new HttpResponse()),
  http.patch(ROUTE, () => new HttpResponse()),
]

export const resetPasswordServer = setupServer(...handlers)

export function mockUnprocessableResetPasswordResponse(
  method: 'post' | 'patch',
) {
  const message =
    method === 'post' ? 'Email not found' : 'Reset password token is invalid'
  resetPasswordServer.use(
    http[method](
      ROUTE,
      () => new HttpResponse(JSON.stringify({ message }), { status: 422 }),
    ),
  )
  return message
}

export function mockErrorResetPasswordResponse(method: 'post' | 'patch') {
  resetPasswordServer.use(http[method](ROUTE, () => HttpResponse.error()))
}
