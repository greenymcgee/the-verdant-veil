import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { toastMock } from '@/test/helpers'
import { logoutServer, mockLogoutRequestError } from '@/test/servers'

import { LogoutForm } from '..'

beforeAll(() => logoutServer.listen())
beforeEach(() => {
  logoutServer.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => logoutServer.close())

describe('<LogoutForm />', () => {
  describe('success', () => {
    it('should render a form for logging out', async () => {
      mockRouter.push(ROUTES.adminGames)
      render(<LogoutForm testId="test" />)
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() => expect(mockRouter.pathname).toBe(ROUTES.login))
    })
  })

  describe('failure', () => {
    it('should toast a message', async () => {
      mockLogoutRequestError()
      render(<LogoutForm testId="test" />)
      fireEvent.click(screen.getByText('Logout'))
      await waitFor(() =>
        expect(toastMock.error).toHaveBeenCalledWith(
          'Whoops, something went wrong',
        ),
      )
    })
  })
})
