import React, { createRef } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HamburgerMenu } from '..'

const ref = createRef<HTMLDialogElement>()

describe('<HamburgerMenu />', () => {
  describe('expanded', () => {
    it('should be true when the menu opens', () => {
      render(
        <HamburgerMenu ref={ref}>
          <nav>Hamburger</nav>
        </HamburgerMenu>,
      )
      fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
      expect(
        screen
          .getByLabelText('Open Hamburger Menu')
          .getAttribute('aria-expanded'),
      ).toEqual('true')
    })
  })

  describe('close on outside click', () => {
    it('should close on outside click', async () => {
      render(
        <HamburgerMenu ref={ref}>
          <nav>Hamburger</nav>
        </HamburgerMenu>,
      )
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
      render(
        <HamburgerMenu ref={ref}>
          <nav>Hamburger</nav>
        </HamburgerMenu>,
      )
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
})
