import { NextRequest } from 'next/server'

export function mockAuthenticatedNextRequest(url: string = 'http://test.com') {
  return {
    cookies: {
      get: vi.fn().mockReturnValue({ value: 'jwt' }),
    },
    url,
  } as unknown as NextRequest
}
