import React from 'react'
import { render, screen } from '@testing-library/react'

import LoginPage from '../page'

describe('<LoginPage />', () => {
  it('should render the login form', async () => {
    render(<LoginPage />)
    expect(screen.getByTestId('login-form')).toBeVisible()
  })
})
