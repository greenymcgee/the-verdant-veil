'use server'
import { cookies } from 'next/headers'

import {
  THE_VERDANT_VEIL_CURRENT_USER,
  THE_VERDANT_VEIL_JWT,
} from '@/constants'
import { logger } from '@/modules'

export async function deleteSessionStorage() {
  logger.info('Deleting session storage')
  const cookieStore = await cookies()
  cookieStore.delete(THE_VERDANT_VEIL_JWT)
  cookieStore.delete(THE_VERDANT_VEIL_CURRENT_USER)
}
