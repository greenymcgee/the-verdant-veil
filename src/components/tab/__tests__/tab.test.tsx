import React from 'react'
import { render, screen } from '@testing-library/react'

import { Tab } from '..'

const PROPS: PropsOf<typeof Tab> = {
  active: false,
  hash: 'about',
  icon: 'edit',
  title: 'About',
}

describe('<Tab />', () => {
  it('should render with an aria-controls attribute', () => {
    render(
      <ul>
        <Tab {...PROPS} />
      </ul>,
    )
    expect(screen.getByTestId('about-tab')).toHaveAttribute(
      'aria-controls',
      'about-tabpanel',
    )
  })

  it('should render with an aria-selected attribute', () => {
    render(
      <ul>
        <Tab {...PROPS} />
      </ul>,
    )
    expect(screen.getByTestId('about-tab')).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('should render with an id attribute', () => {
    render(
      <ul>
        <Tab {...PROPS} />
      </ul>,
    )
    expect(screen.getByTestId('about-tab')).toHaveAttribute('id', 'about-tab')
  })

  it('should render with a tabindex attribute', () => {
    render(
      <ul>
        <Tab {...PROPS} />
      </ul>,
    )
    expect(screen.getByTestId('about-tab')).toHaveAttribute('tabindex', '-1')
  })
})
