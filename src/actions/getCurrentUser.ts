'use server'
import { cookies } from 'next/headers'

import { GREEN_QUEST_CURRENT_USER } from '@/constants'
import { isValidJson } from '@/utils'

export async function getCurrentUser() {
  const { get } = await cookies()
  const json = get(GREEN_QUEST_CURRENT_USER)?.value

  if (json && isValidJson(json)) return JSON.parse(json) as User

  return {} as User
}
