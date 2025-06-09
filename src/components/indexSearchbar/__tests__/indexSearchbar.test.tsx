import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { sleep } from '@/test/helpers'

import { IndexSearchbar } from '..'

describe('<IndexSearchbar />', () => {
  it('should render an input', () => {
    render(<IndexSearchbar />)
    expect(screen.getByTestId('searchbar').tagName).toEqual('INPUT')
  })

  it('should pass optional props to the div', () => {
    render(<IndexSearchbar data-testid="test" />)
    expect(screen.getByTestId('test').tagName).toEqual('DIV')
  })

  it('should pass inputProps', () => {
    render(<IndexSearchbar inputProps={{ className: 'mb-4' }} />)
    expect(screen.getByTestId('searchbar')).toHaveClass('mb-4')
  })

  it('should pass labelProps', () => {
    render(<IndexSearchbar labelProps={{ ariaLabel: 'Given label' }} />)
    expect(screen.getByLabelText('Given label')).toBeVisible()
  })

  describe('id', () => {
    it('should pass the id to the input', () => {
      render(<IndexSearchbar id="test" />)
      expect(screen.getByTestId('test').tagName).toEqual('INPUT')
    })

    it('should pass the id to the label', () => {
      render(<IndexSearchbar id="test" />)
      expect(
        screen.getByLabelText('Search by Name').getAttribute('for'),
      ).toEqual('test')
    })
  })

  describe('searching', () => {
    it("should not update the route with the user's query automatically after 1 seconds when autoSearch is false", async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<IndexSearchbar />)
      userEvent.type(screen.getByTestId('searchbar'), 'query')
      await waitFor(
        async () => {
          await sleep(1000)
          expect(mockRouter.asPath).toBe(ROUTES.adminGames)
        },
        { timeout: 1500 },
      )
    })

    it("should update the route with the user's query automatically after 1 seconds when autoSearch is true", async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<IndexSearchbar autoSearch />)
      userEvent.type(screen.getByTestId('searchbar'), 'query')
      await waitFor(
        () => {
          expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?query=query`)
        },
        { timeout: 1500 },
      )
    })

    it('should allow user to enter the search with the enter key', async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<IndexSearchbar />)
      await userEvent.type(screen.getByTestId('searchbar'), 'query')
      fireEvent.keyUp(screen.getByTestId('searchbar'), {
        currentTarget: { value: 'query' },
        key: 'Enter',
      })
      expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?query=query`)
    })

    it('should render a button to clear the search', async () => {
      mockRouter.push(`${ROUTES.adminGames}?platforms[]=1&query=query`)
      render(<IndexSearchbar />)
      userEvent.click(screen.getByLabelText('Clear Search'))
      await waitFor(() =>
        expect(mockRouter.asPath).toBe(
          encodeURI(`${ROUTES.adminGames}?platforms[]=1`),
        ),
      )
    })

    it('should use the given pathname', async () => {
      mockRouter.push(ROUTES.home)
      render(<IndexSearchbar pathnameOverride={ROUTES.games} />)
      await userEvent.type(screen.getByTestId('searchbar'), 'query')
      await userEvent.type(screen.getByTestId('searchbar'), '{enter}')
      await waitFor(() =>
        expect(mockRouter.asPath).toBe(`${ROUTES.games}?query=query`),
      )
    })
  })
})
