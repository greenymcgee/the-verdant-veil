import React from 'react'
import { render, screen } from '@testing-library/react'

import HomeLayoutErrorBoundary from '../error'

describe('<HomeLayoutErrorBoundary />', () => {
  it('should render', async () => {
    render(<HomeLayoutErrorBoundary error={{} as Error} reset={vi.fn()} />)
    expect(await screen.findByText('Blast! Something went wrong')).toBeVisible()
  })
})
