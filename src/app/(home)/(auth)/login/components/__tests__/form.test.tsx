import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { baseApi } from '@/modules/baseApi'
import { ADMIN_USER } from '@/test/fixtures'
import { AUTH_TOKEN } from '@/test/fixtures/authToken'
import { loginServer } from '@/test/servers'

import { LoginForm } from '..'

beforeAll(() => {
  loginServer.listen()
})

afterEach(() => {
  loginServer.resetHandlers()
})

afterAll(() => {
  loginServer.close()
})

describe('<LoginForm />', () => {
  it('should render a form that makes a POST request to the login endpoint', async () => {
    render(<LoginForm />)
    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: ADMIN_USER.email },
    })
    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: 'Testpass123!' },
    })
    fireEvent.click(screen.getByText('Login'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))
    expect(baseApi.defaults.headers.common['Authorization']).toEqual(AUTH_TOKEN)
  })
})
