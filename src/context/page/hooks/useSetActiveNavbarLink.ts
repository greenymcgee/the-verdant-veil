'use client'
import { useEffect } from 'react'

import { RouteKey } from '@/constants'

import { usePageContext } from './usePageContext'

export function useSetActiveNavbarLink(key: RouteKey) {
  const { activeNavbarLink, setActiveNavbarLink } = usePageContext()
  useEffect(() => {
    setActiveNavbarLink(key)
  }, [key, setActiveNavbarLink])
  return activeNavbarLink
}
