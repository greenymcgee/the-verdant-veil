import React from 'react'
import { render, screen } from '@testing-library/react'

import { Icon } from '..'

describe('<Icon />', () => {
  it('should render nothing by default', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<Icon />)
    expect(container.firstChild).toBeNull()
  })

  it('should render a magnify icon', () => {
    render(<Icon icon="magnify" />)
    expect(screen.getByTestId('magnify-icon')).toBeVisible()
  })

  it('should render a user icon', () => {
    render(<Icon icon="user" />)
    expect(screen.getByTestId('user-icon')).toBeVisible()
  })

  it('should render a videogame icon', () => {
    render(<Icon icon="videogame" />)
    expect(screen.getByTestId('videogame-icon')).toBeVisible()
  })
})
