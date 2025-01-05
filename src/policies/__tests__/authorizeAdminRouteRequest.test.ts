import { NextRequest } from 'next/server'

import { currentUserServer, mockBasicUser } from '@/test/servers'

import { authorizeAdminRouteRequest } from '..'

beforeAll(() => currentUserServer.listen())
afterEach(() => currentUserServer.resetHandlers())
afterAll(() => currentUserServer.close())

describe('authorizeAdminRouteRequest', () => {
  it('should do nothing if the pathname does not include admin', async () => {
    mockBasicUser()
    const result = await authorizeAdminRouteRequest(
      new NextRequest('http://test.com'),
    )
    expect(result).toBeUndefined()
  })

  it('should allow an admin user to pass in an admin route', async () => {
    const result = await authorizeAdminRouteRequest(
      new NextRequest('http://test.com/admin/games'),
    )
    expect(result).toBeUndefined()
  })

  it('should throw an error when the user is not an admin and the pathname is an admin route', async () => {
    mockBasicUser()
    await expect(
      authorizeAdminRouteRequest(
        new NextRequest('http://test.com/admin/games'),
      ),
    ).rejects.toThrow('Admin Policy: Forbidden')
  })
})
