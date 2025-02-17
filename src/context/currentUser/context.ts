'use client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { noop } from 'swr/_internal'

interface CurrentUserContext {
  isLoading: boolean
  setUser: Dispatch<SetStateAction<User>>
  user: User
}

export const CurrentUserContext = createContext<CurrentUserContext>({
  isLoading: true,
  setUser: noop,
  user: {} as User,
})
