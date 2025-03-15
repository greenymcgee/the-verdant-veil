import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { GamePage } from '..'

describe('<GamePage />', () => {
  it('should render a GameHeader', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('game-header')).toBeVisible()
  })

  it('should render a GreenQuestRating', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('green-quest-rating')).toBeVisible()
  })

  it('should render a Genres CSVList', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('genres-csv-list')).toBeVisible()
  })

  it('should render a Platforms CSVList', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('platforms-csv-list')).toBeVisible()
  })

  it('should render the game summary', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('game-summary')).toBeVisible()
  })
})
