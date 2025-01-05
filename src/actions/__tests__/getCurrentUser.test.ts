import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { ADMIN_USER, AUTH_TOKEN } from '@/test/fixtures'
import { currentUserServer, mockCurrentUserFailure } from '@/test/servers'

import { getCurrentUser } from '..'

beforeAll(() => currentUserServer.listen())
afterEach(() => currentUserServer.resetHandlers())
afterAll(() => currentUserServer.close())

describe('getCurrentUser', () => {
  it('should return the current user', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({ value: AUTH_TOKEN } as RequestCookie)
    const result = await getCurrentUser()
    expect(result).toEqual(ADMIN_USER)
  })

  it('should throw an error when the request fails', async () => {
    mockCurrentUserFailure()
    await expect(getCurrentUser()).rejects.toThrow(
      Error('Something went wrong'),
    )
  })
})
