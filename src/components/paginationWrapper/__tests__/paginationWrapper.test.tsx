import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'

import { PaginationWrapper } from '../paginationWrapper'

const PROPS: PropsOf<typeof PaginationWrapper> = {
  route: 'adminGames',
  totalPages: 400,
}

beforeEach(() => mockRouter.push('/'))

describe('<PaginationWrapper />', () => {
  it('should paginate the given route', () => {
    render(<PaginationWrapper {...PROPS}>Children</PaginationWrapper>)
    fireEvent.click(screen.getByLabelText('Next Page'))
    expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?page=1`)
  })

  it('should provide links', () => {
    render(<PaginationWrapper {...PROPS}>Children</PaginationWrapper>)
    fireEvent.click(screen.getByLabelText('Go to page 400'))
    expect(mockRouter.asPath).toBe(`${ROUTES.adminGames}?page=399`)
  })
})
