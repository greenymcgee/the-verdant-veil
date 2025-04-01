import React from 'react'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import { GamesContainer } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GamesContainer />', () => {
  describe('failure', () => {
    it('should render an message upon failure', async () => {
      mockGamesRequestFailure()
      render(<GamesContainer fallbackTotalPages={2} />)
      const errorMessage = await screen.findByTestId('games-error')
      expect(errorMessage).toBeVisible()
    })
  })

  describe('empty games cache', () => {
    it('should render a loader', () => {
      render(<GamesContainer fallbackTotalPages={2} />)
      expect(screen.getByRole('alert')).toBeVisible()
    })
  })

  it('should render games', () => {
    render(<GamesContainer fallbackTotalPages={2} />)
    expect(screen.getByTestId('games')).toBeVisible()
  })

  it('should render pagination', () => {
    render(<GamesContainer fallbackTotalPages={2} />)
    expect(screen.getAllByTestId('games-pagination').length).toBe(2)
  })

  it('should render a search result as the heading', async () => {
    mockRouter.push(`${ROUTES.games}?query=zelda`)
    render(<GamesContainer fallbackTotalPages={2} />)
    const heading = await screen.findByText('Results for "zelda"')
    expect(heading.tagName).toBe('H1')
  })
})
