'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { parse } from 'bowser'

import { RouteKey } from '@/constants'

import { PageContext, PageContextType } from './context'

interface PageContextProviderProps {
  initialActiveLink?: RouteKey
}

export function PageContextProvider({
  children,
  initialActiveLink = '' as RouteKey,
}: PropsWithChildren<PageContextProviderProps>) {
  const [activeNavbarLink, setActiveNavbarLink] =
    useState<RouteKey>(initialActiveLink)
  const [userAgent, setUserAgent] = useState<PageContextType['userAgent']>({
    browser: {},
    engine: {},
    isIOSDevice: false,
    os: {},
    platform: {},
  })

  useEffect(() => {
    const parsed = parse(navigator.userAgent)
    setUserAgent({ ...parsed, isIOSDevice: parsed.os.name === 'iOS' })
  }, [])

  return (
    <PageContext.Provider
      value={{
        activeNavbarLink,
        setActiveNavbarLink,
        userAgent,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
