import { waitFor } from '@testing-library/react'

import { logger } from '@/lib'
import { GET_QUERIED_GAMES_RESPONSE_DATA } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/helpers'
import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import { useSearchGamesQuery } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => {
  gamesServer.resetHandlers()
  vi.clearAllMocks()
})

describe('useSearchGamesQuery', () => {
  describe('success', () => {
    it('should return games when a search query is present', async () => {
      const { result } = renderHookWithProviders(() =>
        useSearchGamesQuery('query'),
      )
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(
        GET_QUERIED_GAMES_RESPONSE_DATA.games,
      )
    })

    it('should not make request when search query is empty', () => {
      const { result } = renderHookWithProviders(() => useSearchGamesQuery(''))
      expect(result.current.isLoading).toEqual(false)
    })
  })

  describe('failure', () => {
    it('should handle server errors gracefully', async () => {
      const { message } = mockGamesRequestFailure()
      const { result } = renderHookWithProviders(() =>
        useSearchGamesQuery('test'),
      )
      await waitFor(() => expect(result.current.isLoading).toBe(false))
      expect(logger.error).toHaveBeenCalledWith(expect.any(Error), message)
    })
  })
})
