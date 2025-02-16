'use client'
import { useContext } from 'react'

import { CurrentUserContext } from '../context'

export function useCurrentUser() {
  return useContext(CurrentUserContext)
}
