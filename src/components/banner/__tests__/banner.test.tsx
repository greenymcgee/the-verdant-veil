import React from 'react'
import { render, screen } from '@testing-library/react'

import { Banner } from '..'

describe('<Banner />', () => {
  it('should render the message', () => {
    render(<Banner message="Message" />)
    expect(screen.getByRole('alert').textContent).toBe('Message')
  })
})
