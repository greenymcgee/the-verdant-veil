import { NEW_GAME } from '@/test/fixtures'
import {
  gamesServer,
  mockGameCreateRequestFailure,
  mockMultiStatusCreateResponse,
} from '@/test/servers'

import { createGame } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('createGame', () => {
  describe('success', () => {
    it('should return success state', async () => {
      const formData = new FormData()
      formData.set('igdb-id', '1359')
      const result = await createGame({ status: 'IDLE' }, formData)
      expect(result).toEqual({
        game: NEW_GAME,
        isMultiStatus: false,
        status: 'SUCCESS',
      })
    })

    it('should return a multi status boolean for multi status responses', async () => {
      mockMultiStatusCreateResponse()
      const formData = new FormData()
      formData.set('igdb-id', '1359')
      const result = await createGame({ status: 'IDLE' }, formData)
      expect(result).toEqual({
        game: NEW_GAME,
        isMultiStatus: true,
        status: 'SUCCESS',
      })
    })
  })

  describe('failure', () => {
    it('should return error state', async () => {
      const { message } = mockGameCreateRequestFailure()
      const formData = new FormData()
      formData.set('igdb-id', NEW_GAME.igdbId.toString())
      const result = await createGame({ status: 'IDLE' }, formData)
      expect(result).toEqual({
        igdbId: NEW_GAME.igdbId,
        message,
        status: 'ERROR',
      })
    })
  })
})
