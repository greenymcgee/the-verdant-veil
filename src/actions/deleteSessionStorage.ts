'use server'
import { cookies } from 'next/headers'

import { GREEN_QUEST_CURRENT_USER, GREEN_QUEST_JWT } from '@/constants'
import { logger } from '@/modules'

export async function deleteSessionStorage() {
  logger.info('Deleting session storage')
  const cookieStore = await cookies()
  cookieStore.delete(GREEN_QUEST_JWT)
  cookieStore.delete(GREEN_QUEST_CURRENT_USER)
}
