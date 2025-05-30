import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'

import AuthLayout from '../layout'

describe('<AuthLayout />', () => {
  it('should render an h1', () => {
    render(<AuthLayout />)
    expect(screen.getByText('The Verdant Veil').tagName).toEqual('H1')
  })

  it('should render a home link', () => {
    render(<AuthLayout />)
    expect(screen.getByLabelText('Home').getAttribute('href')).toEqual(
      ROUTES.home,
    )
  })
})
