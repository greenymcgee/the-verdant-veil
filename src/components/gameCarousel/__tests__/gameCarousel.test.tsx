import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { GET_GAMES_RESPONSE_DATA } from '@/test/fixtures'

import { GameCarousel } from '..'

const PROPS: PropsOf<typeof GameCarousel> = {
  allResultsLink: ROUTES.games,
  games: GET_GAMES_RESPONSE_DATA.games,
  loading: false,
  title: 'SNES',
  validating: false,
}
const HEADING_ID = `${PROPS.title.toLocaleLowerCase()}-heading`
const CAROUSEL_ATTRIBUTES = [
  { attribute: 'aria-labelledby', value: HEADING_ID },
  { attribute: 'aria-roledescription', value: 'carousel' },
  { attribute: 'role', value: 'region' },
]

describe('<GameCarousel />', () => {
  it('should render a heading', () => {
    render(<GameCarousel {...PROPS} />)
    expect(screen.getByText(PROPS.title)).toHaveAttribute('id', HEADING_ID)
  })

  it('should render a spinner while loading is true', () => {
    render(<GameCarousel {...PROPS} loading />)
    expect(screen.getByRole('alert')).toBeVisible()
  })

  describe('aria attributes', () => {
    it.each(CAROUSEL_ATTRIBUTES)(
      'should render a carousel',
      ({ attribute, value }) => {
        render(<GameCarousel {...PROPS} />)
        expect(screen.getByTestId('carousel')).toHaveAttribute(attribute, value)
      },
    )

    it('should render a previous button', () => {
      render(<GameCarousel {...PROPS} />)
      expect(screen.getByTestId('previous-slide-button')).toHaveAttribute(
        'aria-label',
        'Go to previous slide',
      )
    })

    it('should render a next button', () => {
      render(<GameCarousel {...PROPS} />)
      expect(screen.getByTestId('next-slide-button')).toHaveAttribute(
        'aria-label',
        'Go to next slide',
      )
    })

    it.each(GET_GAMES_RESPONSE_DATA.games)('should render slides', (game) => {
      render(<GameCarousel {...PROPS} />)
      expect(screen.getByTestId(`game-slide-${game.id}`)).toHaveAttribute(
        'aria-roledescription',
        'slide',
      )
    })
  })
})
