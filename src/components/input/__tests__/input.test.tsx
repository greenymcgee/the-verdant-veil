import React from 'react'
import { render, screen } from '@testing-library/react'

import { Input } from '..'
import { BASE_INPUT_CLASSNAMES } from '../constants'

describe('<TextInput />', () => {
  it('should render an input', () => {
    render(<Input data-testid="input" />)
    expect(screen.getByTestId('input').tagName).toEqual('INPUT')
  })

  it('should render the given className', () => {
    render(<Input className="mb-4" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('mb-4')
  })

  it('should render base classes', () => {
    render(<Input data-testid="input" />)
    BASE_INPUT_CLASSNAMES.split(' ').forEach((className) =>
      expect(screen.getByTestId('input')).toHaveClass(className),
    )
  })

  it('should render the given type', () => {
    render(<Input data-testid="input" type="checkbox" />)
    expect(screen.getByTestId('input').getAttribute('type')).toEqual('checkbox')
  })

  it('should render the required prop', () => {
    render(<Input data-testid="input" required />)
    expect(screen.getByTestId('input')).toBeRequired()
  })

  it('should set aria-required with the required prop', () => {
    render(<Input data-testid="input" required />)
    expect(screen.getByTestId('input').getAttribute('aria-required')).toEqual(
      'true',
    )
  })
})
