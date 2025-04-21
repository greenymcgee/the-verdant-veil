'use server'

import { cookies } from 'next/headers'

import {
  IS_PRODUCTION_NODE_ENV,
  THE_VERDANT_VEIL_CURRENT_USER,
  THE_VERDANT_VEIL_JWT,
} from '@/constants'
import { logger, verifyJwt } from '@/modules'

import { getLoginErrorMessage, postLoginRequest } from '../utils'

interface LoginState {
  email?: string
  error?: string
  password?: string
  user?: UsersShowJson['user']
}

export async function login(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    const { token, user } = await postLoginRequest(formData)
    const decodedToken = await verifyJwt(token)
    const { set } = await cookies()
    set(THE_VERDANT_VEIL_JWT, token, {
      httpOnly: true,
      maxAge: decodedToken.exp,
      sameSite: 'strict',
      secure: IS_PRODUCTION_NODE_ENV,
    })
    set(THE_VERDANT_VEIL_CURRENT_USER, JSON.stringify(user), {
      httpOnly: true,
      maxAge: decodedToken.exp,
      sameSite: 'strict',
      secure: IS_PRODUCTION_NODE_ENV,
    })
    return { user }
  } catch (error) {
    logger.error(error)
    return {
      email: formData.get('email'),
      error: getLoginErrorMessage(error),
      password: formData.get('password'),
    } as LoginState
  }
}
