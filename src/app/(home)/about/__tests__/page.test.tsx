import React from 'react'
import { render, screen } from '@testing-library/react'

import AboutPage from '../page'

describe('<AboutPage />', () => {
  it('should render', async () => {
    render(<AboutPage />)
    expect(await screen.findByTestId('about-page')).toBeVisible()
  })
})
