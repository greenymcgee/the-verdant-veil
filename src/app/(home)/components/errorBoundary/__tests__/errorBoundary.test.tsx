import React from 'react'
import { render, screen } from '@testing-library/react'

import { HomeErrorBoundary } from '..'

describe('<HomeErrorBoundary />', () => {
  it('should render', () => {
    render(
      <HomeErrorBoundary
        actionBar={<div>actions</div>}
        activeLinkTitle="Home"
        heading="Heading"
        status={404}
        subtitle="Subtitle"
      />,
    )
    expect(screen.getByText('Heading').tagName).toBe('H1')
  })
})
