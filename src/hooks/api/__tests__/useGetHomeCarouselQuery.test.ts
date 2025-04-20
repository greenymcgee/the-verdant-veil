import { waitFor } from '@testing-library/react'

import { GET_SNES_CAROUSEL_RESPONSE_DATA } from '@/test/fixtures'
import { renderHookWithProviders, toastMock } from '@/test/helpers'
import { homeServer, mockHomeCarouselRequestFailure } from '@/test/servers'

import { useGetHomeCarouselQuery } from '..'

beforeAll(() => homeServer.listen())
afterAll(() => homeServer.close())
afterEach(() => {
  homeServer.resetHandlers()
  vi.clearAllMocks()
})

describe('useGetHomeCarouselQuery', () => {
  describe('success', () => {
    it('should return games', async () => {
      const { result } = renderHookWithProviders(() =>
        useGetHomeCarouselQuery('snes'),
      )
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.games).toEqual(
        GET_SNES_CAROUSEL_RESPONSE_DATA.carousel.games,
      )
    })
  })

  describe('failure', () => {
    it('should toast a message to the user', async () => {
      const { message } = mockHomeCarouselRequestFailure('snes')
      const { result } = renderHookWithProviders(() =>
        useGetHomeCarouselQuery('snes'),
      )
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(toastMock.error).toHaveBeenCalledWith(message)
    })
  })
})
