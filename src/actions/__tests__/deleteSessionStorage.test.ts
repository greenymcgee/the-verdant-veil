import { cookies } from 'next/headers'

import {
  THE_VERDANT_VEIL_CURRENT_USER,
  THE_VERDANT_VEIL_JWT,
} from '@/constants'

import { deleteSessionStorage } from '..'

describe('deleteSessionStorage', () => {
  it('should delete the THE_VERDANT_VEIL_JWT', async () => {
    const cookieStore = await cookies()
    await deleteSessionStorage()
    expect(cookieStore.delete).toHaveBeenCalledWith(THE_VERDANT_VEIL_JWT)
  })

  it('should delete the THE_VERDANT_VEIL_USER', async () => {
    const cookieStore = await cookies()
    await deleteSessionStorage()
    expect(cookieStore.delete).toHaveBeenCalledWith(
      THE_VERDANT_VEIL_CURRENT_USER,
    )
  })
})
