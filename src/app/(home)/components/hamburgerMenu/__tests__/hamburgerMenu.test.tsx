import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HamburgerMenu } from '..'

describe('<HamburgerMenu />', () => {
  it.each(['Home', 'About', 'Login'])(
    'should render the main nav menu items',
    (title) => {
      render(<HamburgerMenu activeLinkTitle="Home" />)
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      expect(screen.getByText(title)).toBeVisible()
    },
  )

  it('should render a close button', async () => {
    render(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    fireEvent.click(screen.getByLabelText('Close Hamburger Menu'))
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 100))
    })
    expect(screen.getByTestId('hamburger-menu')).not.toBeVisible()
  })

  it('should close on outside click', async () => {
    render(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    await userEvent.pointer({
      coords: { x: -400 },
      keys: '[MouseLeft]',
      target: screen.getByTestId('hamburger-menu'),
    })
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 100))
    })
    expect(screen.getByTestId('hamburger-menu')).not.toBeVisible()
  })

  it('should not close on inside click', async () => {
    render(<HamburgerMenu activeLinkTitle="Home" />)
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    await userEvent.pointer({
      coords: { y: -400 },
      keys: '[MouseLeft]',
      target: screen.getByRole('navigation'),
    })
    await act(async () => {
      await new Promise((resolve) => setTimeout(() => resolve(''), 100))
    })
    expect(screen.getByTestId('hamburger-menu')).toBeVisible()
  })
})
