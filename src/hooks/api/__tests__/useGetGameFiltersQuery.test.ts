import { waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { GET_GAME_FILTERS_RESPONSE_DATA } from '@/test/fixtures'
import { renderHookWithProviders, toastMock } from '@/test/helpers'
import { gamesServer, mockGameFiltersRequestFailure } from '@/test/servers'

import { useGetGameFiltersQuery } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => {
  gamesServer.resetHandlers()
  vi.clearAllMocks()
})
beforeEach(() => mockRouter.push(ROUTES.adminGames))

describe('useGetGameFiltersQuery', () => {
  describe('success', () => {
    it('should return game filters', async () => {
      const { result } = renderHookWithProviders(() => useGetGameFiltersQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.filters).toEqual(
        GET_GAME_FILTERS_RESPONSE_DATA.filters,
      )
    })
  })

  describe('failure', () => {
    it('should toast a message to the user', async () => {
      const { message } = mockGameFiltersRequestFailure()
      const { result } = renderHookWithProviders(() => useGetGameFiltersQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(toastMock.error).toHaveBeenCalledWith(message)
    })
  })
})
