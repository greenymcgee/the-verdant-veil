'use client'
import React, { PropsWithChildren, useState } from 'react'

import { RouteKey } from '@/constants'

import { PageContext } from './context'

interface PageContextProviderProps {
  initialActiveLink?: RouteKey
}

export function PageContextProvider({
  children,
  initialActiveLink = '' as RouteKey,
}: PropsWithChildren<PageContextProviderProps>) {
  const [activeNavbarLink, setActiveNavbarLink] =
    useState<RouteKey>(initialActiveLink)
  return (
    <PageContext.Provider value={{ activeNavbarLink, setActiveNavbarLink }}>
      {children}
    </PageContext.Provider>
  )
}
