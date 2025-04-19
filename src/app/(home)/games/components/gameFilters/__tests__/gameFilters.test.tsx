import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { GameFilters } from '..'

beforeAll(() => gamesServer.listen())
beforeEach(() => {
  gamesServer.resetHandlers()
  mockRouter.pathname = ROUTES.games
})
afterAll(() => gamesServer.close())

const FILTERED_PATHNAME = `${ROUTES.games}?${encodeURI(`platforms[]=${SUPER_METROID.platforms.at(0)?.slug}`)}`

describe('<GameFilters />', () => {
  describe('mobile', () => {
    it('should apply filters', async () => {
      renderWithProviders(<GameFilters />)
      fireEvent.click(await screen.findByTestId('mobile-filter-button'))
      fireEvent.click(
        screen.getByTestId(
          `mobile-platforms-${SUPER_METROID.platforms.at(0)?.slug}`,
        ),
      )
      fireEvent.click(screen.getByTestId('mobile-apply-filters-button'))
      expect(mockRouter.asPath).toBe(FILTERED_PATHNAME)
    })

    it('should clear filters', async () => {
      mockRouter.push(FILTERED_PATHNAME)
      renderWithProviders(<GameFilters />)
      fireEvent.click(await screen.findByTestId('mobile-clear-filters-button'))
      expect(mockRouter.asPath).toBe(ROUTES.games)
    })
  })

  describe('desktop', () => {
    it('should apply filters', async () => {
      renderWithProviders(<GameFilters />)
      fireEvent.click(
        await screen.findByTestId(
          `desktop-platforms-${SUPER_METROID.platforms.at(0)?.slug}`,
        ),
      )
      fireEvent.click(screen.getByTestId('desktop-apply-filters-button'))
      expect(mockRouter.asPath).toBe(FILTERED_PATHNAME)
    })

    it('should clear filters', async () => {
      mockRouter.push(FILTERED_PATHNAME)
      renderWithProviders(<GameFilters />)
      fireEvent.click(await screen.findByTestId('desktop-clear-filters-button'))
      expect(mockRouter.asPath).toBe(ROUTES.games)
    })
  })
})
