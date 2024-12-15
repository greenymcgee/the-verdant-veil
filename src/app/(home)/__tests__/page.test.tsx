import React from 'react'
import { render, screen } from '@testing-library/react'

import HomePage from '../page'


describe('<HomePage />', () => {
  it('should render an h1', () => {
    render(<HomePage />)
    expect(screen.getByText('Green Quest').tagName).toEqual('H1')
  })
})
