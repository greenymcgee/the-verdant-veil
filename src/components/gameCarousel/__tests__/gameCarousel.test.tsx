import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

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

  it('should render navigation buttons', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 425,
      writable: true,
    })
    render(<GameCarousel {...PROPS} />)
    expect(screen.getByLabelText('Go to next slide')).toBeVisible()
    expect(screen.getByLabelText('Go to previous slide')).toBeVisible()
  })

  describe('accessibility', () => {
    it.each(CAROUSEL_ATTRIBUTES)(
      'should render a carousel',
      ({ attribute, value }) => {
        render(<GameCarousel {...PROPS} />)
        expect(screen.getByTestId('carousel')).toHaveAttribute(attribute, value)
      },
    )

    it.each(GET_GAMES_RESPONSE_DATA.games)('should render slides', (game) => {
      render(<GameCarousel {...PROPS} />)
      expect(screen.getByTestId(`game-slide-${game.id}`)).toHaveAttribute(
        'aria-roledescription',
        'slide',
      )
    })

    it('should render with keyboard controls', () => {
      render(<GameCarousel {...PROPS} />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      const activeLink = screen.getByTestId(`game-${PROPS.games.at(1)?.id}`)
      expect(activeLink).toHaveAttribute('tabindex', '0')
    })
  })
})
