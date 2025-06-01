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

  describe('classNameOverrides', () => {
    it('render with a display class', () => {
      render(<Spinner />)
      expect(screen.getByRole('alert').parentElement).toHaveClass(
        'flex items-center justify-center',
      )
    })

    it('render with a given display class', () => {
      render(<Spinner classNameOverrides={{ display: 'block' }} />)
      const spinner = screen.getByRole('alert').parentElement
      expect(spinner).not.toHaveClass('flex items-center justify-center')
      expect(spinner).toHaveClass('block')
    })
  })
})
