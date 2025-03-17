import React from 'react'
import { render, screen } from '@testing-library/react'

import { TabPanel } from '..'

const PROPS: PropsOf<typeof TabPanel> = {
  active: false,
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
})
