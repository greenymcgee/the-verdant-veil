'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { getCurrentUser } from '@/actions'

import { CurrentUserContext } from './context'

interface Props {
  initialUser?: User
}

export function CurrentUserContextProvider({
  children,
  initialUser = {} as User,
}: PropsWithChildren<Props>) {
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    })()
  }, [])

  return (
    <CurrentUserContext.Provider value={{ isLoading, setUser, user }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
