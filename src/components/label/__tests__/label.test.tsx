import React from 'react'
import { render, screen } from '@testing-library/react'

import { Label } from '..'

describe('<Label />', () => {
  it('should render a label', () => {
    render(<Label htmlFor="test">Label</Label>)
    expect(screen.getByText('Label').tagName).toEqual('LABEL')
  })

  it('should render a given className', () => {
    render(
      <Label className="mb-4" htmlFor="test">
        Label
      </Label>,
    )
    expect(screen.getByText('Label')).toHaveClass('mb-4')
  })

  it('should render a required star when required is true', () => {
    render(
      <Label htmlFor="test" required>
        Label
      </Label>,
    )
    expect(screen.getByLabelText('required')).toBeVisible()
  })

  describe('classNameOverrides', () => {
    it('render with a default cursor class', () => {
      render(<Label htmlFor="test">Label</Label>)
      expect(screen.getByText('Label')).toHaveClass('cursor-pointer')
    })

    it('render with a given cursor class', () => {
      render(
        <Label classNameOverrides={{ cursor: 'cursor-auto' }} htmlFor="test">
          Label
        </Label>,
      )
      expect(screen.getByText('Label')).not.toHaveClass('cursor-pointer')
      expect(screen.getByText('Label')).toHaveClass('cursor-auto')
    })
  })
})
