import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { logoutServer, mockLogoutRequestError } from '@/test/servers'

import { logout } from '..'

beforeAll(() => logoutServer.listen())
afterEach(() => logoutServer.resetHandlers())
afterAll(() => logoutServer.close())

describe('logout', () => {
  describe('success', () => {
    it('should redirect to the login page', async () => {
      mockRouter.push(ROUTES.adminGames)
      await logout()
      expect(mockRouter.pathname).toEqual(ROUTES.login)
    })
  })

  describe('failure', () => {
    it('should return a message', async () => {
      mockLogoutRequestError()
      mockRouter.push(ROUTES.adminGames)
      const result = await logout()
      expect(result.message).toEqual('Whoops, something went wrong')
    })
  })
})
