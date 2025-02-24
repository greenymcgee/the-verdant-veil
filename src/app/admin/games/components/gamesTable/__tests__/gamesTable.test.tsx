import React from 'react'
import { render, screen } from '@testing-library/react'

import { GAMES } from '@/test/fixtures'
import { gamesServer } from '@/test/servers'

import { GamesTable } from '../gamesTable'

// Just here for the DeleteGameForm
beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GamesTable />', () => {
  it('should render the table', () => {
    render(<GamesTable games={GAMES} query="" showingSkeletons={false} />)
    expect(screen.getByTestId('games-table')).toBeVisible()
  })

  it('should render a message for empty games request', () => {
    render(<GamesTable games={[]} query="" showingSkeletons={false} />)
    expect(screen.getByTestId('empty-games-message')).toBeVisible()
  })
})
