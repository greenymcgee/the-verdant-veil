import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockNextNavigation } from '@/test/helpers'

import ResetPasswordPage from '../page'

beforeAll(() => mockNextNavigation())

describe('<ResetPasswordPage />', () => {
  it('should render the reset password form', () => {
    render(<ResetPasswordPage />)
    expect(screen.getByTestId('reset-password-form')).toBeVisible()
  })
})
