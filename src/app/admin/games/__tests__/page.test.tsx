import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'

import { gamesServer, mockGamesRequestFailure } from '@/test/servers'

import AdminGamesPage from '../page'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<AdminGamesPage />', () => {
  it('should render an h1', async () => {
    const jsx = await AdminGamesPage()
    render(jsx)
    expect(screen.getByTestId('main-heading').tagName).toEqual('H1')
  })

  it('should render a button to create a new game', async () => {
    const jsx = await AdminGamesPage()
    render(jsx)
    expect(screen.getByTestId('new-game-button')).toBeVisible()
  })

  it('should render games', async () => {
    const jsx = await AdminGamesPage()
    render(jsx)
    expect(screen.getByTestId('games')).toBeVisible()
  })

  it('should render a search bar', async () => {
    const jsx = await AdminGamesPage()
    render(jsx)
    expect(screen.getByTestId('searchbar')).toBeVisible()
  })

  it('should render an error message', async () => {
    mockGamesRequestFailure()
    const jsx = await AdminGamesPage()
    render(jsx)
    expect(screen.getByTestId('admin-error-card')).toBeVisible()
  })
})
