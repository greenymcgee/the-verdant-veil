import { cookies } from 'next/headers'

import { GREEN_QUEST_CURRENT_USER, GREEN_QUEST_JWT } from '@/constants'

import { deleteSessionStorage } from '..'

describe('deleteSessionStorage', () => {
  it('should delete the GREEN_QUEST_JWT', async () => {
    const cookieStore = await cookies()
    await deleteSessionStorage()
    expect(cookieStore.delete).toHaveBeenCalledWith(GREEN_QUEST_JWT)
  })

  it('should delete the GREEN_QUEST_USER', async () => {
    const cookieStore = await cookies()
    await deleteSessionStorage()
    expect(cookieStore.delete).toHaveBeenCalledWith(GREEN_QUEST_CURRENT_USER)
  })
})
