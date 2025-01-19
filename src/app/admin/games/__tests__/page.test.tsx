import React from 'react'
import { screen, waitForElementToBeRemoved } from '@testing-library/dom'

import { ROUTES } from '@/constants'
import { renderWithProviders } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import AdminGamesPage from '../page'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<AdminGamesPage />', () => {
  it('should render an h1', () => {
    renderWithProviders(<AdminGamesPage />)
    expect(screen.getByText('Games').tagName).toEqual('H1')
  })

  it('should render a link to create a new game', () => {
    renderWithProviders(<AdminGamesPage />)
    expect(screen.getByTestId('new-game-link').getAttribute('href')).toEqual(
      ROUTES.adminNewGame,
    )
  })

  it('should render games', async () => {
    renderWithProviders(<AdminGamesPage />)
    await waitForElementToBeRemoved(() => screen.getByRole('alert'))
    expect(screen.getByTestId('games')).toBeVisible()
  })

  it('should render a search bar', async () => {
    renderWithProviders(<AdminGamesPage />)
    await waitForElementToBeRemoved(() => screen.getByRole('alert'))
    expect(screen.getByTestId('searchbar')).toBeVisible()
  })
})
