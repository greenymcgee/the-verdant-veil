import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { HamburgerMenu } from '..'

const ref = createRef<HTMLDialogElement>()
const toggleDialog = vi.fn()
const PROPS: PropsOf<typeof HamburgerMenu> = {
  expanded: false,
  ref,
  toggleDialog,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('<HamburgerMenu />', () => {
  it('should pass the toggleDialog prop to the hamburger button', () => {
    render(
      <HamburgerMenu {...PROPS}>
        <nav>Hamburger</nav>
      </HamburgerMenu>,
    )
    fireEvent.click(screen.getByLabelText('Open Hamburger Menu'))
    expect(PROPS.toggleDialog).toHaveBeenCalledTimes(1)
  })
})
