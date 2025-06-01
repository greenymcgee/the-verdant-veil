import React from 'react'
import { render, screen } from '@testing-library/react'

import { DEFAULT_BUTTON_DISPLAY_CLASS_NAMES, ROUTES } from '@/constants'

import { LinkTo } from '..'

describe('<LinkTo />', () => {
  it('should render an anchor with an href', () => {
    render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
    expect(screen.getByText('Games').getAttribute('href')).toEqual(ROUTES.games)
  })

  describe('children', () => {
    it('should render children', () => {
      render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
      expect(screen.getByText('Games')).toBeVisible()
    })

    it('should render text', () => {
      render(<LinkTo href={ROUTES.games} text="Text" />)
      expect(screen.getByText('Text')).toBeVisible()
    })
  })

  describe('classNameOverrides', () => {
    it('should render with default display classes', () => {
      render(<LinkTo href="/">Children</LinkTo>)
      expect(screen.getByText('Children')).toHaveClass(
        DEFAULT_BUTTON_DISPLAY_CLASS_NAMES,
      )
    })

    it('should render a given display override', () => {
      render(
        <LinkTo classNameOverrides={{ display: 'block' }} href="/">
          Children
        </LinkTo>,
      )
      const button = screen.getByText('Children')
      expect(button).not.toHaveClass(DEFAULT_BUTTON_DISPLAY_CLASS_NAMES)
      expect(button).toHaveClass('block')
    })
  })

  describe('icons', () => {
    it('should render a left icon', () => {
      render(
        <LinkTo href={ROUTES.games} leftIcon="plus-thick">
          Games
        </LinkTo>,
      )
      expect(screen.getByTestId('plus-thick-icon')).toBeVisible()
    })

    it('should render a right icon', () => {
      render(
        <LinkTo href={ROUTES.games} rightIcon="plus-thick">
          Games
        </LinkTo>,
      )
      expect(screen.getByTestId('plus-thick-icon')).toBeVisible()
    })
  })

  describe('opensNewTab', () => {
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
  })

  describe('styles', () => {
    it('should render the given className', () => {
      render(
        <LinkTo className="mb-4" href={ROUTES.games}>
          Games
        </LinkTo>,
      )
      expect(screen.getByText('Games')).toHaveClass('mb-4')
    })

    it('should render hover styles', () => {
      render(<LinkTo href={ROUTES.games}>Games</LinkTo>)
      expect(screen.getByText('Games')).toHaveClass('hover:opacity-70')
    })
  })

  describe('theme', () => {
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
  })
})
