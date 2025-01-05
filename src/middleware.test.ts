import { NextRequest, NextResponse } from 'next/server'

import middleware from './middleware'
import { mockAuthenticatedNextRequest } from './test/helpers'
import { currentUserServer, mockBasicUser } from './test/servers'

vi.spyOn(NextResponse, 'redirect')
vi.spyOn(NextResponse, 'next')

beforeAll(() => currentUserServer.listen())
afterEach(() => {
  currentUserServer.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => {
  currentUserServer.close()
  vi.restoreAllMocks()
})

describe('middleware', () => {
  describe('authentication', () => {
    it('should allow an authenticated user to continue', async () => {
      await middleware(mockAuthenticatedNextRequest())
      expect(NextResponse.next).toHaveBeenCalled()
    })

    it('should redirect an unauthenticated user', async () => {
      await middleware(new NextRequest('http://test.com/admin/games?ids[]=1'))
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        new URL('http://test.com/login?redirect=/admin/games'),
      )
    })
  })

  describe('authorization', () => {
    it('should respect the admin route policy', async () => {
      mockBasicUser()
      await middleware(
        mockAuthenticatedNextRequest('http://test.com/admin/games'),
      )
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        new URL('http://test.com/forbidden'),
      )
    })
  })
})
