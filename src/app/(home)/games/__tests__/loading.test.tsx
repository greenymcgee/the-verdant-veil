import React from 'react'
import { render, screen } from '@testing-library/react'

import GamesLoader from '../loading'

describe('<GamesLoader />', () => {
  it('should render', async () => {
    render(<GamesLoader />)
    expect(await screen.findByRole('alert')).toBeVisible()
  })
})
