import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { MobileGlobalSearchbarModal } from '..'

describe('<MobileGlobalSearchbarModal />', () => {
  it('should render a dialog with the GlobalSearchbar', () => {
    render(<MobileGlobalSearchbarModal />)
    fireEvent.click(screen.getByTestId('mobile-global-searchbar-toggle'))
    expect(screen.getByLabelText('Search by Name')).toBeVisible()
  })

  it('should render aria-controls', () => {
    render(<MobileGlobalSearchbarModal />)
    expect(
      screen.getByTestId('mobile-global-searchbar-toggle'),
    ).toHaveAttribute('aria-controls', 'mobile-global-searchbar-modal')
    expect(screen.getByTestId('mobile-global-searchbar-modal')).toHaveAttribute(
      'id',
      'mobile-global-searchbar-modal',
    )
  })

  it('should update aria-expanded attribute', async () => {
    render(<MobileGlobalSearchbarModal />)
    const button = screen.getByTestId('mobile-global-searchbar-toggle')
    fireEvent.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'))
  })

  it('should render a close button', () => {
    render(<MobileGlobalSearchbarModal />)
    fireEvent.click(screen.getByTestId('mobile-global-searchbar-toggle'))
    expect(screen.getByLabelText('Close Global Searchbar')).toBeVisible()
  })
})
