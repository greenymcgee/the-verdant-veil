import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'

import { GameCard } from '.'

const PROPS: PropsOf<typeof GameCard> = {
  game: SUPER_METROID,
  validating: false,
}

describe('<GameCard />', () => {
  it('should render a heading', () => {
    render(<GameCard {...PROPS} />)
    expect(screen.getByTestId('game-card-heading').tagName).toBe('H2')
  })

  it('should render a given heading prop', () => {
    render(<GameCard {...PROPS} headingProps={{ as: 'h3' }} />)
    expect(screen.getByTestId('game-card-heading').tagName).toBe('H3')
  })

  it('should pass headingProps to the heading', () => {
    render(<GameCard {...PROPS} headingProps={{ id: 'heading' }} />)
    expect(screen.getByTestId('game-card-heading')).toHaveAttribute(
      'id',
      'heading',
    )
  })

  it('should render a link to the game', () => {
    render(<GameCard {...PROPS} />)
    expect(screen.getByTestId(`game-${PROPS.game.id}`)).toHaveAttribute(
      'href',
      ROUTES.game(PROPS.game.slug),
    )
  })

  it('should render a focusable link by default', () => {
    render(<GameCard {...PROPS} />)
    expect(screen.getByTestId(`game-${PROPS.game.id}`)).toHaveAttribute(
      'tabindex',
      '0',
    )
  })

  it('should render a non-focusable link when active is false', () => {
    render(<GameCard {...PROPS} active={false} />)
    expect(screen.getByTestId(`game-${PROPS.game.id}`)).toHaveAttribute(
      'tabindex',
      '-1',
    )
  })

  it('should render a non-focusable link when validating is true', () => {
    render(<GameCard {...PROPS} active validating />)
    expect(screen.getByTestId(`game-${PROPS.game.id}`)).toHaveAttribute(
      'tabindex',
      '-1',
    )
  })

  it('should render GameCardPlatforms', () => {
    render(<GameCard {...PROPS} active validating />)
    expect(screen.getByTestId('game-card-platforms')).toBeVisible()
  })

  it('should render the first release date', () => {
    render(<GameCard {...PROPS} active validating />)
    expect(screen.getByTestId('game-first-release-date')).toBeVisible()
  })
})
