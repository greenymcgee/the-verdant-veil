import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { GameCardCover } from '..'

describe('<GameCardCover />', () => {
  it('should render a skeleton when validating is true', () => {
    render(<GameCardCover game={SUPER_METROID} validating variant="list" />)
    expect(screen.getByTestId('cover-skeleton')).toBeVisible()
  })

  it('should render the cover when validating is false', () => {
    render(
      <GameCardCover game={SUPER_METROID} validating={false} variant="list" />,
    )
    expect(screen.getByTestId('game-cover')).toBeVisible()
  })
})
