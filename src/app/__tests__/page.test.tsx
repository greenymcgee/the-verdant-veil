import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('<Page />', () => {
  it('should render', () => {
    render(<Page />)
    expect(screen.getByTestId('page')).toBeVisible()
  })
})
