import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { ADMIN_USER } from '../fixtures'

export async function signInAdminUser() {
  const { get } = await cookies()
  vi.mocked(get).mockReturnValue({
    value: JSON.stringify(ADMIN_USER),
  } as RequestCookie)
}
