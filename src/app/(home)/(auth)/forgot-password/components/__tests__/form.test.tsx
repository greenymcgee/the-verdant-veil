import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { ADMIN_USER } from '@/test/fixtures'
import { resetPasswordServer } from '@/test/servers'

import { ForgotPasswordForm } from '../form'

beforeAll(() => {
  resetPasswordServer.listen()
})

afterEach(() => {
  resetPasswordServer.resetHandlers()
})

afterAll(() => {
  resetPasswordServer.close()
})

describe('<ForgotPasswordForm />', () => {
  it('should render a form that makes a POST request to the reset password endpoint', async () => {
    render(<ForgotPasswordForm />)
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: ADMIN_USER.email },
    })
    fireEvent.click(screen.getByText('Submit'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(
      screen.getByTestId('reset-password-email-sent-message'),
    ).toBeVisible()
  })
})
