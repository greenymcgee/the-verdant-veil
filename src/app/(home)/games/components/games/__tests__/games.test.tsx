import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { GET_GAMES_RESPONSE_DATA } from '@/test/fixtures'

import { Games } from '..'

describe('<Games />', () => {
  it.each(GET_GAMES_RESPONSE_DATA.games)(
    'should render a game link',
    (game) => {
      render(
        <Games games={GET_GAMES_RESPONSE_DATA.games} isValidating={false} />,
      )
      expect(screen.getByTestId(`game-${game.id}`)).toHaveAttribute(
        'href',
        ROUTES.game(game.slug),
      )
    },
  )
})
