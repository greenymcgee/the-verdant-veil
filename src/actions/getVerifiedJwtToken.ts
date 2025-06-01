'use server'
import { cookies } from 'next/headers'

import { THE_VERDANT_VEIL_JWT } from '@/constants'
import { verifyJwt } from '@/lib'

/**
 * Only returns the token if it is successfully verified. Useful for fetching
 * auth related data only when a user is signed in like for the "Admin" button
 * in the navbar.
 */
export async function getVerifiedJwtToken() {
  const { get } = await cookies()
  const token = get(THE_VERDANT_VEIL_JWT)?.value
  if (!token) return false

  try {
    await verifyJwt(token)
    return token
  } catch {
    return false
  }
}
