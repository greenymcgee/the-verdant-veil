import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'

import { mockJwtTokenCookie, renderWithProviders, sleep } from '@/test/helpers'
import { currentUserServer, mockNonAdminUser } from '@/test/servers'

import { HomeNavbarHamburgerMenu } from '..'

beforeAll(() => currentUserServer.listen())
afterEach(() => currentUserServer.resetHandlers())
afterAll(() => currentUserServer.close())

describe('<HomeNavbarHamburgerMenu />', () => {
  it.each(['Home', 'About'])(
    'should render the main nav menu items',
    async (title) => {
      renderWithProviders(<HomeNavbarHamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(await screen.findByLabelText('Open Hamburger Menu'))
      expect(screen.getByText(title)).toBeVisible()
    },
  )

  it('should render a close button', async () => {
    renderWithProviders(<HomeNavbarHamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    fireEvent.click(screen.getByLabelText('Close Hamburger Menu'))
    await act(async () => await sleep(100))
    expect(screen.getByTestId('hamburger-menu')).not.toBeVisible()
  })

  describe('admin link', () => {
    it('should render an admin link for an admin user', async () => {
      mockJwtTokenCookie()
      renderWithProviders(<HomeNavbarHamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      expect(await screen.findByTestId('mobile-admin-link')).toBeVisible()
    })

    it('should not render an admin link for a basic user', async () => {
      mockNonAdminUser()
      renderWithProviders(<HomeNavbarHamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      await act(async () => await sleep(3))
      expect(screen.queryByTestId('mobile-admin-link')).not.toBeInTheDocument()
    })
  })
})
