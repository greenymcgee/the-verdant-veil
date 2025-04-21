'use server'
import { cookies } from 'next/headers'

import { THE_VERDANT_VEIL_JWT } from '@/constants'
import { baseApi } from '@/modules'

export async function setBaseApiAuthorization() {
  const { get } = await cookies()
  const token = get(THE_VERDANT_VEIL_JWT)?.value

  if (!token) return

  baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
