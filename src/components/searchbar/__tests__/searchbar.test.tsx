import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'

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

  describe('searching', () => {
    it("should update the route with the user's query automatically after a period of time", async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<Searchbar />)
      userEvent.type(screen.getByTestId('searchbar'), 'query')
      await waitFor(
        () =>
          expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?query=query`),
        { timeout: 1500 },
      )
    })

    it('should allow user to enter the search with the enter key', async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<Searchbar />)
      await userEvent.type(screen.getByTestId('searchbar'), 'query')
      fireEvent.keyUp(screen.getByTestId('searchbar'), {
        currentTarget: { value: 'query' },
        key: 'Enter',
      })
      expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?query=query`)
    })

    it('should render a button to clear the search', async () => {
      mockRouter.push(`${ROUTES.adminGames}?query=query`)
      render(<Searchbar />)
      userEvent.type(screen.getByTestId('searchbar'), 'query')
      userEvent.click(screen.getByLabelText('Clear Search'))
      await waitFor(() => expect(mockRouter.asPath).toBe(ROUTES.adminGames))
    })
  })
})
