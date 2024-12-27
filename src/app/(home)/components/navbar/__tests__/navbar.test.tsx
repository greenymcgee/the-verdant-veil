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

  it.each(['desktop-home-link', 'desktop-about-link', 'desktop-login-link'])(
    'should render desktop main nav links',
    (id) => {
      render(<Navbar activeLinkTitle="Home" />)
      expect(screen.getByTestId(id)).toBeVisible()
    },
  )

  it('should render the hamburger menu', () => {
    render(<Navbar activeLinkTitle="Home" />)
    expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument()
  })
})
