import { renderHook, waitFor } from '@testing-library/react'

import { toastMock } from '@/test/helpers'
import {
  mockErrorPostResetPasswordResponse,
  mockUnprocessablePostResetPasswordResponse,
  resetPasswordServer,
} from '@/test/servers'

import { usePostResetPassword } from '../usePostResetPassword'

beforeAll(() => {
  resetPasswordServer.listen()
})

afterEach(() => {
  resetPasswordServer.resetHandlers()
  vi.clearAllMocks()
})

afterAll(() => {
  resetPasswordServer.close()
})

describe('usePostResetPassword', () => {
  it('should toast a message upon success', async () => {
    const { result } = renderHook(() => usePostResetPassword())
    result.current.trigger(new FormData())
    await waitFor(() => expect(result.current.isMutating).toEqual(false))
    expect(toastMock.success).toHaveBeenCalledWith('An email has been sent!')
  })

  it('should toast a message from the API upon failure', async () => {
    const message = mockUnprocessablePostResetPasswordResponse()
    const { result } = renderHook(() => usePostResetPassword())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(toastMock.error).toHaveBeenCalledWith(message)
  })

  it('should toast a generic message when the error response is undefined', async () => {
    mockErrorPostResetPasswordResponse()
    const { result } = renderHook(() => usePostResetPassword())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(toastMock.error).toHaveBeenCalledWith('Whoops, something went wrong')
  })
})
