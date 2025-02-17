import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { ROUTES } from '@/constants'
import {
  renderWithProviders,
  signInAdminUser,
  signInBasicUser,
} from '@/test/helpers'

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

  describe('admin link', () => {
    it('should render an admin link for an admin user', async () => {
      await signInAdminUser()
      renderWithProviders(<Navbar activeLinkTitle="Home" />)
      await waitFor(() =>
        expect(screen.getByTestId('desktop-admin-link')).toBeVisible(),
      )
    })

    it('should not render an admin link for a basic user', async () => {
      await signInBasicUser()
      renderWithProviders(<Navbar activeLinkTitle="Home" />)
      await waitFor(
        () => new Promise((resolve) => setTimeout(() => resolve(''), 3)),
      )
      expect(screen.queryByTestId('desktop-admin-link')).not.toBeInTheDocument()
    })
  })
})
