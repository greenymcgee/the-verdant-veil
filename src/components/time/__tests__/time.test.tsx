import React from 'react'
import { render, screen } from '@testing-library/react'
import { format as formatMethod } from 'date-fns'

import { toCurrentTimezone } from '@/utils'

import { Time } from '../time'

describe('<Time />', () => {
  it('should not render if the date is blank', () => {
    const { container } = render(
      <Time date={undefined} format="MMMM do, yyyy" />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('should render a converted date when convertedToLocalTimezone is true', () => {
    const date = '1999-11-18T00:00:00.000Z'
    const format = 'MMMM do, yyyy'
    render(<Time date={date} format={format} />)
    expect(
      screen.getByText(formatMethod(toCurrentTimezone(date), format)),
    ).toBeVisible()
  })

  it('should render an unconverted date when convertedToLocalTimezone is false', () => {
    const date = '1999-11-18T00:00:00.000Z'
    const format = 'MMMM do, yyyy'
    render(
      <Time convertedToLocalTimezone={false} date={date} format={format} />,
    )
    expect(
      screen.getByText(formatMethod(new Date(toCurrentTimezone(date)), format)),
    ).toBeVisible()
  })
})
