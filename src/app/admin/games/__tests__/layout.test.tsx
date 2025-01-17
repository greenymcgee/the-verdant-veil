import React, { PropsWithChildren } from 'react'
import { screen } from '@testing-library/dom'

import { usePageContext } from '@/context'
import { renderWithProviders } from '@/test/helpers'

import AdminGamesLayout from '../layout'

function Wrapper({ children }: PropsWithChildren) {
  const { activeNavbarLink } = usePageContext()
  return (
    <>
      {children}
      <span>{activeNavbarLink}</span>
    </>
  )
}

describe('<AdminGamesLayout />', () => {
  it('should set the active navbar link', () => {
    renderWithProviders(<AdminGamesLayout />, { wrapper: Wrapper })
    expect(screen.getByText('adminGames')).toBeVisible()
  })
})
