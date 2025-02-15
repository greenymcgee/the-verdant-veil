import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameDeleteRequestFailure } from '@/test/servers'

import { deleteGame } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('deleteGame', () => {
  describe('success', () => {
    it('should return isSuccess true', async () => {
      const formData = new FormData()
      formData.set('slug', SUPER_METROID.slug)
      const { isSuccess } = await deleteGame({ game: SUPER_METROID })
      expect(isSuccess).toBe(true)
    })
  })

  describe('failure', () => {
    it('should return isError true', async () => {
      const { message } = mockGameDeleteRequestFailure()
      const formData = new FormData()
      formData.set('slug', SUPER_METROID.slug)
      const result = await deleteGame({ game: SUPER_METROID })
      expect(result.message).toBe(message)
    })
  })
})
