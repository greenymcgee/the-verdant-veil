import React from 'react'
import { render, screen } from '@testing-library/react'

import GameShowLoader from '../loading'

describe('<GameShowLoader />', () => {
  it('should render', () => {
    render(<GameShowLoader />)
    expect(screen.getByRole('alert')).toBeVisible()
  })
})
