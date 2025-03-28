import { NextRequest, NextResponse } from 'next/server'

import { ROUTES } from './constants'
import { authenticateUser, logger } from './modules'
import { authorizeAdminRouteRequest } from './policies'
import { redirectUnauthenticatedUser } from './utils'

export default async function middleware(request: NextRequest) {
  try {
    await authenticateUser(request)
  } catch (error) {
    logger.error(error)
    return redirectUnauthenticatedUser(request)
  }

  try {
    await authorizeAdminRouteRequest(request)
  } catch (error) {
    logger.error(error)
    return NextResponse.redirect(new URL(ROUTES.forbidden, request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/games/:path/preview'] }
