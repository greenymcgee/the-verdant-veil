import { waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import {
  GET_GAMES_RESPONSE_DATA,
  GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA,
  GET_PUBLISHED_GAMES_RESPONSE_DATA,
} from '@/test/fixtures'
import { getApiUrl, renderHookWithProviders, toastMock } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { useGetGamesQuery } from '..'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => {
  gamesServer.resetHandlers()
  vi.clearAllMocks()
})
beforeEach(() => mockRouter.push(ROUTES.adminGames))

describe('useGetGamesQuery', () => {
  describe('success', () => {
    it('should return games', async () => {
      const { result } = renderHookWithProviders(() => useGetGamesQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(GET_GAMES_RESPONSE_DATA.games)
    })

    it('should use search params', async () => {
      mockRouter.push(`${ROUTES.adminGames}?page=1`)
      const { result } = renderHookWithProviders(() => useGetGamesQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(
        GET_GAMES_WITH_SEARCH_PARAMS_RESPONSE_DATA.games,
      )
    })
  })

  describe('failure', () => {
    it('should toast a message to the user', async () => {
      gamesServer.use(http.get(getApiUrl('games'), () => HttpResponse.error()))
      const { result } = renderHookWithProviders(() => useGetGamesQuery())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(toastMock.error).toHaveBeenCalledWith(
        'Whoops, something went wrong',
      )
    })
  })

  describe('options', () => {
    it('should utilize published option', async () => {
      const { result } = renderHookWithProviders(() =>
        useGetGamesQuery({ published: true }),
      )
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(
        GET_PUBLISHED_GAMES_RESPONSE_DATA.games,
      )
    })
  })
})
