'use client'
import React, { PropsWithChildren, useState } from 'react'

import { RouteKey } from '@/constants'

import { PageContext } from './context'

interface PageContextProviderProps {
  initialActiveLink?: RouteKey
  initialBreadcrumbs?: Breadcrumb[]
}

export function PageContextProvider({
  children,
  initialActiveLink = '' as RouteKey,
  initialBreadcrumbs = [],
}: PropsWithChildren<PageContextProviderProps>) {
  const [activeNavbarLink, setActiveNavbarLink] =
    useState<RouteKey>(initialActiveLink)
  const [breadcrumbs, setBreadcrumbs] =
    useState<Breadcrumb[]>(initialBreadcrumbs)

  return (
    <PageContext.Provider
      value={{
        activeNavbarLink,
        breadcrumbs,
        setActiveNavbarLink,
        setBreadcrumbs,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
