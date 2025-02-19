import React, { PropsWithChildren } from 'react'
import { screen } from '@testing-library/dom'
import { act } from '@testing-library/react'

import { usePageContext } from '@/context'
import { renderWithProviders, sleep } from '@/test/helpers'

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
  it('should set the active navbar link', async () => {
    renderWithProviders(<AdminGamesLayout />, { wrapper: Wrapper })
    await act(async () => sleep())
    expect(screen.getByText('adminGames')).toBeVisible()
  })
})
