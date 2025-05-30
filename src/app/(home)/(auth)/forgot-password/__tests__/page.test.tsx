import React from 'react'
import { render, screen } from '@testing-library/react'

import ForgotPasswordPage from '../page'

describe('<ForgotPasswordPage />', () => {
  it('should render the forgot password form', () => {
    render(<ForgotPasswordPage />)
    expect(screen.getByTestId('forgot-password-form')).toBeVisible()
  })
})
