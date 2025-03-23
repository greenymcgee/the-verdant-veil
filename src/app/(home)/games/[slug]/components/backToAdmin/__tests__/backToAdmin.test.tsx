import React from 'react'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { BackToAdmin } from '..'

beforeEach(() => mockRouter.push('/'))

describe('<BackToAdmin />', () => {
  it('should not render for non-preview route', () => {
    mockRouter.push('/nothing')
    render(<BackToAdmin slug="test" />)
    expect(screen.queryByText('Back to Admin')).not.toBeInTheDocument()
  })

  it('should render for a preview rout', () => {
    mockRouter.push('/preview')
    render(<BackToAdmin slug="test" />)
    expect(screen.queryByText('Back to Admin')).toBeVisible()
  })
})
