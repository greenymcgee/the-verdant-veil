import React from 'react'
import { render, screen } from '@testing-library/react'

import GameShowPageLoading from '../loading'

describe('<GameShowPageLoading />', () => {
  it('should render', () => {
    render(<GameShowPageLoading />)
    expect(screen.getByRole('alert')).toBeVisible()
  })
})
