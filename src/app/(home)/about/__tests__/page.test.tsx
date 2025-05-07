import React from 'react'
import { render, screen } from '@testing-library/react'

import AboutPage from '../page'

describe('<AboutPage />', () => {
  it('should render', () => {
    render(<AboutPage />)
    expect(screen.getByTestId('about-page')).toBeVisible()
  })
})
