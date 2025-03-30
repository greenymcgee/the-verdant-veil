import React from 'react'
import { render, screen } from '@testing-library/react'

import { ValidatingGamesAlert } from '..'

describe('<ValidatingGamesAlert />', () => {
  it('should not render when isValidating is false', () => {
    const { container } = render(<ValidatingGamesAlert isValidating={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render when isValidating is true', () => {
    render(<ValidatingGamesAlert isValidating />)
    expect(screen.getByRole('alert')).toBeVisible()
  })
})
