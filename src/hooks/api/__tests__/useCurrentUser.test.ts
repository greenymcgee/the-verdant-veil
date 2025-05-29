import { waitFor } from '@testing-library/react'

import { logger } from '@/modules'
import { ADMIN_USER } from '@/test/fixtures'
import { mockJwtTokenCookie, renderHookWithProviders } from '@/test/helpers'
import {
  currentUserServer,
  mockCurrentUserRequestFailure,
} from '@/test/servers'

import { useCurrentUser } from '..'

beforeAll(() => currentUserServer.listen())
afterAll(() => currentUserServer.close())
afterEach(() => currentUserServer.resetHandlers())

describe('useCurrentUser', () => {
  it('should do nothing without a valid jwt', async () => {
    const { result } = renderHookWithProviders(() => useCurrentUser())
    await waitFor(() => expect(result.current.isLoading).toEqual(false))
    expect(result.current.user).toEqual({
      admin: false,
      firstName: '',
      id: NaN,
      lastName: '',
      username: '',
    })
  })

  describe('success', () => {
    it('should return the current user', async () => {
      mockJwtTokenCookie()
      const { result } = renderHookWithProviders(() => useCurrentUser())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.user).toEqual(ADMIN_USER)
    })
  })

  describe('failure', () => {
    it('should log the error', async () => {
      mockJwtTokenCookie()
      const { message } = mockCurrentUserRequestFailure()
      const { result } = renderHookWithProviders(() => useCurrentUser())
      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(logger.error).toHaveBeenCalledWith(expect.any(Error), message)
    })
  })
})
