import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { ADMIN_USER } from '@/test/fixtures'

import { getCurrentUser } from '..'

describe('getCurrentUser', () => {
  it('should return the current user', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({
      value: JSON.stringify(ADMIN_USER),
    } as RequestCookie)
    const result = await getCurrentUser()
    expect(result).toEqual(ADMIN_USER)
  })

  it('should return a default object when cookie is not present', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue(undefined as unknown as RequestCookie)
    const result = await getCurrentUser()
    expect(result).toEqual({})
  })
})
