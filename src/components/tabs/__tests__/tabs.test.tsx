import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tabs } from '..'

const PANELS = [
  { element: <h2>Review</h2>, hash: 'review' },
  { element: <h2>About</h2>, hash: 'about' },
  { element: <h2>Media</h2>, hash: 'media' },
]
const TABS: PropsOf<typeof Tabs>['tabs'] = [
  {
    hash: 'review',
    icon: 'message-draw',
    title: 'Review',
  },
  {
    hash: 'about',
    icon: 'table',
    title: 'About',
  },
  {
    hash: 'media',
    icon: 'image',
    title: 'Media',
  },
]
const PROPS: PropsOf<typeof Tabs> = {
  panels: PANELS,
  tabs: TABS,
}

describe('<Tabs />', () => {
  it('should render the initially focused tab as active', () => {
    vi.stubGlobal('location', { hash: '#about' })
    render(<Tabs {...PROPS} />)
    expect(screen.getByTestId('about-tab')).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('should render the first tab as active by default', () => {
    vi.stubGlobal('location', { hash: undefined })
    render(<Tabs {...PROPS} />)
    expect(screen.getByTestId('review-tab')).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })
})
