import React from 'react'
import { render, screen } from '@testing-library/react'

import { EmptyGamesCard } from '..'

describe('<EmptyGamesCard />', () => {
  it('should render with query copy', () => {
    render(<EmptyGamesCard query="query" />)
    expect(
      screen.getByText(
        `We couldn't find any games matching "query". Please try refining your search.`,
      ),
    ).toBeVisible()
  })

  it('should render with default copy', () => {
    render(<EmptyGamesCard query={undefined} />)
    expect(
      screen.getByText(
        'No games matching the given criteria were able to be found.',
      ),
    ).toBeVisible()
  })
})
