import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { FocusManagement } from '..'

describe('<FocusManagement />', () => {
  it('should add the focus-disabled class when user is clicking', () => {
    render(<FocusManagement />)
    fireEvent.mouseDown(document.body)
    expect(document.documentElement).toHaveClass('focus-disabled')
  })

  it('should remove the focus-disabled class when the user is tabbing', () => {
    render(<FocusManagement />)
    fireEvent.mouseDown(document.body)
    expect(document.documentElement).toHaveClass('focus-disabled')
    fireEvent.keyDown(document.body, { key: 'Tab' })
    expect(document.documentElement).not.toHaveClass('focus-disabled')
  })

  it('should not remove the focus-disabled class when the user is not tabbing', () => {
    render(<FocusManagement />)
    fireEvent.mouseDown(document.body)
    fireEvent.keyDown(document.body, { key: 'Return' })
    expect(document.documentElement).toHaveClass('focus-disabled')
  })
})
