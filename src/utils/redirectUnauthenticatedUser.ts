import { NextRequest, NextResponse } from 'next/server'

import { ROUTES } from '@/constants'

function isServerActionRequest(request: NextRequest) {
  return request.headers.get('Accept') === 'text/x-component'
}

function buildURL(request: NextRequest) {
  const { pathname } = new URL(request.url)
  return new URL(`${ROUTES.login}?redirect=${pathname}`, request.url)
}

/**
 * There is an issue open about the problem that requires the condition based on
 * the Accept header:
 * https://github.com/vercel/next.js/issues/65394
 */
export function redirectUnauthenticatedUser(request: NextRequest) {
  if (isServerActionRequest(request)) {
    return new NextResponse(null, {
      headers: { 'X-Action-Redirect': buildURL(request).toString() },
      status: 303,
    })
  }

  return NextResponse.redirect(buildURL(request))
}
