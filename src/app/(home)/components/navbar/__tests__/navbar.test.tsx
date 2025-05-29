import React from 'react'
import { act, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { mockJwtTokenCookie, renderWithProviders, sleep } from '@/test/helpers'
import { currentUserServer, mockNonAdminUser } from '@/test/servers'

import { Navbar } from '..'

beforeAll(() => currentUserServer.listen())
afterEach(() => currentUserServer.resetHandlers())
afterAll(() => currentUserServer.close())

describe('<Navbar />', () => {
  it('should render a home link', async () => {
    renderWithProviders(<Navbar activeLinkTitle="Home" />)
    const link = await screen.findByLabelText('Home')
    expect(link.getAttribute('href')).toEqual(ROUTES.home)
  })

  it.each(['desktop-home-link', 'desktop-about-link'])(
    'should render desktop main nav links',
    async (id) => {
      renderWithProviders(<Navbar activeLinkTitle="Home" />)
      expect(await screen.findByTestId(id)).toBeVisible()
    },
  )

  it('should render the hamburger menu', async () => {
    renderWithProviders(<Navbar activeLinkTitle="Home" />)
    expect(await screen.findByTestId('hamburger-menu')).toBeInTheDocument()
  })

  describe('admin link', () => {
    it('should render an admin link for an admin user', async () => {
      mockJwtTokenCookie()
      renderWithProviders(<Navbar activeLinkTitle="Home" />)
      expect(await screen.findByTestId('desktop-admin-link')).toBeVisible()
    })

    it('should not render an admin link for a basic user', async () => {
      mockNonAdminUser()
      renderWithProviders(<Navbar activeLinkTitle="Home" />)
      await act(async () => await sleep(3))
      expect(screen.queryByTestId('desktop-admin-link')).not.toBeInTheDocument()
    })
  })
})
