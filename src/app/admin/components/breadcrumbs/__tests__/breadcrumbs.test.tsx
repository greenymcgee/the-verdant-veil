import React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'

import { ROUTES } from '@/constants'

import { Breadcrumbs } from '..'

const BREADCRUMBS: Breadcrumb[] = [
  { name: 'Games', route: ROUTES.games },
  { name: 'Game', route: ROUTES.adminGame('game') },
]

describe('<Breadcrumbs', () => {
  it.each(BREADCRUMBS)('should render breadcrumb', (breadcrumb) => {
    render(<Breadcrumbs breadcrumbs={BREADCRUMBS} />)
    expect(screen.getByText(breadcrumb.name)).toBeVisible()
  })
})
