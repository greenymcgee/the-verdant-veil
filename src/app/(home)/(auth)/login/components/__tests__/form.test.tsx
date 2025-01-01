import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { ADMIN_USER } from '@/test/fixtures'
import { mockJwtVerify, toastMock } from '@/test/helpers'
import { loginServer, mockUnauthorizedLoginResponse } from '@/test/servers'

import { LoginForm } from '..'

beforeAll(() => {
  mockJwtVerify()
  loginServer.listen()
})

afterEach(() => {
  vi.clearAllMocks()
  loginServer.resetHandlers()
})

afterAll(() => {
  loginServer.close()
})

function submitForm() {
  fireEvent.change(screen.getByTestId('email-input'), {
    target: { value: ADMIN_USER.email },
  })
  fireEvent.change(screen.getByTestId('password-input'), {
    target: { value: 'Testpass123!' },
  })
  fireEvent.click(screen.getByText('Login'))
}

describe('<LoginForm />', () => {
  describe('loading', () => {
    it('should render a loader', () => {
      render(<LoginForm />)
      submitForm()
      expect(screen.getByRole('alert')).toBeVisible()
    })
  })

  describe('success', () => {
    it('should redirect the user to the home page', async () => {
      mockRouter.push(ROUTES.login)
      render(<LoginForm />)
      submitForm()
      await waitFor(() => expect(mockRouter.pathname).toEqual(ROUTES.home))
    })

    it('should toast a message', async () => {
      render(<LoginForm />)
      submitForm()
      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith(
          `Welcome back ${ADMIN_USER.username}`,
        )
      })
    })
  })

  describe('failure', () => {
    it('should toast an error', async () => {
      const message = mockUnauthorizedLoginResponse()
      render(<LoginForm />)
      submitForm()
      await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith(message))
    })
  })
})
