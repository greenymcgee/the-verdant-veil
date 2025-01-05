import { NextRequest, NextResponse } from 'next/server'

import { ROUTES } from './constants'
import { authenticateUser, logger } from './modules'
import { authorizeAdminRouteRequest } from './policies'

export default async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url)
  try {
    await authenticateUser(request)
  } catch (error) {
    logger.error(error)
    return NextResponse.redirect(
      new URL(`${ROUTES.login}?redirect=${pathname}`, request.url),
    )
  }

  try {
    await authorizeAdminRouteRequest(request)
  } catch (error) {
    logger.error(error)
    return NextResponse.redirect(new URL(ROUTES.forbidden, request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
