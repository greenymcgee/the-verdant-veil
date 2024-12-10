import React from 'react'
import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'

import { LinkTo } from '..'

describe('<LinkTo />', () => {
  it('should render an anchor with an href', () => {
    render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
    expect(screen.getByText('Games').getAttribute('href')).toEqual(ROUTES.games)
  })

  it('should render target when opensNewTab is true', () => {
    render(
      <LinkTo href={ROUTES.games} opensNewTab>
        Games
      </LinkTo>,
    )
    expect(screen.getByText('Games').getAttribute('target')).toEqual('_blank')
  })

  it('should render rel when opensNewTab is true', () => {
    render(
      <LinkTo href={ROUTES.games} opensNewTab>
        Games
      </LinkTo>,
    )
    expect(screen.getByText('Games').getAttribute('rel')).toEqual(
      'noopener noreferrer',
    )
  })

  it('should render the given className', () => {
    render(
      <LinkTo className="mb-4" href={ROUTES.games}>
        Games
      </LinkTo>,
    )
    expect(screen.getByText('Games')).toHaveClass('mb-4')
  })

  it('should render with a default theme', () => {
    render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
    expect(screen.getByText('Games')).toHaveClass('text-primary-800')
  })

  it('should render with a given theme', () => {
    render(
      <LinkTo href={ROUTES.games} theme="secondary">
        Games
      </LinkTo>,
    )
    expect(screen.getByText('Games')).toHaveClass('text-secondary-800')
  })

  it('should render hover and focus styles', () => {
    render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
    expect(screen.getByText('Games')).toHaveClass(
      'hover:opacity-70 focus:opacity-70',
    )
  })
})
