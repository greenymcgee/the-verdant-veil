import React from 'react'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'

import { PartialGameCreateBanner } from '..'

describe('<PartialGameCreateBanner />', () => {
  it('should not render when the multi-status param is null', () => {
    const { container } = render(<PartialGameCreateBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render when the multi-status param is present', () => {
    mockRouter.push(`${ROUTES.games}?multi-status=true`)
    render(<PartialGameCreateBanner />)
    expect(screen.getByTestId('partial-game-create-message')).toBeVisible()
  })
})
