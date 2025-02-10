import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { NEW_GAME } from '@/test/fixtures'
import { gamesServer, mockGameCreateRequestFailure } from '@/test/servers'

import { createGame } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('createGame', () => {
  describe('success', () => {
    it('should redirect to the new game', async () => {
      const formData = new FormData()
      formData.set('igdb-id', '1359')
      await createGame({}, formData)
      expect(mockRouter.pathname).toEqual(ROUTES.adminEditGame(NEW_GAME.slug))
    })
  })

  describe('failure', () => {
    it('should return state with a message', async () => {
      const { message } = mockGameCreateRequestFailure()
      const formData = new FormData()
      formData.set('igdb-id', '1359')
      const response = await createGame({}, formData)
      expect(response.message).toEqual(message)
    })
  })
})
