import { NextRequest, NextResponse } from 'next/server'

import { ROUTES } from '@/constants'

import { redirectUnauthenticatedUser } from '..'

const HOST = 'http://test-me.com'
const PATHNAME = '/admin/games'

describe('redirectUnauthenticatedUser', () => {
  it('should manually redirect from server actions', () => {
    const result = redirectUnauthenticatedUser({
      headers: { get: vi.fn().mockReturnValue('text/x-component') },
      url: `${HOST}${PATHNAME}`,
    } as unknown as NextRequest)
    const url = new URL(`${ROUTES.login}?redirect=${PATHNAME}`, HOST)
    expect(result).toEqual(
      new NextResponse(null, {
        headers: { 'X-Action-Redirect': url.toString() },
        status: 303,
      }),
    )
  })

  it('should use standard NextResponse.redirect for non server actions', () => {
    const result = redirectUnauthenticatedUser({
      headers: { get: vi.fn() },
      url: `${HOST}${PATHNAME}`,
    } as unknown as NextRequest)
    const url = new URL(`${ROUTES.login}?redirect=${PATHNAME}`, HOST)
    expect(result).toEqual(NextResponse.redirect(url))
  })
})
