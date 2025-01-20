'use client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { noop } from 'swr/_internal'

import { RouteKey } from '@/constants'

export const PageContext = createContext<{
  activeNavbarLink: RouteKey
  breadcrumbs: Breadcrumb[]
  setActiveNavbarLink: Dispatch<SetStateAction<RouteKey>>
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>
}>({
  activeNavbarLink: '' as RouteKey,
  breadcrumbs: [],
  setActiveNavbarLink: noop,
  setBreadcrumbs: noop,
})
