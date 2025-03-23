import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tabs } from '..'

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
