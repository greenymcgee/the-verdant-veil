import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import AdminErrorBoundary from '../error'

const reset = vi.fn()

afterEach(() => vi.clearAllMocks())

describe('<AdminErrorBoundary />', () => {
  it('should render an h1', () => {
    render(<AdminErrorBoundary error={Error('whoops')} reset={reset} />)
    expect(screen.getByText('Whoops! Something went wrong').tagName).toEqual(
      'H1',
    )
  })

  it('should call reset on click', () => {
    render(<AdminErrorBoundary error={Error('whoops')} reset={reset} />)
    fireEvent.click(screen.getByText('Try Again'))
    expect(reset).toHaveBeenCalled()
  })
})
