'use client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { Parser } from 'bowser'
import { noop } from 'swr/_internal'

import { RouteKey } from '@/constants'

export interface PageContextType {
  activeNavbarLink: RouteKey
  setActiveNavbarLink: Dispatch<SetStateAction<RouteKey>>
  userAgent: Parser.ParsedResult & { isIOSDevice: boolean }
}

export const PageContext = createContext<PageContextType>({
  activeNavbarLink: '' as RouteKey,
  setActiveNavbarLink: noop,
  userAgent: {
    browser: {},
    engine: {},
    isIOSDevice: false,
    os: {},
    platform: {},
  },
})
