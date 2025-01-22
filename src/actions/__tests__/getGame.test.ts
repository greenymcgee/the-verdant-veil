import { http, HttpResponse } from 'msw'

import { SUPER_METROID } from '@/test/fixtures'
import { getApiUrl } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

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
    it('should throw an error', async () => {
      gamesServer.use(
        http.get(getApiUrl('game', [SUPER_METROID.slug]), () =>
          HttpResponse.error(),
        ),
      )
      expect(async () => await getGame(SUPER_METROID.slug)).rejects.toThrow(
        Error(`Something went wrong while retrieving ${SUPER_METROID.slug}`),
      )
    })
  })
})
