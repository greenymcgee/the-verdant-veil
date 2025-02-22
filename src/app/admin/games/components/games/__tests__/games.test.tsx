import React from 'react'
import { screen, waitForElementToBeRemoved } from '@testing-library/dom'

import { ROUTES } from '@/constants'
import { GET_GAMES_RESPONSE_DATA } from '@/test/fixtures'
import { renderWithProviders } from '@/test/helpers'
import { gamesServer } from '@/test/servers'

import { Games } from '..'

const PROPS: PropsOf<typeof Games> = { fallbackTotalPages: 24 }

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<Games />', () => {
  it.each(GET_GAMES_RESPONSE_DATA.games)(
    'should render a game link',
    async ({ name, slug }) => {
      renderWithProviders(<Games {...PROPS} />)
      await waitForElementToBeRemoved(() => screen.getByRole('alert'))
      expect(screen.getByText(name).getAttribute('href')).toEqual(
        ROUTES.adminGame(slug),
      )
    },
  )

  it.each(GET_GAMES_RESPONSE_DATA.games)(
    'should render an edit game link',
    async ({ name, slug }) => {
      renderWithProviders(<Games {...PROPS} />)
      await waitForElementToBeRemoved(() => screen.getByRole('alert'))
      expect(
        screen.getByLabelText(`Edit ${name}`).getAttribute('href'),
      ).toEqual(ROUTES.adminEditGame(slug))
    },
  )

  it.each(GET_GAMES_RESPONSE_DATA.games)(
    'should render a destroy game button',
    async ({ name }) => {
      renderWithProviders(<Games {...PROPS} />)
      await waitForElementToBeRemoved(() => screen.getByRole('alert'))
      expect(screen.getByLabelText(`Delete ${name}`)).toBeVisible()
    },
  )
})
