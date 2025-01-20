import React from 'react'
import { screen } from '@testing-library/dom'

import { ROUTES } from '@/constants'
import { renderWithProviders } from '@/test/helpers'

import { Breadcrumbs } from '..'

const BREADCRUMBS: Breadcrumb[] = [
  { name: 'Games', route: ROUTES.games },
  { name: 'Game', route: ROUTES.adminGame('game') },
]

describe('<Breadcrumbs', () => {
  it('should render a spinner until the breadcrumbs have been set', () => {
    renderWithProviders(<Breadcrumbs />)
    expect(screen.getByRole('alert')).toBeVisible()
  })

  it.each(BREADCRUMBS)(
    'should render PageContext breadcrumbs',
    (breadcrumb) => {
      renderWithProviders(<Breadcrumbs />, {
        initialPageContext: { initialBreadcrumbs: BREADCRUMBS },
      })
      expect(screen.getByText(breadcrumb.name)).toBeVisible()
    },
  )
})
