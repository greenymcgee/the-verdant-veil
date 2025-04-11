import { GET_GAME_FILTERS_RESPONSE_DATA } from '@/test/fixtures'
import { gamesServer, mockGameFiltersRequestFailure } from '@/test/servers'

import { getGameFilters } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

describe('getGameFilters', () => {
  describe('success', () => {
    it('should return the filters', async () => {
      const result = await getGameFilters()
      expect(result.filters).toEqual(GET_GAME_FILTERS_RESPONSE_DATA.filters)
    })
  })

  describe('failure', () => {
    it('should return an error', async () => {
      const { response } = mockGameFiltersRequestFailure()
      const result = await getGameFilters()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.error.status).toEqual(response().status)
    })

    it('should return a message', async () => {
      const { message } = mockGameFiltersRequestFailure()
      const result = await getGameFilters()
      expect(result.message).toEqual(message)
    })
  })
})
