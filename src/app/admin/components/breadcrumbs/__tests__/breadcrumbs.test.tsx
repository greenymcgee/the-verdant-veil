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
  it.each(BREADCRUMBS)('should render breadcrumb', (breadcrumb) => {
    renderWithProviders(<Breadcrumbs breadcrumbs={BREADCRUMBS} />)
    expect(screen.getByText(breadcrumb.name)).toBeVisible()
  })
})
