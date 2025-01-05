'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { CURRENT_USER_CACHE_TAG, GREEN_QUEST_JWT } from '@/constants'
import { logger, verifyJwt } from '@/modules'

import { getLoginErrorMessage, postLoginRequest } from '../utils'

interface LoginState {
  email?: string
  error?: string
  password?: string
  user?: UsersShowJson['user']
}

export async function login(_: LoginState, formData: FormData) {
  try {
    const { token, user } = await postLoginRequest(formData)
    const cookieStore = await cookies()
    cookieStore.set(GREEN_QUEST_JWT, token, {
      httpOnly: true,
      maxAge: (await verifyJwt(token)).exp,
    })
    revalidateTag(CURRENT_USER_CACHE_TAG)
    return { user } as LoginState
  } catch (error) {
    logger.error(error)
    return {
      email: formData.get('email'),
      error: getLoginErrorMessage(error),
      password: formData.get('password'),
    } as LoginState
  }
}
