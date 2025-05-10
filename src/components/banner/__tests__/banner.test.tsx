import React from 'react'
import { render, screen } from '@testing-library/react'

import { Banner } from '..'

describe('<Banner />', () => {
  it('should render the message', () => {
    render(<Banner message="Message" />)
    expect(screen.getByRole('alert').textContent).toBe('Message')
  })

  it('should render children', () => {
    render(<Banner>Children</Banner>)
    expect(screen.getByText('Children')).toBeVisible()
  })

  it('should take an As prop', () => {
    render(<Banner as="div">Children</Banner>)
    expect(screen.getByRole('alert').tagName).toBe('DIV')
  })
})
