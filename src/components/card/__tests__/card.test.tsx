import React from 'react'
import { render, screen } from '@testing-library/react'

import { Card } from '..'

describe('<Card />', () => {
  describe('as', () => {
    it('should render with a default', () => {
      render(<Card data-testid="card" />)
      expect(screen.getByTestId('card').tagName).toEqual('ARTICLE')
    })

    it('should render a given as', () => {
      render(<Card as="div" data-testid="card" />)
      expect(screen.getByTestId('card').tagName).toEqual('DIV')
    })
  })

  describe('className', () => {
    it('should take render with a given className', () => {
      render(<Card className="mb-4" data-testid="card" />)
      expect(screen.getByTestId('card')).toHaveClass('mb-4')
    })
  })
})
