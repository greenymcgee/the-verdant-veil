import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { GameCover } from '..'

describe('<GameCover />', () => {
  it('should render a skeleton when isValidating is true', () => {
    render(<GameCover game={SUPER_METROID} isValidating />)
    expect(screen.getByTestId('cover-skeleton')).toBeVisible()
  })

  it('should render the cover when isValidating is false', () => {
    render(<GameCover game={SUPER_METROID} isValidating={false} />)
    expect(screen.getByTestId('game-cover')).toBeVisible()
  })
})
