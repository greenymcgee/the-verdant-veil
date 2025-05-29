import { jwtVerify } from 'jose'

import { JWT_TOKEN_FIXTURE } from '@/test/fixtures'
import { mockJwtTokenCookie } from '@/test/helpers'

import { getVerifiedJwtToken } from '..'

describe('getVerifiedJwtToken', () => {
  it('should return false when a token is not present', async () => {
    const result = await getVerifiedJwtToken()
    expect(result).toBe(false)
  })

  it('should return the token when it is present', async () => {
    mockJwtTokenCookie()
    const result = await getVerifiedJwtToken()
    expect(result).toBe(JWT_TOKEN_FIXTURE)
  })

  it('should false when the validation throws an error', async () => {
    mockJwtTokenCookie()
    vi.mocked(jwtVerify).mockRejectedValueOnce(Error('message'))
    const result = await getVerifiedJwtToken()
    expect(result).toBe(false)
  })
})
