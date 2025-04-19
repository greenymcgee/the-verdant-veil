import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { Filters } from '..'

function getInputProps(filter: OneOf<PropsOf<typeof Filters>['filters']>) {
  return { defaultChecked: false, id: `genres-${filter.slug}` }
}

const PROPS: PropsOf<typeof Filters> = {
  filters: SUPER_METROID.genres,
  getInputProps,
  id: 'genres',
  label: 'Genres',
  validating: false,
}

describe('<Filters />', () => {
  it.each(SUPER_METROID.genres)('should render checkboxes', (genre) => {
    render(<Filters {...PROPS} />)
    expect(screen.getByTestId(`genres-${genre.slug}`)).toHaveAttribute(
      'type',
      'checkbox',
    )
  })

  it.each(SUPER_METROID.genres)(
    'should disable tabindex when expanded is false',
    (genre) => {
      render(<Filters {...PROPS} />)
      act(() => fireEvent.click(screen.getByText('Genres')))
      expect(screen.getByTestId(`genres-${genre.slug}`)).toHaveAttribute(
        'tabindex',
        '-1',
      )
    },
  )

  it.each(SUPER_METROID.genres)(
    'should enable tabindex when expanded is true',
    (genre) => {
      render(<Filters {...PROPS} />)
      expect(screen.getByTestId(`genres-${genre.slug}`)).toHaveAttribute(
        'tabindex',
        '0',
      )
    },
  )
})
