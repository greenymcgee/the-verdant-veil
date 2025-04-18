import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { MobileGameFilters } from '..'

const PROPS: PropsOf<typeof MobileGameFilters> = {
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

describe('<MobileGameFilters />', () => {
  it('should call the onSubmit prop', () => {
    render(<MobileGameFilters {...PROPS} />)
    fireEvent.click(screen.getByTestId('mobile-filter-button'))
    fireEvent.click(
      screen.getByTestId(
        `mobile-platforms-${SUPER_METROID.platforms.at(0)?.slug}`,
      ),
    )
    fireEvent.click(screen.getByTestId('mobile-apply-filters-button'))
    expect(PROPS.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call the onClearClicked prop', () => {
    render(<MobileGameFilters {...PROPS} filtersPresent />)
    fireEvent.click(screen.getByTestId('mobile-filter-button'))
    fireEvent.click(screen.getByTestId('mobile-clear-filters-button'))
    expect(PROPS.onClearClicked).toHaveBeenCalledTimes(1)
  })
})
