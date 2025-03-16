import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tabs } from '..'

describe('<Tabs />', () => {
  it('should render', () => {
    vi.stubGlobal('location', { hash: '#about' })
    render(
      <Tabs
        tabContents={[
          { element: <div>Review</div>, hash: 'review' },
          { element: <div>About</div>, hash: 'about' },
          { element: <div>Media</div>, hash: 'media' },
        ]}
        tabs={[
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
        ]}
      />,
    )
    expect(screen.getByTestId('tabs')).toBeVisible()
  })
})
