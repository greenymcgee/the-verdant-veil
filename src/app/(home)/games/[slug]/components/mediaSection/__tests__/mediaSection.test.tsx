import React from 'react'
import { render, screen } from '@testing-library/react'

import { MediaSection } from '..'

describe('<MediaSection />', () => {
  it('should not render when the count is blank', () => {
    const { container } = render(
      <MediaSection heading="Artworks" itemCount={0} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('should render when the count is present', () => {
    render(<MediaSection heading="Artworks" itemCount={1} />)
    expect(screen.getByTestId('game-artworks')).toBeVisible()
  })
})
