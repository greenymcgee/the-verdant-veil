import React from 'react'
import { render, screen } from '@testing-library/react'

import { TabPanel } from '..'

afterEach(() => vi.stubGlobal('location', { hash: '' }))

const PROPS: PropsOf<typeof TabPanel> = {
  hash: 'about',
}

describe('<TabPanel />', () => {
  it('should render with an aria-labelledby attribute', () => {
    render(<TabPanel {...PROPS} />)
    expect(screen.getByTestId('about-tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'about-tab',
    )
  })

  it('should render with an id attribute', () => {
    render(<TabPanel {...PROPS} />)
    expect(screen.getByTestId('about-tabpanel')).toHaveAttribute(
      'id',
      'about-tabpanel',
    )
  })

  it('should be hidden when the currentHash is not set and defaultActive is false', () => {
    render(<TabPanel {...PROPS} />)
    expect(screen.getByRole('tabpanel', { hidden: true })).toBeInTheDocument()
  })

  it('should be hidden when the currentHash does not match the given hash', () => {
    vi.stubGlobal('location', { hash: '#nothing' })
    render(<TabPanel {...PROPS} />)
    expect(screen.getByRole('tabpanel', { hidden: true })).toBeInTheDocument()
  })

  it('should not be hidden when defaultActive is true and a hash is not present', () => {
    render(<TabPanel {...PROPS} defaultActive />)
    expect(screen.getByRole('tabpanel', { hidden: false })).toBeInTheDocument()
  })

  it('should not be hidden when the current hash matches the given hash', () => {
    vi.stubGlobal('location', { hash: `#${PROPS.hash}` })
    render(<TabPanel {...PROPS} />)
    expect(screen.getByRole('tabpanel', { hidden: false })).toBeInTheDocument()
  })
})
