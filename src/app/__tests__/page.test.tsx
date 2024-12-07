import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('<Page />', () => {
  it('should render an h1', () => {
    render(<Page />)
    expect(screen.getByText('Green Quest').tagName).toEqual('H1')
  })
})
