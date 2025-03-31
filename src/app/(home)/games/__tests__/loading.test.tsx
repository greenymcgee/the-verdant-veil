import React from 'react'
import { render, screen } from '@testing-library/react'

import GamesLoader from '../loading'

describe('<GamesLoader />', () => {
  it('should render', () => {
    render(<GamesLoader />)
    expect(screen.getByRole('alert')).toBeVisible()
  })
})
