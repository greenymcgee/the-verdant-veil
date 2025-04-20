import React from 'react'
import { render, screen } from '@testing-library/react'

import { gameFactory } from '@/test/factories'

import { GameHeader } from '../header'

describe('<GameHeader />', () => {
  it('should handle a null release date gracefully', () => {
    render(<GameHeader game={gameFactory.build({ firstReleaseDate: '' })} />)
    expect(screen.queryByTestId('first-release-date')).not.toBeInTheDocument()
  })

  it('should render the firstReleaseDate when present', () => {
    render(
      <GameHeader
        game={gameFactory.build({ firstReleaseDate: '1999-11-18T00:00' })}
      />,
    )
    expect(screen.queryByTestId('first-release-date')).toBeVisible()
  })
})
