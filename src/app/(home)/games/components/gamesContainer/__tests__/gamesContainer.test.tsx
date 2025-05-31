import React from 'react'
import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { renderWithProviders } from '@/test/helpers'
import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import { GamesContainer } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GamesContainer />', () => {
  describe('failure', () => {
    it('should render an message upon failure', async () => {
      mockGamesRequestFailure()
      renderWithProviders(<GamesContainer fallbackTotalPages={2} />)
      const errorMessage = await screen.findByTestId('games-error')
      expect(errorMessage).toBeVisible()
    })
  })

  describe('empty games cache', () => {
    it('should render a loader', () => {
      renderWithProviders(<GamesContainer fallbackTotalPages={2} />)
      expect(screen.getByRole('alert')).toBeVisible()
    })
  })

  it('should render games', async () => {
    renderWithProviders(<GamesContainer fallbackTotalPages={2} />)
    expect(await screen.findByTestId('games')).toBeVisible()
  })

  it('should render pagination', async () => {
    renderWithProviders(<GamesContainer fallbackTotalPages={2} />)
    const elements = await screen.findAllByTestId('games-pagination')
    expect(elements.length).toBe(2)
  })

  it('should render a search result as the heading', async () => {
    mockRouter.push(`${ROUTES.games}?query=zelda`)
    renderWithProviders(<GamesContainer fallbackTotalPages={2} />)
    const heading = await screen.findByText('Results for "zelda"')
    expect(heading.tagName).toBe('H1')
  })
})
