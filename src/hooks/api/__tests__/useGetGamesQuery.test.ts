import { waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { GET_GAMES_RESPONSE_DATA } from '@/test/fixtures'
import { getApiUrl, renderHookWithProviders, toastMock } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { useGetGamesQuery } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => {
  gamesServer.resetHandlers()
  vi.clearAllMocks()
})

describe('useGetGamesQuery', () => {
  describe('success', () => {
    it('should return games', async () => {
      const { result } = renderHookWithProviders(() => useGetGamesQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(GET_GAMES_RESPONSE_DATA.games)
    })
  })

  describe('failure', () => {
    it('should toast a message to the user', async () => {
      gamesServer.use(http.get(getApiUrl('games'), () => HttpResponse.error()))
      const { result } = renderHookWithProviders(() => useGetGamesQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(toastMock.error).toHaveBeenCalledWith(
        'Something went wrong while retrieving games',
      )
    })
  })
})
