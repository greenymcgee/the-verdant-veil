import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Accordion } from '..'

const PROPS: PropsOf<typeof Accordion> = {
  expanded: false,
  id: 'test',
  label: 'Test',
  toggleExpanded: vi.fn(),
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('<Accordion />', () => {
  it('should call toggleExpanded', () => {
    render(<Accordion {...PROPS}>Children</Accordion>)
    fireEvent.click(screen.getByText('Test'))
    expect(PROPS.toggleExpanded).toHaveBeenCalledTimes(1)
  })
})
