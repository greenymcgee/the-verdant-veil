import React from 'react'
import { render, screen } from '@testing-library/react'

import HomeLayoutErrorBoundary from '../error'

describe('<HomeLayoutErrorBoundary />', () => {
  it('should render', () => {
    render(<HomeLayoutErrorBoundary error={{} as Error} reset={vi.fn()} />)
    expect(screen.getByText('Blast! Something went wrong')).toBeVisible()
  })
})
