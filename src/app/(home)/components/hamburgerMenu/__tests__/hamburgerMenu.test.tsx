import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockJwtTokenCookie, renderWithProviders, sleep } from '@/test/helpers'
import { currentUserServer, mockNonAdminUser } from '@/test/servers'

import { HamburgerMenu } from '..'

beforeAll(() => currentUserServer.listen())
afterEach(() => currentUserServer.resetHandlers())
afterAll(() => currentUserServer.close())

describe('<HamburgerMenu />', () => {
  it.each(['Home', 'About'])(
    'should render the main nav menu items',
    async (title) => {
      renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(await screen.findByLabelText('Open Hamburger Menu'))
      expect(screen.getByText(title)).toBeVisible()
    },
  )

  it('should render a close button', async () => {
    renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    fireEvent.click(screen.getByLabelText('Close Hamburger Menu'))
    await act(async () => await sleep(100))
    expect(screen.getByTestId('hamburger-menu')).not.toBeVisible()
  })

  it('should close on outside click', async () => {
    renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    await userEvent.pointer({
      coords: { x: -400 },
      keys: '[MouseLeft]',
      target: screen.getByTestId('hamburger-menu'),
    })
    await act(async () => await sleep(100))
    expect(screen.getByTestId('hamburger-menu')).not.toBeVisible()
  })

  it('should not close on inside click', async () => {
    renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    await userEvent.pointer({
      coords: { y: -400 },
      keys: '[MouseLeft]',
      target: screen.getByRole('navigation'),
    })
    await act(async () => await sleep(100))
    expect(screen.getByTestId('hamburger-menu')).toBeVisible()
  })

  describe('admin link', () => {
    it('should render an admin link for an admin user', async () => {
      mockJwtTokenCookie()
      renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      expect(await screen.findByTestId('mobile-admin-link')).toBeVisible()
    })

    it('should not render an admin link for a basic user', async () => {
      mockNonAdminUser()
      renderWithProviders(<HamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      await act(async () => await sleep(3))
      expect(screen.queryByTestId('mobile-admin-link')).not.toBeInTheDocument()
    })
  })
})
