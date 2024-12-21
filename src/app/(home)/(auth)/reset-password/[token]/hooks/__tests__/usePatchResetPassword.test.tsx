import { renderHook, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { toastMock } from '@/test/helpers'
import {
  mockErrorResetPasswordResponse,
  mockUnprocessableResetPasswordResponse,
  resetPasswordServer,
} from '@/test/servers'

import { usePatchResetPassword } from '..'

beforeAll(() => resetPasswordServer.listen())
beforeEach(() => mockRouter.push('/reset-password/123'))
afterEach(() => {
  resetPasswordServer.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => resetPasswordServer.close())

describe('usePatchResetPassword', () => {
  it('should toast a message upon success', async () => {
    const { result } = renderHook(() => usePatchResetPassword())
    result.current.trigger(new FormData())
    await waitFor(() => expect(result.current.isMutating).toEqual(false))
    expect(toastMock.success).toHaveBeenCalledWith(
      'Your password has been reset!',
    )
  })

  it('should redirect to the login page upon success', async () => {
    const { result } = renderHook(() => usePatchResetPassword())
    result.current.trigger(new FormData())
    await waitFor(() => expect(result.current.isMutating).toEqual(false))
    expect(mockRouter.pathname).toEqual(ROUTES.login)
  })

  it('should toast a message from the API upon failure', async () => {
    const message = mockUnprocessableResetPasswordResponse('patch')
    const { result } = renderHook(() => usePatchResetPassword())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(toastMock.error).toHaveBeenCalledWith(message)
  })

  it('should toast a generic message when the error response is undefined', async () => {
    mockErrorResetPasswordResponse('patch')
    const { result } = renderHook(() => usePatchResetPassword())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(toastMock.error).toHaveBeenCalledWith('Whoops, something went wrong')
  })
})
