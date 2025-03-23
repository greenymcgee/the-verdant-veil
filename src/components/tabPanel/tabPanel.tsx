'use client'
import React, { PropsWithChildren } from 'react'

import { useHash } from '@/hooks'

interface Props extends PropsWithChildren {
  defaultActive?: boolean
  hash: string
}

export function TabPanel({ children, defaultActive, hash }: Props) {
  const currentHash = useHash()
  const active = currentHash ? `#${hash}` === currentHash : defaultActive

  return (
    <div
      aria-labelledby={`${hash}-tab`}
      data-testid={`${hash}-tabpanel`}
      hidden={!active}
      id={`${hash}-tabpanel`}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  )
}
