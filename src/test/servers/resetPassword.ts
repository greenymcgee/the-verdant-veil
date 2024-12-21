import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { API_ROUTES } from '@/constants'

const handlers = [
  http.post(API_ROUTES.resetPassword, () => new HttpResponse()),
  http.patch(API_ROUTES.resetPassword, () => new HttpResponse()),
]

export const resetPasswordServer = setupServer(...handlers)

export function mockUnprocessableResetPasswordResponse(
  method: 'post' | 'patch',
) {
  const message =
    method === 'post' ? 'Email not found' : 'Reset password token is invalid'
  resetPasswordServer.use(
    http[method](
      API_ROUTES.resetPassword,
      () => new HttpResponse(JSON.stringify({ message }), { status: 422 }),
    ),
  )
  return message
}

export function mockErrorResetPasswordResponse(method: 'post' | 'patch') {
  resetPasswordServer.use(
    http[method](API_ROUTES.resetPassword, () => HttpResponse.error()),
  )
}
