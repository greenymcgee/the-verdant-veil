import React from 'react'
import { render, screen } from '@testing-library/react'

import HomeLayout from '../layout'

vi.mock('next/font/google', () => ({
  Libre_Baskerville: vi.fn(() => ({})),
  Noto_Sans_JP: vi.fn(() => ({})),
}))

describe('<Layout />', () => {
  it('should render children', () => {
    render(<HomeLayout>Children</HomeLayout>)
    expect(screen.getByText('Children')).toBeVisible()
  })
})
