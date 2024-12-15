import { renderHook, waitFor } from '@testing-library/react'

import { baseApi } from '@/modules/baseApi'
import { AUTH_TOKEN } from '@/test/fixtures/authToken'
import {
  loginServer,
  mockErrorLoginResponse,
  mockUnauthorizedLoginResponse,
} from '@/test/servers'

import { usePostLogin } from '../usePostLogin'

// TODO: move to util
const { error } = vi.hoisted(() => {
  return { error: vi.fn() }
})
vi.mock('react-hot-toast', () => ({ default: { error } }))

beforeAll(() => {
  loginServer.listen()
})

afterEach(() => {
  loginServer.resetHandlers()
  vi.clearAllMocks()
})

afterAll(() => {
  loginServer.close()
})

describe('usePostLogin', () => {
  it("should set the baseApi's Authorization header upon success", async () => {
    const { result } = renderHook(() => usePostLogin())
    result.current.trigger(new FormData())
    await waitFor(() => expect(result.current.isMutating).toEqual(false))
    expect(baseApi.defaults.headers.common['Authorization']).toEqual(AUTH_TOKEN)
  })

  it('should toast an error upon failure', async () => {
    const message = mockUnauthorizedLoginResponse()
    const { result } = renderHook(() => usePostLogin())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(error).toHaveBeenCalledWith(message)
  })

  it('should toast a generic message when the error response is undefined', async () => {
    mockErrorLoginResponse()
    const { result } = renderHook(() => usePostLogin())
    await expect(
      async () => await result.current.trigger(new FormData()),
    ).rejects.toThrow()
    expect(error).toHaveBeenCalledWith('Whoops, something went wrong')
  })
})
