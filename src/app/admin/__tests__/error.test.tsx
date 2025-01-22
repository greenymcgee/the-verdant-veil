import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import AdminErrorBoundary from '../error'

const reset = vi.fn()

afterEach(() => vi.clearAllMocks())

describe('<AdminErrorBoundary />', () => {
  it('should render the error', () => {
    render(<AdminErrorBoundary error={Error('whoops')} reset={reset} />)
    expect(screen.getByText('whoops')).toBeVisible()
  })

  it('should call reset on click', () => {
    render(<AdminErrorBoundary error={Error('whoops')} reset={reset} />)
    fireEvent.click(screen.getByText('Try Again'))
    expect(reset).toHaveBeenCalled()
  })
})
