import React from 'react'
import { render, screen } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'

import { DetailList } from '..'

describe('<DetailList />', () => {
  it("should render the list when it's present", () => {
    render(<DetailList list={SUPER_METROID.developers} title="Developer" />)
    expect(screen.getByTestId('list')).toBeVisible()
  })

  it('should not render when the list is empty', () => {
    render(<DetailList list={[]} title="Developer" />)
    expect(screen.queryByTestId('list')).not.toBeInTheDocument()
  })
})
