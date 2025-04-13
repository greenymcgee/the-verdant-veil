import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { DesktopGameFilters } from '..'

const PROPS: PropsOf<typeof DesktopGameFilters> = {
  companies: SUPER_METROID.developers,
  filtersPresent: false,
  genres: SUPER_METROID.genres,
  loading: false,
  onClearClicked: vi.fn(),
  onSubmit: vi.fn().mockImplementation((event) => event.preventDefault()),
  platforms: SUPER_METROID.platforms,
  ref: createRef(),
  validating: false,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('<DesktopGameFilters />', () => {
  it('should render a form', () => {
    render(<DesktopGameFilters {...PROPS} />)
    fireEvent.click(screen.getByTestId('desktop-platforms-1'))
    fireEvent.click(screen.getByTestId('desktop-apply-filters-button'))
    expect(PROPS.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should render a clear button when game filter params are present', () => {
    render(<DesktopGameFilters {...PROPS} filtersPresent />)
    fireEvent.click(screen.getByTestId('desktop-clear-filters-button'))
    expect(PROPS.onClearClicked).toHaveBeenCalledTimes(1)
  })
})
