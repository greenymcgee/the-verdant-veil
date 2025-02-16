'use server'
import { cookies } from 'next/headers'

import { GREEN_QUEST_JWT } from '@/constants'
import { baseApi } from '@/modules'

export async function setBaseApiAuthorization() {
  const { get } = await cookies()
  const token = get(GREEN_QUEST_JWT)?.value

  if (!token) return

  baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
