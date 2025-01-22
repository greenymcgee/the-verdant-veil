'use client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { noop } from 'swr/_internal'

import { RouteKey } from '@/constants'

export const PageContext = createContext<{
  activeNavbarLink: RouteKey
  setActiveNavbarLink: Dispatch<SetStateAction<RouteKey>>
}>({
  activeNavbarLink: '' as RouteKey,
  setActiveNavbarLink: noop,
})
