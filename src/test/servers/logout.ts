import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { getApiUrl } from '../helpers'

const ROUTE = getApiUrl('logout')
const handlers = [http.delete(ROUTE, () => new HttpResponse())]

export const logoutServer = setupServer(...handlers)

export function mockLogoutRequestError() {
  logoutServer.use(http.delete(ROUTE, () => HttpResponse.error()))
}
