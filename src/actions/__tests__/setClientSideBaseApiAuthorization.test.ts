import { baseApi } from '@/lib'
import { JWT_TOKEN_FIXTURE } from '@/test/fixtures'
import { mockJwtTokenCookie } from '@/test/helpers'

import { setClientSideBaseApiAuthorization } from '..'

describe('setClientSideBaseApiAuthorization', () => {
  it('should return false when a token is not present', async () => {
    const result = await setClientSideBaseApiAuthorization()
    expect(result).toBe(false)
  })

  it('should set the token', async () => {
    mockJwtTokenCookie()
    await setClientSideBaseApiAuthorization()
    expect(baseApi.defaults.headers.common['Authorization']).toBe(
      `Bearer ${JWT_TOKEN_FIXTURE}`,
    )
  })

  it('should return true when the token was set', async () => {
    mockJwtTokenCookie()
    const result = await setClientSideBaseApiAuthorization()
    expect(result).toBe(true)
  })
})
