import React from 'react'
import { render, screen } from '@testing-library/react'

import { HTMLParser } from '..'

describe('<HTMLParser />', () => {
  it('should render the given HTML', () => {
    const html = '<p>Hello</p>'
    render(<HTMLParser html={html} />)
    expect(screen.getByText('Hello')).toBeVisible()
  })
})
