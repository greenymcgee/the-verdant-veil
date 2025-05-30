'use client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { noop } from 'swr/_internal'

import { RouteKey } from '@/constants'

export interface PageContextType {
  activeNavbarLink: RouteKey
  setActiveNavbarLink: Dispatch<SetStateAction<RouteKey>>
}

export const PageContext = createContext<PageContextType>({
  activeNavbarLink: '' as RouteKey,
  setActiveNavbarLink: noop,
})
