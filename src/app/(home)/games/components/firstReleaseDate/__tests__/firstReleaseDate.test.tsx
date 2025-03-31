import React from 'react'
import { render, screen } from '@testing-library/react'
import { format } from 'date-fns'

import { toCurrentTimezone } from '@/utils'

import { FirstReleaseDate } from '..'

describe('<FirstReleaseDate />', () => {
  it('should not render when firstReleaseDate is blank', () => {
    const { container } = render(<FirstReleaseDate firstReleaseDate={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render when firstReleaseDate is present', () => {
    const date = '1999-11-18T00:00:00.000Z'
    render(<FirstReleaseDate firstReleaseDate={date} />)
    expect(
      screen.getByText(format(toCurrentTimezone(date), 'MMMM do, yyyy')),
    ).toBeVisible()
  })
})
