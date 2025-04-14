import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { GameCover } from '..'

describe('<GameCover />', () => {
  it('should render a skeleton when validating is true', () => {
    render(<GameCover game={SUPER_METROID} validating />)
    expect(screen.getByTestId('cover-skeleton')).toBeVisible()
  })

  it('should render the cover when validating is false', () => {
    render(<GameCover game={SUPER_METROID} validating={false} />)
    expect(screen.getByTestId('game-cover')).toBeVisible()
  })
})
