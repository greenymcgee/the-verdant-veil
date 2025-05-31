import React from 'react'
import { render, screen } from '@testing-library/react'

import NotFoundPage from '../not-found'

describe('<NotFoundPage />', () => {
  it('should render', async () => {
    render(<NotFoundPage />)
    expect(
      await screen.findByText("Whoops, I couldn't find that one"),
    ).toBeVisible()
  })
})
