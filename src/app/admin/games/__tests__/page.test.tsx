import React from 'react'
import { screen } from '@testing-library/dom'

import { renderWithProviders } from '@/test/helpers'

import AdminGamesPage from '../page'

describe('<AdminGamesPage />', () => {
  it('should render an h1', () => {
    renderWithProviders(<AdminGamesPage />)
    expect(screen.getByText('Games').tagName).toEqual('H1')
  })
})
