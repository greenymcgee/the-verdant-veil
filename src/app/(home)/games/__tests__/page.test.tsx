import { render, screen } from '@testing-library/react'

import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import GamesPage from '../page'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GamesPage />', () => {
  it('should render an error boundary when an error is present', async () => {
    mockGamesRequestFailure()
    const jsx = await GamesPage()
    render(jsx)
    const errorBoundary = await screen.findByTestId('games-error')
    expect(errorBoundary).toBeVisible()
  })

  it('should render games', async () => {
    const jsx = await GamesPage()
    render(jsx)
    const games = await screen.findByTestId('games-container')
    expect(games).toBeVisible()
  })
})
