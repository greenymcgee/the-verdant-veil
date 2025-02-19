'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { RouteKey } from '@/constants'

import { PageContext } from './context'

interface PageContextProviderProps {
  initialActiveLink?: RouteKey
  initialIsIOSDevice?: boolean
}

export function PageContextProvider({
  children,
  initialActiveLink = '' as RouteKey,
  initialIsIOSDevice,
}: PropsWithChildren<PageContextProviderProps>) {
  const [activeNavbarLink, setActiveNavbarLink] =
    useState<RouteKey>(initialActiveLink)
  const [isIOSDevice, setIsIOSDevice] = useState(Boolean(initialIsIOSDevice))

  useEffect(() => {
    setIsIOSDevice(/iPad|iPhone|iPod/.test(navigator.userAgent))
  }, [])

  return (
    <PageContext.Provider
      value={{
        activeNavbarLink,
        isIOSDevice,
        setActiveNavbarLink,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
