import React from 'react'
import { render, screen } from '@testing-library/react'

import ForbiddenPage from '../page'

describe('<ForbiddenPage', () => {
  it('should render an h1', () => {
    render(<ForbiddenPage />)
    expect(
      screen.getByText('You are not allowed to visit that page.').tagName,
    ).toEqual('H1')
  })
})
