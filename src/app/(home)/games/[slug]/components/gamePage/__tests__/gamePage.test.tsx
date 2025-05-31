import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { GamePage } from '..'

describe('<GamePage />', () => {
  it('should render a GameHeader', async () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(await screen.findByTestId('game-header')).toBeVisible()
  })

  it('should render a VerdantVeilRating', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('verdant-veil-rating')).toBeVisible()
  })

  it('should render the estimated first played date', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('estimated-first-played-date')).toBeVisible()
  })

  it('should render the last played date', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('last-played-date')).toBeVisible()
  })

  it('should render the game summary', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('game-summary')).toBeVisible()
  })

  it('should render tabs', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('tabs')).toBeVisible()
  })

  it('should render the review tab', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('game-review')).toBeInTheDocument()
  })

  it('should render the about tab', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('about-game')).toBeInTheDocument()
  })

  it('should render the media tab', () => {
    render(<GamePage game={SUPER_METROID} />)
    expect(screen.getByTestId('game-videos')).toBeInTheDocument()
  })
})
