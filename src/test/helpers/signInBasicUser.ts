import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { BASIC_USER } from '../fixtures'

export async function signInBasicUser() {
  const { get } = await cookies()
  vi.mocked(get).mockReturnValue({
    value: JSON.stringify(BASIC_USER),
  } as RequestCookie)
}
