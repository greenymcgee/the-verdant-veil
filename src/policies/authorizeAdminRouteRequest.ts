import { NextRequest } from 'next/server'

import { getCurrentUser } from '@/actions'

export async function authorizeAdminRouteRequest(request: NextRequest) {
  const user = await getCurrentUser()
  if (!request.url.includes('admin') || user.admin) return

  throw Error('Admin Policy: Forbidden')
}
