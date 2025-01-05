'use server'
import { cookies } from 'next/headers'

import {
  API_ROUTES,
  CURRENT_USER_CACHE_TAG,
  GREEN_QUEST_API_URL,
  GREEN_QUEST_JWT,
} from '@/constants'

export async function getCurrentUser() {
  const { get } = await cookies()
  const token = get(GREEN_QUEST_JWT)?.value
  const response = await fetch(
    `${GREEN_QUEST_API_URL}/${API_ROUTES.currentUser}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      next: { tags: [CURRENT_USER_CACHE_TAG] },
    },
  )
  if (!response.ok) throw Error(await response.text())

  const { user } = (await response.json()) as UsersShowJson
  return user
}
