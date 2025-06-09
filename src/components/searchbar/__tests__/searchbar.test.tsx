import React from 'react'
import { render, screen } from '@testing-library/react'

import { Searchbar } from '..'

describe('<Searchbar />', () => {
  it('should render an input', () => {
    render(<Searchbar />)
    expect(screen.getByTestId('searchbar').tagName).toEqual('INPUT')
  })

  it('should pass optional props to the div', () => {
    render(<Searchbar data-testid="test" />)
    expect(screen.getByTestId('test').tagName).toEqual('DIV')
  })

  it('should pass inputProps', () => {
    render(<Searchbar inputProps={{ className: 'mb-4' }} />)
    expect(screen.getByTestId('searchbar')).toHaveClass('mb-4')
  })

  it('should pass labelProps', () => {
    render(<Searchbar labelProps={{ ariaLabel: 'Given label' }} />)
    expect(screen.getByLabelText('Given label')).toBeVisible()
  })

  describe('id', () => {
    it('should pass the id to the input', () => {
      render(<Searchbar id="test" />)
      expect(screen.getByTestId('test').tagName).toEqual('INPUT')
    })

    it('should pass the id to the label', () => {
      render(<Searchbar id="test" />)
      expect(
        screen.getByLabelText('Search by Name').getAttribute('for'),
      ).toEqual('test')
    })
  })

  describe('clear button', () => {
    it('should render a clear button when showingClearButton is true', () => {
      render(<Searchbar showingClearButton />)
      expect(screen.getByTestId('searchbar-clear-button')).toBeVisible()
    })

    it('should pass clear button props', () => {
      render(
        <Searchbar
          clearButtonProps={{ className: 'mr-4' }}
          showingClearButton
        />,
      )
      expect(screen.getByTestId('searchbar-clear-button')).toHaveClass('mr-4')
    })
  })
})
