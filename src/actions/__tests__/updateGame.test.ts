import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { updateGame } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('updateGame', () => {
  describe('success', () => {
    it('should return success', async () => {
      const formData = new FormData()
      formData.set('review', '<p>an updated review</p>')
      await updateGame({ slug: SUPER_METROID.slug }, formData)
      expect(mockRouter.pathname).toEqual(ROUTES.adminGame(SUPER_METROID.slug))
    })
  })

  describe('failure', () => {
    it('should return state with a message', async () => {
      const { message } = mockGameUpdateRequestFailure()
      const formData = new FormData()
      formData.set('review', '<p>an updated review</p>')
      const response = await updateGame({ slug: SUPER_METROID.slug }, formData)
      expect(response.message).toEqual(message)
    })
  })
})
