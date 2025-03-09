import React from 'react'
import { render, screen } from '@testing-library/react'

import { Heading } from '..'

describe('<Heading />', () => {
  it('should render default as an h1', () => {
    render(<Heading>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H1')
  })

  it('should render as the given "as" prop', () => {
    render(<Heading as="h2">Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H2')
  })
})
