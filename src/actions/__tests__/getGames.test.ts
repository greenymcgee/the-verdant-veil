import { GAMES } from '@/test/fixtures'
import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import { getGames } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('getGames', () => {
  describe('success', () => {
    it('should return the game', async () => {
      const result = await getGames()
      expect(result.games).toEqual(GAMES)
    })
  })

  describe('failure', () => {
    it('should return an error', async () => {
      const { response } = mockGamesRequestFailure()
      const result = await getGames()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.error.status).toEqual(response().status)
    })

    it('should return a message', async () => {
      const { message } = mockGamesRequestFailure()
      const result = await getGames()
      expect(result.message).toEqual(message)
    })
  })
})
