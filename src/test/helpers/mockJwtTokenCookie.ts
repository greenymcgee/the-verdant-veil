import { cookies } from 'next/headers'

import { THE_VERDANT_VEIL_JWT } from '@/constants'

import { JWT_TOKEN_FIXTURE } from '../fixtures'

export async function mockJwtTokenCookie() {
  const { get } = await cookies()
  vi.mocked(get).mockReturnValueOnce({
    name: THE_VERDANT_VEIL_JWT,
    value: JWT_TOKEN_FIXTURE,
  })
}
