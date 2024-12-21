import React from 'react'
import { render, screen } from '@testing-library/react'

import ResetPasswordPage from '../page'

describe('<ResetPasswordPage />', () => {
  it('should render the reset password form', () => {
    render(<ResetPasswordPage />)
    expect(screen.getByTestId('reset-password-form')).toBeVisible()
  })
})
