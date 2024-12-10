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
    expect(
      screen.getByTestId('label-required-star').getAttribute('aria-hidden'),
    ).toEqual('true')
  })
})
