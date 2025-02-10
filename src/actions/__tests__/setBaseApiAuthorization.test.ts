import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

import { baseApi } from '@/modules'

import { setBaseApiAuthorization } from '../setBaseApiAuthorization'

afterEach(() => {
  baseApi.defaults.headers.common['Authorization'] = undefined
})

describe('setBaseApiAuthorization', () => {
  it('should do nothing when the header is set', async () => {
    baseApi.defaults.headers.common['Authorization'] = 'token'
    await setBaseApiAuthorization()
    expect(baseApi.defaults.headers.common['Authorization']).toBe('token')
  })

  it('should do nothing when the token is blank', async () => {
    await setBaseApiAuthorization()
    expect(baseApi.defaults.headers.common['Authorization']).toBeUndefined()
  })

  it('should do nothing when the value is blank', async () => {
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({ value: '' } as RequestCookie)
    await setBaseApiAuthorization()
    expect(baseApi.defaults.headers.common['Authorization']).toBeUndefined()
  })

  it('should set the baseApi auth when the token is present', async () => {
    const token = 'token'
    const { get } = await cookies()
    vi.mocked(get).mockReturnValue({ value: token } as RequestCookie)
    await setBaseApiAuthorization()
    expect(baseApi.defaults.headers.common['Authorization']).toEqual(
      `Bearer ${token}`,
    )
  })
})
