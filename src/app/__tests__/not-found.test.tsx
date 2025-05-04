import React from 'react'
import { render, screen } from '@testing-library/react'

import NotFoundPage from '../not-found'

describe('<NotFoundPage />', () => {
  it('should render', () => {
    render(<NotFoundPage />)
    expect(screen.getByText("Whoops, I couldn't find that one")).toBeVisible()
  })
})
