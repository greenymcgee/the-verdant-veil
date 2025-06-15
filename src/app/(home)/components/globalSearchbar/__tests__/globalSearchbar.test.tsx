import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { GET_QUERIED_GAMES_RESPONSE_DATA } from '@/test/fixtures'
import { getApiUrl, renderWithProviders } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { GlobalSearchbar } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GlobalSearchbar />', () => {
  it('should render a search message when query is null', () => {
    renderWithProviders(<GlobalSearchbar />)
    expect(screen.getByTestId('global-searchbar-placeholder')).toBeVisible()
  })

  it('should render an message when the query is set and games are empty', async () => {
    gamesServer.use(
      http.get(getApiUrl('games'), () => HttpResponse.json({ games: [] })),
    )
    renderWithProviders(<GlobalSearchbar />)
    await userEvent.type(screen.getByLabelText('Search by Name'), 'ted')
    expect(
      await screen.findByTestId('global-searchbar-empty message'),
    ).toBeVisible()
  })

  it.each(GET_QUERIED_GAMES_RESPONSE_DATA.games)(
    'should render searched games',
    async (game) => {
      renderWithProviders(<GlobalSearchbar />)
      await userEvent.type(screen.getByLabelText('Search by Name'), 'ted')
      fireEvent.click(await screen.findByTestId(`searched-game-${game.id}`))
      expect(mockRouter.pathname).toEqual(ROUTES.game(game.slug))
      expect(screen.getByTestId('searchbar-see-all-link')).toBeVisible()
    },
  )

  it('should render a clear button', async () => {
    renderWithProviders(<GlobalSearchbar />)
    await userEvent.type(screen.getByLabelText('Search by Name'), 'ted')
    fireEvent.click(await screen.findByTestId('searchbar-clear-button'))
    expect(screen.queryByText('ted')).not.toBeInTheDocument()
  })

  it('should push to search results on enter pressed', async () => {
    renderWithProviders(<GlobalSearchbar />)
    const searchbar = screen.getByLabelText('Search by Name')
    await userEvent.type(searchbar, 'ted{enter}')
    expect(mockRouter.asPath).toBe(`${ROUTES.games}?query=ted`)
  })
})
