import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'

import { Navbar } from '..'

describe('<Navbar />', () => {
  it('should render a home link', () => {
    render(<Navbar activeLinkTitle="Home" />)
    expect(screen.getByLabelText('Home').getAttribute('href')).toEqual(
      ROUTES.home,
    )
  })

  it('should render a link to the Home page', () => {
    render(<Navbar activeLinkTitle="Home" />)
    expect(screen.getByText('Home').getAttribute('href')).toEqual(ROUTES.home)
  })

  it('should render a link to the About page', () => {
    render(<Navbar activeLinkTitle="Home" />)
    expect(screen.getByText('About').getAttribute('href')).toEqual(ROUTES.about)
  })

  it('should render a link to the Login page', () => {
    render(<Navbar activeLinkTitle="Home" />)
    expect(screen.getByText('Login').getAttribute('href')).toEqual(ROUTES.login)
  })
})
