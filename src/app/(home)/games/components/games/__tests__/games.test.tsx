import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { GET_GAMES_RESPONSE_DATA } from '@/test/fixtures'

import { Games } from '..'

const PROPS: PropsOf<typeof Games> = {
  games: GET_GAMES_RESPONSE_DATA.games,
  isValidating: false,
  query: undefined,
}

describe('<Games />', () => {
  it.each(GET_GAMES_RESPONSE_DATA.games)(
    'should render a game link',
    (game) => {
      render(<Games {...PROPS} />)
      expect(screen.getByTestId(`game-${game.id}`)).toHaveAttribute(
        'href',
        ROUTES.game(game.slug),
      )
    },
  )

  it('should render and empty games message', () => {
    render(<Games {...PROPS} games={[]} />)
    expect(screen.getByTestId('empty-games-message')).toBeVisible()
  })
})
