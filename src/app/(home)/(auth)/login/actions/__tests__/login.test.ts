import { AxiosError } from 'axios'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { CURRENT_USER_CACHE_TAG, GREEN_QUEST_JWT } from '@/constants'
import { baseApi, logger } from '@/modules'
import { ADMIN_USER, AUTH_TOKEN } from '@/test/fixtures'
import { mockJwtVerify } from '@/test/helpers'
import { loginServer, mockUnauthorizedLoginResponse } from '@/test/servers'

import { login } from '..'

beforeAll(() => loginServer.listen())

afterEach(() => {
  vi.clearAllMocks()
  loginServer.restoreHandlers()
})

afterAll(() => loginServer.close())

describe('login', () => {
  const formData = new FormData()
  formData.set('email', ADMIN_USER.email)
  formData.set('password', 'Testpass1!')

  it('should reset the auth header', () => {
    baseApi.defaults.headers.common['Authorization'] = 'token'
    login({}, formData)
    expect(baseApi.defaults.headers.common['Authorization']).toBeUndefined()
  })

  describe('success', () => {
    it('should store the jwt in a cookie', async () => {
      const decodedJwt = mockJwtVerify()
      await login({}, formData)
      const [, token] = AUTH_TOKEN.split(' ')
      const { set } = await cookies()
      expect(set).toHaveBeenCalledWith(GREEN_QUEST_JWT, token, {
        httpOnly: true,
        maxAge: decodedJwt.exp,
      })
    })

    it('should revalidate the current user tag', async () => {
      await login({}, formData)
      expect(revalidateTag).toHaveBeenCalledWith(CURRENT_USER_CACHE_TAG)
    })

    it('should return a user', async () => {
      const result = await login({}, formData)
      expect(result).toEqual({ user: ADMIN_USER })
    })
  })

  describe('failure', () => {
    it('should log the error', async () => {
      mockUnauthorizedLoginResponse()
      await login({}, formData)
      const error = new AxiosError('Request failed with status code 401')
      expect(logger.error).toHaveBeenCalledWith(expect.objectContaining(error))
    })

    it('should return an error message and the input values', async () => {
      const message = mockUnauthorizedLoginResponse()
      const result = await login({}, formData)
      expect(result).toEqual({
        email: formData.get('email'),
        error: message,
        password: formData.get('password'),
      })
    })
  })
})
