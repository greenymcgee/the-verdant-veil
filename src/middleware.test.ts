import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import middleware from './middleware'
import { ADMIN_USER, BASIC_USER } from './test/fixtures'
import { mockAuthenticatedNextRequest } from './test/helpers'

vi.spyOn(NextResponse, 'redirect')
vi.spyOn(NextResponse, 'next')

afterEach(() => {
  vi.clearAllMocks()
})
afterAll(() => {
  vi.restoreAllMocks()
})

const TEST_URL = 'http://test.com/admin/games'

describe('middleware', () => {
  describe('authentication', () => {
    it('should allow an authenticated user to continue', async () => {
      const { get } = await cookies()
      vi.mocked(get).mockReturnValue({
        value: JSON.stringify(ADMIN_USER),
      } as RequestCookie)
      await middleware(mockAuthenticatedNextRequest(TEST_URL))
      expect(NextResponse.next).toHaveBeenCalled()
    })

    it('should redirect an unauthenticated user', async () => {
      await middleware(new NextRequest(TEST_URL))
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        new URL('http://test.com/login?redirect=/admin/games'),
      )
    })
  })

  describe('authorization', () => {
    it('should respect the admin route policy', async () => {
      const { get } = await cookies()
      vi.mocked(get).mockReturnValue({
        value: JSON.stringify(BASIC_USER),
      } as RequestCookie)
      await middleware(mockAuthenticatedNextRequest(TEST_URL))
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        new URL('http://test.com/forbidden'),
      )
    })
  })
})
