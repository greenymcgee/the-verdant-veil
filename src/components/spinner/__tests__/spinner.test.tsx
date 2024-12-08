import React from 'react'
import { render, screen } from '@testing-library/react'

import { Spinner } from '..'

describe('<Spinner />', () => {
  it('should render with default props', () => {
    render(<Spinner />)
    expect(screen.getByRole('alert').classList.contains('primary')).toEqual(
      true,
    )
  })

  it('should render with given props', () => {
    render(<Spinner theme="secondary" />)
    expect(screen.getByRole('alert').classList.contains('secondary')).toEqual(
      true,
    )
  })
})
