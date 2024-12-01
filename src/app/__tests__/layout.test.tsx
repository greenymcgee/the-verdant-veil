import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from '../layout'

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({})),
}))

describe('<Layout />', () => {
  it('should render', () => {
    render(<Layout>Children</Layout>)
    expect(screen.getByText('Children')).toBeVisible()
  })
})
