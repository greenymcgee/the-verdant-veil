import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { toastMock } from '@/test/helpers'
import {
  mockErrorResetPasswordResponse,
  resetPasswordServer,
} from '@/test/servers'

import { ResetPasswordForm } from '..'

beforeAll(() => resetPasswordServer.listen())
beforeEach(() => mockRouter.push('/reset-password/123'))
afterEach(() => resetPasswordServer.resetHandlers())
afterAll(() => resetPasswordServer.close())

describe('<ResetPasswordForm />', () => {
  it('should render the reset password form', async () => {
    const password = 'Testpass456!'
    render(<ResetPasswordForm />)
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: password },
    })
    fireEvent.change(screen.getByTestId('password-confirmation-input'), {
      target: { value: password },
    })
    fireEvent.click(screen.getByText('Reset password'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(mockRouter.pathname).toEqual(ROUTES.login)
  })

  it('should render the reset password form', async () => {
    mockErrorResetPasswordResponse('patch')
    const password = 'Testpass456!'
    render(<ResetPasswordForm />)
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: password },
    })
    fireEvent.change(screen.getByTestId('password-confirmation-input'), {
      target: { value: password },
    })
    fireEvent.click(screen.getByText('Reset password'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(mockRouter.pathname).not.toEqual(ROUTES.login)
    expect(toastMock.error).toHaveBeenCalledWith('Whoops, something went wrong')
  })
})
