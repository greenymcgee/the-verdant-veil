import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Modal } from '..'

const ref = createRef<HTMLDialogElement>()
const toggleDialog = vi.fn()
const PROPS: PropsOf<typeof Modal> = {
  Toggle(props) {
    return (
      <button {...props} type="button">
        Toggle
      </button>
    )
  },
  expanded: false,
  id: 'test',
  ref,
  toggleDialog,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('<Modal />', () => {
  it('should pass toggleDialog to the toggle', () => {
    render(<Modal {...PROPS} />)
    fireEvent.click(screen.getByText('Toggle'))
    expect(PROPS.toggleDialog).toHaveBeenCalled()
  })

  it('should pass the expanded prop to the toggle', () => {
    render(<Modal {...PROPS} />)
    expect(screen.getByText('Toggle')).toHaveAttribute('aria-expanded', 'false')
  })

  it('should link the toggle to the dialog', () => {
    render(<Modal {...PROPS} />)
    expect(screen.getByText('Toggle')).toHaveAttribute(
      'aria-controls',
      PROPS.id,
    )
    expect(screen.getByTestId(PROPS.id)).toHaveAttribute('id', PROPS.id)
  })
})
