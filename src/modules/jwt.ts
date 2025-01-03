import jwt from 'jsonwebtoken'

import { DEVISE_SECRET_KEY } from '@/constants'

export function verifyJwt(token: string) {
  const decodedJwt = jwt.verify(token, DEVISE_SECRET_KEY)
  if (typeof decodedJwt !== 'object') throw Error('Invalid JWT')

  return decodedJwt
}
