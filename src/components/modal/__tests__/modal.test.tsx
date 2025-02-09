import React, { createRef } from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/helpers'

import { Modal } from '..'

const ref = createRef<HTMLDialogElement>()
const PROPS: PropsOf<typeof Modal> = {
  Toggle(props) {
    return (
      <button {...props} type="button">
        Toggle
      </button>
    )
  },
  id: 'test',
  ref,
}

describe('<Modal />', () => {
  describe('expanded', () => {
    it('should be true when the menu opens', () => {
      renderWithProviders(<Modal {...PROPS} />)
      fireEvent.click(screen.getByText('Toggle'))
      expect(screen.getByText('Toggle').getAttribute('aria-expanded')).toEqual(
        'true',
      )
    })
  })

  describe('close on outside click', () => {
    it('should close on outside click', async () => {
      renderWithProviders(<Modal {...PROPS} />)
      fireEvent.click(screen.getByText('Toggle'))
      await userEvent.pointer({
        coords: { x: -400 },
        keys: '[MouseLeft]',
        target: screen.getByTestId(PROPS.id),
      })
      await act(async () => {
        await new Promise((resolve) => setTimeout(() => resolve(''), 300))
      })
      expect(screen.getByTestId(PROPS.id)).not.toBeVisible()
    })

    it('should not close on inside click', async () => {
      renderWithProviders(
        <Modal {...PROPS}>
          <div className="p-4">Children</div>
        </Modal>,
      )
      fireEvent.click(screen.getByText('Toggle'))
      fireEvent.click(screen.getByText('Children'))
      await act(async () => {
        await new Promise((resolve) => setTimeout(() => resolve(''), 300))
      })
      expect(screen.getByTestId(PROPS.id)).toBeVisible()
    })
  })
})
