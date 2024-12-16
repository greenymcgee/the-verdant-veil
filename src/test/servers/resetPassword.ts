import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { API_ROUTES } from '@/constants'

const handlers = [http.post(API_ROUTES.resetPassword, () => new HttpResponse())]

export const resetPasswordServer = setupServer(...handlers)

export function mockUnprocessablePostResetPasswordResponse() {
  const message = 'Email not found'
  resetPasswordServer.use(
    http.post(
      API_ROUTES.resetPassword,
      () => new HttpResponse(JSON.stringify({ message }), { status: 422 }),
    ),
  )
  return message
}

export function mockErrorPostResetPasswordResponse() {
  resetPasswordServer.use(
    http.post(API_ROUTES.resetPassword, () => HttpResponse.error()),
  )
}
