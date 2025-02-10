import React from 'react'
import { screen } from '@testing-library/dom'

import { ROUTES } from '@/constants'
import { GAMES } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { Games } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<Games />', () => {
  it.each(GAMES)('should render a game link', ({ name, slug }) => {
    renderWithProviders(<Games games={GAMES} />)
    expect(screen.getByText(name).getAttribute('href')).toEqual(
      ROUTES.adminGame(slug),
    )
  })

  it.each(GAMES)('should render an edit game link', ({ name, slug }) => {
    renderWithProviders(<Games games={GAMES} />)
    expect(screen.getByLabelText(`Edit ${name}`).getAttribute('href')).toEqual(
      ROUTES.adminEditGame(slug),
    )
  })

  it.each(GAMES)('should render a destroy game button', ({ name }) => {
    renderWithProviders(<Games games={GAMES} />)
    expect(screen.getByLabelText(`Delete ${name}`)).toBeVisible()
  })
})
