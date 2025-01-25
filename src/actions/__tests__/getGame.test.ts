import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameRequestFailure } from '@/test/servers'

import { getGame } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('getGame', () => {
  describe('success', () => {
    it('should return the game', async () => {
      const result = await getGame(SUPER_METROID.slug)
      expect(result.game).toEqual(SUPER_METROID)
    })
  })

  describe('failure', () => {
    it('should return an error', async () => {
      const { response } = mockGameRequestFailure()
      const result = await getGame(SUPER_METROID.slug)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.error.status).toEqual(response().status)
    })

    it('should return a message', async () => {
      const { message } = mockGameRequestFailure()
      const result = await getGame(SUPER_METROID.slug)
      expect(result.message).toEqual(message)
    })
  })
})
