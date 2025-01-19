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

  it('should render a filter-alt icon', () => {
    render(<Icon icon="filter-alt" />)
    expect(screen.getByTestId('filter-alt-icon')).toBeVisible()
  })

  it('should render a image icon', () => {
    render(<Icon icon="image" />)
    expect(screen.getByTestId('image-icon')).toBeVisible()
  })

  it('should render a magnify icon', () => {
    render(<Icon icon="magnify" />)
    expect(screen.getByTestId('magnify-icon')).toBeVisible()
  })

  it('should render message-draw icon', () => {
    render(<Icon icon="message-draw" />)
    expect(screen.getByTestId('message-draw-icon')).toBeVisible()
  })

  it('should render message-draw icon', () => {
    render(<Icon icon="message-draw" />)
    expect(screen.getByTestId('message-draw-icon')).toBeVisible()
  })

  it('should render an outline-filter-alt icon', () => {
    render(<Icon icon="outline-filter-alt" />)
    expect(screen.getByTestId('outline-filter-alt-icon')).toBeVisible()
  })

  it('should render round-plus icon', () => {
    render(<Icon icon="round-plus" />)
    expect(screen.getByTestId('round-plus-icon')).toBeVisible()
  })

  it('should render round-sort icon', () => {
    render(<Icon icon="round-sort" />)
    expect(screen.getByTestId('round-sort-icon')).toBeVisible()
  })

  it('should render a table icon', () => {
    render(<Icon icon="table" />)
    expect(screen.getByTestId('table-icon')).toBeVisible()
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
