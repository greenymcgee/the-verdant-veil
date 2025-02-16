import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { ADMIN_USER, BASIC_USER } from '@/test/fixtures'

import { authorizeAdminRouteRequest } from '..'

describe('authorizeAdminRouteRequest', () => {
  it('should do nothing if the pathname does not include admin', async () => {
    const result = await authorizeAdminRouteRequest(
      new NextRequest('http://test.com'),
    )
    expect(result).toBeUndefined()
  })

  it('should allow an admin user to pass in an admin route', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({
      value: JSON.stringify(ADMIN_USER),
    } as RequestCookie)
    const result = await authorizeAdminRouteRequest(
      new NextRequest('http://test.com/admin/games'),
    )
    expect(result).toBeUndefined()
  })

  it('should throw an error when the user is not an admin and the pathname is an admin route', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({
      value: JSON.stringify(BASIC_USER),
    } as RequestCookie)
    await expect(
      authorizeAdminRouteRequest(
        new NextRequest('http://test.com/admin/games'),
      ),
    ).rejects.toThrow('Admin Policy: Forbidden')
  })
})
